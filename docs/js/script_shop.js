
const gallery = document.getElementById('gallery');
const categoryNav = document.getElementById('category-nav');
const categoryNavMobile = document.getElementById('category-nav-mobile');
const searchInputs = document.querySelectorAll('#search-input, #search-input-mobile');
const sortSelectors = document.querySelectorAll('#sort-select, #sort-select-mobile');

// Product Data
const products = [
  { name: "Berry Boba Babies Set", set: "Berry Boba Babies", image: "cover_boba.png", price: 249 },
  { name: "Sakura Mochi Solo", set: "Sakura Mochi", image: "cover_mochi1.png", price: 99 },
  { name: "Sakura Mochi Set", set: "Sakura Mochi", image: "cover_mochi2.png", price: 249 },
  { name: "Moonlight Magic Set", set: "Moonlight Magic", image: "cover_magic.png", price: 249 },
  { name: "Bear-ry Sweet Companions", set: "Berry Boba Babies", image: "bearry-sweet-companions.png", price: 200 },
  { name: "Bento Blossom Delights", set: "Sakura Mochi", image: "bento-blossom-delights.png", price: 200 },
  { name: "Berry Baby Blossoms", set: "Berry Boba Babies", image: "berry-baby-blossoms.png", price: 200 },
  { name: "Berry Buddies Collection", set: "Berry Boba Babies", image: "berry-buddies-collection.png", price: 200 },
  { name: "Berry Butterfly Friends", set: "Berry Boba Babies", image: "berry-butterfly-friends.png", price: 200 },
  { name: "Bunny Berry Friends", set: "Berry Boba Babies", image: "bunny-berry-friends.png", price: 200 },
  { name: "Cherry Blossom Treats", set: "Sakura Mochi", image: "cherry-blossom-treats.png", price: 200 },
  { name: "Cosmic Cozy Babies", set: "Moonlight Magic", image: "cosmic-cozy-babies.png", price: 200 },
  { name: "Cozy Café Bear", set: "Sakura Mochi", image: "cozy-cafe-bear.png", price: 200 },
  { name: "Crescent Dreams", set: "Moonlight Magic", image: "crescent-dreams.png", price: 200 },
  { name: "Dessert Bear Cuties", set: "Sakura Mochi", image: "dessert-bear-cuties.png", price: 200 },
  { name: "Dino Berry Babies", set: "Berry Boba Babies", image: "dino-berry-babies.png", price: 200 },
  { name: "Dreamy Critters", set: "Moonlight Magic", image: "dreamy-critters.png", price: 200 },
  { name: "Lunar Sweethearts", set: "Moonlight Magic", image: "lunar-sweethearts.png", price: 200 },
  { name: "Midnight Nappers", set: "Moonlight Magic", image: "midnight-nappers.png", price: 200 },
  { name: "Mochi & Cream Dreams", set: "Sakura Mochi", image: "mochi-and-cream-dreams.png", price: 200 },
  { name: "Mochi Bear Snacks", set: "Sakura Mochi", image: "mochi-bear-snacks.png", price: 200 },
  { name: "Moonlit Fluffies", set: "Moonlight Magic", image: "moonlit-fluffies.png", price: 200 },
  { name: "Nighttime Companions", set: "Moonlight Magic", image: "nighttime-companions.png", price: 200 },
  { name: "Panda & Berry Pals", set: "Berry Boba Babies", image: "panda-berry-pals.png", price: 200 },
  { name: "Petal Pastry Pals", set: "Sakura Mochi", image: "petal-pastry-pals.png", price: 200 },
  { name: "Sakura Café Moments", set: "Sakura Mochi", image: "sakura-cafe-moments.png", price: 200 },
  { name: "Sleeping Under the Stars", set: "Moonlight Magic", image: "sleeping-under-stars.png", price: 200 },
  { name: "Starry Night Friends", set: "Moonlight Magic", image: "starry-night-friends.png", price: 200 },
  { name: "Twilight Snuggle Pals", set: "Moonlight Magic", image: "twilight-snuggle-pals.png", price: 200 },
];

// Function to get folder name based on set name
function getFolderName(setName) {
  switch(setName) {
    case "Moonlight Magic": return "set_magic";
    case "Berry Boba Babies": return "set_boba";
    case "Sakura Mochi": return "set_mochi";
    default: return "";  // Handle unexpected values if needed
  }
}

