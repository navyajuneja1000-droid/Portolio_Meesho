/* =========================================================
   Navya Juneja · portfolio content, written for Meesho PM roles
   Every figure carries a provenance label:
   result = achieved · built = shipped/working · modelled = my assumption
   target = success criterion · sourced = external / survey, cited
   ========================================================= */
window.NJ = {
  person: {
    name: "Navya Juneja",
    role: "Product & Strategy",
    location: "Gurgaon, India · open to relocating",
    email: "navyajuneja1000@gmail.com",
    phone: "+91 85568 17288",
    phoneHref: "tel:+918556817288",
    linkedin: "https://www.linkedin.com/in/junejanavya/",
    linkedinShort: "linkedin.com/in/junejanavya",
    resume: "Navya_Juneja_Meesho_PM.pdf",
    portfolio: "https://personalportfolio-lilac-tau.vercel.app/"
  },

  prov: {
    result:   { label: "Result",   tip: "Achieved" },
    built:    { label: "Built",    tip: "Working product you can open" },
    modelled: { label: "Modelled", tip: "My assumption, stated" },
    target:   { label: "Target",   tip: "Success criterion" },
    sourced:  { label: "Sourced",  tip: "External or survey data, cited" }
  },

  sellers: {
    phonepe: { name: "PhonePe", sub: "Payments · Jun 2023 – Jun 2025", logo: "assets/logos/phonepe.svg", mall: true },
    cogent:  { name: "Cogent Infotech", sub: "Product Development · Aug 2025 – Jun 2026", logo: "assets/logos/cogent.svg" },
    mu:      { name: "Masters' Union", sub: "PGP-TBM · team ventures", logo: "assets/logos/masters-union.svg" },
    navya:   { name: "Navya Juneja", sub: "Independent builds", logo: "assets/logos/navya.svg" }
  },

  cats: [
    { id: "all",      name: "All Products",       hi: "सभी प्रोडक्ट",   icon: "grid" },
    { id: "payments", name: "Payments & Fintech", hi: "पेमेंट्स",        icon: "rupee" },
    { id: "build",    name: "0→1 Builds",         hi: "0→1 बिल्ड",       icon: "rocket" },
    { id: "seller",   name: "Seller & D2C",       hi: "सेलर और D2C",    icon: "store" },
    { id: "gtm",      name: "GTM & Pricing",      hi: "GTM और प्राइसिंग", icon: "tag" },
    { id: "process",  name: "Process Design",     hi: "प्रोसेस डिज़ाइन",  icon: "flow" },
    { id: "live",     name: "Live Builds",        hi: "लाइव बिल्ड",      icon: "live" },
    { id: "mall",     name: "PhonePe Mall",       hi: "PhonePe मॉल",    icon: "mall" }
  ],

  /* ---------------- PRODUCTS (case studies + PhonePe wins) ---------------- */
  products: [
    {
      id: "reconos", code: "CASE-01", seller: "navya", cats: ["payments", "build", "seller"],
      name: "ReconOS — Revenue recovery for D2C brands",
      short: "ReconOS", kind: "Shipped product", badge: "Live", date: "Oct 2026 – present", sort: 202610,
      price: { v: "17", u: "leakage checks", strike: "", off: "57 engine tests", prov: "built" },
      hook: "Traces every order from sale to bank — and writes the claim email.",
      poster: { bg: "#2A0E2E", fg: "#FFE0F2", accent: "#F43397", big: "17", small: "leakage checks · 6 gateways · 9 couriers" },
      media: [
        { type: "video", src: "assets/work/reconos-teaser.mp4", poster: "assets/work/reconos-teaser-poster.jpg", alt: "ReconOS, 30-second product teaser" }
      ],
      links: [{ t: "Open reconos.in", u: "https://www.reconos.in" }],
      meesho: "COD remittances that land short, shipping charged above the rate card, return charges on orders that were delivered — the leaks a small Indian seller lives with every month.",
      summary: {
        problem: "D2C brands pay a payment gateway and a courier for every order. Both deduct their own fees, and nobody checks either against the agreed rate card. A ₹14 overcharge on one shipment is invisible; across a month of orders it is a salary.",
        did: "A browser-based audit. Drop in last month's exports and the rate cards, and every order is traced from sale to bank, with a claim email ready to send.",
        landed: "Live at reconos.in and in early access. No customers or recovered amounts yet — and the page says so."
      },
      details: [
        ["My role", "Problem definition, scope, the checks themselves, pricing, and the build"],
        ["Output", "Working product, 57 engine tests, live site, early-access sign-up"],
        ["Category", "Revenue recovery for Indian Shopify D2C brands · Live MVP"],
        ["When", "October 2026 – present"]
      ],
      metrics: [
        { v: "6 + 9", l: "gateways and couriers supported by name", p: "built" },
        { v: "17", l: "leakage checks in five families", p: "built" },
        { v: "57", l: "engine tests — one fails if a planted leak is missed or a clean order is flagged", p: "built" }
      ],
      sections: [
        { h: "The pivot: narrowing the buyer made it buildable",
          p: "The first scope was transaction-level reconciliation for merchants doing ₹100 Cr of online GMV. The problem was real; the buyer was wrong. That merchant has a finance team — a slow, committee-shaped sale — and for them the gateway is only half the leak. In Indian D2C the courier takes more money than the gateway does. So the scope moved: one platform (Shopify), one buyer (the founder), both sides of the leak.",
          compare: [["Before", "Mid-market merchants, gateway reconciliation, a finance team as buyer."], ["Now", "D2C brands on Shopify, courier and gateway, the founder as buyer, a free first audit."]] },
        { h: "Where the money goes missing",
          list: ["COD never remitted", "Shipping above the rate card", "COD fee on prepaid orders", "Return charges on delivered orders", "Weight disputes past their deadline", "Gateway fee above the rate card", "Wrong GST on the fee", "Paid but never settled"] },
        { h: "How it works",
          steps: [["Drop in last month's files", "CSV or Excel exports from Shopify, every gateway and every courier — each recognised and matched to its partner."], ["Confirm the rate cards", "What the brand agreed to pay each partner. Without it there is nothing to compare against."], ["Audit, then claim", "Every order traced from sale to partner to bank, every finding carrying its evidence, and a ready-to-send email per partner."]] },
        { h: "The decision worth defending: Claim vs Check",
          p: "A tool that tells a founder to argue with their courier is only useful if it is right. 'Claim' means the brand's own files prove it. 'Check' means something does not add up but cannot be proven from the files alone. When a gateway file doesn't say credit or debit, the fee is checked against the highest rate it could have been — deliberately under-claiming. Finding less, and being right about it, is the product." },
        { h: "The adoption problem: nobody types in rate cards",
          p: "The audit cannot run without rate cards, and asking a founder to type zone-and-weight pricing for four partners is where tools like this quietly die. So ReconOS pre-fills each rate card from what the brand was actually charged most often, and reads the real one from whatever form it exists in — a PDF, a screenshot, an Excel sheet or pasted email text. Screenshots are read on the device; files never leave the browser." }
      ]
    },

    {
      id: "mid", code: "CASE-02", seller: "navya", cats: ["payments", "process", "build"],
      name: "MID Procurement Automation — event-sourced ops system",
      short: "MID Procurement", kind: "System design & live build", badge: "Live build", date: "Sep 2026 – present", sort: 202609,
      price: { v: "99.0%", u: "bank replies auto-applied", strike: "", off: "283 tests", prov: "modelled" },
      hook: "Four teams, six banks, and nobody could say where the weeks went.",
      poster: { bg: "#F3E8FF", fg: "#3B1361", accent: "#9F2089", big: "99.0%", small: "bank replies applied without a human" },
      media: [
        { type: "img", src: "assets/work/mid-scorecard.png", alt: "Acquirer scorecard from the MID procurement dashboard" },
        { type: "img", src: "assets/work/mid-timeline.png", alt: "Per-request timeline with overlapping party clocks" }
      ],
      links: [
        { t: "Open the live build", u: "https://workflowmidprocurement.vercel.app/" },
        { t: "Read the PRD", u: "https://github.com/navyajuneja1000-droid/MID-Procurement-Workflow/blob/HEAD/PRD.md" },
        { t: "The repository", u: "https://github.com/navyajuneja1000-droid/MID-Procurement-Workflow" }
      ],
      meesho: "Seller onboarding at scale is the same shape of problem: many parties, one request, and a tracker that can say something is late but not whose time it was.",
      summary: {
        problem: "A merchant cannot go live until an acquiring bank issues a MID. Four teams and six banks touch every request, and the old tracker could show that a request was late but not where the time went.",
        did: "An event-sourced web app that times each party separately, reads bank replies out of the inbox, and checks intake data before it costs a bank cycle. Written up as a full PRD, with 283 tests.",
        landed: "99.0% of bank replies applied without a human — measured on a seeded synthetic dataset (360 merchants, 1,376 requests, 626 bank emails), not live traffic."
      },
      details: [
        ["My role", "Built end to end — data model, turnaround rules, bank reply parser, intake checks and dashboard"],
        ["Output", "Working web application, tested against a seeded synthetic dataset"],
        ["Context", "MID procurement across Indian acquiring, generalised from operator experience · acquirer names invented"],
        ["When", "September 2026 – present"]
      ],
      metrics: [
        { v: "~1,000", l: "requests a month, run by three people from a hand-updated sheet", p: "modelled" },
        { v: "30–40%", l: "of requests bounced by the bank for missing information", p: "modelled" },
        { v: "283", l: "tests, each one a rule from the PRD written down", p: "built" }
      ],
      sections: [
        { h: "Get the unit of work right, and the clocks follow",
          p: "The unit of work is merchant + MCC + acquirer, not merchant + acquirer. One merchant can run several use cases, each needing its own merchant category code and MID request — which is why bank replies are matched on legal name plus MCC. A one-row-per-merchant sheet cannot hold this at all." },
        { h: "Turnaround rules",
          list: ["Working days only, per acquirer holiday calendar", "A 2pm cut-off — after it, the bank's clock starts next working day", "Ops time measured per pickup; the pickup count is the rework measure", "Hands-on vs waiting split, so ops efficiency excludes the bank's queue"] },
        { h: "Why there's no share-of-delay pie chart",
          p: "Clocks overlap: ops runs alongside the acquirer, onboarding alongside BD. Per-party days add up to more than elapsed time, so a pie chart would be arithmetically wrong. The honest picture is a timeline per request." },
        { h: "Judging the bank fairly",
          compare: [["Rejected", "SLA on total time — bills the bank for days the request sat with us gathering a document."], ["Chosen", "SLA on the slowest single response round — each round is the bank's own time."]] },
        { h: "What was built",
          steps: [["Turnaround engine", "Event-sourced: nothing stores 'TAT = 5 days'. Every figure derives from an immutable log, so a rule change recalculates history."], ["Bank reply parser", "Reads tables, numbered lists and attached sheets out of the inbox and turns them into events."], ["Intake readiness check", "Per-acquirer field requirements catch a request that would bounce before it costs a cycle."]] }
      ]
    },

    {
      id: "foundit", code: "CASE-03", seller: "mu", cats: ["seller", "gtm"],
      name: "Found It — Jaipur-sourced D2C brand, run on a weekly P&L",
      short: "Found It", kind: "Venture building · team venture", badge: "Real revenue", date: "Jul – Sep 2026", sort: 202607,
      price: { v: "₹6.94 L", u: "revenue in 3 months", strike: "", off: "10.1% EBT", prov: "result" },
      hook: "Sourcing from Jaipur workshops, selling at Gurugram stalls.",
      poster: { bg: "#FFF1D6", fg: "#5A2A00", accent: "#E8730C", big: "₹6.94 L", small: "revenue · 3 months · real customers" },
      media: [],
      links: [],
      meesho: "This is the closest thing on here to a Meesho seller's life: picking designs from workshops, deciding bulk versus variety, pricing for a ~₹800 basket, and packing orders for Shiprocket.",
      summary: {
        problem: "Build an ethnic and lifestyle retail brand from nothing with a Masters' Union team: source from Jaipur workshops, sell at Gurugram stalls, and make it pay inside three months.",
        did: "Led sourcing, sales and people management, ran the venture on a weekly P&L, and opened a corporate gifting channel through cold emails and catalogues.",
        landed: "₹6.94 L revenue in three months at 13.1% gross margin and 10.1% EBT, from real customers. The B2B gifting channel brought in 62% of it."
      },
      details: [
        ["My role", "Led sourcing, sales and people management"],
        ["Team", "Co-launched with a Masters' Union team"],
        ["When & where", "July – September 2026 · Gurugram"],
        ["Source of truth", "The weekly P&L workbook — every number here comes from it"]
      ],
      metrics: [
        { v: "₹6,93,559", l: "revenue, three months", p: "result" },
        { v: "₹4,33,900", l: "B2B corporate gifting (62%)", p: "result" },
        { v: "₹2,59,659", l: "B2C at stalls", p: "result" },
        { v: "13.1%", l: "gross margin", p: "result" },
        { v: "10.1%", l: "EBT", p: "result" },
        { v: "~₹800", l: "average order value", p: "result" }
      ],
      sections: [
        { h: "Operations",
          list: ["Stock tracking", "Order packing", "Shiprocket fulfilment", "Weekly P&L", "Cash tracking"] },
        { h: "Trade-offs that came up every week",
          compare: [["Variety vs depth", "Many designs spread the risk of a flop; fewer designs in depth earn better workshop rates."], ["Bulk rates vs unsold stock", "A lower unit cost only helps if the stock sells inside three months."], ["Sourcing vs selling", "Hours with workshops are hours not spent at the stall or with corporate buyers."], ["Footfall vs location cost", "A busier stall brings more customers and costs more to run."]] },
        { h: "One thing worth building",
          p: "A product-level P&L that restocks by sales velocity. Our P&L was weekly and manual: it showed the venture's profit but not which products made it. The next version tracks margin and sell-through per product, so sourcing follows what actually sells." }
      ]
    },

    {
      id: "routeiq", code: "CASE-04", seller: "navya", cats: ["payments"],
      name: "RouteIQ — dynamic payment routing, written as a PRD",
      short: "RouteIQ", kind: "PRD & trade-off design", badge: "Prototype", date: "", sort: 202606,
      price: { v: "6", u: "deliberate non-goals", strike: "", off: "4 guardrails", prov: "target" },
      hook: "Static routing rules can't see a gateway degrade. This is the general fix.",
      poster: { bg: "#E6F6F0", fg: "#0B4A35", accent: "#038D63", big: "≥ 2 pp", small: "payment success target · 4 guardrails" },
      media: [],
      links: [{ t: "Open the prototype", u: "https://route-wise-ai-51.lovable.app" }],
      meesho: "Every failed prepaid checkout is a buyer who either drops off or flips to COD. Routing is where a payments PM quietly moves conversion.",
      summary: {
        problem: "A gateway that was the right choice this morning can be the wrong one this afternoon. Static rules keep sending traffic into a degraded path until a human notices — and by then the transactions are lost.",
        did: "The PRD for an MVP routing engine: success and guardrail metrics, six deliberate non-goals, edge cases, and a working prototype.",
        landed: "A specification and prototype, not a shipped product. It generalises routing work I did at PhonePe that saved ₹8 Cr a year."
      },
      details: [
        ["My role", "Problem framing, PRD, success and guardrail metrics, scope boundaries"],
        ["Output", "Product requirements document for an MVP routing engine"],
        ["Users", "Enterprise merchants running multiple gateways; payment ops and finance teams"]
      ],
      metrics: [
        { v: "≥ 2 pp", l: "payment success rate improvement", p: "target" },
        { v: "≥ 10%", l: "fall in routing-related failures", p: "target" },
        { v: "≥ 50%", l: "of eligible transactions routed via the engine in 3 months", p: "target" },
        { v: "≥ 30%", l: "fewer manual routing interventions", p: "target" }
      ],
      sections: [
        { h: "Product principle",
          p: "The routing engine should optimise for merchant business outcomes, not simply maximise payment success rate." },
        { h: "Four things not to break (guardrails)",
          list: ["Average processing cost per transaction — the price of a higher success rate", "Payment latency — a late routing decision is a failed checkout", "Merchant complaints — the signal before the metrics move", "Incorrect routing incidents — the engine doing the wrong thing confidently"] },
        { h: "Six things it deliberately does not do",
          list: ["Onboard new gateways automatically", "Negotiate gateway pricing", "Build a payment gateway", "Optimise fraud detection", "Change merchant business rules automatically", "Support every payment method at launch"] },
        { h: "Why the PRD names no algorithm",
          p: "A product manager should say what and why, and let engineering determine how." }
      ]
    },

    {
      id: "h2h", code: "CASE-05", seller: "cogent", cats: ["gtm", "build"],
      name: "H2H — 0→1 career-prep product: pricing, funnel & launch",
      short: "H2H at Cogent", kind: "Professional · 0→1 product", badge: "Launched", date: "Aug 2025 – Jun 2026", sort: 202508,
      price: { v: "~300", u: "sign-ups in 2 months", strike: "~65", off: "4.6× growth", prov: "result" },
      hook: "From a competitor gap to a priced, packaged, launch-ready business.",
      poster: { bg: "#E3EEFF", fg: "#0B3C7D", accent: "#1C6DD0", big: "65 → 300", small: "sign-ups in two months" },
      media: [],
      links: [],
      meesho: "Pricing on the outcome the buyer is stuck at — not on feature count — is the same instinct behind value tiers for price-sensitive Bharat users.",
      summary: {
        problem: "US job seekers were buying point solutions — CV writers, LinkedIn optimisers, interview coaching — and still not getting callbacks.",
        did: "Drove the pivot from a long-cycle ISA product to H2H, an expert-led program: 7-module bundle, personas, 3-tier pricing, a 4-week launch plan and an 8-stage funnel.",
        landed: "~65 → ~300 sign-ups in two months through funnel-led CTAs, including a free résumé audit mapped into the website flow with Engineering."
      },
      details: [
        ["My role", "Assistant Project Manager — product definition, personas, pricing, GTM, funnel modelling"],
        ["When", "Aug 2025 – Jun 2026 · Remote"],
        ["Market", "US job seekers, twenty ranked states, five Tier A launch markets"],
        ["Output", "7-module bundle, 3-tier pricing, 4-week launch plan, funnel model"]
      ],
      metrics: [
        { v: "60+", l: "customer interviews", p: "result" },
        { v: "15+", l: "competitors benchmarked across 20 US states", p: "result" },
        { v: "48.2M → 365", l: "reach modelled down an 8-stage funnel to a ~$349K launch target", p: "modelled" },
        { v: "4 teams", l: "Marketing, Sales, Delivery and Tech aligned on MVP scope", p: "result" }
      ],
      sections: [
        { h: "Priced on where the buyer is stuck",
          tiers: [["Interview Accelerator", "$499", "Stuck before the interview"], ["Offer Builder", "$899", "Stuck at conversion"], ["Offer Accelerator", "$1,300", "Stuck at the offer"]],
          p: "Each tier is named for the point in the hiring funnel where that buyer is failing, so the upgrade path is a diagnosis rather than an upsell. Tiers tie service scope to SLAs and map to outcomes — interview calls, conversion, offer close." },
        { h: "Two personas, failing for opposite reasons",
          compare: [["The Tech Transitioner · 22.6M", "26–40, moving into tech from sales, ops, teaching. Real skills buried in non-tech language; no portfolio."], ["The ATS Victim · 25.6M", "22–35, already qualified, 50–100+ applications a week off one generic résumé, auto-rejected on keywords."]] },
        { h: "Launch",
          p: "A 4-week GTM across three launch phases and three acquisition channels, each matched to a persona. Addressable figures are platform-derived estimates (Modelled)." }
      ]
    },

    {
      id: "prolectro", code: "CASE-06", seller: "mu", cats: ["gtm"],
      name: "Prolectro — clear protein sachet, consumer research to GTM",
      short: "Prolectro", kind: "GTM strategy · proposed, not launched", badge: "Proposed", date: "Sep 2026", sort: 202609,
      price: { v: "₹129", u: "per sachet", strike: "₹166", off: "vs nearest rival", prov: "target" },
      hook: "Protein people will actually finish — built for the 23% who bought once and quit.",
      poster: { bg: "#FFE7EC", fg: "#7A0F2E", accent: "#E5345B", big: "41 of 74", small: "who tried protein powder had stopped" },
      media: [
        { type: "img", src: "assets/work/prolectro-pack.jpg", alt: "Prolectro Refresh sachet pack" },
        { type: "img", src: "assets/work/prolectro-keyvisual.jpg", alt: "Prolectro campaign key visual" },
        { type: "img", src: "assets/work/prolectro-flavours.jpg", alt: "Six proposed flavours in two families" },
        { type: "video", src: "assets/work/prolectro-teaser.mp4", poster: "assets/work/prolectro-teaser-poster.jpg", alt: "Prolectro campaign teaser" }
      ],
      links: [{ t: "Open the waitlist page", u: "https://partner-project-glow.lovable.app" }],
      meesho: "Price-led positioning for a value-conscious buyer: ₹129 is on the creative because ₹129 is the argument.",
      summary: {
        problem: "41 of the 74 surveyed people who had tried protein powder had stopped. Could a product win back the people who bought protein once and quit?",
        did: "Created the brand; owned positioning, product definition and pricing; ran the 101-person survey the strategy argues from. Team of five.",
        landed: "A go-to-market plan with launch gates and campaign assets. Proposed, never commercially launched — and labelled as such."
      },
      details: [
        ["My role", "Created the brand; positioning, product definition, pricing, primary research"],
        ["Team", "Five people · Masters' Union"],
        ["Research", "101 urban respondents, 12-question survey, September 2026"],
        ["Status", "Proposed, never commercially launched"]
      ],
      metrics: [
        { v: "55%", l: "of everyone who tried protein powder walked away (41 of 74)", p: "sourced" },
        { v: "47%", l: "found shakes too thick or filling", p: "sourced" },
        { v: "23%", l: "are Lapsed Intenders — the chosen customer", p: "sourced" },
        { v: "₹125", l: "Lapsed Intender mean willingness to pay — highest of four segments", p: "sourced" }
      ],
      sections: [
        { h: "The insight",
          p: "India buys the protein argument, not the habit. People rejected drinking it, not the protein. So the target is people who already quit: they accepted the argument, pay the most, and left for the exact reason a clear sachet removes." },
        { h: "The product",
          p: "Prolectro Refresh: one 36g sachet, 11g whey isolate plus electrolytes, mixed into 500–750ml of water. ₹129 a single serve, against ₹166–176 for the nearest combined product." },
        { h: "Honest caveat",
          p: "101 urban respondents is directional evidence, not proof of national demand. The credible next step is a small pilot that tests price, retention and channel before anything else is built." }
      ]
    },

    /* ---------- PhonePe Mall — professional wins ---------- */
    {
      id: "pp-routing", code: "PP-01", seller: "phonepe", cats: ["payments", "mall"],
      name: "Merchant payment routing across Cards & NetBanking",
      short: "Routing logic", kind: "PhonePe · Senior Ops Analyst", badge: "Mall", date: "2024 – 2025", sort: 202407,
      price: { v: "₹8 Cr", u: "saved / year", strike: "", off: "+4 pp success", prov: "result" },
      hook: "Optimised acquiring-bank allocation and routing for ₹500+ Cr TPV travel merchants.",
      poster: { bg: "#5F259F", fg: "#FFFFFF", accent: "#C9A8FF", big: "₹8 Cr", small: "annualised savings from routing" },
      media: [], links: [],
      meesho: "Routing decisions are made weekly, on SQL dashboards of success rates, bank traffic and error codes.",
      summary: {
        problem: "Travel merchants like ixigo and MakeMyTrip push ₹500+ Cr of TPV through card and netbanking rails, where the wrong acquirer allocation costs money and conversions every day.",
        did: "Optimised acquiring-bank allocation and payment routing across Cards and NetBanking; A/B tested routes with Growth, Engineering, Success and Testing.",
        landed: "₹8 Cr saved annually, and a +4 pp lift in travel payment success."
      },
      details: [["Role", "Senior Operations Analyst – Product & Payments"], ["When", "Jul 2024 – Jun 2025 · Bengaluru"], ["Partners", "Growth, Engineering, Success, Testing"]],
      metrics: [
        { v: "₹8 Cr", l: "saved annually", p: "result" },
        { v: "+4 pp", l: "travel payment success from A/B tested routes", p: "result" },
        { v: "Weekly", l: "routing decisions from SQL dashboards", p: "result" }
      ],
      sections: []
    },
    {
      id: "pp-recon", code: "PP-02", seller: "phonepe", cats: ["payments", "mall", "process"],
      name: "Historical payment reconciliation recovery",
      short: "Recon recovery", kind: "PhonePe · Finance & Recon", badge: "Mall", date: "2024 – 2025", sort: 202406,
      price: { v: "₹15+ Cr", u: "recovered", strike: "", off: "with Finance & Recon", prov: "result" },
      hook: "Traced reconciliation mismatches and coordinated settlement fixes.",
      poster: { bg: "#3A0E6B", fg: "#FFFFFF", accent: "#FFD166", big: "₹15+ Cr", small: "recovered from reconciliation" },
      media: [], links: [],
      meesho: "The expensive failures are the quiet ones — money that drifts rather than money that disappears.",
      summary: {
        problem: "Mismatches between what was transacted and what settled don't throw errors. They drift.",
        did: "Led historical payment reconciliation with the Finance and Recon teams — tracing mismatches and coordinating settlement fixes.",
        landed: "₹15+ Cr recovered. It's also why ReconOS exists."
      },
      details: [["Teams", "Finance, Recon"], ["Where", "PhonePe · Bengaluru"]],
      metrics: [{ v: "₹15+ Cr", l: "recovered", p: "result" }],
      sections: []
    },
    {
      id: "pp-migration", code: "PP-03", seller: "phonepe", cats: ["payments", "mall"],
      name: "Acquiring-bank traffic migration in three months",
      short: "Bank migration", kind: "PhonePe · Payments", badge: "Mall", date: "2024 – 2025", sort: 202405,
      price: { v: "95%", u: "traffic migrated", strike: "", off: "in 3 months", prov: "result" },
      hook: "Phased routing shifts with live monitoring — without breaking merchant success rates.",
      poster: { bg: "#EFE6FB", fg: "#3A0E6B", accent: "#5F259F", big: "95%", small: "of payment traffic migrated in 3 months" },
      media: [], links: [],
      meesho: "Big migrations are won by phasing and monitoring, not by a launch date.",
      summary: {
        problem: "Moving payment traffic between acquiring banks risks merchant success rates at every step.",
        did: "Phased routing shifts with live monitoring.",
        landed: "95% of payment traffic migrated across acquiring banks in three months."
      },
      details: [["Approach", "Phased routing shifts, live monitoring"]],
      metrics: [{ v: "95%", l: "of payment traffic migrated", p: "result" }],
      sections: []
    },
    {
      id: "pp-golive", code: "PP-04", seller: "phonepe", cats: ["process", "mall"],
      name: "Merchant go-live: onboarding workflow & bulk config tool",
      short: "Go-live workflow", kind: "PhonePe · Onboarding", badge: "Mall", date: "2023 – 2025", sort: 202306,
      price: { v: "53%", u: "cut in Cards go-live time", strike: "", off: "40% NetBanking", prov: "result" },
      hook: "Mapped MID-to-live onboarding as a 10-stage workflow and removed the friction points.",
      poster: { bg: "#FFF4E0", fg: "#5A2A00", accent: "#5F259F", big: "360", small: "merchant go-lives in one upload" },
      media: [], links: [],
      meesho: "Faster seller go-live is a growth lever, not an ops metric.",
      summary: {
        problem: "Merchant go-live involved many stakeholder teams and slow handoffs.",
        did: "Mapped MID-to-live onboarding as a 10-stage workflow across stakeholder teams, and defined the requirements for a bulk configuration tool.",
        landed: "53% / 40% cut in go-live turnaround for Cards / NetBanking, and 360 merchant go-lives in one upload."
      },
      details: [["Workflow", "10 stages across stakeholder teams"]],
      metrics: [
        { v: "53% / 40%", l: "cut in go-live turnaround, Cards / NetBanking", p: "result" },
        { v: "360", l: "merchant go-lives in one upload", p: "result" }
      ],
      sections: []
    },
    {
      id: "pp-launches", code: "PP-05", seller: "phonepe", cats: ["payments", "mall", "build"],
      name: "Card network launches & bank integrations",
      short: "Network launches", kind: "PhonePe · Integrations", badge: "Mall", date: "2023 – 2025", sort: 202305,
      price: { v: "4", u: "launches", strike: "", off: "5+ integrations", prov: "result" },
      hook: "CVV-less payments, PAR API, Visa Direct and MoneySend — go-live coordinated with the card networks.",
      poster: { bg: "#E8E0F5", fg: "#3A0E6B", accent: "#5F259F", big: "4 + 5", small: "network launches · bank & PSP integrations" },
      media: [], links: [],
      meesho: "Owning requirements, UAT and go-live with an external partner is most of the job.",
      summary: {
        problem: "New card capabilities need coordinated go-live with networks, banks and PSPs.",
        did: "Owned requirements, UAT and go-live with partners.",
        landed: "4 launches (CVV-less, PAR API, Visa Direct, MoneySend) and 5+ bank and PSP integrations."
      },
      details: [["Launches", "CVV-less payments, PAR API, Visa Direct, MoneySend"]],
      metrics: [
        { v: "4", l: "network launches", p: "result" },
        { v: "5+", l: "bank and PSP integrations", p: "result" }
      ],
      sections: []
    }
  ],

  /* ---------------- MY ORDERS = experience, recent → old ---------------- */
  orders: [
    {
      id: "mu", type: "edu", org: "Masters' Union", logo: "assets/logos/masters-union.svg",
      title: "PGP in Technology & Business Management (PGP-TBM)", when: "2026 – Present", where: "Gurgaon",
      status: "ongoing", statusText: "In progress",
      body: "Technology, strategy and business transformation. Co-launched 2 revenue-generating ventures (₹7.3 L combined) and a live AI product.",
      related: ["foundit", "prolectro"]
    },
    {
      id: "cogent", type: "work", org: "Cogent Infotech", logo: "assets/logos/cogent.svg",
      title: "Assistant Project Manager – Product Development", when: "Aug 2025 – Jun 2026", where: "Remote",
      status: "delivered", statusText: "Delivered · Jun 2026",
      body: "Drove the pivot from a long-cycle ISA product to H2H (Human to Human), an expert-led US career-prep program. Owned discovery, requirements, pricing and the go-to-market plan behind it.",
      bullets: [
        ["~65 → ~300", "sign-ups in two months through funnel-led CTAs, including a free résumé audit built into the website flow with Engineering"],
        ["60+", "customer interviews to find the unmet needs behind one unified product"],
        ["15+", "competitors benchmarked across 20 US states → a 7-module bundle"],
        ["3 tiers", "priced at $499 / $899 / $1,300, tied to SLAs and outcomes"],
        ["48.2M", "addressable audience modelled down an 8-stage funnel to a 365-customer, ~$349K launch target"],
        ["4 teams", "Marketing, Sales, Delivery and Tech aligned on MVP scope and success metrics"]
      ],
      track: [["Joined", "Aug 2025"], ["H2H pivot", "Discovery & pricing"], ["Launch", "4-week GTM"], ["Delivered", "Jun 2026"]],
      related: ["h2h"]
    },
    {
      id: "phonepe-sr", type: "work", org: "PhonePe", logo: "assets/logos/phonepe.svg",
      title: "Senior Operations Analyst – Product & Payments", when: "Jul 2024 – Jun 2025", where: "Bengaluru",
      status: "delivered", statusText: "Delivered · Jun 2025",
      body: "Owned integrations, routing and onboarding for ₹500+ Cr TPV travel merchants, including ixigo and MakeMyTrip — the plumbing beneath the transactions.",
      bullets: [
        ["₹8 Cr", "saved annually by optimising acquiring-bank allocation and routing across Cards and NetBanking"],
        ["+4 pp", "travel payment success from A/B testing routes with Growth, Engineering, Success and Testing"],
        ["₹15+ Cr", "recovered by tracing reconciliation mismatches with Finance and Recon"],
        ["95%", "of payment traffic migrated across acquiring banks in three months"],
        ["4 launches", "CVV-less payments, PAR API, Visa Direct and MoneySend"]
      ],
      track: [["Promoted", "Jul 2024"], ["Routing & recon", "₹8 Cr + ₹15 Cr"], ["Migration", "95% in 3 months"], ["Delivered", "Jun 2025"]],
      related: ["pp-routing", "pp-recon", "pp-migration", "pp-launches"]
    },
    {
      id: "phonepe", type: "work", org: "PhonePe", logo: "assets/logos/phonepe.svg",
      title: "Operations Analyst – Payments", when: "Jun 2023 – Jun 2024", where: "Bengaluru",
      status: "delivered", statusText: "Delivered · Jun 2024",
      body: "Merchant onboarding, bank integrations and the go-live process.",
      bullets: [
        ["53% / 40%", "cut in go-live turnaround for Cards and NetBanking, by mapping MID-to-live as a 10-stage workflow"],
        ["360", "merchant go-lives in one upload, from defining requirements for a bulk configuration tool"],
        ["5+", "bank and PSP integrations — requirements, UAT and go-live with partners"],
        ["Weekly", "routing decisions informed by SQL dashboards of success rates, bank traffic and error codes"]
      ],
      track: [["Joined", "Jun 2023"], ["Onboarding", "10-stage workflow"], ["Bulk tool", "360 in one upload"], ["Promoted", "Jul 2024"]],
      related: ["pp-golive", "pp-launches"]
    },
    {
      id: "christ", type: "edu", org: "Christ University", logo: "assets/logos/christ.svg",
      title: "BBA (Hons), Finance · GPA 9.07/10", when: "2020 – 2023", where: "Bengaluru",
      status: "delivered", statusText: "Delivered · 2023",
      body: "Head of the theatre club; Student Council, Cultural Society and HR Club. Dissertation: UPI adoption in India — 211 users, 7 behavioural constructs, regression in SPSS. Trust, usability and perceived usefulness came out as the adoption drivers."
    },
    {
      id: "school", type: "edu", org: "Saint Kabir Public School", logo: "assets/logos/school.svg",
      title: "CBSE Class XII (Commerce) · 94.8%", when: "2018", where: "Chandigarh",
      status: "delivered", statusText: "Delivered · 2018",
      body: "Outclass Team President."
    }
  ],

  habits: [
    ["The expensive failures are quiet", "I gravitate to problems with no error message — money that drifts rather than money that disappears."],
    ["Metrics you can argue with", "I keep rejecting the flattering number in favour of the one that survives scrutiny."],
    ["Quantify before committing", "Market, funnel and unit economics get modelled before anything gets built or launched."],
    ["Deciding what not to build", "Non-goals, phasing and a manual first version — scope discipline as a deliverable."]
  ],

  offclock: [
    ["6", "first and second-place awards across national theatre competitions spanning 10+ colleges"],
    ["Top 15", "nationally at Mood Indigo, IIT Bombay, across 2,000+ entrants"],
    ["1st", "at the Masters' Union Startup Weekend, pitching a D2C pet-care venture against 20+ teams"],
    ["3rd", "pitching WOW! Momo's next FMCG category to its CEO — pricing, unit economics, SOM"],
    ["₹6 Cr", "a month: the plan pitched to Perfora's CEO to double revenue, 70% of it from fixing RTO, checkout and repeat purchase"],
    ["3", "inter-school Parliamentary Debate finals reached as semi-finalist or first runner-up"]
  ],

  certs: [
    ["Project Management", "Google · scoping, stakeholder alignment, risk planning, Agile delivery"],
    ["Financial Modelling & Valuation", "Udemy · three-statement modelling, DCF, unit economics"]
  ],

  faq: [
    ["Why Meesho?",
     "Because the problems I've spent three years on are Meesho-shaped. Two years inside PhonePe's payment rails — routing, settlement, reconciliation. A D2C venture sourcing from Jaipur workshops and selling on a ~₹800 basket. ReconOS, built around COD remittances, courier rate cards and RTO charges. A pitch to Perfora's CEO where 70% of the upside was fixing RTO, checkout and repeat purchase. Meesho is where those all meet, at a scale where small, quiet leaks add up to real money for sellers and buyers."],
    ["What roles are you looking for?",
     "Product management — payments and fintech, seller and supply-side products, or 0→1 teams that need someone comfortable in both the spreadsheet and the spec."],
    ["What do the Result / Built / Modelled labels mean?",
     "Every number on this page says where it came from. Result: achieved. Built: a working product you can open. Modelled: my own assumption, stated. Target: a success criterion. Sourced: external or survey data. If a project didn't launch, it says so."],
    ["Where are you based?",
     "Gurgaon, India — open to relocating, including Bengaluru."],
    ["Is any PhonePe data reproduced here?",
     "No. Figures are as stated on my CV. Underlying transaction data and internal documents are PhonePe's and are not reproduced."]
  ]
};
