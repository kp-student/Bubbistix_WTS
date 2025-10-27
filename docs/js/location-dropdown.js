// Philippine Location Data Structure
const philippineLocations = {
  "Luzon": {
    "NCR (Metro Manila)": ["Manila", "Quezon City", "Caloocan", "Valenzuela", "Malabon", "Navotas", "Makati", "Pasig", "Mandaluyong", "San Juan", "Marikina", "Taguig", "Pateros", "Parañaque", "Las Piñas", "Muntinlupa", "Pasay"],
    "CAR (Cordillera Administrative Region)": ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
    "Region I (Ilocos Region)": ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
    "Region II (Cagayan Valley)": ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
    "Region III (Central Luzon)": ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
    "Region IV-A (CALABARZON)": ["Cavite", "Laguna", "Batangas", "Rizal", "Quezon"],
    "MIMAROPA": ["Occidental Mindoro", "Oriental Mindoro", "Marinduque", "Romblon", "Palawan"],
    "Region V (Bicol Region)": ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"]
  },
  "Visayas": {
    "Region VI (Western Visayas)": ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental"],
    "Region VII (Central Visayas)": ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
    "Region VIII (Eastern Visayas)": ["Biliran", "Leyte", "Southern Leyte", "Samar", "Northern Samar", "Eastern Samar"]
  },
  "Mindanao": {
    "Region IX (Zamboanga Peninsula)": ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay", "Zamboanga City"],
    "Region X (Northern Mindanao)": ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental", "Cagayan de Oro City"],
    "Region XI (Davao Region)": ["Davao del Norte", "Davao del Sur", "Davao Oriental", "Davao de Oro", "Davao Occidental", "Davao City"],
    "Region XII (SOCCSKSARGEN)": ["South Cotabato", "Cotabato", "Sultan Kudarat", "Sarangani", "General Santos City"],
    "Region XIII (Caraga)": ["Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur", "Butuan City"],
    "BARMM (Bangsamoro Autonomous Region in Muslim Mindanao)": ["Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Sulu", "Tawi-Tawi", "Marawi City"]
  }
};

// Initialize dropdown functionality when DOM is loaded
// ES6 + maintainability: arrow init and event handlers with explicit targets
document.addEventListener('DOMContentLoaded', () => {
  const islandSelect = document.getElementById('island-select');
  const regionSelect = document.getElementById('region-select');
  const provinceSelect = document.getElementById('province-select');

  // Populate island dropdown
  function populateIslandDropdown() {
    islandSelect.innerHTML = '<option value="">Select Island Group</option>';
    Object.keys(philippineLocations).forEach(island => {
      const option = document.createElement('option');
      option.value = island;
      option.textContent = island;
      islandSelect.appendChild(option);
    });
  }

  // Populate region dropdown based on selected island
  function populateRegionDropdown(selectedIsland) {
    regionSelect.innerHTML = '<option value="">Select Region</option>';
    regionSelect.disabled = false;
    
    if (selectedIsland && philippineLocations[selectedIsland]) {
      Object.keys(philippineLocations[selectedIsland]).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
      });
    }
    
    // Reset and disable province dropdown
    provinceSelect.innerHTML = '<option value="">Select Province/City</option>';
    provinceSelect.disabled = true;
  }

  // Populate province dropdown based on selected region
  function populateProvinceDropdown(selectedIsland, selectedRegion) {
    provinceSelect.innerHTML = '<option value="">Select Province/City</option>';
    provinceSelect.disabled = false;
    
    if (selectedIsland && selectedRegion && philippineLocations[selectedIsland][selectedRegion]) {
      philippineLocations[selectedIsland][selectedRegion].forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
      });
    }
  }

  // Event listeners for cascading dropdowns
  // Island -> Region cascade
  islandSelect.addEventListener('change', (e) => {
    const selectedIsland = e.currentTarget.value;
    populateRegionDropdown(selectedIsland);
  });

  // Region -> Province cascade
  regionSelect.addEventListener('change', (e) => {
    const selectedIsland = islandSelect.value;
    const selectedRegion = e.currentTarget.value;
    populateProvinceDropdown(selectedIsland, selectedRegion);
  });

  // Initialize the dropdowns
  populateIslandDropdown();
});