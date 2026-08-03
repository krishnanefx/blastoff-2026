/* =============================================================================
 * <ukssc-blastoff-draft> — Blastoff! 2026, poster-led redesign (draft 2)
 * -----------------------------------------------------------------------------
 * Separate from the live blastoff-element.js so neither can affect the other.
 * Lives at /draft-1/ and reads its artwork from ../assets/.
 *
 * Built to the design review: the hero states the proposition before the
 * identity, the ticket CTA is a solid button rather than a link, copy names
 * concrete outcomes instead of marketing verbs, and the starfield is animated.
 *
 * COPY TO CONFIRM (marked TODO below): whether 400+/30/40 are historical or
 * projected, and whether every listed organisation is actively hiring.
 * ========================================================================== */

(() => {
  'use strict';

  const TAG = 'ukssc-blastoff-draft';
  if (customElements.get(TAG)) return;

  const SCRIPT_BASE = (document.currentScript && document.currentScript.src)
    ? new URL('.', document.currentScript.src).href
    : './';
  const asset = (u) => new URL(u, SCRIPT_BASE).href;

  /* ---------------------------------------------------------------- config */

  const CONFIG = {
    ticketsUrl: 'https://www.eventbrite.sg/e/blastoff-2026-to-new-horizons-tickets-1995329425023',
    heroImage: asset('../assets/blastoff-wordmark.png'),
    crestImage: asset('../assets/ukssc-crest.png'),
    sgnImage: asset('../assets/sgn-white.png'),
    logoBase: asset('../assets/logos/'),
    pageUrl: 'https://krishnanefx.github.io/blastoff-2026/draft-1/',
    contactEmail: 'hello@ukssc.org',
  };

  const EVENT = {
    name: 'Blastoff! 2026',
    tagline: 'to new horizons!',
    proposition: 'Singapore’s careers fair for overseas students',
    pitch: 'Meet 30+ employers and discover internships, graduate roles and ' +
           'career opportunities back home.',
    dateLabel: '14 August 2026',
    dateShort: '14 Aug 2026',
    timeLabel: '4pm – 9pm',
    venue: 'Suntec Singapore Convention & Exhibition Centre',
    venueShort: 'Suntec Singapore',
    venueDetail: 'Level 3, Summit 1',
    startISO: '2026-08-14T16:00:00+08:00',
    endISO: '2026-08-14T21:00:00+08:00',
  };

  /* ------------------------------------------------------------------ data */

  // Drawn from the actual partner list rather than invented.
  const INDUSTRIES = [
    'Banking & finance', 'Consulting', 'Technology', 'Energy',
    'Public service', 'Transport', 'Science & research', 'Home Team',
  ];

  // TODO confirm: are these last year's numbers or this year's projection?
  // Labelled as expectations for now, which is the safer reading of the poster.
  const STATS = [
    {
      figure: '400+', label: 'students expected',
      copy: 'Studying across the UK, Europe, the US and Asia',
    },
    {
      figure: '30+', label: 'participating organisations',
      copy: 'Across the private sector and Singapore’s public service',
    },
    {
      figure: '40', label: 'society partners',
      copy: 'Connecting Singaporean students around the world',
    },
  ];

  // Concrete outcomes. "Unlock career opportunities" promised nothing.
  const DOINGS = [
    'Speak directly with recruiters and hiring teams',
    'Discover internships and graduate programmes',
    'Learn which industries and roles suit your experience',
    'Get practical advice about returning to Singapore',
    'Meet other Singaporean students studying around the world',
  ];

  const ABOUT = [
    'Blastoff! is the UKSSC’s flagship careers fair for Singaporean students ' +
    'studying overseas.',
    'Meet employers from finance, technology, consulting, energy and the public ' +
    'sector. Discover internships and graduate opportunities, ask recruiters ' +
    'candid questions, and understand what it takes to begin your career in ' +
    'Singapore.',
    'Since launching in 2021, Blastoff! has connected hundreds of students with ' +
    'organisations looking for globally minded Singaporean talent.',
  ];

  const TRAVEL = {
    lines: ['Promenade', 'Esplanade', 'City Hall'],
    mapUrl: 'https://maps.google.com/?q=Suntec+Singapore+Convention+%26+Exhibition+Centre',
  };

  // Captions are written for photographs that do not exist yet; each frame shows
  // its placeholder label until a real image is added to src.
  const GALLERY = [
    { size: 'sm', src: '', caption: 'Students meeting recruiters' },
    { size: 'lg', src: '', caption: 'A panel on returning to Singapore' },
    { size: 'sm', src: '', caption: 'Networking between sessions' },
    { size: 'lg', src: '', caption: 'The floor at Suntec' },
  ];

  const SPONSORS = [
    {
      group: 'Private sector & others',
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
      group: 'Public service',
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

  // Eligibility first — it is the question that decides whether to register.
  // TODO: confirm all four with the committee before this goes live.
  const FAQS = [
    {
      q: 'Who can attend?',
      a: 'Blastoff! is built for Singaporean students studying overseas, wherever ' +
         'you are based. Admission is free, whether you are after an internship, a ' +
         'graduate role, or simply want to understand the Singapore market.',
    },
    {
      q: 'Do I need to register in advance?',
      a: 'Yes. Tickets are free but capacity at Suntec is limited, so reserve ahead. ' +
         'You will get a confirmation email with entry details closer to the date.',
    },
    {
      q: 'What should I bring on the day?',
      a: 'Printed copies of your CV and something to take notes with. Smart casual ' +
         'dress is right. Recruiters are there to talk, so come with questions ready ' +
         'for the organisations you most want to meet.',
    },
    {
      q: 'How do I get to Suntec?',
      a: 'Suntec Singapore is a short covered walk from Promenade, Esplanade and ' +
         'City Hall MRT stations. The fair is on Level 3, Summit 1.',
    },
  ];

  const FONT_SHEETS = [
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap',
  ];

  const FONT_FACES = [
    '@font-face{font-family:"Open Sauce Sans";font-style:normal;font-weight:400;',
    'font-display:swap;src:url("', asset('../assets/fonts/open-sauce-sans-400.woff'), '") format("woff");}',
    '@font-face{font-family:"Open Sauce Sans";font-style:normal;font-weight:700;',
    'font-display:swap;src:url("', asset('../assets/fonts/open-sauce-sans-700.woff2'), '") format("woff2"),',
    'url("', asset('../assets/fonts/open-sauce-sans-700.woff'), '") format("woff");}',
  ].join('');

  /* --------------------------------------------------------------- helpers */

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function loadFonts() {
    for (const href of FONT_SHEETS) {
      if (document.head.querySelector('link[href="' + href + '"]')) continue;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
    if (!document.head.querySelector('style[data-draft-fonts]')) {
      const s = document.createElement('style');
      s.dataset.draftFonts = '';
      s.textContent = FONT_FACES;
      document.head.appendChild(s);
    }
  }

  function addStructuredData() {
    if (document.head.querySelector('script[data-draft-jsonld]')) return;
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: EVENT.name,
      description: EVENT.proposition + '. ' + EVENT.pitch,
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: [new URL('../assets/og-blastoff-2026-v2.png', SCRIPT_BASE).href],
      location: {
        '@type': 'Place',
        name: EVENT.venue,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1 Raffles Boulevard, Suntec City',
          addressLocality: 'Singapore',
          addressCountry: 'SG',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: 'United Kingdom-Singapore Students’ Council',
        url: 'https://theukssc.co.uk',
        email: CONFIG.contactEmail,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'SGD',
        availability: 'https://schema.org/InStock',
        url: CONFIG.ticketsUrl,
        validFrom: '2026-01-01T00:00:00+08:00',
      },
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.dataset.draftJsonld = '';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  const SPARKLE = '<svg class="spark" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 0c.6 5.4 2.1 7.1 7.4 8.2C14 9.3 12.6 11 12 16.4 11.4 11 9.9 9.3 4.6 8.2 9.9 7.1 11.4 5.4 12 0Z" ' +
    'fill="currentColor"/></svg>';

  const CHEV = '<svg class="chev" viewBox="0 0 36 18" aria-hidden="true" focusable="false">' +
    '<path d="M2 2 18 16 34 2" fill="none" stroke="currentColor" stroke-width="3" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ----------------------------------------------------------------- style */

  const CSS = `
  :host {
    --void:#07080C;
    --yellow:#DFFF3E;
    --mint:#ADF8F5;
    --cream:#FFF6E7;
    --maroon:#690504;

    --hair:rgba(255,255,255,.14);
    --hair-soft:rgba(255,255,255,.07);

    /* Body copy lifted from 66% to 80% white — it was too faint to read on
       black. Muted grey is now reserved for genuinely secondary metadata. */
    --text:rgba(255,255,255,.80);
    --bright:rgba(255,255,255,.95);
    --meta:rgba(255,255,255,.46);

    --maxw:1320px;
    --pad:clamp(20px,4vw,60px);

    --display:'Open Sauce Sans','DM Sans',system-ui,-apple-system,sans-serif;
    --ui:'DM Sans',system-ui,-apple-system,sans-serif;

    display:block;
    position:relative;
    background:var(--void);
    color:var(--text);
    font-family:var(--display);
    -webkit-font-smoothing:antialiased;
    overflow-x:clip;
  }
  *,*::before,*::after{box-sizing:border-box;}

  .wrap{max-width:calc(var(--maxw) + 2*var(--pad));margin-inline:auto;padding-inline:var(--pad);}
  a{color:inherit;}
  :where(a,button):focus-visible{outline:3px solid var(--yellow);outline-offset:3px;}

  /* ---- cosmos ---- */
  .sky{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;}
  .stars{position:absolute;inset:0;display:block;width:100%;height:100%;}
  .bloom{position:absolute;border-radius:50%;filter:blur(90px);opacity:.4;}
  .bloom.a{width:56vw;height:56vw;right:-14vw;top:-10vh;
    background:radial-gradient(circle,rgba(120,255,214,.24),transparent 68%);}
  .bloom.b{width:46vw;height:46vw;left:-16vw;top:46vh;
    background:radial-gradient(circle,rgba(255,196,92,.15),transparent 70%);}
  .grain{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.055;
    mix-blend-mode:overlay;background-repeat:repeat;background-size:180px 180px;}
  .glow{position:fixed;width:680px;height:680px;border-radius:50%;pointer-events:none;
    z-index:0;opacity:0;transition:opacity .6s ease;transform:translate(-50%,-50%);
    background:radial-gradient(circle,rgba(223,255,62,.08),transparent 62%);}
  .glow.is-on{opacity:1;}
  @media (hover:none){ .glow{display:none;} }

  .progress{position:fixed;left:0;top:0;height:2px;width:100%;z-index:45;pointer-events:none;}
  .progress i{display:block;height:100%;width:0;background:var(--yellow);}

  .page{position:relative;z-index:1;}

  /* ---- nav ---- */
  .nav{position:sticky;top:0;z-index:35;display:flex;align-items:center;
    justify-content:space-between;gap:20px;padding:14px var(--pad);
    background:linear-gradient(180deg,rgba(7,8,12,.94),rgba(7,8,12,.6));
    backdrop-filter:blur(10px);border-bottom:1px solid var(--hair-soft);font-family:var(--ui);}
  .brand{display:flex;align-items:center;gap:9px;text-decoration:none;font-weight:800;
    font-size:15px;letter-spacing:.02em;text-transform:uppercase;color:var(--bright);
    min-height:44px;}
  .brand img{width:22px;height:22px;object-fit:contain;}
  .nav-list{display:flex;align-items:center;gap:clamp(16px,2.2vw,32px);
    list-style:none;margin:0;padding:0;}
  .nav-list a{display:inline-flex;align-items:center;min-width:44px;min-height:44px;
    text-decoration:none;
    font-size:13px;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(255,255,255,.58);transition:color .2s ease;}
  .nav-list a:hover,.nav-list a[aria-current="true"]{color:var(--yellow);}
  .nav-list .drawer-cta{display:none;}

  .nav-toggle{display:none;background:none;border:0;padding:0;cursor:pointer;
    min-width:44px;min-height:44px;color:var(--yellow);}
  .nav-toggle svg{display:block;margin-inline:auto;width:22px;height:16px;}
  .nav-toggle .x{display:none;}
  .nav[data-open="true"] .nav-toggle .bars{display:none;}
  .nav[data-open="true"] .nav-toggle .x{display:block;}
  .scrim{position:fixed;inset:0;z-index:34;background:rgba(3,4,7,.6);
    opacity:0;pointer-events:none;transition:opacity .3s ease;}

  /* ---- buttons: one obvious primary ---- */
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;
    min-height:52px;padding:15px 30px;border-radius:4px;border:1px solid transparent;
    font-family:var(--ui);font-weight:700;font-size:15px;letter-spacing:.02em;
    text-decoration:none;cursor:pointer;text-align:center;
    transition:transform .18s ease,background .18s ease,color .18s ease,border-color .18s ease;}
  .btn-solid{background:var(--yellow);color:#07080C;}
  .btn-solid:hover{transform:translateY(-2px);background:#EAFF6B;}
  .btn-outline{background:transparent;color:var(--bright);border-color:rgba(255,255,255,.32);}
  .btn-outline:hover{border-color:var(--yellow);color:var(--yellow);}
  .btn svg{width:17px;height:17px;flex:0 0 auto;}

  /* Tertiary: calendar, maps. Deliberately lighter than the buttons. */
  .lnk{display:inline-flex;align-items:center;gap:9px;min-height:44px;
    background:none;border:0;padding:0;cursor:pointer;
    font-family:var(--ui);font-size:14px;letter-spacing:.03em;text-decoration:none;
    color:var(--meta);border-bottom:1px solid transparent;
    transition:color .2s ease,border-color .2s ease;}
  .lnk:hover{color:var(--yellow);border-bottom-color:var(--yellow);}
  .lnk svg{width:15px;height:15px;}

  /* ---- hero ---- */
  .hero{padding:clamp(26px,5vh,60px) 0 clamp(32px,5vh,64px);text-align:center;}
  /* Wordmark down from 94% to 72% of the column — it was crowding out the
     proposition, which is the thing a first-time visitor actually needs. */
  .mark{position:relative;display:inline-block;width:min(880px,72%);}
  .mark img{display:block;width:100%;height:auto;
    filter:drop-shadow(0 0 54px rgba(223,255,62,.2));}
  .spark{position:absolute;width:clamp(15px,1.7vw,24px);height:auto;color:var(--yellow);}
  .spark.one{top:-8%;right:-4%;}
  .spark.two{bottom:-2%;left:-5%;width:clamp(10px,1.2vw,17px);}
  .tagline{margin:clamp(10px,1.4vw,16px) 0 0;font-size:clamp(14px,1.5vw,18px);
    letter-spacing:.01em;color:var(--mint);}

  h1{margin:clamp(24px,3.2vw,42px) auto 0;max-width:22ch;font-weight:700;
    font-size:clamp(28px,4.6vw,60px);line-height:1.04;letter-spacing:-.04em;
    color:var(--bright);}
  .pitch{margin:clamp(15px,1.9vw,23px) auto 0;max-width:52ch;
    font-size:clamp(16px,1.8vw,21px);line-height:1.55;color:var(--text);}

  .facts-line{display:flex;flex-wrap:wrap;justify-content:center;
    gap:6px clamp(12px,1.6vw,22px);margin:clamp(20px,2.6vw,32px) 0 0;
    font-family:var(--ui);font-weight:700;font-size:clamp(12px,1.3vw,15px);
    letter-spacing:.09em;text-transform:uppercase;color:var(--yellow);}
  .facts-line i{font-style:normal;color:rgba(255,255,255,.25);}

  .hero-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;
    margin:clamp(22px,2.8vw,34px) 0 0;}
  .substrip{text-align:center;padding-block:clamp(4px,1vw,10px) clamp(2px,.6vw,6px);}
  .micro{margin:clamp(12px,1.6vw,18px) 0 0;font-family:var(--ui);font-size:13px;
    letter-spacing:.03em;color:var(--meta);}

  /* Countdown demoted to one quiet line — it was co-dominating the fold. */
  .count{display:flex;justify-content:center;align-items:baseline;flex-wrap:wrap;
    gap:0 clamp(10px,1.4vw,18px);margin:0;
    font-variant-numeric:tabular-nums;font-family:var(--ui);}
  .count .u{display:inline-flex;align-items:baseline;gap:5px;}
  .count b{font-size:clamp(15px,1.7vw,19px);font-weight:700;letter-spacing:-.01em;
    color:var(--bright);}
  .count i{font-style:normal;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
    color:var(--meta);}
  .count .dot{color:rgba(255,255,255,.2);}
  .count .msg{font-size:clamp(14px,1.6vw,18px);color:var(--yellow);font-weight:700;}

  /* ---- kinetic strip: industries, so it earns its space ---- */
  .ticker{margin-top:clamp(28px,4.2vw,54px);border-block:1px solid var(--hair);
    padding-block:clamp(11px,1.4vw,17px);}
  .ticker .marquee-set{display:flex;align-items:center;}
  .ticker span{flex:0 0 auto;display:flex;align-items:center;gap:clamp(18px,2.6vw,38px);
    margin-inline-end:clamp(18px,2.6vw,38px);font-family:var(--ui);font-weight:500;
    font-size:clamp(13px,1.6vw,20px);letter-spacing:.02em;color:var(--bright);}
  .ticker span::after{content:"";width:4px;height:4px;border-radius:50%;background:var(--yellow);}
  /* Hidden on mobile: it competed with the countdown and clipped mid-word. */
  @media (max-width:760px){ .ticker{display:none;} }

  /* ---- sections ---- */
  section{scroll-margin-top:84px;}
  .sec{padding-block:clamp(56px,8vw,116px);}
  .sec + .sec{border-top:1px solid var(--hair);}
  .eyebrow{display:flex;align-items:center;gap:14px;margin:0 0 clamp(16px,2.2vw,26px);
    font-family:var(--ui);font-weight:700;font-size:11px;letter-spacing:.16em;
    text-transform:uppercase;color:var(--meta);}
  .eyebrow b{color:var(--yellow);}
  .eyebrow::after{content:"";flex:1;height:1px;background:var(--hair);}
  h2{margin:0;font-weight:700;font-size:clamp(32px,5.8vw,76px);line-height:1;
    letter-spacing:-.045em;color:var(--bright);}
  h2 em{font-style:normal;color:var(--yellow);}
  h3{margin:0;}
  .lede{margin:clamp(20px,2.6vw,32px) 0 0;max-width:34ch;font-size:clamp(19px,2.2vw,28px);
    line-height:1.4;letter-spacing:-.02em;color:var(--bright);}
  .body p{margin:0 0 16px;font-size:clamp(15px,1.6vw,18px);line-height:1.72;}
  .body p:last-child{margin-bottom:0;}

  .split{display:grid;gap:clamp(24px,4vw,64px);grid-template-columns:minmax(0,1fr);}
  @media (min-width:900px){ .split{grid-template-columns:minmax(0,6fr) minmax(0,5fr);} }

  /* ---- data mode: numerals and rules ---- */
  .fig{display:grid;gap:clamp(4px,1.4vw,28px);align-items:baseline;
    grid-template-columns:minmax(0,auto) minmax(0,1fr);
    padding-block:clamp(20px,2.6vw,34px);border-top:1px solid var(--hair);}
  .fig:last-of-type{border-bottom:1px solid var(--hair);}
  .fig b{font-size:clamp(50px,10vw,140px);line-height:.82;letter-spacing:-.06em;
    color:var(--yellow);font-variant-numeric:tabular-nums;}
  .fig div{padding-bottom:clamp(4px,1vw,12px);}
  .fig em{display:block;font-style:normal;font-family:var(--ui);font-weight:700;
    font-size:clamp(13px,1.3vw,16px);letter-spacing:.05em;color:var(--bright);
    margin-bottom:7px;}
  .fig span{font-size:clamp(14px,1.5vw,17px);line-height:1.55;}

  /* ---- what you can do ---- */
  .pills{--step:clamp(16px,4.4vw,74px);display:flex;flex-direction:column;
    gap:clamp(10px,1.2vw,14px);align-items:flex-start;}
  .pill{display:flex;align-items:baseline;
    margin-left:calc(var(--i) * var(--step));
    padding:clamp(12px,1.4vw,17px) clamp(24px,2.4vw,34px);
    border:1px solid rgba(255,255,255,.26);border-radius:999px;
    background:rgba(255,255,255,.022);
    font-size:clamp(15px,1.7vw,21px);letter-spacing:-.015em;color:var(--bright);
    transition:background .22s ease,color .22s ease,border-color .22s ease;}
  .pill i{flex:0 0 auto;font-style:normal;font-family:var(--ui);font-weight:700;
    font-size:11px;letter-spacing:.08em;color:var(--yellow);
    padding-right:clamp(13px,1.3vw,17px);margin-right:clamp(13px,1.3vw,17px);
    border-right:1px solid rgba(255,255,255,.18);
    transition:color .22s ease,border-color .22s ease;}
  .pill:hover{background:var(--yellow);color:#07080C;border-color:var(--yellow);}
  .pill:hover i{color:rgba(7,8,12,.5);border-right-color:rgba(7,8,12,.22);}
  :host(.reveal-on) .pill.is-in{animation-delay:calc(var(--i) * 70ms);}
  @media (max-width:760px){
    .pills{align-items:stretch;}
    .pill{margin-left:0;}
  }

  /* ---- immersive gallery ---- */
  .rail-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;
    flex-wrap:wrap;}
  .rail-btns{display:flex;gap:14px;}
  .rbtn{display:grid;place-items:center;min-width:44px;min-height:44px;
    background:none;border:1px solid var(--hair);border-radius:50%;cursor:pointer;
    color:rgba(255,255,255,.62);transition:color .2s ease,border-color .2s ease;}
  .rbtn:hover{color:var(--yellow);border-color:var(--yellow);}
  .rbtn svg{width:20px;height:12px;display:block;}
  .rail{overflow:hidden;cursor:grab;touch-action:pan-y;margin-top:clamp(24px,3vw,40px);}
  .rail.is-dragging{cursor:grabbing;}
  .rail-track{display:flex;width:max-content;will-change:transform;}
  .rail-set{display:flex;}
  .shot{flex:0 0 auto;margin:0 clamp(10px,1.2vw,16px) 0 0;}
  .shot .frame{position:relative;overflow:hidden;
    height:clamp(230px,32vw,470px);
    background:linear-gradient(155deg,rgba(255,255,255,.08),rgba(255,255,255,.02));
    display:grid;place-items:center;}
  .shot.sm .frame{width:clamp(220px,34vw,350px);}
  .shot.lg .frame{width:clamp(290px,58vw,600px);}
  .shot img{width:100%;height:100%;object-fit:cover;display:block;}
  .shot .num{position:absolute;top:14px;left:16px;font-family:var(--ui);font-weight:700;
    font-size:11px;letter-spacing:.14em;color:var(--yellow);}
  .shot .ph{font-family:var(--ui);font-size:11px;letter-spacing:.18em;
    text-transform:uppercase;color:rgba(255,255,255,.22);}
  .shot figcaption{margin:12px 2px 0;font-family:var(--ui);font-size:13px;
    line-height:1.45;color:var(--meta);max-width:34ch;}

  /* ---- employer directory: the light break in a dark page ---- */
  .band{margin-top:clamp(24px,3vw,40px);padding-block:clamp(28px,3.6vw,48px);
    background:var(--cream);overflow:hidden;}
  .band-intro{margin:0 0 clamp(20px,2.6vw,32px);max-width:46ch;
    font-size:clamp(15px,1.6vw,18px);line-height:1.6;color:rgba(20,20,20,.74);}
  .sectors{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 clamp(26px,3.4vw,42px);
    padding:0;list-style:none;}
  .sectors li{padding:8px 15px;border:1px solid rgba(105,5,4,.24);border-radius:999px;
    font-family:var(--ui);font-weight:500;font-size:13px;letter-spacing:.02em;
    color:var(--maroon);}
  .glabel{margin:0 0 clamp(14px,1.8vw,20px);font-family:var(--ui);font-weight:700;
    font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--maroon);}
  .marquee{overflow:hidden;cursor:grab;touch-action:pan-y;}
  .marquee.is-dragging{cursor:grabbing;}
  .marquee-track{display:flex;width:max-content;will-change:transform;}
  .marquee-set{display:flex;}
  .marquee + .wrap{margin-top:clamp(24px,3vw,38px);}
  .logo{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:8px;margin-inline-end:clamp(36px,4.4vw,72px);}
  .logo img{display:block;height:56px;width:auto;max-width:300px;object-fit:contain;
    transition:transform .25s ease;}
  .logo:hover img{transform:scale(1.06);}
  .logo .nm{display:grid;place-items:center;height:56px;max-width:230px;text-align:center;
    font-family:var(--ui);font-weight:500;font-size:14px;color:#141414;}
  .logo.gold img{max-width:380px;}
  .logo.gold{margin-inline:clamp(36px,4.4vw,72px) clamp(72px,8.6vw,146px);}
  .tier{order:-1;font-family:var(--ui);font-weight:700;font-size:10px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--maroon);}

  /* ---- faqs ---- */
  .faq{border-top:1px solid var(--hair);}
  .faq:last-of-type{border-bottom:1px solid var(--hair);}
  .faq-q{width:100%;display:flex;align-items:baseline;justify-content:space-between;
    gap:24px;min-height:56px;padding:clamp(18px,2.2vw,26px) 0;background:none;border:0;
    color:var(--bright);text-align:left;cursor:pointer;font-family:var(--display);
    font-size:clamp(17px,2vw,24px);letter-spacing:-.025em;}
  .faq-q .chev{width:20px;height:10px;flex:0 0 auto;color:var(--yellow);
    transition:transform .3s ease;}
  .faq[data-open="true"] .chev{transform:rotate(180deg);}
  .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .32s ease;}
  .faq[data-open="true"] .faq-a{grid-template-rows:1fr;}
  .faq-a>div{overflow:hidden;}
  .faq-a p{margin:0 0 clamp(20px,2.6vw,30px);max-width:60ch;
    font-size:clamp(15px,1.6vw,18px);line-height:1.72;}

  /* ---- closing pitch ---- */
  .close{text-align:center;padding-block:clamp(60px,9vw,130px);
    border-top:1px solid var(--hair);}
  .close h2{max-width:20ch;margin-inline:auto;}
  .close > p{margin:clamp(20px,2.6vw,30px) auto 0;max-width:50ch;
    font-size:clamp(16px,1.8vw,20px);line-height:1.6;}
  .contact{margin:clamp(20px,2.6vw,30px) 0 0;font-family:var(--ui);font-size:14px;
    color:var(--meta);}
  .contact a{color:var(--yellow);text-decoration:none;border-bottom:1px solid transparent;}
  .contact a:hover{border-bottom-color:var(--yellow);}

  /* ---- footer ---- */
  .foot{border-top:1px solid var(--hair);
    padding:clamp(36px,5vw,70px) 0 clamp(88px,11vw,120px);}
  .presented{display:flex;flex-wrap:wrap;gap:clamp(26px,5vw,74px);align-items:center;
    padding-bottom:clamp(28px,3.6vw,46px);border-bottom:1px solid var(--hair);}
  .presented div{display:flex;align-items:center;gap:16px;}
  .presented small{font-family:var(--ui);font-size:11px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--meta);}
  .presented img{height:46px;width:auto;object-fit:contain;}
  .presented img.sgn{height:54px;}
  .foot-cols{display:grid;gap:clamp(24px,3.6vw,50px);margin-top:clamp(28px,3.6vw,46px);
    grid-template-columns:repeat(auto-fit,minmax(190px,1fr));}
  .foot h3{margin:0 0 14px;font-family:var(--ui);font-weight:700;font-size:11px;
    letter-spacing:.14em;text-transform:uppercase;color:var(--meta);}
  .foot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;}
  .foot li a{display:inline-flex;align-items:center;min-width:44px;min-height:44px;
    font-family:var(--ui);
    font-size:15px;color:var(--text);text-decoration:none;transition:color .2s ease;}
  .foot li a:hover{color:var(--yellow);}
  /* 30% white on near-black measured ~2.4:1 and failed contrast. 62% clears
     4.5:1, which 11px text needs. */
  .copy{margin:clamp(28px,3.6vw,46px) 0 0;font-family:var(--ui);font-size:11px;
    letter-spacing:.03em;color:rgba(255,255,255,.62);}

  /* ---- sticky dock ---- */
  .dock{position:fixed;left:0;right:0;bottom:0;z-index:38;transform:translateY(110%);
    display:flex;align-items:center;justify-content:space-between;gap:14px;
    padding:11px var(--pad);background:rgba(7,8,12,.96);
    border-top:1px solid var(--hair);backdrop-filter:blur(12px);
    transition:transform .38s cubic-bezier(.2,.8,.2,1);font-family:var(--ui);}
  .dock.is-up{transform:none;}
  .dock p{margin:0;font-size:12px;letter-spacing:.05em;text-transform:uppercase;
    color:var(--meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .dock p b{color:var(--bright);}
  .dock .grp{display:flex;align-items:center;gap:10px;flex:0 0 auto;}
  .dock .btn{min-height:46px;padding:12px 22px;font-size:14px;}
  .dock .top{display:inline-flex;align-items:center;justify-content:center;
    min-width:46px;min-height:46px;background:none;border:1px solid var(--hair);
    border-radius:4px;color:var(--meta);cursor:pointer;font-family:var(--ui);font-size:16px;
    transition:color .2s ease,border-color .2s ease;}
  .dock .top:hover{color:var(--yellow);border-color:var(--yellow);}

  /* ---- reveal: fails OPEN ---- */
  .rise{opacity:1;}
  :host(.reveal-on) .rise{opacity:0;}
  :host(.reveal-on) .rise.is-in{animation:rise .6s cubic-bezier(.2,.7,.3,1) forwards;}
  @keyframes rise{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:none;}}

  /* ---- responsive ---- */
  @media (min-width:761px){
    .nav-list .drawer-cta{display:none;}
  }
  @media (max-width:760px){
    .nav-toggle{display:block;}
    .nav-cta-desktop{display:none;}
    /* A slide-out drawer, so opening the menu no longer shoves the hero down
       the page and leaves a block of empty black behind it. */
    .nav-list{position:fixed;top:0;right:0;bottom:0;width:min(86vw,360px);
      z-index:36;flex-direction:column;align-items:stretch;justify-content:center;
      gap:4px;padding:84px 28px 40px;background:rgba(10,11,16,.985);
      border-left:1px solid var(--hair);overflow-y:auto;
      transform:translateX(101%);transition:transform .32s cubic-bezier(.2,.8,.2,1);}
    .nav[data-open="true"] .nav-list{transform:none;}
    .nav[data-open="true"] ~ .scrim,
    .nav[data-open="true"] + .scrim{opacity:1;pointer-events:auto;}
    /* Full-width rows in the drawer: a bigger tap target and a cleaner list. */
    .nav-list a{display:flex;min-height:54px;font-size:17px;letter-spacing:.02em;
      border-bottom:1px solid var(--hair-soft);}
    .nav-list .drawer-cta{display:block;margin-top:24px;}
    .nav-list .drawer-cta .btn{width:100%;}
    .fig{grid-template-columns:minmax(0,1fr);}
    .dock p{display:none;}
  }
  @media (prefers-reduced-motion:reduce){
    *,*::before,*::after{animation-duration:.001ms !important;transition-duration:.001ms !important;}
    .rise{opacity:1 !important;}
  }
  `;

  /* Take a duplicated track out of the accessibility tree AND the tab order.
   *
   * aria-hidden on the wrapper is enough today because nothing inside a slide
   * is focusable, and it does inherit to descendants. But it is fragile: the
   * moment a caption gains a link or a photo becomes clickable, focusable
   * nodes would sit inside an aria-hidden subtree — an axe violation and a
   * real keyboard trap, since a screen reader user would tab to something it
   * cannot announce. `inert` closes both holes at once.
   *
   * The attribute is also stamped on descendant figures and images so that
   * inspecting any single node in devtools shows it is a duplicate, rather
   * than having to walk up to the wrapper to find out.
   */
  function hideDuplicate(node) {
    node.setAttribute('aria-hidden', 'true');
    node.inert = true;
    node.setAttribute('data-clone', '');
    node.querySelectorAll('figure,img,figcaption').forEach((el) => {
      el.setAttribute('aria-hidden', 'true');
    });
  }

  /* ------------------------------------------------- looping track engine */

  function loopTrack(viewport, track, { autoplay = 0, onClone = () => {} } = {}) {
    const drift = reduced() ? 0 : autoplay;
    let half = 0, offset = 0, vel = 0;
    let dragging = false, hovering = false, focused = false;
    let lastX = 0, lastT = 0, moved = 0, glide = null, raf = 0, prev = 0;

    const measure = () => {
      const set = track.firstElementChild;
      if (!set) { half = 0; return; }
      half = set.getBoundingClientRect().width;
      if (half <= 0) return;
      // Two copies only cover the wrap when one copy is as wide as the viewport.
      const need = Math.max(2, Math.ceil(viewport.clientWidth / half) + 1);
      while (track.children.length < need) {
        const clone = track.firstElementChild.cloneNode(true);
        hideDuplicate(clone);
        track.appendChild(clone);
        onClone(clone);
      }
      while (track.children.length > need) track.lastElementChild.remove();
    };
    const wrap = (o) => (half > 0 ? ((o % half) + half) % half : 0);
    const paint = () => { track.style.transform = 'translate3d(' + (-wrap(offset)) + 'px,0,0)'; };
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
        if (Math.abs(vel) > 2) { offset += vel * dt; vel *= Math.pow(0.02, dt); }
        else { vel = 0; if (drift && !hovering && !focused) offset += drift * dt; }
      }
      paint();
      raf = requestAnimationFrame(frame);
    };

    viewport.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; glide = null; vel = 0; moved = 0;
      lastX = e.clientX; lastT = e.timeStamp;
      viewport.classList.add('is-dragging');
      try { viewport.setPointerCapture(e.pointerId); } catch { /* fine */ }
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(1, e.timeStamp - lastT);
      offset -= dx;
      vel = -dx / (dt / 1000);
      moved += Math.abs(dx);
      lastX = e.clientX; lastT = e.timeStamp;
      paint();
    });
    const end = (e) => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      try { viewport.releasePointerCapture(e.pointerId); } catch { /* fine */ }
    };
    viewport.addEventListener('pointerup', end);
    viewport.addEventListener('pointercancel', end);
    viewport.addEventListener('click', (e) => {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    viewport.addEventListener('pointerenter', () => { hovering = true; });
    viewport.addEventListener('pointerleave', () => { hovering = false; });
    viewport.addEventListener('focusin', () => { focused = true; });
    viewport.addEventListener('focusout', () => { focused = false; });

    const ro = new ResizeObserver(measure);
    ro.observe(track); ro.observe(viewport);
    measure(); paint();
    raf = requestAnimationFrame(frame);

    return {
      step(dir, dist) {
        glide = { from: offset, to: offset + dir * (dist || viewport.clientWidth * 0.8), t: 0 };
        vel = 0;
      },
      stop() { cancelAnimationFrame(raf); ro.disconnect(); },
    };
  }

  /* ---------------------------------------------------------------- markup */

  function logoItem(item) {
    const gold = item.tier ? ' gold' : '';
    const badge = item.tier ? '<span class="tier">' + esc(item.tier) + ' partner</span>' : '';
    return '<div class="logo' + gold + '">' +
      '<img src="' + esc(CONFIG.logoBase + item.slug + '.png') + '" alt="' + esc(item.name) + '" ' +
      'data-name="' + esc(item.name) + '">' + badge + '</div>';
  }

  function marqueeRow(group, dir) {
    const set = group.items.map(logoItem).join('');
    return '<div class="wrap"><h3 class="glabel">' + esc(group.group) + '</h3></div>' +
      '<div class="marquee" data-dir="' + dir + '" data-speed="34">' +
        '<div class="marquee-track">' +
          '<div class="marquee-set">' + set + '</div>' +
          '<div class="marquee-set" aria-hidden="true">' + set + '</div>' +
        '</div></div>';
  }

  const CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<rect x="3" y="5" width="18" height="16"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>';
  const SHARE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M15 8a3 3 0 1 0-2.8-4M15 16a3 3 0 1 1-2.8 4M6 15a3 3 0 1 0 0-6"/>' +
    '<path d="M8.6 13.5l5.8 3M14.4 7.5l-5.8 3"/></svg>';

  function template() {
    const navItems = [
      ['About', '#about'],
      ['Why go', '#why'],
      ['Employers', '#employers'],
      ['Getting there', '#getting-there'],
      ['FAQs', '#faqs'],
    ].map(([l, h]) => '<li><a href="' + h + '">' + l + '</a></li>').join('');

    // One label everywhere. Four variants across nav, hero, closing and dock
    // read as four different offers rather than one repeated call to action.
    const TICKET_LABEL = 'Reserve your free ticket';
    const ticketBtn = (cls) =>
      '<a class="btn ' + cls + '" href="' + esc(CONFIG.ticketsUrl) + '" ' +
      'target="_blank" rel="noopener">' + TICKET_LABEL + '</a>';

    const factsLine =
      '<p class="facts-line">' +
        '<span>' + esc(EVENT.dateShort) + '</span><i>·</i>' +
        '<span>' + esc(EVENT.venueShort) + '</span><i>·</i>' +
        '<span>Free admission</span>' +
      '</p>';

    const tickerSet = INDUSTRIES.map((t) => '<span>' + esc(t) + '</span>').join('');

    const figs = STATS.map((s) =>
      '<div class="fig rise"><b>' + esc(s.figure) + '</b>' +
      '<div><em>' + esc(s.label) + '</em><span>' + esc(s.copy) + '</span></div></div>').join('');

    const doings = DOINGS.map((d, i) =>
      '<div class="pill rise" style="--i:' + i + '">' +
        '<i>' + String(i + 1).padStart(2, '0') + '</i><span>' + esc(d) + '</span>' +
      '</div>').join('');

    const shots = GALLERY.map((g, i) =>
      '<figure class="shot ' + g.size + '">' +
        '<div class="frame">' +
          '<span class="num">0' + (i + 1) + '</span>' +
          (g.src
            ? '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '">'
            : '<span class="ph">photo ' + (i + 1) + '</span>') +
        '</div>' +
        '<figcaption>' + esc(g.caption) + '</figcaption>' +
      '</figure>').join('');

    const sponsors = SPONSORS.map((g, i) => marqueeRow(g, i % 2 ? -1 : 1)).join('');
    const sectors = INDUSTRIES.map((s) => '<li>' + esc(s) + '</li>').join('');

    const faqs = FAQS.map((f, i) =>
      '<div class="faq" data-open="false">' +
        '<h3><button class="faq-q" type="button" aria-expanded="false" ' +
        'aria-controls="a' + i + '"><span>' + esc(f.q) + '</span>' + CHEV + '</button></h3>' +
        '<div class="faq-a" id="a' + i + '" role="region"><div><p>' + esc(f.a) + '</p></div></div>' +
      '</div>').join('');

    const eyebrow = (n, label) => '<p class="eyebrow"><b>' + n + '</b> ' + esc(label) + '</p>';

    return '' +
    '<div class="progress" aria-hidden="true"><i></i></div>' +

    '<div class="sky" aria-hidden="true">' +
      '<canvas class="stars"></canvas>' +
      '<div class="bloom a"></div><div class="bloom b"></div>' +
    '</div>' +
    '<div class="glow" aria-hidden="true"></div>' +
    '<div class="grain" aria-hidden="true"></div>' +

    '<div class="page">' +
      '<nav class="nav" data-open="false" aria-label="Primary">' +
        '<a class="brand" href="#top"><img src="' + esc(CONFIG.crestImage) + '" alt="">The UKSSC</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" ' +
          'aria-controls="nav-list" aria-label="Open menu">' +
          '<svg class="bars" viewBox="0 0 22 16"><path d="M1 2h20M1 8h20M1 14h20" ' +
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>' +
          '<svg class="x" viewBox="0 0 22 16"><path d="M2 1l18 14M20 1L2 15" ' +
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>' +
        '</button>' +
        '<ul class="nav-list" id="nav-list">' + navItems +
          '<li class="drawer-cta">' + ticketBtn('btn-solid') + '</li>' +
        '</ul>' +
        '<span class="nav-cta-desktop">' + ticketBtn('btn-solid') + '</span>' +
      '</nav>' +
      '<div class="scrim" id="scrim" aria-hidden="true"></div>' +

      '<main id="main" tabindex="-1">' +
        '<header class="hero wrap" id="top">' +
          '<div class="mark">' +
            '<img src="' + esc(CONFIG.heroImage) + '" alt="Blastoff! 2026" width="1368" height="300">' +
            SPARKLE.replace('class="spark"', 'class="spark one"') +
            SPARKLE.replace('class="spark"', 'class="spark two"') +
          '</div>' +
          '<p class="tagline">' + esc(EVENT.tagline) + '</p>' +
          '<h1>' + esc(EVENT.proposition) + '</h1>' +
          '<p class="pitch">' + esc(EVENT.pitch) + '</p>' +
          factsLine +
          '<div class="hero-cta">' +
            ticketBtn('btn-solid') +
            '<a class="btn btn-outline" href="#employers">See participating employers</a>' +
          '</div>' +
        '</header>' +

        /* Countdown and credibility figures sit just below the hero. Inside it
           they made nine stacked elements and pushed the CTA away from being
           the last thing read. */
        '<div class="wrap substrip">' +
          '<div class="count" id="count" aria-label="Time until Blastoff! 2026"></div>' +
          '<p class="micro">400+ students expected · 30+ organisations · ' +
            '40 society partners</p>' +
        '</div>' +

        '<div class="ticker marquee" data-dir="1" data-speed="30" aria-hidden="true">' +
          '<div class="marquee-track"><div class="marquee-set">' + tickerSet + '</div></div>' +
        '</div>' +

        '<div class="wrap">' +
          '<section class="sec" id="about">' +
            eyebrow('01', 'About') +
            '<div class="split">' +
              '<div>' +
                '<h2>A room full of<br><em>people who hire</em></h2>' +
                '<p class="lede rise">' + esc(ABOUT[0]) + '</p>' +
              '</div>' +
              '<div class="body rise">' +
                '<p>' + esc(ABOUT[1]) + '</p><p>' + esc(ABOUT[2]) + '</p>' +
                '<p style="margin-top:22px">' +
                  '<button class="lnk" id="ics" type="button">' + CAL_ICON + 'Add to calendar</button>' +
                '</p>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section class="sec" id="why">' +
            eyebrow('02', 'Why go') +
            '<h2 style="max-width:18ch">What you can do at <em>Blastoff!</em></h2>' +
            '<div class="pills" style="margin-top:clamp(34px,4.6vw,64px)">' + doings + '</div>' +
            '<div style="margin-top:clamp(56px,8vw,104px)">' + figs + '</div>' +
          '</section>' +
        '</div>' +

        '<section class="sec" aria-labelledby="gal-h">' +
          '<div class="wrap rail-head">' +
            '<div>' + eyebrow('03', 'Gallery') +
              '<h2 id="gal-h">See what<br>Blastoff! <em>is like</em></h2>' +
              '<p class="lede rise" style="max-width:40ch;font-size:clamp(16px,1.7vw,20px)">' +
                'Hundreds of students, dozens of organisations, and one afternoon of ' +
                'conversations that could shape what comes next.</p></div>' +
            '<div class="rail-btns">' +
              '<button class="rbtn" type="button" data-dir="-1" aria-label="Previous photos">' +
                '<svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.6" ' +
                'stroke-linecap="round"><path d="M29 7H1M7 1L1 7l6 6"/></svg></button>' +
              '<button class="rbtn" type="button" data-dir="1" aria-label="Next photos">' +
                '<svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.6" ' +
                'stroke-linecap="round"><path d="M1 7h28M23 1l6 6-6 6"/></svg></button>' +
            '</div></div>' +
          '<div class="rail"><div class="rail-track">' +
            '<div class="rail-set">' + shots + '</div>' +
            '<div class="rail-set" aria-hidden="true">' + shots + '</div>' +
          '</div></div>' +
        '</section>' +

        '<section class="sec" id="employers">' +
          '<div class="wrap">' + eyebrow('04', 'Employers') +
            '<h2>Meet the organisations<br><em>looking for talent like you</em></h2></div>' +
          '<div class="band">' +
            '<div class="wrap">' +
              '<p class="band-intro">Explore opportunities across finance, consulting, ' +
                'technology, energy and Singapore’s public service.</p>' +
              '<ul class="sectors">' + sectors + '</ul>' +
            '</div>' +
            sponsors +
          '</div>' +
        '</section>' +

        '<div class="wrap">' +
          '<section class="sec" id="getting-there">' +
            eyebrow('05', 'Getting there') +
            '<div class="split">' +
              '<div>' +
                '<h2 style="font-size:clamp(28px,4.4vw,56px);color:var(--mint)">' +
                  'Suntec Singapore</h2>' +
                '<div class="body" style="margin-top:20px">' +
                  '<p>Convention &amp; Exhibition Centre<br>' + esc(EVENT.venueDetail) +
                  '<br>1 Raffles Boulevard</p></div>' +
              '</div>' +
              '<div class="body rise">' +
                '<p>A short covered walk from three MRT stations: ' +
                  TRAVEL.lines.map(esc).join(', ') + '.</p>' +
                '<p><a class="lnk" href="' + esc(TRAVEL.mapUrl) + '" target="_blank" ' +
                  'rel="noopener">Open in Maps ↗</a></p>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section class="sec" id="faqs">' +
            eyebrow('06', 'Questions') +
            '<h2 style="margin-bottom:clamp(26px,3.4vw,46px)">FAQs</h2>' + faqs +
          '</section>' +

          '<section class="close" aria-labelledby="close-h">' +
            '<h2 id="close-h">Your next opportunity<br><em>could begin here</em></h2>' +
            '<p>Meet employers, explore career paths and reconnect with Singapore’s ' +
              'professional community — all in one afternoon.</p>' +
            factsLine +
            '<div class="hero-cta">' +
              ticketBtn('btn-solid') +
              '<button class="btn btn-outline" id="share" type="button">' +
                SHARE_ICON + '<span>Share</span></button>' +
            '</div>' +
            '<p class="contact">Questions? Email ' +
              '<a href="mailto:' + esc(CONFIG.contactEmail) + '">' +
              esc(CONFIG.contactEmail) + '</a></p>' +
          '</section>' +
        '</div>' +
      '</main>' +

      '<footer class="foot wrap" id="contact">' +
        '<div class="presented">' +
          '<div><small>proudly presented by</small>' +
            '<img src="' + esc(CONFIG.crestImage) + '" alt="UKSSC"></div>' +
          '<div><small>community partner</small>' +
            '<img class="sgn" src="' + esc(CONFIG.sgnImage) + '" alt="Singapore Global Network"></div>' +
        '</div>' +
        '<div class="foot-cols">' +
          '<div><h3>Event</h3><ul>' +
            '<li><a href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">' +
              TICKET_LABEL + '</a></li>' +
            '<li><a href="#employers">Employers</a></li>' +
            '<li><a href="#faqs">FAQs</a></li>' +
            '<li><a href="' + esc(TRAVEL.mapUrl) + '" target="_blank" rel="noopener">Getting there</a></li>' +
          '</ul></div>' +
          '<div><h3>Resources</h3><ul>' +
            '<li><a href="#">Constitution</a></li>' +
            '<li><a href="mailto:' + esc(CONFIG.contactEmail) + '">Contact us</a></li>' +
          '</ul></div>' +
          '<div><h3>Connect</h3><ul>' +
            '<li><a href="https://instagram.com/theukssc" target="_blank" rel="noopener">Instagram</a></li>' +
            '<li><a href="#">Telegram</a></li><li><a href="#">LinkedIn</a></li>' +
            '<li><a href="mailto:' + esc(CONFIG.contactEmail) + '">Email</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<p class="copy">© 2026 United Kingdom-Singapore Students’ Council · Draft 2, not the live page</p>' +
      '</footer>' +
    '</div>' +

    '<div class="dock" id="dock">' +
      '<p><b>' + esc(EVENT.dateLabel) + '</b> · ' + esc(EVENT.timeLabel) + ' · Suntec · free</p>' +
      '<span class="grp">' +
        '<button class="top" id="to-top" type="button" aria-label="Back to top">↑</button>' +
        ticketBtn('btn-solid') +
      '</span>' +
    '</div>';
  }

  /* -------------------------------------------------------------- element */

  class BlastoffDraft extends HTMLElement {
    connectedCallback() {
      if (this._up) return;
      this._up = true;
      this._loops = [];

      loadFonts();
      addStructuredData();

      const root = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = CSS;
      root.append(style);
      root.append(document.createRange().createContextualFragment(template()));

      this._hardenClones(root);
      this._starfield(root);
      this._grain(root);
      this._glow(root);
      this._progress(root);
      this._nav(root);
      this._logos(root);
      this._rail(root);
      this._marquees(root);
      this._faqs(root);
      this._countdown(root);
      this._calendar(root);
      this._share(root);
      this._dock(root);
      this._reveal(root);
    }

    disconnectedCallback() {
      (this._loops || []).forEach((l) => l.stop());
      this._loops = [];
      if (this._tick) clearInterval(this._tick);
      if (this._stars) this._stars();
      if (this._progStop) this._progStop();
      if (this._revealGuard) clearTimeout(this._revealGuard);
      document.documentElement.style.overflow = '';
    }

    // The second track in each carousel ships in the markup with aria-hidden.
    // Give it the same treatment loopTrack gives the ones it generates, so
    // hand-written and runtime duplicates behave identically.
    _hardenClones(root) {
      root.querySelectorAll('.rail-set[aria-hidden="true"],.marquee-set[aria-hidden="true"]')
        .forEach(hideDuplicate);
    }

    /* An animated starfield, drawn rather than shipped as an image.
     *
     * The canvas is viewport-sized and fixed, not page-height. A page-tall
     * canvas would be up to 4000px and far too expensive to repaint every
     * frame; scroll is faked instead by offsetting each star's y by the scroll
     * position times its depth and wrapping modulo the height, which also makes
     * the field effectively infinite.
     *
     * Twinkle is a sine on each star's own phase and speed, so they shimmer
     * independently rather than pulsing in unison. Honours reduced motion by
     * painting a single static frame and never starting the loop.
     */
    _starfield(root) {
      const canvas = root.querySelector('.stars');
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');

      let stars = [], w = 0, h = 0;

      const build = () => {
        const dpr = Math.min(2, devicePixelRatio || 1);
        w = innerWidth;
        h = innerHeight;
        if (!w || !h) return;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Deterministic scatter — the same sky every load, no reshuffle on resize.
        const count = Math.min(460, Math.round((w * h) / 3400));
        stars = [];
        for (let i = 0; i < count; i++) {
          stars.push({
            x: ((i * 0.6180339887498949) % 1) * w,
            y: ((i * 0.4142135623730951) % 1) * h,
            r: 0.35 + ((i * 7919) % 100) / 100 * 1.15,
            a: 0.14 + ((i * 6151) % 100) / 100 * 0.6,
            phase: ((i * 3571) % 628) / 100,
            speed: 0.5 + ((i * 2749) % 100) / 100 * 1.7,
            depth: 0.25 + ((i * 5381) % 100) / 100 * 0.85,
            warm: (i * 6151) % 100 > 88,
          });
        }
      };

      const paint = (t) => {
        if (!w || !h) return;
        ctx.clearRect(0, 0, w, h);
        const sy = window.scrollY || 0;
        for (const s of stars) {
          let y = (s.y - sy * s.depth * 0.06) % h;
          if (y < 0) y += h;
          const tw = t === null ? 1 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
          ctx.globalAlpha = Math.max(0, Math.min(1, s.a * tw));
          ctx.fillStyle = s.warm ? '#DFFF3E' : '#FFFFFF';
          ctx.beginPath();
          ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };

      build();

      if (reduced()) {
        paint(null);
        const onResize = () => { build(); paint(null); };
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onResize, { passive: true });
        this._stars = () => {
          window.removeEventListener('resize', onResize);
          window.removeEventListener('scroll', onResize);
        };
        return;
      }

      let raf = 0;
      const loop = (now) => {
        paint(now / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onResize = () => build();
      window.addEventListener('resize', onResize);
      this._stars = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
      };
    }

    _grain(root) {
      const el = root.querySelector('.grain');
      if (!el) return;
      const n = 180;
      const c = document.createElement('canvas');
      c.width = c.height = n;
      const ctx = c.getContext('2d');
      const img = ctx.createImageData(n, n);
      for (let i = 0; i < img.data.length; i += 4) {
        const p = i / 4;
        const v = (((p * 1103515245 + 12345) >>> 8) % 256);
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 26;
      }
      ctx.putImageData(img, 0, 0);
      el.style.backgroundImage = 'url(' + c.toDataURL('image/png') + ')';
    }

    _glow(root) {
      const glow = root.querySelector('.glow');
      if (!glow || matchMedia('(hover:none)').matches || reduced()) return;
      let raf = 0, x = 0, y = 0;
      const move = () => { raf = 0; glow.style.left = x + 'px'; glow.style.top = y + 'px'; };
      this.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        x = e.clientX; y = e.clientY;
        glow.classList.add('is-on');
        if (!raf) raf = requestAnimationFrame(move);
      });
      this.addEventListener('pointerleave', () => glow.classList.remove('is-on'));
    }

    _progress(root) {
      const bar = root.querySelector('.progress i');
      if (!bar) return;
      let raf = 0;
      const paint = () => {
        raf = 0;
        const max = document.scrollingElement.scrollHeight - innerHeight;
        const pct = max > 0 ? Math.min(1, (window.scrollY || 0) / max) : 0;
        bar.style.width = (pct * 100).toFixed(2) + '%';
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      paint();
      this._progStop = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }

    _nav(root) {
      const nav = root.querySelector('.nav');
      const toggle = root.querySelector('.nav-toggle');
      const scrim = root.getElementById('scrim');

      const setOpen = (open) => {
        nav.dataset.open = String(open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        // Lock the page behind the drawer so it cannot scroll underneath.
        document.documentElement.style.overflow = open ? 'hidden' : '';
      };

      toggle.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'));
      if (scrim) scrim.addEventListener('click', () => setOpen(false));
      root.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.dataset.open === 'true') {
          setOpen(false);
          toggle.focus();
        }
      });

      root.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href').slice(1);
          const target = id && root.getElementById(id);
          if (!target) return;
          e.preventDefault();
          setOpen(false);
          target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
        });
      });

      const links = [...root.querySelectorAll('.nav-list a')];
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.removeAttribute('aria-current'));
          const active = links.find((l) => l.getAttribute('href') === '#' + en.target.id);
          if (active) active.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['about', 'why', 'employers', 'getting-there', 'faqs'].forEach((id) => {
        const el = root.getElementById(id);
        if (el) io.observe(el);
      });
    }

    // Equal ink area: a 10:1 wordmark and a 1:1 crest carry the same mass.
    _logos(scope) {
      const AREA = 10000, MIN_H = 30, MAX_H = 104, MAX_W = 300;
      scope.querySelectorAll('.logo img').forEach((img) => {
        if (img.dataset.sized) return;
        img.dataset.sized = '1';
        const gold = img.closest('.logo').classList.contains('gold');
        const size = () => {
          const r = img.naturalWidth / img.naturalHeight;
          if (!r || !isFinite(r)) return;
          const area = gold ? AREA * 2 : AREA;
          const maxH = gold ? MAX_H * 1.35 : MAX_H;
          const maxW = gold ? MAX_W * 1.27 : MAX_W;
          let h = Math.min(Math.max(Math.sqrt(area / r), MIN_H), maxH);
          if (h * r > maxW) h = maxW / r;
          img.style.height = h.toFixed(1) + 'px';
          img.style.width = (h * r).toFixed(1) + 'px';
        };
        const fallback = () => {
          const s = document.createElement('span');
          s.className = 'nm';
          s.textContent = img.dataset.name;
          img.replaceWith(s);
        };
        if (img.complete) { img.naturalWidth > 0 ? size() : fallback(); return; }
        img.addEventListener('load', size, { once: true });
        img.addEventListener('error', fallback, { once: true });
      });
    }

    _rail(root) {
      const rail = root.querySelector('.rail');
      const track = root.querySelector('.rail-track');
      if (!rail || !track) return;
      const loop = loopTrack(rail, track);
      this._loops.push(loop);
      const step = () => {
        const s = track.querySelector('.shot');
        if (!s) return rail.clientWidth * 0.8;
        const gap = parseFloat(getComputedStyle(s).marginInlineEnd) || 0;
        return s.getBoundingClientRect().width + gap;
      };
      root.querySelectorAll('.rbtn').forEach((b) => {
        b.addEventListener('click', () => loop.step(Number(b.dataset.dir), step()));
      });
    }

    _marquees(root) {
      root.querySelectorAll('.marquee').forEach((row) => {
        const track = row.querySelector('.marquee-track');
        if (!track) return;
        const speed = Number(row.dataset.speed) || 34;
        this._loops.push(loopTrack(row, track, {
          autoplay: speed * (Number(row.dataset.dir) || 1),
          onClone: (node) => this._logos(node),
        }));
      });
    }

    _faqs(root) {
      root.querySelectorAll('.faq').forEach((faq) => {
        const btn = faq.querySelector('.faq-q');
        btn.addEventListener('click', () => {
          const open = faq.dataset.open !== 'true';
          faq.dataset.open = String(open);
          btn.setAttribute('aria-expanded', String(open));
        });
      });
    }

    _countdown(root) {
      const list = root.getElementById('count');
      const start = new Date(EVENT.startISO).getTime();
      const end = new Date(EVENT.endISO).getTime();
      const units = [['days', 86400000], ['hrs', 3600000], ['mins', 60000], ['secs', 1000]];

      const render = () => {
        const now = Date.now();
        if (now >= end) {
          list.innerHTML = '<span class="msg">Thanks for joining us</span>';
          clearInterval(this._tick);
          return;
        }
        if (now >= start) {
          list.innerHTML = '<span class="msg">Happening now — Suntec, Level 3 Summit 1</span>';
          return;
        }
        let left = start - now;
        list.innerHTML = units.map(([label, ms], i) => {
          const v = Math.floor(left / ms);
          left -= v * ms;
          return (i ? '<span class="dot">·</span>' : '') +
            '<span class="u"><b>' + v + '</b><i>' + label + '</i></span>';
        }).join('');
      };

      render();
      this._tick = setInterval(render, 1000);
    }

    _calendar(root) {
      const btn = root.getElementById('ics');
      if (!btn) return;
      const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      btn.addEventListener('click', () => {
        const ics = [
          'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//UKSSC//Blastoff 2026//EN',
          'BEGIN:VEVENT',
          'UID:blastoff-2026@theukssc.co.uk',
          'DTSTAMP:' + stamp(new Date().toISOString()),
          'DTSTART:' + stamp(EVENT.startISO),
          'DTEND:' + stamp(EVENT.endISO),
          'SUMMARY:' + EVENT.name + ' — UKSSC careers fair',
          'DESCRIPTION:Free admission. Tickets: ' + CONFIG.ticketsUrl,
          'LOCATION:' + EVENT.venue + ', ' + EVENT.venueDetail,
          'URL:' + CONFIG.pageUrl,
          'END:VEVENT', 'END:VCALENDAR',
        ].join('\r\n');
        const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blastoff-2026.ics';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });
    }

    _share(root) {
      const btn = root.getElementById('share');
      if (!btn) return;
      const label = btn.querySelector('span');
      btn.addEventListener('click', async () => {
        const data = {
          title: EVENT.name,
          text: EVENT.proposition + ' — ' + EVENT.dateLabel + ', ' + EVENT.timeLabel +
                ' at Suntec. Free admission.',
          url: CONFIG.pageUrl,
        };
        if (navigator.share) {
          try { await navigator.share(data); return; } catch { /* dismissed */ }
        }
        try {
          await navigator.clipboard.writeText(data.url);
          label.textContent = 'Link copied';
          setTimeout(() => { label.textContent = 'Share'; }, 1800);
        } catch {
          window.open('https://wa.me/?text=' + encodeURIComponent(data.text + ' ' + data.url),
            '_blank', 'noopener');
        }
      });
    }

    _dock(root) {
      const dock = root.getElementById('dock');
      const anchor = root.querySelector('.hero-cta');
      const top = root.getElementById('to-top');
      if (top) {
        top.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
        });
      }
      if (!dock || !anchor) return;
      const io = new IntersectionObserver(([en]) => {
        dock.classList.toggle('is-up', !en.isIntersecting && en.boundingClientRect.top < 0);
      }, { threshold: 0 });
      io.observe(anchor);
    }

    _reveal(root) {
      const items = [...root.querySelectorAll('.rise')];
      if (reduced() || typeof IntersectionObserver !== 'function') return;

      this.classList.add('reveal-on');
      let any = false;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          any = true;
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -12% 0px' });
      items.forEach((el) => io.observe(el));

      // Never sit on an invisible page if the observer does not deliver.
      this._revealGuard = setTimeout(() => {
        if (!any) items.forEach((el) => el.classList.add('is-in'));
      }, 1800);
    }
  }

  customElements.define(TAG, BlastoffDraft);
})();
