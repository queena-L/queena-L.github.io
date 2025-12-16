// Main interactive behaviors: menu toggle, dark mode, search, tabs
document.addEventListener('DOMContentLoaded',function(){
  // Menu toggle (collapsible left or right menu)
  const side = document.getElementById('side-menu');
  const toggle = document.getElementById('menu-toggle');
  if(toggle && side){
    toggle.addEventListener('click',()=>{
      const collapsed = side.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded', String(!collapsed));
      side.setAttribute('aria-hidden', String(collapsed));
      // keep checkbox state in sync for accessibility
      try{ toggle.blur(); }catch(e){}
    });
  }

  // Dark mode toggle: adds/removes `dark` on <html>
  const darkToggle = document.getElementById('dark-toggle');
  if(darkToggle){
    // restore preference if available
    try{
      const stored = localStorage.getItem('prefers-dark');
      if(stored === '1') document.documentElement.classList.add('dark');
    }catch(e){}
    darkToggle.addEventListener('change',()=>{
      if(darkToggle.checked){
        document.documentElement.classList.add('dark');
        try{localStorage.setItem('prefers-dark','1')}catch(e){}
      } else {
        document.documentElement.classList.remove('dark');
        try{localStorage.setItem('prefers-dark','0')}catch(e){}
      }
    });
  }

  // Menu search: filters link lists in #menu-panel
  const search = document.getElementById('menu-search');
  if(search){
    search.addEventListener('input',()=>{
      const q = search.value.trim().toLowerCase();
      const lists = document.querySelectorAll('#menu-panel ul');
      lists.forEach(ul=>{
        Array.from(ul.querySelectorAll('li')).forEach(li=>{
          const a = li.querySelector('a');
          if(!a) return;
          const txt = a.textContent.trim().toLowerCase();
          li.style.display = (!q || txt.indexOf(q) !== -1) ? '' : 'none';
        });
      });
    });
  }

  // Tabs helper: any element with .tabs will control .tab-content children
  document.querySelectorAll('.tabs').forEach(tabsEl=>{
    const tabButtons = tabsEl.querySelectorAll('.tab');
    tabButtons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        // deactivate all
        tabButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        if(!target) return;
        document.querySelectorAll('.tab-content').forEach(tc=>tc.classList.remove('active'));
        const el = document.getElementById(target);
        if(el) el.classList.add('active');
      });
    });
    // Activate first tab by default
    const first = tabsEl.querySelector('.tab');
    if(first) first.click();
  });
});

// Utility: call this from other pages if needed
function activateTabByName(name){
  const btn = document.querySelector(`.tab[data-target="${name}"]`);
  if(btn) btn.click();
}
