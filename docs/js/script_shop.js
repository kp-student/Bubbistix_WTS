const gallery = document.getElementById('gallery');
const categoryNav = document.getElementById('category-nav');
const categoryNavMobile = document.getElementById('category-nav-mobile');
const searchInputs = document.querySelectorAll('#search-input, #search-input-mobile');
const sortSelectors = document.querySelectorAll('#sort-select, #sort-select-mobile');

// Global variable to hold the product data once fetched.
let products = []; 

// Function to fetch data from JSON file and initialize the shop
async function initializeShop() {
    try {
        // Fetching data from the new JSON path
        const response = await fetch('../data/inventory.json'); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Assign the fetched data to the global 'products' variable
        products = await response.json(); 
        console.log("Products loaded successfully.");

        // Once data is loaded, initialize the gallery and set up event listeners
        renderGallery();
        setupEventListeners();

    } catch (e) {
        console.error("Could not load product data:", e);
        if (gallery) {
            gallery.innerHTML = "<p>Error loading product data. Please check the console.</p>";
        }
    }
}

// Function to get folder name based on set name (Remains unchanged)
function getFolderName(setName) {
    switch(setName) {
        case "Moonlight Magic": return "set_magic";
        case "Berry Boba Babies": return "set_boba";
        case "Sakura Mochi": return "set_mochi";
        default: return "";
        // Handle unexpected values if needed
    }
}

// Function to render the gallery based on filters (Core logic retained)
function renderGallery(filterText = "", sortBy = "") {
    gallery.innerHTML = "";
    
    // Clear both navigation lists
    categoryNav.innerHTML = "";
    if (categoryNavMobile) {
        categoryNavMobile.innerHTML = "";
    }

    // Group products by set
    const grouped = {};
    // Use the global 'products' array
    let filteredProducts = products; 

    // --- Search Filter Logic ---
    if (filterText) {
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(filterText.toLowerCase())
        );
    }

    // --- Sort Filter Logic ---
    if (sortBy === "az") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    if (filteredProducts.length === 0) {
        gallery.innerHTML = "<p>No products found.</p>";
        return;
    }
    
    filteredProducts.forEach(product => {
        if (!grouped[product.set]) grouped[product.set] = [];
        grouped[product.set].push(product);
    });
    
    // Render category sections and sidebar nav
    Object.keys(grouped).forEach(set => {
        const categoryId = set.toLowerCase().replace(/\s+/g, "-");

        // 1. CREATE THE NAV ITEM
        const navItem = document.createElement("li");
        navItem.innerHTML = `<a href="#${categoryId}">${set}</a>`;
        
        // 2. APPEND TO DESKTOP NAV
        categoryNav.appendChild(navItem);

        // 3. APPEND TO MOBILE NAV
        if (categoryNavMobile) {
            const navItemMobile = navItem.cloneNode(true); 
            categoryNavMobile.appendChild(navItemMobile);
        }

        // Category section rendering
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
                  <button class="product-btn" 
                  onclick="addToCart('${product.name}', '${imagePath}', ${product.price})">Add to Cart</button>
                </div>
              `;
            }).join('')}
          </div>
        `;
        gallery.appendChild(category);
    });
}

// Function to set up all event listeners (Search and Sort)
function setupEventListeners() {
    // 1. Search event: Loop through all search inputs
    searchInputs.forEach(input => {
        input.addEventListener("input", function() {
            const filterText = this.value; 
            
            // SYNC FIX: Update the value of the other search input to match
            searchInputs.forEach(otherInput => {
                if (otherInput !== this) {
                    otherInput.value = filterText;
                }
            });
            
            const sortValue = sortSelectors[0] ? sortSelectors[0].value : ""; 
            
            renderGallery(filterText, sortValue);
        });
    });

    // 2. Sort event: Loop through all sort selects
    sortSelectors.forEach(select => {
        select.addEventListener("change", function() {
            const sortValue = this.value; 
            
            // SYNC FIX: Update the value of the other select box to match
            sortSelectors.forEach(otherSelect => {
                if (otherSelect !== this) {
                    otherSelect.value = sortValue;
                }
            });
            
            const filterText = searchInputs[0] ? searchInputs[0].value : "";
            
            renderGallery(filterText, sortValue);
        });
    });
}

// Add to cart logic (Remains unchanged)
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

// Application Entry Point: Starts the data fetching process
initializeShop();