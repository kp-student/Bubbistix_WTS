// Helper to save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove item from cart
function removeItem(button) {
  const itemName = button.closest('.cart-item').dataset.name;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(i => i.name !== itemName);
  saveCart(cart);
  renderCart();
}

// Update quantity with validation
function updateQuantity(button, change) {
  const itemName = button.closest('.cart-item').dataset.name;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(i => i.name === itemName);
  if (!item) return;

  // Update item quantity and ensure it's at least 1
  item.quantity += change;
  if (item.quantity < 1) item.quantity = 1;

  // Save updated cart
  saveCart(cart);

  // Re-render the cart to reflect the changes
  renderCart();
}

// Handle manual quantity input changes with debounce
let inputTimeout;
function onQuantityInputChange(input) {
  clearTimeout(inputTimeout);
  inputTimeout = setTimeout(() => {
    const newQuantity = Math.max(1, parseInt(input.value)) || 1;
    const itemName = input.closest('.cart-item').dataset.name;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(i => i.name === itemName);
    if (!item) return;
    item.quantity = newQuantity;
    saveCart(cart);
    renderCart();
  }, 500);
}

// Render cart items and total
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="empty-cart" role="alert" aria-live="assertive">Your cart is currently empty. Click "Continue shopping" to add items.</p>
    `;
    document.querySelector('.final-total').textContent = '₱ 0.00 PHP';
    return;
  }

  let total = 0;
  let cartHTML = `
    <div class="cart-item-header" role="row">
      <span class="header-product" role="columnheader">Product</span>
      <span class="header-quantity" role="columnheader">Quantity</span>
      <span class="header-total" role="columnheader">Total</span>
    </div>
  `;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartHTML += `
      <div class="cart-item" data-name="${item.name}" role="row">
        <div class="item-info" role="gridcell">
          <img src="${item.image}" alt="${item.name}" class="item-image">
          <div class="item-details">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-price">₱ ${item.price.toFixed(2)} PHP</p>
          </div>
        </div>

        <div class="quantity-controls" role="gridcell" aria-label="Quantity controls for ${item.name}">
          <button class="quantity-btn minus" aria-label="Decrease quantity" onclick="updateQuantity(this, -1)">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" aria-label="Quantity for ${item.name}" onchange="onQuantityInputChange(this)">
          <button class="quantity-btn plus" aria-label="Increase quantity" onclick="updateQuantity(this, 1)">+</button>
        </div>

        <div class="item-total" role="gridcell">
          <span class="total-price">₱ ${itemTotal.toFixed(2)} PHP</span>
        </div>

        <div class="item-remove" role="gridcell">
          <button class="remove-btn" aria-label="Remove ${item.name} from cart" onclick="removeItem(this)">X</button>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;
  document.querySelector('.final-total').textContent = `₱ ${total.toFixed(2)} PHP`;
}

// Initialize cart on load
window.onload = renderCart;
