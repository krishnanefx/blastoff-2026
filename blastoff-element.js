/* =============================================================================
 * <ukssc-blastoff-draft> — BlastOff! 2026
 * -----------------------------------------------------------------------------
 * Separate from the live blastoff-element.js so neither can affect the other.
 * Lives at /draft-1/ and reads its artwork from ../assets/.
 *
 * Sources of truth, all supplied by the UKSSC Communications Dept:
 *   • "Blastoff Brand Deck.pdf"            — palette, typefaces, logo rules
 *   • "BlastOff! Copywriting.docx"         — About / Why visit / Legacy copy
 *   • "Company Details.docx"               — partner tiers and partner profiles
 *   • "BlastOff! Website Update/Photos to Use" — event photography
 *
 * BRAND COMPLIANCE NOTES
 *   Palette is the deck's exact hexes (p6–p7) and every foreground/background
 *   pairing on this page is one the Colour Usage guide sanctions (p8): on Black
 *   only Electric Lime or Beige Linen; on Beige Linen only Black or Vivid Royal.
 *   That is why body copy is warm Beige Linen rather than plain white and why
 *   the cream band's accents are Vivid Royal rather than the old maroon.
 *
 *   Typefaces are League Spartan (primary, display) and Open Sauce (secondary,
 *   UI and body), per p10–p11. The deck's 15px minimum text size is enforced —
 *   no type on this page is set below it, which is why the small caps labels
 *   are larger than a typical web eyebrow.
 *
 *   The logo obeys p12–p14: 0.5h of clear space on every side (the .mark box
 *   pads to exactly that), no glow, no recolour, no rotation, no distortion,
 *   and it is never rendered below the 70px digital minimum. Partner marks are
 *   likewise never filtered or recoloured — several partners' own guidelines
 *   (MFA's especially) forbid any alteration, which is what the cream band is
 *   for: it lets dark artwork sit on a light ground untouched.
 * ========================================================================== */

