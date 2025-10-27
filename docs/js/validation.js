// Shared client-side validation and inline error utilities (ES6, accessible)
(() => {
  const getErrorId = (input) => {
    if (!input) return '';
    const base = input.id || input.name || 'field';
    return `${base}-error`;
  };

  const ensureErrorElement = (input) => {
    const id = getErrorId(input);
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.className = 'form-text text-danger';
      el.setAttribute('role', 'alert');
      // Prefer placing inside input-group for consistent spacing
      const group = input.closest('.input-group') || input.parentElement;
      if (group) group.appendChild(el); else input.insertAdjacentElement('afterend', el);
    }
    return el;
  };

  const setFieldError = (input, message) => {
    if (!input) return;
    const el = ensureErrorElement(input);
    el.textContent = message || 'Invalid value.';
    input.setAttribute('aria-invalid', 'true');
    // Attach aria-describedby
    const describedBy = (input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
    if (!describedBy.includes(el.id)) {
      describedBy.push(el.id);
      input.setAttribute('aria-describedby', describedBy.join(' '));
    }
  };

  const clearFieldError = (input) => {
    if (!input) return;
    const id = getErrorId(input);
    const el = document.getElementById(id);
    if (el) el.textContent = '';
    input.removeAttribute('aria-invalid');
    const tokens = (input.getAttribute('aria-describedby') || '').split(' ').filter((t) => t && t !== id);
    if (tokens.length) input.setAttribute('aria-describedby', tokens.join(' '));
    else input.removeAttribute('aria-describedby');
  };

  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || '').trim());
  const minLength = (val, len = 1) => String(val || '').trim().length >= Number(len);

  window.bubbistixValidate = { setFieldError, clearFieldError, isEmail, minLength };
})();