// Function to render the gallery based on filters
function renderGallery(filterText = "", sortBy = "") {
    gallery.innerHTML = "";
    
    // 1. Get both navigation elements
    const categoryNavMobile = document.getElementById('category-nav-mobile');
    
    // 2. CLEAR BOTH NAVIGATION LISTS
    categoryNav.innerHTML = ""; // Clears desktop nav 
    if (categoryNavMobile) {
        categoryNavMobile.innerHTML = ""; // Clears mobile nav (if it exists)
    }

    // Group products by set
    const grouped = {};
    let filteredProducts = [...products];

    // --- Search and Sort Filter Logic (omitted, remains the same) ---
    if (filterText) {
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(filterText.toLowerCase())
        );
    }

    if (sortBy === "az") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    filteredProducts.forEach(product => {
        if (!grouped[product.set]) grouped[product.set] = [];
        grouped[product.set].push(product);
    });

    if (filteredProducts.length === 0) {
        gallery.innerHTML = "<p>No products found.</p>";
        return;
    }

// Render category sections and sidebar nav
    Object.keys(grouped).forEach(set => {
        const categoryId = set.toLowerCase().replace(/\s+/g, "-");

        // 1. CREATE THE NAV ITEM
        const navItem = document.createElement("li");
        navItem.innerHTML = `<a href="#${categoryId}">${set}</a>`;
        
        // 2. APPEND TO DESKTOP NAV
        categoryNav.appendChild(navItem);

        // 3. APPEND TO MOBILE NAV (CRITICAL FIX: Uses the new variable)
        if (categoryNavMobile) {
            // Clone the list item and append it to the mobile list
            const navItemMobile = navItem.cloneNode(true); 
            categoryNavMobile.appendChild(navItemMobile);
        }

        // Category section rendering remains the same...
        const category = document.createElement("div");
        category.classList.add("category");
        category.id = categoryId;
        category.innerHTML = `
          <h2>${set}</h2>
          <div class="items">
            ${grouped[set].map(product => {
              const folder = getFolderName(product.set);
              const imagePath = `../images/stickers/${folder}/${product.image}`;
              return `
                <div class="item">
                  <img src="${imagePath}" alt="${product.name}">
                  <p class="gallery-item-name">${product.name}</p>
                  <p class="gallery-item-price">₱${product.price.toFixed(2)}</p>
                  <button class="product-btn" onclick="addToCart('${product.name}', '${imagePath}', ${product.price})">Add to Cart</button>
                </div>
              `;
            }).join('')}
          </div>
        `;
        gallery.appendChild(category);
    });
}

// On page load
renderGallery();

// 1. Search event: Loop through all search inputs
searchInputs.forEach(input => {
    input.addEventListener("input", function() {
        const filterText = this.value; // Read value from the input the user is typing in
        
        // SYNC FIX: Update the value of the other search input to match
        searchInputs.forEach(otherInput => {
            if (otherInput !== this) {
                otherInput.value = filterText;
            }
        });
        
        // Use the current value of the primary sort selector (desktop is typically [0])
        const sortValue = sortSelectors[0] ? sortSelectors[0].value : ""; 
        
        renderGallery(filterText, sortValue);
    });
});

// 2. Sort event: Loop through all sort selects
sortSelectors.forEach(select => {
    select.addEventListener("change", function() {
        const sortValue = this.value; // Read value from the select box the user changed
        
        // SYNC FIX: Update the value of the other select box to match
        sortSelectors.forEach(otherSelect => {
            if (otherSelect !== this) {
                otherSelect.value = sortValue;
            }
        });
        
        // Use the current value of the primary search input (desktop is typically [0])
        const filterText = searchInputs[0] ? searchInputs[0].value : "";
        
        renderGallery(filterText, sortValue);
    });
});

// Add to cart logic
function addToCart(name, image, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, image, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showAddToCartPopup(name);
}

function showAddToCartPopup(productName) {
  const popup = document.getElementById('add-to-cart-popup');
  const popupText = document.getElementById('popup-text');
  
  popupText.textContent = productName + ' has been added to your cart!';
  popup.style.display = 'flex';
  
  // Auto close after 3 seconds
  setTimeout(() => {
    closeAddToCartPopup();
  }, 3000);
}

function closeAddToCartPopup() {
  const popup = document.getElementById('add-to-cart-popup');
  popup.style.display = 'none';
}
