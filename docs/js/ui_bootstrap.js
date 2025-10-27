// Lightweight Bootstrap UI helpers for consistent toasts (non-breaking)
// Uses ES6 syntax and keeps behavior accessible and keyboard-friendly.

(() => {
  // Ensure there is a toast container on the page.
  const ensureToastContainer = (position = 'center') => {
    const map = {
      center: {
        id: 'toastContainerCenter',
        className: 'toast-container position-fixed top-50 start-50 translate-middle p-3',
      },
      'top-right': {
        id: 'toastContainerTopRight',
        className: 'toast-container position-fixed top-0 end-0 p-3',
      },
    };

    const target = map[position] || map.center;
    let container = document.getElementById(target.id)
      || document.getElementById('toastContainer') // Backward compatibility
      || null;

    if (!container) {
      container = document.createElement('div');
      container.id = target.id;
      container.className = target.className;
      container.style.zIndex = '1080';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    } else {
      // Normalize class and attributes for the chosen position
      container.id = target.id; // migrate old id if necessary
      container.className = target.className;
      container.style.zIndex = '1080';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
    }
    return container;
  };

  // Show a branded toast using Bootstrap's JavaScript API
  // Example: showToast({ title: 'Added to Cart', message: 'Item added!', autohide: true, delay: 3000 })
  const showToast = ({ title = 'Notification', message = '', autohide = true, delay = 3000, position = 'center' } = {}) => {
    const container = ensureToastContainer(position);

    const toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.dataset.bsAutohide = autohide ? 'true' : 'false';
    toastEl.dataset.bsDelay = String(delay);

    toastEl.innerHTML = `
      <div class="toast-header bubbistix-toast-header">
        <strong class="me-auto toast-title">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">${message}</div>
    `;

    container.appendChild(toastEl);

    // Initialize and show via Bootstrap API
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    // Focus close button for quick keyboard dismissal
    const closeBtn = toastEl.querySelector('[data-bs-dismiss="toast"]');
    if (closeBtn) closeBtn.focus();

    // Cleanup after hidden to avoid DOM bloat
    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  };

  // Expose a minimal API without polluting global scope
  window.bubbistixUI = { showToast };
})();