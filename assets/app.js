/* meesho × navya — app logic (vanilla JS, hash routing) */
(function () {
  "use strict";
  var D = window.NJ, P = D.person;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var byId = {}; D.products.forEach(function (p) { byId[p.id] = p; if (p.links.length && p.cats.indexOf("live") < 0) p.cats.push("live"); });
  function host(u) { return u.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]; }

  /* ---------------- storage (per-viewer convenience only) ---------------- */
  function load(k, d) { try { var v = localStorage.getItem("mxn_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem("mxn_" + k, JSON.stringify(v)); } catch (e) {} }
  var S = {
    cart: load("cart", []).filter(function (id) { return byId[id]; }),
    wish: load("wish", []).filter(function (id) { return byId[id]; }),
    lang: load("lang", "en"),
    f: { sort: "rel", seller: [], prov: [], q: "" },
    orderTab: "all"
  };

  /* ---------------- i18n (UI chrome; case content stays in English) ---------------- */
  var T = {
    hello: ["Hello", "नमस्ते"], letsHire: ["let's hire!", "चलिए हायर करें!"],
    search: ["Search by Skill or Case ID", "स्किल या केस ID से खोजें"],
    home: ["Home", "होम"], categories: ["Categories", "कैटेगरी"], orders: ["My Orders", "मेरे ऑर्डर"], help: ["Help", "मदद"], account: ["Account", "अकाउंट"],
    sort: ["Sort", "सॉर्ट"], category: ["Category", "कैटेगरी"], company: ["Company", "कंपनी"], filters: ["Filters", "फ़िल्टर"],
    addCart: ["Add to Cart", "कार्ट में डालें"], buyNow: ["Hire Now", "अभी हायर करें"],
    forYou: ["Products For You", "आपके लिए प्रोडक्ट"], cart: ["Cart", "कार्ट"], wishlist: ["Wishlist", "विशलिस्ट"],
    similar: ["Similar Products", "मिलते-जुलते प्रोडक्ट"], details: ["Product Details", "प्रोडक्ट डिटेल्स"],
    highlights: ["Product Highlights", "खास बातें"], soldBy: ["Sold by", "विक्रेता"], more: ["More Information", "और जानकारी"],
    viewShop: ["View Shop", "शॉप देखें"], applied: ["APPLIED", "लागू"], upto: ["Upto", "तक"],
    resume: ["Download Résumé", "रिज़्यूमे डाउनलोड"], profile: ["Profile", "प्रोफ़ाइल"],
    placeOrder: ["Place Order", "ऑर्डर करें"], cont: ["Continue", "आगे बढ़ें"], selectView: ["Select View", "व्यू चुनें"],
    peopleAlso: ["People also viewed", "लोगों ने यह भी देखा"], free30: ["Free 30-min intro call", "30 मिनट की फ़्री कॉल"]
  };
  function t(k) { var v = T[k]; if (!v) return k; return S.lang === "hi" ? v[1] : v[0]; }
  function ti(k) { return '<span data-i18n="' + k + '">' + esc(t(k)) + "</span>"; }

  /* ---------------- icons ---------------- */
  var I = {
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.9 4.5 7.2 4.5c2 0 3.5 1.1 4.8 2.8 1.3-1.7 2.8-2.8 4.8-2.8 3.3 0 5.6 3.1 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4z" stroke-linejoin="round"/></svg>',
    cart: '<svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.3 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.3" stroke-linejoin="round" stroke-linecap="round"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" stroke-linecap="round"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" stroke-linecap="round"/></svg>',
    sort: '<svg viewBox="0 0 24 24"><path d="M7 4v16M7 4L3.5 7.5M7 4l3.5 3.5M17 20V4M17 20l-3.5-3.5M17 20l3.5-3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    filter: '<svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4" stroke-linecap="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5" stroke-linejoin="round"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" stroke-linejoin="round"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" stroke-linejoin="round"/><path d="M14 3v4h4M9 12h6M9 16h6" stroke-linecap="round"/></svg>',
    li: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.3v.2M12 17v-3.6c0-1.7 1-2.9 2.5-2.9S17 11.6 17 13.3V17M12 10.5V17" stroke-linecap="round"/></svg>',
    truck: '<svg viewBox="0 0 24 24"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chev: '<svg viewBox="0 0 24 24" class="chev"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke-linecap="round"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z"/></svg>',
    // bottom nav
    nHome: '<svg viewBox="0 0 28 28"><path class="fill" d="M4 12.5L14 4l10 8.5V24H4z" stroke-linejoin="round"/><path class="fill2" d="M10 20.5v-5.2c0-1 .8-1.8 1.7-1.8.9 0 1.6.8 1.6 1.8v5.2m0-5.2c0-1 .7-1.8 1.6-1.8.9 0 1.7.8 1.7 1.8v5.2" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
    nCat: '<svg viewBox="0 0 28 28"><rect class="fill" x="5" y="4" width="18" height="20" rx="3"/><path d="M11 4v3.5l3 2 3-2V4" stroke-linejoin="round"/><path d="M10 13h8M10 17h5" stroke-linecap="round"/></svg>',
    nOrders: '<svg viewBox="0 0 28 28"><path class="fill" d="M14 3.5l9 4.5v11L14 23.5 5 19V8z" stroke-linejoin="round"/><path d="M5 8l9 4.5L23 8M14 12.5v11" stroke-linejoin="round"/></svg>',
    nHelp: '<svg viewBox="0 0 28 28"><rect class="fill" x="5" y="4" width="18" height="17" rx="3"/><path d="M11 24l3-3h-3" stroke-linejoin="round"/><path d="M11.8 10.2a2.3 2.3 0 1 1 3.3 2.1c-.7.4-1.1.9-1.1 1.7v.4M14 17.2v.3" stroke-linecap="round" class="fill2s"/></svg>',
    nAcc: '<svg viewBox="0 0 28 28"><circle class="fill" cx="14" cy="14" r="10"/><path d="M7.5 12.5c1.7-1.2 4-1.2 5.3 0M15.2 12.5c1.3-1.2 3.6-1.2 5.3 0" stroke-linecap="round"/><circle cx="10.5" cy="14" r="2.2"/><circle cx="17.5" cy="14" r="2.2"/><path d="M11 19c1.8 1.2 4.2 1.2 6 0" stroke-linecap="round"/></svg>'
  };
  var CIC = { // category glyphs (filled, coloured)
    grid: '<svg viewBox="0 0 40 40"><rect x="5" y="5" width="13" height="13" rx="3.5" fill="#F25C9B"/><rect x="22" y="5" width="13" height="13" rx="3.5" fill="#F25C9B"/><rect x="5" y="22" width="13" height="13" rx="3.5" fill="#F25C9B"/><rect x="22" y="22" width="13" height="13" rx="3.5" fill="#F25C9B"/></svg>',
    rupee: '<svg viewBox="0 0 40 40"><rect x="4" y="9" width="32" height="22" rx="4" fill="#FFD25E"/><rect x="7" y="12" width="26" height="16" rx="3" fill="#fff" opacity=".55"/><circle cx="20" cy="20" r="6.5" fill="#9F2089"/><path d="M17.5 17h5M17.5 19.4h5M19 17c2 0 2.6 2.4 0 2.4h-1.2l3.4 3.6" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    rocket: '<svg viewBox="0 0 40 40"><path d="M20 4c6 4 8.5 10 7.5 18l-7.5 4-7.5-4C11.5 14 14 8 20 4z" fill="#7B5CFF"/><circle cx="20" cy="15" r="3.2" fill="#fff"/><path d="M12.5 22l-4 6 5.5-1.5M27.5 22l4 6-5.5-1.5" fill="#F25C9B"/><path d="M17 28c0 4 3 7 3 7s3-3 3-7" fill="#FFB020"/></svg>',
    store: '<svg viewBox="0 0 40 40"><path d="M6 15l3-8h22l3 8z" fill="#F25C9B"/><path d="M6 15h28c0 2.6-2 4.4-4.7 4.4S24.7 17.6 24.7 15c0 2.6-2.1 4.4-4.7 4.4S15.3 17.6 15.3 15c0 2.6-2 4.4-4.6 4.4S6 17.6 6 15z" fill="#9F2089"/><rect x="8" y="20" width="24" height="14" fill="#FFE1EF"/><rect x="16" y="25" width="8" height="9" fill="#9F2089"/></svg>',
    tag: '<svg viewBox="0 0 40 40"><path d="M6 8h14l14 14-12 12L8 20z" fill="#FF8A3D"/><circle cx="13" cy="14" r="2.6" fill="#fff"/><path d="M18 25l8-8M18.5 18.5h.1M25.5 24.5h.1" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>',
    flow: '<svg viewBox="0 0 40 40"><rect x="4" y="6" width="12" height="9" rx="2.5" fill="#00A3A1"/><rect x="24" y="6" width="12" height="9" rx="2.5" fill="#00A3A1"/><rect x="14" y="26" width="12" height="9" rx="2.5" fill="#9F2089"/><path d="M10 15v5h20v-5M20 20v6" stroke="#2E2E3E" stroke-width="2" fill="none"/></svg>',
    mall: '<img src="assets/logos/phonepe.svg" alt="">',
    orders: '<svg viewBox="0 0 40 40"><path d="M20 5l13 6.5v16L20 34 7 27.5v-16z" fill="#C8A26B"/><path d="M7 11.5L20 18l13-6.5M20 18v16" stroke="#8A6A3C" stroke-width="1.8" fill="none"/><path d="M13.5 8.2l13 6.5" stroke="#F5E6C8" stroke-width="3"/></svg>',
    live: '<svg viewBox="0 0 40 40"><rect x="4" y="7" width="32" height="22" rx="4" fill="#038D63"/><rect x="7" y="10" width="26" height="16" rx="2" fill="#E7F8EF"/><circle cx="12" cy="18" r="3" fill="#06A759"/><path d="M18 15h11M18 20h7" stroke="#038D63" stroke-width="2.2" stroke-linecap="round"/><path d="M14 33h12M20 29v4" stroke="#2E2E3E" stroke-width="2.2" stroke-linecap="round"/></svg>',
    help: '<svg viewBox="0 0 40 40"><path d="M6 9a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H17l-7 6v-6a4 4 0 0 1-4-4z" fill="#9F2089"/><path d="M16.5 13a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1.2-1.5 2.3M20 22v.4" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>'
  };
  var CIRC_BG = { grid: "#FDE7F1", rupee: "#FFF6DA", rocket: "#EEE9FF", store: "#FDE7F1", tag: "#FFEDE0", flow: "#E0F6F5", mall: "#F0E8FA", live: "#E7F8EF", orders: "#F7EFE2", help: "#F9E6F4" };

  /* ---------------- shared bits ---------------- */
  function provChip(p) {
    var lab = D.prov[p] ? D.prov[p].label : p;
    return '<span class="prov ' + p + '" title="' + esc(D.prov[p] ? D.prov[p].tip : "") + '"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="currentColor"/><path d="M5.8 10.4l2.7 2.7 5.6-5.6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' + esc(lab) + "</span>";
  }
  function poster(p) {
    var o = p.poster, s = D.sellers[p.seller];
    return '<div class="poster" style="background:' + o.bg + ";color:" + o.fg + '" aria-hidden="true">' +
      '<i class="po-c a" style="background:' + o.accent + '"></i><i class="po-c b" style="background:' + o.accent + '"></i>' +
      '<div class="po-top"><span class="po-code">' + esc(p.code) + '</span><span class="po-logo"><img src="' + s.logo + '" alt=""></span></div>' +
      '<div class="po-big">' + esc(o.big) + "</div>" +
      '<div class="po-small">' + esc(o.small) + "</div>" +
      '<i class="po-bar" style="background:' + o.accent + '"></i>' +
      '<div class="po-name">' + esc(p.short) + "</div></div>";
  }
  function badgeCls(p) { return p.seller === "phonepe" ? "mall" : (/live/i.test(p.badge) ? "live" : ""); }
  function pillCls(p) { return { result: "", built: "", modelled: "amber", target: "blue", sourced: "blue" }[p.price.prov] || ""; }
  function card(p) {
    var s = D.sellers[p.seller], w = S.wish.indexOf(p.id) > -1;
    return '<article class="pc">' +
      '<a class="pc-link" href="#/p/' + p.id + '" aria-label="' + esc(p.name) + '">' +
        '<div class="pc-img">' + poster(p) + '<span class="badge-g ' + badgeCls(p) + '">✦ ' + esc(p.badge) + "</span></div>" +
        '<div class="pc-tx"><div class="pc-name">' + esc(p.name) + "</div>" +
          '<div class="price"><b>' + esc(p.price.v) + "</b>" + '<span class="u">' + esc(p.price.u) + '</span><span class="off">' + (p.price.strike ? "<s>" + esc(p.price.strike) + "</s> " : "") + "<em>" + esc(p.price.off) + "</em></span></div>" +
          provChip(p.price.prov) +
          '<div class="hook">' + esc(p.hook) + "</div>" +
          '<div class="rate"><span class="pill ' + pillCls(p) + '">' + esc(p.kind.split(" · ")[0].split(" & ")[0]) + '</span><img src="' + s.logo + '" alt=""><span class="sl">(' + esc(s.name) + ")</span></div>" +
        "</div></a>" +
      (p.links.length ? '<a class="try-live" href="' + p.links[0].u + '" target="_blank" rel="noopener" aria-label="Try ' + esc(p.short) + ' live at ' + esc(host(p.links[0].u)) + ' (opens in new tab)"><i></i>Try it live ' + I.ext + "</a>" : "") +
      '<button class="heart' + (w ? " on" : "") + '" data-act="wish" data-id="' + p.id + '" aria-pressed="' + w + '" aria-label="' + (w ? "Remove from" : "Add to") + ' wishlist: ' + esc(p.short) + '">' + I.heart + "</button>" +
      "</article>";
  }
  function wordmark(size) { return '<span class="wm"' + (size ? ' style="font-size:' + size + 'px"' : "") + '>meesho</span>'; }

  /* ---------------- filtering ---------------- */
  function filtered(cat) {
    var f = S.f, q = f.q.trim().toLowerCase();
    var list = D.products.filter(function (p) {
      if (cat && cat !== "all" && p.cats.indexOf(cat) < 0) return false;
      if (f.seller.length && f.seller.indexOf(p.seller) < 0) return false;
      if (f.prov.length && f.prov.indexOf(p.price.prov) < 0) return false;
      if (q) {
        var hay = [p.name, p.short, p.code, p.hook, p.kind, D.sellers[p.seller].name, p.cats.join(" "), p.summary.problem, p.summary.did, p.summary.landed, p.meesho, p.sections.map(function (x) { return x.h + " " + (x.p || "") + " " + (x.list || []).join(" "); }).join(" ")].join(" ").toLowerCase();
        return q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
      }
      return true;
    });
    if (f.sort === "new") list.sort(function (a, b) { return b.sort - a.sort; });
    if (f.sort === "old") list.sort(function (a, b) { return a.sort - b.sort; });
    if (f.sort === "case") list.sort(function (a, b) { return a.code.localeCompare(b.code); });
    return list;
  }
  function activeCount() { return S.f.seller.length + S.f.prov.length + (S.f.sort !== "rel" ? 1 : 0) + (S.f.q ? 1 : 0); }
  var SORTS = [["rel", "Relevance", "Navya's pick order"], ["new", "Newest first", "Most recent work on top"], ["old", "Oldest first", "Where it started"], ["case", "Case ID", "CASE-01, CASE-02…"]];

  function filterBar() {
    var f = S.f;
    return '<div class="fbar" role="toolbar" aria-label="Sort and filter">' +
      '<button data-act="sheet" data-k="sort">' + I.sort + ti("sort") + (f.sort !== "rel" ? '<i class="dot"></i>' : "") + "</button>" +
      '<button data-act="sheet" data-k="cat">' + ti("category") + I.down + "</button>" +
      '<button data-act="sheet" data-k="seller">' + ti("company") + (f.seller.length ? '<i class="dot"></i>' : "") + I.down + "</button>" +
      '<button data-act="sheet" data-k="prov">' + I.filter + ti("filters") + (f.prov.length ? '<i class="dot"></i>' : "") + "</button></div>";
  }
  function activeChips() {
    var f = S.f, h = [];
    if (f.q) h.push('<button class="chip on" data-act="clr" data-k="q">“' + esc(f.q) + '” ✕</button>');
    if (f.sort !== "rel") h.push('<button class="chip on" data-act="clr" data-k="sort">' + esc(SORTS.filter(function (s) { return s[0] === f.sort; })[0][1]) + " ✕</button>");
    f.seller.forEach(function (s) { h.push('<button class="chip on" data-act="clr" data-k="seller" data-v="' + s + '">' + esc(D.sellers[s].name) + " ✕</button>"); });
    f.prov.forEach(function (s) { h.push('<button class="chip on" data-act="clr" data-k="prov" data-v="' + s + '">' + esc(D.prov[s].label) + " ✕</button>"); });
    if (h.length > 1) h.push('<button class="chip" data-act="clr" data-k="all">Clear all</button>');
    return h.length ? '<div class="chips-act">' + h.join("") + "</div>" : "";
  }
  function coupon() {
    return '<div class="coupon-w"><div class="coupon"><div><small>' + ti("upto") + '</small><b>30 min FREE <span>on 1st call</span></b></div>' +
      '<div class="applied">' + ti("applied") + '<i>' + I.check + "</i></div></div></div>";
  }
  function sidebar(cat) {
    var f = S.f, n = filtered(cat).length;
    var sellers = Object.keys(D.sellers), provs = ["result", "built", "modelled", "target", "sourced"];
    return '<aside class="side" aria-label="Filters"><div class="s-sort"><label class="sr" for="sortSel">Sort by</label><select id="sortSel" data-act="sortsel">' +
      SORTS.map(function (s) { return '<option value="' + s[0] + '"' + (f.sort === s[0] ? " selected" : "") + ">Sort by : " + s[1] + "</option>"; }).join("") + "</select></div>" +
      "<h4>Filters</h4><div class=\"s-sub\">" + n + " product" + (n === 1 ? "" : "s") + "</div>" +
      '<fieldset><legend>Category</legend>' + D.cats.map(function (c) {
        return '<label><input type="radio" name="cat" data-act="catradio" value="' + c.id + '"' + ((cat || "all") === c.id ? " checked" : "") + "> " + esc(c.name) + "</label>";
      }).join("") + "</fieldset>" +
      '<fieldset><legend>Company</legend>' + sellers.map(function (s) {
        return '<label><input type="checkbox" data-act="chk" data-k="seller" value="' + s + '"' + (f.seller.indexOf(s) > -1 ? " checked" : "") + "> " + esc(D.sellers[s].name) + "</label>";
      }).join("") + "</fieldset>" +
      '<fieldset><legend>Evidence</legend>' + provs.map(function (s) {
        return '<label><input type="checkbox" data-act="chk" data-k="prov" value="' + s + '"' + (f.prov.indexOf(s) > -1 ? " checked" : "") + "> " + esc(D.prov[s].label) + ' <small style="color:var(--ink-3)">· ' + esc(D.prov[s].tip) + "</small></label>";
      }).join("") + "</fieldset>" +
      (activeCount() ? '<button class="clr" data-act="clr" data-k="all">Clear all filters</button>' : "") + "</aside>";
  }

  /* ---------------- feed (grid + interstitials) ---------------- */
  function feed(list, withInter) {
    if (!list.length) return '<div class="empty" style="grid-column:1/-1"><div class="e-ic">' + I.search + "</div><h2>No products match</h2><p>Try another skill, or clear the filters.</p><button class=\"btn\" data-act=\"clr\" data-k=\"all\">Clear filters</button></div>";
    var h = "";
    list.forEach(function (p, i) {
      h += card(p);
      if (withInter && i === 3) h += moneyBlock();
      if (withInter && i === 7) h += lovedBlock();
    });
    if (withInter && list.length <= 3) h += moneyBlock();
    return h;
  }
  function moneyBlock() {
    return '<section class="inter" aria-labelledby="ftm-h"><h3 id="ftm-h">Follow the money 💸</h3><p>A buyer pays ₹2,000. What actually reaches the seller? This is the arithmetic I spent two years inside — move the order value, then switch on the fee error nobody checks for.</p>' +
      '<div class="money"><div class="ctrl"><label for="ov">Order value <output id="ovOut">₹2,000</output></label><input id="ov" type="range" min="200" max="10000" step="100" value="2000" data-act="money">' +
      '<label class="toggle"><span>The silent break: gateway charges <b>2.35%</b> instead of the contracted <b>2.00%</b></span><input type="checkbox" id="brk" data-act="money"><i class="sw"></i></label></div>' +
      '<div class="mrow"><span>Order value</span><b id="m1">₹2,000.00</b></div>' +
      '<div class="mrow neg"><span>Gateway fee (MDR) <small id="mRate">2.00%</small></span><b id="m2">− ₹40.00</b></div>' +
      '<div class="mrow neg"><span>18% GST on the fee</span><b id="m3">− ₹7.20</b></div>' +
      '<div class="mrow tot"><span>Lands in the seller\'s bank</span><b id="m4">₹1,952.80</b></div>' +
      '<p class="scale"><span>Variance vs contract</span><span id="m5">₹0.00</span></p>' +
      '<p class="scale" style="background:#FDF2FA;color:var(--plum)"><span>Same error at ₹100 Cr GMV / year</span><span id="m6">₹0</span></p></div>' +
      '<p class="fine">GST-on-MDR deduction structure is how Indian settlement works (Sourced). Rate values are illustrative (Modelled). Silent breaks like this are what ReconOS is built to catch.</p></section>';
  }
  function lovedBlock() {
    return '<section class="inter" aria-labelledby="lv-h"><h3 id="lv-h">Why buyers trust this seller ⭐</h3><p>Four habits that show up in every case — whether the subject is a settlement file, a bank\'s reply email or the price of a protein sachet.</p><div class="habits">' +
      D.habits.map(function (h, i) { return '<div class="habit"><i>' + String.fromCharCode(65 + i) + "</i><div><b>" + esc(h[0]) + "</b><span>" + esc(h[1]) + "</span></div></div>"; }).join("") + "</div></section>";
  }
  function inr(n, dp) { return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp }); }
  function updMoney() {
    var ov = $("#ov"); if (!ov) return;
    var v = +ov.value, br = $("#brk").checked, rate = br ? 0.0235 : 0.02;
    var fee = v * rate, gst = fee * 0.18, net = v - fee - gst;
    var cNet = v - v * 0.02 * 1.18, varc = cNet - net;
    $("#ovOut").textContent = inr(v, 0);
    $("#m1").textContent = inr(v, 2); $("#mRate").textContent = (rate * 100).toFixed(2) + "%";
    $("#m2").textContent = "− " + inr(fee, 2); $("#m3").textContent = "− " + inr(gst, 2);
    $("#m4").textContent = inr(net, 2); $("#m5").textContent = (varc > 0 ? "− " : "") + inr(varc, 2);
    var yr = 1e9 * (br ? 0.0035 * 1.18 : 0);
    $("#m6").textContent = yr ? "≈ ₹" + (yr / 1e5).toFixed(1) + " L lost" : "₹0";
  }

  /* ---------------- HOME ---------------- */
  function circles() {
    var items = [
      ["#/categories", "grid", t("categories")],
      ["#/shop/payments", "rupee", "Payments"],
      ["#/shop/build", "rocket", "0→1 Builds"],
      ["#/shop/seller", "store", "Seller & D2C"],
      ["#/shop/gtm", "tag", "GTM & Pricing"],
      ["#/shop/live", "live", "Live Builds"],
      ["#/shop/mall", "mall", "PhonePe Mall"],
      ["#/orders", "orders", t("orders")],
      ["#/help", "help", "Contact"]
    ];
    return '<nav class="circles" aria-label="Shop by category">' + items.map(function (c) {
      return '<a class="circ" href="' + c[0] + '"><span class="c-img" style="background:' + CIRC_BG[c[1]] + '">' + CIC[c[1]] + "</span><span>" + esc(c[2]) + "</span></a>";
    }).join("") + "</nav>";
  }
  function today() { var d = new Date(); return [d.toLocaleString("en-US", { month: "short" }).toUpperCase(), d.getDate()]; }
  function hero() {
    return '<section class="hero" aria-label="Introduction"><div class="hero-in">' +
      '<div class="arch"><div class="a-in"><img src="assets/portrait.jpg" alt="Navya Juneja" width="600" height="750"></div></div>' +
      '<div class="qr"><p>Upto <em>₹15 Cr+ recovered</em><small>*Only at PhonePe · Result</small></p><div class="q-box"><img src="assets/qr-linkedin.svg" alt="QR code to Navya\'s LinkedIn profile" width="190" height="190"></div><span>Scan now to connect</span></div>' +
      '<div class="hero-tx"><div class="kick">Upto <em>₹15 Cr+ recovered</em> · *Only at PhonePe</div><h2>Smart Product Thinking. Trusted with ₹500 Cr+ TPV.</h2>' +
      "<p>Navya Juneja · Product Manager. Two years inside PhonePe's payment rails, then 0→1 products with real users.</p>" +
      '<a class="btn-w" href="#/shop/all">Shop the Work ' + '</a></div></div></section>';
  }
  function saleBanners() {
    var d = today();
    return '<a class="sale" href="#/shop/all" aria-label="Maha PM hiring sale — open to product roles. See all work">' +
      '<div class="sale-in"><span class="tagsale"><b>MAHA PM</b><b>HIRING SALE</b></span>' +
      '<div><h3>Sale is live</h3><div class="s-off">Upto <b>₹8 Cr*</b> saved + extra <b>₹15 Cr*</b> recovered</div></div>' +
      '<span class="cal"><i>' + d[0] + "</i><b>" + d[1] + '</b></span><span class="go">' + I.arrow + '</span></div><span class="tc">*Results at PhonePe</span></a>' +
      '<a class="sale big" href="#/help" aria-label="Open to PM roles — first call free. Contact Navya">' +
      '<div class="sale-in"><span class="tagsale"><b>MAHA PM</b><b>HIRING SALE</b></span>' +
      '<div><h3>Open to PM roles</h3><div class="s-off">Upto <b>2 yrs</b> payments + extra <b>0→1</b> builds</div><div class="s-sub">FREE first call · on your first interview</div></div>' +
      '<span class="cal"><i>' + d[0] + "</i><b>" + d[1] + '</b></span><span class="go">' + I.arrow + '</span></div><span class="tc">*Every figure labelled by provenance</span></a>';
  }
  function bestPicks() {
    var picks = ["reconos", "foundit", "pp-routing", "h2h"].map(function (id) { return byId[id]; });
    return '<a class="best" href="#/shop/all" aria-label="Best picks: see all products"><div class="best-in"><h3><span>Best</span><span>Picks 👌</span></h3>' +
      '<div class="thumbs">' + picks.map(function (p) { return '<span class="mini" style="position:relative">' + poster(p) + "</span>"; }).join("") + '</div><span class="arr">' + I.arrow.replace("<svg", '<svg aria-hidden="true"') + "</span></div></a>";
  }
  function trust() {
    return '<div class="trust-wrap"><div class="trust">' +
      '<a href="#/orders"><img class="t-ic" src="assets/logos/phonepe.svg" alt=""><div><b>2 Years</b><span>PhonePe Payments</span></div></a>' +
      '<a href="#/p/pp-recon"><span class="t-ic">' + CIC.rupee + '</span><div><b>₹15 Cr+</b><span>Recovered</span></div></a>' +
      '<a href="#/p/pp-routing"><span class="t-ic">' + CIC.tag + '</span><div><b>₹8 Cr</b><span>Saved / year</span></div></a></div></div>';
  }
  function vHome() {
    var list = filtered("all");
    return trust() + circles() + hero() +
      '<div class="banners">' + saleBanners() + bestPicks() + "</div>" +
      '<div class="home-feed">' + sidebar("all") + '<div class="feed-col">' + filterBar() + activeChips() + coupon() +
      '<div class="feed-h"><h2>' + ti("forYou") + "</h2><span>" + list.length + " products</span></div>" +
      '<div class="grid" id="grid">' + feed(list, true) + "</div></div></div>" + footer();
  }

  /* ---------------- LISTING ---------------- */
  function catName(id) { var c = D.cats.filter(function (c) { return c.id === id; })[0]; return c ? (S.lang === "hi" ? c.hi : c.name) : "All Products"; }
  var CAT_DESC = {
    all: "Every case study and professional win, labelled by provenance — Result, Built, Modelled, Target or Sourced.",
    payments: "Routing, reconciliation, settlement and acquiring — two years inside PhonePe's payment rails, then products built on what I learned.",
    build: "Things that exist: live products, working prototypes and launches you can open.",
    seller: "The supply side: D2C brands, sourcing, couriers, COD remittances and the leaks a small seller lives with.",
    gtm: "Consumer research, segmentation, pricing tiers and launch plans — quantified before anything was committed.",
    process: "Multi-party workflows made measurable: turnaround clocks, intake checks, go-live pipelines.",
    mall: "Verified professional results from PhonePe, sold by the brand itself.",
    live: "Working products and prototypes you can open right now — each one links straight to the live build."
  };
  function vShop(cat) {
    var list = filtered(cat);
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/shop/all">Work</a> / <span>' + esc(catName(cat)) + "</span></nav>" +
      '<div class="list-h"><h1>' + esc(catName(cat)) + "</h1><b>Showing 1-" + list.length + " out of " + list.length + " products</b><p>" + esc(CAT_DESC[cat] || CAT_DESC.all) + "</p></div>" +
      '<div class="shop">' + sidebar(cat) + "<div>" + filterBar() + activeChips() + coupon() + '<div class="grid" id="grid">' + feed(list, false) + "</div></div></div>" + footer();
  }

  /* ---------------- PDP ---------------- */
  function vPdp(id) {
    var p = byId[id]; if (!p) return vNotFound();
    var s = D.sellers[p.seller], inCart = S.cart.indexOf(id) > -1, w = S.wish.indexOf(id) > -1;
    var slides = [{ type: "poster" }].concat(p.media);
    var sim = D.products.filter(function (x) { return x.id !== id && x.cats.some(function (c) { return p.cats.indexOf(c) > -1; }); }).slice(0, 8);
    var gal = '<div class="gal">' +
      '<div class="thumbs-v" role="tablist" aria-label="Images">' + slides.map(function (m, i) {
        var inner = m.type === "poster" ? '<span style="position:absolute;inset:0">' + poster(p) + "</span>" : '<img src="' + (m.poster || m.src) + '" alt="">';
        return '<button class="' + (i === 0 ? "on " : "") + (m.type === "video" ? "vid" : "") + '" data-act="gal" data-i="' + i + '" aria-label="Show image ' + (i + 1) + '">' + inner + "</button>";
      }).join("") + "</div>" +
      '<div class="gal-main"><div class="gal-track" id="galTrack">' + slides.map(function (m) {
        if (m.type === "poster") return '<div class="slide">' + poster(p) + "</div>";
        if (m.type === "video") return '<div class="slide"><video controls playsinline preload="none" poster="' + m.poster + '" aria-label="' + esc(m.alt) + '"><source src="' + m.src + '" type="video/mp4"></video></div>';
        return '<div class="slide"><img src="' + m.src + '" alt="' + esc(m.alt) + '" loading="lazy"></div>';
      }).join("") + "</div>" +
      (slides.length > 1 ? '<div class="dots">' + slides.map(function (m, i) { return '<button class="' + (i === 0 ? "on" : "") + '" data-act="gal" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>'; }).join("") + "</div>" : "") +
      "</div></div>" +
      (sim.length ? '<div class="sim"><h4>' + ti("similar") + '</h4><div class="sim-row">' + sim.map(function (x) { return '<a href="#/p/' + x.id + '" aria-label="' + esc(x.short) + '">' + poster(x) + "</a>"; }).join("") + "</div></div>" : "");

    var info = '<div class="card"><h1>' + esc(p.name) + "</h1>" +
      '<div class="price"><b>' + esc(p.price.v) + "</b>" + '<span class="u">' + esc(p.price.u) + '</span><span class="off">' + (p.price.strike ? "<s>" + esc(p.price.strike) + "</s> " : "") + "<em>" + esc(p.price.off) + "</em></span></div>" +
      provChip(p.price.prov) +
      '<div class="rate"><span class="pill ' + pillCls(p) + '">✦ ' + esc(p.badge) + '</span><span class="sl">' + esc(p.kind) + (p.date ? " · " + esc(p.date) : "") + "</span></div>" +
      '<div class="free">' + I.truck + ti("free30") + "</div>" +
      (p.links.length ? '<a class="live-bar" href="' + p.links[0].u + '" target="_blank" rel="noopener"><span class="lb-dot"></span><span><b>' + esc(p.links[0].t) + '</b><small>' + esc(host(p.links[0].u)) + ' · opens in a new tab</small></span>' + I.ext + "</a>" : "") +
      '<div class="buybar"><button class="btn ol" data-act="cart" data-id="' + id + '">' + I.cart + "<span>" + (inCart ? "Go to Cart" : t("addCart")) + '</span></button><button class="btn" data-act="buy" data-id="' + id + '">' + ti("buyNow") + "</button></div></div>" +

      '<div class="card"><h2>' + ti("selectView") + '</h2><div class="sizes" role="tablist">' +
      [["problem", "The problem"], ["did", "What I did"], ["landed", "Where it landed"]].map(function (k, i) {
        return '<button class="size' + (i === 0 ? " on" : "") + '" role="tab" aria-selected="' + (i === 0) + '" data-act="size" data-k="' + k[0] + '">' + k[1] + "</button>";
      }).join("") + '</div><div class="size-pane" id="sizePane" aria-live="polite">' + esc(p.summary.problem) + "</div></div>" +

      (p.metrics.length ? '<div class="card"><h2>' + ti("highlights") + '</h2><div class="hl">' + p.metrics.map(function (m) { return "<div><b>" + esc(m.v) + "</b><span>" + esc(m.l) + "</span>" + provChip(m.p) + "</div>"; }).join("") + "</div></div>" : "") +

      '<div class="card"><h2>' + ti("details") + '</h2><dl class="kv">' + p.details.map(function (d) { return "<dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd>"; }).join("") +
      "<dt>Case ID</dt><dd>" + esc(p.code) + "</dd></dl></div>" +

      '<div class="card"><div class="why"><img src="assets/logos/meesho-icon.svg" alt=""><div><b>Why this matters at Meesho</b><p>' + esc(p.meesho) + "</p></div></div></div>" +

      (p.sections.length ? '<div class="card"><h2>' + ti("more") + "</h2>" + p.sections.map(function (sec, i) { return '<details class="acc"' + (i === 0 ? " open" : "") + "><summary>" + esc(sec.h) + '</summary><div class="acc-b">' + secBody(sec) + "</div></details>"; }).join("") + "</div>" : "") +

      (p.links.length ? '<div class="card"><h2>Open the real thing</h2><div class="links">' + p.links.map(function (l) {
        return '<a class="lnk" href="' + l.u + '" target="_blank" rel="noopener"><span>' + esc(l.t) + "<small>" + esc(l.u.replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</small></span>" + I.ext + "</a>";
      }).join("") + "</div></div>" : "") +

      '<div class="card"><div class="seller"><img src="' + s.logo + '" alt="' + esc(s.name) + ' logo"><div><small>' + ti("soldBy") + "</small><b>" + esc(s.name) + "</b><span>" + esc(s.sub) + '</span></div><a class="btn ol sm" href="#/shop/all?seller=' + p.seller + '">' + ti("viewShop") + "</a></div>" +
      '<div class="seller-stats"><div><b>' + D.products.filter(function (x) { return x.seller === p.seller; }).length + "</b><span>Products</span></div><div><b>" + (p.seller === "phonepe" ? "₹500 Cr+" : p.seller === "cogent" ? "60+" : p.seller === "mu" ? "₹7.3 L" : "2 live") + "</b><span>" + (p.seller === "phonepe" ? "TPV owned" : p.seller === "cogent" ? "Interviews" : p.seller === "mu" ? "Venture revenue" : "Builds") + "</span></div><div><b>100%</b><span>Figures labelled</span></div></div></div>" +

      '<div class="card"><h2>How to read the numbers</h2><div class="provkey">' + ["result", "built", "modelled", "target", "sourced"].map(function (k) { return "<div>" + provChip(k) + "<span>" + esc(D.prov[k].tip) + "</span></div>"; }).join("") + "</div></div>";

    var rel = D.products.filter(function (x) { return x.id !== id; }).sort(function (a, b) { return (b.seller === p.seller) - (a.seller === p.seller); }).slice(0, 4);
    return '<div class="pdp"><div class="pdp-wrap"><div class="pdp-left">' + gal + "</div><div>" + info + "</div></div>" +
      '<section class="pdp-related"><h2>' + ti("peopleAlso") + '</h2><div class="grid">' + rel.map(card).join("") + "</div></section></div>" + footer();
  }
  function secBody(sec) {
    var h = "";
    if (sec.tiers) h += '<div class="tiers">' + sec.tiers.map(function (x) { return "<div><small>" + esc(x[2]) + "</small><b>" + esc(x[1]) + "</b><span>" + esc(x[0]) + "</span></div>"; }).join("") + "</div>";
    if (sec.p) h += "<p>" + esc(sec.p) + "</p>";
    if (sec.list) h += '<ul class="ticks">' + sec.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    if (sec.steps) h += '<div class="steps">' + sec.steps.map(function (x) { return "<div><span><b>" + esc(x[0]) + "</b>" + esc(x[1]) + "</span></div>"; }).join("") + "</div>";
    if (sec.compare) h += '<div class="cmp">' + sec.compare.map(function (x) { return "<div><b>" + esc(x[0]) + "</b>" + esc(x[1]) + "</div>"; }).join("") + "</div>";
    return h;
  }

  /* ---------------- CATEGORIES ---------------- */
  var curRail = "payments";
  function vCats() {
    var rail = D.cats.filter(function (c) { return c.id !== "all"; });
    var list = D.products.filter(function (p) { return p.cats.indexOf(curRail) > -1; });
    var feat = ["reconos", "mid", "foundit"].map(function (i) { return byId[i]; });
    return '<div class="catpg"><div class="rail" role="tablist" aria-label="Categories">' + rail.map(function (c) {
      return '<button role="tab" aria-selected="' + (c.id === curRail) + '" class="' + (c.id === curRail ? "on" : "") + '" data-act="rail" data-k="' + c.id + '"><span class="ri">' + CIC[c.icon] + "</span>" + esc(S.lang === "hi" ? c.hi : c.name) + "</button>";
    }).join("") + '<button data-act="go" data-h="#/orders"><span class="ri">' + CIC.orders + "</span>" + esc(t("orders")) + '</button><button data-act="go" data-h="#/account"><span class="ri">' + CIC.store.replace(/#F25C9B/g, "#C8A26B") + "</span>Off the clock</button></div>" +
      '<div class="cat-main"><h2>Featured on Navya</h2><div class="cgrid">' + feat.map(cg).join("") + "</div>" +
      "<h2>All " + esc(catName(curRail)) + '</h2><div class="cgrid">' + list.map(cg).join("") + "</div>" +
      '<a class="btn ol block" href="#/shop/' + curRail + '">View all ' + esc(catName(curRail)) + "</a></div></div>";
  }
  function cg(p) { return '<a href="#/p/' + p.id + '"><span class="cg-img">' + poster(p) + "</span>" + esc(p.short) + "</a>"; }

  /* ---------------- ORDERS (experience, recent → old) ---------------- */
  function vOrders() {
    var tabs = [["all", "All"], ["work", "Work"], ["edu", "Education"]];
    var list = D.orders.filter(function (o) { return S.orderTab === "all" || o.type === S.orderTab; });
    return '<div class="page"><div class="pg-h"><h2>' + ti("orders") + "</h2><p>Experience &amp; education · most recent first</p></div>" +
      '<div class="tabs" role="tablist">' + tabs.map(function (x) { return '<button class="chip' + (S.orderTab === x[0] ? " on" : "") + '" role="tab" aria-selected="' + (S.orderTab === x[0]) + '" data-act="otab" data-k="' + x[0] + '">' + x[1] + "</button>"; }).join("") + "</div>" +
      '<div class="orders">' + list.map(function (o, i) {
        var hasMore = o.bullets || o.track || o.related;
        return '<article class="order' + (i === 0 && o.bullets ? " open" : "") + '" id="o-' + o.id + '"><div class="o-top"><img src="' + o.logo + '" alt="' + esc(o.org) + ' logo"><div>' +
          '<span class="o-st ' + o.status + '"><i></i>' + esc(o.statusText) + "</span><b>" + esc(o.title) + '</b><div class="org">' + esc(o.org) + '</div><div class="meta">' + esc(o.when) + " · " + esc(o.where) + "</div></div></div>" +
          '<div class="o-body">' + esc(o.body) + "</div>" +
          (hasMore ? '<div class="o-more">' +
            (o.track ? '<div class="track">' + o.track.map(function (x) { return "<div><b>" + esc(x[0]) + "</b>" + esc(x[1]) + "</div>"; }).join("") + "</div>" : "") +
            (o.bullets ? '<ul class="bul">' + o.bullets.map(function (b) { return "<li><b>" + esc(b[0]) + "</b><span>" + esc(b[1]) + "</span></li>"; }).join("") + "</ul>" : "") +
            (o.related ? '<div class="rel">' + o.related.map(function (r) { return '<a class="chip" href="#/p/' + r + '">' + esc(byId[r].short) + " →</a>"; }).join("") + "</div>" : "") +
            (o.org === "PhonePe" ? '<p class="fine">Figures as stated in my CV. Underlying transaction data and internal documents are PhonePe\'s and are not reproduced here.</p>' : "") +
            "</div>" : "") +
          '<div class="o-act">' + (hasMore ? '<button data-act="otoggle" data-id="' + o.id + '" aria-expanded="' + (i === 0 && !!o.bullets) + '">Track order ' + I.down + "</button>" : "") +
          (o.related ? '<a href="#/p/' + o.related[0] + '">View product ' + I.arrow + "</a>" : '<a href="#/account">Profile ' + I.arrow + "</a>") + "</div></article>";
      }).join("") + "</div></div>" + footer();
  }

  /* ---------------- HELP (contact) ---------------- */
  function contactCards() {
    return '<div class="contacts">' +
      '<a class="ct" href="mailto:' + P.email + '?subject=' + encodeURIComponent("Meesho PM role — let's talk") + '"><i>' + I.mail + "</i><b>Email</b><span>" + esc(P.email) + "</span></a>" +
      '<a class="ct" href="' + P.linkedin + '" target="_blank" rel="noopener"><i>' + I.li + "</i><b>LinkedIn</b><span>" + esc(P.linkedinShort) + "</span></a>" +
      '<a class="ct" href="' + P.phoneHref + '"><i>' + I.phone + "</i><b>Phone</b><span>" + esc(P.phone) + "</span></a>" +
      '<a class="ct" href="' + P.resume + '" target="_blank" rel="noopener"><i>' + I.doc + "</i><b>Résumé</b><span>One page, PDF ↗</span></a></div>";
  }
  function vHelp() {
    return '<div class="page"><div class="help-hero"><h2>Hi, how can I help?</h2><p>Hiring for product at Meesho? Pick a channel — I usually reply within a day.</p></div>' +
      contactCards() +
      '<div class="sec"><h3>Frequently asked</h3><div class="faq">' + D.faq.map(function (f, i) { return '<details class="acc"' + (i === 0 ? " open" : "") + "><summary>" + esc(f[0]) + '</summary><div class="acc-b"><p>' + esc(f[1]) + "</p></div></details>"; }).join("") + "</div></div>" +
      '<div class="sec"><a class="btn block" href="mailto:' + P.email + "?subject=" + encodeURIComponent("Meesho PM role — let's talk") + '">' + I.mail + 'Still need help? Write to me</a><p class="fine" style="text-align:center">' + esc(P.location) + "</p></div></div>" + footer();
  }

  /* ---------------- ACCOUNT ---------------- */
  function vAccount() {
    return '<div class="page"><div class="prof"><div class="prof-top"><img src="assets/portrait.jpg" alt="Navya Juneja" width="84" height="84"><div><h2>' + esc(P.name) + "</h2><p>" + esc(P.role) + " · Payments, fintech, 0→1</p><p>" + esc(P.location) + "</p></div></div>" +
      '<div class="prof-act"><a class="btn sm" href="' + P.resume + '" target="_blank" rel="noopener">' + I.doc + 'Résumé</a><a class="btn ol sm" href="' + P.linkedin + '" target="_blank" rel="noopener">' + I.li + "LinkedIn</a></div></div>" +
      '<div class="sec"><p class="quote">The expensive failures are the <em>quiet</em> ones.</p><p style="margin:0;color:var(--ink-2)">Two years inside PhonePe\'s payment rails — routing, acquiring-bank integrations, reconciliation — taught me that the costly problems don\'t throw errors. They drift. I build products that make them visible, and metrics that can be argued with.</p></div>' +
      '<div class="sec"><div class="menu">' +
        '<a href="#/orders">' + I.bag + t("orders") + "<em>" + D.orders.length + "</em>" + I.chev + "</a>" +
        '<a href="#/wishlist">' + I.heart + t("wishlist") + "<em>" + S.wish.length + "</em>" + I.chev + "</a>" +
        '<a href="#/cart">' + I.cart + t("cart") + "<em>" + S.cart.length + "</em>" + I.chev + "</a>" +
        '<button data-act="lang">' + I.globe + "Language<em>" + (S.lang === "hi" ? "हिंदी" : "English") + "</em>" + I.chev + "</button>" +
        '<a href="' + P.portfolio + '" target="_blank" rel="noopener">' + I.ext + "Full portfolio (all case studies)" + I.chev + "</a>" +
        '<a href="#/help">' + I.phone + t("help") + I.chev + "</a></div></div>" +
      '<div class="sec" id="habits"><h3>The through-line</h3><div class="habits">' + D.habits.map(function (h, i) { return '<div class="habit"><i>' + String.fromCharCode(65 + i) + "</i><div><b>" + esc(h[0]) + "</b><span>" + esc(h[1]) + "</span></div></div>"; }).join("") + "</div></div>" +
      '<div class="sec" id="offclock"><h3>Off the clock · rooms I\'ve had to hold</h3><div class="stats">' + D.offclock.map(function (o) { return "<div><b>" + esc(o[0]) + "</b><span>" + esc(o[1]) + "</span></div>"; }).join("") + '</div><p class="fine">Also: Mime Head at Live Illusion Productions leading a 30+ member team; Operations Head at Pravah (HR Club); Student Coordinator across 15+ college events; managed 30 interns at Infelearn; curriculum for underprivileged children at the Aahwahan Foundation.</p></div>' +
      '<div class="sec"><h3>Certifications</h3><div class="certs">' + D.certs.map(function (c) { return "<div><b>" + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></div>"; }).join("") + "</div></div>" +
      '<div class="sec"><h3>Research</h3><div class="certs"><div><b>UPI Adoption in India · Mar 2023</b><span>Sole-researcher dissertation: 211 UPI users, 24-item survey, 7 behavioural constructs, reliability, correlation and regression in SPSS. Trust, usability and perceived usefulness drove adoption.</span></div></div></div></div>' + footer();
  }

  /* ---------------- WISHLIST / CART / CHECKOUT ---------------- */
  function vWish() {
    var list = S.wish.map(function (id) { return byId[id]; });
    if (!list.length) return emptyState(I.heart, "Your wishlist is empty", "Tap ♡ on any product to save it here.", "#/shop/all", "Explore products");
    return '<div class="pg-h"><h2>' + ti("wishlist") + "</h2><p>" + list.length + ' saved</p></div><div class="wrap-d" style="padding-top:12px"><div class="grid">' + list.map(card).join("") + "</div></div>" + footer();
  }
  function emptyState(ic, h, p, href, cta) {
    return '<div class="empty"><div class="e-ic">' + ic + "</div><h2>" + esc(h) + "</h2><p>" + esc(p) + '</p><a class="btn" href="' + href + '">' + esc(cta) + "</a></div>";
  }
  function stepper(n) {
    var st = ["Cart", "Address", "Payment", "Summary"];
    return '<div class="stepper" aria-label="Checkout progress">' + st.map(function (s, i) { return (i ? "<hr>" : "") + '<div class="' + (i <= n ? "done" : "") + '"><i>' + (i < n ? "✓" : i + 1) + "</i>" + s + "</div>"; }).join("") + "</div>";
  }
  function vCart() {
    var list = S.cart.map(function (id) { return byId[id]; });
    if (!list.length) return emptyState(I.cart, "Your cart is empty", "Add case studies to shortlist them for an interview conversation.", "#/shop/all", "View products");
    return '<div class="page" style="padding-left:0;padding-right:0">' + stepper(0) + '<div class="cart-pg"><div><div class="cart-l">' + list.map(function (p) {
      return '<div class="ci"><a class="th" href="#/p/' + p.id + '" aria-label="' + esc(p.short) + '">' + poster(p) + '</a><div class="tx"><div class="nm">' + esc(p.name) + '</div><div class="pr">' + esc(p.price.v) + ' <small style="font-size:12.5px;font-weight:600;color:var(--ink-2)">' + esc(p.price.u) + "</small></div>" + provChip(p.price.prov) +
        '<div><button class="rm" data-act="rmcart" data-id="' + p.id + '">' + I.trash.replace("<svg", '<svg style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2"') + "Remove</button></div></div></div>";
    }).join("") + "</div></div>" + priceDetails(list, "#/checkout", t("cont")) + "</div></div>";
  }
  function priceDetails(list, href, cta, isBtn) {
    return '<div><div class="pd"><h3>Price Details (' + list.length + " Item" + (list.length > 1 ? "s" : "") + ")</h3>" +
      '<div class="r"><span>Case studies shortlisted</span><b>' + list.length + "</b></div>" +
      '<div class="r"><span>Intro call</span><b>30 min</b></div>' +
      '<div class="r"><span>Call charges</span><span class="g">FREE</span></div>' +
      '<div class="r"><span>Coupon “FIRSTCALL”</span><span class="g">Applied ✓</span></div>' +
      '<div class="r tot"><span>Order Total</span><span>1 conversation</span></div></div>' +
      '<div class="save-banner">Yay! Your first call is on the house 🎉</div>' +
      '<div class="paybar"><div><b>1 conversation</b><small>VIEW PRICE DETAILS</small></div>' +
      (isBtn ? '<button class="btn" data-act="place">' + esc(cta) + "</button>" : '<a class="btn" href="' + href + '">' + esc(cta) + "</a>") + "</div></div>";
  }
  function vCheckout() {
    var list = S.cart.map(function (id) { return byId[id]; });
    if (!list.length) return emptyState(I.cart, "Nothing to check out", "Add a case study to your cart first.", "#/shop/all", "View products");
    var ad = load("addr", { name: "", team: "Meesho · Product" });
    return '<div class="page" style="padding-left:0;padding-right:0">' + stepper(2) + '<div class="cart-pg"><div>' +
      '<div class="addr"><h3>Delivery address</h3><div class="field"><label for="fName">Your name (optional)</label><input id="fName" autocomplete="name" value="' + esc(ad.name) + '" placeholder="e.g. Priya, Hiring Manager"></div>' +
      '<div class="field"><label for="fTeam">Team</label><input id="fTeam" value="' + esc(ad.team) + '"></div></div>' +
      '<div class="pay"><h3>Select payment method</h3>' +
      '<div class="payopt on"><img src="assets/logos/meesho-icon.svg" alt=""><div><b>Cash on Delivery</b><span>Pay only after impact is delivered</span></div><i class="rad"></i></div>' +
      '<div class="payopt off" aria-disabled="true"><img src="assets/logos/phonepe.svg" alt=""><div><b>UPI · PhonePe</b><span>Already settled — ₹8 Cr saved a year at PhonePe</span></div><i class="rad"></i></div></div>' +
      '<div class="pd"><h3>Order summary</h3>' + list.map(function (p) { return '<div class="r"><span>' + esc(p.short) + "</span><b>" + esc(p.price.v) + "</b></div>"; }).join("") + "</div>" +
      "</div>" + priceDetails(list, "", t("placeOrder"), true) + "</div></div>";
  }
  function vPlaced() {
    return '<div class="placed"><div class="tick">' + I.check + '</div><h2>Order placed! 🎉</h2><p>Your email to Navya is drafted in your mail app — hit send and I\'ll reply within a day. Didn\'t open? Write to <a style="color:var(--m);font-weight:800" href="mailto:' + P.email + '">' + esc(P.email) + "</a>.</p>" +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn" href="#/orders">View My Orders</a><a class="btn ol" href="#/">Continue browsing</a></div></div>';
  }
  function vNotFound() { return emptyState(I.search, "Page not found", "That link doesn't lead anywhere — let's get you back to shopping.", "#/", "Go Home"); }

  /* ---------------- FOOTER ---------------- */
  function footer() {
    return '<footer class="foot"><div class="f-in"><div><div class="f-logo">' + wordmark(26) + '<span class="wm-x">× navya</span></div><p style="margin:0;max-width:360px">A product portfolio built in the image of the Meesho app, for Meesho PM applications. ' + esc(P.name) + " · " + esc(P.role) + ".</p></div>" +
      '<div><h4>Shop</h4><ul><li><a href="#/shop/all">All work</a></li><li><a href="#/shop/payments">Payments &amp; Fintech</a></li><li><a href="#/shop/seller">Seller &amp; D2C</a></li><li><a href="#/shop/mall">PhonePe Mall</a></li></ul></div>' +
      '<div><h4>Account</h4><ul><li><a href="#/orders">My Orders (Experience)</a></li><li><a href="#/account">Profile</a></li><li><a href="#/cart">Cart</a></li><li><a href="#/wishlist">Wishlist</a></li></ul></div>' +
      '<div><h4>Contact</h4><ul><li><a href="mailto:' + P.email + '">Email</a></li><li><a href="' + P.linkedin + '" target="_blank" rel="noopener">LinkedIn ↗</a></li><li><a href="' + P.phoneHref + '">' + esc(P.phone) + '</a></li><li><a href="' + P.resume + '" target="_blank" rel="noopener">Résumé (PDF) ↗</a></li></ul></div></div>' +
      '<p class="disc">Independent job-application portfolio. Not affiliated with or endorsed by Meesho or PhonePe; brand names and marks belong to their owners and are used only to reference the role and past employment. Every figure is labelled Result, Built, Modelled, Target or Sourced.</p></footer>';
  }

  /* ---------------- SHELL: header, nav, sheets ---------------- */
  function renderShell() {
    var cc = S.cart.length, wc = S.wish.length;
    var cnt = function (n) { return n ? '<span class="cnt">' + n + "</span>" : ""; };
    $("#hdr").innerHTML =
      '<div class="hdr-m"><a class="hello" href="#/account"><span class="av"><img src="assets/portrait.jpg" alt="" width="46" height="46"><em>🙏</em></span><p>' + ti("hello") + "<br><b>" + ti("letsHire") + "</b></p></a>" +
        '<div class="ico-row"><button class="lang-btn" data-act="lang" aria-label="Switch language (English / Hindi)"><span>' + (S.lang === "hi" ? "A" : "अ") + "</span></button>" +
        '<a class="ib" href="#/wishlist" aria-label="Wishlist (' + wc + ')">' + I.heart + cnt(wc) + '</a><a class="ib" href="#/cart" aria-label="Cart (' + cc + ')">' + I.cart + cnt(cc) + "</a></div></div>" +
      '<div class="search-m">' + searchBox("qm") + "</div>" +
      '<div class="hdr-sub"><button class="ib" data-act="back" aria-label="Back">' + I.back + '</button><h1 id="subTitle"></h1>' +
        '<a class="ib" href="#/shop/all" data-act="focus-search" aria-label="Search">' + I.search + '</a><a class="ib" href="#/wishlist" aria-label="Wishlist (' + wc + ')">' + I.heart + cnt(wc) + '</a><a class="ib" href="#/cart" aria-label="Cart (' + cc + ')">' + I.cart + cnt(cc) + "</a></div>" +
      '<div class="hdr-d"><a class="logo" href="#/" aria-label="Home">' + wordmark() + '<span class="wm-x">× navya</span></a>' + searchBox("qd") +
        '<div class="links"><a class="tl" href="' + P.resume + '" target="_blank" rel="noopener">' + ti("resume") + '</a><a class="tl" href="' + P.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<button class="lang-btn" data-act="lang" aria-label="Switch language (English / Hindi)"><span>' + (S.lang === "hi" ? "A" : "अ") + "</span></button>" +
        '<a class="icn" href="#/account">' + I.user + ti("profile") + '</a><a class="icn" href="#/wishlist">' + I.heart + ti("wishlist") + cnt(wc) + '</a><a class="icn" href="#/cart">' + I.cart + ti("cart") + cnt(cc) + "</a></div></div>" +
      '<nav class="navrow" aria-label="Departments"><ul>' +
        [["#/shop/all", "Popular"]].concat(D.cats.filter(function (c) { return c.id !== "all"; }).map(function (c) { return ["#/shop/" + c.id, S.lang === "hi" ? c.hi : c.name]; }))
          .concat([["#/orders", t("orders")], ["#/help", t("help")]])
          .map(function (x) { return '<li><a href="' + x[0] + '" data-nav="' + x[0] + '">' + esc(x[1]) + "</a></li>"; }).join("") + "</ul></nav>";
    $("#bnav").innerHTML = [["#/", "nHome", "home"], ["#/categories", "nCat", "categories"], ["#/orders", "nOrders", "orders"], ["#/help", "nHelp", "help"], ["#/account", "nAcc", "account"]]
      .map(function (x) { return '<a href="' + x[0] + '" data-tab="' + x[0] + '">' + I[x[1]] + ti(x[2]) + "</a>"; }).join("");
    $$("[data-q]").forEach(function (inp) { inp.value = S.f.q; });
    markNav();
  }
  function searchBox(id) {
    return '<form class="search" role="search" data-act="searchform"><label class="sr" for="' + id + '">Search products</label>' + I.search +
      '<input id="' + id + '" data-q type="search" autocomplete="off" placeholder="' + esc(t("search")) + '" enterkeyhint="search">' +
      '<button type="button" class="s-act" data-act="mic" aria-label="Voice search">' + I.mic + '</button><a class="s-act" href="#/account" aria-label="Search by photo — meet Navya">' + I.camera + "</a></form>";
  }
  function markNav() {
    var h = location.hash || "#/";
    $$("[data-tab]").forEach(function (a) {
      var tab = a.getAttribute("data-tab"), on = tab === "#/" ? (h === "#/" || h === "#" || h.indexOf("#/shop") === 0 || h.indexOf("#/p/") === 0) : h.indexOf(tab) === 0;
      a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    $$("[data-nav]").forEach(function (a) { a.classList.toggle("on", h.split("?")[0] === a.getAttribute("data-nav")); });
  }

  /* ---------------- ROUTER ---------------- */
  var lastRoute = "", navCount = 0;
  function parse() {
    var raw = (location.hash || "#/").slice(1), qi = raw.indexOf("?");
    var path = (qi > -1 ? raw.slice(0, qi) : raw) || "/", qs = {};
    if (qi > -1) raw.slice(qi + 1).split("&").forEach(function (kv) { var a = kv.split("="); if (a[0]) qs[decodeURIComponent(a[0])] = decodeURIComponent(a[1] || ""); });
    return { parts: path.split("/").filter(Boolean), qs: qs, path: path };
  }
  function route() {
    var r = parse(), p = r.parts, view = "", title = "", cls = "r-home";
    if (r.qs.seller && D.sellers[r.qs.seller]) S.f.seller = [r.qs.seller];
    if (r.qs.q != null) S.f.q = r.qs.q;
    if (!p.length) { if (lastRoute !== "/") { S.f.q = ""; $$("[data-q]").forEach(function (i) { i.value = ""; }); } view = vHome(); cls = "r-home"; }
    else if (p[0] === "shop") { var c = p[1] || "all"; if (!D.cats.some(function (x) { return x.id === c; })) c = "all"; view = vShop(c); title = catName(c); cls = "r-shop"; }
    else if (p[0] === "p") { view = vPdp(p[1]); title = byId[p[1]] ? byId[p[1]].short : "Not found"; cls = "r-pdp"; }
    else if (p[0] === "categories") { view = vCats(); title = t("categories"); cls = "r-cats"; }
    else if (p[0] === "orders") { view = vOrders(); title = t("orders"); cls = "r-orders"; }
    else if (p[0] === "help") { view = vHelp(); title = "Help Centre"; cls = "r-help"; }
    else if (p[0] === "account") { view = vAccount(); title = t("account"); cls = "r-account"; }
    else if (p[0] === "wishlist") { view = vWish(); title = t("wishlist"); cls = "r-wish"; }
    else if (p[0] === "cart") { view = vCart(); title = t("cart"); cls = "r-cart"; }
    else if (p[0] === "checkout") { view = vCheckout(); title = "Checkout"; cls = "r-cart"; }
    else if (p[0] === "placed") { view = vPlaced(); title = "Order placed"; cls = "r-cart"; }
    else { view = vNotFound(); title = "Not found"; cls = "r-nf"; }
    document.body.className = document.body.className.replace(/\br-\S+/g, "").trim() + " " + cls + (S.lang === "hi" ? " lang-hi" : "");
    var st = $("#subTitle"); if (st) st.textContent = title;
    var v = $("#view"); v.innerHTML = view; v.classList.remove("view-in"); void v.offsetWidth; v.classList.add("view-in");
    document.title = (title ? title + " · " : "") + "meesho × navya — Navya Juneja, Product Manager";
    var key = r.path;
    if (key !== lastRoute) window.scrollTo(0, 0);
    lastRoute = key;
    markNav(); updMoney(); setHdrH(); bindGallery();
    if (p[0] === "placed") confetti();
  }
  function rerender(keepScroll) { var y = window.scrollY; route(); if (keepScroll) window.scrollTo(0, y); }
  function setHdrH() { var h = $("#hdr").offsetHeight; document.documentElement.style.setProperty("--hdr-h", h + "px"); }

  /* ---------------- gallery sync ---------------- */
  function bindGallery() {
    var tr = $("#galTrack"); if (!tr) return;
    tr.addEventListener("scroll", function () {
      var i = Math.round(tr.scrollLeft / tr.clientWidth);
      $$(".dots button").forEach(function (b, j) { b.classList.toggle("on", j === i); });
      $$(".thumbs-v button").forEach(function (b, j) { b.classList.toggle("on", j === i); });
    }, { passive: true });
  }

  /* ---------------- sheets ---------------- */
  function openSheet(html, cls) {
    $("#sheet").className = "sheet on " + (cls || ""); $("#sheet").innerHTML = html; $("#scrim").classList.add("on");
    document.body.classList.add("no-scroll");
    var f = $("#sheet button, #sheet a"); if (f) f.focus();
  }
  var sheetDirty = false;
  function closeSheet() { var d = sheetDirty; sheetDirty = false; $("#sheet").classList.remove("on"); $("#scrim").classList.remove("on"); document.body.classList.remove("no-scroll"); if (d) rerender(true); }
  function sheetHead(h) { return '<div class="sheet-h"><h3>' + esc(h) + '</h3><button class="ib" data-act="close" aria-label="Close"><svg viewBox="0 0 24 24" style="stroke:#353543;fill:none;stroke-width:2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button></div>'; }
  function curCat() { var r = parse(); return r.parts[0] === "shop" ? (r.parts[1] || "all") : "all"; }
  function sheet(k) {
    var f = S.f;
    if (k === "sort") openSheet(sheetHead(t("sort")) + '<div class="sheet-b">' + SORTS.map(function (s) { return '<button class="opt' + (f.sort === s[0] ? " on" : "") + '" data-act="setsort" data-v="' + s[0] + '"><span>' + s[1] + "<small>" + s[2] + '</small></span><i class="rad"></i></button>'; }).join("") + "</div>");
    if (k === "cat") openSheet(sheetHead(t("category")) + '<div class="sheet-b">' + D.cats.map(function (c) { return '<button class="opt' + (curCat() === c.id ? " on" : "") + '" data-act="setcat" data-v="' + c.id + '"><span>' + esc(c.name) + "<small>" + D.products.filter(function (p) { return c.id === "all" || p.cats.indexOf(c.id) > -1; }).length + ' products</small></span><i class="rad"></i></button>'; }).join("") + "</div>");
    if (k === "seller" || k === "prov") {
      var keys = k === "seller" ? Object.keys(D.sellers) : ["result", "built", "modelled", "target", "sourced"];
      openSheet(sheetHead(k === "seller" ? t("company") : "Filter by evidence") + '<div class="sheet-b">' + keys.map(function (x) {
        var on = f[k].indexOf(x) > -1, lab = k === "seller" ? D.sellers[x].name : D.prov[x].label, sub = k === "seller" ? D.sellers[x].sub : D.prov[x].tip;
        return '<button class="opt' + (on ? " on" : "") + '" data-act="tog" data-k="' + k + '" data-v="' + x + '" aria-pressed="' + on + '"><span>' + esc(lab) + "<small>" + esc(sub) + '</small></span><i class="box"></i></button>';
      }).join("") + '</div><div class="sheet-f"><button class="btn ol" data-act="clr" data-k="' + k + '">Clear</button><button class="btn" data-act="close">Apply</button></div>');
    }
  }
  function micSheet() {
    openSheet(sheetHead("Voice search") + '<div class="mic-sheet"><div class="mic-pulse">' + I.mic + '</div><p><b>Bolkar search karein…</b></p><p style="color:var(--ink-3);font-size:13.5px">Try saying one of these</p><div class="chips">' +
      ["payments", "pricing", "D2C", "routing", "reconciliation", "COD", "CASE-01", "PhonePe"].map(function (w) { return '<button class="chip" data-act="say" data-v="' + w + '">“' + w + '”</button>'; }).join("") + "</div></div>");
  }

  /* ---------------- toast, confetti ---------------- */
  var tt;
  function toast(html) { var el = $("#toast"); el.innerHTML = html; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { el.classList.remove("on"); }, 2600); }
  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var box = document.createElement("div"); box.className = "confetti"; var cols = ["#9F2089", "#F43397", "#FFC93C", "#06A759", "#5CE1E6", "#5F259F"];
    for (var i = 0; i < 70; i++) { var c = document.createElement("i"); c.style.left = Math.random() * 100 + "%"; c.style.background = cols[i % cols.length]; c.style.animationDelay = Math.random() * .6 + "s"; c.style.animationDuration = 2 + Math.random() * 1.4 + "s"; box.appendChild(c); }
    document.body.appendChild(box); setTimeout(function () { box.remove(); }, 4200);
  }

  /* ---------------- actions ---------------- */
  function toggleWish(id) {
    var i = S.wish.indexOf(id);
    if (i > -1) S.wish.splice(i, 1); else S.wish.push(id);
    save("wish", S.wish);
    $$('[data-act="wish"][data-id="' + id + '"]').forEach(function (b) { var on = i < 0; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    renderShellCounts();
    toast(i < 0 ? 'Added to Wishlist ♥ <a href="#/wishlist">View</a>' : "Removed from Wishlist");
  }
  function renderShellCounts() { var y = window.scrollY; renderShell(); var st = $("#subTitle"); if (st) st.textContent = document.title.split(" · ")[0]; window.scrollTo(0, y); }
  function addCart(id, go) {
    if (S.cart.indexOf(id) < 0) { S.cart.push(id); save("cart", S.cart); renderShellCounts(); if (!go) { toast('Added to Cart 🛒 <a href="#/cart">View Cart</a>'); var b = $('[data-act="cart"][data-id="' + id + '"] span'); if (b) b.textContent = "Go to Cart"; return; } }
    else if (!go) { location.hash = "#/cart"; return; }
    if (go) location.hash = "#/checkout";
  }
  function placeOrder() {
    var name = ($("#fName") || {}).value || "", team = ($("#fTeam") || {}).value || "";
    save("addr", { name: name, team: team });
    var list = S.cart.map(function (id) { return byId[id]; });
    var body = "Hi Navya,\n\n" + (name ? "I'm " + name + (team ? " (" + team + ")" : "") + ". " : "") + "I went through your Meesho portfolio and would like to talk about a PM role.\n\nCase studies I'd like to discuss:\n" +
      list.map(function (p) { return "• " + p.short + " — " + p.price.v + " " + p.price.u + " (" + location.origin + location.pathname + "#/p/" + p.id + ")"; }).join("\n") + "\n\nThanks!";
    var href = "mailto:" + P.email + "?subject=" + encodeURIComponent("Meesho PM — let's talk") + "&body=" + encodeURIComponent(body);
    S.cart = []; save("cart", S.cart); renderShellCounts();
    location.hash = "#/placed";
    setTimeout(function () { window.location.href = href; }, 350);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]"); if (!el) return;
    var a = el.getAttribute("data-act"), id = el.getAttribute("data-id"), k = el.getAttribute("data-k"), v = el.getAttribute("data-v");
    switch (a) {
      case "wish": e.preventDefault(); toggleWish(id); break;
      case "cart": e.preventDefault(); addCart(id, false); break;
      case "buy": e.preventDefault(); addCart(id, true); break;
      case "rmcart": S.cart = S.cart.filter(function (x) { return x !== id; }); save("cart", S.cart); renderShell(); rerender(true); break;
      case "place": placeOrder(); break;
      case "back": if (navCount > 0) { navCount -= 2; history.back(); } else location.hash = "#/"; break;
      case "lang": S.lang = S.lang === "hi" ? "en" : "hi"; save("lang", S.lang); document.documentElement.lang = S.lang === "hi" ? "hi" : "en"; renderShell(); rerender(true); toast(S.lang === "hi" ? "भाषा: हिंदी (केस स्टडी अंग्रेज़ी में)" : "Language: English"); break;
      case "sheet": sheet(k); break;
      case "close": closeSheet(); break;
      case "mic": e.preventDefault(); micSheet(); break;
      case "say": closeSheet(); S.f.q = v; if (location.hash === "#/shop/all") rerender(true); else location.hash = "#/shop/all"; break;
      case "setsort": S.f.sort = v; closeSheet(); rerender(true); break;
      case "setcat": closeSheet(); location.hash = "#/shop/" + v; break;
      case "tog": var arr = S.f[k], ix = arr.indexOf(v); if (ix > -1) arr.splice(ix, 1); else arr.push(v); el.classList.toggle("on"); el.setAttribute("aria-pressed", ix < 0); sheetDirty = true; rerenderUnderSheet(); break;
      case "clr":
        if (k === "all") S.f = { sort: "rel", seller: [], prov: [], q: "" };
        else if (k === "q") S.f.q = ""; else if (k === "sort") S.f.sort = "rel";
        else if (v) S.f[k] = S.f[k].filter(function (x) { return x !== v; }); else S.f[k] = [];
        $$("[data-q]").forEach(function (i) { i.value = S.f.q; });
        if ($("#sheet").classList.contains("on")) { closeSheet(); }
        stripQs(); rerender(true); break;
      case "size":
        var p = byId[parse().parts[1]]; $$(".size").forEach(function (b) { var on = b === el; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
        $("#sizePane").textContent = p.summary[k]; break;
      case "gal": var tr = $("#galTrack"); tr.scrollTo({ left: tr.clientWidth * +el.getAttribute("data-i"), behavior: "smooth" }); break;
      case "rail": curRail = k; rerender(true); break;
      case "go": location.hash = el.getAttribute("data-h"); break;
      case "otab": S.orderTab = k; rerender(true); break;
      case "otoggle": var o = $("#o-" + id); var op = o.classList.toggle("open"); el.setAttribute("aria-expanded", op); break;
    }
  });
  function rerenderUnderSheet() { var g = $("#grid"); if (!g) return; var c = curCat(); g.innerHTML = feed(filtered(c), parse().parts.length === 0); updMoney(); }
  function stripQs() { var r = parse(); if (Object.keys(r.qs).length) history.replaceState(null, "", "#" + r.path); }
  function goShop() { var r = parse(); if (r.parts[0] === "shop") rerender(true); else location.hash = "#/shop/all"; }

  document.addEventListener("change", function (e) {
    var el = e.target, a = el.getAttribute("data-act");
    if (a === "sortsel") { S.f.sort = el.value; rerender(true); }
    if (a === "catradio") { location.hash = "#/shop/" + el.value; }
    if (a === "chk") { var k = el.getAttribute("data-k"), arr = S.f[k], ix = arr.indexOf(el.value); if (el.checked && ix < 0) arr.push(el.value); if (!el.checked && ix > -1) arr.splice(ix, 1); stripQs(); rerender(true); }
  });
  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.hasAttribute("data-q")) {
      S.f.q = el.value;
      var r = parse();
      if (r.parts[0] === "shop" || r.parts.length === 0) { var g = $("#grid"); if (g) { g.innerHTML = feed(filtered(curCat()), r.parts.length === 0); updMoney(); } }
    }
    if (el.getAttribute("data-act") === "money") updMoney();
  });
  document.addEventListener("submit", function (e) {
    if (e.target.getAttribute("data-act") === "searchform") { e.preventDefault(); var i = $("input", e.target); S.f.q = i.value; i.blur(); goShop(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("#sheet").classList.contains("on")) closeSheet(); });
  $("#scrim").addEventListener("click", closeSheet);
  window.addEventListener("hashchange", function () { navCount++; closeSheet(); route(); });
  window.addEventListener("resize", setHdrH);

  /* animated placeholder like the app */
  var phs = ["Search by Skill or Case ID", "Try “payments”", "Try “pricing”", "Try “CASE-03”", "Try “PhonePe”"], phi = 0;
  setInterval(function () { if (S.lang === "hi") return; phi = (phi + 1) % phs.length; $$("[data-q]").forEach(function (i) { if (document.activeElement !== i) i.placeholder = phs[phi]; }); }, 2600);

  /* ---------------- SPLASH ---------------- */
  function splash() {
    var sp = $("#splash"); if (!sp) return;
    var seen = false; try { seen = sessionStorage.getItem("mxn_seen") === "1"; } catch (e) {}
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dur = seen ? 1300 : (reduce ? 900 : 3400);
    var done = false;
    function end() { if (done) return; done = true; sp.classList.add("out"); document.body.classList.remove("no-scroll"); setTimeout(function () { sp.classList.add("gone"); sp.setAttribute("aria-hidden", "true"); }, 800); try { sessionStorage.setItem("mxn_seen", "1"); } catch (e) {} }
    document.body.classList.add("no-scroll");
    $("#spSkip").addEventListener("click", end);
    sp.addEventListener("click", function (e) { if (e.target.id !== "spSkip") end(); });
    setTimeout(end, dur);
  }

  /* ---------------- boot ---------------- */
  document.documentElement.lang = S.lang === "hi" ? "hi" : "en";
  renderShell(); route(); splash();
})();
