/* Shared chrome for PALNOX screens: status bar + bottom tab bar.
   Each screen sets <body data-tab="accueil"> and calls PALNOX.chrome(). */
window.PALNOX = {
  tabs: [
    ['accueil','house','Accueil'],
    ['collection','squares-four','Pals'],
    ['nox','sparkle','Nox', true],
    ['carte','map-trifold','Carte'],
    ['profil','user','Profil'],
  ],
  statusbar(){
    return `<div class="statusbar"><span>9:41</span>
      <span class="ic"><i class="ph-fill ph-cell-signal-full"></i><i class="ph-fill ph-wifi-high"></i><i class="ph-fill ph-battery-high"></i></span></div>`;
  },
  tabbar(active){
    return `<nav class="tabbar">`+ this.tabs.map(t=>{
      const [id,ic,label,fab]=t;
      const is = id===active;
      if(fab) return `<a class="tab fab" href="nox.html"><div class="orb"><i class="ph-fill ph-${ic}"></i></div><span>${label}</span></a>`;
      return `<a class="tab ${is?'active':''}" href="${id}.html"><i class="ph${is?'-fill':''} ph-${ic}"></i><span>${label}</span></a>`;
    }).join('')+`</nav>`;
  },
  chrome(){
    const active = document.body.dataset.tab;
    const phone = document.querySelector('.phone');
    phone.insertAdjacentHTML('afterbegin', this.statusbar());
    phone.insertAdjacentHTML('beforeend', this.tabbar(active));
  },
  ringGrad(){
    return `<svg width="0" height="0" style="position:absolute"><defs>
      <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#29D6E6"/><stop offset="100%" stop-color="#8B45E6"/>
      </linearGradient></defs></svg>`;
  }
};
