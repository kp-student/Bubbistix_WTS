// Order Confirmation Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load order data from localStorage
    loadOrderData();
    
    // Load delivery information
    loadDeliveryInfo();
    
    // Load payment information
    loadPaymentInfo();
    
    // Clear order data after displaying (optional - uncomment if needed)
    // clearOrderData();
});

function loadOrderData() {
    // Get cart data from localStorage (before it was cleared)
    const orderData = JSON.parse(localStorage.getItem('orderData')) || null;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Use orderData if available, otherwise fall back to current cart
    const items = orderData ? orderData.items : cart;
    
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (items.length === 0) {
        orderItemsContainer.innerHTML = '<p>No order items found</p>';
        return;
    }
    
    let subtotal = 0;
    let itemsHTML = '';
    
    items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-quantity">Quantity: ${item.quantity}</p>
                </div>
                <div class="item-price">₱${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    orderItemsContainer.innerHTML = itemsHTML;
    
    // Calculate totals
    const shipping = 50.00;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    shippingElement.textContent = `₱${shipping.toFixed(2)}`;
    totalElement.textContent = `₱${total.toFixed(2)}`;
}

function loadDeliveryInfo() {
    const deliveryData = JSON.parse(localStorage.getItem('deliveryData')) || null;
    const deliveryContainer = document.getElementById('deliveryDetails');
    
    if (!deliveryData) {
        deliveryContainer.innerHTML = `
            <div class="info-row">
                <span class="info-label">Status:</span>
                <span>Delivery information not available</span>
            </div>
        `;
        return;
    }
    
    const deliveryHTML = `
        <div class="delivery-info">
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
                <span class="info-label">Region:</span>
                <span>${deliveryData.region}, ${deliveryData.province}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Island:</span>
                <span>${deliveryData.island}</span>
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
    
    // Update confirmation message with customer name and email
    const confirmationMessage = document.getElementById('confirmationMessage');
    const confirmationTitle = document.querySelector('.confirmation-title');
    
    if (confirmationMessage && deliveryData.firstName) {
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
        paymentContainer.innerHTML = `
            <div class="payment-option selected">
                <input type="radio" checked disabled>
                <label>Payment method not available</label>
            </div>
        `;
        return;
    }
    
    let paymentHTML = '';
    
    if (paymentData.method === 'credit_card') {
        paymentHTML = `
            <div class="payment-option selected">
                <input type="radio" checked disabled>
                <label>Credit Card</label>
            </div>
            <div class="payment-details-confirmed">
                <div class="info-row">
                    <span class="info-label">Card:</span>
                    <span>**** **** **** ${paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : '****'}</span>
                </div>
                ${paymentData.expiryDate ? `
                <div class="info-row">
                    <span class="info-label">Expiry:</span>
                    <span>${paymentData.expiryDate}</span>
                </div>
                ` : ''}
                ${paymentData.cardName ? `
                <div class="info-row">
                    <span class="info-label">Cardholder:</span>
                    <span>${paymentData.cardName}</span>
                </div>
                ` : ''}
            </div>
        `;
    } else if (paymentData.method === 'cash_on_delivery') {
        paymentHTML = `
            <div class="payment-option selected">
                <input type="radio" checked disabled>
                <label>Cash on Delivery</label>
            </div>
            <div class="payment-details-confirmed">
                <div class="info-row">
                    <span class="info-label">Payment:</span>
                    <span>Pay when your order arrives</span>
                </div>
            </div>
        `;
    }
    
    paymentContainer.innerHTML = paymentHTML;
}

function clearOrderData() {
    // Clear order-related data from localStorage
    localStorage.removeItem('orderData');
    localStorage.removeItem('deliveryData');
    localStorage.removeItem('paymentData');
}

// CSS styles for the confirmation page elements
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
    
    .thank-you-section {
        text-align: center;
        margin-bottom: 2rem;
        padding: 2rem 0;
    }
    
    .confirmation-title {
        font-size: 2rem;
        color: #49705b;
        margin-bottom: 1.5rem;
        font-weight: 700;
    }
    
    .character-image {
        margin: 1.5rem 0;
    }
    
    .strawberry-character {
        width: 120px;
        height: 120px;
        object-fit: contain;
        animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-8px);
        }
        60% {
            transform: translateY(-4px);
        }
    }
    
    .confirmation-message {
        font-size: 1rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .estimated-delivery {
        text-align: center;
        margin: 1.5rem 0;
        padding: 1rem;
        background: linear-gradient(135deg, #49705b, #5a8068);
        border-radius: 10px;
        color: white;
    }
    
    .delivery-estimate {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
    }
`;
document.head.appendChild(style);