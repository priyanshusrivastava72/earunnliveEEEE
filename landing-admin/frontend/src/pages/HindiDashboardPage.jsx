// frontend/src/pages/DashboardPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSectionByKey, updateSection } from "../api/sectionApi";

const HindiDashboardPage = () => {
  const navigate = useNavigate();

  const SECTION_KEY_TOP_HEADER = "top_header_hi"; // NEW - Top header with badge, progress, timer
  const SECTION_KEY_SOCIAL_PROOF = "social_proof_bar_hi"; // NEW - Social proof marquee + progress
  const SECTION_KEY_HEADER = "header_hi";
  const SECTION_KEY_HERO = "hero_hi";
  const SECTION_KEY_SESSION = "session_hi";
  const SECTION_KEY_CTA = "cta_timer_hi"; // CTA + timer (now also contains the 4 top texts)
  const SECTION_KEY_FEATURED = "featured_logos_hi";
  const SECTION_KEY_TRANSFORM = "transform_section_hi";
  const SECTION_KEY_LEARN = "what_you_will_learn_hi";
  const SECTION_KEY_FEATURE_CARDS = "feature_cards_hi"; // NEW
  const SECTION_KEY_POWERKITS = "power_kits_hi"; // NEW - section shown in screenshot
  const SECTION_KEY_PRICING = "pricing_section_hi"; // NEW - pricing/hero section (separate)
  const SECTION_KEY_COACH = "coach_section_hi"; // NEW - coach/meet your coach section
  const SECTION_KEY_GUARANTEE = "guarantee_section_hi"; // NEW - guarantee/money-back section
  const SECTION_KEY_CLIENT_VIDEOS = "client_video_feedback_hi"; // NEW - client video feedback carousel
  const SECTION_KEY_FAQ = "faq_section_hi"; // NEW - FAQ accordion section
  const SECTION_KEY_FINAL_CTA = "final_cta_hi"; // NEW - final CTA / register banner
  const SECTION_KEY_FOOTER_PAGES = "footer_pages_hi"; // NEW - footer pages (terms/privacy/refund)

  const [activeTab, setActiveTab] = useState("topheader"); // topheader | socialproof | header | hero | session | cta | featured | transform | learn | featurecards | powerkits | pricing | coach | guarantee | clientvideos

  // ===== NEW: Top Header (badge + progress + timer) =====
  const [topHeaderForm, setTopHeaderForm] = useState({
    leftBadgeText: "Sold Out 100%",
    leftBadgeBg: "#EF4444",
    leftTextColor: "#FFFFFF",
    progressPercent: 100,
    progressBg: "#F59E0B",
    timerEmoji: "⏳",
    timerMinutes: 12,
    timerSeconds: 4,
    timerTextColor: "#FACC15"
  });
  const [topHeaderMessage, setTopHeaderMessage] = useState("");

  // ===== NEW: Social Proof Bar (marquee + progress) =====
  const [socialProofForm, setSocialProofForm] = useState({
    marqueeText: "🚀 95 Entrepreneurs Joined • 98% Satisfaction • Last Registration 3 Minutes Ago",
    marqueeTextColor: "#9A3412",
    marqueeBg: "#FFFFFF",
    noticeText: "Slots Filling Fast – Limited Seats",
    noticeDotColor: "#E11D48",
    noticeTextColor: "#92400E",
    progressPercent: 100,
    progressBarBg: "#FACC15",
    progressTrackBg: "#FEF3C7",
    progressLabel: "100.0% Sold Out",
    progressLabelColor: "#92400E"
  });
  const [socialProofMessage, setSocialProofMessage] = useState("");

  // ===== header (modified: headerImageUrl can be a dataURL from upload) =====
  const [form, setForm] = useState({
    headerImageUrl: "",
    pageHeading: "",
    pageSubheading: "",
    liveText: "",
    mainHeading: "",
    subText: "",

    // 🎨 STYLES (NEW)
    bgColor: "#ffffff",

    headingColor: "#111827",
    headingFontSize: "32px",
    headingFontWeight: "700",
    headingFontFamily: "system-ui",

    subTextColor: "#6B7280",
    subTextFontSize: "16px",

    liveTextColor: "#DC2626",

    textAlign: "center",
    paddingTop: "40px",
    paddingBottom: "40px"
  });

  // ===== hero (unchanged) =====
  const [heroForm, setHeroForm] = useState({
    heroImageUrl: "",
    stats: [
      { number: "2,400+", text: "Founders Trained" },
      { number: "4.96★", text: "Avg Rating" },
      { number: "100s", text: "Case Studies" },
      { number: "₹100Cr+", text: "Results" }
    ],
    buttonText: "Register Now At ₹99/- Only",
    buttonLink: "#",
    buttonBgColor: "#F59E0B",
    buttonTextColor: "#111827",
    badgeText: "Limited",
    badgeVisible: true
  });

  // ===== session (unchanged) =====
  const [sessionForm, setSessionForm] = useState({
    heading: "What Happens In Your 1-on-1 Session?",
    bullets: [
      "You Get Personal Attention on your exact business challenges",
      "You Receive a Custom Growth Plan designed only for your business",
      "You Discover specific action steps for revenue, team & systems",
      "You Walk Away With a clear Action roadmap",
      "1 Hour That Can Change the Way You Run Your Business"
    ],
    imageUrl: "",
    imageAlt: "Coach Image",
    imageLink: ""
  });

  // ===== CTA (now also holds the 4 top texts shown above CTA/boxes) =====
  const [ctaForm, setCtaForm] = useState({
    introText: "This is a Private 1-on-1 Guidance Session",
    principalName: "Arunn Guptaa",
    principalTitle: "India's Emerging Business Growth Coach",
    principalDescription: "Guided and Mentored Business Owners to Build Profitable & Scalable Enterprises",

    leftBoxLines: ["★★★★★", "2,400+ People Rated", "My Programs with 4.96 Star"],
    leftBoxBg: "#0f1724",
    leftBoxTextColor: "#fff",

    ctaText: "Register Now At ₹99/- Only",
    ctaLink: "#",
    ctaBg: "#F59E0B",
    ctaTextColor: "#111827",
    ctaBadge: "Limited",
    ctaBadgeVisible: true,

    timerMinutes: 15,
    timerSeconds: 0,
    previewAutoStart: false
  });

  // ===== featured logos (unchanged) =====
  const [featuredForm, setFeaturedForm] = useState({ images: [] });
  const [featuredMessage, setFeaturedMessage] = useState("");

  // ===== transform section (existing) =====
  const [transformForm, setTransformForm] = useState({
    heading: "How Your Business Will Transform With 1-on-1 Guidance",
    centerTextLine1: "Business",
    centerTextLine2: "Breakthrough",
    boxTop: "Right Mindset",
    boxLeft: "Improved\nSystems",
    boxRight: "Better\nStrategies",
    boxBottom: "High Team Performance",
    centerBg: "#F59E0B",
    centerTextColor: "#111827",
    boxBg: "#FFF9EB",
    boxBorder: "#E7C36B"
  });
  const [transformMessage, setTransformMessage] = useState("");

  // ===== learn section (existing) =====
  const [learnForm, setLearnForm] = useState({
    heading: "What You Will Learn In 1 Hr",
    items: [
      "How To Build A Growth-Focused, High-Performance Business.",
      "The Difference Between Growth Businesses & Survival Businesses.",
      "Why Most Business Owners Get Stuck — And How To Break Through.",
      "The Focus Areas Required To Build A Scalable Growth Machine."
    ],
    accentColor: "#B67B09",
    numberBg: "#FDE9A8",
    boxBorder: "#F3E0B0"
  });
  const [learnMessage, setLearnMessage] = useState("");

  // ===== NEW: feature cards section (six cards) =====
  const [featureCardsForm, setFeatureCardsForm] = useState({
    heading: "Clarity, Systems & Growth",
    cards: [
      { id: "f1", iconDataUrl: "", title: "Clarity", desc: "Get crystal-clear direction on what to focus on to grow faster." },
      { id: "f2", iconDataUrl: "", title: "Systems", desc: "Build structured processes that make your business run smoothly." },
      { id: "f3", iconDataUrl: "", title: "Growth", desc: "Unlock strategies that help you scale without chaos or confusion." },
      { id: "f4", iconDataUrl: "", title: "Leadership", desc: "Develop mindset & skills to lead your team with confidence." },
      { id: "f5", iconDataUrl: "", title: "Strategy", desc: "Learn proven business strategies that actually move the needle." },
      { id: "f6", iconDataUrl: "", title: "Execution", desc: "Implement action-driven plans that generate real business results." }
    ],
    cardBg: "#ffffff",
    cardBorder: "#F3E0B0",
    iconBg: "#FDE9A8",
    headingColor: "#B67B09"
  });
  const [featureCardsMessage, setFeatureCardsMessage] = useState("");

  // ===== NEW: PowerKits / Additional Support section (screenshot) WITH top heading/subheading =====
  const [powerKitsForm, setPowerKitsForm] = useState({
    topHeading: "Real Strategies. Real Clarity. Real Business Growth.",
    topSubheading: "“Entrepreneurs gain clarity within the first 15 minutes — guaranteed.”",
    heading: "Additional Support You'll Receive",
    cards: [
      { id: "p1", imageDataUrl: "", title: "Employee Retention PowerKit", subtitle: "A proven toolkit to keep your best employees loyal, motivated & long-term." },
      { id: "p2", imageDataUrl: "", title: "Branch / Franchise Expansion PowerKit", subtitle: "Your strategic blueprint to scale confidently into new locations." },
      { id: "p3", imageDataUrl: "", title: "Business Automation PowerKit", subtitle: "Systematize your operations and reduce manual workload effortlessly." },
      { id: "p4", imageDataUrl: "", title: "Fund Raising PowerKit", subtitle: "A step-by-step playbook to prepare, pitch & secure business funding." },
      { id: "p5", imageDataUrl: "", title: "Export–Import Launch PowerKit", subtitle: "A practical guide to start, manage & grow your export–import journey." },
      { id: "p6", imageDataUrl: "", title: "Growth Diagnosis PowerKit", subtitle: "Identify bottlenecks, fix hidden gaps & unlock fast business growth." }
    ],
    cardBg: "#ffffff",
    cardBorder: "#F3E0B0",
    headingColor: "#B67B09"
  });
  const [powerKitsMessage, setPowerKitsMessage] = useState("");

  // ===== NEW: Pricing / Hero screenshot section (separate) =====
  const [pricingForm, setPricingForm] = useState({
    topBoxes: [
      { id: "pb1", text: "Secure Payment", bg: "#fff", textColor: "#065f46" },
      { id: "pb2", text: "100% Privacy Safe", bg: "#fff", textColor: "#065f46" },
      { id: "pb3", text: "Money-Back Guarantee", bg: "#fff", textColor: "#065f46" }
    ],
    heroImageDataUrl: "",
    heading: "Start Your 1-on-1 Guidance Journey",
    subheading: "Book your 1-on-1 session and get personalized Guidance built only for your business.",
    pricingCard: {
      oldPrice: "₹9999",
      price: "₹99",
      note: "Start your session for just ₹99, Today. If the session genuinely helps you, you pay the remaining ₹900 after the session.",
      ctaText: "Book Your Slot for ₹99",
      ctaBadge: "Limited",
      ctaBg: "#F59E0B",
      ctaTextColor: "#111827"
    },
    cardBg: "#ffffff",
    cardBorder: "#F3E0B0",
    headingColor: "#A95600"
  });
  const [pricingMessage, setPricingMessage] = useState("");

  // ===== NEW: Coach / Meet Your Coach section =====
  const [coachForm, setCoachForm] = useState({
    topHeading: "Meet Your Coach",
    subtitleUnderlineColor: "#F59E0B",
    coachImageDataUrl: "", // upload from device (dataURL)
    coachName: "Arunn Guptaa",
    coachTitle: "India's Leading Business Success Coach",
    stats: [
      { id: "s1", number: "16", text: "Years of Experience" },
      { id: "s2", number: "1M", text: "Entrepreneurs Reached" },
      { id: "s3", number: "500+", text: "Seminars Conducted" },
      { id: "s4", number: "600K", text: "Followers" },
      { id: "s5", number: "2,400", text: "Paid Customers" },
      { id: "s6", number: "2400+", text: "Entrepreneur Community" },
      { id: "s7", number: "2,400", text: "Guidance Clients" },
      { id: "s8", number: "210+", text: "Industries Worked With" }
    ],
    statCardBg: "#ffffff",
    statCardBorder: "#F3E0B0",
    numberColor: "#D97706",
    headingColor: "#111827"
  });
  const [coachMessage, setCoachMessage] = useState("");

  // ===== NEW: Guarantee section =====
  const [guaranteeForm, setGuaranteeForm] = useState({
    heroImageDataUrl: "", // top image (money-back badge) - upload from device
    topImageAlt: "Guarantee Badge",
    heading: "Our Guarantee",
    subHeading: "A Promise",
    highlightedLine: "No Questions Asked Money Back Guarantee",
    bodyParagraphs: [
      "Join today for just ₹99 and experience a powerful business-growth session. If you feel it did not deliver value, we will give your money back — no questions asked. 100% satisfaction or full refund!",
      "Dear Participant,\n\nI am here to guide you personally and share powerful business insights that can help you take your business to the next level.",
      "If not satisfied, request a refund within 1 Hour of session — no questions asked. Simply email refund@arunlive.com."
    ],
    signatureName: "Arunn Guptaa",
    ctaText: "Register Now At ₹99/- Only",
    ctaLink: "#",
    ctaBg: "#F59E0B",
    ctaTextColor: "#111827",
    cardBg: "#ffffff",
    cardBorder: "#F3E0B0",
    headingColor: "#D97706"
  });
  const [guaranteeMessage, setGuaranteeMessage] = useState("");

  // ===== NEW: Client Video Feedback section =====
  const [clientVideosForm, setClientVideosForm] = useState({
    heading: "Client Video Feedback",
    description: "Real feedback from our clients — watch short clips.",
    videos: [], // { id, name, dataUrl, duration? }
    showCount: 3 // how many videos to show at once in preview
  });
  const [clientVideosMessage, setClientVideosMessage] = useState("");
  const [clientVideosIndex, setClientVideosIndex] = useState(0); // carousel index

  // ===== NEW: FAQ section =====
  const [faqForm, setFaqForm] = useState({
    heading: "Frequently Asked Questions",
    items: [
      { id: "q1", question: "Is this a 1-on-1 session?", answer: "Yes. This is a personalized Guidance session where only you & the coach are present." },
      { id: "q2", question: "What happens in the session?", answer: "You get personalized clarity, custom strategies, and a Roadmap." },
      { id: "q3", question: "Do I need to prepare?", answer: "Yes. After registration, you'll receive a short form for details." }
    ]
  });
  const [faqMessage, setFaqMessage] = useState("");

  // ===== NEW: Final CTA / Register Banner =====
  const [finalCtaForm, setFinalCtaForm] = useState({
    heading: "Ready For Personal 1-on-1 Guidance?",
    subheading: "Reserve your private session now — limited seats available.",
    buttonText: "Register Now @ ₹99",
    buttonLink: "#",
    buttonBg: "#FBBF24",
    buttonTextColor: "#111827",
    badgeText: "Limited",
    badgeVisible: true,
    sectionBg: "#FEFBEA"
  });
  const [finalCtaMessage, setFinalCtaMessage] = useState("");

  // ===== NEW: Footer pages (terms / privacy / refund) =====
  // ===== Footer pages (terms / privacy / refund) =====
  const [footerPagesForm, setFooterPagesForm] = useState({
    footerImage: "",   // NEW: logo/image at top of footer
    copyright: "© 2025 Arunn Gupta. All rights reserved.",  // NEW

    terms: {
      blocks: [
        { id: "b1", type: "heading", text: "Terms and Conditions" },
        { id: "b2", type: "paragraph", text: "Write your terms here…" }
      ]
    },
    privacy: {
      blocks: [
        { id: "b1", type: "heading", text: "Privacy Policy" },
        { id: "b2", type: "paragraph", text: "Write about privacy here…" }
      ]
    },
    refund: {
      blocks: [
        { id: "b1", type: "heading", text: "Refund Policy" },
        { id: "b2", type: "paragraph", text: "Refund process explanation…" }
      ]
    },

    lastUpdatedBy: ""
  });
  const [footerPagesMessage, setFooterPagesMessage] = useState("");
  const [footerEditTab, setFooterEditTab] = useState("terms"); // 'terms' | 'privacy' | 'refund'

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const countdownRef = useRef(null);
  const [previewRemainingMs, setPreviewRemainingMs] = useState(0);
  const [previewRunning, setPreviewRunning] = useState(false);

  // ===== load sections =====
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchSections = async () => {
      // Load Top Header (NEW)
      try {
        const thData = await getSectionByKey(SECTION_KEY_TOP_HEADER);
        const extra = thData.extraData || {};
        setTopHeaderForm(prev => ({
          ...prev,
          ...extra
        }));
      } catch (err) {
        console.warn("Top header missing in DB — will create on save.");
      }

      // Load Social Proof Bar (NEW)
      try {
        const spData = await getSectionByKey(SECTION_KEY_SOCIAL_PROOF);
        const extra = spData.extraData || {};
        setSocialProofForm(prev => ({ ...prev, ...extra }));
      } catch (err) {
        console.warn("Social proof section missing — will create on save.");
      }

      // Load Header (Upper Section)
      try {
        const headerData = await getSectionByKey(SECTION_KEY_HEADER);
        const extraHeader = headerData.extraData || {};
        setForm({
          headerImageUrl: headerData.imageUrl || "",
          pageHeading: extraHeader.pageHeading || "",
          pageSubheading: extraHeader.pageSubheading || "",
          liveText: extraHeader.liveText || "LIVE TODAY",
          mainHeading:
            extraHeader.mainHeading || "1-on-1 Private Business Guidance Session",
          subText: extraHeader.subText || "(Only a few slots left)",

          // Load styles
          bgColor: extraHeader.bgColor || "#ffffff",
          headingColor: extraHeader.headingColor || "#111827",
          headingFontSize: extraHeader.headingFontSize || "32px",
          headingFontWeight: extraHeader.headingFontWeight || "700",
          headingFontFamily: extraHeader.headingFontFamily || "system-ui",
          subTextColor: extraHeader.subTextColor || "#6B7280",
          subTextFontSize: extraHeader.subTextFontSize || "16px",
          liveTextColor: extraHeader.liveTextColor || "#DC2626",
          textAlign: extraHeader.textAlign || "center",
          paddingTop: extraHeader.paddingTop || "40px",
          paddingBottom: extraHeader.paddingBottom || "40px"
        });
      } catch (err) {
        console.warn("Header missing in DB — will create on save.");
      }

      try {
        const heroData = await getSectionByKey(SECTION_KEY_HERO);
        const extra = heroData.extraData || {};
        setHeroForm((prev) => ({
          ...prev,
          heroImageUrl: heroData.imageUrl || prev.heroImageUrl,
          stats: extra.stats || prev.stats,
          buttonText: extra.buttonText || prev.buttonText,
          buttonLink: extra.buttonLink || prev.buttonLink,
          buttonBgColor: extra.buttonBgColor || prev.buttonBgColor,
          buttonTextColor: extra.buttonTextColor || prev.buttonTextColor,
          badgeText: extra.badgeText || prev.badgeText,
          badgeVisible:
            typeof extra.badgeVisible === "boolean"
              ? extra.badgeVisible
              : prev.badgeVisible
        }));
      } catch (err) {
        console.warn("Hero missing in DB — will create on save.");
      }

      // session
      try {
        const sessionData = await getSectionByKey(SECTION_KEY_SESSION);
        const extra = sessionData.extraData || {};
        setSessionForm((prev) => ({
          ...prev,
          heading: extra.heading || prev.heading,
          bullets: Array.isArray(extra.bullets) && extra.bullets.length ? extra.bullets : prev.bullets,
          imageUrl: sessionData.imageUrl || prev.imageUrl,
          imageAlt: extra.imageAlt || prev.imageAlt,
          imageLink: extra.imageLink || prev.imageLink
        }));
      } catch (err) {
        console.warn("Session missing in DB — will create on save.");
      }

      // cta + timer + top texts
      try {
        const ctaData = await getSectionByKey(SECTION_KEY_CTA);
        const extra = ctaData.extraData || {};
        setCtaForm((prev) => ({
          ...prev,
          introText: extra.introText || prev.introText,
          principalName: extra.principalName || prev.principalName,
          principalTitle: extra.principalTitle || prev.principalTitle,
          principalDescription: extra.principalDescription || prev.principalDescription,

          leftBoxLines: Array.isArray(extra.leftBoxLines) && extra.leftBoxLines.length ? extra.leftBoxLines : prev.leftBoxLines,
          leftBoxBg: extra.leftBoxBg || prev.leftBoxBg,
          leftBoxTextColor: extra.leftBoxTextColor || prev.leftBoxTextColor,

          ctaText: extra.ctaText || prev.ctaText,
          ctaLink: extra.ctaLink || prev.ctaLink,
          ctaBg: extra.ctaBg || prev.ctaBg,
          ctaTextColor: extra.ctaTextColor || prev.ctaTextColor,
          ctaBadge: extra.ctaBadge || prev.ctaBadge,
          ctaBadgeVisible: typeof extra.ctaBadgeVisible === "boolean" ? extra.ctaBadgeVisible : prev.ctaBadgeVisible,

          timerMinutes: typeof extra.timerMinutes === "number" ? extra.timerMinutes : prev.timerMinutes,
          timerSeconds: typeof extra.timerSeconds === "number" ? extra.timerSeconds : prev.timerSeconds,
          previewAutoStart: !!extra.previewAutoStart
        }));
      } catch (err) {
        console.warn("CTA/timer missing in DB — will create on save.");
      }

      // featured logos
      try {
        const featuredData = await getSectionByKey(SECTION_KEY_FEATURED);
        const extra = featuredData.extraData || {};
        if (Array.isArray(extra.images) && extra.images.length) {
          setFeaturedForm({ images: extra.images });
        }
      } catch (err) {
        console.warn("Featured logos missing in DB — will create on save.");
      }

      // transform section
      try {
        const tData = await getSectionByKey(SECTION_KEY_TRANSFORM);
        const extra = tData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setTransformForm((prev) => ({
            ...prev,
            heading: extra.heading || prev.heading,
            centerTextLine1: extra.centerTextLine1 || prev.centerTextLine1,
            centerTextLine2: extra.centerTextLine2 || prev.centerTextLine2,
            boxTop: extra.boxTop || prev.boxTop,
            boxLeft: extra.boxLeft || prev.boxLeft,
            boxRight: extra.boxRight || prev.boxRight,
            boxBottom: extra.boxBottom || prev.boxBottom,
            centerBg: extra.centerBg || prev.centerBg,
            centerTextColor: extra.centerTextColor || prev.centerTextColor,
            boxBg: extra.boxBg || prev.boxBg,
            boxBorder: extra.boxBorder || prev.boxBorder
          }));
        }
      } catch (err) {
        console.warn("Transform missing in DB — will create on save.");
      }

      // learn section
      try {
        const lData = await getSectionByKey(SECTION_KEY_LEARN);
        const extra = lData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setLearnForm((prev) => ({
            ...prev,
            heading: extra.heading || prev.heading,
            items: Array.isArray(extra.items) && extra.items.length ? extra.items : prev.items,
            accentColor: extra.accentColor || prev.accentColor,
            numberBg: extra.numberBg || prev.numberBg,
            boxBorder: extra.boxBorder || prev.boxBorder
          }));
        }
      } catch (err) {
        console.warn("Learn section missing in DB — will create on save.");
      }

      // NEW: feature cards
      try {
        const fcData = await getSectionByKey(SECTION_KEY_FEATURE_CARDS);
        const extra = fcData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setFeatureCardsForm((prev) => ({
            ...prev,
            heading: extra.heading || prev.heading,
            cards: Array.isArray(extra.cards) && extra.cards.length ? extra.cards : prev.cards,
            cardBg: extra.cardBg || prev.cardBg,
            cardBorder: extra.cardBorder || prev.cardBorder,
            iconBg: extra.iconBg || prev.iconBg,
            headingColor: extra.headingColor || prev.headingColor
          }));
        }
      } catch (err) {
        console.warn("Feature cards missing in DB — will create on save.");
      }

      // NEW: power kits (screenshot section)
      try {
        const pkData = await getSectionByKey(SECTION_KEY_POWERKITS);
        const extra = pkData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setPowerKitsForm((prev) => ({
            ...prev,
            topHeading: extra.topHeading || prev.topHeading,
            topSubheading: extra.topSubheading || prev.topSubheading,
            heading: extra.heading || prev.heading,
            cards: Array.isArray(extra.cards) && extra.cards.length ? extra.cards : prev.cards,
            cardBg: extra.cardBg || prev.cardBg,
            cardBorder: extra.cardBorder || prev.cardBorder,
            headingColor: extra.headingColor || prev.headingColor
          }));
        }
      } catch (err) {
        console.warn("PowerKits missing in DB — will create on save.");
      }

      // pricing section (new)
      try {
        const pData = await getSectionByKey(SECTION_KEY_PRICING);
        const extra = pData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setPricingForm((prev) => ({
            ...prev,
            topBoxes: Array.isArray(extra.topBoxes) && extra.topBoxes.length ? extra.topBoxes : prev.topBoxes,
            heroImageDataUrl: pData.imageUrl || extra.heroImageDataUrl || prev.heroImageDataUrl,
            heading: extra.heading || prev.heading,
            subheading: extra.subheading || prev.subheading,
            pricingCard: extra.pricingCard || prev.pricingCard,
            cardBg: extra.cardBg || prev.cardBg,
            cardBorder: extra.cardBorder || prev.cardBorder,
            headingColor: extra.headingColor || prev.headingColor
          }));
        }
      } catch (err) {
        console.warn("Pricing section missing in DB — will create on save.");
      }

      // coach section (new)
      try {
        const cData = await getSectionByKey(SECTION_KEY_COACH);
        const extra = cData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setCoachForm((prev) => ({
            ...prev,
            topHeading: extra.topHeading || prev.topHeading,
            subtitleUnderlineColor: extra.subtitleUnderlineColor || prev.subtitleUnderlineColor,
            coachImageDataUrl: cData.imageUrl || extra.coachImageDataUrl || prev.coachImageDataUrl,
            coachName: extra.coachName || prev.coachName,
            coachTitle: extra.coachTitle || prev.coachTitle,
            stats: Array.isArray(extra.stats) && extra.stats.length ? extra.stats : prev.stats,
            statCardBg: extra.statCardBg || prev.statCardBg,
            statCardBorder: extra.statCardBorder || prev.statCardBorder,
            numberColor: extra.numberColor || prev.numberColor,
            headingColor: extra.headingColor || prev.headingColor
          }));
        }
      } catch (err) {
        console.warn("Coach section missing in DB — will create on save.");
      }

      // guarantee section
      try {
        const gData = await getSectionByKey(SECTION_KEY_GUARANTEE);
        const extra = gData.extraData || {};
        setGuaranteeForm((prev) => ({
          ...prev,
          heroImageDataUrl: gData.imageUrl || extra.heroImageDataUrl || prev.heroImageDataUrl,
          topImageAlt: extra.topImageAlt || prev.topImageAlt,
          heading: extra.heading || prev.heading,
          subHeading: extra.subHeading || prev.subHeading,
          highlightedLine: extra.highlightedLine || prev.highlightedLine,
          bodyParagraphs: Array.isArray(extra.bodyParagraphs) && extra.bodyParagraphs.length ? extra.bodyParagraphs : prev.bodyParagraphs,
          signatureName: extra.signatureName || prev.signatureName,
          ctaText: extra.ctaText || prev.ctaText,
          ctaLink: extra.ctaLink || prev.ctaLink,
          ctaBg: extra.ctaBg || prev.ctaBg,
          ctaTextColor: extra.ctaTextColor || prev.ctaTextColor,
          cardBg: extra.cardBg || prev.cardBg,
          cardBorder: extra.cardBorder || prev.cardBorder,
          headingColor: extra.headingColor || prev.headingColor
        }));
      } catch (err) {
        console.warn("Guarantee section missing in DB — will create on save.");
      }

      // client video feedback
      try {
        const vData = await getSectionByKey(SECTION_KEY_CLIENT_VIDEOS);
        const extra = vData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setClientVideosForm((prev) => ({
            ...prev,
            heading: extra.heading || prev.heading,
            description: extra.description || prev.description,
            videos: Array.isArray(extra.videos) ? extra.videos : prev.videos,
            showCount: typeof extra.showCount === "number" ? extra.showCount : prev.showCount
          }));
        } else if (vData && vData.imageUrl) {
          // legacy: if imageUrl used to store a single video dataUrl
          setClientVideosForm(prev => ({ ...prev, videos: [{ id: `v_${Date.now()}`, name: "video", dataUrl: vData.imageUrl }] }));
        }
      } catch (err) {
        console.warn("Client videos missing in DB — will create on save.");
      }

      // FAQ
      try {
        const fData = await getSectionByKey(SECTION_KEY_FAQ);
        const extra = fData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setFaqForm((prev) => ({
            ...prev,
            heading: extra.heading || prev.heading,
            items: Array.isArray(extra.items) && extra.items.length ? extra.items : prev.items
          }));
        }
      } catch (err) {
        console.warn("FAQ missing in DB — will create on save.");
      }

      // final CTA / bottom banner
      try {
        const fCtaData = await getSectionByKey(SECTION_KEY_FINAL_CTA);
        const extra = fCtaData.extraData || {};
        if (extra && Object.keys(extra).length) {
          setFinalCtaForm(prev => ({
            ...prev,
            heading: extra.heading || prev.heading,
            subheading: extra.subheading || prev.subheading,
            buttonText: extra.buttonText || prev.buttonText,
            buttonLink: extra.buttonLink || prev.buttonLink,
            buttonBg: extra.buttonBg || prev.buttonBg,
            buttonTextColor: extra.buttonTextColor || prev.buttonTextColor,
            badgeText: extra.badgeText || prev.badgeText,
            badgeVisible: typeof extra.badgeVisible === "boolean" ? extra.badgeVisible : prev.badgeVisible,
            sectionBg: extra.sectionBg || prev.sectionBg
          }));
        }
      } catch (err) {
        console.warn("Final CTA missing in DB — will create on save.");
      }

      // footer pages (terms / privacy / refund)
      try {
        const fpData = await getSectionByKey(SECTION_KEY_FOOTER_PAGES);
        const extra = fpData.extraData || {};

        setFooterPagesForm(prev => ({
          ...prev,
          footerImage: extra.footerImage || prev.footerImage,
          copyright: extra.copyright || prev.copyright,

          terms: extra.terms || prev.terms,
          privacy: extra.privacy || prev.privacy,
          refund: extra.refund || prev.refund,

          lastUpdatedBy: extra.lastUpdatedBy || prev.lastUpdatedBy
        }));
      } catch (err) {
        console.warn("Footer pages missing — will be created on save.");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();

    return () => clearInterval(countdownRef.current);
  }, [navigate]);

  // ===== handlers =====
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // ===== TOP HEADER handlers (NEW) =====
  const handleSaveTopHeader = async () => {
    setTopHeaderMessage("");
    try {
      const payload = {
        title: "Top Header",
        imageUrl: "",
        extraData: { ...topHeaderForm }
      };
      await updateSection(SECTION_KEY_TOP_HEADER, payload);
      setTopHeaderMessage("✅ Header saved.");
    } catch (err) {
      console.error("Error saving top header:", err);
      setTopHeaderMessage("❌ Error saving header. Check console/backend.");
    }
  };

  // ===== SOCIAL PROOF BAR handlers (NEW) =====
  const handleSaveSocialProof = async () => {
    setSocialProofMessage("");
    try {
      await updateSection(SECTION_KEY_SOCIAL_PROOF, {
        title: "Social Proof Bar",
        imageUrl: "",
        extraData: { ...socialProofForm }
      });
      setSocialProofMessage("✅ Social proof section saved.");
    } catch (err) {
      console.error("Error saving social proof:", err);
      setSocialProofMessage("❌ Error saving section.");
    }
  };

  // ===== UPPER SECTION handlers (formerly "header") =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // New: header file upload -> convert to dataURL and store in headerImageUrl
  const handleHeaderFiles = (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const file = arr[0]; // accept only first file for header
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setForm((prev) => ({ ...prev, headerImageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveHeader = async () => {
    setMessage("");
    try {
      const payload = {
        title: form.pageHeading || form.mainHeading,
        subtitle: form.pageSubheading || form.subText,
        content: form.subText,
        imageUrl: form.headerImageUrl,
        extraData: {
          ...form  // 👈 Save entire form object (content + styles)
        }
      };
      await updateSection(SECTION_KEY_HEADER, payload);
      setMessage("✅ Header saved.");
    } catch (err) {
      console.error("Error saving header:", err);
      setMessage("❌ Error saving header. Check console/backend.");
    }
  };

  // hero handlers (unchanged)
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleStatChange = (index, field, value) => {
    setHeroForm((prev) => {
      const newStats = prev.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s));
      return { ...prev, stats: newStats };
    });
  };
  const handleSaveHero = async () => {
    setMessage("");
    try {
      const payload = {
        title: heroForm.buttonText,
        imageUrl: heroForm.heroImageUrl,
        extraData: {
          stats: heroForm.stats,
          buttonText: heroForm.buttonText,
          buttonLink: heroForm.buttonLink,
          buttonBgColor: heroForm.buttonBgColor,
          buttonTextColor: heroForm.buttonTextColor,
          badgeText: heroForm.badgeText,
          badgeVisible: heroForm.badgeVisible
        }
      };
      await updateSection(SECTION_KEY_HERO, payload);
      setMessage("✅ Hero saved.");
    } catch (err) {
      console.error("Error saving hero:", err);
      setMessage("❌ Error saving hero. Check console/backend.");
    }
  };

  // session handlers (unchanged)
  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setSessionForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleBulletChange = (index, value) => {
    setSessionForm((prev) => {
      const bullets = prev.bullets.map((b, i) => (i === index ? value : b));
      return { ...prev, bullets };
    });
  };
  const addBullet = () => setSessionForm((prev) => ({ ...prev, bullets: [...prev.bullets, "New bullet"] }));
  const removeBullet = (idx) => setSessionForm((prev) => ({ ...prev, bullets: prev.bullets.filter((_, i) => i !== idx) }));
  const handleSaveSession = async () => {
    setMessage("");
    try {
      const payload = {
        title: sessionForm.heading,
        imageUrl: sessionForm.imageUrl,
        extraData: {
          heading: sessionForm.heading,
          bullets: sessionForm.bullets,
          imageAlt: sessionForm.imageAlt,
          imageLink: sessionForm.imageLink
        }
      };
      await updateSection(SECTION_KEY_SESSION, payload);
      setMessage("✅ Session saved.");
    } catch (err) {
      console.error("Error saving session:", err);
      setMessage("❌ Error saving session. Check console/backend.");
    }
  };

  // CTA handlers (now includes the 4 top texts)
  const handleCtaChange = (e) => {
    const { name, value } = e.target;
    setCtaForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleLeftLineChange = (idx, value) => {
    setCtaForm((prev) => {
      const leftBoxLines = prev.leftBoxLines.map((l, i) => (i === idx ? value : l));
      return { ...prev, leftBoxLines };
    });
  };
  const addLeftLine = () => setCtaForm((prev) => ({ ...prev, leftBoxLines: [...prev.leftBoxLines, "New line"] }));
  const removeLeftLine = (idx) => setCtaForm((prev) => ({ ...prev, leftBoxLines: prev.leftBoxLines.filter((_, i) => i !== idx) }));

  const handleSaveCta = async () => {
    setMessage("");
    try {
      const payload = {
        title: ctaForm.ctaText,
        imageUrl: "",
        extraData: {
          introText: ctaForm.introText,
          principalName: ctaForm.principalName,
          principalTitle: ctaForm.principalTitle,
          principalDescription: ctaForm.principalDescription,

          leftBoxLines: ctaForm.leftBoxLines,
          leftBoxBg: ctaForm.leftBoxBg,
          leftBoxTextColor: ctaForm.leftBoxTextColor,

          ctaText: ctaForm.ctaText,
          ctaLink: ctaForm.ctaLink,
          ctaBg: ctaForm.ctaBg,
          ctaTextColor: ctaForm.ctaTextColor,
          ctaBadge: ctaForm.ctaBadge,
          ctaBadgeVisible: ctaForm.ctaBadgeVisible,

          timerMinutes: Number(ctaForm.timerMinutes),
          timerSeconds: Number(ctaForm.timerSeconds),
          previewAutoStart: !!ctaForm.previewAutoStart
        }
      };
      await updateSection(SECTION_KEY_CTA, payload);
      setMessage("✅ CTA saved.");
    } catch (err) {
      console.error("Error saving CTA:", err);
      setMessage("❌ Error saving CTA. Check console/backend.");
    }
  };

  // featured handlers (unchanged)
  const handleFeaturedFiles = (files) => {
    const arr = Array.from(files || []);
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setFeaturedForm((prev) => ({
          images: [
            ...prev.images,
            { id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, name: file.name, dataUrl }
          ]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFeaturedImage = (id) => {
    setFeaturedForm((prev) => ({ images: prev.images.filter((it) => it.id !== id) }));
  };

  const moveFeaturedImage = (id, dir) => {
    setFeaturedForm((prev) => {
      const images = [...prev.images];
      const idx = images.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= images.length) return prev;
      const [item] = images.splice(idx, 1);
      images.splice(newIdx, 0, item);
      return { images };
    });
  };

  const handleSaveFeatured = async () => {
    setFeaturedMessage("");
    try {
      const payload = {
        title: "Featured logos",
        imageUrl: "",
        extraData: { images: featuredForm.images }
      };
      await updateSection(SECTION_KEY_FEATURED, payload);
      setFeaturedMessage("✅ Featured logos saved.");
    } catch (err) {
      console.error("Error saving featured:", err);
      setFeaturedMessage("❌ Error saving featured. Check console/backend.");
    }
  };

  // transform handlers (existing)
  const handleTransformChange = (e) => {
    const { name, value } = e.target;
    setTransformForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveTransform = async () => {
    setTransformMessage("");
    try {
      const payload = {
        title: transformForm.heading,
        imageUrl: "",
        extraData: { ...transformForm }
      };
      await updateSection(SECTION_KEY_TRANSFORM, payload);
      setTransformMessage("✅ Transform saved.");
    } catch (err) {
      console.error("Error saving transform:", err);
      setTransformMessage("❌ Error saving transform. Check console/backend.");
    }
  };

  // learn handlers (existing)
  const handleLearnChange = (e) => {
    const { name, value } = e.target;
    setLearnForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLearnItemChange = (idx, value) => {
    setLearnForm((prev) => {
      const items = prev.items.map((it, i) => (i === idx ? value : it));
      return { ...prev, items };
    });
  };

  const addLearnItem = () => setLearnForm((prev) => ({ ...prev, items: [...prev.items, "New item"] }));
  const removeLearnItem = (idx) => setLearnForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));

  const handleSaveLearn = async () => {
    setLearnMessage("");
    try {
      const payload = {
        title: learnForm.heading,
        imageUrl: "",
        extraData: { ...learnForm }
      };
      await updateSection(SECTION_KEY_LEARN, payload);
      setLearnMessage("✅ Learn section saved.");
    } catch (err) {
      console.error("Error saving learn:", err);
      setLearnMessage("❌ Error saving learn. Check console/backend.");
    }
  };

  // ===== NEW: feature cards handlers =====
  const handleFeatureIconUpload = (index, files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const file = arr[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setFeatureCardsForm((prev) => {
        const cards = prev.cards.map((c, i) => (i === index ? { ...c, iconDataUrl: dataUrl } : c));
        return { ...prev, cards };
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFeatureCardChange = (index, field, value) => {
    setFeatureCardsForm((prev) => {
      const cards = prev.cards.map((c, i) => (i === index ? { ...c, [field]: value } : c));
      return { ...prev, cards };
    });
  };

  const addFeatureCard = () => {
    setFeatureCardsForm((prev) => ({
      ...prev,
      cards: [...prev.cards, { id: `f${Date.now()}`, iconDataUrl: "", title: "New Title", desc: "New description" }]
    }));
  };

  const removeFeatureCard = (index) => {
    setFeatureCardsForm((prev) => ({ ...prev, cards: prev.cards.filter((_, i) => i !== index) }));
  };

  const handleFeatureCardsStyleChange = (e) => {
    const { name, value } = e.target;
    setFeatureCardsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFeatureCards = async () => {
    setFeatureCardsMessage("");
    try {
      const payload = {
        title: featureCardsForm.heading,
        imageUrl: "",
        extraData: { ...featureCardsForm }
      };
      await updateSection(SECTION_KEY_FEATURE_CARDS, payload);
      setFeatureCardsMessage("✅ Feature cards saved.");
    } catch (err) {
      console.error("Error saving feature cards:", err);
      setFeatureCardsMessage("❌ Error saving feature cards. Check console/backend.");
    }
  };

  // ===== NEW: PowerKits handlers (screenshot section) =====
  const handlePowerKitImageUpload = (index, files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const file = arr[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPowerKitsForm((prev) => {
        const cards = prev.cards.map((c, i) => (i === index ? { ...c, imageDataUrl: dataUrl } : c));
        return { ...prev, cards };
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePowerKitChange = (index, field, value) => {
    setPowerKitsForm((prev) => {
      const cards = prev.cards.map((c, i) => (i === index ? { ...c, [field]: value } : c));
      return { ...prev, cards };
    });
  };

  const addPowerKitCard = () => {
    setPowerKitsForm((prev) => ({
      ...prev,
      cards: [...prev.cards, { id: `p${Date.now()}`, imageDataUrl: "", title: "New PowerKit", subtitle: "New subtitle" }]
    }));
  };

  const removePowerKitCard = (index) => {
    setPowerKitsForm((prev) => ({ ...prev, cards: prev.cards.filter((_, i) => i !== index) }));
  };

  const handlePowerKitsStyleChange = (e) => {
    const { name, value } = e.target;
    setPowerKitsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePowerKits = async () => {
    setPowerKitsMessage("");
    try {
      const payload = {
        title: powerKitsForm.heading,
        imageUrl: "",
        extraData: { ...powerKitsForm }
      };
      await updateSection(SECTION_KEY_POWERKITS, payload);
      setPowerKitsMessage("✅ PowerKits saved.");
    } catch (err) {
      console.error("Error saving powerkits:", err);
      setPowerKitsMessage("❌ Error saving powerkits. Check console/backend.");
    }
  };

  // ===== Pricing handlers (new) =====
  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    // allow top-level keys like heading, subheading
    if (name.startsWith("pricingCard.")) {
      const key = name.split(".")[1];
      setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, [key]: value } }));
    } else {
      setPricingForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Image upload for hero image (device -> dataURL)
  const handlePricingImageFiles = (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const file = arr[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setPricingForm(prev => ({ ...prev, heroImageDataUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleTopBoxChange = (index, field, value) => {
    setPricingForm(prev => {
      const topBoxes = prev.topBoxes.map((b, i) => i === index ? { ...b, [field]: value } : b);
      return { ...prev, topBoxes };
    });
  };

  const handleSavePricing = async () => {
    setPricingMessage("");
    try {
      const payload = {
        title: pricingForm.heading,
        imageUrl: pricingForm.heroImageDataUrl,
        extraData: {
          topBoxes: pricingForm.topBoxes,
          heroImageDataUrl: pricingForm.heroImageDataUrl,
          heading: pricingForm.heading,
          subheading: pricingForm.subheading,
          pricingCard: pricingForm.pricingCard,
          cardBg: pricingForm.cardBg,
          cardBorder: pricingForm.cardBorder,
          headingColor: pricingForm.headingColor
        }
      };
      await updateSection(SECTION_KEY_PRICING, payload);
      setPricingMessage("✅ Pricing saved.");
    } catch (err) {
      console.error("Error saving pricing:", err);
      setPricingMessage("❌ Error saving pricing. Check console/backend.");
    }
  };

  // ===== Coach handlers =====
  const handleCoachChange = (e) => {
    const { name, value } = e.target;
    setCoachForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCoachImageFiles = (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const file = arr[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setCoachForm(prev => ({ ...prev, coachImageDataUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatChangeCoach = (index, field, value) => {
    setCoachForm(prev => {
      const stats = prev.stats.map((s, i) => i === index ? { ...s, [field]: value } : s);
      return { ...prev, stats };
    });
  };

  const addCoachStat = () => {
    setCoachForm(prev => ({ ...prev, stats: [...prev.stats, { id: `s${Date.now()}`, number: "New", text: "Label" }] }));
  };

  const removeCoachStat = (idx) => {
    setCoachForm(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== idx) }));
  };

  const handleSaveCoach = async () => {
    setCoachMessage("");
    try {
      const payload = {
        title: coachForm.topHeading,
        imageUrl: coachForm.coachImageDataUrl,
        extraData: {
          topHeading: coachForm.topHeading,
          subtitleUnderlineColor: coachForm.subtitleUnderlineColor,
          coachImageDataUrl: coachForm.coachImageDataUrl,
          coachName: coachForm.coachName,
          coachTitle: coachForm.coachTitle,
          stats: coachForm.stats,
          statCardBg: coachForm.statCardBg,
          statCardBorder: coachForm.statCardBorder,
          numberColor: coachForm.numberColor,
          headingColor: coachForm.headingColor
        }
      };
      await updateSection(SECTION_KEY_COACH, payload);
      setCoachMessage("✅ Coach section saved.");
    } catch (err) {
      console.error("Error saving coach section:", err);
      setCoachMessage("❌ Error saving coach. Check console/backend.");
    }
  };

  // ===== Guarantee handlers =====
  const handleGuaranteeChange = (e) => {
    const { name, value } = e.target;
    setGuaranteeForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGuaranteeBodyChange = (index, value) => {
    setGuaranteeForm(prev => {
      const bodyParagraphs = prev.bodyParagraphs.map((p, i) => (i === index ? value : p));
      return { ...prev, bodyParagraphs };
    });
  };

  const addGuaranteeParagraph = () => setGuaranteeForm(prev => ({ ...prev, bodyParagraphs: [...prev.bodyParagraphs, "New paragraph"] }));
  const removeGuaranteeParagraph = (idx) => setGuaranteeForm(prev => ({ ...prev, bodyParagraphs: prev.bodyParagraphs.filter((_, i) => i !== idx) }));

  const handleGuaranteeImageFiles = (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const file = arr[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setGuaranteeForm(prev => ({ ...prev, heroImageDataUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGuarantee = async () => {
    setGuaranteeMessage("");
    try {
      const payload = {
        title: guaranteeForm.heading,
        imageUrl: guaranteeForm.heroImageDataUrl,
        extraData: {
          heroImageDataUrl: guaranteeForm.heroImageDataUrl,
          topImageAlt: guaranteeForm.topImageAlt,
          heading: guaranteeForm.heading,
          subHeading: guaranteeForm.subHeading,
          highlightedLine: guaranteeForm.highlightedLine,
          bodyParagraphs: guaranteeForm.bodyParagraphs,
          signatureName: guaranteeForm.signatureName,
          ctaText: guaranteeForm.ctaText,
          ctaLink: guaranteeForm.ctaLink,
          ctaBg: guaranteeForm.ctaBg,
          ctaTextColor: guaranteeForm.ctaTextColor,
          cardBg: guaranteeForm.cardBg,
          cardBorder: guaranteeForm.cardBorder,
          headingColor: guaranteeForm.headingColor
        }
      };
      await updateSection(SECTION_KEY_GUARANTEE, payload);
      setGuaranteeMessage("✅ Guarantee section saved.");
    } catch (err) {
      console.error("Error saving guarantee:", err);
      setGuaranteeMessage("❌ Error saving guarantee. Check console/backend.");
    }
  };

  // ===== Client Videos handlers =====
  const handleClientVideoFiles = (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        // create id and push
        setClientVideosForm(prev => ({
          ...prev,
          videos: [
            ...prev.videos,
            { id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, name: file.name, dataUrl }
          ]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeClientVideo = (id) => {
    setClientVideosForm(prev => ({ ...prev, videos: prev.videos.filter(v => v.id !== id) }));
  };

  const moveClientVideo = (id, dir) => {
    setClientVideosForm(prev => {
      const videos = [...prev.videos];
      const idx = videos.findIndex(v => v.id === id);
      if (idx === -1) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= videos.length) return prev;
      const [item] = videos.splice(idx, 1);
      videos.splice(newIdx, 0, item);
      return { ...prev, videos };
    });
  };

  const handleClientVideosStyleChange = (e) => {
    const { name, value } = e.target;
    setClientVideosForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClientVideos = async () => {
    setClientVideosMessage("");
    try {
      const payload = {
        title: clientVideosForm.heading,
        imageUrl: "", // not used
        extraData: {
          heading: clientVideosForm.heading,
          description: clientVideosForm.description,
          videos: clientVideosForm.videos,
          showCount: clientVideosForm.showCount
        }
      };
      await updateSection(SECTION_KEY_CLIENT_VIDEOS, payload);
      setClientVideosMessage("✅ Client videos saved.");
    } catch (err) {
      console.error("Error saving client videos:", err);
      setClientVideosMessage("❌ Error saving client videos. Check console/backend.");
    }
  };

  // ===== FAQ handlers =====
  const addFaqItem = () => {
    setFaqForm(prev => ({
      ...prev,
      items: [...prev.items, { id: `q${Date.now()}`, question: "New question", answer: "New answer" }]
    }));
  };

  const removeFaqItem = (index) => {
    setFaqForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleFaqItemChange = (index, field, value) => {
    setFaqForm(prev => {
      const items = prev.items.map((it, i) => i === index ? { ...it, [field]: value } : it);
      return { ...prev, items };
    });
  };

  const toggleFaqPreviewOpen = (index) => {
    setFaqForm(prev => {
      const items = prev.items.map((it, i) => i === index ? { ...it, open: !it.open } : { ...it, open: false });
      return { ...prev, items };
    });
  };

  const handleSaveFaq = async () => {
    setFaqMessage("");
    try {
      const payload = {
        title: faqForm.heading,
        imageUrl: "",
        extraData: {
          heading: faqForm.heading,
          items: faqForm.items
        }
      };
      await updateSection(SECTION_KEY_FAQ, payload);
      setFaqMessage("✅ FAQ saved.");
    } catch (err) {
      console.error("Error saving FAQ:", err);
      setFaqMessage("❌ Error saving FAQ. Check console/backend.");
    }
  };

  // ===== Final CTA handlers =====
  const handleFinalCtaChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFinalCtaForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setFinalCtaForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveFinalCta = async () => {
    setFinalCtaMessage("");
    try {
      const payload = {
        title: finalCtaForm.heading,
        imageUrl: "",
        extraData: { ...finalCtaForm }
      };
      await updateSection(SECTION_KEY_FINAL_CTA, payload);
      setFinalCtaMessage("✅ Final CTA saved.");
    } catch (err) {
      console.error("Error saving final CTA:", err);
      setFinalCtaMessage("❌ Error saving Final CTA. Check console/backend.");
    }
  };

  // handlers to edit simple fields (no HTML)
  // Add a new block (heading or paragraph)
  const addFooterBlock = (page, blockType) => {
    setFooterPagesForm(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        blocks: [
          ...prev[page].blocks,
          {
            id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            type: blockType,
            text: blockType === "heading" ? "New Heading" : "New paragraph..."
          }
        ]
      }
    }));
  };

  // Update block content
  const updateFooterBlock = (page, blockId, value) => {
    setFooterPagesForm(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        blocks: prev[page].blocks.map(b =>
          b.id === blockId ? { ...b, text: value } : b
        )
      }
    }));
  };

  // Delete block
  const removeFooterBlock = (page, blockId) => {
    setFooterPagesForm(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        blocks: prev[page].blocks.filter(b => b.id !== blockId)
      }
    }));
  };

  // Move block (up/down)
  const moveFooterBlock = (page, blockId, direction) => {
    setFooterPagesForm(prev => {
      const blocks = [...prev[page].blocks];
      const index = blocks.findIndex(b => b.id === blockId);
      if (index < 0) return prev;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= blocks.length) return prev;

      const [item] = blocks.splice(index, 1);
      blocks.splice(newIndex, 0, item);

      return {
        ...prev,
        [page]: { ...prev[page], blocks }
      };
    });
  };

  // Save to DB
  const handleSaveFooterPages = async () => {
    setFooterPagesMessage("");

    try {
      const payload = {
        title: "Footer pages",
        imageUrl: "",
        extraData: {
          footerImage: footerPagesForm.footerImage,
          copyright: footerPagesForm.copyright,

          terms: footerPagesForm.terms,
          privacy: footerPagesForm.privacy,
          refund: footerPagesForm.refund,

          lastUpdatedBy: footerPagesForm.lastUpdatedBy || "admin"
        }
      };

      await updateSection(SECTION_KEY_FOOTER_PAGES, payload);
      setFooterPagesMessage("✅ Saved successfully!");
    } catch (err) {
      console.error(err);
      setFooterPagesMessage("❌ Error saving footer section.");
    }
  };

  // Carousel navigation
  const clientVideosPrev = () => {
    setClientVideosIndex(i => Math.max(0, i - 1));
  };
  const clientVideosNext = () => {
    setClientVideosIndex(i => {
      const maxIndex = Math.max(0, Math.ceil((clientVideosForm.videos.length - clientVideosForm.showCount) / 1));
      return Math.min(maxIndex, i + 1);
    });
  };

  // Helper to open device file picker (reusable pattern)
  const openClientVideoPicker = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.multiple = true;
    input.onchange = (e) => {
      handleClientVideoFiles(e.target.files);
    };
    input.click();
  };;

  // ===== Image Gallery Picker =====
  const openImageGallery = (field, index) => {
    // Create a hidden file input and trigger it
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = e.target.files;
      if (!files || !files.length) return;

      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const selectedImageUrl = event.target.result;

        // Handle different sections
        if (field === "sessionImage") {
          setSessionForm(prev => ({
            ...prev,
            imageUrl: selectedImageUrl,
          }));
          return;
        }

        if (field === "powerKitsImage") {
          setPowerKitsForm((prev) => {
            const cards = prev.cards.map((c, i) => (i === index ? { ...c, imageDataUrl: selectedImageUrl } : c));
            return { ...prev, cards };
          });
        }

        if (field === "footerImage") {
          setFooterPagesForm(prev => ({ ...prev, footerImage: selectedImageUrl }));
          return;
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // ===== countdown preview logic =====
  const startPreviewCountdown = (minutes, seconds) => {
    clearInterval(countdownRef.current);
    const totalMs = (Number(minutes) * 60 + Number(seconds)) * 1000;
    if (!totalMs || totalMs <= 0) return;
    const start = Date.now();
    const end = start + totalMs;
    setPreviewRemainingMs(totalMs);
    setPreviewRunning(true);

    countdownRef.current = setInterval(() => {
      const now = Date.now();
      const rem = Math.max(0, end - now);
      setPreviewRemainingMs(rem);
      if (rem <= 0) {
        clearInterval(countdownRef.current);
        setPreviewRunning(false);
      }
    }, 250);
  };
  const stopPreviewCountdown = () => {
    clearInterval(countdownRef.current);
    setPreviewRunning(false);
    setPreviewRemainingMs(0);
  };
  const formatMs = (ms) => {
    const totalSec = Math.ceil(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return { mm: String(mins).padStart(2, "0"), ss: String(secs).padStart(2, "0") };
  };

  useEffect(() => {
    if (ctaForm.previewAutoStart) {
      startPreviewCountdown(ctaForm.timerMinutes, ctaForm.timerSeconds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctaForm.previewAutoStart]);

  if (loading) {
    return <div style={{ padding: 20, fontFamily: "system-ui" }}>Loading admin data...</div>;
  }

  // ===== RENDER =====
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 260, background: "#111827", color: "white", padding: 20, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", height: "100vh" }}>
        <div><h2 style={{ margin: 0, fontSize: 18 }}>Admin Dashboard</h2></div>

        <button onClick={() => setActiveTab("topheader")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "topheader" ? "#FBBF24" : "transparent", color: activeTab === "topheader" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Header</button>

        <button onClick={() => setActiveTab("socialproof")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "socialproof" ? "#FBBF24" : "transparent", color: activeTab === "socialproof" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Social Proof Bar</button>

        <button onClick={() => setActiveTab("header")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "header" ? "#FBBF24" : "transparent", color: activeTab === "header" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Upper Section</button>

        <button onClick={() => setActiveTab("hero")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "hero" ? "#FBBF24" : "transparent", color: activeTab === "hero" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Hero Section</button>

        <button onClick={() => setActiveTab("session")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "session" ? "#FBBF24" : "transparent", color: activeTab === "session" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Session Section</button>

        <button onClick={() => setActiveTab("cta")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "cta" ? "#FBBF24" : "transparent", color: activeTab === "cta" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>CTA & Timer</button>

        <button onClick={() => setActiveTab("featured")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "featured" ? "#FBBF24" : "transparent", color: activeTab === "featured" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Featured Logos
        </button>

        <button onClick={() => setActiveTab("transform")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "transform" ? "#FBBF24" : "transparent", color: activeTab === "transform" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Transform Section
        </button>

        <button onClick={() => setActiveTab("learn")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "learn" ? "#FBBF24" : "transparent", color: activeTab === "learn" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          What You Will Learn
        </button>

        {/* NEW tab button for Feature Cards */}
        <button onClick={() => setActiveTab("featurecards")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "featurecards" ? "#FBBF24" : "transparent", color: activeTab === "featurecards" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Feature Cards
        </button>

        {/* NEW tab for PowerKits (screenshot) */}
        <button onClick={() => setActiveTab("powerkits")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "powerkits" ? "#FBBF24" : "transparent", color: activeTab === "powerkits" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          PowerKits / Support
        </button>

        {/* NEW tab for Pricing / Hero Card */}
        <button onClick={() => setActiveTab("pricing")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "pricing" ? "#FBBF24" : "transparent", color: activeTab === "pricing" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Pricing / Hero Card
        </button>

        {/* NEW tab for Coach */}
        <button onClick={() => setActiveTab("coach")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "coach" ? "#FBBF24" : "transparent", color: activeTab === "coach" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Meet Your Coach
        </button>

        {/* NEW tab for Guarantee / Refund */}
        <button onClick={() => setActiveTab("guarantee")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "guarantee" ? "#FBBF24" : "transparent", color: activeTab === "guarantee" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Guarantee / Refund
        </button>

        {/* NEW tab for Client Video Feedback */}
        <button onClick={() => setActiveTab("clientvideos")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "clientvideos" ? "#FBBF24" : "transparent", color: activeTab === "clientvideos" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Client Video Feedback
        </button>

        <button onClick={() => setActiveTab("faq")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "faq" ? "#FBBF24" : "transparent", color: activeTab === "faq" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          FAQ
        </button>

        <button onClick={() => setActiveTab("finalcta")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "finalcta" ? "#FBBF24" : "transparent", color: activeTab === "finalcta" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Final CTA / Register
        </button>

        <button onClick={() => setActiveTab("footerpages")} style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", background: activeTab === "footerpages" ? "#FBBF24" : "transparent", color: activeTab === "footerpages" ? "#111827" : "#E5E7EB", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
          Footer Pages (T&C / Privacy / Refund)
        </button>

        <button onClick={handleLogout} style={{ marginTop: "auto", padding: 10, width: "100%", background: "#DC2626", border: "none", borderRadius: 4, color: "white", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Logout</button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: 28, background: "#F3F4F6", overflowY: "auto", height: "100vh" }}>
        {/* PANEL TOGGLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "1px solid #d1d5db",
              background: window.location.pathname === "/dashboard" ? "#fbbf24" : "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🇬🇧 English Admin
          </button>

          <button
            onClick={() => navigate("/dashboard-hi")}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "1px solid #d1d5db",
              background: window.location.pathname === "/dashboard-hi" ? "#fbbf24" : "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🇮🇳 Hindi Admin
          </button>
        </div>

        {/* HEADER editor (modified image upload UI) */}
        {activeTab === "header" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Header Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the big page heading & subheading, the header image, and the yellow box three lines.</p>

            <div style={{ marginTop: 20, maxWidth: 900, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              {/* ===== NEW: Header Image Upload (device) ===== */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Header Image (upload from device)</label>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input id="header-file-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleHeaderFiles(e.target.files)} />
                  <label htmlFor="header-file-input" style={{ padding: "10px 14px", background: "#FBBF24", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Upload image</label>

                  {/* optional pasteable URL input (so external URL still supported) */}
                  <input name="headerImageUrl" value={form.headerImageUrl} onChange={handleChange} placeholder="Or paste external image URL (optional)" style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>

                {/* preview */}
                {form.headerImageUrl ? (
                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Preview:</p>
                    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #E5E7EB", display: "inline-block", background: "#FFF" }}>
                      <img src={form.headerImageUrl} alt="Header preview" style={{ maxWidth: 600, display: "block" }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: 12, color: "#6B7280" }}>No header image selected yet.</div>
                )}
              </div>

              <hr style={{ margin: "20px 0", borderColor: "#E5E7EB" }} />

              <div style={{ marginBottom: 14, marginTop: 10 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Line 1 – आज LIVE सेशन</label>
                <input name="liveText" value={form.liveText} onChange={handleChange} placeholder="आज LIVE सेशन" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Line 2 – Main bold heading</label>
                <input name="mainHeading" value={form.mainHeading} onChange={handleChange} placeholder="1-on-1 Private Business Guidance Session" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Line 3 – Sub text (bracket line)</label>
                <input name="subText" value={form.subText} onChange={handleChange} placeholder="(आज के लिए कुछ ही स्लॉट बचे हैं)" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
              </div>

              <hr style={{ margin: "24px 0", borderColor: "#E5E7EB" }} />

              {/* ===== 🎨 STYLING CONTROLS (NEW) ===== */}
              <h3 style={{ fontSize: 18, marginBottom: 12, marginTop: 0 }}>🎨 Header Styling</h3>
              <p style={{ marginTop: 0, color: "#6B7280", fontSize: 13, marginBottom: 16 }}>Customize colors, fonts, sizes, alignment, and spacing</p>

              {/* Background Color */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Background Color</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="color" name="bgColor" value={form.bgColor} onChange={handleChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                  <input name="bgColor" value={form.bgColor} onChange={handleChange} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
              </div>

              {/* Main Heading Styles */}
              <h4 style={{ fontSize: 15, marginBottom: 10, marginTop: 20, color: "#374151" }}>Main Heading Styles</h4>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading Color</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="color" name="headingColor" value={form.headingColor} onChange={handleChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                    <input name="headingColor" value={form.headingColor} onChange={handleChange} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading Font Size</label>
                  <input name="headingFontSize" value={form.headingFontSize} onChange={handleChange} placeholder="32px" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading Font Weight</label>
                  <select name="headingFontWeight" value={form.headingFontWeight} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }}>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Font Family</label>
                  <select name="headingFontFamily" value={form.headingFontFamily} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }}>
                    <option value="system-ui">System UI</option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                    <option value="'Inter', sans-serif">Inter</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Montserrat', sans-serif">Montserrat</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="Georgia, serif">Georgia</option>
                  </select>
                </div>
              </div>

              {/* Sub Text Styles */}
              <h4 style={{ fontSize: 15, marginBottom: 10, marginTop: 20, color: "#374151" }}>Sub Text Styles</h4>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Sub Text Color</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="color" name="subTextColor" value={form.subTextColor} onChange={handleChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                    <input name="subTextColor" value={form.subTextColor} onChange={handleChange} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Sub Text Font Size</label>
                  <input name="subTextFontSize" value={form.subTextFontSize} onChange={handleChange} placeholder="16px" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
              </div>

              {/* Live Text Color */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Live Text Color</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="color" name="liveTextColor" value={form.liveTextColor} onChange={handleChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                  <input name="liveTextColor" value={form.liveTextColor} onChange={handleChange} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
              </div>

              {/* Layout & Spacing */}
              <h4 style={{ fontSize: 15, marginBottom: 10, marginTop: 20, color: "#374151" }}>Layout & Spacing</h4>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Text Align</label>
                  <select name="textAlign" value={form.textAlign} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Padding Top</label>
                  <input name="paddingTop" value={form.paddingTop} onChange={handleChange} placeholder="40px" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Padding Bottom</label>
                  <input name="paddingBottom" value={form.paddingBottom} onChange={handleChange} placeholder="40px" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
              </div>

              <hr style={{ margin: "24px 0", borderColor: "#E5E7EB" }} />

              {/* ===== LIVE PREVIEW ===== */}
              <h3 style={{ fontSize: 18, marginBottom: 12, marginTop: 0 }}>👁️ Live Preview</h3>
              <div style={{
                backgroundColor: form.bgColor,
                textAlign: form.textAlign,
                paddingTop: form.paddingTop,
                paddingBottom: form.paddingBottom,
                borderRadius: 10,
                border: "2px solid #E5E7EB",
                marginBottom: 20
              }}>
                {form.liveText && (
                  <div style={{
                    color: form.liveTextColor,
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px"
                  }}>
                    {form.liveText}
                  </div>
                )}

                {form.mainHeading && (
                  <h1 style={{
                    color: form.headingColor,
                    fontSize: form.headingFontSize,
                    fontWeight: form.headingFontWeight,
                    fontFamily: form.headingFontFamily,
                    margin: "0 0 8px 0"
                  }}>
                    {form.mainHeading}
                  </h1>
                )}

                {form.subText && (
                  <p style={{
                    color: form.subTextColor,
                    fontSize: form.subTextFontSize,
                    margin: 0
                  }}>
                    {form.subText}
                  </p>
                )}
              </div>

              <button onClick={handleSaveHeader} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Header</button>

              {message && <div style={{ marginTop: 12, fontSize: 14, color: message.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{message}</div>}
            </div>
          </>
        )}

        {/* HERO editor (unchanged) */}
        {activeTab === "hero" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Hero Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the four stat boxes and the CTA button (text/link/colors).</p>

            <div style={{ marginTop: 20, maxWidth: 900, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Page Heading (big text shown on top)</label>
                <input name="pageHeading" value={form.pageHeading} onChange={handleChange} placeholder="आपके बिज़नेस के लिए पर्सनल 1-on-1 गाइडेंस के साथ गहरा ट्रांसफॉर्मेशन" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Page Subheading (paragraph under the big heading)</label>
                <input name="pageSubheading" value={form.pageSubheading} onChange={handleChange} placeholder="यहाँ आपको क्लियर रोडमैप, सही स्ट्रेटेजी और वह डायरेक्शन मिलेगा जो सीधे आपके खुद के बिज़नेस पर लागू होता है।" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
              </div>

              <hr style={{ margin: "18px 0", borderColor: "#E5E7EB" }} />

              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Stats / Boxes</h3>
              <p style={{ marginTop: 0, color: "#6B7280", fontSize: 13 }}>Edit number and description for each box.</p>

              {heroForm.stats.map((s, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Box {idx + 1} – Number</label>
                    <input value={s.number} onChange={(e) => handleStatChange(idx, "number", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Box {idx + 1} – Text</label>
                    <input value={s.text} onChange={(e) => handleStatChange(idx, "text", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                  </div>
                </div>
              ))}

              <hr style={{ margin: "18px 0", borderColor: "#E5E7EB" }} />

              <h3 style={{ fontSize: 16, marginBottom: 8 }}>CTA Button</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Button Text</label>
                  <input name="buttonText" value={heroForm.buttonText} onChange={handleHeroChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Button Link</label>
                  <input name="buttonLink" value={heroForm.buttonLink} onChange={handleHeroChange} placeholder="https://example.com/register" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Button background color</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="color"
                      name="buttonBgColor"
                      value={heroForm.buttonBgColor}
                      onChange={handleHeroChange}
                      style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                    />
                    <input
                      name="buttonBgColor"
                      value={heroForm.buttonBgColor}
                      onChange={handleHeroChange}
                      style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }}
                    />
                  </div>

                </div>
                <div>

                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Button text color</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="color"
                      name="buttonTextColor"
                      value={heroForm.buttonTextColor}
                      onChange={handleHeroChange}
                      style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                    />
                    <input
                      name="buttonTextColor"
                      value={heroForm.buttonTextColor}
                      onChange={handleHeroChange}
                      style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }}
                    />
                  </div>



                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Badge text (optional)</label>
                  <input name="badgeText" value={heroForm.badgeText} onChange={handleHeroChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Show badge?</label>
                  <select name="badgeVisible" value={heroForm.badgeVisible ? "yes" : "no"} onChange={(e) => setHeroForm(prev => ({ ...prev, badgeVisible: e.target.value === "yes" }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 14 }}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
                <button onClick={handleSaveHero} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Hero</button>

                <div style={{ marginLeft: "auto" }}>
                  <div style={{ marginBottom: 6, fontSize: 13, color: "#6B7280" }}>CTA preview</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, background: heroForm.buttonBgColor, color: heroForm.buttonTextColor, fontWeight: 700 }}>
                    <span>{heroForm.buttonText}</span>
                    {heroForm.badgeVisible && heroForm.badgeText && (
                      <span style={{ background: "#FF4D4F", color: "white", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{heroForm.badgeText}</span>
                    )}
                  </div>
                </div>
              </div>

              {message && <div style={{ marginTop: 12, fontSize: 14, color: message.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{message}</div>}
            </div>
          </>
        )}

        {/* SESSION editor (unchanged) */}
        {activeTab === "session" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Session Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the left content box (heading + bullets) and the right image card.</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading</label>
                    <input name="heading" value={sessionForm.heading} onChange={handleSessionChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Bullets</label>
                    {sessionForm.bullets.map((b, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <input value={b} onChange={(e) => handleBulletChange(idx, e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        <button onClick={() => removeBullet(idx)} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}>Remove</button>
                      </div>
                    ))}
                    <div><button onClick={addBullet} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add bullet</button></div>
                  </div>
                </div>

                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Session Image</label>

                    <div
                      onClick={() => openImageGallery("sessionImage")}
                      style={{
                        width: "100%",
                        height: 180,
                        border: "2px dashed #D1D5DB",
                        borderRadius: 10,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        background: "#fafafa",
                      }}
                    >
                      {sessionForm.imageUrl ? (
                        <img
                          src={sessionForm.imageUrl}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#6B7280" }}>Click to choose image</span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Image Alt</label>
                    <input name="imageAlt" value={sessionForm.imageAlt} onChange={handleSessionChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Image Link (optional)</label>
                    <input name="imageLink" value={sessionForm.imageLink} onChange={handleSessionChange} placeholder="https://..." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <button onClick={handleSaveSession} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Session</button>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <h4 style={{ margin: "0 0 12px 0" }}>Live Preview</h4>
                <div style={{ display: "flex", gap: 24, alignItems: "stretch", justifyContent: "center" }}>
                  <div style={{ background: "#fff", borderRadius: 12, padding: 28, width: "60%", maxWidth: 640, border: "1px solid rgba(203, 116, 12, 0.10)", boxShadow: "0 3px 18px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>{sessionForm.heading}</div>
                    <ul style={{ paddingLeft: 18, margin: 0, listStyle: "disc", color: "#374151", lineHeight: 1.7 }}>
                      {sessionForm.bullets.map((b, i) => <li key={i} style={{ marginBottom: 8 }}>{b}</li>)}
                    </ul>
                  </div>

                  <div style={{ width: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ borderRadius: 16, padding: 18, background: "#fff", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
                      {sessionForm.imageUrl ? (
                        <a href={sessionForm.imageLink || "#"} target="_blank" rel="noreferrer">
                          <img src={sessionForm.imageUrl} alt={sessionForm.imageAlt} style={{ display: "block", width: 320, borderRadius: 12 }} />
                        </a>
                      ) : (
                        <div style={{ width: 320, height: 420, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", background: "#F8FAFC", borderRadius: 12 }}>No image</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {message && <div style={{ marginTop: 12, color: message.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{message}</div>}
            </div>
          </>
        )}

        {/* CTA editor (modified to include 4 top texts) */}
        {activeTab === "cta" && (
          <>
            <h1 style={{ marginBottom: 8 }}>CTA & Timer (includes top 4 texts)</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Configure the top texts (intro/name/title/desc), left stat box, CTA button and timer. This keeps everything in one place as you requested.</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
                {/* left inputs */}
                <div>
                  {/* TOP 4 TEXTS */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Intro small text (top)</label>
                    <input name="introText" value={ctaForm.introText} onChange={handleCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Principal / Name</label>
                      <input name="principalName" value={ctaForm.principalName} onChange={handleCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Name subtitle / Role</label>
                      <input name="principalTitle" value={ctaForm.principalTitle} onChange={handleCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: 12, marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Short description under name</label>
                    <input name="principalDescription" value={ctaForm.principalDescription} onChange={handleCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  {/* left box lines */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Left box lines (top → bottom)</label>
                    {ctaForm.leftBoxLines.map((l, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <input value={l} onChange={(e) => handleLeftLineChange(idx, e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        <button onClick={() => removeLeftLine(idx)} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}>Remove</button>
                      </div>
                    ))}
                    <div><button onClick={addLeftLine} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add line</button></div>
                  </div>

                  <div style={{ marginBottom: 12 }}>

                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Left box background</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="color"
                        name="leftBoxBg"
                        value={ctaForm.leftBoxBg}
                        onChange={handleCtaChange}
                        style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                      />
                      <input
                        name="leftBoxBg"
                        value={ctaForm.leftBoxBg}
                        onChange={handleCtaChange}
                        style={{ width: 160, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                      />
                    </div>




                  </div>

                  <div style={{ marginBottom: 12 }}>

                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Left box text color</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="color"
                        name="leftBoxTextColor"
                        value={ctaForm.leftBoxTextColor}
                        onChange={handleCtaChange}
                        style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                      />
                      <input
                        name="leftBoxTextColor"
                        value={ctaForm.leftBoxTextColor}
                        onChange={handleCtaChange}
                        style={{ width: 160, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                      />
                    </div>




                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  {/* CTA fields */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA Text</label>
                    <input name="ctaText" value={ctaForm.ctaText} onChange={handleCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA Link</label>
                      <input name="ctaLink" value={ctaForm.ctaLink} onChange={handleCtaChange} placeholder="https://..." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>

                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="ctaBg"
                          value={ctaForm.ctaBg}
                          onChange={handleCtaChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="ctaBg"
                          value={ctaForm.ctaBg}
                          onChange={handleCtaChange}
                          style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>




                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="ctaTextColor"
                          value={ctaForm.ctaTextColor}
                          onChange={handleCtaChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="ctaTextColor"
                          value={ctaForm.ctaTextColor}
                          onChange={handleCtaChange}
                          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Badge text</label>
                      <input name="ctaBadge" value={ctaForm.ctaBadge} onChange={handleCtaChange} style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Show badge?</label>
                      <select value={ctaForm.ctaBadgeVisible ? "yes" : "no"} onChange={(e) => setCtaForm(prev => ({ ...prev, ctaBadgeVisible: e.target.value === "yes" }))} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Timer - Minutes</label>
                    <input type="number" min={0} value={ctaForm.timerMinutes} onChange={(e) => setCtaForm(prev => ({ ...prev, timerMinutes: Number(e.target.value) }))} style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Timer - Seconds</label>
                    <input type="number" min={0} max={59} value={ctaForm.timerSeconds} onChange={(e) => setCtaForm(prev => ({ ...prev, timerSeconds: Number(e.target.value) }))} style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Auto-start preview?</label>
                    <select value={ctaForm.previewAutoStart ? "yes" : "no"} onChange={(e) => setCtaForm(prev => ({ ...prev, previewAutoStart: e.target.value === "yes" }))} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={handleSaveCta} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save CTA & Timer</button>

                    <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                      <button onClick={() => startPreviewCountdown(ctaForm.timerMinutes, ctaForm.timerSeconds)} style={{ padding: "8px 12px", background: "#10B981", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Start Preview</button>
                      <button onClick={() => stopPreviewCountdown()} style={{ padding: "8px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Stop</button>
                    </div>
                  </div>

                  {message && <div style={{ marginTop: 12, color: message.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{message}</div>}
                </div>

                {/* right: preview (includes the 4 top texts above CTA/boxes) */}
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Preview</div>

                  {/* TOP 4 TEXTS PREVIEW */}
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ color: "#6B7280", fontSize: 14 }}>{ctaForm.introText}</div>
                    <div style={{ fontSize: 36, fontWeight: 900, marginTop: 6 }}>{ctaForm.principalName}</div>
                    <div style={{ color: "#374151", fontSize: 16, marginTop: 6 }}>{ctaForm.principalTitle}</div>
                    <div style={{ marginTop: 10, color: "#6B7280", fontSize: 14 }}>{ctaForm.principalDescription}</div>
                  </div>

                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <div style={{ background: ctaForm.leftBoxBg, color: ctaForm.leftBoxTextColor, padding: "14px 18px", borderRadius: 12, width: 220, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
                      {ctaForm.leftBoxLines.map((l, i) => <div key={i} style={{ fontSize: i === 0 ? 18 : 13, fontWeight: i === 0 ? 800 : 600, marginBottom: 6 }}>{l}</div>)}
                    </div>

                    <div style={{ background: ctaForm.ctaBg, color: ctaForm.ctaTextColor, padding: "14px 18px", borderRadius: 999, boxShadow: "0 12px 40px rgba(245,158,11,0.18)", fontWeight: 800 }}>
                      <a href={ctaForm.ctaLink || "#"} target="_blank" rel="noreferrer" style={{ color: ctaForm.ctaTextColor, textDecoration: "none" }}>{ctaForm.ctaText}</a>
                      {ctaForm.ctaBadgeVisible && ctaForm.ctaBadge && <span style={{ marginLeft: 8, background: "#FF4D4F", color: "white", padding: "4px 8px", borderRadius: 8, fontWeight: 800 }}>{ctaForm.ctaBadge}</span>}
                    </div>
                  </div>

                  <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 8, textAlign: "center" }}>Register in next</div>

                  <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                    {previewRemainingMs > 0 ? (() => {
                      const { mm, ss } = formatMs(previewRemainingMs);
                      return (
                        <>
                          <div style={{ width: 96, height: 96, background: "#000", color: "#fff", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}>
                            <div style={{ fontSize: 34, fontWeight: 900 }}>{mm}</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Minutes</div>
                          </div>
                          <div style={{ width: 96, height: 96, background: "#000", color: "#fff", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}>
                            <div style={{ fontSize: 34, fontWeight: 900 }}>{ss}</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Seconds</div>
                          </div>
                        </>
                      );
                    })() : (
                      <>
                        <div style={{ width: 96, height: 96, background: "#f3f4f6", color: "#374151", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }}>
                          <div style={{ fontSize: 28, fontWeight: 900 }}>--</div>
                          <div style={{ fontSize: 12 }}>Minutes</div>
                        </div>
                        <div style={{ width: 96, height: 96, background: "#f3f4f6", color: "#374151", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }}>
                          <div style={{ fontSize: 28, fontWeight: 900 }}>--</div>
                          <div style={{ fontSize: 12 }}>Seconds</div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* FEATURED Logos editor (unchanged) */}
        {activeTab === "featured" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Featured Logos / Carousel Images</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Upload images from your device for the carousel. Images are stored as data URLs in the DB (or you can later swap to an upload endpoint).</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ marginBottom: 12 }}>
                <input id="featured-files" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => handleFeaturedFiles(e.target.files)} />
                <label htmlFor="featured-files" style={{ padding: "10px 14px", background: "#FBBF24", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Upload images</label>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                {featuredForm.images.length ? featuredForm.images.map((img, idx) => (
                  <div key={img.id} style={{ width: 160, borderRadius: 10, overflow: "hidden", border: "1px solid #E5E7EB", background: "#fff" }}>
                    <img src={img.dataUrl} alt={img.name} style={{ width: "100%", display: "block" }} />
                    <div style={{ display: "flex", gap: 6, padding: 8 }}>
                      <button onClick={() => moveFeaturedImage(img.id, -1)} disabled={idx === 0} style={{ flex: 1, padding: "6px 8px", borderRadius: 6, border: "none", background: "#E5E7EB", cursor: "pointer" }}>↑</button>
                      <button onClick={() => moveFeaturedImage(img.id, 1)} disabled={idx === featuredForm.images.length - 1} style={{ flex: 1, padding: "6px 8px", borderRadius: 6, border: "none", background: "#E5E7EB", cursor: "pointer" }}>↓</button>
                      <button onClick={() => removeFeaturedImage(img.id)} style={{ padding: "6px 8px", borderRadius: 6, border: "none", background: "#ef4444", color: "white", cursor: "pointer" }}>Remove</button>
                    </div>
                  </div>
                )) : <div style={{ color: "#6B7280" }}>No images uploaded yet.</div>}
              </div>

              <div style={{ marginTop: 16 }}>
                <button onClick={handleSaveFeatured} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Featured</button>
                {featuredMessage && <div style={{ marginTop: 12, color: featuredMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{featuredMessage}</div>}
              </div>
            </div>
          </>
        )}

        {/* TRANSFORM editor (existing) */}
        {activeTab === "transform" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Transform Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the transform heading, center circle text and the four surrounding boxes. Preview is shown to the right.</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 540px", gap: 20 }}>
                {/* inputs */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section Heading</label>
                    <input name="heading" value={transformForm.heading} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Center line 1</label>
                      <input name="centerTextLine1" value={transformForm.centerTextLine1} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Center line 2</label>
                      <input name="centerTextLine2" value={transformForm.centerTextLine2} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top Box Text</label>
                    <input name="boxTop" value={transformForm.boxTop} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Left Box Text</label>
                      <input name="boxLeft" value={transformForm.boxLeft} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Right Box Text</label>
                      <input name="boxRight" value={transformForm.boxRight} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: 12, marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Bottom Box Text</label>
                    <input name="boxBottom" value={transformForm.boxBottom} onChange={handleTransformChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Center background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="centerBg"
                          value={transformForm.centerBg}
                          onChange={handleTransformChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="centerBg"
                          value={transformForm.centerBg}
                          onChange={handleTransformChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Center text color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="centerTextColor"
                          value={transformForm.centerTextColor}
                          onChange={handleTransformChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="centerTextColor"
                          value={transformForm.centerTextColor}
                          onChange={handleTransformChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Box background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="boxBg"
                          value={transformForm.boxBg}
                          onChange={handleTransformChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="boxBg"
                          value={transformForm.boxBg}
                          onChange={handleTransformChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Box border color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="boxBorder"
                          value={transformForm.boxBorder}
                          onChange={handleTransformChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="boxBorder"
                          value={transformForm.boxBorder}
                          onChange={handleTransformChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveTransform} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Transform</button>
                    {transformMessage && <div style={{ marginTop: 12, color: transformMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{transformMessage}</div>}
                  </div>
                </div>

                {/* preview */}
                <div>
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 24, fontWeight: 800 }}>{transformForm.heading}</div>
                  </div>

                  <div style={{ position: "relative", height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* center circle */}
                    <div style={{
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      background: transformForm.centerBg,
                      color: transformForm.centerTextColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                      border: "6px solid rgba(0,0,0,0.06)",
                      textAlign: "center",
                      padding: 12,
                      fontWeight: 800
                    }}>
                      <div style={{ lineHeight: 1.05 }}>
                        <div>{transformForm.centerTextLine1}</div>
                        <div>{transformForm.centerTextLine2}</div>
                      </div>
                    </div>

                    {/* top box */}
                    <div style={{
                      position: "absolute",
                      top: 12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: transformForm.boxBg,
                      border: `2px solid ${transformForm.boxBorder}`,
                      padding: "12px 20px",
                      borderRadius: 12,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      fontWeight: 700
                    }}>{transformForm.boxTop}</div>

                    {/* left box */}
                    <div style={{
                      position: "absolute",
                      left: 40,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: transformForm.boxBg,
                      border: `2px solid ${transformForm.boxBorder}`,
                      padding: "12px 18px",
                      borderRadius: 12,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      fontWeight: 700,
                      textAlign: "center",
                      whiteSpace: "pre-line"
                    }}>{transformForm.boxLeft}</div>

                    {/* right box */}
                    <div style={{
                      position: "absolute",
                      right: 40,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: transformForm.boxBg,
                      border: `2px solid ${transformForm.boxBorder}`,
                      padding: "12px 18px",
                      borderRadius: 12,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      fontWeight: 700,
                      textAlign: "center",
                      whiteSpace: "pre-line"
                    }}>{transformForm.boxRight}</div>

                    {/* bottom box */}
                    <div style={{
                      position: "absolute",
                      bottom: 16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: transformForm.boxBg,
                      border: `2px solid ${transformForm.boxBorder}`,
                      padding: "12px 22px",
                      borderRadius: 12,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      fontWeight: 700,
                      textAlign: "center"
                    }}>{transformForm.boxBottom}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NEW: LEARN editor (unchanged) */}
        {activeTab === "learn" && (
          <>
            <h1 style={{ marginBottom: 8 }}>What You Will Learn Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit heading, each list item, and basic colors for the section. Preview shown on right.</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 520px", gap: 20 }}>
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section Heading</label>
                    <input name="heading" value={learnForm.heading} onChange={handleLearnChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>List items</label>
                    {learnForm.items.map((it, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 48, background: learnForm.numberBg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, border: `1px solid ${learnForm.boxBorder}` }}>{String(idx + 1).padStart(2, "0")}</div>
                        <input value={it} onChange={(e) => handleLearnItemChange(idx, e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        <button onClick={() => removeLearnItem(idx)} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}>Remove</button>
                      </div>
                    ))}
                    <div><button onClick={addLearnItem} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add item</button></div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Accent color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="accentColor"
                          value={learnForm.accentColor}
                          onChange={handleLearnChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="accentColor"
                          value={learnForm.accentColor}
                          onChange={handleLearnChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Number background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="numberBg"
                          value={learnForm.numberBg}
                          onChange={handleLearnChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="numberBg"
                          value={learnForm.numberBg}
                          onChange={handleLearnChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Box border color</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="color"
                        name="boxBorder"
                        value={learnForm.boxBorder}
                        onChange={handleLearnChange}
                        style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                      />
                      <input
                        name="boxBorder"
                        value={learnForm.boxBorder}
                        onChange={handleLearnChange}
                        style={{ width: 160, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveLearn} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Learn Section</button>
                    {learnMessage && <div style={{ marginTop: 12, color: learnMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{learnMessage}</div>}
                  </div>
                </div>

                {/* preview */}
                <div>
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: learnForm.accentColor }}>{learnForm.heading}</div>
                    <div style={{ height: 6, width: 80, background: learnForm.accentColor, margin: "10px auto", borderRadius: 4 }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {learnForm.items.map((it, idx) => (
                      <div key={idx} style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", border: `1px solid ${learnForm.boxBorder}`, boxShadow: "0 8px 24px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 12, background: learnForm.numberBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{String(idx + 1).padStart(2, "0")}</div>
                        <div style={{ color: "#374151", fontWeight: 700 }}>{it}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NEW: FEATURE CARDS editor */}
        {activeTab === "featurecards" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Feature Cards Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the six cards (icon upload / title / description) and section styling. Preview shown on right.</p>

            <div style={{ marginTop: 20, maxWidth: 1200, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 640px", gap: 20 }}>
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section Heading</label>
                    <input name="heading" value={featureCardsForm.heading} onChange={(e) => setFeatureCardsForm(prev => ({ ...prev, heading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Cards (icon / title / description)</label>
                    {featureCardsForm.cards.map((card, idx) => (
                      <div key={card.id} style={{ borderRadius: 8, padding: 12, border: `1px solid #EEF2FF`, marginBottom: 10 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                          <div style={{ width: 72, height: 72, borderRadius: 8, background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: `1px solid ${featureCardsForm.cardBorder}` }}>
                            {card.iconDataUrl ? <img src={card.iconDataUrl} alt="icon" style={{ width: 56, height: 56, objectFit: "cover" }} /> : <div style={{ fontSize: 12, color: "#9CA3AF" }}>No icon</div>}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 8 }}>
                              <input placeholder="Title" value={card.title} onChange={(e) => handleFeatureCardChange(idx, "title", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                            </div>
                            <div>
                              <textarea placeholder="Description" value={card.desc} onChange={(e) => handleFeatureCardChange(idx, "desc", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", minHeight: 60 }} />
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                          <input id={`feature-icon-${idx}`} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFeatureIconUpload(idx, e.target.files)} />
                          <label htmlFor={`feature-icon-${idx}`} style={{ padding: "8px 12px", background: "#FBBF24", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Upload Icon</label>
                          <button onClick={() => removeFeatureCard(idx)} style={{ padding: "8px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Remove Card</button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <button onClick={addFeatureCard} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add card</button>
                    </div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Card border color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="cardBorder"
                          value={featureCardsForm.cardBorder}
                          onChange={handleFeatureCardsStyleChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="cardBorder"
                          value={featureCardsForm.cardBorder}
                          onChange={handleFeatureCardsStyleChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Icon background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="color"
                          name="iconBg"
                          value={featureCardsForm.iconBg}
                          onChange={handleFeatureCardsStyleChange}
                          style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                        />
                        <input
                          name="iconBg"
                          value={featureCardsForm.iconBg}
                          onChange={handleFeatureCardsStyleChange}
                          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading color</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="color"
                        name="headingColor"
                        value={featureCardsForm.headingColor}
                        onChange={handleFeatureCardsStyleChange}
                        style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }}
                      />
                      <input
                        name="headingColor"
                        value={featureCardsForm.headingColor}
                        onChange={handleFeatureCardsStyleChange}
                        style={{ width: 160, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveFeatureCards} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Feature Cards</button>
                    {featureCardsMessage && <div style={{ marginTop: 12, color: featureCardsMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{featureCardsMessage}</div>}
                  </div>
                </div>

                {/* preview */}
                <div>
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: featureCardsForm.headingColor }}>{featureCardsForm.heading}</div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                    {featureCardsForm.cards.map((card, idx) => (
                      <div key={card.id} style={{ background: featureCardsForm.cardBg, borderRadius: 12, padding: 20, minHeight: 160, boxShadow: "0 18px 40px rgba(15,23,42,0.04)", border: `1px solid ${featureCardsForm.cardBorder}`, display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 48, height: 48, borderRadius: 12, background: featureCardsForm.iconBg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: `1px solid ${featureCardsForm.cardBorder}` }}>
                            {card.iconDataUrl ? <img src={card.iconDataUrl} alt="icon" style={{ width: 36, height: 36, objectFit: "cover" }} /> : <div style={{ width: 36, height: 36 }} />}
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: featureCardsForm.headingColor }}>{card.title}</div>
                        </div>
                        <div style={{ color: "#4B5563", lineHeight: 1.6 }}>{card.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NEW: POWER KITS editor (screenshot section) with topHeading & topSubheading */}
        {activeTab === "powerkits" && (
          <>
            <h1 style={{ marginBottom: 8 }}>PowerKits / Additional Support</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>
              Edit the section heading, top heading/subheading, each kit card (image / title / subtitle),
              three small trust boxes, and the pricing hero card. Preview matches the screenshot grid.
            </p>

            <div style={{ marginTop: 20, maxWidth: 1200, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 640px", gap: 20 }}>
                {/* LEFT: inputs */}
                <div>
                  {/* Top heading & subheading */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top Heading (large)</label>
                    <input name="topHeading" value={powerKitsForm.topHeading || ""} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, topHeading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top Subheading (small)</label>
                    <textarea name="topSubheading" value={powerKitsForm.topSubheading || ""} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, topSubheading: e.target.value }))} style={{ width: "100%", padding: 8, minHeight: 70, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section Heading (below top heading)</label>
                    <input name="heading" value={powerKitsForm.heading || ""} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, heading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  {/* Cards: same as before (image/title/subtitle) */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Cards (image / title / subtitle)</label>
                    {powerKitsForm.cards.map((card, idx) => (
                      <div key={card.id} style={{ borderRadius: 8, padding: 12, border: `1px solid #EEF2FF`, marginBottom: 10 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                          <div style={{ width: 92, height: 92, borderRadius: 8, background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: `1px solid ${powerKitsForm.cardBorder || "#EEE"}` }}>
                            {card.imageDataUrl ? <img src={card.imageDataUrl} alt="kit" style={{ width: 84, height: 84, objectFit: "cover" }} /> : <div style={{ fontSize: 12, color: "#9CA3AF" }}>No image</div>}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 8 }}>
                              <input placeholder="Title" value={card.title} onChange={(e) => handlePowerKitChange(idx, "title", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                            </div>
                            <div>
                              <textarea placeholder="Subtitle / short description" value={card.subtitle} onChange={(e) => handlePowerKitChange(idx, "subtitle", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", minHeight: 60 }} />
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                          <div
                            onClick={() => openImageGallery("powerKitsImage", idx)}
                            style={{
                              width: "100%",
                              height: 120,
                              border: "1px dashed #D1D5DB",
                              borderRadius: 8,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              overflow: "hidden",
                              background: "#fafafa"
                            }}
                          >
                            {card.imageDataUrl ? (
                              <img src={card.imageDataUrl} alt="Selected" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <span style={{ color: "#6B7280" }}>Select Image</span>
                            )}
                          </div>
                          <button onClick={() => removePowerKitCard(idx)} style={{ padding: "8px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Remove Card</button>
                        </div>
                      </div>
                    ))}
                    <div><button onClick={addPowerKitCard} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add card</button></div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  {/* --- NEW: Three top boxes editor --- */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top small boxes (3) — icon text and colors</label>

                    {/* ensure there's an array in state */}
                    {(!powerKitsForm.topBoxes || !Array.isArray(powerKitsForm.topBoxes)) && setPowerKitsForm(prev => ({
                      ...prev, topBoxes: prev.topBoxes || [
                        { id: "b1", text: "Secure Payment", bg: "#fff", textColor: "#065f46" },
                        { id: "b2", text: "100% Privacy Safe", bg: "#fff", textColor: "#065f46" },
                        { id: "b3", text: "Money-Back Guarantee", bg: "#fff", textColor: "#065f46" }
                      ]
                    }))}

                    {(powerKitsForm.topBoxes || []).map((box, bi) => (
                      <div key={box.id || bi} style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <input value={box.text} onChange={(e) => setPowerKitsForm(prev => {
                          const topBoxes = (prev.topBoxes || []).map((b, i) => i === bi ? { ...b, text: e.target.value } : b);
                          return { ...prev, topBoxes };
                        })} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />

                        <input type="color" value={box.bg || "#ffffff"} onChange={(e) => setPowerKitsForm(prev => {
                          const topBoxes = (prev.topBoxes || []).map((b, i) => i === bi ? { ...b, bg: e.target.value } : b);
                          return { ...prev, topBoxes };
                        })} style={{ width: "100%", height: 36, border: "none", padding: 0, borderRadius: 6 }} />

                        <input type="color" value={box.textColor || "#065f46"} onChange={(e) => setPowerKitsForm(prev => {
                          const topBoxes = (prev.topBoxes || []).map((b, i) => i === bi ? { ...b, textColor: e.target.value } : b);
                          return { ...prev, topBoxes };
                        })} style={{ width: "100%", height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                      </div>
                    ))}
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  {/* --- NEW: Pricing / hero card editor --- */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Pricing Hero — Big heading (center)</label>
                    <input value={powerKitsForm.pricingHeading || "Start Your 1-on-1 Guidance Journey"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, pricingHeading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Pricing subtext (below heading)</label>
                      <input value={powerKitsForm.pricingSub || "Book your 1-on-1 session and get personalized Guidance built only for your business."} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, pricingSub: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Small note (under price)</label>
                      <input value={powerKitsForm.pricingNote || "Start your session for just ₹99, Today. If the session genuinely helps you, you pay the remaining ₹900 after the session."} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, pricingNote: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Old price (strikethrough)</label>
                      <input value={powerKitsForm.oldPrice || "₹9999"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, oldPrice: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Current price</label>
                      <input value={powerKitsForm.price || "₹99"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, price: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text</label>
                      <input value={powerKitsForm.ctaText || "Book Your Slot for ₹99"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, ctaText: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA badge (small)</label>
                      <input value={powerKitsForm.ctaBadge || "Limited"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, ctaBadge: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={powerKitsForm.ctaBg || "#F59E0B"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, ctaBg: e.target.value }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input value={powerKitsForm.ctaBg || "#F59E0B"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, ctaBg: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={powerKitsForm.ctaTextColor || "#111827"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, ctaTextColor: e.target.value }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input value={powerKitsForm.ctaTextColor || "#111827"} onChange={(e) => setPowerKitsForm(prev => ({ ...prev, ctaTextColor: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSavePowerKits} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save PowerKits</button>
                    {powerKitsMessage && <div style={{ marginTop: 12, color: powerKitsMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{powerKitsMessage}</div>}
                  </div>
                </div>

                {/* RIGHT: Preview */}
                <div>
                  {/* top small boxes preview */}
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 18 }}>
                    {(powerKitsForm.topBoxes || []).map((b, i) => (
                      <div key={b.id || i} style={{
                        padding: "10px 18px",
                        borderRadius: 12,
                        background: b.bg || "#fff",
                        color: b.textColor || "#065f46",
                        border: `1px solid rgba(165,95,5,0.12)`,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        boxShadow: "0 6px 18px rgba(245,158,11,0.06)"
                      }}>
                        {/* you can later replace this square with an icon */}
                        <div style={{ width: 18, height: 18, borderRadius: 4, background: "#16A34A", display: "inline-block" }} />
                        <div style={{ fontSize: 14 }}>{b.text}</div>
                      </div>
                    ))}
                  </div>

                  {/* top heading + subheading */}
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#A55F05" }}>{powerKitsForm.topHeading}</div>
                    <div style={{ marginTop: 8, fontSize: 14, color: "#6B7280" }}>{powerKitsForm.topSubheading}</div>
                  </div>

                  {/* section heading */}
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: powerKitsForm.headingColor || "#A95600" }}>{powerKitsForm.heading}</div>
                  </div>

                  {/* pricing card */}
                  <div style={{ background: powerKitsForm.cardBg || "#fff", borderRadius: 16, padding: 26, minHeight: 240, boxShadow: "0 24px 60px rgba(15,23,42,0.08)", border: `1px solid ${powerKitsForm.cardBorder || "#F3E0B0"}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#8A4B00" }}>{powerKitsForm.pricingHeading}</div>
                    <div style={{ color: "#6B7280", textAlign: "center", maxWidth: 420 }}>{powerKitsForm.pricingSub}</div>

                    <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 12 }}>
                      <div style={{ textDecoration: "line-through", color: "#9CA3AF", fontWeight: 700 }}>{powerKitsForm.oldPrice}</div>
                      <div style={{ fontSize: 42, fontWeight: 900, color: "#B15B00" }}>{powerKitsForm.price}</div>
                    </div>

                    <div style={{ maxWidth: 520, color: "#374151", textAlign: "center", marginTop: 8 }}>{powerKitsForm.pricingNote}</div>

                    <div style={{ marginTop: 14 }}>
                      <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 999, background: powerKitsForm.ctaBg || "#F59E0B", color: powerKitsForm.ctaTextColor || "#111827", fontWeight: 800, textDecoration: "none" }}>
                        <span>{powerKitsForm.ctaText}</span>
                        {powerKitsForm.ctaBadge && <span style={{ background: "#FF4D4F", color: "#fff", padding: "4px 8px", borderRadius: 8, fontWeight: 800 }}>{powerKitsForm.ctaBadge}</span>}
                      </a>
                    </div>
                  </div>

                  {/* cards preview grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 20 }}>
                    {powerKitsForm.cards.map((card) => (
                      <div key={card.id} style={{ background: powerKitsForm.cardBg, borderRadius: 12, padding: 20, minHeight: 200, boxShadow: "0 18px 40px rgba(15,23,42,0.04)", border: `1px solid ${powerKitsForm.cardBorder}` }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                          <div style={{ width: 120, height: 120, overflow: "hidden", borderRadius: 8, background: "#FFF" }}>
                            {card.imageDataUrl ? <img src={card.imageDataUrl} alt="kit" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ color: "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>No image</div>}
                          </div>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#A95600" }}>{card.title}</div>
                        <div style={{ color: "#6B7280", marginTop: 6 }}>{card.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== NEW: PRICING / HERO admin editor (separate from PowerKits) ===== */}
        {activeTab === "pricing" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Pricing / Hero Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the 3 small trust boxes, hero heading/subheading, hero image and the pricing card used in the screenshot.</p>

            <div style={{ marginTop: 20, maxWidth: 1200, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 640px", gap: 20 }}>
                {/* inputs */}
                <div>
                  {/* Top boxes editor */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top small boxes (3)</label>
                    {(pricingForm.topBoxes || []).map((bx, i) => (
                      <div key={bx.id || i} style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <input value={bx.text} onChange={(e) => handleTopBoxChange(i, "text", e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        <input type="color" value={bx.bg} onChange={(e) => handleTopBoxChange(i, "bg", e.target.value)} style={{ width: "100%", height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input type="color" value={bx.textColor} onChange={(e) => handleTopBoxChange(i, "textColor", e.target.value)} style={{ width: "100%", height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                      </div>
                    ))}
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  {/* Hero heading / subheading */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Hero heading</label>
                    <input value={pricingForm.heading} onChange={(e) => setPricingForm(prev => ({ ...prev, heading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Hero subheading</label>
                    <textarea value={pricingForm.subheading} onChange={(e) => setPricingForm(prev => ({ ...prev, subheading: e.target.value }))} style={{ width: "100%", padding: 8, minHeight: 70, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  {/* Hero image upload */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Hero image (upload)</label>
                    <input id="pricing-hero-file" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handlePricingImageFiles(e.target.files)} />
                    <label htmlFor="pricing-hero-file" style={{ padding: "8px 12px", background: "#FBBF24", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Upload image</label>
                    <div style={{ marginTop: 8 }}>
                      {pricingForm.heroImageDataUrl ? (
                        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E5E7EB", display: "inline-block" }}>
                          <img src={pricingForm.heroImageDataUrl} alt="hero" style={{ width: 360, display: "block" }} />
                        </div>
                      ) : <div style={{ color: "#6B7280" }}>No hero image selected yet.</div>}
                    </div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  {/* Pricing card fields */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Old price</label>
                      <input value={pricingForm.pricingCard.oldPrice} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, oldPrice: e.target.value } }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Price</label>
                      <input value={pricingForm.pricingCard.price} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, price: e.target.value } }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text</label>
                      <input value={pricingForm.pricingCard.ctaText} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, ctaText: e.target.value } }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA badge</label>
                      <input value={pricingForm.pricingCard.ctaBadge} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, ctaBadge: e.target.value } }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={pricingForm.pricingCard.ctaBg} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, ctaBg: e.target.value } }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input value={pricingForm.pricingCard.ctaBg} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, ctaBg: e.target.value } }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={pricingForm.pricingCard.ctaTextColor} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, ctaTextColor: e.target.value } }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input value={pricingForm.pricingCard.ctaTextColor} onChange={(e) => setPricingForm(prev => ({ ...prev, pricingCard: { ...prev.pricingCard, ctaTextColor: e.target.value } }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSavePricing} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Pricing Section</button>
                    {pricingMessage && <div style={{ marginTop: 12, color: pricingMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{pricingMessage}</div>}
                  </div>
                </div>

                {/* preview */}
                <div>
                  {/* top boxes preview */}
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 16 }}>
                    {(pricingForm.topBoxes || []).map((b, i) => (
                      <div key={b.id || i} style={{ padding: "10px 18px", borderRadius: 12, background: b.bg, color: b.textColor, border: `1px solid rgba(165,95,5,0.12)`, fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: 4, background: "#16A34A" }} />
                        <div style={{ fontSize: 14 }}>{b.text}</div>
                      </div>
                    ))}
                  </div>

                  {/* hero heading */}
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: pricingForm.headingColor }}>{pricingForm.heading}</div>
                    <div style={{ marginTop: 8, color: "#374151", fontSize: 16 }}>{pricingForm.subheading}</div>
                  </div>

                  {/* hero image + pricing card */}
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start", justifyContent: "center" }}>
                    {/* hero image */}
                    <div style={{ width: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {pricingForm.heroImageDataUrl ? (
                        <img src={pricingForm.heroImageDataUrl} alt="hero" style={{ width: 360, borderRadius: 12 }} />
                      ) : (
                        <div style={{ width: 360, height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", background: "#F8FAFC", borderRadius: 12 }}>No image</div>
                      )}
                    </div>

                    {/* pricing card */}
                    <div style={{ background: pricingForm.cardBg, borderRadius: 16, padding: 26, minWidth: 420, boxShadow: "0 24px 60px rgba(15,23,42,0.08)", border: `1px solid ${pricingForm.cardBorder}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#8A4B00" }}>{pricingForm.heading}</div>
                      <div style={{ color: "#6B7280", textAlign: "center", maxWidth: 420 }}>{pricingForm.subheading}</div>

                      <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 12 }}>
                        <div style={{ textDecoration: "line-through", color: "#9CA3AF", fontWeight: 700 }}>{pricingForm.pricingCard.oldPrice}</div>
                        <div style={{ fontSize: 42, fontWeight: 900, color: "#B15B00" }}>{pricingForm.pricingCard.price}</div>
                      </div>

                      <div style={{ maxWidth: 520, color: "#374151", textAlign: "center", marginTop: 8 }}>{pricingForm.pricingCard.note}</div>

                      <div style={{ marginTop: 14 }}>
                        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 999, background: pricingForm.pricingCard.ctaBg, color: pricingForm.pricingCard.ctaTextColor, fontWeight: 800, textDecoration: "none" }}>
                          <span>{pricingForm.pricingCard.ctaText}</span>
                          {pricingForm.pricingCard.ctaBadge && <span style={{ background: "#FF4D4F", color: "#fff", padding: "4px 8px", borderRadius: 8, fontWeight: 800 }}>{pricingForm.pricingCard.ctaBadge}</span>}
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== NEW: COACH / MEET YOUR COACH editor ===== */}
        {activeTab === "coach" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Meet Your Coach</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit heading, coach image, name/title and the grid of stat cards shown on the page.</p>

            <div style={{ marginTop: 20, maxWidth: 1200, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 640px", gap: 20 }}>
                {/* left: inputs */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top Heading</label>
                    <input name="topHeading" value={coachForm.topHeading} onChange={handleCoachChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Coach Name</label>
                    <input name="coachName" value={coachForm.coachName} onChange={handleCoachChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Coach Title</label>
                    <input name="coachTitle" value={coachForm.coachTitle} onChange={handleCoachChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Coach image (upload)</label>
                    <input id="coach-image-file" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleCoachImageFiles(e.target.files)} />
                    <label htmlFor="coach-image-file" style={{ padding: "8px 12px", background: "#FBBF24", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Upload image</label>
                    <div style={{ marginTop: 8 }}>
                      {coachForm.coachImageDataUrl ? (
                        <div style={{ borderRadius: 999, overflow: "hidden", width: 160, height: 160, border: "1px solid #E5E7EB", display: "inline-block" }}>
                          <img src={coachForm.coachImageDataUrl} alt="coach" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : <div style={{ color: "#6B7280" }}>No coach image selected yet.</div>}
                    </div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ marginBottom: 8 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Stat cards (number / label)</label>
                    {coachForm.stats.map((s, idx) => (
                      <div key={s.id || idx} style={{ display: "grid", gridTemplateColumns: "120px 1fr 60px", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <input value={s.number} onChange={(e) => handleStatChangeCoach(idx, "number", e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        <input value={s.text} onChange={(e) => handleStatChangeCoach(idx, "text", e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => removeCoachStat(idx)} style={{ padding: "8px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Remove</button>
                        </div>
                      </div>
                    ))}

                    <div><button onClick={addCoachStat} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add stat</button></div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Stat card background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={coachForm.statCardBg} onChange={(e) => setCoachForm(prev => ({ ...prev, statCardBg: e.target.value }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input value={coachForm.statCardBg} onChange={(e) => setCoachForm(prev => ({ ...prev, statCardBg: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Stat card border</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={coachForm.statCardBorder} onChange={(e) => setCoachForm(prev => ({ ...prev, statCardBorder: e.target.value }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input value={coachForm.statCardBorder} onChange={(e) => setCoachForm(prev => ({ ...prev, statCardBorder: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Number color</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input type="color" value={coachForm.numberColor} onChange={(e) => setCoachForm(prev => ({ ...prev, numberColor: e.target.value }))} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                      <input value={coachForm.numberColor} onChange={(e) => setCoachForm(prev => ({ ...prev, numberColor: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveCoach} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Coach Section</button>
                    {coachMessage && <div style={{ marginTop: 12, color: coachMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{coachMessage}</div>}
                  </div>
                </div>

                {/* right: preview */}
                <div>
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: coachForm.headingColor }}>{coachForm.topHeading}</div>
                    <div style={{ height: 6, width: 80, background: coachForm.subtitleUnderlineColor, margin: "10px auto", borderRadius: 4 }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 160, height: 160, borderRadius: "50%", overflow: "hidden", boxShadow: "0 22px 56px rgba(0,0,0,0.08)" }}>
                      {coachForm.coachImageDataUrl ? <img src={coachForm.coachImageDataUrl} alt="coach" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>No image</div>}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{coachForm.coachName}</div>
                    <div style={{ color: "#6B7280" }}>{coachForm.coachTitle}</div>
                  </div>

                  <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {coachForm.stats.map((s) => (
                      <div key={s.id} style={{ background: coachForm.statCardBg, borderRadius: 12, padding: 18, textAlign: "center", border: `1px solid ${coachForm.statCardBorder}`, boxShadow: "0 18px 40px rgba(15,23,42,0.04)" }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: coachForm.numberColor }}>{s.number}</div>
                        <div style={{ color: "#6B7280", marginTop: 8 }}>{s.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== NEW: GUARANTEE editor ===== */}
        {activeTab === "guarantee" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Guarantee / Money-Back Section</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Upload the badge image, edit headings, body text, signature and CTA button. Preview on right.</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 520px", gap: 20 }}>
                {/* left: inputs */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Top image (badge) — upload</label>
                    <input id="guarantee-hero-file" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleGuaranteeImageFiles(e.target.files)} />
                    <label htmlFor="guarantee-hero-file" style={{ padding: "8px 12px", background: "#FBBF24", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Upload image</label>
                    <div style={{ marginTop: 8 }}>
                      {guaranteeForm.heroImageDataUrl ? (
                        <div style={{ width: 120, height: 120, overflow: "hidden", borderRadius: 999, border: "1px solid #E5E7EB" }}>
                          <img src={guaranteeForm.heroImageDataUrl} alt={guaranteeForm.topImageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : <div style={{ color: "#6B7280" }}>No badge image selected yet.</div>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading</label>
                    <input name="heading" value={guaranteeForm.heading} onChange={handleGuaranteeChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Subheading (small)</label>
                    <input name="subHeading" value={guaranteeForm.subHeading} onChange={handleGuaranteeChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Highlighted line (bold)</label>
                    <input name="highlightedLine" value={guaranteeForm.highlightedLine} onChange={handleGuaranteeChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Body paragraphs</label>
                    {guaranteeForm.bodyParagraphs.map((p, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <textarea value={p} onChange={(e) => handleGuaranteeBodyChange(idx, e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", minHeight: 60 }} />
                        <button onClick={() => removeGuaranteeParagraph(idx)} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>Remove</button>
                      </div>
                    ))}
                    <div><button onClick={addGuaranteeParagraph} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add paragraph</button></div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Signature name</label>
                    <input name="signatureName" value={guaranteeForm.signatureName} onChange={handleGuaranteeChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text</label>
                    <input name="ctaText" value={guaranteeForm.ctaText} onChange={handleGuaranteeChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA link</label>
                      <input name="ctaLink" value={guaranteeForm.ctaLink} onChange={handleGuaranteeChange} placeholder="https://..." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA bg</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" name="ctaBg" value={guaranteeForm.ctaBg} onChange={handleGuaranteeChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input name="ctaBg" value={guaranteeForm.ctaBg} onChange={handleGuaranteeChange} style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CTA text color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" name="ctaTextColor" value={guaranteeForm.ctaTextColor} onChange={handleGuaranteeChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input name="ctaTextColor" value={guaranteeForm.ctaTextColor} onChange={handleGuaranteeChange} style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveGuarantee} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Guarantee</button>
                    {guaranteeMessage && <div style={{ marginTop: 12, color: guaranteeMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{guaranteeMessage}</div>}
                  </div>
                </div>

                {/* right: preview */}
                <div>
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    {guaranteeForm.heroImageDataUrl && (
                      <div style={{ display: "inline-block", marginBottom: 12 }}>
                        <img src={guaranteeForm.heroImageDataUrl} alt={guaranteeForm.topImageAlt} style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 999 }} />
                      </div>
                    )}
                    <div style={{ fontSize: 28, fontWeight: 800, color: guaranteeForm.headingColor }}>{guaranteeForm.heading}</div>
                    <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700, color: "#F59E0B" }}>{guaranteeForm.subHeading}</div>
                    <div style={{ marginTop: 8, fontSize: 16, fontWeight: 800, color: guaranteeForm.headingColor }}>{guaranteeForm.highlightedLine}</div>
                  </div>

                  <div style={{ color: "#374151", lineHeight: 1.8 }}>
                    {guaranteeForm.bodyParagraphs.map((p, i) => (
                      <p key={i} style={{ marginBottom: 12, whiteSpace: "pre-line" }}>{p}</p>
                    ))}
                  </div>

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 18 }}>{guaranteeForm.signatureName}</div>

                  <div style={{ marginTop: 18, textAlign: "center" }}>
                    <a href={guaranteeForm.ctaLink || "#"} target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "14px 28px", borderRadius: 999, background: guaranteeForm.ctaBg, color: guaranteeForm.ctaTextColor, fontWeight: 800, textDecoration: "none", boxShadow: "0 18px 40px rgba(245,158,11,0.18)" }}>
                      {guaranteeForm.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== NEW: CLIENT VIDEO FEEDBACK editor ===== */}
        {activeTab === "clientvideos" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Client Video Feedback</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Upload client videos from your device (gallery). Preview carousel shows {clientVideosForm.showCount} at a time.</p>

            <div style={{ marginTop: 20, maxWidth: 1100, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 20 }}>
                {/* left: inputs */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section Heading</label>
                    <input name="heading" value={clientVideosForm.heading} onChange={(e) => setClientVideosForm(prev => ({ ...prev, heading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Description</label>
                    <input name="description" value={clientVideosForm.description} onChange={(e) => setClientVideosForm(prev => ({ ...prev, description: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Upload videos (select multiple)</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={openClientVideoPicker} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Select videos</button>
                      <input id="client-videos-files" type="file" accept="video/*" multiple style={{ display: "none" }} onChange={(e) => handleClientVideoFiles(e.target.files)} />
                      <label htmlFor="client-videos-files" style={{ padding: "8px 12px", background: "#E5E7EB", borderRadius: 6, cursor: "pointer" }}>Or use file input</label>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      {clientVideosForm.videos.length ? (
                        <div style={{ display: "grid", gap: 10 }}>
                          {clientVideosForm.videos.map((v, idx) => (
                            <div key={v.id} style={{ display: "flex", gap: 8, alignItems: "center", border: "1px solid #F3F4F6", padding: 8, borderRadius: 8 }}>
                              <div style={{ width: 120, height: 70, overflow: "hidden", borderRadius: 8, background: "#000" }}>
                                <video src={v.dataUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700 }}>{v.name || `Video ${idx + 1}`}</div>
                                <div style={{ color: "#6B7280", fontSize: 13 }}>{/* optional duration */}</div>
                                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                                  <button onClick={() => moveClientVideo(v.id, -1)} disabled={idx === 0} style={{ padding: "6px 8px", borderRadius: 6, border: "none", background: "#E5E7EB", cursor: "pointer" }}>↑</button>
                                  <button onClick={() => moveClientVideo(v.id, 1)} disabled={idx === clientVideosForm.videos.length - 1} style={{ padding: "6px 8px", borderRadius: 6, border: "none", background: "#E5E7EB", cursor: "pointer" }}>↓</button>
                                  <button onClick={() => removeClientVideo(v.id)} style={{ padding: "6px 8px", borderRadius: 6, border: "none", background: "#ef4444", color: "white", cursor: "pointer" }}>Remove</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : <div style={{ color: "#6B7280" }}>No videos uploaded yet.</div>}
                    </div>
                  </div>

                  <hr style={{ margin: "12px 0", borderColor: "#E5E7EB" }} />

                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Videos shown at once</label>
                      <select name="showCount" value={clientVideosForm.showCount} onChange={(e) => setClientVideosForm(prev => ({ ...prev, showCount: Number(e.target.value) }))} style={{ padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                      <button onClick={handleSaveClientVideos} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Videos</button>
                    </div>
                  </div>

                  {clientVideosMessage && <div style={{ marginTop: 12, color: clientVideosMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{clientVideosMessage}</div>}
                </div>

                {/* right: preview carousel */}
                <div>
                  <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{clientVideosForm.heading}</div>
                    <div style={{ color: "#6B7280", marginTop: 8 }}>{clientVideosForm.description}</div>
                  </div>

                  <div style={{ position: "relative", padding: 12, background: "#000", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ display: "flex", gap: 12, transition: "transform 0.35s ease", transform: `translateX(-${clientVideosIndex * (100)}%)` }}>
                      {/* render groups: we will render each video in same width container; visible area will be a sliding window */}
                      {clientVideosForm.videos.length ? clientVideosForm.videos.map((v) => (
                        <div key={v.id} style={{ minWidth: `${100 / clientVideosForm.showCount}%`, flex: `0 0 ${100 / clientVideosForm.showCount}%`, padding: 8 }}>
                          <div style={{ background: "#111", borderRadius: 10, overflow: "hidden", minHeight: 180 }}>
                            <video controls src={v.dataUrl} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </div>
                        </div>
                      )) : (
                        <div style={{ color: "#fff", padding: 20 }}>No videos to preview.</div>
                      )}
                    </div>

                    {/* nav buttons */}
                    <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}>
                      <button onClick={clientVideosPrev} style={{ padding: 8, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer" }}>◀</button>
                    </div>
                    <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}>
                      <button onClick={clientVideosNext} style={{ padding: 8, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer" }}>▶</button>
                    </div>
                  </div>

                  {/* simple pager dots */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                    {(() => {
                      const pages = Math.max(1, Math.ceil(Math.max(0, clientVideosForm.videos.length - clientVideosForm.showCount + 1)));
                      return Array.from({ length: pages }).map((_, i) => (
                        <div key={i} onClick={() => setClientVideosIndex(i)} style={{ width: 16, height: 8, borderRadius: 999, background: i === clientVideosIndex ? "#FBBF24" : "#E5E7EB", cursor: "pointer" }} />
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* FAQ Editor */}
        {activeTab === "faq" && (
          <>
            <h1 style={{ marginBottom: 8 }}>FAQ Editor</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the accordion questions and answers shown on the site. Add, remove, reorder in the list below and Save.</p>

            <div style={{ marginTop: 20, maxWidth: 1000, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20 }}>
                {/* left: admin inputs */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section Heading</label>
                    <input name="heading" value={faqForm.heading} onChange={(e) => setFaqForm(prev => ({ ...prev, heading: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Questions & Answers</label>
                    {faqForm.items.map((it, idx) => (
                      <div key={it.id} style={{ borderRadius: 8, padding: 12, border: "1px solid #EEF2FF", marginBottom: 10 }}>
                        <div style={{ marginBottom: 8 }}>
                          <input value={it.question} onChange={(e) => handleFaqItemChange(idx, "question", e.target.value)} placeholder="Question" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <textarea value={it.answer} onChange={(e) => handleFaqItemChange(idx, "answer", e.target.value)} placeholder="Answer" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", minHeight: 64 }} />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => removeFaqItem(idx)} style={{ padding: "8px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}>Remove</button>
                        </div>
                      </div>
                    ))}
                    <div><button onClick={addFaqItem} style={{ padding: "8px 12px", background: "#FBBF24", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>+ Add question</button></div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveFaq} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save FAQ</button>
                    {faqMessage && <div style={{ marginTop: 12, color: faqMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{faqMessage}</div>}
                  </div>
                </div>

                {/* right: preview accordion */}
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{faqForm.heading}</div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {faqForm.items.map((it, idx) => (
                      <div key={it.id} style={{ background: "#fff", borderRadius: 10, padding: 16, border: "1px solid #F3E0B0" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleFaqPreviewOpen(idx)}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ fontWeight: 800 }}>{it.open ? "▼" : "►"}</div>
                            <div style={{ fontWeight: 700 }}>{it.question}</div>
                          </div>
                        </div>

                        {it.open && (
                          <div style={{ marginTop: 12, color: "#6B7280", lineHeight: 1.6 }}>{it.answer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Final CTA / Register Banner */}
        {activeTab === "finalcta" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Final CTA / Register Banner</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit the bottom call-to-action banner (heading, subheading, the big rounded button and colors).</p>

            <div style={{ marginTop: 20, maxWidth: 1000, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20 }}>
                {/* left: inputs */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Heading</label>
                    <input name="heading" value={finalCtaForm.heading} onChange={handleFinalCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Subheading</label>
                    <input name="subheading" value={finalCtaForm.subheading} onChange={handleFinalCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Button text</label>
                    <input name="buttonText" value={finalCtaForm.buttonText} onChange={handleFinalCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Button link</label>
                      <input name="buttonLink" value={finalCtaForm.buttonLink} onChange={handleFinalCtaChange} placeholder="https://..." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Show badge?</label>
                      <input type="checkbox" name="badgeVisible" checked={finalCtaForm.badgeVisible} onChange={handleFinalCtaChange} style={{ transform: "scale(1.2)", marginTop: 10 }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Button background</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" name="buttonBg" value={finalCtaForm.buttonBg} onChange={handleFinalCtaChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input name="buttonBg" value={finalCtaForm.buttonBg} onChange={handleFinalCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Button text color</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" name="buttonTextColor" value={finalCtaForm.buttonTextColor} onChange={handleFinalCtaChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                        <input name="buttonTextColor" value={finalCtaForm.buttonTextColor} onChange={handleFinalCtaChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Badge text</label>
                    <input name="badgeText" value={finalCtaForm.badgeText} onChange={handleFinalCtaChange} style={{ width: 200, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Section background (hex)</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input type="color" name="sectionBg" value={finalCtaForm.sectionBg} onChange={handleFinalCtaChange} style={{ width: 48, height: 36, border: "none", padding: 0, borderRadius: 6 }} />
                      <input name="sectionBg" value={finalCtaForm.sectionBg} onChange={handleFinalCtaChange} style={{ width: 160, padding: 8, borderRadius: 6, border: "1px solid #D1D5DB" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveFinalCta} style={{ padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>Save Final CTA</button>
                    {finalCtaMessage && <div style={{ marginTop: 12, color: finalCtaMessage.startsWith("✅") ? "green" : "red", fontWeight: 600 }}>{finalCtaMessage}</div>}
                  </div>
                </div>

                {/* right: preview */}
                <div>
                  <div style={{ background: finalCtaForm.sectionBg, padding: 28, borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: "#A56900", marginBottom: 8 }}>{finalCtaForm.heading}</div>
                    <div style={{ color: "#4B5563", marginBottom: 20 }}>{finalCtaForm.subheading}</div>

                    <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                      <a href={finalCtaForm.buttonLink || "#"} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <div style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "18px 40px",
                          borderRadius: 40,
                          background: finalCtaForm.buttonBg,
                          color: finalCtaForm.buttonTextColor,
                          fontWeight: 800,
                          boxShadow: "0 18px 40px rgba(245,158,11,0.18)"
                        }}>
                          <span>{finalCtaForm.buttonText}</span>
                          {finalCtaForm.badgeVisible && finalCtaForm.badgeText && (
                            <span style={{ background: "#FF4D4F", color: "white", padding: "6px 10px", borderRadius: 8, fontWeight: 800, fontSize: 13 }}>{finalCtaForm.badgeText}</span>
                          )}
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer Pages Editor - Block-Based */}
        {activeTab === "footerpages" && (
          <>
            <h1 style={{ marginBottom: 8 }}>Footer Pages Editor</h1>
            <p style={{ marginTop: 0, color: "#4B5563", fontSize: 14 }}>Edit Terms & Conditions, Privacy Policy and Refund Policy with unlimited heading/paragraph blocks. Save to update live pages.</p>

            <div style={{ marginTop: 20, maxWidth: 1200, background: "white", padding: 20, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
                {/* Left column: Page selector + save */}
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ padding: 12, borderRadius: 8, background: "#FBBF24", color: "#111827", fontWeight: 800, textAlign: "center" }}>Footer Pages</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button onClick={() => setFooterEditTab("terms")} style={{ padding: 10, borderRadius: 8, border: footerEditTab === "terms" ? "2px solid #F59E0B" : "1px solid #E5E7EB", background: footerEditTab === "terms" ? "#FFF7E0" : "white", cursor: "pointer", textAlign: "left", fontWeight: 500 }}>📋 Terms & Conditions</button>
                    <button onClick={() => setFooterEditTab("privacy")} style={{ padding: 10, borderRadius: 8, border: footerEditTab === "privacy" ? "2px solid #F59E0B" : "1px solid #E5E7EB", background: footerEditTab === "privacy" ? "#FFF7E0" : "white", cursor: "pointer", textAlign: "left", fontWeight: 500 }}>🔒 Privacy Policy</button>
                    <button onClick={() => setFooterEditTab("refund")} style={{ padding: 10, borderRadius: 8, border: footerEditTab === "refund" ? "2px solid #F59E0B" : "1px solid #E5E7EB", background: footerEditTab === "refund" ? "#FFF7E0" : "white", cursor: "pointer", textAlign: "left", fontWeight: 500 }}>💰 Refund Policy</button>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Last updated by</label>
                    <input value={footerPagesForm.lastUpdatedBy || ""} onChange={(e) => setFooterPagesForm(prev => ({ ...prev, lastUpdatedBy: e.target.value }))} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 13 }} />
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <button onClick={handleSaveFooterPages} style={{ width: "100%", padding: "10px 18px", background: "#111827", color: "white", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600 }}>💾 Save Pages</button>
                    {footerPagesMessage && <div style={{ marginTop: 12, color: footerPagesMessage.startsWith("✅") ? "#10B981" : "#EF4444", fontWeight: 600, fontSize: 13 }}>{footerPagesMessage}</div>}
                  </div>

                  <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #E5E7EB" }} />

                  <div style={{ marginTop: 14, fontSize: 12, color: "#6B7280", fontWeight: 600 }}>FOOTER SETTINGS</div>

                  {/* FOOTER IMAGE */}
                  <div style={{ marginTop: 14, marginBottom: 20 }}>
                    <label style={{ fontWeight: 600, marginBottom: 6, display: "block", fontSize: 13 }}>
                      🖼️ Footer Top Image
                    </label>

                    <div
                      onClick={() => openImageGallery("footerImage")}
                      style={{
                        width: "100%",
                        height: 160,
                        border: "2px dashed #D1D5DB",
                        borderRadius: 10,
                        cursor: "pointer",
                        overflow: "hidden",
                        background: "#fafafa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {footerPagesForm.footerImage ? (
                        <img src={footerPagesForm.footerImage} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      ) : (
                        <span style={{ color: "#6B7280", fontSize: 13 }}>Click to upload image</span>
                      )}
                    </div>
                  </div>

                  {/* COPYRIGHT FIELD */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontWeight: 600, marginBottom: 6, display: "block", fontSize: 13 }}>
                      © Copyright Text
                    </label>
                    <input
                      value={footerPagesForm.copyright}
                      onChange={(e) => setFooterPagesForm(prev => ({ ...prev, copyright: e.target.value }))}
                      style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13 }}
                    />
                  </div>
                </div>

                {/* Right column: Block editor */}
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                      {footerEditTab === "terms" ? "📋 Terms & Conditions" : footerEditTab === "privacy" ? "🔒 Privacy Policy" : "💰 Refund Policy"}
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>Build your page with reorderable blocks. Add headings and paragraphs in any order.</div>
                  </div>

                  {/* Add block buttons */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    <button onClick={() => addFooterBlock(footerEditTab, "heading")} style={{ padding: "8px 14px", background: "#E0E7FF", color: "#4F46E5", border: "1px solid #C7D2FE", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>+ Add Heading</button>
                    <button onClick={() => addFooterBlock(footerEditTab, "paragraph")} style={{ padding: "8px 14px", background: "#E0E7FF", color: "#4F46E5", border: "1px solid #C7D2FE", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>+ Add Paragraph</button>
                  </div>

                  {/* Blocks list */}
                  <div style={{ marginBottom: 18 }}>
                    {footerPagesForm[footerEditTab]?.blocks?.map((block, idx) => {
                      const isLast = idx === footerPagesForm[footerEditTab].blocks.length - 1;
                      return (
                        <div key={block.id} style={{ marginBottom: 12, padding: 12, border: "1px solid #E5E7EB", borderRadius: 8, background: block.type === "heading" ? "#F0F9FF" : "#FFFBEB" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <div style={{ fontWeight: 600, fontSize: 12, color: block.type === "heading" ? "#0369A1" : "#92400E", textTransform: "uppercase" }}>{block.type}</div>
                            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                              {idx > 0 && (
                                <button onClick={() => moveFooterBlock(footerEditTab, block.id, -1)} style={{ padding: 4, fontSize: 12, background: "white", border: "1px solid #D1D5DB", borderRadius: 4, cursor: "pointer" }}>⬆</button>
                              )}
                              {!isLast && (
                                <button onClick={() => moveFooterBlock(footerEditTab, block.id, 1)} style={{ padding: 4, fontSize: 12, background: "white", border: "1px solid #D1D5DB", borderRadius: 4, cursor: "pointer" }}>⬇</button>
                              )}
                              <button onClick={() => removeFooterBlock(footerEditTab, block.id)} style={{ padding: 4, fontSize: 12, background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}>Delete</button>
                            </div>
                          </div>

                          <textarea
                            value={block.text}
                            onChange={(e) => updateFooterBlock(footerEditTab, block.id, e.target.value)}
                            style={{
                              width: "100%",
                              minHeight: block.type === "heading" ? 44 : 80,
                              padding: 10,
                              borderRadius: 6,
                              border: "1px solid #D1D5DB",
                              fontFamily: "inherit",
                              fontSize: block.type === "heading" ? 14 : 13,
                              fontWeight: block.type === "heading" ? 700 : 400
                            }}
                          />
                        </div>
                      );
                    })}

                    {(!footerPagesForm[footerEditTab]?.blocks || footerPagesForm[footerEditTab].blocks.length === 0) && (
                      <div style={{ padding: 18, textAlign: "center", color: "#9CA3AF", border: "2px dashed #E5E7EB", borderRadius: 8 }}>No blocks yet. Click "Add Heading" or "Add Paragraph" to get started.</div>
                    )}
                  </div>

                  {/* Live Preview */}
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>Live Preview</div>
                    <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 16, background: "#FAFAFA" }}>
                      {footerPagesForm[footerEditTab]?.blocks?.map(block => (
                        <div key={block.id}>
                          {block.type === "heading" ? (
                            <h2 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#111827" }}>{block.text}</h2>
                          ) : (
                            <p style={{ margin: "0 0 12px 0", fontSize: 14, color: "#374151", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{block.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HindiDashboardPage;

