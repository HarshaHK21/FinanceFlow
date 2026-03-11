// =============================================
// Component Loader System
// Loads reusable HTML components into pages
// =============================================

class ComponentLoader {
  /**
   * Load an HTML component into a target element
   * @param {string} componentPath - Path to the component HTML file
   * @param {string} targetSelector - CSS selector for the target container
   */
  static async load(componentPath, targetSelector) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) throw new Error(`Failed to load component: ${componentPath}`);
      const html = await response.text();
      const target = document.querySelector(targetSelector);
      if (target) {
        target.innerHTML = html;

        // Scripts set via innerHTML are NOT executed by the browser.
        // We must manually extract and re-create them as real script elements.
        const scripts = target.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          // Copy attributes (src, type, etc.)
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          // Copy inline content
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      }
    } catch (error) {
      console.error(`Component load error:`, error);
    }
  }

  /**
   * Load multiple components at once
   * @param {Array<{path: string, target: string}>} components
   */
  static async loadAll(components) {
    const promises = components.map(({ path, target }) =>
      ComponentLoader.load(path, target)
    );
    await Promise.all(promises);
  }
}

// =============================================
// Toast Notification System
// =============================================

class Toast {
  static show(message, type = 'info', duration = 4000) {
    // Remove existing toasts
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';

    const colors = {
      success: { bg: '#f0fdf4', border: '#22c55e', text: '#166534', icon: '✓' },
      error:   { bg: '#fef2f2', border: '#ef4444', text: '#991b1b', icon: '✕' },
      info:    { bg: '#f8fafc', border: '#94a3b8', text: '#1e293b', icon: 'ℹ' },
      warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', icon: '⚠' },
    };

    const c = colors[type] || colors.info;

    toast.style.cssText = `
      position: fixed; top: 24px; right: 24px; z-index: 9999;
      display: flex; align-items: center; gap: 12px;
      padding: 14px 20px; border-radius: 12px;
      background: ${c.bg}; border: 1px solid ${c.border};
      color: ${c.text}; font-size: 14px; font-weight: 500;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08);
      animation: toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Inter', sans-serif;
      max-width: 420px;
    `;

    toast.innerHTML = `
      <span style="font-size:18px;line-height:1;">${c.icon}</span>
      <span>${message}</span>
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes toastSlideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes toastSlideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}
