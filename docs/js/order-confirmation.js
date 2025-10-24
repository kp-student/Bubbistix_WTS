// Order Confirmation Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Inject the CSS styles you provided earlier (necessary for display)
    injectConfirmationStyles();

    // Load and display all data sections
    loadDeliveryInfo(); // Needs to run first to personalize the thank you message
    loadOrderData();
    loadPaymentInfo();
    
    // Clear order data after displaying (optional but recommended)
    // clearOrderData(); 
});

// --- Core Logic Functions ---

function loadOrderData() {
    // Retrieve data
    const orderData = JSON.parse(localStorage.getItem('orderData')) || {};
    const discountAmount = parseFloat(localStorage.getItem('discountAmount')) || 0;
    let items = orderData.items || JSON.parse(localStorage.getItem('cart')) || []; 
    
    console.log('Order Data:', orderData);
    console.log('Items:', items);
    console.log('Discount Amount:', discountAmount);
    
    // Retrieve HTML elements (CRITICAL STEP)
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    // Safety check for the parent container before trying to use .closest()
    const totalContainer = totalElement?.closest('.order-totals'); 

    // --- Safety Check for Totals ---
    if (!subtotalElement || !shippingElement || !totalElement) {
        console.error("Order Summary Error: Missing HTML element ID (subtotal, shipping, or total). Check your order-confirmation.html file.");
        if (orderItemsContainer) {
            orderItemsContainer.innerHTML = '<p>Order Summary failed to load. Please check console for errors.</p>';
        }
        return;
    }
    // ---------------------------------
    
    if (items.length === 0) {
        // Try to get items from cart as fallback
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems.length > 0) {
            console.log('Using cart items as fallback:', cartItems);
            items = cartItems;
        } else {
            orderItemsContainer.innerHTML = '<p>No order items found. Please contact support.</p>';
            subtotalElement.textContent = '₱ 0.00';
            shippingElement.textContent = '₱ 0.00';
            totalElement.textContent = '₱ 0.00';
            return;
        }
    }
    
    let subtotal = 0;
    let itemsHTML = '';
    
    items.forEach((item, index) => {
        // Ensure price is treated as a number
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity);
        const itemTotal = itemPrice * itemQuantity;
        subtotal += itemTotal;
        
        console.log(`Item ${index + 1}:`, {
            name: item.name,
            price: itemPrice,
            quantity: itemQuantity,
            total: itemTotal
        });
        
        itemsHTML += `
            <div class="order-item">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-quantity">Quantity: ${itemQuantity}</p>
                    <p class="item-price-per">₱${itemPrice.toFixed(2)} each</p>
                </div>
                <div class="item-total">₱${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    orderItemsContainer.innerHTML = itemsHTML;
    
    // Calculate and Display Totals
    const shipping = 50.00;
    let finalTotal = subtotal + shipping;
    
    console.log('Calculated subtotal:', subtotal);
    console.log('Shipping:', shipping);
    console.log('Final total before discount:', finalTotal);
    
    // These lines should now work because we checked if the elements exist
    subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    shippingElement.textContent = `₱${shipping.toFixed(2)}`;
    
    // Handle Discount
    if (discountAmount > 0 && totalContainer) { // Check if totalContainer is available for insertion
        finalTotal -= discountAmount;
        console.log('Final total after discount:', finalTotal);
        
        // Create and insert the discount line
        const finalTotalLine = document.querySelector('.total-line.final-total');

        const discountLine = document.createElement('div');
        discountLine.id = 'discountLine';
        discountLine.className = 'total-line';
        discountLine.style.color = '#28a745';
        discountLine.innerHTML = `
            <span>Discount</span>
            <span>-₱${discountAmount.toFixed(2)}</span>
        `;
        
        // Insert only if both container and final line are found
        if (finalTotalLine) { 
            totalContainer.insertBefore(discountLine, finalTotalLine);
        }
    }
    
    // Display Final Total
    totalElement.textContent = `₱${finalTotal.toFixed(2)}`;
    console.log('Final total displayed:', totalElement.textContent);
}

function loadDeliveryInfo() {
    const deliveryData = JSON.parse(localStorage.getItem('deliveryData')) || null;
    const deliveryContainer = document.getElementById('deliveryDetails');
    
    if (!deliveryData) {
        deliveryContainer.innerHTML = `<p>Delivery information not available.</p>`;
        return;
    }
    
    // Dynamic Order ID (since your checkout didn't save one explicitly)
    const orderId = 'BUB-' + new Date().getTime().toString().slice(-6); 

    const deliveryHTML = `
        <div class="delivery-info">
            <div class="info-row">
                <span class="info-label">Order ID:</span>
                <span>${orderId}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span>${deliveryData.firstName} ${deliveryData.lastName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span>${deliveryData.email}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Address:</span>
                <span>${deliveryData.address}</span>
            </div>
            <div class="info-row">
                <span class="info-label">City:</span>
                <span>${deliveryData.city}, ${deliveryData.postalCode}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Location:</span>
                <span>${deliveryData.province}, ${deliveryData.region}, ${deliveryData.island}</span>
            </div>
            ${deliveryData.phone ? `
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span>${deliveryData.phone}</span>
            </div>
            ` : ''}
        </div>
    `;
    
    deliveryContainer.innerHTML = deliveryHTML;
    
    // Personalize Confirmation Message
    const confirmationTitle = document.querySelector('.confirmation-title');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    if (confirmationTitle && deliveryData.firstName) {
        confirmationTitle.textContent = `Thank you for your purchase, ${deliveryData.firstName}!`;
        confirmationMessage.innerHTML = `
            Your order has been placed successfully. A confirmation email<br>
            has been sent to <strong>${deliveryData.email}</strong>
        `;
    }
}

function loadPaymentInfo() {
    const paymentData = JSON.parse(localStorage.getItem('paymentData')) || null;
    const paymentContainer = document.getElementById('paymentDetails');
    
    if (!paymentData) {
        paymentContainer.innerHTML = `<p>Payment method information not available.</p>`;
        return;
    }
    
    let paymentHTML = '';
    
    // Display payment information based on the saved method
    const methodDisplay = paymentData.method.replace(/_/g, ' ');
    
    paymentHTML = `
        <div class="payment-details-confirmed">
            <div class="info-row">
                <span class="info-label">Method:</span>
                <span>${methodDisplay}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Status:</span>
                <span>${paymentData.method === 'cash_on_delivery' ? 'Pay upon delivery' : 'Charged'}</span>
            </div>
            ${paymentData.method === 'credit_card' && paymentData.cardNumber ? `
            <div class="info-row">
                <span class="info-label">Card:</span>
                <span>**** **** **** ${paymentData.cardNumber.slice(-4)}</span>
            </div>
            ` : ''}
        </div>
    `;
    
    paymentContainer.innerHTML = paymentHTML;
}

function clearOrderData() {
    // Clears all temporary order-related data from localStorage after display
    localStorage.removeItem('orderData');
    localStorage.removeItem('deliveryData');
    localStorage.removeItem('paymentData');
    localStorage.removeItem('discountAmount'); 
}

function injectConfirmationStyles() {
    // Helper function to inject the necessary styles you provided earlier
    const style = document.createElement('style');
    style.textContent = `
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #49705b;
            min-width: 100px;
        }
        .payment-details-confirmed {
            margin-top: 15px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
        }
        .confirmation-title {
            font-size: 2rem;
            color: #49705b;
            margin-bottom: 1.5rem;
            font-weight: 700;
        }
        .confirmation-message {
            font-size: 1rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        #discountLine {
            border-top: 1px dashed #ccc;
            padding-top: 8px !important;
            margin-bottom: 5px;
        }
        .order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.8);
        }
        .item-details {
            flex-grow: 1;
            margin-right: 15px;
        }
        .item-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        .item-quantity, .item-price-per {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 3px;
        }
        .item-total {
            font-weight: bold;
            color: #49705b;
            font-size: 1.1rem;
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);
}