(() => {
  'use strict';

  const TAG = 'ukssc-blastoff';
  if (customElements.get(TAG)) return;

  const SCRIPT_BASE = (document.currentScript && document.currentScript.src)
    ? new URL('.', document.currentScript.src).href
    : './';
  const asset = (u) => new URL(u, SCRIPT_BASE).href;

  /* ---------------------------------------------------------------- config */

  const CONFIG = {
    ticketsUrl: 'https://www.eventbrite.sg/e/blastoff-2026-to-new-horizons-tickets-1995329425023',
    heroImage: asset('./assets/blastoff-wordmark.png'),
    gohImage: asset('./assets/jeffrey-siow-goh.jpg'),
    crestImage: asset('./assets/ukssc-crest.png'),
    logoBase: asset('./assets/logos/'),
    photoBase: asset('./assets/photos/'),
    // The production domain. Only used where a URL has to be absolute and
    // cannot be derived from the page — the share sheet and the .ics file.
    // Everything else (artwork, og:image in the structured data) resolves from
    // the script's own location, so it follows the site wherever it is hosted.
    pageUrl: 'https://blastoff2026.com/',
    // The general enquiries inbox published on theukssc.co.uk/contact-us, in
    // preference to the VP role addresses printed in the brand deck.
    contactEmail: 'enquiries@theukssc.co.uk',
  };

  /* Every one of these is taken from theukssc.co.uk itself — the council's own
   * navigation and footer — rather than guessed. They replace the "#" stubs the
   * draft was carrying for Constitution, Telegram and LinkedIn.
   *
   * The council's site writes its own name without a hyphen ("United Kingdom
   * Singapore Student Council"); the copywriting doc hyphenates it. The page
   * follows the doc. Worth settling in one direction eventually. */
  const UKSSC = {
    site: 'https://www.theukssc.co.uk',
    about: 'https://www.theukssc.co.uk/about',
    committee: 'https://www.theukssc.co.uk/our-committee',
    constitution: 'https://www.theukssc.co.uk/our-constitution',
    societies: 'https://www.theukssc.co.uk/partner-societies',
    sponsors: 'https://www.theukssc.co.uk/sponsors',
    contact: 'https://www.theukssc.co.uk/contact-us',
    preDeparture: 'https://www.theukssc.co.uk/pdb',
    instagram: 'https://www.instagram.com/theukssc/',
    telegram: 'https://t.me/uksscchannel',
    linkedin: 'https://www.linkedin.com/company/united-kingdom-singapore-students-council/',
    facebook: 'https://www.facebook.com/TheUKSSC/',
  };

  const EVENT = {
    name: 'BlastOff! 2026',
    tagline: 'to new horizons!',
    // Copywriting doc, ABOUT: "the premier career fair connecting Singaporean
    // talent worldwide with top careers in Singapore".
    proposition: 'The career fair connecting Singaporean talent worldwide with top careers in Singapore',
    pitch: 'Explore global pathways, meet our 20+ partners, and take your ' +
           'career aspirations to new horizons.',
    dateLabel: 'Friday, 14 August 2026',
    dateShort: 'Fri 14 Aug 2026',
    timeLabel: '4pm – 9pm',
    venue: 'Suntec Convention Centre',
    venueShort: 'Suntec Convention Centre',
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

  // Copywriting doc, WHY VISIT — verbatim, split into figure / label / detail.
  const STATS = [
    {
      figure: '400+', label: 'Attendees from across the world',
      copy: 'To grow your network',
    },
    {
      figure: '20+', label: 'Prestigious partners',
      copy: 'Offering exclusive opportunities',
      link: { href: '#partners', text: 'See every partner' },
    },
    {
      figure: '40+', label: 'Partner societies',
      copy: 'Dedicated to connecting overseas Singaporean talent',
      // theukssc.co.uk lists them by region; roughly 40, which is where the
      // figure in the copy comes from.
      link: { href: UKSSC.societies, text: 'Browse the society network ↗', ext: true },
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

  const EVENT_FLOW = [
    { time: '4:00 pm', title: 'Career Fair Opens', body: 'Doors open for registration, networking and employer booths.' },
    { time: '4:45 pm', title: 'GOH Segment', body: 'Hear from Mr Jeffrey Siow, Minister for Transport and Second Minister for Finance.' },
    { time: '5:30 pm', title: 'Food, Drinks and Networking', body: 'Refuel after the GOH segment and keep the conversations going.' },
    { time: '6:00–9:00 pm', title: 'Career Fair Resumes', body: 'Meet participating organisations, explore pathways and connect with Singaporean talent.' },
    { time: '9:00 pm', title: 'End of Event', body: 'Thank you for joining BlastOff! 2026.' },
  ];

  const GOH = {
    name: 'Mr Jeffrey Siow',
    role: 'Minister for Transport and Second Minister for Finance',
    intro: 'We are honoured to welcome Mr Jeffrey Siow as our Guest-of-Honour for BlastOff! 2026.',
    paragraphs: [
      'Mr Siow oversees Singapore’s air, land and sea transport, and helps shape the country’s fiscal and economic strategy.',
      'Before taking office, Mr Siow was Second Permanent Secretary at both the Ministry of Manpower and the Ministry of Trade and Industry, where he led national efforts to grow Singapore’s economy, and to develop a productive workforce and progressive workplaces to benefit Singaporeans.',
    ],
  };

  // Copywriting doc, ABOUT — the supplied paragraph, broken for reading.
  const ABOUT = [
    'Join us for BlastOff! 2026, the premier career fair connecting Singaporean ' +
    'talent worldwide with top careers in Singapore.',
    'This year’s BlastOff! will be happening on Friday, 14 August 2026 at the ' +
    'Suntec Convention Centre. Explore global pathways and ' +
    'connect with over 400 attendees across the UK, US, EU and Singapore.',
    'This is your opportunity to meet representatives from 20+ participating ' +
    'organisations across the private and public sectors and take your ' +
            'career aspirations to new horizons!',
  ];

  // Copywriting doc, LEGACY — both headed passages, verbatim.
  const LEGACY = [
    {
      head: 'Bringing Great Potential Together',
      body: 'The United Kingdom Singapore Student Council (UKSSC) was founded in ' +
            '1998 to advocate for the interests of Singaporean students throughout ' +
            'the entire United Kingdom (England, Scotland, Wales, and Northern ' +
            'Ireland) and the Republic of Ireland. In line with this mission, we ' +
            'consistently work to unite Singaporean students by encouraging ' +
            'engagement in events across institutions, alumni networks, ' +
            'professional organisations, and other affiliated groups.',
    },
    {
      head: 'Sparking Inspiration and Passion',
      body: 'Since 2021, the UKSSC has held the annual “Through the Generations” ' +
            'career fair (renamed “BlastOff!” as of 2024) to connect Singaporean ' +
            'students and alumni generations. BlastOff! has helped countless ' +
            'students find meaningful careers and supported partner organisations’ ' +
            'outreach efforts since.',
    },
  ];

  const TRAVEL = {
    lines: ['Promenade', 'Esplanade', 'City Hall'],
    mapUrl: 'https://maps.google.com/?q=Suntec+Singapore+Convention+%26+Exhibition+Centre',
  };

  // Event photography supplied in "Photos to Use", resized into ../assets/photos.
  // `alt` describes the picture; `caption` is the line printed under the frame.
  // Neither claims a year or a venue, because the supplied files carry no
  // shoot date and these were plainly not taken at Suntec.
  const GALLERY = [
    {
      size: 'sm', slug: 'arrival-queue',
      alt: 'Attendees queueing behind rope barriers at the registration desk',
      caption: 'Registration on arrival',
    },
    {
      size: 'lg', slug: 'fair-floor',
      alt: 'A crowded exhibition hall of students moving between employer booths',
      caption: 'The fair floor, mid-afternoon',
    },
    {
      size: 'sm', slug: 'booth-conversation',
      alt: 'Students handing brochures across a booth table to a recruiter',
      caption: 'Talking to recruiters at a partner booth',
    },
    {
      size: 'lg', slug: 'talk-audience',
      alt: 'Rows of seated students listening to a talk',
      caption: 'A house full!',
    },
  ];

  /* Partner tiers for the current site copy. Community and Gold are shown first,
   * followed by the Bronze and Government partner marquees. */
  const PARTNERS = [
    {
      key: 'community', label: 'Community partner', mode: 'static',
      items: [{ name: 'Singapore Global Network', slug: 'sgn' }],
    },
    {
      key: 'gold', label: 'Gold partners', mode: 'static',
      items: [
        { name: 'JPMorgan Chase', slug: 'jpmorgan' },
        { name: 'Economic Development Board (EDB)', slug: 'edb' },
      ],
    },
    {
      key: 'bronze', label: 'Bronze partners', mode: 'marquee', dir: 1,
      items: [
        // Company Details.docx embeds Bank of America's own logo sheet: the
        // horizontal lockup has a 125px minimum width and needs one cap height
        // of clear space. The equal-ink sizer would otherwise take it below that.
        { name: 'Accenture', slug: 'accenture' },
        { name: 'AvePoint', slug: 'avepoint' },
        { name: 'Bank of America', slug: 'bofa', minWidth: 125 },
        { name: 'bp Singapore', slug: 'bp' },
        { name: 'HSBC', slug: 'hsbc' },
        { name: 'LSE Alumni Association of Singapore', slug: 'lse-alumni' },
        { name: 'PwC', slug: 'pwc' },
        { name: 'UOB', slug: 'uob' },
      ],
    },
    {
      key: 'gov', label: 'Government partners', mode: 'marquee', dir: -1,
      items: [
        { name: 'Agency for Science, Technology and Research (A*STAR)', slug: 'astar' },
        { name: 'Central Narcotics Bureau (CNB)', slug: 'cnb' },
        { name: 'Home Team Science and Technology Agency (HTX)', slug: 'htx' },
        { name: 'Immigration & Checkpoints Authority (ICA)', slug: 'ica' },
        { name: 'Land Transport Authority (LTA)', slug: 'lta' },
        { name: 'Monetary Authority of Singapore (MAS)', slug: 'mas' },
        { name: 'Ministry of Education (MOE)', slug: 'moe' },
        { name: 'Ministry of Finance (MOF)', slug: 'mof' },
        { name: 'Ministry of Foreign Affairs (MFA)', slug: 'mfa' },
        { name: 'Ministry of Transport (MOT)', slug: 'mot' },
        { name: 'Singapore Civil Defence Force (SCDF)', slug: 'scdf' },
        { name: 'Singapore Prison Service (SPS)', slug: 'sps' },
      ],
    },
  ];

  /* Partner profiles from the supplied client copy. Partners without profile
   * copy remain listed in the tier bands above until their text arrives. */
  const PROFILES = [
    {
      name: 'JPMorgan Chase', tier: 'Gold partner',
      paragraphs: [
        'Established in 1964, our Singapore office is a comprehensive provider of corporate and investment banking, commercial banking, asset management, and private banking. We serve local corporations, multinationals, government, and private clients with a full suite of market-leading products and services across various sectors and asset classes. With over 100 years in the Asia Pacific region, we operate in 17 markets, leveraging our global strength and local expertise.',
        'In Asia Pacific, we are dedicated to promoting economic growth and inclusion through philanthropic initiatives focused on workforce readiness, small business development, and financial capability. Our investments aim to create quality jobs for underserved communities, support sustainable small businesses, and provide marginalized individuals with access to affordable financial products for greater financial security. This commitment drives our Foundation’s giving and employee engagement across the region.',
        'J.P. Morgan is a global financial services leader, offering solutions to major corporations, governments, and institutions in over 100 countries. By 2025, JPMorgan Chase plans to deploy $2 billion in philanthropic capital worldwide. We also lead volunteer activities for employees in local communities, utilizing our resources, including access to capital, economies of scale, and global expertise.',
      ],
    },
    {
      name: 'PwC', tier: 'Bronze partner',
      body: 'At PwC, we help clients build trust and reinvent so they can turn ' +
            'complexity into competitive advantage. We’re a tech-forward, ' +
            'people-empowered network with more than 364,000 people in 136 ' +
            'countries and 137 territories. Across audit and assurance, tax and ' +
            'legal, deals and consulting, we help clients build, accelerate, and ' +
            'sustain momentum.',
    },
    {
      name: 'UOB', tier: 'Bronze partner',
      paragraphs: [
        'United Overseas Bank Limited (UOB) is a leading bank in Asia with a global network of more than 500 branches and offices in 19 countries and territories in Asia Pacific, Europe and North America. In Asia, we operate through our head office in Singapore and banking subsidiaries in China, Indonesia, Malaysia and Thailand, as well as branches and offices. Our history spans more than 80 years.',
        'Over this time, we have been guided by our values – Honorable, Enterprising, United and Committed. This means we always strive to do what is right, build for the future, work as one team and pursue long-term success. It is how we work, consistently, be it towards the company, our colleagues or our customers.',
      ],
    },
    {
      name: 'Accenture', tier: 'Bronze partner',
      paragraphs: [
        'Accenture is a leading global professional services company that helps the world’s leading businesses, governments and other organizations build their digital core, optimize their operations, accelerate revenue growth and enhance citizen services—creating tangible value at speed and scale. We are a talent- and innovation-led company with 732,000 people serving clients in more than 120 countries.',
        'Technology is at the core of change today, and we are one of the world’s leaders in helping drive that change, with strong ecosystem relationships. Visit us at www.accenture.com.',
      ],
    },
    {
      name: 'AvePoint', tier: 'Bronze partner',
      body: 'As the global leader in data protection, serving more than 28,000 customers worldwide, AvePoint empowers organizations to innovate with confidence through unified data security, governance, and resilience. Headquartered in Jersey City, New Jersey, with its APAC headquarters in Singapore, AvePoint established a S$100 million R&D hub, supported by the Singapore Economic Development Board (EDB), to advance AI innovation, strengthen regional digital capabilities, and develop the next generation of technology talent.',
    },
    {
      name: 'HSBC', tier: 'Bronze partner',
      body: 'HSBC was founded in Hong Kong in March 1865 to finance growing trade ' +
            'between Europe, India and China. Today we operate in more than 50 ' +
            'countries and territories but retain a strong commitment to Hong Kong, ' +
            'which is one of our two home markets.',
    },
    {
      name: 'bp Singapore', tier: 'Bronze partner',
      body: 'As a leading global energy company with a presence in 61 countries, ' +
            'bp’s purpose is to deliver energy to the world, today and tomorrow. We ' +
            'are one of only a few companies that can deliver energy – at scale – to ' +
            'countries and millions of customers every day. With more than 100 years ' +
            'of experience, we bring together technology, innovation and deep ' +
            'expertise that keeps communities moving — and we’re still evolving.',
    },
    {
      name: 'Bank of America', tier: 'Bronze partner',
      body: 'Bank of America is one of the world’s leading financial institutions, serving clients across Asia Pacific through a network of offices in key markets. For more than 75 years in the region, we have helped companies, institutions and investors achieve their goals while providing employees with opportunities to grow, innovate and make an impact in a global organization.',
    },
    {
      name: 'LSE Alumni Association of Singapore', tier: 'Bronze partner',
      body: 'The LSE Alumni Association of Singapore (LSEAAS) is one of the oldest and most active alumni chapters in Asia, bringing together generations of LSE graduates to connect, collaborate, and contribute to Singapore’s vibrant community. Established in 1973, LSEAAS is celebrating over 50 years of alumni community and engagement, and counts more than 3,000 alumni in Singapore — one of the largest LSE alumni networks globally. Our legacy stretches back even further, to our first graduate member in 1947, spanning decades of leadership and impact.',
    },
    {
      name: 'Economic Development Board (EDB)', tier: 'Gold partner',
      body: 'The Singapore Economic Development Board (EDB), a government agency under MTI, is responsible for strategies that enhance Singapore’s position as a global centre for business, innovation, and talent. Our mission is to create sustainable economic growth, with vibrant business and good job opportunities for Singapore.',
    },
    {
      name: 'Ministry of Foreign Affairs (MFA)', tier: 'Government partner',
      body: 'The Ministry of Foreign Affairs (MFA) is at the heart of safeguarding ' +
            'and advancing Singapore’s interests in the global arena. As a Foreign ' +
            'Service Officer (FSO), you will stand on the frontlines of diplomacy — ' +
            'representing our nation, protecting our citizens abroad, and shaping ' +
            'policies that ensure Singapore continues to thrive in an increasingly ' +
            'complex world.',
    },
    {
      name: 'Monetary Authority of Singapore (MAS)', tier: 'Government partner',
      body: 'The Monetary Authority of Singapore (MAS) is Singapore’s central bank ' +
            'and integrated financial regulator. MAS also works with the financial ' +
            'industry to develop Singapore as a dynamic international financial centre.',
    },
    {
      name: 'Ministry of Finance (MOF)', tier: 'Government partner',
      body: 'The Ministry of Finance (MOF) is a ministry of the Government of ' +
            'Singapore responsible for managing Singapore’s fiscal policies and the ' +
            'structure of its economy. We work to maintain international standards ' +
            'and best practices in areas such as company law, accounting standards, ' +
            'and corporate governance principles.',
    },
    {
      name: 'Ministry of Transport (MOT)', tier: 'Government partner',
      body: 'At the Ministry of Transport (MOT), we spearhead developments in our air, land and sea transport sectors to advance Singapore’s economic competitiveness and Singaporeans’ quality of life. We seek dynamic, analytical and committed individuals to join our able MOT team in realising our vision of a global interconnected transport hub.',
    },
    {
      name: 'Immigration & Checkpoints Authority (ICA)', tier: 'Government partner',
      body: 'Immigration & Checkpoints Authority (ICA) is the Guardian of Singapore’s borders, with a mission to secure our borders and uphold Singapore laws on immigration and national registration. We are Singapore’s frontline, keeping Singapore connected to the world, while protecting our communities by keeping dangerous and illegal items off our shores.',
    },
    {
      name: 'Land Transport Authority (LTA)', tier: 'Government partner',
      body: 'The Land Transport Authority (LTA) leads Singapore’s land transport ' +
            'development by planning, designing, building, and maintaining ' +
            'infrastructure and systems. Our goal is to enhance connectivity with a ' +
            'greener, more inclusive network that leverages technology for future ' +
            'solutions. Given the wide-ranging scope of LTA’s work, career ' +
            'opportunities within LTA are diverse and dynamic.',
    },
    {
      name: 'Singapore Prison Service (SPS)', tier: 'Government partner',
      body: 'Step into a world where every interaction is an opportunity to impact lives. Join us as Captains of Lives, where we empower change and transform lives, creating a safer and more inclusive Singapore — all while embracing dynamic career and personal growth.',
    },
  ];

  // Eligibility first — it is the question that decides whether to register.
  const FAQS = [
    {
      q: 'I’m a ______, can I still attend the event?',
      answers: [
        {
          head: 'University Student',
          body: 'Yes! We welcome all students from all nationalities and universities!',
        },
        {
          head: 'Recent Graduate',
          body: 'Of course! Whether you are after an internship, a graduate role, or simply want to understand the Singapore market, all are welcome.',
        },
      ],
    },
    {
      q: 'Do I need to register in advance, or can I walk in on the day?',
      a: 'We do allow for walk-in registration, but capacity of the venue is limited. Reserve ahead on Eventbrite to ensure you get a spot!',
    },
    {
      q: 'What should I bring on the day?',
      a: 'Printed copies of your CV and something to take notes with. Smart casual ' +
         'dress is right. Recruiters are there to talk, so come with questions ready ' +
         'for the organisations you most want to meet.',
    },
    {
      q: 'How do I get to Suntec Convention Centre?',
      a: 'Suntec Convention Centre is a short covered walk from Promenade, Esplanade and ' +
         'City Hall MRT stations. The fair is on Level 3, Summit 1.',
    },
    {
      q: 'Will there be food and drinks provided?',
      a: 'There will be food and drinks provided after the GOH segment ends at around 5.30 pm. Come early to avoid missing out!',
    },
  ];

  /* Brand deck p10–p11: League Spartan is the primary typeface, Open Sauce the
   * secondary. Open Sauce ships with the repo as a local woff; League Spartan
   * comes from Google Fonts, which is where the deck's own specimen is set. */
  const FONT_SHEETS = [
    'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;700&display=swap',
  ];

  const FONT_FACES = [
    '@font-face{font-family:"Open Sauce Sans";font-style:normal;font-weight:400;',
    'font-display:swap;src:url("', asset('./assets/fonts/open-sauce-sans-400.woff'), '") format("woff");}',
    '@font-face{font-family:"Open Sauce Sans";font-style:normal;font-weight:700;',
    'font-display:swap;src:url("', asset('./assets/fonts/open-sauce-sans-700.woff2'), '") format("woff2"),',
    'url("', asset('./assets/fonts/open-sauce-sans-700.woff'), '") format("woff");}',
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
    if (!document.head.querySelector('style[data-blastoff-fonts]')) {
      const s = document.createElement('style');
      s.dataset.blastoffFonts = '';
      s.textContent = FONT_FACES;
      document.head.appendChild(s);
    }
  }

  function addStructuredData() {
    if (document.head.querySelector('script[data-blastoff-jsonld]')) return;
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: EVENT.name,
      description: EVENT.proposition + '. ' + EVENT.pitch,
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: [new URL('./assets/og-blastoff-2026-v2.png', SCRIPT_BASE).href],
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
        name: 'United Kingdom Singapore Student Council',
        alternateName: 'UKSSC',
        url: UKSSC.site,
        email: CONFIG.contactEmail,
        // sameAs is how a search engine ties this event to the council's
        // existing profiles instead of treating it as an unknown organiser.
        sameAs: [UKSSC.instagram, UKSSC.linkedin, UKSSC.facebook, UKSSC.telegram],
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
    s.dataset.blastoffJsonld = '';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  const CHEV = '<svg class="chev" viewBox="0 0 36 18" aria-hidden="true" focusable="false">' +
    '<path d="M2 2 18 16 34 2" fill="none" stroke="currentColor" stroke-width="3" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ----------------------------------------------------------------- style */

  const CSS = `
  :host {
    /* Brand deck p6–p7. Exact hexes, no near-misses: the old #DFFF3E was a
       different lime from the one the logo artwork is drawn in. */
    --ink:#141414;      /* Black         — primary   */
    --lime:#E9FF47;     /* Electric Lime — primary   */
    --cream:#FFF5E9;    /* Beige Linen   — primary   */
    --royal:#2216B4;    /* Vivid Royal   — secondary */
    /* Icy Aqua is a BACKGROUND colour. The Colour Usage page shows it as a
       ground carrying Black or Vivid Royal, and never lists it as a
       foreground on Black — so nothing on this dark page is set in it. */
    --aqua:#BDF5F4;     /* Icy Aqua      — secondary, grounds only */

    --hair:rgba(255,245,233,.16);
    --hair-soft:rgba(255,245,233,.08);

    /* Colour Usage (p8) sanctions only Electric Lime or Beige Linen on Black.
       Body copy is therefore warm Beige Linen at reduced alpha, not plain
       white — a small shift that keeps every pairing inside the guide. */
    --text:rgba(255,245,233,.84);
    --bright:#FFF5E9;
    --meta:rgba(255,245,233,.66);

    --maxw:1320px;
    --pad:clamp(20px,4vw,60px);

    /* p10 primary (display), p11 secondary (UI and body). */
    --display:'League Spartan','Open Sauce Sans',system-ui,-apple-system,sans-serif;
    --ui:'Open Sauce Sans',system-ui,-apple-system,sans-serif;

    /* p10–p11: "Minimum text size: 15px". Every clamp() on this page bottoms
       out at 15px, which is why the small caps labels read larger than a
       typical web eyebrow. It is the guideline, not an oversight. */

    display:block;
    position:relative;
    background:var(--ink);
    color:var(--text);
    font-family:var(--ui);
    -webkit-font-smoothing:antialiased;
    overflow-x:clip;
  }
  *,*::before,*::after{box-sizing:border-box;}

  .wrap{max-width:calc(var(--maxw) + 2*var(--pad));margin-inline:auto;padding-inline:var(--pad);}
  a{color:inherit;}
  :where(a,button):focus-visible{outline:3px solid var(--lime);outline-offset:3px;}

  .progress{position:fixed;left:0;top:0;height:2px;width:100%;z-index:45;pointer-events:none;}
  .progress i{display:block;height:100%;width:0;background:var(--lime);}

  .page{position:relative;z-index:1;}

  /* ---- nav ---- */
  .nav{position:sticky;top:0;z-index:35;display:flex;align-items:center;
    justify-content:space-between;gap:20px;padding:14px var(--pad);
    background:linear-gradient(180deg,rgba(20,20,20,.94),rgba(20,20,20,.6));
    backdrop-filter:blur(10px);border-bottom:1px solid var(--hair-soft);font-family:var(--ui);}
  .brand{display:flex;align-items:center;gap:9px;text-decoration:none;font-weight:700;
    font-size:15px;letter-spacing:.02em;text-transform:uppercase;color:var(--bright);
    min-height:44px;}
  .brand img{width:24px;height:24px;object-fit:contain;}
  .nav-list{display:flex;align-items:center;gap:clamp(14px,1.9vw,28px);
    list-style:none;margin:0;padding:0;}
  .nav-list a{display:inline-flex;align-items:center;min-width:44px;min-height:44px;
    text-decoration:none;
    font-size:15px;letter-spacing:.04em;text-transform:uppercase;
    color:rgba(255,245,233,.66);transition:color .2s ease;}
  .nav-list a:hover,.nav-list a[aria-current="true"]{color:var(--lime);}
  .nav-list .drawer-cta{display:none;}

  .nav-toggle{display:none;background:none;border:0;padding:0;cursor:pointer;
    min-width:44px;min-height:44px;color:var(--lime);}
  .nav-toggle svg{display:block;margin-inline:auto;width:22px;height:16px;}
  .nav-toggle .x{display:none;}
  .nav[data-open="true"] .nav-toggle .bars{display:none;}
  .nav[data-open="true"] .nav-toggle .x{display:block;}
  .scrim{position:fixed;inset:0;z-index:34;background:rgba(0,0,0,.62);
    opacity:0;pointer-events:none;transition:opacity .3s ease;}

  /* ---- buttons: one obvious primary ---- */
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;
    min-height:52px;padding:15px 30px;border-radius:4px;border:1px solid transparent;
    font-family:var(--ui);font-weight:700;font-size:15px;letter-spacing:.02em;
    text-decoration:none;cursor:pointer;text-align:center;
    transition:transform .18s ease,background .18s ease,color .18s ease,border-color .18s ease;}
  /* Black on Electric Lime — the first pairing on the Colour Usage page. */
  .btn-solid{background:var(--lime);color:var(--ink);}
  .btn-solid:hover{transform:translateY(-2px);background:#F1FF7A;}
  .btn-outline{background:transparent;color:var(--bright);border-color:rgba(255,245,233,.34);}
  .btn-outline:hover{border-color:var(--lime);color:var(--lime);}
  .btn svg{width:17px;height:17px;flex:0 0 auto;}

  /* Tertiary: calendar, maps. Deliberately lighter than the buttons. */
  .lnk{display:inline-flex;align-items:center;gap:9px;min-height:44px;
    background:none;border:0;padding:0;cursor:pointer;
    font-family:var(--ui);font-size:15px;letter-spacing:.02em;text-decoration:none;
    color:var(--meta);border-bottom:1px solid transparent;
    transition:color .2s ease,border-color .2s ease;}
  .lnk:hover{color:var(--lime);border-bottom-color:var(--lime);}
  .lnk svg{width:16px;height:16px;}

  /* ---- hero ---- */
  /* Almost no padding above: the mark's mandated clear space already supplies
     more headroom than a hero would normally need, and doubling it left the
     proposition below the fold. */
  /* padding-BLOCK, not the shorthand. .hero also carries .wrap, and a padding
     shorthand here silently reset .wrap's padding-inline to 0 — which is why
     hero copy used to run edge to edge on a phone. */
  .hero{padding-block:0 clamp(32px,5vh,64px);text-align:center;}

  /* Clear space (p12): 0.5h clear on all four sides, where h is the height of
     the mark. Percentage padding resolves against the box's own width, so for
     a 1368x300 wordmark the value that yields exactly 0.5h is 9% — solve
     p = 0.5(W - 2p)/4.56. Nothing is allowed inside that margin, which is why
     the decorative sparkles that used to sit on the logo's shoulders are gone.
     No drop-shadow either: p14 forbids altering the mark's appearance.

     Because the clear space is real space, the mark itself is set narrower
     than it used to be — the box it now needs is ~19% taller than the artwork,
     and the proposition still has to clear the fold. */
  /* CLEAR SPACE (p12): 0.5h on all four sides, h being the wordmark's height.
     Solve p = 0.5(W - 2p)/4.56 for a 1368x300 mark and p = W/11.12 = 8.993% of
     the box.

     It must be 8.993 *cqw*, not 8.993%. Percentage padding resolves against the
     CONTAINING BLOCK's width, not the element's own — so a 9% padding was 9% of
     the 1320px column, landing 0.93h of clear space instead of 0.5h. That, not
     the tagline, was what made the hero feel cavernous. Container units resolve
     against .mark itself, which is the box the algebra is about. */
  .mark{position:relative;display:inline-block;width:min(820px,74%);
    /* p13's 70px minimum is the LOGO's width, so the box has to allow for its
       own padding: 70 / 0.82014 = 86px. */
    min-width:86px;
    container-type:inline-size;}
  .mark-clear{padding:8.993cqw;}

  /* THE LOCKUP (p3). The tagline is part of the Main Logo, not a caption sitting
     under it — which is what it had become, stranded on the far side of 0.5h of
     clear space and shrunk to hero-subtitle size.

     Measured off the deck rendered at 3400px, relative to the wordmark height h:
       gap, wordmark ink bottom to tagline ink top ...... 0.1916 h
       tagline ink height ............................... 0.1257 h
       tagline width, as a fraction of wordmark width ... 0.2474
     League Spartan matches the deck's width-to-ink ratio (9.4 against a measured
     9.05-9.24); Open Sauce comes out at 9.9, too wide. The giveaway is the very
     tall x-height — the t barely clears the o.

     Container units, so the two parts scale as one object at any width:
     100cqw is the wordmark width, so h = 100/4.56 = 21.93cqw. */
  .lockup{container-type:inline-size;}
  .lockup img{display:block;width:100%;height:auto;}
  /* -.02em, not the -.01em used elsewhere: at League Spartan's natural fit the
     tagline comes out 9.6 wide per unit of ink against the deck's 9.05-9.24, so
     the deck's own lockup is tracked tighter than the general type rule. Solving
     both constraints at once lands on -.02em. */
  /* Two brand rules collide on a phone. Held to the p3 lockup proportion the
     tagline computes to 8px at 375px wide, which breaks p10-p11's 15px minimum
     and is genuinely hard to read — against the spirit of the accessibility
     note on p8. The 15px floor wins, so below a ~381px wordmark the lockup
     stretches slightly rather than the type going sub-legible.

     The gap is expressed in em rather than cqw so it tracks whichever value
     wins: at the deck-matched size 3.95cqw IS 1.003em, so this is the same
     number, and it stays proportional to the tagline once the floor kicks in. */
  .tagline{margin:1.003em 0 0;font-family:var(--display);font-weight:400;
    font-size:max(15px,3.938cqw);line-height:1;letter-spacing:-.02em;
    /* Electric Lime, not Icy Aqua. p14 forbids two colours in the logo at once,
       and the tagline is inside the logo. */
    color:var(--lime);}

  h1{margin:clamp(24px,3.2vw,42px) auto 0;max-width:22ch;font-family:var(--display);
    font-weight:700;font-size:clamp(28px,4.4vw,58px);line-height:1;letter-spacing:-.01em;
    color:var(--bright);}
  .pitch{margin:clamp(15px,1.9vw,23px) auto 0;max-width:52ch;
    font-size:clamp(16px,1.8vw,21px);line-height:1.55;color:var(--text);}

  .facts-line{display:flex;flex-wrap:wrap;justify-content:center;
    gap:6px clamp(12px,1.6vw,22px);margin:clamp(20px,2.6vw,32px) 0 0;
    font-family:var(--ui);font-weight:700;font-size:clamp(15px,1.3vw,16px);
    letter-spacing:.08em;text-transform:uppercase;color:var(--lime);}
  .facts-line i{font-style:normal;color:rgba(255,245,233,.28);}

  .hero-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;
    margin:clamp(22px,2.8vw,34px) 0 0;}
  .substrip{text-align:center;padding-block:clamp(4px,1vw,10px) clamp(2px,.6vw,6px);}
  .micro{margin:clamp(12px,1.6vw,18px) 0 0;font-family:var(--ui);font-size:15px;
    letter-spacing:.02em;color:var(--meta);}

  /* Countdown demoted to one quiet line — it was co-dominating the fold. */
  .count{display:flex;justify-content:center;align-items:baseline;flex-wrap:wrap;
    gap:0 clamp(10px,1.4vw,18px);margin:0;
    font-variant-numeric:tabular-nums;font-family:var(--display);}
  .count .u{display:inline-flex;align-items:baseline;gap:6px;}
  .count b{font-size:clamp(18px,1.9vw,22px);font-weight:700;letter-spacing:-.01em;
    color:var(--bright);}
  .count i{font-style:normal;font-family:var(--ui);font-size:15px;letter-spacing:.1em;
    text-transform:uppercase;color:var(--meta);}
  .count .dot{color:rgba(255,245,233,.24);}
  .count .msg{font-size:clamp(16px,1.7vw,20px);color:var(--lime);font-weight:700;}

  /* ---- kinetic strip: industries, so it earns its space ---- */
  .ticker{margin-top:clamp(28px,4.2vw,54px);border-block:1px solid var(--hair);
    padding-block:clamp(11px,1.4vw,17px);}
  .ticker .marquee-set{display:flex;align-items:center;}
  .ticker span{flex:0 0 auto;display:flex;align-items:center;gap:clamp(18px,2.6vw,38px);
    margin-inline-end:clamp(18px,2.6vw,38px);font-family:var(--display);font-weight:500;
    font-size:clamp(16px,1.6vw,21px);letter-spacing:-.01em;color:var(--bright);}
  .ticker span::after{content:"";width:5px;height:5px;border-radius:50%;background:var(--lime);}
  /* Hidden on mobile: it competed with the countdown and clipped mid-word. */
  @media (max-width:760px){ .ticker{display:none;} }

  /* ---- sections ---- */
  section{scroll-margin-top:84px;}
  /* Two adjacent sections each contribute their padding to the same gap, so the
     figure here is half of what reads as the space between them. 116 made 232. */
  .sec{padding-block:clamp(44px,5.5vw,80px);}
  .sec + .sec{border-top:1px solid var(--hair);}
  .eyebrow{display:flex;align-items:center;gap:14px;margin:0 0 clamp(16px,2.2vw,26px);
    font-family:var(--ui);font-weight:700;font-size:15px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--meta);}
  .eyebrow b{color:var(--lime);}
  .eyebrow::after{content:"";flex:1;height:1px;background:var(--hair);}
  h2{margin:0;font-family:var(--display);font-weight:700;
    font-size:clamp(32px,5.4vw,72px);line-height:1;letter-spacing:-.015em;
    color:var(--bright);}
  h2 em{font-style:normal;color:var(--lime);}
  h3{margin:0;}
  .lede{margin:clamp(20px,2.6vw,32px) 0 0;max-width:34ch;font-family:var(--display);
    font-size:clamp(19px,2.2vw,28px);line-height:1.2;letter-spacing:-.01em;
    color:var(--bright);}
  .body p{margin:0 0 16px;font-size:clamp(16px,1.6vw,18px);line-height:1.72;}
  .body p:last-child{margin-bottom:0;}

  .split{display:grid;gap:clamp(24px,4vw,64px);grid-template-columns:minmax(0,1fr);}
  @media (min-width:900px){ .split{grid-template-columns:minmax(0,6fr) minmax(0,5fr);} }

  /* ---- editorial photograph ---- */
  .plate{margin:0;}
  .plate img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;
    background:rgba(255,245,233,.05);}
  /* Across the full column a 3:2 frame is 800px tall and fills with ceiling.
     Letterboxed and weighted low, the crop holds the crowd instead. */
  .plate.wide img{aspect-ratio:2.4/1;object-position:50% 64%;}
  /* The legacy frame is weighted high so the crop holds the old crest and
     wordmark — the rename the copy beside it is describing. */
  .plate.tall img{aspect-ratio:4/3;object-position:50% 34%;}
  .plate figcaption{margin:12px 0 0;font-family:var(--ui);font-size:15px;
    line-height:1.5;color:var(--meta);}

  /* ---- data mode: numerals and rules ---- */
  .fig{display:grid;gap:clamp(4px,1.4vw,28px);align-items:baseline;
    grid-template-columns:minmax(0,auto) minmax(0,1fr);
    padding-block:clamp(20px,2.6vw,34px);border-top:1px solid var(--hair);}
  .fig:last-of-type{border-bottom:1px solid var(--hair);}
  .fig b{font-family:var(--display);font-size:clamp(50px,10vw,140px);line-height:.82;
    letter-spacing:-.03em;color:var(--lime);font-variant-numeric:tabular-nums;}
  .fig div{padding-bottom:clamp(4px,1vw,12px);}
  .fig em{display:block;font-style:normal;font-family:var(--ui);font-weight:700;
    font-size:clamp(15px,1.3vw,17px);letter-spacing:.03em;color:var(--bright);
    margin-bottom:7px;}
  /* block, so the link below it starts a new line. As an inline span the two
     ran together — "Offering exclusive opportunitiesSee every partner". */
  .fig span{display:block;font-size:clamp(15px,1.5vw,17px);line-height:1.55;}
  .fig-lnk{margin-top:10px;}

  /* ---- what you can do ---- */
  /* The step is measured at runtime (see _fitPills) rather than guessed, so the
     last capsule lands flush with the right margin whatever the copy says. */
  .pills{--step:7.6%;display:flex;flex-direction:column;
    gap:clamp(11px,1.6vw,22px);align-items:flex-start;}
  .pill{display:flex;align-items:baseline;
    margin-left:calc(var(--i) * var(--step));
    /* Never wider than the space left after its own indent, so a long line
       wraps instead of breaking out of the column. */
    max-width:calc(100% - var(--i) * var(--step));
    padding:clamp(12px,1.5vw,20px) clamp(24px,2.6vw,40px);
    border:1px solid rgba(255,245,233,.28);border-radius:999px;
    background:rgba(255,245,233,.025);font-family:var(--display);
    font-size:clamp(16px,2vw,27px);letter-spacing:-.01em;color:var(--bright);
    transition:background .22s ease,color .22s ease,border-color .22s ease;}
  .pill i{flex:0 0 auto;font-style:normal;font-family:var(--ui);font-weight:700;
    font-size:15px;letter-spacing:.06em;color:var(--lime);
    padding-right:clamp(13px,1.3vw,17px);margin-right:clamp(13px,1.3vw,17px);
    border-right:1px solid rgba(255,245,233,.2);
    transition:color .22s ease,border-color .22s ease;}
  .pill:hover{background:var(--lime);color:var(--ink);border-color:var(--lime);}
  .pill:hover i{color:rgba(20,20,20,.55);border-right-color:rgba(20,20,20,.24);}
  :host(.reveal-on) .pill.is-in{animation-delay:calc(var(--i) * 70ms);}
  @media (max-width:760px){
    .pills{--step:0px;align-items:stretch;}
    .pill{margin-left:0;max-width:100%;}
  }

  /* This used to be min-height:100svh with the group centred in it, to read as a
     full-page statement. In practice it manufactured a screenful of dead air
     above the eyebrow and below the last capsule. The group now sizes to its
     content and the section's own padding does the separating. */
  @media (min-width:900px){
    .doing{display:flex;flex-direction:column;gap:clamp(32px,4vw,56px);}
    .doing .pills{margin-top:0 !important;}
  }

  /* ---- guest of honour ---- */
  .goh-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);
    gap:clamp(28px,6vw,92px);align-items:start;}
  .goh-copy .role{margin:clamp(14px,2vw,22px) 0 0;font-family:var(--display);
    font-size:clamp(18px,2vw,26px);line-height:1.12;color:var(--lime);}
  .goh-copy .body{margin-top:clamp(24px,3vw,42px);}
  .goh-facts{margin:clamp(24px,3vw,40px) 0 0;font-family:var(--ui);font-weight:700;
    font-size:15px;line-height:1.65;letter-spacing:.08em;text-transform:uppercase;color:var(--lime);}
  .goh-visual{margin:0;position:relative;background:var(--ink);}
  .goh-visual img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;}
  .goh-visual figcaption{margin-top:12px;font-family:var(--ui);font-size:15px;
    line-height:1.5;color:var(--meta);}

  /* ---- event flow ---- */
  .flow-intro{max-width:42ch;margin:clamp(18px,2.4vw,30px) 0 clamp(28px,4vw,30px);
    font-size:clamp(17px,1.8vw,21px);line-height:1.55;color:var(--text);}
  .flow-label{display:grid;grid-template-columns:minmax(110px,1.2fr) minmax(0,2fr) minmax(0,4fr);
    gap:clamp(16px,3vw,48px);padding-bottom:12px;font-family:var(--ui);font-weight:700;
    font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:var(--meta);}
  .flow-list{border-top:1px solid var(--hair);}
  .flow-row{display:grid;grid-template-columns:minmax(110px,1.2fr) minmax(0,2fr) minmax(0,4fr);
    gap:clamp(16px,3vw,48px);padding-block:clamp(20px,2.6vw,32px);
    border-bottom:1px solid var(--hair);}
  .flow-time{font-family:var(--display);font-size:clamp(18px,2vw,26px);color:var(--lime);}
  .flow-title{font-family:var(--display);font-size:clamp(18px,2vw,26px);line-height:1.08;
    color:var(--bright);}
  .flow-body{font-size:clamp(16px,1.5vw,18px);line-height:1.55;color:var(--text);}
  @media (max-width:899px){
    .goh-grid{grid-template-columns:1fr;}
    .goh-visual{max-width:620px;}
    .flow-label,.flow-row{grid-template-columns:minmax(92px,1fr) minmax(0,2fr);}
    .flow-label span:nth-child(2){grid-column:2;}
    .flow-body{grid-column:2;}
  }
  @media (max-width:520px){
    .flow-label,.flow-row{grid-template-columns:1fr;gap:8px;}
    .flow-label span:nth-child(2){grid-column:auto;}
    .flow-body{grid-column:auto;}
  }

  /* ---- immersive gallery ---- */
  .rail-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;
    flex-wrap:wrap;}
  .rail-btns{display:flex;gap:14px;}
  .rbtn{display:grid;place-items:center;min-width:44px;min-height:44px;
    background:none;border:1px solid var(--hair);border-radius:50%;cursor:pointer;
    color:var(--meta);transition:color .2s ease,border-color .2s ease;}
  .rbtn:hover{color:var(--lime);border-color:var(--lime);}
  .rbtn svg{width:20px;height:12px;display:block;}
  .rail{overflow:hidden;cursor:grab;touch-action:pan-y;margin-top:clamp(24px,3vw,40px);}
  .rail.is-dragging{cursor:grabbing;}
  .rail-track{display:flex;width:max-content;will-change:transform;}
  .rail-set{display:flex;}
  .shot{flex:0 0 auto;margin:0 clamp(10px,1.2vw,16px) 0 0;}
  .shot .frame{position:relative;overflow:hidden;
    height:clamp(230px,32vw,470px);
    background:rgba(255,245,233,.05);
    display:grid;place-items:center;}
  .shot.sm .frame{width:clamp(220px,34vw,350px);}
  .shot.lg .frame{width:clamp(290px,58vw,600px);}
  .shot img{width:100%;height:100%;object-fit:cover;display:block;}
  .shot .num{position:absolute;top:14px;left:16px;z-index:1;
    font-family:var(--ui);font-weight:700;font-size:15px;letter-spacing:.1em;
    color:var(--lime);text-shadow:0 1px 10px rgba(20,20,20,.85);}
  .shot .ph{font-family:var(--ui);font-size:15px;letter-spacing:.14em;
    text-transform:uppercase;color:rgba(255,245,233,.3);}
  .shot figcaption{margin:12px 2px 0;font-family:var(--ui);font-size:15px;
    line-height:1.45;color:var(--meta);max-width:34ch;}

  /* ---- partner directory: the light break in a dark page ---- */
  .band{margin-top:clamp(24px,3vw,40px);padding-block:clamp(32px,4vw,54px);
    background:var(--cream);overflow:hidden;}
  .band-intro{margin:0 0 clamp(20px,2.6vw,32px);max-width:48ch;
    font-size:clamp(16px,1.6vw,18px);line-height:1.62;color:rgba(20,20,20,.8);}
  .sectors{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 clamp(26px,3.4vw,42px);
    padding:0;list-style:none;}
  /* Vivid Royal on Beige Linen — the last pairing on the Colour Usage page. */
  .sectors li{padding:8px 16px;border:1px solid rgba(34,22,180,.28);border-radius:999px;
    font-family:var(--ui);font-weight:500;font-size:15px;letter-spacing:.01em;
    color:var(--royal);}
  .glabel{margin:0 0 clamp(14px,1.8vw,20px);font-family:var(--ui);font-weight:700;
    font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:var(--royal);}
  .tier-band + .tier-band{margin-top:clamp(30px,3.8vw,52px);}
  /* Gold and Bronze are single marks, so they sit still rather than scroll. */
  .tier-static{display:flex;flex-wrap:wrap;align-items:center;gap:clamp(24px,3vw,48px);}
  .marquee{overflow:hidden;cursor:grab;touch-action:pan-y;}
  .marquee.is-dragging{cursor:grabbing;}
  .marquee-track{display:flex;width:max-content;will-change:transform;}
  .marquee-set{display:flex;}
  /* No filters, no recolouring, no cards: partner marks appear exactly as
     supplied. The cream ground is what makes that possible for dark artwork. */
  .logo{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:8px;margin-inline-end:clamp(36px,4.4vw,72px);}
  .tier-static .logo{margin-inline-end:0;}
  .logo img{display:block;height:56px;width:auto;max-width:300px;object-fit:contain;
    transition:transform .25s ease;}
  .logo:hover img{transform:scale(1.06);}
  .logo .nm{display:grid;place-items:center;height:56px;max-width:230px;text-align:center;
    font-family:var(--ui);font-weight:500;font-size:15px;color:var(--ink);}
  .logo.gold img{max-width:380px;}

  /* ---- partner profiles + faqs share one accordion ---- */
  .faq{border-top:1px solid var(--hair);}
  .faq:last-of-type{border-bottom:1px solid var(--hair);}
  .faq-q{width:100%;display:flex;align-items:baseline;justify-content:space-between;
    gap:24px;min-height:56px;padding:clamp(18px,2.2vw,26px) 0;background:none;border:0;
    color:var(--bright);text-align:left;cursor:pointer;font-family:var(--display);
    font-size:clamp(18px,2vw,24px);letter-spacing:-.01em;}
  .faq-q .chev{width:20px;height:10px;flex:0 0 auto;color:var(--lime);
    transition:transform .3s ease;}
  .faq[data-open="true"] .chev{transform:rotate(180deg);}
  .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .32s ease;}
  .faq[data-open="true"] .faq-a{grid-template-rows:1fr;}
  .faq-a>div{overflow:hidden;}
  .faq-a p{margin:0 0 clamp(20px,2.6vw,30px);max-width:66ch;
    font-size:clamp(16px,1.6vw,18px);line-height:1.72;}
  .faq-a h4{margin:0 0 6px;max-width:66ch;font-family:var(--ui);font-size:15px;
    letter-spacing:.08em;text-transform:uppercase;color:var(--lime);}
  /* The tier a profile belongs to, so the accordion still carries the ranking
     once the logo band has scrolled off. */
  .faq .rank{display:block;margin-bottom:6px;font-family:var(--ui);font-weight:700;
    font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:var(--meta);}
  .sub-h{margin:clamp(40px,5vw,72px) 0 clamp(18px,2.4vw,28px);font-family:var(--display);
    font-weight:700;font-size:clamp(24px,3vw,40px);line-height:1;letter-spacing:-.01em;
    color:var(--bright);}

  /* ---- legacy ---- */
  /* The two supplied passages each carry their own head, so they are h2s
     rather than one invented section title with the real heads demoted. */
  .legacy-item + .legacy-item{margin-top:clamp(30px,3.6vw,48px);}
  .legacy-item h2{font-family:var(--display);font-weight:700;
    font-size:clamp(21px,2.4vw,32px);line-height:1.05;letter-spacing:-.01em;
    color:var(--lime);margin-bottom:clamp(12px,1.4vw,18px);}

  /* ---- closing pitch ---- */
  .close{text-align:center;padding-block:clamp(60px,9vw,130px);
    border-top:1px solid var(--hair);}
  .close h2{max-width:20ch;margin-inline:auto;}
  .close > p{margin:clamp(20px,2.6vw,30px) auto 0;max-width:50ch;
    font-size:clamp(16px,1.8vw,20px);line-height:1.6;}
  .contact{margin:clamp(20px,2.6vw,30px) 0 0;font-family:var(--ui);font-size:15px;
    color:var(--meta);}
  .contact a{color:var(--lime);text-decoration:none;border-bottom:1px solid transparent;}
  .contact a:hover{border-bottom-color:var(--lime);}

  /* ---- footer ---- */
  .foot{border-top:1px solid var(--hair);
    padding:clamp(36px,5vw,70px) 0 clamp(88px,11vw,120px);}
  .presented{display:flex;flex-wrap:wrap;gap:clamp(26px,5vw,74px);align-items:center;
    padding-bottom:clamp(28px,3.6vw,46px);border-bottom:1px solid var(--hair);}
  .presented div{display:flex;align-items:center;gap:16px;}
  .presented small{font-family:var(--ui);font-size:15px;letter-spacing:.12em;
    text-transform:uppercase;color:var(--meta);}
  .presented img{height:52px;width:auto;object-fit:contain;}
  .foot-tagline{margin:0 0 0 auto;font-family:var(--display);font-weight:500;
    font-size:clamp(18px,2vw,26px);letter-spacing:-.01em;color:var(--lime);}
  .foot-cols{display:grid;gap:clamp(24px,3.6vw,50px);margin-top:clamp(28px,3.6vw,46px);
    grid-template-columns:repeat(auto-fit,minmax(190px,1fr));}
  .foot h3{margin:0 0 14px;font-family:var(--ui);font-weight:700;font-size:15px;
    letter-spacing:.12em;text-transform:uppercase;color:var(--meta);}
  .foot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;}
  .foot li a{display:inline-flex;align-items:center;min-width:44px;min-height:44px;
    font-family:var(--ui);
    font-size:16px;color:var(--text);text-decoration:none;transition:color .2s ease;}
  .foot li a:hover{color:var(--lime);}
  .copy{margin:clamp(28px,3.6vw,46px) 0 0;font-family:var(--ui);font-size:15px;
    letter-spacing:.02em;color:rgba(255,245,233,.66);}

  /* ---- sticky dock ---- */
  .dock{position:fixed;left:0;right:0;bottom:0;z-index:38;transform:translateY(110%);
    display:flex;align-items:center;justify-content:space-between;gap:14px;
    padding:11px var(--pad);background:rgba(20,20,20,.96);
    border-top:1px solid var(--hair);backdrop-filter:blur(12px);
    transition:transform .38s cubic-bezier(.2,.8,.2,1);font-family:var(--ui);}
  .dock.is-up{transform:none;}
  .dock p{margin:0;font-size:15px;letter-spacing:.04em;text-transform:uppercase;
    color:var(--meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .dock p b{color:var(--bright);}
  .dock .grp{display:flex;align-items:center;gap:10px;flex:0 0 auto;}
  .dock .btn{min-height:46px;padding:12px 22px;font-size:15px;}
  .dock .top{display:inline-flex;align-items:center;justify-content:center;
    min-width:46px;min-height:46px;background:none;border:1px solid var(--hair);
    border-radius:4px;color:var(--meta);cursor:pointer;font-family:var(--ui);font-size:16px;
    transition:color .2s ease,border-color .2s ease;}
  .dock .top:hover{color:var(--lime);border-color:var(--lime);}

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
      gap:4px;padding:84px 28px 40px;background:rgba(20,20,20,.985);
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

  /* A partner mark, untouched: no filter, no card, no recolour. `gold` only
   * changes how much room _logos gives it, never the artwork itself. */
  function logoItem(item, gold) {
    // Deliberately NOT lazy. _logos sizes each mark from its intrinsic ratio
    // and the marquee measures the track it sits in; a logo that has not loaded
    // reports zero and the loop mis-measures how many copies it needs.
    return '<div class="logo' + (gold ? ' gold' : '') + '">' +
      '<img src="' + esc(CONFIG.logoBase + item.slug + '.png') + '" alt="' + esc(item.name) + '" ' +
      'data-name="' + esc(item.name) + '"' +
      (item.minWidth ? ' data-min-width="' + item.minWidth + '"' : '') +
      ' decoding="async"></div>';
  }

  function tierBand(group) {
    const gold = group.key === 'gold';
    const head = '<div class="wrap"><h3 class="glabel">' + esc(group.label) + '</h3></div>';

    if (group.mode === 'static') {
      return '<div class="tier-band">' + head +
        '<div class="wrap"><div class="tier-static">' +
          group.items.map((i) => logoItem(i, gold)).join('') +
        '</div></div></div>';
    }

    const set = group.items.map((i) => logoItem(i, gold)).join('');
    return '<div class="tier-band">' + head +
      '<div class="marquee" data-dir="' + group.dir + '" data-speed="34">' +
        '<div class="marquee-track">' +
          '<div class="marquee-set">' + set + '</div>' +
          '<div class="marquee-set" aria-hidden="true">' + set + '</div>' +
        '</div></div></div>';
  }

  // Supplied at 1600 and 900 wide, both 3:2. The intrinsic attributes are the
  // 1600 file's, which is what the browser needs to reserve the box.
  function photo(slug, alt, sizes, cls) {
    const base = CONFIG.photoBase + slug;
    return '<img' + (cls ? ' class="' + cls + '"' : '') +
      ' src="' + esc(base + '-1600.jpg') + '"' +
      ' srcset="' + esc(base + '-900.jpg') + ' 900w, ' + esc(base + '-1600.jpg') + ' 1600w"' +
      ' sizes="' + esc(sizes) + '"' +
      ' alt="' + esc(alt) + '" width="1600" height="1067" loading="lazy" decoding="async">';
  }

  const CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<rect x="3" y="5" width="18" height="16"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>';
  // Three closed nodes and two connectors. The previous version drew the nodes
  // as open arcs, which rendered as three unreadable hooks at 17px.
  const SHARE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>' +
    '<circle cx="18" cy="19" r="3"/>' +
    '<path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';

  function template() {
    const navItems = [
      ['About', '#about'],
      ['Why visit', '#why'],
      ['GOH', '#goh'],
      ['Event flow', '#flow'],
      ['Partners', '#partners'],
      ['Legacy', '#legacy'],
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
      '<div><em>' + esc(s.label) + '</em><span>' + esc(s.copy) + '</span>' +
        (s.link
          ? '<a class="lnk fig-lnk" href="' + esc(s.link.href) + '"' +
            (s.link.ext ? ' target="_blank" rel="noopener"' : '') + '>' +
            esc(s.link.text) + '</a>'
          : '') +
      '</div></div>').join('');

    const doings = DOINGS.map((d, i) =>
      '<div class="pill rise" style="--i:' + i + '">' +
        '<i>' + String(i + 1).padStart(2, '0') + '</i><span>' + esc(d) + '</span>' +
      '</div>').join('');

    const flowRows = EVENT_FLOW.map((item) =>
      '<div class="flow-row rise">' +
        '<div class="flow-time">' + esc(item.time) + '</div>' +
        '<div class="flow-title">' + esc(item.title) + '</div>' +
        '<div class="flow-body">' + esc(item.body) + '</div>' +
      '</div>').join('');

    const shots = GALLERY.map((g, i) =>
      '<figure class="shot ' + g.size + '">' +
        '<div class="frame">' +
          '<span class="num">0' + (i + 1) + '</span>' +
          photo(g.slug, g.alt, '(max-width:760px) 90vw, 600px') +
        '</div>' +
        '<figcaption>' + esc(g.caption) + '</figcaption>' +
      '</figure>').join('');

    const tiers = PARTNERS.map(tierBand).join('');
    const sectors = INDUSTRIES.map((s) => '<li>' + esc(s) + '</li>').join('');

    // Profiles and FAQs are the same accordion, so _faqs binds both.
    const accordion = (rows, idPrefix) => rows.map((r, i) =>
      '<div class="faq" data-open="false">' +
        '<h3><button class="faq-q" type="button" aria-expanded="false" ' +
        'aria-controls="' + idPrefix + i + '"><span>' +
          (r.rank ? '<span class="rank">' + esc(r.rank) + '</span>' : '') + esc(r.head) +
        '</span>' + CHEV + '</button></h3>' +
        '<div class="faq-a" id="' + idPrefix + i + '" role="region"><div>' +
          (r.bodyHtml || '<p>' + esc(r.body) + '</p>') + '</div></div>' +
      '</div>').join('');

    const profiles = accordion(
      PROFILES.map((p) => ({
        head: p.name,
        rank: p.tier,
        body: p.body,
        bodyHtml: p.paragraphs
          ? p.paragraphs.map((paragraph) => '<p>' + esc(paragraph) + '</p>').join('')
          : null,
      })), 'p');
    const faqs = accordion(
      FAQS.map((f) => ({
        head: f.q,
        body: f.a,
        bodyHtml: f.answers
          ? f.answers.map((answer) => '<h4>' + esc(answer.head) + '</h4><p>' +
              esc(answer.body) + '</p>').join('')
          : null,
      })), 'a');

    const legacy = LEGACY.map((l) =>
      '<div class="legacy-item rise"><h2>' + esc(l.head) + '</h2>' +
        '<div class="body"><p>' + esc(l.body) + '</p></div></div>').join('');

    const eyebrow = (n, label) => '<p class="eyebrow"><b>' + n + '</b> ' + esc(label) + '</p>';

    const ext = (href, label) => '<li><a href="' + esc(href) + '" target="_blank" ' +
      'rel="noopener">' + esc(label) + '</a></li>';

    return '' +
    '<div class="progress" aria-hidden="true"><i></i></div>' +

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
          // .mark is the clear space; .lockup is the Main Logo itself — wordmark
          // AND tagline, which p3 sets as one object. Nothing else may go inside.
          '<div class="mark"><div class="mark-clear">' +
            '<div class="lockup">' +
              '<img src="' + esc(CONFIG.heroImage) + '" alt="BlastOff! 2026" ' +
                'width="1368" height="300" fetchpriority="high">' +
              '<p class="tagline">' + esc(EVENT.tagline) + '</p>' +
            '</div>' +
          '</div></div>' +
          '<h1>' + esc(EVENT.proposition) + '</h1>' +
          '<p class="pitch">' + esc(EVENT.pitch) + '</p>' +
          factsLine +
          '<div class="hero-cta">' +
            ticketBtn('btn-solid') +
            '<a class="btn btn-outline" href="#partners">See our 20+ partners</a>' +
          '</div>' +
        '</header>' +

        /* Countdown and credibility figures sit just below the hero. Inside it
           they made nine stacked elements and pushed the CTA away from being
           the last thing read. */
        '<div class="wrap substrip">' +
          '<div class="count" id="count" aria-label="Time until BlastOff! 2026"></div>' +
          '<p class="micro">400+ attendees · 20+ partners · ' +
            '40+ partner societies</p>' +
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
            '<figure class="plate wide rise" style="margin-top:clamp(36px,5vw,72px)">' +
              photo('fair-floor',
                'A crowded exhibition hall of students moving between employer booths at BlastOff!',
                '(max-width:900px) 92vw, 1320px') +
              '<figcaption>Hundreds of students, dozens of organisations, one afternoon.</figcaption>' +
            '</figure>' +
          '</section>' +

          '<section class="sec" id="why">' +
            '<div class="doing">' +
              '<div>' + eyebrow('02', 'Why visit') +
                '<h2 style="max-width:18ch">What you can do at <em>BlastOff!</em></h2></div>' +
              '<div class="pills" style="margin-top:clamp(34px,4.6vw,64px)">' + doings + '</div>' +
            '</div>' +
            '<div style="margin-top:clamp(56px,8vw,104px)">' + figs + '</div>' +
          '</section>' +

          '<section class="sec" id="goh">' +
            eyebrow('03', 'Guest-of-Honour') +
            '<div class="goh-grid">' +
              '<div class="goh-copy">' +
                '<h2>Meet our<br><em>Guest-of-Honour</em></h2>' +
                '<p class="lede rise">' + esc(GOH.intro) + '</p>' +
                '<p class="role">' + esc(GOH.role) + '</p>' +
                '<div class="body rise">' +
                  GOH.paragraphs.map((p) => '<p>' + esc(p) + '</p>').join('') +
                  '<p>We look forward to his sharing at BlastOff! 2026!</p>' +
                '</div>' +
                '<p class="goh-facts">' + esc(EVENT.dateLabel) + ' · ' + esc(EVENT.timeLabel) +
                  ' · ' + esc(EVENT.venueShort) + ' · ' + esc(EVENT.venueDetail) + '</p>' +
                '<p style="margin-top:24px">' + ticketBtn('btn-solid') + '</p>' +
              '</div>' +
              '<figure class="goh-visual rise">' +
                '<img src="' + esc(CONFIG.gohImage) + '" alt="' + esc(GOH.name + ', ' + GOH.role) + '"' +
                  ' width="1024" height="1280" loading="lazy" decoding="async">' +
                '<figcaption>Guest-of-Honour · BlastOff! 2026</figcaption>' +
              '</figure>' +
            '</div>' +
          '</section>' +

          '<section class="sec" id="flow">' +
            eyebrow('04', 'Event flow') +
            '<h2>Programme<br><em>Schedule</em></h2>' +
            '<p class="flow-intro rise">A loose guide to the afternoon — come early, stay curious and leave with new connections.</p>' +
            '<div class="flow-label"><span>Time (SGT)</span><span>Programme Item</span></div>' +
            '<div class="flow-list">' + flowRows + '</div>' +
          '</section>' +
        '</div>' +

        '<section class="sec" aria-labelledby="gal-h">' +
          '<div class="wrap rail-head">' +
            '<div>' + eyebrow('05', 'Gallery') +
              '<h2 id="gal-h">See what<br>BlastOff! <em>is like</em></h2>' +
              '<p class="lede rise" style="max-width:40ch;font-size:clamp(17px,1.7vw,20px)">' +
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

        '<section class="sec" id="partners">' +
          '<div class="wrap">' + eyebrow('06', 'Partners') +
            '<h2>Meet the organisations<br><em>looking for talent like you</em></h2></div>' +
          '<div class="band">' +
            '<div class="wrap">' +
              '<p class="band-intro">More than twenty participating organisations across ' +
                'finance, consulting, technology, energy and Singapore’s public service.</p>' +
              '<ul class="sectors">' + sectors + '</ul>' +
            '</div>' +
            tiers +
          '</div>' +
          '<div class="wrap">' +
            '<h3 class="sub-h">Partner profiles</h3>' +
            profiles +
          '</div>' +
        '</section>' +

        '<div class="wrap">' +
          '<section class="sec" id="legacy" aria-label="Legacy">' +
            eyebrow('07', 'Legacy') +
            '<div class="split">' +
              '<div>' + legacy + '</div>' +
              '<figure class="plate tall rise">' +
                photo('legacy-banner',
                  'A roll-up banner carrying the UKSSC crest and the BlastOff! logo used at an earlier edition',
                  '(max-width:900px) 92vw, 560px') +
                '<figcaption>From the 2025 edition of BlastOff!</figcaption>' +
              '</figure>' +
            '</div>' +
          '</section>' +

          '<section class="sec" id="getting-there">' +
            eyebrow('08', 'Getting there') +
            '<div class="split">' +
              '<div>' +
                '<h2 style="font-size:clamp(28px,4.2vw,54px);color:var(--lime)">' +
                  'Suntec Convention Centre</h2>' +
                '<div class="body" style="margin-top:20px">' +
                  '<p>Convention &amp; Exhibition Centre<br>' + esc(EVENT.venueDetail) +
                  '<br>1 Raffles Boulevard</p>' +
                  '<p>' + esc(EVENT.dateLabel) + '<br>' + esc(EVENT.timeLabel) + '</p></div>' +
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
            eyebrow('09', 'Questions') +
            '<h2 style="margin-bottom:clamp(26px,3.4vw,46px)">FAQs</h2>' + faqs +
          '</section>' +

          '<section class="close" aria-labelledby="close-h">' +
            '<h2 id="close-h">Take your career aspirations<br><em>to new horizons</em></h2>' +
            '<p>Meet employers, explore global pathways and reconnect with Singapore’s ' +
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
        // SGN is not repeated here: it belongs in the community partner tier
        // and nowhere else.
        '<div class="presented">' +
          '<div><small>proudly presented by</small>' +
            '<img src="' + esc(CONFIG.crestImage) + '" alt="UKSSC"></div>' +
          '<p class="foot-tagline">' + esc(EVENT.tagline) + '</p>' +
        '</div>' +
        '<div class="foot-cols">' +
          '<div><h3>Event</h3><ul>' +
            '<li><a href="' + esc(CONFIG.ticketsUrl) + '" target="_blank" rel="noopener">' +
              TICKET_LABEL + '</a></li>' +
            '<li><a href="#partners">Partners</a></li>' +
            '<li><a href="#faqs">FAQs</a></li>' +
            '<li><a href="' + esc(TRAVEL.mapUrl) + '" target="_blank" rel="noopener">Getting there</a></li>' +
          '</ul></div>' +
          // Real destinations on theukssc.co.uk, not the "#" stubs this column
          // used to carry.
          '<div><h3>The UKSSC</h3><ul>' +
            '<li><a href="#legacy">Our legacy</a></li>' +
            ext(UKSSC.about, 'About the council') +
            ext(UKSSC.committee, 'Our committee') +
            ext(UKSSC.societies, 'Partner societies') +
            ext(UKSSC.constitution, 'Our constitution') +
          '</ul></div>' +
          '<div><h3>Connect</h3><ul>' +
            ext(UKSSC.instagram, 'Instagram') +
            ext(UKSSC.telegram, 'Telegram') +
            ext(UKSSC.linkedin, 'LinkedIn') +
            ext(UKSSC.facebook, 'Facebook') +
            '<li><a href="mailto:' + esc(CONFIG.contactEmail) + '">' +
              esc(CONFIG.contactEmail) + '</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<p class="copy">© 2026 United Kingdom Singapore Student Council · Draft, not the live page</p>' +
      '</footer>' +
    '</div>' +

    '<div class="dock" id="dock">' +
      '<p><b>' + esc(EVENT.dateLabel) + '</b> · ' + esc(EVENT.timeLabel) + ' · ' +
        esc(EVENT.venueShort) + ' · free</p>' +
      '<span class="grp">' +
        '<button class="top" id="to-top" type="button" aria-label="Back to top">↑</button>' +
        ticketBtn('btn-solid') +
      '</span>' +
    '</div>';
  }

  /* -------------------------------------------------------------- element */

  class Blastoff extends HTMLElement {
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
      this._progress(root);
      this._nav(root);
      this._logos(root);
      this._rail(root);
      this._marquees(root);
      this._faqs(root);
      this._fitPills(root);
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
      if (this._progStop) this._progStop();
      if (this._revealGuard) clearTimeout(this._revealGuard);
      if (this._pillFit) this._pillFit();
      document.documentElement.style.overflow = '';
    }

    // The second track in each carousel ships in the markup with aria-hidden.
    // Give it the same treatment loopTrack gives the ones it generates, so
    // hand-written and runtime duplicates behave identically.
    _hardenClones(root) {
      root.querySelectorAll('.rail-set[aria-hidden="true"],.marquee-set[aria-hidden="true"]')
        .forEach(hideDuplicate);
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
      ['about', 'why', 'goh', 'flow', 'partners', 'legacy', 'getting-there', 'faqs'].forEach((id) => {
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
          // A partner's own minimum size overrides our optical normalisation.
          const min = Number(img.dataset.minWidth) || 0;
          if (min && h * r < min) h = min / r;
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
      // Slower than the logo bands: these are photographs, and 34px/s across a
      // 600px frame reads as a twitch. Pauses on hover and on keyboard focus,
      // and loopTrack drops it entirely under prefers-reduced-motion.
      const loop = loopTrack(rail, track, { autoplay: 20 });
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

    /* Make the staircase span the full column without wrapping any capsule.
     *
     * A fixed percentage step cannot do both. Tuned by hand, 8.31% was the
     * exact value where the longest line filled the remaining width — one more
     * word of copy and it wrapped, a shorter line and the row stopped short of
     * the margin. So measure instead: find the widest capsule at its natural
     * width, then divide the leftover space evenly across the steps. The last
     * capsule lands flush with the right margin whatever the copy says.
     *
     * Measured after fonts settle, because the fallback face is a different
     * width and would give the wrong answer.
     */
    _fitPills(root) {
      const list = root.querySelector('.pills');
      if (!list) return;
      const pills = [...list.querySelectorAll('.pill')];
      if (pills.length < 2) return;

      const naturalWidth = (p) => {
        const w = p.style.width, m = p.style.maxWidth;
        p.style.maxWidth = 'none';
        p.style.width = 'max-content';
        const r = p.getBoundingClientRect().width;
        p.style.width = w;
        p.style.maxWidth = m;
        return r;
      };

      const fit = () => {
        // Below the breakpoint the capsules go full width and the step is 0.
        if (matchMedia('(max-width:760px)').matches) {
          list.style.removeProperty('--step');
          return;
        }
        const col = list.clientWidth;
        if (!col) return;
        const widest = pills.reduce((m, p) => Math.max(m, naturalWidth(p)), 0);
        const step = Math.max(0, (col - widest - 2) / (pills.length - 1));
        list.style.setProperty('--step', step.toFixed(2) + 'px');
      };

      fit();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
      // Window resize only — observing the list itself would loop, since the
      // step it sets changes the wrapping and therefore the list's height.
      window.addEventListener('resize', fit);
      this._pillFit = () => window.removeEventListener('resize', fit);
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
          list.innerHTML = '<span class="msg">Happening now — Suntec Convention Centre, Level 3 Summit 1</span>';
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
                ' at Suntec Convention Centre. Free admission.',
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

  customElements.define(TAG, Blastoff);
})();
