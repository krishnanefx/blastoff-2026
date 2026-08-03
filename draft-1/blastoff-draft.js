/* =============================================================================
 * <ukssc-blastoff-draft> — Blastoff! 2026, poster-led redesign (draft 1)
 * -----------------------------------------------------------------------------
 * A separate component from the live blastoff-element.js so the two can't
 * affect each other. Lives at /draft-1/ and reads its artwork from ../assets/.
 *
 * Visual direction follows the publicity poster: deep space ground, nebula
 * bloom, drifting starfield, sparkle glyphs on the wordmark, and hairline
 * rounded pills for the benefit lines.
 *
 * NOTE ON COPY: the times, attendee count and tagline here come from the
 * POSTER, which disagrees with the live site (4pm-9pm vs 13:00-18:00, 400+ vs
 * 600+, "to new horizons" vs "to new heights"). Confirm which is right before
 * this replaces the live page.
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
    // Reverse (white) lockup, derived from SGN's own single-colour horizontal
    // logo — they publish red only, and the poster uses white on dark. Worth
    // asking SGN for their official reverse asset before this goes public.
    sgnImage: asset('../assets/sgn-white.png'),
    logoBase: asset('../assets/logos/'),
    pageUrl: 'https://krishnanefx.github.io/blastoff-2026/draft-1/',
  };

  const EVENT = {
    name: 'Blastoff! 2026',
    tagline: 'to new horizons!',
    dateLabel: '14 August 2026',
    timeLabel: '4pm – 9pm',
    venue: 'Suntec Singapore Convention & Exhibition Centre',
    venueDetail: 'Level 3, Summit 1',
    // Singapore is UTC+8 year round.
    startISO: '2026-08-14T16:00:00+08:00',
    endISO: '2026-08-14T21:00:00+08:00',
  };

  const STATS = [
    { figure: '400+', label: 'global attendees', copy: 'students flying in from across the UK, Europe, the US and Asia' },
    { figure: '30', label: 'corporate partners', copy: 'hiring across finance, consulting, tech, energy and the public service' },
    { figure: '40', label: 'society partners', copy: 'student bodies advancing overseas Singaporean talent' },
  ];

  const TRAVEL = {
    lines: ['Promenade', 'Esplanade', 'City Hall'],
    mapUrl: 'https://maps.google.com/?q=Suntec+Singapore+Convention+%26+Exhibition+Centre',
  };

  const BENEFITS = [
    'connect with corporate partners',
    'meet with 400+ global attendees',
    'unlock career opportunities',
    'gain industry insights',
  ];

  const ABOUT = 'Launched in 2021 as the "Through the Generations" career fair, ' +
    'Blastoff! is the flagship professional initiative of the UKSSC. Built for ' +
    'overseas Singaporean students, it brings together hundreds of attendees and ' +
    'over 30 corporate partners in Singapore — a platform to navigate the local ' +
    'job market, secure internships, and start a career.';

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

  // TODO: confirm with the committee — drafted from the event details, not policy.
  const FAQS = [
    {
      q: 'Who can attend Blastoff!?',
      a: 'Blastoff! is built for overseas Singaporean students, wherever you study. ' +
         'Admission is free, whether you are after an internship, a graduate role, ' +
         'or simply want to understand the Singapore market.',
    },
    {
      q: 'Do I need to book a ticket in advance?',
      a: 'Yes. Tickets are free but capacity at Suntec is limited, so book ahead. ' +
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
      a: 'Suntec Singapore is a short walk from Promenade, Esplanade and City Hall ' +
         'MRT stations. The fair is on Level 3, Summit 1.',
    },
  ];

  const FONT_SHEETS = [
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;800&display=swap',
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

  // Idea 5: Event structured data, so Google can show date, venue and price
  // as a rich result instead of a plain blue link.
  function addStructuredData() {
    if (document.head.querySelector('script[data-draft-jsonld]')) return;
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: EVENT.name,
      description: ABOUT,
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: [new URL('../assets/og-blastoff-2026.png', SCRIPT_BASE).href],
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
        name: "United Kingdom-Singapore Students' Council",
        url: 'https://theukssc.co.uk',
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
    'transform="rotate(0 12 12)" fill="currentColor"/></svg>';

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
    --amber:#FFAD00;
    --bone:#F7F7F4;
    --hair:rgba(255,255,255,.13);
    --hair-soft:rgba(255,255,255,.06);
    --text:rgba(255,255,255,.66);
    --bright:rgba(255,255,255,.92);

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
  :where(a,button):focus-visible{outline:2px solid var(--yellow);outline-offset:4px;}

  .skip{position:absolute;left:-9999px;top:0;z-index:50;background:var(--yellow);color:#000;
    padding:12px 18px;font-family:var(--ui);font-weight:700;text-decoration:none;}
  .skip:focus{left:0;}

  /* ---- cosmos ---- */
  .sky{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;}
  .stars{position:absolute;inset:0;width:100%;height:100%;display:block;}
  .bloom{position:absolute;border-radius:50%;filter:blur(90px);opacity:.42;}
  .bloom.a{width:56vw;height:56vw;right:-14vw;top:-4vh;
    background:radial-gradient(circle,rgba(120,255,214,.26),transparent 68%);}
  .bloom.b{width:46vw;height:46vw;left:-14vw;top:38vh;
    background:radial-gradient(circle,rgba(255,196,92,.16),transparent 70%);}
  .bloom.c{width:64vw;height:64vw;right:-20vw;top:76vh;
    background:radial-gradient(circle,rgba(120,180,255,.13),transparent 72%);}
  .grain{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.055;
    mix-blend-mode:overlay;background-repeat:repeat;background-size:180px 180px;}
  .glow{position:absolute;width:680px;height:680px;border-radius:50%;pointer-events:none;
    z-index:0;opacity:0;transition:opacity .6s ease;transform:translate(-50%,-50%);
    background:radial-gradient(circle,rgba(223,255,62,.085),transparent 62%);}
  .glow.is-on{opacity:1;}
  @media (hover:none){ .glow{display:none;} }
  .shoot{position:absolute;z-index:0;pointer-events:none;height:1px;width:170px;opacity:0;
    background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.85));}
  .shoot::after{content:"";position:absolute;right:0;top:-1px;width:3px;height:3px;border-radius:50%;
    background:#fff;box-shadow:0 0 8px 2px rgba(255,255,255,.7);}

  .progress{position:fixed;left:0;top:0;height:2px;width:100%;z-index:45;pointer-events:none;}
  .progress i{display:block;height:100%;width:0;background:var(--yellow);}

  .page{position:relative;z-index:1;}

  /* ---- nav: a rule, not a bar ---- */
  .nav{position:sticky;top:0;z-index:30;display:flex;align-items:baseline;
    justify-content:space-between;gap:20px;padding:18px var(--pad) 14px;
    background:linear-gradient(180deg,rgba(7,8,12,.92),rgba(7,8,12,.55));
    backdrop-filter:blur(10px);border-bottom:1px solid var(--hair-soft);font-family:var(--ui);}
  .brand{display:flex;align-items:center;gap:9px;text-decoration:none;font-weight:800;
    font-size:15px;letter-spacing:.02em;text-transform:uppercase;color:var(--bright);}
  .brand img{width:22px;height:22px;object-fit:contain;}
  .nav-list{display:flex;align-items:baseline;gap:clamp(16px,2.4vw,34px);
    list-style:none;margin:0;padding:0;}
  .nav-list a{text-decoration:none;font-size:13px;letter-spacing:.09em;text-transform:uppercase;
    color:rgba(255,255,255,.5);transition:color .2s ease;}
  .nav-list a:hover,.nav-list a[aria-current="true"]{color:var(--yellow);}
  .nav-cta{font-family:var(--ui);font-size:13px;letter-spacing:.09em;text-transform:uppercase;
    color:var(--yellow);text-decoration:none;border-bottom:1px solid var(--yellow);
    padding-bottom:2px;white-space:nowrap;}
  .nav-toggle{display:none;background:none;border:0;color:var(--yellow);padding:4px;cursor:pointer;}
  .nav-toggle svg{display:block;width:22px;height:16px;}

  /* ---- hero: type does the work ---- */
  .hero{padding:clamp(30px,7vh,90px) 0 clamp(24px,4vh,52px);text-align:center;}
  .mark{position:relative;display:inline-block;width:min(1180px,94%);}
  .mark img{display:block;width:100%;height:auto;
    filter:drop-shadow(0 0 60px rgba(223,255,62,.22));}
  .spark{position:absolute;width:clamp(18px,2.2vw,32px);height:auto;color:var(--yellow);}
  .spark.one{top:-5%;right:-3%;}
  .spark.two{bottom:0;left:-4%;width:clamp(12px,1.5vw,21px);}
  .tagline{margin:clamp(12px,1.8vw,20px) 0 0;font-size:clamp(16px,1.8vw,22px);
    letter-spacing:.01em;color:var(--mint);}

  /* Countdown as bare numerals divided by hairlines — no boxes. */
  .count{display:flex;justify-content:center;align-items:flex-start;
    margin:clamp(30px,5vw,54px) 0 0;font-variant-numeric:tabular-nums;}
  .count .u{display:flex;flex-direction:column;align-items:center;
    padding-inline:clamp(14px,2.6vw,34px);border-left:1px solid var(--hair);}
  .count .u:first-child{border-left:0;}
  .count b{font-size:clamp(30px,4.4vw,56px);line-height:1;letter-spacing:-.045em;
    color:var(--bright);font-weight:700;}
  .count i{margin-top:9px;font-style:normal;font-family:var(--ui);font-size:10px;
    letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.38);}
  .count .msg{font-size:clamp(16px,2vw,22px);color:var(--yellow);}

  /* ---- kinetic strip ---- */
  .ticker{margin-top:clamp(40px,6vw,72px);border-block:1px solid var(--hair);
    padding-block:clamp(12px,1.6vw,20px);}
  .ticker .marquee-set{display:flex;align-items:center;}
  .ticker span{flex:0 0 auto;display:flex;align-items:center;gap:clamp(20px,3vw,44px);
    margin-inline-end:clamp(20px,3vw,44px);
    font-size:clamp(15px,2.1vw,27px);letter-spacing:.02em;color:var(--bright);}
  .ticker span::after{content:"";width:5px;height:5px;border-radius:50%;background:var(--yellow);}

  /* ---- event line: editorial split, hairlines only ---- */
  .when{display:grid;gap:clamp(20px,3vw,40px);align-items:end;
    grid-template-columns:minmax(0,1fr) minmax(0,auto);
    padding-block:clamp(40px,6vw,76px);border-bottom:1px solid var(--hair);}
  .when .big{margin:0;font-weight:700;font-size:clamp(46px,9vw,124px);line-height:.86;
    letter-spacing:-.055em;color:var(--yellow);}
  .when .big em{display:block;font-style:normal;color:var(--bright);}
  .when .place{margin:0;text-align:right;font-size:clamp(15px,1.7vw,20px);line-height:1.45;
    color:var(--text);}
  .when .place b{display:block;color:var(--bright);font-weight:700;
    font-size:clamp(17px,2vw,24px);letter-spacing:-.02em;margin-bottom:6px;}

  .actions{display:flex;flex-wrap:wrap;gap:clamp(16px,2.4vw,34px);align-items:center;
    padding-block:clamp(26px,3.4vw,42px);border-bottom:1px solid var(--hair);}
  .lnk{display:inline-flex;align-items:center;gap:9px;background:none;border:0;padding:0;
    cursor:pointer;font-family:var(--ui);font-size:14px;letter-spacing:.07em;
    text-transform:uppercase;text-decoration:none;color:var(--bright);
    border-bottom:1px solid transparent;transition:color .2s ease,border-color .2s ease;}
  .lnk:hover{color:var(--yellow);border-bottom-color:var(--yellow);}
  .lnk.key{color:var(--yellow);border-bottom-color:var(--yellow);font-weight:700;}
  .lnk svg{width:15px;height:15px;}
  .free{margin:clamp(18px,2.4vw,28px) 0 0;font-family:var(--ui);font-size:13px;
    letter-spacing:.02em;color:rgba(255,255,255,.42);}

  /* ---- sticky dock: a thin bar, not a pill card ---- */
  .dock{position:fixed;left:0;right:0;bottom:0;z-index:40;transform:translateY(110%);
    display:flex;align-items:center;justify-content:space-between;gap:20px;
    padding:13px var(--pad);background:rgba(7,8,12,.94);
    border-top:1px solid var(--hair);backdrop-filter:blur(12px);
    transition:transform .38s cubic-bezier(.2,.8,.2,1);font-family:var(--ui);}
  .dock.is-up{transform:none;}
  .dock p{margin:0;font-size:13px;letter-spacing:.05em;text-transform:uppercase;
    color:rgba(255,255,255,.58);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .dock p b{color:var(--bright);}

  /* ---- sections ---- */
  section{scroll-margin-top:90px;}
  .sec{padding-block:clamp(64px,11vw,150px);}
  .sec + .sec{border-top:1px solid var(--hair);}
  .eyebrow{display:flex;align-items:center;gap:14px;margin:0 0 clamp(18px,2.4vw,30px);
    font-family:var(--ui);font-size:11px;letter-spacing:.24em;text-transform:uppercase;
    color:rgba(255,255,255,.34);}
  .eyebrow b{color:var(--yellow);font-weight:700;}
  .eyebrow::after{content:"";flex:1;height:1px;background:var(--hair);}
  h2{margin:0;font-weight:700;font-size:clamp(34px,6.6vw,86px);line-height:.98;
    letter-spacing:-.05em;color:var(--bright);}
  h2 em{font-style:normal;color:var(--yellow);}
  .lede{margin:clamp(22px,3vw,38px) 0 0;max-width:30ch;font-size:clamp(19px,2.4vw,30px);
    line-height:1.38;letter-spacing:-.02em;color:var(--text);}
  .lede b{color:var(--bright);font-weight:400;}

  .split{display:grid;gap:clamp(24px,4vw,70px);grid-template-columns:minmax(0,1fr);}
  @media (min-width:900px){ .split{grid-template-columns:minmax(0,7fr) minmax(0,5fr);} }
  .aside{font-size:clamp(14px,1.5vw,16px);line-height:1.62;}
  .aside p{margin:0 0 14px;}

  /* ---- stats: numerals and rules ---- */
  .figs{margin:0;}
  .fig{display:grid;gap:clamp(4px,1.4vw,28px);align-items:baseline;
    grid-template-columns:minmax(0,auto) minmax(0,1fr);
    padding-block:clamp(22px,3vw,40px);border-top:1px solid var(--hair);}
  .fig:last-child{border-bottom:1px solid var(--hair);}
  .fig b{font-size:clamp(56px,12vw,168px);line-height:.8;letter-spacing:-.06em;
    color:var(--yellow);font-variant-numeric:tabular-nums;}
  .fig div{padding-bottom:clamp(4px,1vw,12px);}
  .fig em{display:block;font-style:normal;font-family:var(--ui);font-weight:700;
    font-size:clamp(12px,1.2vw,14px);letter-spacing:.18em;text-transform:uppercase;
    color:var(--bright);margin-bottom:8px;}
  .fig span{font-size:clamp(14px,1.5vw,17px);line-height:1.5;}

  /* ---- benefit pills: the poster's own language, kept ---- */
  .pills{display:flex;flex-direction:column;gap:clamp(11px,1.5vw,17px);}
  .pill{align-self:center;padding:clamp(12px,1.5vw,18px) clamp(24px,3.4vw,46px);
    border:1px solid var(--hair);border-radius:999px;
    font-size:clamp(15px,1.9vw,23px);letter-spacing:-.01em;color:var(--bright);}
  @media (min-width:760px){
    .pill:nth-child(1){align-self:center;transform:translateX(7%);}
    .pill:nth-child(2){align-self:flex-start;margin-left:5%;}
    .pill:nth-child(3){align-self:flex-start;margin-left:2%;}
    .pill:nth-child(4){align-self:center;transform:translateX(-5%);}
  }
  .pills .more{align-self:flex-end;padding-right:3%;color:var(--yellow);
    font-size:clamp(15px,1.9vw,23px);}

  /* ---- gallery ---- */
  .rail-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;
    flex-wrap:wrap;}
  .rail-btns{display:flex;gap:18px;}
  .rbtn{background:none;border:0;padding:0 0 3px;cursor:pointer;color:rgba(255,255,255,.5);
    border-bottom:1px solid transparent;transition:color .2s ease,border-color .2s ease;}
  .rbtn:hover{color:var(--yellow);border-bottom-color:var(--yellow);}
  .rbtn svg{width:26px;height:14px;display:block;}
  .rail{overflow:hidden;cursor:grab;touch-action:pan-y;margin-top:clamp(26px,3.4vw,44px);}
  .rail.is-dragging{cursor:grabbing;}
  .rail-track{display:flex;width:max-content;will-change:transform;}
  .rail-set{display:flex;}
  .plate{flex:0 0 auto;height:clamp(210px,29vw,420px);margin-inline-end:clamp(10px,1.2vw,16px);
    overflow:hidden;display:grid;place-items:center;
    background:linear-gradient(155deg,rgba(255,255,255,.075),rgba(255,255,255,.02));}
  .plate.sm{width:clamp(210px,32vw,330px);}
  .plate.lg{width:clamp(280px,56vw,560px);}
  .plate img{width:100%;height:100%;object-fit:cover;}
  .plate span{font-family:var(--ui);font-size:11px;letter-spacing:.22em;text-transform:uppercase;
    color:rgba(255,255,255,.2);}

  /* ---- getting there ---- */
  .place-big{margin:0;font-weight:700;font-size:clamp(30px,5.4vw,68px);line-height:1;
    letter-spacing:-.05em;color:var(--mint);}
  .addr{margin:clamp(16px,2vw,24px) 0 0;font-size:clamp(15px,1.7vw,19px);line-height:1.55;}
  .mrt{display:flex;flex-wrap:wrap;gap:0 clamp(14px,2vw,26px);margin:clamp(18px,2.4vw,30px) 0 0;
    padding:0;list-style:none;font-size:clamp(14px,1.5vw,17px);color:var(--bright);}
  .mrt li{display:flex;align-items:center;gap:9px;}
  .mrt li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--mint);}

  /* ---- sponsors: full-bleed printed band ---- */
  .band{margin-top:clamp(26px,3.4vw,44px);padding-block:clamp(30px,4vw,52px);
    background:var(--cream);overflow:hidden;}
  .glabel{margin:0 0 clamp(14px,1.8vw,22px);font-family:var(--ui);font-weight:700;
    font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--maroon);}
  .marquee{overflow:hidden;cursor:grab;touch-action:pan-y;}
  .marquee.is-dragging{cursor:grabbing;}
  .marquee-track{display:flex;width:max-content;will-change:transform;}
  .marquee-set{display:flex;}
  .marquee + .wrap{margin-top:clamp(26px,3.4vw,42px);}
  .logo{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:8px;margin-inline-end:clamp(38px,4.8vw,78px);}
  .logo img{display:block;height:56px;width:auto;max-width:300px;object-fit:contain;}
  .logo .nm{display:grid;place-items:center;height:56px;max-width:230px;text-align:center;
    font-family:var(--ui);font-weight:500;font-size:14px;color:#141414;}
  .logo.gold img{max-width:380px;}
  .logo.gold{margin-inline:clamp(38px,4.8vw,78px) clamp(76px,9vw,152px);}
  .tier{order:-1;font-family:var(--ui);font-weight:700;font-size:10px;letter-spacing:.2em;
    text-transform:uppercase;color:var(--maroon);}

  /* ---- faqs ---- */
  .faq{border-top:1px solid var(--hair);}
  .faq:last-of-type{border-bottom:1px solid var(--hair);}
  .faq-q{width:100%;display:flex;align-items:baseline;justify-content:space-between;gap:24px;
    padding:clamp(20px,2.6vw,30px) 0;background:none;border:0;color:var(--bright);
    text-align:left;cursor:pointer;font-family:var(--display);
    font-size:clamp(17px,2.1vw,25px);letter-spacing:-.025em;}
  .faq-q .chev{width:22px;height:11px;flex:0 0 auto;color:var(--yellow);
    transition:transform .3s ease;}
  .faq[data-open="true"] .chev{transform:rotate(180deg);}
  .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .32s ease;}
  .faq[data-open="true"] .faq-a{grid-template-rows:1fr;}
  .faq-a>div{overflow:hidden;}
  .faq-a p{margin:0 0 clamp(22px,3vw,32px);max-width:58ch;
    font-size:clamp(15px,1.6vw,18px);line-height:1.62;}

  /* ---- footer ---- */
  .foot{border-top:1px solid var(--hair);padding:clamp(40px,6vw,80px) 0 clamp(26px,3vw,44px);}
  .presented{display:flex;flex-wrap:wrap;gap:clamp(26px,5vw,80px);align-items:center;
    padding-bottom:clamp(30px,4vw,50px);border-bottom:1px solid var(--hair);}
  .presented div{display:flex;align-items:center;gap:16px;}
  .presented small{font-family:var(--ui);font-size:11px;letter-spacing:.2em;
    text-transform:uppercase;color:rgba(255,255,255,.36);}
  .presented img{height:46px;width:auto;object-fit:contain;}
  .presented img.sgn{height:54px;}
  .foot-cols{display:grid;gap:clamp(26px,4vw,54px);margin-top:clamp(30px,4vw,50px);
    grid-template-columns:repeat(auto-fit,minmax(190px,1fr));}
  .foot h3{margin:0 0 16px;font-family:var(--ui);font-weight:700;font-size:11px;
    letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.34);}
  .foot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;}
  .foot a{font-family:var(--ui);font-size:15px;color:rgba(255,255,255,.78);text-decoration:none;
    transition:color .2s ease;}
  .foot a:hover{color:var(--yellow);}
  .copy{margin:clamp(34px,4.6vw,56px) 0 0;font-family:var(--ui);font-size:11px;
    letter-spacing:.05em;color:rgba(255,255,255,.28);}

  /* ---- reveal: fails OPEN (see _reveal) ---- */
  .rise{opacity:1;}
  :host(.reveal-on) .rise{opacity:0;}
  :host(.reveal-on) .rise.is-in{animation:rise .6s cubic-bezier(.2,.7,.3,1) forwards;}
  @keyframes rise{
    from{opacity:0;transform:translateY(20px);}
    to{opacity:1;transform:none;}
  }

  /* ---- responsive ---- */
  @media (max-width:860px){
    .when{grid-template-columns:minmax(0,1fr);align-items:start;}
    .when .place{text-align:left;}
  }
  @media (max-width:760px){
    .nav{align-items:center;flex-wrap:wrap;gap:12px;}
    .nav-toggle{display:block;order:3;}
    .brand{order:1;}
    .nav-cta{order:2;margin-left:auto;}
    .nav-list{order:4;flex-basis:100%;flex-direction:column;align-items:flex-start;gap:14px;
      max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;}
    .nav[data-open="true"] .nav-list{max-height:300px;padding:16px 0 4px;}
    .pill,.pills .more{align-self:stretch;text-align:center;margin-left:0;transform:none;}
    .fig{grid-template-columns:minmax(0,1fr);}
    .dock p{display:none;}
    .dock{justify-content:center;}
  }
  @media (prefers-reduced-motion:reduce){
    *,*::before,*::after{animation-duration:.001ms !important;transition-duration:.001ms !important;}
    .rise{opacity:1 !important;}
  }
  `;

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
      // Two copies only cover the wrap if one copy is as wide as the viewport.
      const need = Math.max(2, Math.ceil(viewport.clientWidth / half) + 1);
      while (track.children.length < need) {
        const clone = track.firstElementChild.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
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
    viewport.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

    viewport.addEventListener('pointerenter', () => { hovering = true; });
    viewport.addEventListener('pointerleave', () => { hovering = false; });
    viewport.addEventListener('focusin', () => { focused = true; });
    viewport.addEventListener('focusout', () => { focused = false; });

    const ro = new ResizeObserver(measure);
    ro.observe(track); ro.observe(viewport);
    measure(); paint();
    raf = requestAnimationFrame(frame);

    return {
      step(dir, dist) { glide = { from: offset, to: offset + dir * (dist || viewport.clientWidth * 0.8), t: 0 }; vel = 0; },
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
      '<div class="marquee" data-dir="' + dir + '">' +
        '<div class="marquee-track">' +
          '<div class="marquee-set">' + set + '</div>' +
          '<div class="marquee-set" aria-hidden="true">' + set + '</div>' +
        '</div></div>';
  }

  function template() {
    const nav = [
      ['About', '#about'],
      ['Why go', '#why'],
      ['Getting there', '#getting-there'],
      ['Sponsors', '#sponsors'],
      ['FAQs', '#faqs'],
    ].map(([l, h]) => '<li><a href="' + h + '">' + l + '</a></li>').join('');

    const pills = BENEFITS.map((b) => '<div class="pill rise">' + esc(b) + '</div>').join('') +
      '<div class="more rise">…and more!</div>';

    // Kinetic strip. One set, cloned by loopTrack until it covers the viewport.
    const tickerSet = [
      EVENT.tagline, EVENT.dateLabel, EVENT.timeLabel, 'Suntec Singapore',
      'Free admission', '400+ attendees',
    ].map((t) => '<span>' + esc(t) + '</span>').join('');

    const figs = STATS.map((s) =>
      '<div class="fig rise"><b>' + esc(s.figure) + '</b>' +
      '<div><em>' + esc(s.label) + '</em><span>' + esc(s.copy) + '</span></div></div>').join('');

    const plates = [['sm', 1], ['sm', 2], ['lg', 3], ['lg', 4]]
      .map(([size, n]) => '<div class="plate ' + size + '" role="group" ' +
        'aria-label="Photo ' + n + ' of 4"><span>photo ' + n + '</span></div>').join('');

    const sponsors = SPONSORS.map((g, i) => marqueeRow(g, i % 2 ? -1 : 1)).join('');

    const faqs = FAQS.map((f, i) =>
      '<div class="faq" data-open="false">' +
        '<h3 style="margin:0"><button class="faq-q" type="button" aria-expanded="false" ' +
        'aria-controls="a' + i + '"><span>' + esc(f.q) + '</span>' + CHEV + '</button></h3>' +
        '<div class="faq-a" id="a' + i + '" role="region"><div><p>' + esc(f.a) + '</p></div></div>' +
      '</div>').join('');

    const eyebrow = (n, label) => '<p class="eyebrow"><b>' + n + '</b> ' + esc(label) + '</p>';

    return '' +
    '<a class="skip" href="#main">Skip to content</a>' +
    '<div class="progress" aria-hidden="true"><i></i></div>' +

    '<div class="sky" aria-hidden="true">' +
      '<canvas class="stars"></canvas>' +
      '<div class="bloom a"></div><div class="bloom b"></div><div class="bloom c"></div>' +
      '<div class="glow"></div><div class="shoot"></div>' +
    '</div>' +
    '<div class="grain" aria-hidden="true"></div>' +

    '<div class="page">' +
      '<nav class="nav" data-open="false" aria-label="Primary">' +
        '<a class="brand" href="#top"><img src="' + esc(CONFIG.crestImage) + '" alt="">The UKSSC</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-label="Menu">' +
          '<svg viewBox="0 0 22 16"><path d="M1 2h20M1 8h20M1 14h20" stroke="currentColor" ' +
          'stroke-width="2" stroke-linecap="round" fill="none"/></svg></button>' +
        '<ul class="nav-list">' + nav + '</ul>' +
        '<a class="nav-cta" href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">Free tickets</a>' +
      '</nav>' +

      '<main id="main">' +
        '<header class="hero wrap" id="top">' +
          '<div class="mark">' +
            '<img src="' + esc(CONFIG.heroImage) + '" alt="Blastoff! 2026" width="1368" height="300">' +
            SPARKLE.replace('class="spark"', 'class="spark one"') +
            SPARKLE.replace('class="spark"', 'class="spark two"') +
          '</div>' +
          '<p class="tagline">' + esc(EVENT.tagline) + '</p>' +
          '<div class="count" id="count" aria-label="Time until Blastoff! 2026"></div>' +
        '</header>' +

        '<div class="ticker marquee" data-dir="1" data-speed="26" aria-hidden="true">' +
          '<div class="marquee-track"><div class="marquee-set">' + tickerSet + '</div></div>' +
        '</div>' +

        '<div class="wrap">' +
          '<div class="when">' +
            '<p class="big">14 Aug<em>2026</em></p>' +
            '<p class="place"><b>Suntec Singapore</b>' +
              'Convention &amp; Exhibition Centre<br>' + esc(EVENT.venueDetail) + '<br>' +
              esc(EVENT.timeLabel) + ' · free admission</p>' +
          '</div>' +

          '<div class="actions">' +
            '<a class="lnk key" href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">' +
              'Book free tickets ↗</a>' +
            '<button class="lnk" id="ics" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<rect x="3" y="5" width="18" height="16"/><path d="M8 3v4M16 3v4M3 11h18"/>' +
              '</svg>Add to calendar</button>' +
            '<button class="lnk" id="share" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<path d="M15 8a3 3 0 1 0-2.8-4M15 16a3 3 0 1 1-2.8 4M6 15a3 3 0 1 0 0-6"/>' +
              '<path d="M8.6 13.5l5.8 3M14.4 7.5l-5.8 3"/></svg>Share</button>' +
          '</div>' +
          '<p class="free">Suntec has a capacity. Register before you fly.</p>' +

          '<section class="sec" id="about">' +
            eyebrow('01', 'About') +
            '<div class="split">' +
              '<div>' +
                '<h2>A room full of<br><em>people who hire</em></h2>' +
                '<p class="lede rise"><b>Blastoff! is the UKSSC’s flagship careers fair</b> — built ' +
                  'for Singaporean students studying overseas.</p>' +
              '</div>' +
              '<div class="aside rise">' +
                '<p>Launched in 2021 as the &ldquo;Through the Generations&rdquo; career fair, it now ' +
                  'brings together hundreds of attendees and over 30 corporate partners in Singapore.</p>' +
                '<p>One afternoon to navigate the local job market, line up an internship, and meet ' +
                  'the people who will still be answering your emails in five years.</p>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section class="sec" id="why">' +
            eyebrow('02', 'Why go') +
            '<div class="figs">' + figs + '</div>' +
            '<div class="pills" style="margin-top:clamp(48px,7vw,96px)">' + pills + '</div>' +
          '</section>' +
        '</div>' +

        '<section class="sec" aria-label="Photos from previous editions">' +
          '<div class="wrap rail-head">' +
            '<div>' + eyebrow('03', 'Gallery') + '<h2>Previous<br>editions</h2></div>' +
            '<div class="rail-btns">' +
              '<button class="rbtn" type="button" data-dir="-1" aria-label="Previous photos">' +
                '<svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.6" ' +
                'stroke-linecap="round"><path d="M29 7H1M7 1L1 7l6 6"/></svg></button>' +
              '<button class="rbtn" type="button" data-dir="1" aria-label="Next photos">' +
                '<svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.6" ' +
                'stroke-linecap="round"><path d="M1 7h28M23 1l6 6-6 6"/></svg></button>' +
            '</div></div>' +
          '<div class="rail"><div class="rail-track">' +
            '<div class="rail-set">' + plates + '</div>' +
            '<div class="rail-set" aria-hidden="true">' + plates + '</div>' +
          '</div></div>' +
        '</section>' +

        '<div class="wrap">' +
          '<section class="sec" id="getting-there">' +
            eyebrow('04', 'Getting there') +
            '<div class="split">' +
              '<div>' +
                '<p class="place-big">Suntec Singapore</p>' +
                '<p class="addr">Convention &amp; Exhibition Centre<br>' +
                  esc(EVENT.venueDetail) + '<br>1 Raffles Boulevard</p>' +
              '</div>' +
              '<div class="aside rise">' +
                '<p>A short covered walk from three MRT stations:</p>' +
                '<ul class="mrt">' + TRAVEL.lines.map((l) => '<li>' + esc(l) + '</li>').join('') + '</ul>' +
                '<p style="margin-top:22px"><a class="lnk" href="' + esc(TRAVEL.mapUrl) + '" ' +
                  'target="_blank" rel="noopener">Open in Maps ↗</a></p>' +
              '</div>' +
            '</div>' +
          '</section>' +
        '</div>' +

        '<section class="sec" id="sponsors">' +
          '<div class="wrap">' + eyebrow('05', 'Partners') +
            '<h2>Who you will<br><em>be meeting</em></h2></div>' +
          '<div class="band">' + sponsors + '</div>' +
        '</section>' +

        '<div class="wrap">' +
          '<section class="sec" id="faqs">' +
            eyebrow('06', 'Questions') +
            '<h2 style="margin-bottom:clamp(28px,4vw,52px)">FAQs</h2>' + faqs +
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
            '<li><a href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">Book tickets</a></li>' +
            '<li><a href="#faqs">FAQs</a></li>' +
            '<li><a href="' + esc(TRAVEL.mapUrl) + '" target="_blank" rel="noopener">Getting there</a></li>' +
          '</ul></div>' +
          '<div><h3>Resources</h3><ul>' +
            '<li><a href="#">Constitution</a></li><li><a href="#contact">Contact us</a></li>' +
          '</ul></div>' +
          '<div><h3>Connect</h3><ul>' +
            '<li><a href="https://instagram.com/theukssc" target="_blank" rel="noopener">Instagram</a></li>' +
            '<li><a href="#">Telegram</a></li><li><a href="#">LinkedIn</a></li>' +
            '<li><a href="mailto:hello@ukssc.org">Email</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<p class="copy">© 2026 United Kingdom-Singapore Students’ Council · Draft 1, not the live page</p>' +
      '</footer>' +
    '</div>' +

    '<div class="dock" id="dock">' +
      '<p><b>' + esc(EVENT.dateLabel) + '</b> · ' + esc(EVENT.timeLabel) + ' · Suntec · free</p>' +
      '<a class="lnk key" href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">Book tickets ↗</a>' +
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

      this._starfield(root);
      this._grain(root);
      this._glow(root);
      this._shootingStars(root);
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
      if (this._shootStop) this._shootStop();
      if (this._progStop) this._progStop();
      if (this._revealGuard) clearTimeout(this._revealGuard);
    }

    /* Idea 8: the poster's star ground, drawn rather than shipped as an image.
     *
     * A canvas costs ~1KB of code against a ~400KB starfield JPEG, scales to
     * any viewport, and stays crisp on retina. Stars are drawn once into an
     * offscreen buffer and only redrawn on resize — the parallax is a cheap
     * transform on scroll, so there is no per-frame painting.
     */
    _starfield(root) {
      const canvas = root.querySelector('.stars');
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      const host = this;

      let stars = [];
      const draw = () => {
        const dpr = Math.min(2, devicePixelRatio || 1);
        const w = host.clientWidth;
        const h = Math.min(host.scrollHeight, 4000);
        if (!w || !h) return;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        // Deterministic scatter: same layout every load, no Math.random flicker
        // between renders. Golden-ratio stepping avoids visible rows.
        const count = Math.round((w * h) / 5200);
        stars = [];
        for (let i = 0; i < count; i++) {
          const x = ((i * 0.6180339887498949) % 1) * w;
          const y = ((i * 0.4142135623730951) % 1) * h;
          const r = 0.35 + ((i * 7919) % 100) / 100 * 1.05;
          const a = 0.16 + ((i * 6151) % 100) / 100 * 0.62;
          stars.push([x, y, r, a]);
        }
        for (const [x, y, r, a] of stars) {
          ctx.beginPath();
          ctx.globalAlpha = a;
          ctx.fillStyle = a > 0.62 ? '#DFFF3E' : '#FFFFFF';
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };

      draw();
      const ro = new ResizeObserver(draw);
      ro.observe(this);

      let raf = 0;
      const parallax = () => {
        raf = 0;
        const y = window.scrollY || 0;
        canvas.style.transform = 'translate3d(0,' + (y * -0.06).toFixed(1) + 'px,0)';
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(parallax); };
      if (!reduced()) window.addEventListener('scroll', onScroll, { passive: true });

      this._stars = () => {
        ro.disconnect();
        window.removeEventListener('scroll', onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    /* Grain generated once into a tiny tiling data URI. A 180px PNG tile is a
     * few KB and repeats, versus shipping a full-viewport noise image. */
    _grain(root) {
      const el = root.querySelector('.grain');
      if (!el) return;
      const n = 180;
      const c = document.createElement('canvas');
      c.width = c.height = n;
      const ctx = c.getContext('2d');
      const img = ctx.createImageData(n, n);
      // Deterministic value noise: no Math.random, so the tile is identical
      // every load and cannot shimmer between renders.
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
      const move = () => {
        raf = 0;
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
      };
      this.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const box = this.getBoundingClientRect();
        x = e.clientX - box.left;
        y = e.clientY - box.top;
        glow.classList.add('is-on');
        if (!raf) raf = requestAnimationFrame(move);
      });
      this.addEventListener('pointerleave', () => glow.classList.remove('is-on'));
    }

    /* One reused element, retargeted each run — cheaper than spawning nodes,
     * and it keeps at most one streak on screen so it stays a grace note. */
    _shootingStars(root) {
      const star = root.querySelector('.shoot');
      if (!star || reduced()) return;
      let timer = 0;

      const run = () => {
        const w = this.clientWidth;
        const startX = w * (0.15 + 0.6 * ((Date.now() % 997) / 997));
        const startY = 80 + ((Date.now() % 613) / 613) * 420 + (window.scrollY || 0);
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';
        star.style.transition = 'none';
        star.style.transform = 'rotate(28deg) translate3d(0,0,0)';
        star.style.opacity = '0';
        // Next frame, so the reset above is not animated.
        requestAnimationFrame(() => {
          star.style.transition = 'transform 1.1s cubic-bezier(.3,.7,.4,1), opacity 1.1s ease';
          star.style.transform = 'rotate(28deg) translate3d(360px,0,0)';
          star.style.opacity = '1';
          setTimeout(() => { star.style.opacity = '0'; }, 620);
        });
        timer = setTimeout(run, 7000 + (Date.now() % 5000));
      };

      timer = setTimeout(run, 2600);
      this._shootStop = () => clearTimeout(timer);
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
      toggle.addEventListener('click', () => {
        const open = nav.dataset.open !== 'true';
        nav.dataset.open = String(open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      root.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href').slice(1);
          const target = id && root.getElementById(id);
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
          nav.dataset.open = 'false';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Idea 9: mark the section currently on screen in the nav.
      const links = [...root.querySelectorAll('.nav-list a')];
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.removeAttribute('aria-current'));
          const active = links.find((l) => l.getAttribute('href') === '#' + en.target.id);
          if (active) active.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['about', 'why', 'getting-there', 'sponsors', 'faqs'].forEach((id) => {
        const el = root.getElementById(id);
        if (el) io.observe(el);
      });
    }

    // Equal ink area, same reasoning as the live page.
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
        const p = track.querySelector('.plate');
        if (!p) return rail.clientWidth * 0.8;
        const gap = parseFloat(getComputedStyle(p).marginInlineEnd) || 0;
        return p.getBoundingClientRect().width + gap;
      };
      root.querySelectorAll('.rbtn').forEach((b) => {
        b.addEventListener('click', () => loop.step(Number(b.dataset.dir), step()));
      });
    }

    _marquees(root) {
      root.querySelectorAll('.marquee').forEach((row) => {
        const track = row.querySelector('.marquee-track');
        if (!track) return;
        const speed = Number(row.dataset.speed) || 40;
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

    // Idea 2: countdown. Ticks once a second, stops itself when the event starts.
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
        list.innerHTML = units.map(([label, ms]) => {
          const v = Math.floor(left / ms);
          left -= v * ms;
          return '<span class="u"><b>' + String(v).padStart(2, '0') + '</b>' +
            '<i>' + label + '</i></span>';
        }).join('');
      };

      render();
      this._tick = setInterval(render, 1000);
    }

    // Idea 3: .ics download, so the date lands in their calendar in one click.
    _calendar(root) {
      const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      root.getElementById('ics').addEventListener('click', () => {
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

    // Idea 4: native share where it exists, clipboard everywhere else. Students
    // pass links around on WhatsApp and Telegram, so this is the real path.
    _share(root) {
      const btn = root.getElementById('share');
      const label = btn.lastChild;
      btn.addEventListener('click', async () => {
        const data = {
          title: EVENT.name,
          text: 'Blastoff! 2026 — ' + EVENT.dateLabel + ', ' + EVENT.timeLabel + ' at Suntec. Free admission.',
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
          window.open('https://wa.me/?text=' + encodeURIComponent(data.text + ' ' + data.url), '_blank', 'noopener');
        }
      });
    }

    // Idea 1: sticky booking dock, revealed once the hero CTA is off screen.
    _dock(root) {
      const dock = root.getElementById('dock');
      const anchor = root.querySelector('.actions');
      if (!anchor) return;
      const io = new IntersectionObserver(([en]) => {
        dock.classList.toggle('is-up', !en.isIntersecting && en.boundingClientRect.top < 0);
      }, { threshold: 0 });
      io.observe(anchor);
    }

    _reveal(root) {
      const items = [...root.querySelectorAll('.rise')];
      // Leave everything visible if we cannot animate it properly.
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

      // If the observer never delivers — throttled tab, blocked API — show
      // everything rather than sit on an invisible page.
      this._revealGuard = setTimeout(() => {
        if (!any) items.forEach((el) => el.classList.add('is-in'));
      }, 1800);
    }
  }

  customElements.define(TAG, BlastoffDraft);
})();
