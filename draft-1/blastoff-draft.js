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
    --void:#0A0B10;
    --deep:#12131B;
    --yellow:#DFFF3E;
    --mint:#ADF8F5;
    --cream:#FFF6E7;
    --maroon:#690504;
    --amber:#FFAD00;
    --bone:#F7F7F4;
    --line:rgba(255,255,255,.09);
    --line-soft:rgba(255,255,255,.05);
    --text:rgba(255,255,255,.78);

    --maxw:1280px;
    --pad:clamp(18px,3.5vw,44px);
    --r:28px;

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
  :where(a,button):focus-visible{outline:3px solid var(--yellow);outline-offset:3px;border-radius:6px;}

  /* ---- skip link (idea 10) ---- */
  .skip{
    position:absolute;left:-9999px;top:0;z-index:50;
    background:var(--yellow);color:#000;padding:12px 18px;border-radius:0 0 10px 0;
    font-family:var(--ui);font-weight:700;text-decoration:none;
  }
  .skip:focus{left:0;}

  /* ---- cosmos ---- */
  .sky{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;}
  .stars{position:absolute;inset:0;width:100%;height:100%;display:block;}
  /* Nebula bloom: three soft colour fields, matching the poster's flares. */
  .bloom{position:absolute;border-radius:50%;filter:blur(70px);opacity:.5;}
  .bloom.a{width:52vw;height:52vw;right:-12vw;top:2vh;
    background:radial-gradient(circle,rgba(120,255,214,.30),transparent 68%);}
  .bloom.b{width:44vw;height:44vw;left:-10vw;top:36vh;
    background:radial-gradient(circle,rgba(255,196,92,.20),transparent 70%);}
  .bloom.c{width:60vw;height:60vw;right:-16vw;top:70vh;
    background:radial-gradient(circle,rgba(120,180,255,.16),transparent 72%);}

  /* Faint rounded guides, as on the poster. */
  .guides{position:absolute;inset:0;pointer-events:none;z-index:0;}
  .guides i{position:absolute;border:1px solid var(--line-soft);border-radius:56px;}
  .guides i:nth-child(1){inset:2vh 6vw auto 3vw;height:52vh;}
  .guides i:nth-child(2){inset:44vh -8vw auto 22vw;height:46vh;}
  .guides i:nth-child(3){inset:92vh 12vw auto -6vw;height:40vh;}

  /* Film grain. A flat dark page reads as a dead #0A0B10 rectangle; a little
     noise gives the black some tooth and stops the gradients from banding. */
  .grain{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.05;
    mix-blend-mode:overlay;background-repeat:repeat;background-size:180px 180px;}

  /* Cursor-tracked bloom — pure decoration, desktop pointers only. */
  .glow{position:absolute;width:640px;height:640px;border-radius:50%;
    pointer-events:none;z-index:0;opacity:0;transition:opacity .5s ease;
    background:radial-gradient(circle,rgba(223,255,62,.10),transparent 62%);
    transform:translate(-50%,-50%);}
  .glow.is-on{opacity:1;}
  @media (hover:none){ .glow{display:none;} }

  /* Shooting star: one element reused, retargeted between runs. */
  .shoot{position:absolute;z-index:0;pointer-events:none;height:1px;width:180px;
    background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.9));
    opacity:0;border-radius:99px;}
  .shoot::after{content:"";position:absolute;right:0;top:-1px;width:3px;height:3px;
    border-radius:50%;background:#fff;box-shadow:0 0 8px 2px rgba(255,255,255,.7);}

  /* Reading progress, pinned above the nav. */
  .progress{position:fixed;left:0;top:0;height:2px;width:100%;z-index:45;
    background:transparent;pointer-events:none;}
  .progress i{display:block;height:100%;width:0;
    background:linear-gradient(90deg,var(--mint),var(--yellow));
    box-shadow:0 0 12px rgba(223,255,62,.5);}

  .page{position:relative;z-index:1;}

  /* ---- section eyebrows ---- */
  .eyebrow{display:flex;align-items:center;gap:12px;margin:0 0 14px;
    font-family:var(--ui);font-size:12px;letter-spacing:.18em;text-transform:uppercase;
    color:rgba(255,255,255,.4);}
  .eyebrow b{color:var(--yellow);font-weight:700;}
  .eyebrow::after{content:"";flex:1;height:1px;background:var(--line);}

  /* Headings pick up a faint vertical fade so they sit in the space rather
     than on top of it. */
  h2{background:linear-gradient(180deg,#EAFFFE,#7FD8D4);
    -webkit-background-clip:text;background-clip:text;color:transparent;}

  /* ---- stats ---- */
  .stats{display:grid;gap:clamp(14px,1.8vw,20px);
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));}
  .stat{position:relative;overflow:hidden;padding:clamp(24px,3vw,36px);
    border:1px solid var(--line);border-radius:var(--r);
    background:linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.012));}
  .stat b{display:block;font-size:clamp(46px,7vw,86px);line-height:.94;
    letter-spacing:-.05em;color:var(--yellow);font-variant-numeric:tabular-nums;}
  .stat em{display:block;margin:10px 0 12px;font-style:normal;font-family:var(--ui);
    font-weight:700;font-size:13px;letter-spacing:.13em;text-transform:uppercase;
    color:rgba(255,255,255,.62);}
  .stat span{font-size:clamp(14px,1.5vw,16px);line-height:1.5;}

  /* ---- getting there ---- */
  .travel{display:grid;gap:clamp(18px,2.4vw,30px);align-items:center;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    padding:clamp(24px,3vw,38px);border:1px solid var(--line);border-radius:var(--r);
    background:linear-gradient(150deg,rgba(173,248,245,.06),rgba(255,255,255,.012));}
  .travel h3{margin:0 0 8px;font-size:clamp(19px,2.2vw,25px);letter-spacing:-.03em;color:var(--mint);}
  .travel p{margin:0;font-size:clamp(14px,1.5vw,16px);line-height:1.6;}
  .mrt{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0;list-style:none;padding:0;}
  .mrt li{padding:7px 14px;border-radius:999px;border:1px solid var(--line);
    background:rgba(255,255,255,.04);font-family:var(--ui);font-size:13px;
    color:rgba(255,255,255,.82);}
  .mrt li::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;
    background:var(--mint);margin-right:8px;vertical-align:middle;}

  /* ---- nav ---- */
  .nav{
    position:sticky;top:0;z-index:30;
    display:flex;align-items:center;justify-content:space-between;gap:16px;
    margin-top:0;padding:14px var(--pad);
    background:rgba(10,11,16,.72);
    backdrop-filter:blur(14px);
    border-bottom:1px solid var(--line);
    font-family:var(--ui);
  }
  .brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:800;
    font-size:clamp(16px,1.6vw,19px);letter-spacing:-.02em;color:var(--yellow);}
  .brand img{width:26px;height:26px;object-fit:contain;}
  .nav-list{display:flex;align-items:center;gap:clamp(14px,2.2vw,32px);list-style:none;margin:0;padding:0;}
  .nav-list a{text-decoration:none;font-size:clamp(14px,1.4vw,16px);letter-spacing:-.01em;
    color:rgba(255,255,255,.72);transition:color .18s ease;}
  .nav-list a:hover,.nav-list a[aria-current="true"]{color:var(--yellow);}
  .nav-cta{
    padding:9px 18px;border-radius:999px;background:var(--yellow);color:#0A0B10;
    font-family:var(--ui);font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;
    transition:transform .18s ease,box-shadow .18s ease;
  }
  .nav-cta:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(223,255,62,.25);}
  .nav-toggle{display:none;background:none;border:0;color:var(--yellow);padding:6px;cursor:pointer;}
  .nav-toggle svg{display:block;width:24px;height:18px;}

  /* ---- hero ---- */
  .hero{padding:clamp(48px,9vh,110px) 0 clamp(36px,6vh,72px);text-align:center;}
  .mark{position:relative;display:inline-block;max-width:min(880px,92%);}
  .mark img{display:block;width:100%;height:auto;
    filter:drop-shadow(0 0 46px rgba(223,255,62,.28));}
  .spark{position:absolute;width:clamp(20px,2.4vw,34px);height:auto;color:var(--yellow);}
  .spark.one{top:-4%;right:-5%;}
  .spark.two{bottom:2%;left:-6%;width:clamp(14px,1.7vw,24px);}
  .tagline{margin:clamp(14px,2vw,22px) 0 0;font-size:clamp(17px,1.9vw,23px);
    letter-spacing:-.01em;color:rgba(255,255,255,.86);}

  /* ---- countdown (idea 2) ---- */
  .count{display:flex;justify-content:center;gap:clamp(8px,1.4vw,16px);
    margin:clamp(28px,4vw,44px) 0 0;list-style:none;padding:0;}
  .count li{
    min-width:clamp(64px,8vw,96px);padding:12px 10px;
    border:1px solid var(--line);border-radius:16px;
    background:rgba(255,255,255,.03);
  }
  .count b{display:block;font-size:clamp(24px,3.4vw,40px);line-height:1;
    letter-spacing:-.04em;color:var(--yellow);font-variant-numeric:tabular-nums;}
  .count span{display:block;margin-top:6px;font-family:var(--ui);font-size:11px;
    letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);}
  .count.is-done{font-family:var(--ui);}

  /* ---- benefit pills (idea 6) ---- */
  .pills{margin:clamp(52px,8vw,96px) 0 0;display:flex;flex-direction:column;gap:clamp(12px,1.6vw,18px);}
  .pill{
    align-self:center;
    padding:clamp(13px,1.6vw,19px) clamp(24px,3.4vw,44px);
    border:1px solid var(--line);border-radius:999px;
    background:rgba(255,255,255,.025);
    font-size:clamp(15px,1.9vw,22px);letter-spacing:-.01em;
    color:rgba(255,255,255,.9);
    backdrop-filter:blur(3px);
  }
  /* Staggered like the poster, but only where there is room to stagger. */
  @media (min-width:760px){
    .pill:nth-child(1){align-self:center;transform:translateX(6%);}
    .pill:nth-child(2){align-self:flex-start;margin-left:6%;}
    .pill:nth-child(3){align-self:flex-start;margin-left:4%;}
    .pill:nth-child(4){align-self:center;transform:translateX(-4%);}
  }
  .pills .more{align-self:flex-end;border:0;background:none;padding-right:2%;
    color:var(--yellow);font-size:clamp(15px,1.9vw,22px);}

  /* ---- key facts ---- */
  .facts{margin:clamp(56px,8vw,104px) 0 0;display:grid;gap:clamp(16px,2vw,24px);
    grid-template-columns:repeat(auto-fit,minmax(230px,1fr));}
  .fact{padding:clamp(20px,2.4vw,30px);border:1px solid var(--line);border-radius:var(--r);
    background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.012));}
  .fact dt{font-family:var(--ui);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
    color:rgba(255,255,255,.45);margin:0 0 10px;}
  .fact dd{margin:0;font-weight:700;font-size:clamp(19px,2.2vw,26px);line-height:1.2;
    letter-spacing:-.03em;color:var(--yellow);}
  .fact dd small{display:block;margin-top:4px;font-weight:400;font-size:clamp(13px,1.4vw,15px);
    letter-spacing:-.01em;color:rgba(255,255,255,.6);}

  /* ---- actions: tickets + calendar + share (ideas 3, 4, 9) ---- */
  .actions{margin:clamp(34px,5vw,52px) 0 0;display:flex;flex-wrap:wrap;gap:12px;align-items:center;}
  .btn{
    display:inline-flex;align-items:center;gap:9px;
    padding:15px 28px;border-radius:999px;border:1px solid transparent;
    font-family:var(--ui);font-weight:700;font-size:clamp(14px,1.5vw,16px);
    text-decoration:none;cursor:pointer;
    transition:transform .18s ease,box-shadow .18s ease,background .18s ease;
  }
  .btn svg{width:17px;height:17px;flex:0 0 auto;}
  .btn-primary{background:var(--yellow);color:#0A0B10;}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(223,255,62,.28);}
  .btn-ghost{background:rgba(255,255,255,.04);border-color:var(--line);color:rgba(255,255,255,.88);}
  .btn-ghost:hover{background:rgba(255,255,255,.09);}
  .free{margin:14px 0 0;font-family:var(--ui);font-size:13px;color:rgba(255,255,255,.5);}

  /* ---- sticky CTA (idea 3) ---- */
  .dock{
    position:fixed;left:50%;bottom:18px;transform:translate(-50%,150%);
    z-index:40;display:flex;align-items:center;gap:14px;
    padding:11px 12px 11px 20px;border-radius:999px;
    background:rgba(18,19,27,.9);border:1px solid var(--line);
    backdrop-filter:blur(14px);box-shadow:0 18px 50px rgba(0,0,0,.5);
    transition:transform .34s cubic-bezier(.2,.8,.2,1);
    font-family:var(--ui);
  }
  .dock.is-up{transform:translate(-50%,0);}
  .dock p{margin:0;font-size:13px;color:rgba(255,255,255,.72);white-space:nowrap;}
  .dock p b{color:var(--yellow);}
  .dock .btn{padding:10px 20px;font-size:13px;}
  @media (max-width:560px){ .dock p{display:none;} .dock{padding:10px;} }

  /* ---- sections ---- */
  section{scroll-margin-top:84px;}
  .sec{margin-top:clamp(72px,12vw,150px);}
  h2{margin:0 0 clamp(18px,2.4vw,30px);font-weight:700;
    font-size:clamp(30px,4.6vw,58px);line-height:1.1;letter-spacing:-.04em;color:var(--mint);}
  .lede{margin:0;max-width:62ch;font-size:clamp(15px,1.7vw,19px);line-height:1.6;}

  /* ---- rail ---- */
  .rail-head{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;}
  .rail-btns{display:flex;gap:9px;}
  .rbtn{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;
    border:1px solid var(--line);background:rgba(255,255,255,.04);color:#fff;cursor:pointer;
    transition:background .18s ease;}
  .rbtn:hover{background:rgba(255,255,255,.12);}
  .rbtn svg{width:18px;height:18px;}
  .rail{overflow:hidden;cursor:grab;touch-action:pan-y;margin-top:22px;}
  .rail.is-dragging{cursor:grabbing;}
  .rail-track{display:flex;width:max-content;will-change:transform;}
  .rail-set{display:flex;}
  .plate{flex:0 0 auto;height:clamp(200px,27vw,390px);margin-inline-end:clamp(12px,1.4vw,18px);
    border:1px solid var(--line);border-radius:var(--r);overflow:hidden;
    background:linear-gradient(150deg,rgba(255,255,255,.07),rgba(255,255,255,.02));
    display:grid;place-items:center;}
  .plate.sm{width:clamp(220px,34vw,320px);}
  .plate.lg{width:clamp(280px,54vw,540px);}
  .plate img{width:100%;height:100%;object-fit:cover;}
  .plate span{font-family:var(--ui);font-size:12px;letter-spacing:.14em;text-transform:uppercase;
    color:rgba(255,255,255,.25);}

  /* ---- sponsors ---- */
  .band{margin-top:clamp(28px,4vw,44px);padding-block:clamp(30px,4vw,48px);
    background:var(--cream);overflow:hidden;border-radius:var(--r);}
  .glabel{margin:0 0 clamp(14px,1.8vw,20px);font-family:var(--ui);font-weight:700;
    font-size:clamp(13px,1.2vw,15px);letter-spacing:.15em;text-transform:uppercase;color:var(--maroon);}
  .marquee{overflow:hidden;cursor:grab;touch-action:pan-y;}
  .marquee.is-dragging{cursor:grabbing;}
  .marquee-track{display:flex;width:max-content;will-change:transform;}
  .marquee-set{display:flex;}
  .marquee + .wrap{margin-top:clamp(24px,3.2vw,38px);}
  .logo{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:8px;margin-inline-end:clamp(38px,4.6vw,74px);}
  .logo img{display:block;height:56px;width:auto;max-width:300px;object-fit:contain;}
  .logo .nm{display:grid;place-items:center;height:56px;max-width:230px;text-align:center;
    font-family:var(--ui);font-weight:500;font-size:clamp(13px,1.1vw,15px);color:#141414;}
  .logo.gold img{max-width:380px;}
  .logo.gold{margin-inline:clamp(38px,4.6vw,74px) clamp(76px,9vw,148px);}
  .tier{order:-1;padding:3px 10px;border-radius:999px;background:var(--maroon);color:var(--amber);
    font-family:var(--ui);font-weight:700;font-size:10px;letter-spacing:.1em;text-transform:uppercase;}

  /* ---- faqs ---- */
  .faq{border-top:1px solid var(--line);}
  .faq:last-of-type{border-bottom:1px solid var(--line);}
  .faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:22px;
    padding:22px 0;background:none;border:0;color:#fff;text-align:left;cursor:pointer;
    font-family:var(--display);font-size:clamp(15px,1.7vw,19px);letter-spacing:-.01em;}
  .faq-q .chev{width:26px;height:13px;flex:0 0 auto;color:var(--mint);transition:transform .28s ease;}
  .faq[data-open="true"] .chev{transform:rotate(180deg);}
  .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease;}
  .faq[data-open="true"] .faq-a{grid-template-rows:1fr;}
  .faq-a>div{overflow:hidden;}
  .faq-a p{margin:0 0 24px;max-width:64ch;font-size:clamp(14px,1.5vw,17px);line-height:1.65;}

  /* ---- footer ---- */
  .foot{margin-top:clamp(72px,11vw,140px);border-top:1px solid var(--line);
    padding:clamp(34px,5vw,60px) 0 clamp(24px,3vw,40px);}
  .presented{display:flex;flex-wrap:wrap;gap:clamp(22px,4vw,64px);align-items:center;
    padding-bottom:clamp(28px,4vw,44px);border-bottom:1px solid var(--line);}
  .presented div{display:flex;align-items:center;gap:14px;}
  .presented small{font-family:var(--ui);font-size:12px;letter-spacing:.04em;color:rgba(255,255,255,.5);}
  .presented img{height:44px;width:auto;object-fit:contain;}
  .presented img.sgn{height:52px;}
  .foot-cols{display:grid;gap:clamp(24px,4vw,48px);margin-top:clamp(28px,4vw,44px);
    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));}
  .foot h3{margin:0 0 12px;font-family:var(--ui);font-weight:700;font-size:13px;
    letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.45);}
  .foot a{font-family:var(--ui);font-size:15px;color:rgba(255,255,255,.8);text-decoration:none;}
  .foot a:hover{color:var(--yellow);}
  .foot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px;}
  .copy{margin:clamp(30px,4vw,48px) 0 0;font-family:var(--ui);font-size:12px;color:rgba(255,255,255,.35);}
  .stripes{display:grid;grid-template-columns:repeat(4,1fr);height:6px;border-radius:99px;
    overflow:hidden;margin-top:clamp(26px,3.4vw,40px);}
  .stripes i:nth-child(1){background:var(--amber);}
  .stripes i:nth-child(2){background:var(--mint);}
  .stripes i:nth-child(3){background:var(--bone);}
  .stripes i:nth-child(4){background:var(--maroon);}

  /* ---- reveal on scroll (idea 7) ----
     Fails OPEN. Content is visible by default and only hidden once JS has
     confirmed it can drive the reveal, so a blocked IntersectionObserver, a
     script error or a browser that never paints leaves the page readable
     instead of blank. Never hide content with CSS that only JS can undo. */
  .rise{opacity:1;}
  :host(.reveal-on) .rise{opacity:0;}
  :host(.reveal-on) .rise.is-in{animation:rise .55s cubic-bezier(.2,.7,.3,1) forwards;}
  @keyframes rise{
    from{opacity:0;transform:translateY(18px);}
    to{opacity:1;transform:none;}
  }

  /* ---- responsive ---- */
  @media (max-width:760px){
    .nav-toggle{display:block;order:3;}
    /* Keep brand, CTA and burger on one row; the links drop below when opened.
       Without the explicit order the CTA wraps onto a second row of its own. */
    .nav{flex-wrap:wrap;gap:10px;}
    .brand{order:1;}
    .nav-cta{order:2;margin-left:auto;padding:8px 15px;font-size:13px;}
    .nav-list{order:4;flex-basis:100%;flex-direction:column;align-items:flex-start;gap:12px;
      max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;}
    .nav[data-open="true"] .nav-list{max-height:280px;padding:14px 0 4px;}
    .pill,.pills .more{align-self:stretch;text-align:center;margin-left:0;transform:none;}
  }
  @media (prefers-reduced-motion:reduce){
    *,*::before,*::after{animation-duration:.001ms !important;transition-duration:.001ms !important;}
    .rise{opacity:1;transform:none;}
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

    const stats = STATS.map((s) =>
      '<div class="stat rise"><b>' + esc(s.figure) + '</b><em>' + esc(s.label) + '</em>' +
      '<span>' + esc(s.copy) + '</span></div>').join('');

    const eyebrow = (n, label) =>
      '<p class="eyebrow"><b>' + n + '</b> ' + esc(label) + '</p>';

    return '' +
    '<a class="skip" href="#main">Skip to content</a>' +
    '<div class="progress" aria-hidden="true"><i></i></div>' +

    '<div class="sky" aria-hidden="true">' +
      '<canvas class="stars"></canvas>' +
      '<div class="bloom a"></div><div class="bloom b"></div><div class="bloom c"></div>' +
      '<div class="glow"></div><div class="shoot"></div>' +
    '</div>' +
    '<div class="grain" aria-hidden="true"></div>' +
    '<div class="guides" aria-hidden="true"><i></i><i></i><i></i></div>' +

    '<div class="page">' +
      '<nav class="nav" data-open="false" aria-label="Primary">' +
        '<a class="brand" href="#top">' +
          '<img src="' + esc(CONFIG.crestImage) + '" alt="">The UKSSC</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-label="Menu">' +
          '<svg viewBox="0 0 24 18"><path d="M1 2h22M1 9h22M1 16h22" stroke="currentColor" ' +
          'stroke-width="2.4" stroke-linecap="round" fill="none"/></svg></button>' +
        '<ul class="nav-list">' + nav + '</ul>' +
        '<a class="nav-cta" href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">Book free tickets</a>' +
      '</nav>' +

      '<main id="main">' +
        '<header class="hero wrap" id="top">' +
          '<div class="mark">' +
            '<img src="' + esc(CONFIG.heroImage) + '" alt="Blastoff! 2026" width="1368" height="300">' +
            SPARKLE.replace('class="spark"', 'class="spark one"') +
            SPARKLE.replace('class="spark"', 'class="spark two"') +
          '</div>' +
          '<p class="tagline">' + esc(EVENT.tagline) + '</p>' +
          '<ul class="count" id="count" aria-label="Time until Blastoff! 2026"></ul>' +
        '</header>' +

        '<div class="wrap">' +
          '<div class="pills">' + pills + '</div>' +

          '<dl class="facts rise">' +
            '<div class="fact"><dt>When</dt><dd>' + esc(EVENT.dateLabel) +
              '<small>' + esc(EVENT.timeLabel) + ' (SGT)</small></dd></div>' +
            '<div class="fact"><dt>Where</dt><dd>Suntec Singapore' +
              '<small>' + esc(EVENT.venueDetail) + '</small></dd></div>' +
            '<div class="fact"><dt>Admission</dt><dd>Free' +
              '<small>Registration required</small></dd></div>' +
          '</dl>' +

          '<div class="actions rise">' +
            '<a class="btn btn-primary" href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">' +
              '<path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/>' +
              '</svg>Book free tickets</a>' +
            '<button class="btn btn-ghost" id="ics" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">' +
              '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>' +
              '</svg>Add to calendar</button>' +
            '<button class="btn btn-ghost" id="share" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">' +
              '<path d="M15 8a3 3 0 1 0-2.8-4M15 16a3 3 0 1 1-2.8 4M6 15a3 3 0 1 0 0-6"/>' +
              '<path d="M8.6 13.5l5.8 3M14.4 7.5l-5.8 3"/></svg>Share</button>' +
          '</div>' +
          '<p class="free">Admission is free — but Suntec has a capacity, so register ahead.</p>' +

          '<section class="sec" id="about">' +
            eyebrow('01', 'About') +
            '<h2>What is Blastoff!?</h2>' +
            '<p class="lede rise">' + esc(ABOUT) + '</p>' +
          '</section>' +

          '<section class="sec" id="why">' +
            eyebrow('02', 'Why go') +
            '<h2>The room you want to be in</h2>' +
            '<div class="stats">' + stats + '</div>' +
          '</section>' +

          '<section class="sec" id="getting-there">' +
            eyebrow('03', 'Getting there') +
            '<div class="travel rise">' +
              '<div>' +
                '<h3>Suntec Singapore</h3>' +
                '<p>Convention &amp; Exhibition Centre<br>' +
                  esc(EVENT.venueDetail) + '<br>1 Raffles Boulevard</p>' +
              '</div>' +
              '<div>' +
                '<p>A short covered walk from three MRT stations:</p>' +
                '<ul class="mrt">' +
                  TRAVEL.lines.map((l) => '<li>' + esc(l) + '</li>').join('') +
                '</ul>' +
                '<p style="margin-top:16px"><a href="' + esc(TRAVEL.mapUrl) + '" ' +
                  'target="_blank" rel="noopener" style="color:var(--yellow)">' +
                  'Open in Maps →</a></p>' +
              '</div>' +
            '</div>' +
          '</section>' +
        '</div>' +

        '<section class="sec" aria-label="Photos from previous editions">' +
          '<div class="wrap rail-head">' +
            '<div>' + eyebrow('04', 'Gallery') +
              '<h2 style="margin:0">Previous editions</h2></div>' +
            '<div class="rail-btns">' +
              '<button class="rbtn" type="button" data-dir="-1" aria-label="Previous photos">' +
                '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" ' +
                'stroke-linecap="round"><path d="M13 3 6 10l7 7"/></svg></button>' +
              '<button class="rbtn" type="button" data-dir="1" aria-label="Next photos">' +
                '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" ' +
                'stroke-linecap="round"><path d="M7 3l7 7-7 7"/></svg></button>' +
            '</div></div>' +
          '<div class="rail"><div class="rail-track">' +
            '<div class="rail-set">' + plates + '</div>' +
            '<div class="rail-set" aria-hidden="true">' + plates + '</div>' +
          '</div></div>' +
        '</section>' +

        '<section class="sec" id="sponsors">' +
          '<div class="wrap">' + eyebrow('05', 'Partners') +
            '<h2>Sponsors &amp; partners</h2></div>' +
          '<div class="wrap"><div class="band">' + sponsors + '</div></div>' +
        '</section>' +

        '<section class="sec wrap" id="faqs">' +
          eyebrow('06', 'Questions') + '<h2>FAQs</h2>' + faqs +
        '</section>' +
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
            '<li><a href="https://maps.google.com/?q=Suntec+Singapore+Convention+%26+Exhibition+Centre" ' +
              'target="_blank" rel="noopener">Getting there</a></li>' +
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
        '<div class="stripes" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
        '<p class="copy">© 2026 United Kingdom-Singapore Students’ Council. All rights reserved. ' +
          'Draft 1 — not the live page.</p>' +
      '</footer>' +
    '</div>' +

    '<div class="dock" id="dock">' +
      '<p><b>' + esc(EVENT.dateLabel) + '</b> · ' + esc(EVENT.timeLabel) + ' · free</p>' +
      '<a class="btn btn-primary" href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">Book tickets</a>' +
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
        this._loops.push(loopTrack(row, track, {
          autoplay: 40 * (Number(row.dataset.dir) || 1),
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
          list.className = 'count is-done';
          list.innerHTML = '<li style="min-width:auto;padding:12px 22px">' +
            '<b style="font-size:clamp(15px,2vw,20px)">Thanks for joining us</b>' +
            '<span>see you at the next one</span></li>';
          clearInterval(this._tick);
          return;
        }
        if (now >= start) {
          list.className = 'count is-done';
          list.innerHTML = '<li style="min-width:auto;padding:12px 22px">' +
            '<b style="font-size:clamp(15px,2vw,20px)">Happening now</b>' +
            '<span>Suntec, Level 3 Summit 1</span></li>';
          return;
        }
        let left = start - now;
        list.className = 'count';
        list.innerHTML = units.map(([label, ms]) => {
          const v = Math.floor(left / ms);
          left -= v * ms;
          return '<li><b>' + String(v).padStart(2, '0') + '</b><span>' + label + '</span></li>';
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
