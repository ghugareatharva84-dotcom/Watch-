// ==========================================
// ATHARVA SWISS HOROLOGY - MAIN APPLICATION
// ==========================================

const TOTAL_FRAMES = 300;
const PRODUCTS = [
  {
    id: "legacy-onyx-chrono",
    name: "Legacy Onyx Chronograph",
    price: "₹12,450",
    numericPrice: 12450,
    subtitle: "Dual time zone mechanical movement",
    description: "An austere masterpiece in brushed 316L stainless steel featuring a deep matte onyx dial, sapphire crystal caseback, and our signature Calibre 402 self-winding mechanical movement.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    category: "Watch",
    ctaText: "Buy Now",
    specs: { caseDiameter: "41 mm", material: "316L Stainless Steel & Ceramic Bezel", movement: "Calibre 402 Self-Winding", origin: "Geneva, Switzerland" }
  },
  {
    id: "lumiere-gold-celeste",
    name: "Lumière Gold Celeste",
    price: "₹14,800",
    numericPrice: 14800,
    subtitle: "18k Rose Gold with precision automatic calibre",
    description: "Crafted from solid 18k Rose Gold with hand-polished bevels and a sunburst obsidian dial. Equipped with an ultra-thin 72-hour power reserve.",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=85",
    category: "Watch",
    ctaText: "Buy Now",
    specs: { caseDiameter: "39.5 mm", material: "18k Rose Gold", movement: "Calibre 818 Ultra-Thin", origin: "Geneva, Switzerland" }
  },
  {
    id: "sovereign-platinum-moonphase",
    name: "Sovereign Platinum Moonphase",
    price: "₹13,900",
    numericPrice: 13900,
    subtitle: "Astronomical complication in 950 Platinum",
    description: "An extraordinary horological complication crafted in solid 950 platinum with a hand-hammered midnight lapis dial and perpetual moonphase.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    category: "Watch",
    ctaText: "Buy Now",
    specs: { caseDiameter: "40 mm", material: "950 Platinum & Lapis Lazuli", movement: "Calibre 910 Perpetual Moonphase", origin: "Geneva, Switzerland" }
  },
  {
    id: "royale-obsidian-tourbillon",
    name: "Royale Obsidian Tourbillon",
    price: "₹14,500",
    numericPrice: 14500,
    subtitle: "Flying tourbillon with skeletonized titanium bridge",
    description: "Featuring a visible 60-second flying tourbillon cage suspended within an ultra-light grade-5 brushed titanium case.",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=85",
    category: "Watch",
    ctaText: "Buy Now",
    specs: { caseDiameter: "42 mm", material: "Grade-5 Brushed Titanium", movement: "Calibre T08 Flying Tourbillon", origin: "Geneva, Switzerland" }
  },
  {
    id: "elysee-heritage-automatic",
    name: "Élysée Heritage Automatic",
    price: "₹8,900",
    numericPrice: 8900,
    subtitle: "Guilloché silver dial with blued Breguet hands",
    description: "A tribute to classical Swiss dress watches, boasting a solid silver hand-turned guilloché dial and flame-blued steel hands.",
    image: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=900&q=85",
    category: "Watch",
    ctaText: "Buy Now",
    specs: { caseDiameter: "38.5 mm", material: "316L Stainless Steel & 18k Gold", movement: "Calibre 305 Self-Winding", origin: "Geneva, Switzerland" }
  },
  {
    id: "heritage-bespoke-cufflinks",
    name: "Heritage Bespoke Cufflinks",
    price: "₹6,500",
    numericPrice: 6500,
    subtitle: "Hand-crafted 18k rose gold & enamel monogram",
    description: "Refined sartorial accents inspired by vintage watch balances. Hand-engraved in 18k rose gold with guilloché engraving.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85",
    category: "Jewelry",
    ctaText: "View Piece",
    specs: { material: "18k Rose Gold & Grand Feu Enamel", origin: "Geneva, Switzerland" }
  }
];

// App State
let favorites = ['legacy-onyx-chrono'];
let cartItems = [{ product: PRODUCTS[0], quantity: 1 }];
let selectedProduct = null;
let isBagOpen = false;
let isFavoritesOpen = false;
let isBespokeOpen = false;
let isClientDetailOpen = false;
let isSearchOpen = false;
let isCheckoutOpen = false;
let isContactOpen = false;
let isAboutAtharvaOpen = false;
let searchQuery = '';


// ------------------------------------------
// 1. CANVAS SCROLL ANIMATION ENGINE
// ------------------------------------------
const images = [];
let currentFrame = 1;
let targetFrame = 1;
let lastDrawnFrame = -1;

function getFramePath(idx) {
  const paddedIndex = String(idx).padStart(3, '0');
  return `frames/ezgif-frame-${paddedIndex}.jpg`;
}

function initCanvasAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      if (i === 1 || lastDrawnFrame === -1) {
        drawFrame(1);
      }
    };
    images.push(img);
  }

  function setupCanvasSize() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    lastDrawnFrame = -1;
  }

  function drawFrame(idx) {
    const frameIdx = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(idx)));
    const img = images[frameIdx - 1];
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    ctx.fillStyle = '#0c0c0e';
    ctx.fillRect(0, 0, cw, ch);

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = images[Math.max(0, frameIdx - 1 - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          renderImg(prev, cw, ch);
          return;
        }
        const next = images[Math.min(TOTAL_FRAMES - 1, frameIdx - 1 + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          renderImg(next, cw, ch);
          return;
        }
      }
      return;
    }
    renderImg(img, cw, ch);
    lastDrawnFrame = frameIdx;
  }

  function renderImg(img, cw, ch) {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const ox = (cw - dw) / 2;
    const oy = (ch - dh) / 2;
    ctx.drawImage(img, ox, oy, dw, dh);
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetFrame = 1 + scrollFraction * (TOTAL_FRAMES - 1);
  }

  function animLoop() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.001) {
      currentFrame += diff * 0.15;
    } else {
      currentFrame = targetFrame;
    }
    drawFrame(currentFrame);
    requestAnimationFrame(animLoop);
  }

  setupCanvasSize();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', setupCanvasSize, { passive: true });
  handleScroll();
  animLoop();
}

