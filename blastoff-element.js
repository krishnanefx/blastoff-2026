/* =============================================================================
 * <ukssc-blastoff> — UKSSC Blastoff! 2026 landing section
 * -----------------------------------------------------------------------------
 * A single self-contained Web Component. Drop this file into Wix Dev Mode as a
 * Custom Element (Add > Embed & Social > Custom Element), tag name:
 *
 *     ukssc-blastoff
 *
 * Everything (markup, styles, behaviour) lives in a shadow root, so Wix's own
 * stylesheet can't leak in and this can't leak out.
 *
 * Configure from the Wix Editor via attributes, or edit CONFIG below:
 *     <ukssc-blastoff tickets-url="https://..." hero-image="https://...">
 * ========================================================================== */

(() => {
  'use strict';

  const TAG = 'ukssc-blastoff';
  if (customElements.get(TAG)) return;

  /* ---------------------------------------------------------------- config */

  const CONFIG = {
    ticketsUrl: 'https://www.eventbrite.sg/e/blastoff-2026-to-new-horizons-tickets-1995329425023',

    // Relative paths work as-is on any static host. On Wix, upload each asset
    // to Media and override via the matching attribute on the Custom Element.
    // Blank — or a URL that 404s — falls back to live text.
    heroImage: './assets/blastoff-wordmark.png',  // 1368x300
    taglineImage: './assets/tagline.svg',         // 345x20
    crestImage: './assets/ukssc-crest.png',       // 91x84

    // Where sponsor logos are looked up: <logoBase><slug>.png
    logoBase: './assets/logos/',

    nav: [
      { label: 'About',         href: '#about' },
      { label: 'SG60',          href: '#' },        // set to your SG60 page
      { label: 'Our Sponsors',  href: '#sponsors', active: true },
      { label: 'Contact',       href: '#contact' },
    ],

    footerLinks: {
      constitution: '#',
      contactUs: '#contact',
      instagram: 'https://instagram.com/theukssc',
      telegram: '#',
      linkedin: '#',
      email: 'mailto:hello@ukssc.org',
    },
  };

  /* ------------------------------------------------------------------ data */

  // Split into explicit lines so the time never orphans onto its own row.
  const EVENT = {
    when: ['14 August 2026', '13:00 – 18:00'],
    where: ['Suntec Convention Centre', 'Level 3'],
    tagline: 'to new heights: bigger, better, bolder!',
  };

  const ABOUT = `Launched in 2021 (originally as the "Through the Generations" career fair), ` +
    `Blastoff! is the flagship professional initiative of the UKSSC. Designed specifically ` +
    `for overseas Singaporean students, this annual summer event brings together hundreds ` +
    `of attendees and over 30 corporate partners in Singapore. It serves as a vital platform ` +
    `for students to navigate the local job market, secure internships, and kickstart their ` +
    `career journeys.`;

  const STATS = [
    { figure: '600+', copy: 'attendees from across the world to grow your network' },
    { figure: '30',   copy: 'prestigious partners offering exclusive opportunities' },
    { figure: '40',   copy: 'society partners dedicated to advancing overseas Singaporean talent' },
  ];

  // Photo carousel. Widths follow the Figma rhythm: two narrow, two wide.
  // Add image URLs to `src` when you have them; empty renders the grey plate.
  const PHOTOS = [
    { size: 'sm', src: '', alt: '' },
    { size: 'sm', src: '', alt: '' },
    { size: 'lg', src: '', alt: '' },
    { size: 'lg', src: '', alt: '' },
  ];

  // Each card looks for `<logoBase><slug>.png`. Drop a correctly-named file into
  // assets/logos/ and it appears — no code change. If the file is missing (or
  // fails to load) the card falls back to the typeset name, so the grid is never
  // blank and never shows a broken image. Set `logo` to override with a full URL
  // (what you'll want in Wix, where assets live on static.wixstatic.com).
  const SPONSORS = [
    {
      group: 'Private Sector / Others',
      items: [
        { name: 'JPMorgan Chase', slug: 'jpmorgan' },
        { name: 'PwC Singapore', slug: 'pwc' },
        { name: 'UOB', slug: 'uob' },
        { name: 'Accenture', slug: 'accenture' },
        { name: 'AvePoint', slug: 'avepoint' },
        { name: 'HSBC', slug: 'hsbc' },
        { name: 'bp Singapore', slug: 'bp' },
        { name: 'Bank of America', slug: 'bofa' },
        { name: 'LSE Alumni Association of Singapore', slug: 'lse-alumni' },
      ],
    },
    {
      group: 'Government Sector',
      items: [
        { name: 'Economic Development Board (EDB)', slug: 'edb', tier: 'Gold' },
        { name: 'Ministry of Finance (MOF)', slug: 'mof' },
        { name: 'Monetary Authority of Singapore (MAS)', slug: 'mas' },
        { name: 'Ministry of Foreign Affairs (MFA)', slug: 'mfa' },
        { name: 'Ministry of Education (MOE)', slug: 'moe' },
        { name: 'Agency for Science, Technology and Research (A*STAR)', slug: 'astar' },
        { name: 'Land Transport Authority (LTA)', slug: 'lta' },
        { name: 'Ministry of Transport (MOT)', slug: 'mot' },
        { name: 'Singapore Civil Defence Force (SCDF)', slug: 'scdf' },
        { name: 'Immigration & Checkpoints Authority (ICA)', slug: 'ica' },
        { name: 'Central Narcotics Bureau (CNB)', slug: 'cnb' },
        { name: 'Singapore Prison Service (SPS)', slug: 'sps' },
        { name: 'Home Team Science and Technology Agency (HTX)', slug: 'htx' },
      ],
    },
  ];

  // TODO: confirm this copy with the committee before launch — the answers are
  // drafts built from the event details above, not published policy.
  const FAQS = [
    {
      q: 'Who can attend Blastoff!?',
      a: 'Blastoff! is built for overseas Singaporean students — wherever you study. ' +
         'Admission is free, and you are welcome whether you are searching for an ' +
         'internship, a graduate role, or simply want to understand the Singapore market.',
    },
    {
      q: 'Do I need to book a ticket in advance?',
      a: 'Yes. Tickets are free but capacity at Suntec is limited, so please book ahead ' +
         'using the link above. You will receive a confirmation email with entry details ' +
         'closer to the date.',
    },
    {
      q: 'What should I bring on the day?',
      a: 'Bring printed copies of your CV and something to take notes with. Smart casual ' +
         'dress is appropriate. Recruiters are there to talk, so come with a few questions ' +
         'ready for the organisations you most want to meet.',
    },
  ];

  const FONT_SHEETS = [
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/@fontsource/open-sauce-sans/400.css',
    'https://cdn.jsdelivr.net/npm/@fontsource/open-sauce-sans/700.css',
  ];

  /* --------------------------------------------------------------- helpers */

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  // @font-face only resolves in document scope, never inside a shadow root —
  // so the sheets go on the host page even though everything else is scoped.
  function loadFonts() {
    for (const href of FONT_SHEETS) {
      if (document.head.querySelector(`link[href="${href}"]`)) continue;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }

  /* Equalise logos by ink AREA rather than by height.
   *
   * Equal height is what makes a sponsor wall look wrong: Bank of America's
   * lockup is 10:1 and HTX's crest is 0.83:1, so at one shared height the
   * wordmark carries ~4x the ink of the crest and the crest becomes unreadable
   * detail. Equal area gives both the same visual mass — wide lockups sit
   * shorter and wider, square crests get taller.
   *
   * AREA is the ink budget in CSS px². Derived from the target: a 1:1 crest
   * lands at 100px tall, a 3:1 wordmark at ~58px, a 10:1 lockup at ~32px.
   */
  const LOGO = { AREA: 10000, MIN_H: 30, MAX_H: 104, MAX_W: 300 };

  function sizeLogo(img, gold) {
    const r = img.naturalWidth / img.naturalHeight;
    if (!r || !isFinite(r)) return;

    // Gold gets double the ink, i.e. √2 on each edge.
    const area = gold ? LOGO.AREA * 2 : LOGO.AREA;
    const maxH = gold ? LOGO.MAX_H * 1.35 : LOGO.MAX_H;
    const maxW = gold ? LOGO.MAX_W * 1.27 : LOGO.MAX_W;

    let h = Math.min(Math.max(Math.sqrt(area / r), LOGO.MIN_H), maxH);
    if (h * r > maxW) h = maxW / r;   // width cap wins; a 10:1 mark can't run away

    img.style.height = h.toFixed(1) + 'px';
    img.style.width = (h * r).toFixed(1) + 'px';
  }

  // Sponsor rows drift at a fixed px/sec rather than a fixed duration, so a row
  // with 13 logos moves at the same rate as one with 9.
  const MARQUEE_SPEED = 44;

  /* One engine behind every horizontal carousel here.
   *
   * The track holds exactly two copies of its content, so wrapping the offset
   * modulo one copy's width is seamless in both directions — there is no start
   * or end to run into, and a drag can keep going either way forever.
   *
   * Everything is driven from a single `offset`: autoplay adds to it, a drag
   * sets it, a flick decays into it, the buttons ease it. That is why this
   * replaced the CSS keyframe — a keyframe cannot be grabbed.
   */
  function loopTrack(viewport, track, { autoplay = 0 } = {}) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const drift = reduced ? 0 : autoplay;

    let half = 0, offset = 0, vel = 0;
    let dragging = false, hovering = false, focused = false;
    let lastX = 0, lastT = 0, moved = 0;
    let glide = null;                  // { from, to, t } while a button eases
    let raf = 0, prev = 0;

    const measure = () => {
      const set = track.firstElementChild;
      half = set ? set.getBoundingClientRect().width : 0;
    };
    const wrap = (o) => (half > 0 ? ((o % half) + half) % half : 0);
    const paint = () => {
      track.style.transform = `translate3d(${-wrap(offset)}px,0,0)`;
    };
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const frame = (now) => {
      const dt = Math.min(0.064, (now - (prev || now)) / 1000);
      prev = now;
      if (glide) {
        glide.t += dt;
        const k = Math.min(1, glide.t / 0.42);
        offset = glide.from + (glide.to - glide.from) * ease(k);
        if (k === 1) glide = null;
      } else if (!dragging) {
        if (Math.abs(vel) > 2) {
          offset += vel * dt;
          vel *= Math.pow(0.02, dt);   // a flick keeps ~2% of its speed per second
        } else {
          vel = 0;
          if (drift && !hovering && !focused) offset += drift * dt;
        }
      }
      paint();
      raf = requestAnimationFrame(frame);
    };

    /* ---- drag ---- */
    viewport.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; glide = null; vel = 0; moved = 0;
      lastX = e.clientX; lastT = e.timeStamp;
      viewport.classList.add('is-dragging');
      // Capture can reject an id the browser has already let go of.
      try { viewport.setPointerCapture(e.pointerId); } catch { /* not fatal */ }
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(8, e.timeStamp - lastT) / 1000;
      lastX = e.clientX; lastT = e.timeStamp;
      moved += Math.abs(dx);
      offset -= dx;
      // Smoothed, so one stuttery frame at release can't fling the row.
      vel = 0.8 * (-dx / dt) + 0.2 * vel;
    });
    const release = (e) => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture?.(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
      if (Math.abs(vel) < 40) vel = 0;            // a slow let-go should just stop
      vel = Math.max(-4000, Math.min(4000, vel));
    };
    viewport.addEventListener('pointerup', release);
    viewport.addEventListener('pointercancel', release);
    // A drag that happens to end on a child is not a click on that child.
    viewport.addEventListener('click', (e) => {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    /* ---- trackpad, and shift+wheel for a mouse ---- */
    viewport.addEventListener('wheel', (e) => {
      // Only take horizontal intent. A plain vertical wheel belongs to the page;
      // swallowing it is what makes a carousel feel like a trap.
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX
               : (e.shiftKey ? e.deltaY : 0);
      if (!dx) return;
      e.preventDefault();
      glide = null; vel = 0;
      offset += dx * (e.deltaMode === 1 ? 16 : 1);
    }, { passive: false });

    /* ---- keyboard ---- */
    viewport.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      api.step(dir);
    });

    /* ---- hold the drift while someone is actually reading the row ---- */
    viewport.addEventListener('pointerenter', () => { hovering = true; });
    viewport.addEventListener('pointerleave', () => { hovering = false; });
    viewport.addEventListener('focusin', () => { focused = true; });
    viewport.addEventListener('focusout', () => { focused = false; });

    // Images and webfonts land after first paint and change the track width, so
    // the wrap point has to be re-measured rather than read once.
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    measure();
    paint();
    raf = requestAnimationFrame(frame);

    const api = {
      step(dir, dist) {
        glide = { from: offset, to: offset + dir * (dist || viewport.clientWidth * 0.8), t: 0 };
        vel = 0;
      },
      stop() { cancelAnimationFrame(raf); ro.disconnect(); },
    };
    return api;
  }

  const CHEVRON = `
    <svg class="chev" viewBox="0 0 36 17.67" aria-hidden="true" focusable="false">
      <path d="M1.7 1.7 18 15.97 34.3 1.7" fill="none" stroke="currentColor"
            stroke-width="3.33" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  /* ----------------------------------------------------------------- style */

  const CSS = `
  :host {
    --ink:    #141414;
    --yellow: #E4FF00;
    --blue:   #2416BD;
    --mint:   #ADF8F5;
    --plate:  #D9D9D9;
    --cream:  #FFF6E7;
    --maroon: #690504;
    --amber:  #FFAD00;
    --bone:   #F7F7F4;

    --maxw: 1368px;
    --pad: clamp(16px, 2.5vw, 36px);
    --radius: 28.79px;

    --display: 'Open Sauce Sans', 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
    --ui: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;

    display: block;
    background: var(--ink);
    color: var(--mint);
    font-family: var(--display);
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
  }
  *, *::before, *::after { box-sizing: border-box; }

  /* In the Figma the 1368px content column sits *inside* a 36px gutter
     (x: 36 -> 1404 on a 1440 canvas), so the gutter is added, not subtracted. */
  .wrap {
    max-width: calc(var(--maxw) + 2 * var(--pad));
    margin-inline: auto;
    padding-inline: var(--pad);
  }

  /* Rail starts on the page gutter but runs off the right edge, so the photos
     bleed out of the container instead of stopping short of the viewport. */
  .bleed {
    padding-inline-start: max(var(--pad), calc((100% - var(--maxw)) / 2));
    padding-inline-end: 0;
  }

  :where(a):focus-visible,
  :where(button):focus-visible {
    outline: 3px solid var(--yellow);
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ---- nav ---- */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
    background: var(--yellow);
    border-radius: 50px;
    min-height: 50px;
    padding: 8px clamp(18px, 2vw, 28px);
    margin-top: 37px;
    font-family: var(--ui);
  }
  .brand {
    font-weight: 800;
    font-size: clamp(18px, 1.9vw, 25px);
    line-height: 1.32;
    letter-spacing: -0.02em;
    color: var(--blue);
    text-decoration: none;
    white-space: nowrap;
  }
  .nav-list {
    display: flex; align-items: center;
    gap: clamp(14px, 2.4vw, 44px);
    list-style: none; margin: 0; padding: 0;
  }
  .nav-list a {
    color: var(--blue); text-decoration: none;
    font-size: clamp(15px, 1.7vw, 25px);
    line-height: 1.32; letter-spacing: -0.02em;
    white-space: nowrap;
  }
  .nav-list a.is-active { font-weight: 700; }
  .nav-list a:hover { text-decoration: underline; text-underline-offset: 4px; }

  .nav-toggle {
    display: none;
    background: none; border: 0; padding: 6px; cursor: pointer;
    color: var(--blue);
  }
  .nav-toggle svg { display: block; width: 26px; height: 20px; }

  /* ---- hero ---- */
  .hero { margin-top: clamp(28px, 5vw, 56px); text-align: center; }
  .hero-art { display: block; width: 100%; }
  .hero-art img { display: block; width: 100%; height: auto; }
  .hero-word {
    display: block;
    font-weight: 700;
    font-size: clamp(52px, 16.5vw, 232px);
    line-height: 0.9;
    letter-spacing: -0.05em;
    color: var(--yellow);
    text-transform: uppercase;
  }
  .hero-word .bang { color: var(--mint); }

  .tagline {
    margin: clamp(20px, 2.5vw, 32px) auto 0;
    font-size: clamp(16px, 1.6vw, 20px);
    line-height: 1.25; letter-spacing: -0.02em;
    color: var(--yellow);
  }
  .tagline-img {
    display: block; height: auto;
    width: min(345px, 88%);
    margin: clamp(20px, 2.5vw, 32px) auto 0;
  }

  .facts {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    gap: clamp(20px, 4vw, 48px);
    margin-top: clamp(40px, 7vw, 86px);
  }
  .facts p {
    margin: 0;
    font-weight: 700;
    font-size: clamp(22px, 2.7vw, 36.11px);
    line-height: 1.05; letter-spacing: -0.05em;
    color: var(--yellow);
  }
  .facts .when  { max-width: 16ch; text-align: left; }
  .facts .where { max-width: 22ch; text-align: right; margin-left: auto; }

  .cta-block { margin-top: clamp(40px, 7vw, 109px); text-align: center; }
  .cta {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 255px; min-height: 65px;
    padding: 14px 24px;
    background: var(--yellow); color: #000;
    border-radius: 10px; text-decoration: none;
    font-size: clamp(20px, 2.1vw, 26.82px);
    line-height: 1.05; letter-spacing: -0.05em;
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .cta:hover { transform: translateY(-2px); box-shadow: 0 10px 0 -2px rgba(228,255,0,.25); }
  .cta:active { transform: translateY(0); }
  .free {
    margin: clamp(16px, 2vw, 22px) 0 0;
    font-size: clamp(16px, 1.6vw, 20px);
    line-height: 1.25; letter-spacing: -0.02em;
    color: var(--yellow);
  }

  /* ---- section scaffolding ---- */
  section { scroll-margin-top: 24px; }
  .split {
    display: grid;
    grid-template-columns: minmax(0, 345px) minmax(0, 736px);
    justify-content: space-between;
    gap: clamp(28px, 5vw, 120px);
    margin-top: clamp(64px, 12vw, 168px);
  }
  h2.big {
    margin: 0;
    font-weight: 700;
    font-size: clamp(42px, 5.8vw, 80px);
    line-height: 1.25; letter-spacing: -0.05em;
    color: var(--mint);
  }
  .body {
    margin: 0;
    font-size: clamp(16px, 1.6vw, 20px);
    line-height: 1.25; letter-spacing: -0.02em;
    color: var(--mint);
  }

  /* ---- carousel ---- */
  .rail-head {
    display: flex; justify-content: flex-end; gap: 10px;
    margin: 0 0 14px;
  }
  .rail-btn {
    width: 46px; height: 46px;
    display: grid; place-items: center;
    border: 2px solid var(--mint); border-radius: 50%;
    background: transparent; color: var(--mint);
    cursor: pointer;
    transition: background .18s ease, color .18s ease;
  }
  .rail-btn:hover:not(:disabled) { background: var(--mint); color: var(--ink); }
  .rail-btn:disabled { opacity: .3; cursor: default; }
  .rail-btn svg { width: 20px; height: 20px; }

  .carousel { margin-top: clamp(40px, 7vw, 86px); }
  /* Transform track rather than a native scroller, so the rail can wrap past
     its own end instead of stopping. touch-action: pan-y keeps vertical scroll with
     the browser and claims only the horizontal axis for the drag. */
  .rail {
    overflow: hidden;
    padding-bottom: 4px;
    cursor: grab;
    touch-action: pan-y;
  }
  .rail.is-dragging { cursor: grabbing; }
  .rail-track { display: flex; width: max-content; will-change: transform; }
  .rail-set { display: flex; }
  .plate {
    flex: 0 0 auto;
    height: clamp(220px, 31vw, 445px);
    margin-inline-end: clamp(14px, 1.5vw, 20px);
    background: var(--plate);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .plate.sm { width: clamp(230px, 40vw, 342px); }
  .plate.lg { width: clamp(280px, 60vw, 597px); }
  .plate img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ---- stats ---- */
  .stats { display: grid; gap: 17px; }
  .stat {
    display: flex; align-items: center;
    gap: clamp(16px, 3vw, 48px);
    min-height: clamp(120px, 13vw, 183px);
    padding: clamp(18px, 2vw, 24px) clamp(20px, 2.5vw, 34px);
    background: var(--yellow);
    border-radius: var(--radius);
    color: #000;
  }
  .stat .figure {
    flex: 0 0 auto;
    font-weight: 700;
    font-size: clamp(56px, 9.4vw, 135.84px);
    line-height: 1.045; letter-spacing: -0.05em;
  }
  .stat .copy {
    margin: 0; max-width: 427px;
    font-size: clamp(16px, 1.9vw, 25px);
    line-height: 1.24; letter-spacing: -0.02em;
  }

  /* ---- sponsors ---- */
  .sponsors { margin-top: clamp(72px, 13vw, 180px); }
  h2.mid {
    margin: 0 0 clamp(28px, 4vw, 48px);
    text-align: center;
    font-weight: 700;
    font-size: clamp(32px, 4.4vw, 60px);
    line-height: 1.25; letter-spacing: -0.05em;
    color: var(--mint);
  }
  /* Logos sit on a light band. Most brand PNGs are dark artwork on transparent,
     so on #141414 they would simply disappear once the white cards were removed. */
  .logo-band {
    margin-top: clamp(28px, 4vw, 48px);
    padding-block: clamp(28px, 4vw, 46px);
    background: var(--cream);
    overflow: hidden;
  }
  .group-label {
    margin: 0 0 clamp(14px, 1.6vw, 20px);
    font-family: var(--ui);
    font-weight: 700;
    font-size: clamp(14px, 1.3vw, 17px);
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--maroon);
  }
  .marquee + .wrap { margin-top: clamp(26px, 3.4vw, 42px); }

  /* Driven by script rather than a CSS animation: a keyframe cannot be dragged.
     Same continuous drift, but the offset is now a number the pointer, the
     trackpad and the arrow keys can all push around. */
  .marquee {
    overflow: hidden;
    cursor: grab;
    touch-action: pan-y;
  }
  .marquee.is-dragging { cursor: grabbing; }
  .marquee-track { display: flex; width: max-content; will-change: transform; }
  .marquee-set { display: flex; }

  /* Spacing lives on the item, not as a flex gap: the track is exactly two
     copies wide, so -50% only lands seamlessly if every item carries its own
     trailing space. A gap would leave a half-gap jump at the loop point. */
  .logo-item {
    flex: 0 0 auto;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 8px;
    margin-inline-end: clamp(40px, 5vw, 80px);
  }
  /* Height and width are set per-logo by _wireLogos once the file has loaded —
     equal ink AREA, not equal height (see sizeLogo). These values only cover
     the moment before load and the case where scripting is unavailable. */
  .logo-item img {
    display: block;
    height: 64px; width: auto; max-width: 300px;
    object-fit: contain;
  }
  .logo-item .name {
    display: grid; place-items: center;
    height: 56px; max-width: 230px;
    font-family: var(--ui); font-weight: 500;
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.25; letter-spacing: -0.01em;
    color: var(--ink); text-align: center;
  }
  /* Gold reads through size and isolation first, the badge second. For images
     the bump is applied as double ink area in sizeLogo; this covers the text
     fallback and the pre-load state. */
  .logo-item.is-gold img { max-width: 380px; }
  .logo-item.is-gold .name { height: 100px; max-width: 320px; }
  /* Extra air on both sides. Safe for the loop: both copies of the set carry
     the same margins, so the track stays exactly 2x the set width. */
  .logo-item.is-gold {
    margin-inline: clamp(40px, 5vw, 80px) clamp(80px, 10vw, 160px);
  }

  /* Above the mark, not below — the tier should read as a header, not a
     footnote discovered after the logo. */
  .tier {
    order: -1;
    padding: 4px 10px;
    background: var(--maroon); color: var(--amber);
    border-radius: 999px;
    font-family: var(--ui); font-weight: 700;
    font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  }

  /* ---- faqs ---- */
  .faq-list { border-top: 1px solid var(--mint); }
  .faq { border-bottom: 1px solid var(--mint); }
  .faq-q {
    width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px;
    padding: 22px 0;
    background: none; border: 0;
    color: var(--mint);
    font-family: var(--display);
    font-size: clamp(16px, 1.6vw, 20px);
    line-height: 1.25; letter-spacing: -0.02em;
    text-align: left;
    cursor: pointer;
  }
  .faq-q .chev {
    flex: 0 0 auto; width: 36px; height: 17.67px;
    transition: transform .28s ease;
  }
  .faq[open-state="true"] .chev { transform: rotate(180deg); }
  .faq-a {
    display: grid; grid-template-rows: 0fr;
    transition: grid-template-rows .3s ease;
  }
  .faq[open-state="true"] .faq-a { grid-template-rows: 1fr; }
  .faq-a > div { overflow: hidden; }
  .faq-a p {
    margin: 0 0 24px;
    max-width: 62ch;
    font-size: clamp(15px, 1.5vw, 18px);
    line-height: 1.5; letter-spacing: -0.02em;
    color: color-mix(in srgb, var(--mint) 78%, transparent);
  }

  /* ---- footer ---- */
  .footer { margin-top: clamp(72px, 12vw, 160px); background: var(--cream); }
  .stripes { display: grid; grid-template-columns: repeat(4, 1fr); height: clamp(56px, 11vw, 165px); }
  .stripes i:nth-child(1) { background: var(--amber); }
  .stripes i:nth-child(2) { background: var(--ink); }
  .stripes i:nth-child(3) { background: var(--bone); }
  .stripes i:nth-child(4) { background: var(--maroon); }

  .footer-inner {
    max-width: 1440px; margin-inline: auto;
    padding: clamp(32px, 4.5vw, 58px) clamp(20px, 5.8vw, 84px) clamp(24px, 3vw, 40px);
    font-family: var(--ui); color: var(--maroon);
  }
  /* Column starts mirror the Figma footer: brand at 84, Resources at 667,
     Connect at 920 — i.e. 583 / 253 / rest, measured from the 84px gutter. */
  .footer-cols {
    display: grid;
    grid-template-columns: minmax(0, 583fr) minmax(0, 253fr) minmax(0, 436fr);
    gap: clamp(24px, 3vw, 40px) 0;  /* no column gap: the ratios already carry it */
  }
  .footer-brand { display: flex; align-items: flex-start; gap: clamp(16px, 2vw, 26px); }
  .crest { flex: 0 0 auto; width: 91px; height: 84px; }
  .crest img { width: 100%; height: 100%; object-fit: contain; }
  .crest-fallback {
    width: 100%; height: 100%;
    display: grid; place-items: center;
    border: 2px solid var(--maroon); border-radius: 8px;
    font-weight: 800; font-size: 17px; letter-spacing: .04em;
    color: var(--maroon);
  }
  .footer-brand p {
    margin: 0; max-width: 286px;
    font-size: 16px; line-height: 1.31; letter-spacing: -0.02em;
  }
  .footer h4 {
    margin: 0 0 11px;
    font-weight: 700; font-size: 16px; line-height: 1.31; letter-spacing: -0.02em;
  }
  .footer-links { display: flex; flex-wrap: wrap; gap: 6px 14px; }
  .footer-links a {
    font-size: 16px; line-height: 1.31; letter-spacing: -0.02em;
    color: var(--maroon); text-decoration: underline;
  }
  .footer-links a:hover { text-decoration-thickness: 2px; }
  .copyright {
    margin: clamp(32px, 5vw, 54px) 0 0;
    font-size: 10px; line-height: 1.3; letter-spacing: -0.02em;
  }


  /* ---- responsive ---- */
  @media (max-width: 900px) {
    .split { grid-template-columns: minmax(0, 1fr); gap: 24px; }
    .facts { gap: 20px; }
    .facts .when, .facts .where { max-width: none; text-align: left; margin-left: 0; }
    .footer-cols { grid-template-columns: minmax(0, 1fr); }
  }
  @media (max-width: 760px) {
    .nav-toggle { display: block; }
    .nav { flex-wrap: wrap; border-radius: 26px; }
    .nav-list {
      flex-basis: 100%;
      flex-direction: column; align-items: flex-start;
      gap: 10px;
      max-height: 0; overflow: hidden;
      transition: max-height .3s ease, padding .3s ease;
    }
    .nav[data-open="true"] .nav-list { max-height: 260px; padding: 12px 0 6px; }
  }
  @media (max-width: 560px) {
    .stat { flex-direction: column; align-items: flex-start; gap: 8px; }
    .logo-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .001ms !important;
      transition-duration: .001ms !important;
      scroll-behavior: auto !important;
    }
    /* The drift stops (loopTrack reads the same query), but drag, wheel and
       arrow keys still work, so the clone stays — it is what makes the row
       continuous in both directions rather than a list with two ends. */
  }
  `;

  /* --------------------------------------------------------------- markup */

  // Text stand-ins used when artwork is absent — and restored at runtime if a
  // URL 404s, which matters on Wix where these point at Media Manager.
  const ART_FALLBACK = {
    hero: `<span class="hero-word">Blastoff<span class="bang">!</span></span>`,
    tagline: `<p class="tagline">${esc(EVENT.tagline)}</p>`,
    crest: `<div class="crest-fallback" role="img" aria-label="UKSSC crest">UKSSC</div>`,
  };

  function heroArt(cfg) {
    return cfg.heroImage
      ? `<img src="${esc(cfg.heroImage)}" alt="Blastoff! 2026"
              width="1368" height="300" data-art="hero">`
      : ART_FALLBACK.hero;
  }

  function tagline(cfg) {
    return cfg.taglineImage
      ? `<img class="tagline-img" src="${esc(cfg.taglineImage)}"
              alt="${esc(EVENT.tagline)}" width="345" height="20" data-art="tagline">`
      : ART_FALLBACK.tagline;
  }

  function crest(cfg) {
    return cfg.crestImage
      ? `<img src="${esc(cfg.crestImage)}" alt="UKSSC crest"
              width="91" height="84" data-art="crest">`
      : ART_FALLBACK.crest;
  }

  function logoItem(item, cfg) {
    const gold = item.tier ? ' is-gold' : '';
    const badge = item.tier ? `<span class="tier">${esc(item.tier)} partner</span>` : '';
    const src = item.logo || `${cfg.logoBase}${item.slug}.png`;
    // No loading="lazy": the img has no intrinsic size until it loads, so it
    // lays out 0x0 — and a zero-area box never intersects the viewport, which
    // would stop the fetch from ever starting.
    return `<div class="logo-item${gold}">` +
      `<img src="${esc(src)}" alt="${esc(item.name)}" data-name="${esc(item.name)}">` +
      badge + `</div>`;
  }

  // Track = exactly two copies, so the -50% keyframe loops seamlessly. The
  // clone is aria-hidden so screen readers announce each sponsor once.
  // tabindex so the row is reachable by keyboard, which is also what makes the
  // arrow keys land somewhere. Speed is px/sec rather than a duration, so both
  // rows drift at the same rate regardless of how many sponsors they hold.
  function marqueeRow(group, cfg, dir) {
    const set = group.items.map((i) => logoItem(i, cfg)).join('');
    return `
      <div class="wrap"><h3 class="group-label">${esc(group.group)}</h3></div>
      <div class="marquee" data-dir="${dir}" tabindex="0" role="group"
           aria-label="${esc(group.group)} sponsors, draggable">
        <div class="marquee-track">
          <div class="marquee-set">${set}</div>
          <div class="marquee-set" aria-hidden="true">${set}</div>
        </div>
      </div>`;
  }

  function template(cfg) {
    const navItems = cfg.nav.map((n) => `
      <li><a href="${esc(n.href)}" class="${n.active ? 'is-active' : ''}"
             ${n.active ? 'aria-current="page"' : ''}>${esc(n.label)}</a></li>`).join('');

    const plates = PHOTOS.map((p, i) => `
      <div class="plate ${p.size}" role="group" aria-label="Photo ${i + 1} of ${PHOTOS.length}">
        ${p.src ? `<img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy">` : ''}
      </div>`).join('');

    const stats = STATS.map((s) => `
      <div class="stat">
        <span class="figure">${esc(s.figure)}</span>
        <p class="copy">${esc(s.copy)}</p>
      </div>`).join('');

    const sponsors = SPONSORS.map((g, i) => marqueeRow(g, cfg, i % 2 ? -1 : 1)).join('');

    const faqs = FAQS.map((f, i) => `
      <div class="faq" open-state="false">
        <h3 style="margin:0">
          <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-p-${i}">
            <span>${esc(f.q)}</span>${CHEVRON}
          </button>
        </h3>
        <div class="faq-a" id="faq-p-${i}" role="region">
          <div><p>${esc(f.a)}</p></div>
        </div>
      </div>`).join('');

    const fl = cfg.footerLinks;

    return `
    <div class="page">
      <div class="wrap">
        <nav class="nav" data-open="false" aria-label="Primary">
          <a class="brand" href="#top">The UKSSC</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Menu">
            <svg viewBox="0 0 26 20" aria-hidden="true">
              <path d="M1 2h24M1 10h24M1 18h24" stroke="currentColor" stroke-width="2.6"
                    stroke-linecap="round" fill="none"/>
            </svg>
          </button>
          <ul class="nav-list">${navItems}</ul>
        </nav>

        <header class="hero" id="top">
          <div class="hero-art">${heroArt(cfg)}</div>
          ${tagline(cfg)}
          <div class="facts">
            <p class="when">${EVENT.when.map(esc).join('<br>')}</p>
            <p class="where">${EVENT.where.map(esc).join('<br>')}</p>
          </div>
          <div class="cta-block">
            <a class="cta" href="${esc(cfg.ticketsUrl)}"
               target="_blank" rel="noopener">Book tickets here</a>
            <p class="free">Admission is free</p>
          </div>
        </header>

        <section class="split" id="about">
          <h2 class="big">What is Blastoff!?</h2>
          <p class="body">${esc(ABOUT)}</p>
        </section>
      </div>

      <section class="carousel" aria-label="Photos from previous editions">
        <div class="wrap"><div class="rail-head">
          <button class="rail-btn" type="button" data-dir="-1" aria-label="Previous photos">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13 3 6 10l7 7" fill="none"
              stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="rail-btn" type="button" data-dir="1" aria-label="Next photos">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 3l7 7-7 7" fill="none"
              stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div></div>
        <div class="rail bleed" tabindex="0" role="group"
             aria-label="Photos, draggable">
          <div class="rail-track">
            <div class="rail-set">${plates}</div>
            <div class="rail-set" aria-hidden="true">${plates}</div>
          </div>
        </div>
      </section>

      <div class="wrap">
        <section class="split" id="why">
          <h2 class="big">Why visit Blastoff!?</h2>
          <div class="stats">${stats}</div>
        </section>

        <section class="sponsors" id="sponsors">
          <h2 class="mid">Meet our Sponsors and Partners</h2>
        </section>
      </div>

      <div class="logo-band">${sponsors}</div>

      <div class="wrap">
        <section class="split" id="faqs">
          <h2 class="big">FAQs</h2>
          <div class="faq-list">${faqs}</div>
        </section>
      </div>

      <footer class="footer" id="contact">
        <div class="stripes" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="footer-inner">
          <div class="footer-cols">
            <div class="footer-brand">
              <div class="crest">${crest(cfg)}</div>
              <p>Representing &amp; connecting Singaporean students across the United Kingdom since 1998</p>
            </div>
            <div>
              <h4>Resources</h4>
              <div class="footer-links">
                <a href="${esc(fl.constitution)}">Constitution</a>
                <a href="${esc(fl.contactUs)}">Contact Us</a>
              </div>
            </div>
            <div>
              <h4>Connect</h4>
              <div class="footer-links">
                <a href="${esc(fl.instagram)}">Instagram</a>
                <a href="${esc(fl.telegram)}">Telegram</a>
                <a href="${esc(fl.linkedin)}">LinkedIn</a>
                <a href="${esc(fl.email)}">Email</a>
              </div>
            </div>
          </div>
          <p class="copyright">&copy; 2026 United Kingdom-Singapore Students' Council. All rights reserved.</p>
        </div>
      </footer>
    </div>`;
  }

  /* -------------------------------------------------------------- element */

  class UksscBlastoff extends HTMLElement {
    static get observedAttributes() {
      return ['tickets-url', 'hero-image', 'tagline-image', 'crest-image', 'logo-base'];
    }

    connectedCallback() {
      if (this._mounted) return;
      this._mounted = true;

      loadFonts();

      const cfg = {
        ...CONFIG,
        ticketsUrl: this.getAttribute('tickets-url') || CONFIG.ticketsUrl,
        heroImage: this.getAttribute('hero-image') || CONFIG.heroImage,
        taglineImage: this.getAttribute('tagline-image') || CONFIG.taglineImage,
        crestImage: this.getAttribute('crest-image') || CONFIG.crestImage,
        logoBase: this.getAttribute('logo-base') || CONFIG.logoBase,
      };

      // attachShadow throws if one is already attached, which it is on re-render.
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = CSS;
      root.replaceChildren(style);
      root.append(document.createRange().createContextualFragment(template(cfg)));

      this._loops = [];
      this._wireNav(root);
      this._wireCarousel(root);
      this._wireMarquees(root);
      this._wireFaqs(root);
      this._wireLogos(root);
      this._wireArtwork(root);
    }

    attributeChangedCallback() {
      if (!this._mounted) return;
      this._mounted = false;
      this._stopLoops();          // else the old rAF keeps painting a dead track
      this.connectedCallback();
    }

    disconnectedCallback() {
      this._stopLoops();
      this._mounted = false;
    }

    _wireNav(root) {
      const nav = root.querySelector('.nav');
      const toggle = root.querySelector('.nav-toggle');

      toggle.addEventListener('click', () => {
        const open = nav.dataset.open !== 'true';
        nav.dataset.open = String(open);
        toggle.setAttribute('aria-expanded', String(open));
      });

      // Shadow roots don't resolve document fragment links, so scroll manually.
      root.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href').slice(1);
          if (!id) return;
          const target = root.getElementById(id);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          nav.dataset.open = 'false';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    _wireCarousel(root) {
      const rail = root.querySelector('.rail');
      const track = root.querySelector('.rail-track');
      if (!rail || !track) return;

      const loop = loopTrack(rail, track);
      this._loops.push(loop);

      // One plate plus the trailing margin that carries the gap.
      const step = () => {
        const plate = track.querySelector('.plate');
        if (!plate) return rail.clientWidth * 0.8;
        const gap = parseFloat(getComputedStyle(plate).marginInlineEnd) || 0;
        return plate.getBoundingClientRect().width + gap;
      };

      // The rail wraps now, so there is no end to arrive at and nothing to
      // disable — the arrows just nudge the same offset the drag moves.
      root.querySelectorAll('.rail-btn').forEach((b) => {
        b.disabled = false;
        b.addEventListener('click', () => loop.step(Number(b.dataset.dir), step()));
      });
    }

    _wireMarquees(root) {
      root.querySelectorAll('.marquee').forEach((row) => {
        const track = row.querySelector('.marquee-track');
        if (!track) return;
        const dir = Number(row.dataset.dir) || 1;
        this._loops.push(loopTrack(row, track, { autoplay: MARQUEE_SPEED * dir }));
      });
    }

    _stopLoops() {
      (this._loops || []).forEach((l) => l.stop());
      this._loops = [];
    }

    // A bad Media Manager URL should degrade to text, not a broken-image icon.
    _wireArtwork(root) {
      root.querySelectorAll('[data-art]').forEach((img) => {
        img.addEventListener('error', () => {
          const html = ART_FALLBACK[img.dataset.art];
          if (html) img.replaceWith(document.createRange().createContextualFragment(html));
        }, { once: true });
      });
    }

    // No logo file yet? Fall back to the typeset name rather than a broken image.
    _wireLogos(root) {
      root.querySelectorAll('.logo-item img').forEach((img) => {
        const gold = img.closest('.logo-item').classList.contains('is-gold');
        const fallback = () => {
          const span = document.createElement('span');
          span.className = 'name';
          span.textContent = img.dataset.name;
          img.replaceWith(span);
        };
        const size = () => sizeLogo(img, gold);
        if (img.complete) {
          img.naturalWidth > 0 ? size() : fallback();
          return;
        }
        img.addEventListener('load', size, { once: true });
        img.addEventListener('error', fallback, { once: true });
      });
    }

    _wireFaqs(root) {
      root.querySelectorAll('.faq').forEach((faq) => {
        const btn = faq.querySelector('.faq-q');
        btn.addEventListener('click', () => {
          const open = faq.getAttribute('open-state') !== 'true';
          faq.setAttribute('open-state', String(open));
          btn.setAttribute('aria-expanded', String(open));
        });
      });
    }
  }

  customElements.define(TAG, UksscBlastoff);
})();
