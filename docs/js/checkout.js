// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment method selection
    initializePaymentMethods();
    
    // Initialize form validation and button handler
    initializeFormValidation();
    
    // Load cart items from localStorage and calculate initial totals
    loadCartItems();
    
    // Initialize discount functionality
    initializeDiscountCode();

    // Clear any previous discount if the page is just loaded (new checkout session)
    localStorage.removeItem('discountAmount'); 
});

// --- Utility Functions ---

function showMessage(message, type) {
    const existingMessage = document.querySelector('.checkout-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `checkout-message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// --- Initialization Functions ---

function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const creditCardFields = document.getElementById('credit-card-fields');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Toggle visibility based on payment selection
            creditCardFields.style.display = (this.value === 'credit_card') ? 'block' : 'none';
        });
    });

    // Set initial state based on checked radio
    const codRadio = document.getElementById('cash-on-delivery');
    if (codRadio && codRadio.checked) {
        creditCardFields.style.display = 'none';
    }
}

function initializeFormValidation() {
    const payNowBtn = document.getElementById('payNowBtn');
    
    payNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // This is the CRITICAL line: If validation fails, processPayment() is skipped.
        if (validateForm()) {
            processPayment();
        } else {
            // Show a persistent error message if validation fails
            showMessage('Please correct the highlighted fields before proceeding.', 'error');
        }
    });
}

function validateForm() {
    // 1. Validate mandatory delivery/contact fields
    const requiredFields = [
        'email', 'firstName', 'lastName', 'address', 'postalCode', 'city'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) { // Check if field exists and is empty
            if (field) field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            if (field) field.style.borderColor = '#ddd';
        }
    });
    
    // 2. Validate payment method specific fields
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (paymentMethod === 'credit_card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        cardFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            } else if (field) {
                field.style.borderColor = '#ddd';
            }
        });
    }
    
    // Do NOT show an alert here, just return the boolean result
    return isValid;
}

// --- Discount Logic (Unchanged from last fix) ---

function initializeDiscountCode() {
    const applyBtn = document.getElementById('applyDiscount');
    const discountInput = document.getElementById('discountCode');
    
    const handler = function() {
        const code = discountInput.value.trim().toUpperCase();
        applyDiscountCode(code);
    };

    applyBtn.addEventListener('click', handler);
    discountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handler();
        }
    });
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        subtotalElement.textContent = '₱ 0.00';
        totalElement.textContent = 'PHP ₱ 0.00';
        return;
    }
    
    let subtotal = 0;
    orderItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity);
        const itemTotal = itemPrice * itemQuantity;

        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">₱${itemPrice.toFixed(2)} × ${itemQuantity}</div>
            </div>
            <div class="item-total">₱${itemTotal.toFixed(2)}</div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
    
    const shipping = 50.00; 
    let initialTotal = subtotal + shipping;
    
    subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    totalElement.textContent = `PHP ₱ ${initialTotal.toFixed(2)}`; 

    localStorage.setItem('baseSubtotal', subtotal.toFixed(2));
}

function applyDiscountCode(code) {
    const validCodes = {
        'BUBBLEGUM10': 0.10,
        'STICKER15': 0.15,
        'NEWBIE20': 0.20
    };
    
    const baseSubtotal = parseFloat(localStorage.getItem('baseSubtotal')) || 0;
    const shipping = 50.00;
    
    const totalElement = document.getElementById('total');
    const discountInput = document.getElementById('discountCode');
    
    const oldDiscountLine = document.getElementById('discountLine');
    if (oldDiscountLine) {
        oldDiscountLine.remove();
    }
    localStorage.removeItem('discountAmount'); 
    
    let currentTotal = baseSubtotal + shipping;
    
    if (validCodes[code]) {
        const discountAmount = baseSubtotal * validCodes[code];
        currentTotal -= discountAmount;
        
        localStorage.setItem('discountAmount', discountAmount.toFixed(2)); 
        
        let discountLine = document.createElement('div');
        discountLine.id = 'discountLine';
        discountLine.className = 'total-line';
        discountLine.style.color = '#28a745';
        
        const finalTotalLine = document.querySelector('.total-line.final-total'); 
        if (finalTotalLine) {
            finalTotalLine.parentNode.insertBefore(discountLine, finalTotalLine);
        }

        discountLine.innerHTML = `
            <span>Discount (${code})</span>
            <span>-₱${discountAmount.toFixed(2)}</span>
        `;
        
        totalElement.textContent = `PHP ₱ ${currentTotal.toFixed(2)}`;
        discountInput.style.borderColor = '#28a745';
        
        showMessage('Discount applied successfully!', 'success');
    } else {
        totalElement.textContent = `PHP ₱ ${currentTotal.toFixed(2)}`;
        discountInput.style.borderColor = '#dc3545';
        showMessage('Invalid discount code', 'error');
    }
}

// --- Payment and Data Saving ---

function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    const totalElement = document.getElementById('total');
    
    if (!paymentMethod) {
        showMessage('Please select a payment method.', 'error');
        return;
    }

    const finalTotalDisplay = totalElement.textContent; 
    
    // Collect delivery data
    const deliveryData = {
        email: document.getElementById('email')?.value,
        firstName: document.getElementById('firstName')?.value,
        lastName: document.getElementById('lastName')?.value,
        address: document.getElementById('address')?.value,
        postalCode: document.getElementById('postalCode')?.value,
        city: document.getElementById('city')?.value,
        phone: document.getElementById('phone')?.value,
        island: document.getElementById('island-select')?.value,
        region: document.getElementById('region-select')?.value,
        province: document.getElementById('province-select')?.value
    };
    
    // Collect payment data
    const paymentData = {
        method: paymentMethod
    };
    
    if (paymentMethod === 'credit_card') {
        paymentData.cardNumber = document.getElementById('cardNumber')?.value || ''; 
        paymentData.expiryDate = document.getElementById('expiryDate')?.value || '';
        paymentData.cvv = document.getElementById('cvv')?.value || '';
        paymentData.cardName = document.getElementById('cardName')?.value || '';
    }
    
    // Save order item data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderData = {
        items: cart,
        total: finalTotalDisplay, 
        timestamp: new Date().toISOString()
    };
    
    // Store all data in localStorage
    localStorage.setItem('deliveryData', JSON.stringify(deliveryData));
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    localStorage.setItem('orderData', JSON.stringify(orderData));
    
    // Show processing message and disable button
    const payNowBtn = document.getElementById('payNowBtn');
    payNowBtn.textContent = 'Processing...';
    payNowBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart and temporary subtotal key
        localStorage.removeItem('cart');
        localStorage.removeItem('baseSubtotal');
        
        // Redirect to order confirmation page
        window.location.href = 'order-confirmation.html';
    }, 2000);
}