// ------------------------------------------
// 2. LUXURY MAGNETIC CURSOR (0ms INSTANT TRACKING)
// ------------------------------------------
function initLuxuryCursor() {
  const cursorEl = document.createElement('div');
  cursorEl.id = 'luxury-cursor';
  cursorEl.className = 'fixed pointer-events-none z-50 flex items-center justify-center rounded-full border border-[#d4af37] bg-transparent -translate-x-1/2 -translate-y-1/2';
  cursorEl.style.width = '28px';
  cursorEl.style.height = '28px';
  cursorEl.style.left = '-100px';
  cursorEl.style.top = '-100px';
  cursorEl.style.transition = 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out, border-color 0.15s ease-out, box-shadow 0.15s ease-out, transform 0.1s ease-out';

  const dotEl = document.createElement('div');
  dotEl.id = 'cursor-dot';
  dotEl.className = 'w-1 h-1 rounded-full bg-[#d4af37]';
  cursorEl.appendChild(dotEl);

  const textEl = document.createElement('span');
  textEl.id = 'cursor-text';
  textEl.className = 'text-[9px] font-bold tracking-widest text-[#f5ebd2] uppercase px-1 text-center font-display-luxury hidden';
  cursorEl.appendChild(textEl);

  document.body.appendChild(cursorEl);

  let mouseX = -100, mouseY = -100;
  let hoverMode = 'normal';
  let targetBtn = null;

  function updateCursorPosition(x, y) {
    let posX = x;
    let posY = y;

    if (hoverMode === 'button' && targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      posX = x + (btnCenterX - x) * 0.35;
      posY = y + (btnCenterY - y) * 0.35;
    }

    cursorEl.style.left = `${posX}px`;
    cursorEl.style.top = `${posY}px`;
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const elem = document.elementFromPoint(mouseX, mouseY);
    if (elem) {
      const isWatch = elem.closest('#hero-canvas, .watch-interactive-area, #hero-section');
      const isBtn = elem.closest('button, a, input, select, [role="button"], .interactive-btn');

      if (isWatch && !isBtn) {
        hoverMode = 'watch';
        targetBtn = null;
        textEl.innerText = 'ROTATE';
        textEl.classList.remove('hidden');
        dotEl.classList.add('hidden');
        cursorEl.style.width = '68px';
        cursorEl.style.height = '68px';
        cursorEl.className = 'fixed pointer-events-none z-50 flex items-center justify-center rounded-full border-2 border-[#f0ece1] bg-black/50 backdrop-blur-[4px] shadow-[0_0_25px_rgba(255,255,255,0.25)] -translate-x-1/2 -translate-y-1/2';

        const wrapper = document.getElementById('watch-canvas-wrapper');
        if (wrapper) {
          const tiltX = (mouseY - window.innerHeight / 2) * 0.025;
          const tiltY = -(mouseX - window.innerWidth / 2) * 0.025;
          wrapper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
      } else if (isBtn) {
        hoverMode = 'button';
        targetBtn = isBtn;
        const label = isBtn.getAttribute('data-cursor-text') || (isBtn.innerText?.length < 12 ? isBtn.innerText : 'EXPLORE') || 'VIEW';
        textEl.innerText = label.toUpperCase();
        textEl.classList.remove('hidden');
        dotEl.classList.add('hidden');
        cursorEl.style.width = '42px';
        cursorEl.style.height = '42px';
        cursorEl.className = 'fixed pointer-events-none z-50 flex items-center justify-center rounded-full border border-[#d4af37] bg-[#d4af37]/15 backdrop-blur-[2px] shadow-[0_0_20px_rgba(212,175,55,0.35)] -translate-x-1/2 -translate-y-1/2';

        const wrapper = document.getElementById('watch-canvas-wrapper');
        if (wrapper) wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      } else {
        hoverMode = 'normal';
        targetBtn = null;
        textEl.classList.add('hidden');
        dotEl.classList.remove('hidden');
        cursorEl.style.width = '28px';
        cursorEl.style.height = '28px';
        cursorEl.className = 'fixed pointer-events-none z-50 flex items-center justify-center rounded-full border border-[#d4af37] bg-transparent -translate-x-1/2 -translate-y-1/2';

        const wrapper = document.getElementById('watch-canvas-wrapper');
        if (wrapper) wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      }
    }

    updateCursorPosition(mouseX, mouseY);
  });

  window.addEventListener('mousedown', (e) => {
    cursorEl.style.transform = 'translate(-50%, -50%) scale(0.75)';

    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple-anim fixed rounded-full border border-[#d4af37]/70 pointer-events-none z-50';
    ripple.style.width = '40px';
    ripple.style.height = '40px';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);

    const glow = document.createElement('div');
    glow.className = 'cursor-glow-anim fixed rounded-full pointer-events-none z-50';
    glow.style.width = '90px';
    glow.style.height = '90px';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0) 70%)';
    document.body.appendChild(glow);
    setTimeout(() => glow.remove(), 350);
  });

  window.addEventListener('mouseup', () => {
    cursorEl.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

// ------------------------------------------
// 3. UI RENDERING & EVENT LISTENERS
// ------------------------------------------
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  app.innerHTML = `
    <!-- HEADER -->
    <header class="sticky top-0 z-40 w-full bg-[#0c0c0e]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#home" id="brand-atharva-link" onclick="window.scrollTo({top:0, behavior:'smooth'})" data-cursor-text="Home" class="flex items-center gap-2.5 group">
          <div class="w-10 h-10 rounded-full border border-[#d4af37]/40 bg-gradient-to-br from-[#23232a] to-[#121216] flex items-center justify-center group-hover:border-[#d4af37]/80 transition-all">
            <span class="font-display-luxury text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#eedfa1] to-[#cba358]">A</span>
          </div>
          <span class="font-display-luxury text-base tracking-[0.24em] text-[#efedea] font-semibold hidden sm:inline-block">ATHARVA</span>
        </a>

        <nav class="hidden md:flex items-center gap-8">
          <div class="flex items-center gap-7">
            <a href="#home" data-cursor-text="Home" class="text-sm tracking-wide text-[#f0ece1] font-semibold py-1">Home</a>
            <a href="#collection" data-cursor-text="Collection" class="text-sm tracking-wide text-neutral-400 hover:text-[#e4decf] py-1">Collection</a>
            <a href="#artistry" data-cursor-text="Artistry" class="text-sm tracking-wide text-neutral-400 hover:text-[#e4decf] py-1">Artistry</a>
            <button id="btn-nav-contact" data-cursor-text="Contact" class="text-sm tracking-wide text-neutral-400 hover:text-[#e4decf] py-1 bg-transparent border-0 cursor-pointer">Contact</button>
          </div>
          <div class="h-4 w-[1px] bg-white/10"></div>
          <div class="flex items-center gap-4 text-neutral-400">
            <button id="btn-open-search" data-cursor-text="Search" class="hover:text-[#e8d5a1] p-1.5 rounded-full hover:bg-white/5">🌐</button>
            <button id="btn-open-favorites" data-cursor-text="Saved" class="relative hover:text-[#e8d5a1] p-1.5 rounded-full hover:bg-white/5">
              ♥
              ${favorites.length > 0 ? `<span class="absolute -top-1 -right-1 w-4 h-4 bg-[#d4af37] text-[#0c0c0e] text-[9px] font-bold rounded-full flex items-center justify-center">${favorites.length}</span>` : ''}
            </button>
          </div>
        </nav>

        <div class="flex items-center gap-3">
          <button id="btn-open-client" data-cursor-text="Client" class="w-10 h-10 rounded-full bg-[#1e1e24]/70 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#f0ece1]">👤</button>
          <button id="btn-open-bag" data-cursor-text="Bag" class="w-10 h-10 rounded-full bg-[#1e1e24]/70 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#f0ece1] relative">
            🛍
            ${totalCartCount > 0 ? `<span class="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#d4af37] text-[#0c0c0e] text-[10px] font-bold rounded-full flex items-center justify-center">${totalCartCount}</span>` : ''}
          </button>
          <button id="btn-open-bespoke" data-cursor-text="Consult" class="ml-2 px-5 py-2.5 rounded-full bg-[#f2efe9] text-[#111116] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#d4af37] hover:text-[#0c0c0e] transition-all shadow-md">Consultation</button>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="space-y-16 pb-24 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HERO BANNER -->
      <section id="home" class="relative">
        <div id="hero-section" class="watch-interactive-area relative w-full rounded-[32px] overflow-hidden border border-white/[0.12] shadow-2xl bg-[#141419]/60 backdrop-blur-md min-h-[520px] sm:min-h-[580px] flex flex-col justify-center items-center text-center px-6 py-16 group">
          <div class="absolute inset-0 bg-gradient-to-b from-[#0c0c0e]/70 via-[#0c0c0e]/40 to-[#0c0c0e]/85 backdrop-blur-[1px]"></div>
          <div class="absolute top-6 right-8 text-white/30 text-xs font-mono tracking-widest uppercase">01 // Swiss Calibre 300-Frame Engine</div>
          
          <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h1 class="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#fbf9f4] leading-[1.08] mb-5 drop-shadow-lg">
              Timeless <br className="hidden sm:block" /> Craftsmanship.
            </h1>
            <p class="font-garamond text-lg sm:text-xl md:text-2xl text-[#d4cfc5] max-w-2xl mx-auto mb-8 font-normal leading-relaxed opacity-95">
              Where ancient horological heritage meets the pinnacle of modern Swiss mechanical artistry.
            </p>
            <button onclick="document.getElementById('collection').scrollIntoView({behavior:'smooth'})" data-cursor-text="Explore" class="px-8 py-3.5 rounded-full border border-[#f0ece1]/35 bg-[#18181d]/60 hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0c0c0e] text-[#f2efe9] text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 backdrop-blur-md shadow-lg">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      <!-- PRODUCT GRID SECTION -->
      <section id="collection" class="pt-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[#d4af37]">✨</span>
              <span class="text-xs uppercase tracking-[0.24em] text-[#d4af37] font-semibold">Curated Collection</span>
            </div>
            <h2 class="font-serif-luxury text-3xl sm:text-5xl font-medium text-[#fbf9f4] tracking-tight">Horological Masterpieces</h2>
          </div>
          <p class="text-sm text-neutral-400 max-w-md">Each piece represents over 450 hours of hand engraving and Swiss mechanical engineering.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${PRODUCTS.map((p) => {
            const isFav = favorites.includes(p.id);
            return `
              <div class="luxury-card rounded-[24px] overflow-hidden border border-white/[0.08] hover:border-[#d4af37]/40 transition-all duration-500 flex flex-col group">
                <div class="relative h-72 overflow-hidden bg-black/40">
                  <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-60"></div>
                  
                  <button data-action="toggle-fav" data-id="${p.id}" data-cursor-text="Save" class="absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${isFav ? 'bg-[#d4af37] text-[#0c0c0e]' : 'bg-black/50 text-white/70 hover:text-white border border-white/10'}">
                    ♥
                  </button>

                  <button data-action="quick-view" data-id="${p.id}" data-cursor-text="Quick View" class="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-neutral-200 hover:text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    👁 Quick View
                  </button>
                </div>

                <div class="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div class="text-xs text-[#d4af37] uppercase tracking-wider font-semibold mb-1">${p.category}</div>
                    <h3 class="font-serif-luxury text-2xl font-medium text-[#fbf9f4] mb-1">${p.name}</h3>
                    <p class="text-xs text-neutral-400 mb-4 line-clamp-2">${p.subtitle}</p>
                  </div>

                  <div class="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                    <span class="font-display-luxury text-lg font-bold text-[#f2efe9]">${p.price}</span>
                    <button data-action="add-cart" data-id="${p.id}" data-cursor-text="Buy Now" class="px-5 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e8d5a1] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-md transition-all">
                      ${p.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- CRAFTSMANSHIP SECTION -->
      <section id="artistry" class="pt-8">
        <div class="luxury-card rounded-[32px] overflow-hidden border border-white/[0.1] grid grid-cols-1 lg:grid-cols-12 bg-[#141419]/90">
          <div class="lg:col-span-6 relative min-h-[420px] lg:min-h-[500px]">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85" alt="Craftsmanship" class="absolute inset-0 w-full h-full object-cover object-top" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent opacity-80"></div>
            
            <div class="absolute bottom-6 left-6 z-10 flex items-center gap-3">
              <div class="flex items-center gap-2 bg-[#0c0c0e]/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                <span class="text-[#d4af37]">✓</span>
                <span class="text-xs font-semibold text-[#f0ece1]">100% Swiss Certified</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[#d4af37]">✨</span>
              <span class="text-xs uppercase tracking-[0.24em] text-[#d4af37] font-semibold">The Heritage</span>
            </div>
            <h2 class="font-serif-luxury text-3xl sm:text-5xl font-medium text-[#fbf9f4] mb-6">Craftsmanship <br /> Section</h2>
            <p class="font-garamond text-base sm:text-lg text-neutral-300 leading-relaxed mb-8">
              Rooted in centuries of Swiss horological mastery, each timepiece undergoes over 450 hours of meticulous hand-assembly, engraving, and precision adjustment.
            </p>
            <button id="btn-craft-learn" data-cursor-text="Learn" class="self-start px-8 py-3.5 rounded-full bg-gradient-to-r from-[#dec68a] to-[#c79d4b] text-[#121217] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:brightness-110 shadow-lg transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer id="contact" class="border-t border-white/[0.08] py-8 px-4 text-center text-xs text-neutral-500 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="font-display-luxury tracking-[0.24em] text-neutral-400 flex items-center gap-2">
        <button id="btn-footer-atharva" data-cursor-text="About" class="hover:text-[#d4af37] transition-colors cursor-pointer bg-transparent border-0">ATHARVA</button>
        <span>— GENEVE • LONDON • TOKYO</span>
      </div>
      <div class="flex items-center gap-4">
        <button id="btn-footer-contact" data-cursor-text="Contact" class="hover:text-[#d4af37] transition-colors cursor-pointer bg-transparent border-0 text-neutral-400">Contact Info</button>
        <span>© ${new Date().getFullYear()} Atharva Swiss Horology. All rights reserved.</span>
      </div>
    </footer>

    <!-- MODALS CONTAINER -->
    <div id="modal-container"></div>
  `;

  attachEventListeners();
  renderModals();
}

function attachEventListeners() {
  document.getElementById('btn-open-bag')?.addEventListener('click', () => { isBagOpen = true; renderModals(); });
  document.getElementById('btn-open-favorites')?.addEventListener('click', () => { isFavoritesOpen = true; renderModals(); });
  document.getElementById('btn-open-bespoke')?.addEventListener('click', () => { isBespokeOpen = true; renderModals(); });
  document.getElementById('btn-open-client')?.addEventListener('click', () => { isClientDetailOpen = true; renderModals(); });
  document.getElementById('btn-open-search')?.addEventListener('click', () => { isSearchOpen = true; renderModals(); });
  document.getElementById('btn-craft-learn')?.addEventListener('click', () => { isBespokeOpen = true; renderModals(); });
  
  // Contact & About Atharva Triggers
  document.getElementById('btn-nav-contact')?.addEventListener('click', (e) => { e.preventDefault(); isContactOpen = true; renderModals(); });
  document.getElementById('btn-footer-contact')?.addEventListener('click', (e) => { e.preventDefault(); isContactOpen = true; renderModals(); });
  document.getElementById('brand-atharva-link')?.addEventListener('click', (e) => { e.preventDefault(); isAboutAtharvaOpen = true; renderModals(); });
  document.getElementById('btn-footer-atharva')?.addEventListener('click', (e) => { e.preventDefault(); isAboutAtharvaOpen = true; renderModals(); });

  document.querySelectorAll('[data-action="add-cart"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const p = PRODUCTS.find((item) => item.id === id);
      if (p) addToCart(p);
    });
  });

  document.querySelectorAll('[data-action="toggle-fav"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      toggleFavorite(id);
    });
  });

  document.querySelectorAll('[data-action="quick-view"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      selectedProduct = PRODUCTS.find((item) => item.id === id);
      renderModals();
    });
  });
}

function addToCart(product) {
  const existing = cartItems.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ product, quantity: 1 });
  }
  showToast(`Added ${product.name} to Shopping Bag`);
  renderApp();
}

function updateCartQuantity(productId, delta) {
  const index = cartItems.findIndex(item => item.product.id === productId);
  if (index !== -1) {
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
  }
  renderApp();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.product.id !== productId);
  showToast("Item removed from Shopping Bag");
  renderApp();
}

function toggleFavorite(id) {
  const p = PRODUCTS.find((item) => item.id === id);
  if (!p) return;
  if (favorites.includes(id)) {
    favorites = favorites.filter((item) => item !== id);
    showToast(`Removed ${p.name} from Saved`);
  } else {
    favorites.push(id);
    showToast(`Saved ${p.name} to Favorites`);
  }
  renderApp();
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-[#18181f] border border-[#d4af37]/40 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce';
  toast.innerHTML = `<span class="text-[#d4af37]">✓</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderModals() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  let html = '';

  // 1. Quick View Modal
  if (selectedProduct) {
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-2xl w-full p-6 sm:p-8 relative border border-white/15 overflow-hidden">
          <button id="modal-close-qv" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="rounded-2xl overflow-hidden bg-black/40 h-64 sm:h-auto">
              <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col justify-between">
              <div>
                <span class="text-xs text-[#d4af37] uppercase font-semibold">${selectedProduct.category}</span>
                <h3 class="font-serif-luxury text-2xl font-medium text-white mb-2">${selectedProduct.name}</h3>
                <p class="text-xs text-neutral-300 mb-4">${selectedProduct.description}</p>
                <div class="space-y-1.5 text-xs text-neutral-400 border-t border-white/10 pt-3">
                  ${selectedProduct.specs.caseDiameter ? `<div><strong>Diameter:</strong> ${selectedProduct.specs.caseDiameter}</div>` : ''}
                  <div><strong>Material:</strong> ${selectedProduct.specs.material}</div>
                  <div><strong>Origin:</strong> ${selectedProduct.specs.origin}</div>
                </div>
              </div>
              <div class="pt-6 flex items-center justify-between">
                <span class="font-display-luxury text-xl text-[#d4af37] font-bold">${selectedProduct.price}</span>
                <button id="qv-btn-add" data-cursor-text="Add" class="px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase">Add to Bag</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Shopping Bag Drawer (with +/- quantity controls, remove item button, and checkout modal trigger)
  if (isBagOpen) {
    const total = cartItems.reduce((sum, item) => sum + item.product.numericPrice * item.quantity, 0);
    html += `
      <div class="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
        <div class="w-full max-w-md bg-[#121216] border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div class="flex items-center gap-2">
                <span class="text-[#d4af37]">🛍</span>
                <h3 class="font-serif-luxury text-2xl text-white font-medium">Shopping Bag</h3>
              </div>
              <button id="bag-close" data-cursor-text="Close" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>
            </div>

            ${cartItems.length === 0 ? `
              <div class="text-center py-16">
                <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-2xl">🛍</div>
                <p class="text-base text-neutral-300 font-serif-luxury mb-1">Your bag is empty</p>
                <p class="text-xs text-neutral-500">Explore our collection to add horological pieces.</p>
              </div>
            ` : `
              <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                ${cartItems.map(item => `
                  <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 relative group">
                    <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded-xl border border-white/10" />
                    <div class="flex-1">
                      <h4 class="font-serif-luxury text-base text-white font-medium">${item.product.name}</h4>
                      <div class="text-xs font-display-luxury text-[#d4af37] font-semibold mt-0.5">${item.product.price}</div>
                      
                      <!-- Quantity Controls -->
                      <div class="flex items-center gap-3 mt-2.5">
                        <div class="flex items-center border border-white/15 rounded-lg overflow-hidden bg-black/40">
                          <button data-action="qty-minus" data-id="${item.product.id}" data-cursor-text="Decrease" class="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors">-</button>
                          <span class="w-7 text-center text-xs text-white font-medium">${item.quantity}</span>
                          <button data-action="qty-plus" data-id="${item.product.id}" data-cursor-text="Increase" class="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors">+</button>
                        </div>

                        <!-- Remove Button -->
                        <button data-action="remove-item" data-id="${item.product.id}" data-cursor-text="Remove" class="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors pl-2 border-l border-white/10">
                          🗑 Remove
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          ${cartItems.length > 0 ? `
            <div class="pt-5 border-t border-white/10 bg-[#121216]">
              <div class="space-y-2 mb-5">
                <div class="flex items-center justify-between text-xs text-neutral-400">
                  <span>Subtotal</span>
                  <span class="text-white">₹${total.toLocaleString()}</span>
                </div>
                <div class="flex items-center justify-between text-xs text-neutral-400">
                  <span>Insured Swiss Express Shipping</span>
                  <span class="text-emerald-400 font-medium">Complimentary</span>
                </div>
                <div class="flex items-center justify-between text-base pt-2 border-t border-white/10">
                  <span class="text-white font-medium">Total</span>
                  <span class="font-display-luxury text-xl text-[#d4af37] font-bold">₹${total.toLocaleString()}</span>
                </div>
              </div>

              <!-- Checkout Button -->
              <button id="btn-proceed-checkout" data-cursor-text="Checkout" class="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#ebd7a5] to-[#c79d4b] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 3. Interactive Checkout Modal
  if (isCheckoutOpen) {
    const grandTotal = cartItems.reduce((sum, item) => sum + item.product.numericPrice * item.quantity, 0);
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-2xl w-full p-6 sm:p-8 relative border border-[#d4af37]/30 shadow-2xl max-h-[90vh] overflow-y-auto">
          <button id="checkout-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>

          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">🔒</div>
            <div>
              <h3 class="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">Private Order Checkout</h3>
              <p class="text-xs text-neutral-400">Insured express delivery from Geneva, Switzerland</p>
            </div>
          </div>

          <hr class="border-white/10 my-4" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column: Shipping & Payment Details -->
            <form id="checkout-form" class="space-y-3.5">
              <h4 class="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">1. Client Shipping Address</h4>
              
              <div>
                <label class="text-[11px] text-neutral-300 block mb-1">Full Name</label>
                <input required type="text" placeholder="Lord / Lady Sterling" class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]" />
              </div>

              <div>
                <label class="text-[11px] text-neutral-300 block mb-1">Email Address</label>
                <input required type="email" placeholder="client@domain.com" class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]" />
              </div>

              <div>
                <label class="text-[11px] text-neutral-300 block mb-1">Delivery Address</label>
                <input required type="text" placeholder="Penthouse 4B, Central Avenue" class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[11px] text-neutral-300 block mb-1">City</label>
                  <input required type="text" placeholder="Geneva / London" class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label class="text-[11px] text-neutral-300 block mb-1">Postal Code</label>
                  <input required type="text" placeholder="1201 SW" class="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]" />
                </div>
              </div>

              <h4 class="text-xs uppercase tracking-widest text-[#d4af37] font-semibold pt-3">2. Payment Method</h4>
              <div class="space-y-2">
                <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-[#d4af37]/40 cursor-pointer">
                  <input type="radio" name="payment" checked class="accent-[#d4af37]" />
                  <span class="text-xs text-white">💳 Premium Credit Card / AMEX</span>
                </label>
                <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <input type="radio" name="payment" class="accent-[#d4af37]" />
                  <span class="text-xs text-white">🏛 Private Swiss Wire Transfer</span>
                </label>
                <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <input type="radio" name="payment" class="accent-[#d4af37]" />
                  <span class="text-xs text-white"> Apple Pay / Concierge Pay</span>
                </label>
              </div>

              <button type="submit" data-cursor-text="Order" class="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#ebd7a5] to-[#c79d4b] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg transition-all mt-4">
                Confirm & Pay ₹${grandTotal.toLocaleString()}
              </button>
            </form>

            <!-- Right Column: Order Summary Box -->
            <div class="bg-black/50 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div>
                <h4 class="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">Order Items (${cartItems.length})</h4>
                <div class="space-y-3 max-h-52 overflow-y-auto pr-1">
                  ${cartItems.map(item => `
                    <div class="flex items-center gap-3 pb-2 border-b border-white/5">
                      <img src="${item.product.image}" alt="${item.product.name}" class="w-12 h-12 object-cover rounded-lg" />
                      <div class="flex-1 text-xs">
                        <div class="text-white font-medium">${item.product.name}</div>
                        <div class="text-neutral-400">Qty: ${item.quantity} × ${item.product.price}</div>
                      </div>
                      <div class="text-xs font-display-luxury text-[#d4af37] font-semibold">
                        ₹${(item.product.numericPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-4 border-t border-white/10 space-y-1.5 text-xs text-neutral-300">
                <div class="flex justify-between"><span>Items Subtotal:</span><span>₹${grandTotal.toLocaleString()}</span></div>
                <div class="flex justify-between text-emerald-400"><span>Swiss Express Courier:</span><span>Complimentary</span></div>
                <div class="flex justify-between text-emerald-400"><span>5-Year International Warranty:</span><span>Included</span></div>
                <div class="flex justify-between text-sm font-bold text-[#d4af37] pt-2 border-t border-white/10">
                  <span>Grand Total:</span>
                  <span class="font-display-luxury">₹${grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. Bespoke Modal
  if (isBespokeOpen) {
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-lg w-full p-6 sm:p-8 relative border border-white/15">
          <button id="bespoke-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
          <h3 class="font-serif-luxury text-3xl font-medium text-white mb-2">Bespoke Consultation</h3>
          <p class="text-xs text-neutral-400 mb-6">Schedule a private horological consultation with our Geneva master artisans.</p>
          <form id="bespoke-form" class="space-y-4">
            <div>
              <label class="text-xs text-neutral-300 block mb-1">Full Name</label>
              <input required type="text" placeholder="Client Name" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label class="text-xs text-neutral-300 block mb-1">Email</label>
              <input required type="email" placeholder="client@geneva.ch" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]" />
            </div>
            <button type="submit" data-cursor-text="Submit" class="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e8d5a1] text-black font-semibold text-xs uppercase tracking-wider mt-4">Confirm Appointment</button>
          </form>
        </div>
      </div>
    `;
  }

  // 5. Favorites Modal (Saved Items)
  if (isFavoritesOpen) {
    const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-xl w-full p-6 sm:p-8 relative border border-white/15 shadow-2xl">
          <button id="fav-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>
          <div class="flex items-center gap-2 mb-6">
            <span class="text-xl text-[#d4af37]">♥</span>
            <h3 class="font-serif-luxury text-3xl font-medium text-white">Saved Timepieces</h3>
          </div>
          ${favProducts.length === 0 ? '<p class="text-sm text-neutral-400 text-center py-8">No saved pieces in your wishlist.</p>' : `
            <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              ${favProducts.map(p => `
                <div class="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div class="flex items-center gap-3.5">
                    <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-xl border border-white/10" />
                    <div>
                      <h4 class="font-serif-luxury text-base text-white font-medium">${p.name}</h4>
                      <div class="text-xs text-[#d4af37] font-semibold">${p.price}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button data-action="fav-add" data-id="${p.id}" data-cursor-text="Add" class="px-3.5 py-1.5 rounded-full bg-[#d4af37] text-black text-xs font-semibold uppercase hover:brightness-110 shadow-md">Add to Bag</button>
                    <button data-action="remove-fav" data-id="${p.id}" data-cursor-text="Remove" class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 text-xs transition-colors flex items-center gap-1" title="Remove item">
                      🗑 Remove
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // 6. Client Portal Modal
  if (isClientDetailOpen) {
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-md w-full p-6 sm:p-8 relative border border-white/15 text-center">
          <button id="client-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
          <div class="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4 text-[#d4af37] font-bold text-xl">👤</div>
          <h3 class="font-serif-luxury text-2xl font-medium text-white mb-1">Atharva Private Client Portal</h3>
          <p class="text-xs text-neutral-400 mb-6">Geneva Access #849204</p>
          <div class="bg-white/5 rounded-2xl p-4 text-left space-y-2 text-xs text-neutral-300 mb-6 border border-white/5">
            <div class="flex justify-between"><span>Status:</span><span class="text-[#d4af37] font-semibold">VIP Collector</span></div>
            <div class="flex justify-between"><span>Saved Pieces:</span><span>${favorites.length} Items</span></div>
          </div>
          <button id="client-btn-consult" data-cursor-text="Consult" class="w-full py-3 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase">Request Private Appointment</button>
        </div>
      </div>
    `;
  }

  // 7. Search Modal (Dynamic Filtering)
  if (isSearchOpen) {
    const q = searchQuery.toLowerCase().trim();
    const filteredProducts = PRODUCTS.filter(p => {
      if (!q) return true;
      return p.name.toLowerCase().includes(q) ||
             p.subtitle.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q);
    });

    html += `
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-xl w-full p-6 relative border border-white/15 shadow-2xl">
          <button id="search-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
          <h3 class="font-serif-luxury text-2xl font-medium text-white mb-4">Search Horology Collection</h3>
          <div class="relative mb-4">
            <input id="search-input" type="text" value="${searchQuery}" placeholder="Type watch name (e.g. Onyx, Gold, Moonphase)..." class="w-full px-4 py-3 pl-10 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]" />
            <span class="absolute left-3.5 top-3.5 text-neutral-400 text-sm">🔍</span>
          </div>
          <div id="search-results" class="space-y-2 max-h-60 overflow-y-auto pr-1">
            ${filteredProducts.length === 0 ? `
              <div class="p-6 text-center text-xs text-neutral-400">No timepieces found matching "${searchQuery}"</div>
            ` : filteredProducts.map(p => `
              <div data-action="search-select" data-id="${p.id}" class="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between cursor-pointer border border-white/5 transition-colors">
                <div class="flex items-center gap-3">
                  <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <div class="text-sm text-white font-medium">${p.name}</div>
                    <div class="text-[11px] text-neutral-400">${p.subtitle}</div>
                  </div>
                </div>
                <span class="text-xs text-[#d4af37] font-semibold font-display-luxury">${p.price}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 8. Contact Modal
  if (isContactOpen) {
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-md w-full p-6 sm:p-8 relative border border-[#d4af37]/40 shadow-2xl text-center">
          <button id="contact-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>
          <div class="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4 text-[#d4af37] text-2xl shadow-inner">✉️</div>
          <h3 class="font-serif-luxury text-3xl font-medium text-white mb-2">Contact Us</h3>
          <p class="text-xs text-neutral-400 mb-6">Student & Institute Contact Details</p>
          <div class="bg-white/5 rounded-2xl p-5 text-left space-y-4 border border-white/10 text-sm">
            <div>
              <span class="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">Email Address</span>
              <a href="mailto:atharva.ghugare@vpt.edu.in" class="text-white font-medium hover:text-[#d4af37] transition-colors break-all">Email-atharva.ghugare@vpt.edu.in</a>
            </div>
            <div class="pt-3 border-t border-white/10">
              <span class="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">College</span>
              <span class="text-white font-medium">College - Vidyalankar Polytechnic</span>
            </div>
            <div class="pt-3 border-t border-white/10">
              <span class="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">LinkedIn Profile</span>
              <a href="https://www.linkedin.com/in/atharva-ghugare-725a703b6?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" class="text-white font-medium hover:text-[#d4af37] transition-colors break-all underline">Linkedln -https://www.linkedin.com/in/atharva-ghugare-725a703b6?utm_source=share_via&utm_content=profile&utm_medium=member_android</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 9. About ATHARVA Creator Modal
  if (isAboutAtharvaOpen) {
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="luxury-card rounded-[28px] max-w-md w-full p-6 sm:p-8 relative border border-[#d4af37]/40 shadow-2xl text-center">
          <button id="about-atharva-close" data-cursor-text="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">✕</button>
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b58f27] flex items-center justify-center mx-auto mb-4 text-[#0c0c0e] font-bold text-2xl shadow-lg font-display-luxury">
            A
          </div>
          <h3 class="font-serif-luxury text-3xl font-medium text-white mb-1">ATHARVA</h3>
          <p class="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-5">Creator Information</p>
          
          <div class="bg-white/5 rounded-2xl p-5 text-center border border-white/10 leading-relaxed text-sm text-neutral-200 shadow-inner font-medium">
            Atharva Ghugare has built this prototype website — 2nd year Computer Engineering student at Vidyalankar Polytechnic.
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  attachModalEvents();
}

function attachModalEvents() {
  document.getElementById('modal-close-qv')?.addEventListener('click', () => { selectedProduct = null; renderModals(); });
  document.getElementById('qv-btn-add')?.addEventListener('click', () => { if (selectedProduct) addToCart(selectedProduct); selectedProduct = null; renderModals(); });
  
  document.getElementById('bag-close')?.addEventListener('click', () => { isBagOpen = false; renderModals(); });
  document.getElementById('bespoke-close')?.addEventListener('click', () => { isBespokeOpen = false; renderModals(); });
  document.getElementById('fav-close')?.addEventListener('click', () => { isFavoritesOpen = false; renderModals(); });
  document.getElementById('client-close')?.addEventListener('click', () => { isClientDetailOpen = false; renderModals(); });
  document.getElementById('search-close')?.addEventListener('click', () => { isSearchOpen = false; searchQuery = ''; renderModals(); });
  document.getElementById('contact-close')?.addEventListener('click', () => { isContactOpen = false; renderModals(); });
  document.getElementById('about-atharva-close')?.addEventListener('click', () => { isAboutAtharvaOpen = false; renderModals(); });

  // Handle Search Input Live Filtering
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.focus();
    searchInput.setSelectionRange(searchQuery.length, searchQuery.length);
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderModals();
    });
  }

  // Shopping Bag Quantity Plus / Minus / Remove buttons
  document.querySelectorAll('[data-action="qty-plus"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      updateCartQuantity(id, 1);
    });
  });

  document.querySelectorAll('[data-action="qty-minus"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      updateCartQuantity(id, -1);
    });
  });

  document.querySelectorAll('[data-action="remove-item"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      removeFromCart(id);
    });
  });

  // Saved / Wishlist Items - Remove button handler
  document.querySelectorAll('[data-action="remove-fav"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      toggleFavorite(id);
      renderModals();
    });
  });

  // Open Checkout Modal
  document.getElementById('btn-proceed-checkout')?.addEventListener('click', () => {
    isBagOpen = false;
    isCheckoutOpen = true;
    renderModals();
  });

  // Close Checkout Modal
  document.getElementById('checkout-close')?.addEventListener('click', () => {
    isCheckoutOpen = false;
    renderModals();
  });

  // Checkout Form Submission
  document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your private watch order has been placed successfully. An express insured dispatch confirmation from Geneva has been sent to your email.');
    cartItems = [];
    isCheckoutOpen = false;
    renderApp();
  });

  document.getElementById('client-btn-consult')?.addEventListener('click', () => { isClientDetailOpen = false; isBespokeOpen = true; renderModals(); });

  document.getElementById('bespoke-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Consultation Appointment Confirmed with Geneva Master Artisans.');
    isBespokeOpen = false;
    renderModals();
  });

  document.querySelectorAll('[data-action="fav-add"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const p = PRODUCTS.find(item => item.id === id);
      if (p) addToCart(p);
      isFavoritesOpen = false;
      renderModals();
    });
  });

  document.querySelectorAll('[data-action="search-select"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      selectedProduct = PRODUCTS.find(item => item.id === id);
      isSearchOpen = false;
      searchQuery = '';
      renderModals();
    });
  });
}

// ------------------------------------------
// 4. INITIALIZATION
// ------------------------------------------
function init() {
  initCanvasAnimation();
  initLuxuryCursor();
  renderApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
