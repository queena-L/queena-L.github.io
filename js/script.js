document.addEventListener('DOMContentLoaded', () => {
  const side = document.getElementById('side-menu');
  const toggle = document.getElementById('menu-toggle');
  const darkToggle = document.getElementById('dark-toggle');
  const search = document.getElementById('menu-search');

  // Menu toggle (collapse / expand)
  toggle.addEventListener('click', () => {
    const collapsed = side.classList.toggle('collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    side.setAttribute('aria-hidden', String(collapsed));
  });

  // Dark mode: restore preference and persist
  try {
    const stored = localStorage.getItem('prefers-dark');
    if (stored === '1') document.documentElement.classList.add('dark');
    if (darkToggle) darkToggle.checked = (stored === '1');
  } catch (e) {}

  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      if (darkToggle.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('prefers-dark', '1');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('prefers-dark', '0');
      }
    });
  }

  // Simple search: filter links in menu by text
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      document.querySelectorAll('#menu-panel ul').forEach(ul => {
        ul.querySelectorAll('li').forEach(li => {
          const a = li.querySelector('a');
          if (!a) return;
          li.style.display = (!q || a.textContent.toLowerCase().includes(q)) ? '' : 'none';
        });
      });
    });
  }
});
