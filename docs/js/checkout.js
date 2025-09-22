// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment method selection
    initializePaymentMethods();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Load cart items from localStorage
    loadCartItems();
    
    // Initialize discount functionality
    initializeDiscountCode();
});

function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const creditCardFields = document.getElementById('credit-card-fields');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Show/hide credit card fields based on selection
                if (radio.value === 'credit_card') {
                    creditCardFields.style.display = 'block';
                } else if (radio.value === 'cash_on_delivery') {
                    creditCardFields.style.display = 'none';
                }
            }
        });
    });
}

function initializeFormValidation() {
    const form = document.getElementById('checkoutForm');
    const payNowBtn = document.getElementById('payNowBtn');
    
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                processPayment();
            }
        });
    }
}

function validateForm() {
    const requiredFields = [
        'email',
        'firstName',
        'lastName',
        'address',
        'postalCode',
        'city',
        'phone'
    ];
    
    let isValid = true;
    
    // Check required text fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else if (field) {
            field.style.borderColor = '#f0f0f0';
        }
    });
    
    // Check location dropdowns
    const island = document.getElementById('island-select');
    const region = document.getElementById('region-select');
    const province = document.getElementById('province-select');
    
    if (!island.value || !region.value || !province.value) {
        if (!island.value) island.style.borderColor = '#dc3545';
        if (!region.value) region.style.borderColor = '#dc3545';
        if (!province.value) province.style.borderColor = '#dc3545';
        isValid = false;
    }
    
    // Check payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        alert('Please select a payment method');
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fill in all required fields');
    }
    
    return isValid;
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    let subtotal = 0;
    orderItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">₱${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div class="item-total">₱${itemTotal.toFixed(2)}</div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
    
    // Update totals
    subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    totalElement.textContent = `₱${subtotal.toFixed(2)}`;
}

function initializeDiscountCode() {
    const applyBtn = document.getElementById('applyDiscount');
    const discountInput = document.getElementById('discountCode');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const code = discountInput.value.trim().toUpperCase();
            applyDiscountCode(code);
        });
    }
    
    if (discountInput) {
        discountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const code = this.value.trim().toUpperCase();
                applyDiscountCode(code);
            }
        });
    }
}

function applyDiscountCode(code) {
    const validCodes = {
        'BUBBLEGUM10': 0.10,
        'STICKER15': 0.15,
        'NEWBIE20': 0.20
    };
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const discountInput = document.getElementById('discountCode');
    
    let subtotal = parseFloat(subtotalElement.textContent.replace('₱', ''));
    
    if (validCodes[code]) {
        const discount = subtotal * validCodes[code];
        const newTotal = subtotal - discount;
        
        // Add discount line if not exists
        let discountLine = document.getElementById('discountLine');
        if (!discountLine) {
            discountLine = document.createElement('div');
            discountLine.id = 'discountLine';
            discountLine.className = 'total-line';
            discountLine.style.color = '#28a745';
            totalElement.parentNode.insertBefore(discountLine, totalElement);
        }
        
        discountLine.innerHTML = `
            <span>Discount (${code})</span>
            <span>-₱${discount.toFixed(2)}</span>
        `;
        
        totalElement.textContent = `₱${newTotal.toFixed(2)}`;
        discountInput.style.borderColor = '#28a745';
        
        // Show success message
        showMessage('Discount applied successfully!', 'success');
    } else {
        discountInput.style.borderColor = '#dc3545';
        showMessage('Invalid discount code', 'error');
    }
}

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.checkout-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `checkout-message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-family: 'Lucid-Dream', sans-serif;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const totalElement = document.getElementById('total');
    const total = totalElement.textContent;
    
    // Collect delivery data
    const deliveryData = {
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        postalCode: document.getElementById('postalCode').value,
        city: document.getElementById('city').value,
        phone: document.getElementById('phone').value,
        island: document.getElementById('island-select').value,
        region: document.getElementById('region-select').value,
        province: document.getElementById('province-select').value
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
    
    // Save order data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderData = {
        items: cart,
        total: total,
        timestamp: new Date().toISOString()
    };
    
    // Store all data in localStorage
    localStorage.setItem('deliveryData', JSON.stringify(deliveryData));
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    localStorage.setItem('orderData', JSON.stringify(orderData));
    
    // Show processing message
    const payNowBtn = document.getElementById('payNowBtn');
    payNowBtn.textContent = 'Processing...';
    payNowBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');
        
        // Redirect to order confirmation page
        window.location.href = 'order-confirmation.html';
    }, 2000);
}

// Add CSS animation for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);