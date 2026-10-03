/* SafeSteps language toggle.

   Bangla is the default and lives in the HTML, so every page stays readable in
   Bangla with JavaScript disabled. English lives here, keyed by the same id
   that each element carries in its data-i18n attribute.

   Marks:
     data-i18n             visible text
     data-i18n-placeholder  placeholder text
     data-i18n-aria-label  aria-label attribute

   Strings created by JavaScript at runtime, where there is no HTML to read,
   are in STRINGS_BN and STRINGS_EN_DYNAMIC.

   NEEDS REVIEW: every Bangla string in this project was drafted by AI and has
   not been checked by a native speaker. The keys that carry body copy, and so
   need the most care, are listed in the review register at the bottom of the
   SafeSteps README.
*/

var STRINGS_EN = {
  demo_notice: "Demonstration only. This form does not send information.",
  /* shared shell */
  skip_link: "Skip to main content",
  quick_exit: "Quick Exit",
  nav_label: "Main menu",
  nav_home: "Home",
  nav_evidence: "Evidence",
  nav_timeline: "Timeline",
  nav_report: "Report",
  lang_group_label: "Choose a language",
  theme_label: "Theme",
  theme_system: "System",
  theme_dark: "Dark",
  theme_light: "Light",

  /* home */
  home_h1: "A trusted person inside your own college",
  home_pitch:
    "SafeSteps places a trained, trusted person inside your college. Not a helpline, not an app, not the police, just someone who already knows you.",
  motif_label:
    "A grid of dark windows with one of them lit. The lit window is your college's DDSR.",
  motif_caption:
    "One lit window: your college's Designated Digital Safety Representative, the DDSR.",
  home_covers:
    "On this page: how to stay safe, how to preserve evidence, and how to report privately.",
  home_choose_h: "What you need right now",
  tile_evidence_h: "Evidence preservation guide",
  tile_evidence_p: "What to save, what not to do, and where to keep it.",
  tile_evidence_a: "Read the guide",
  tile_timeline_h: "Evidence timeline",
  tile_timeline_p:
    "Write down what happened, in order, on your own device. Nothing is saved anywhere.",
  tile_timeline_a: "Build the timeline",
  tile_report_h: "Report privately",
  tile_report_p: "Explore the private reporting form. Sending is disabled in this demo.",
  tile_report_a: "View demo form",
  home_how_h: "How it works",
  home_step_1: "You find the courage to fill in the form. You can send it without your name.",
  home_step_2: "The form goes to the DDSR of your own college.",
  home_step_3:
    "The DDSR talks with you and helps you preserve evidence. The DDSR does not investigate.",
  home_step_4:
    "You choose the next step yourself: do nothing yet, seek counselling, speak to family, or get legal help.",
  ddsr_node: "DDSR: a trained, trusted person in your college",
  home_limits_h: "What this site is not",
  limit_not_disciplinary: "It is not a disciplinary system.",
  limit_not_public:
    "It is not a public reporting platform. What you write here is not shown in public.",
  limit_not_police: "It is not a place to file a police complaint.",
  limit_not_gov: "It is not connected to any government system.",
  limit_confidentiality:
    "Confidentiality ends in only two cases: immediate danger, and a legal duty.",
  /* NEEDS REVIEW: footer_tagline */
  footer_tips_h: "Tips for safer use",
  footer_tagline: "A trained, trusted person inside your own college",
  footer_tip_private: "You can use a private browsing window.",
  footer_tip_history:
    "The Quick Exit button does not erase your browser history. No website can promise that.",
  nf_h1: "This page could not be found",
  nf_lede: "The address you followed is not on this site. The link may have been mistyped, or the page may have moved. Nothing is wrong on your side.",
  nf_where_h: "Where you can go",
  nf_home_p: "The first page. A list of the three tools.",
  nf_evidence_p: "What to keep, what not to do, and where to keep it.",
  nf_timeline_p: "Write down the order of events. It runs on your device.",
  nf_report_p: "Tell your college DDSR confidentially.",
  nf_exit_h: "If you want to leave quickly",
  nf_exit_p: "The coral button above, or pressing Esc on your keyboard, takes you off this site.",
  footer_tip_esc: "Pressing Esc on your keyboard also triggers Quick Exit.",
  footer_note:
    "This site stores no case data. The timeline tool runs only on your device.",

  /* evidence guide */
  /* NEEDS REVIEW: ev_save_1, ev_save_2, ev_save_3, ev_save_4, ev_save_5,
     ev_not_1, ev_not_2, ev_not_3, ev_not_4, ev_how_1, ev_how_2, ev_how_3,
     ev_how_4, ev_how_5_a, ev_how_5_b, ev_kind_harass_p, ev_kind_black_p, ev_kind_imp_p,
     ev_kind_ai_p */
  evidence_h1: "Evidence preservation guide",
  evidence_covers:
    "On this page: what to save, what not to do, and where to keep things.",
  ev_save_h: "What to save",
  ev_save_1:
    "Screenshots. Take screenshots of messages, comments, profiles or videos. Screenshots that show the time are the most useful.",
  ev_save_2:
    "Links. If you get a link to a profile or a post, write it down. A link still works after an account is deleted.",
  ev_save_3: "Time. When it happened. Date and time, as exact as you can.",
  ev_save_4:
    "Account names. The username or number it came from. If you know the person, note how you know them.",
  ev_save_5: "Platform. Which app or website it happened on.",
  ev_not_h: "What not to do",
  ev_not_1:
    "Do not delete the messages. Deleting them removes the strongest evidence you have.",
  ev_not_2: "Do not close or delete the account. Much of the information disappears on its own.",
  ev_not_3: "Do not edit any file or image. Keep the original exactly as it is.",
  ev_not_4:
    "Do not reply until you have thought about it. Replying can sometimes make things worse.",
  ev_how_h: "How to keep it",
  ev_how_1:
    "Keep the original where you received it. Do not move the only copy away from there.",
  ev_how_2:
    "Keep a copy somewhere else: a separate folder, a separate USB drive, or with someone you trust.",
  ev_how_3:
    "Put the date in each file name, for example: 2026-03-14-morning-message.",
  ev_how_4: "Give one copy to someone you trust: at home, or to a friend you trust.",
  ev_how_5_a: "Use the evidence timeline to write the events in order.",
  ev_how_5_b: "It runs only on your device.",
  ev_how_5_link: "evidence timeline",
  ev_kinds_h: "When this guide applies",
  ev_kind_harass_h: "Online harassment",
  ev_kind_harass_p:
    "Repeated messages, comments or images. Note the time and the link for every message. If the same person keeps writing, that is a separate kind of harm on its own, so write it down that way.",
  ev_kind_black_h: "Blackmail",
  ev_kind_black_p:
    "Pressure using a threat of exposing something private. Save every message. Do not pay or hand over anything even if you are afraid. Speak to the DDSR first.",
  ev_kind_imp_h: "Impersonation",
  ev_kind_imp_p:
    "Someone opens an account in your name, or uses your photo. Save the profile link and a screenshot, with the time.",
  ev_kind_ai_h: "AI deception and deepfakes",
  ev_kind_ai_p:
    "A video or image made with your face or your voice. Save the original video yourself, because if it is deleted it is gone. Save the link to the profile it was spread from as well.",
  ev_danger_h: "If you are in immediate danger",
  ev_danger_p:
    "If someone is threatening to hurt you, or you do not feel safe, skip the reporting steps and go straight to a safety measure.",
  ev_danger_chip: "[VERIFIED EMERGENCY AND REFERRAL INFORMATION]",
  ev_danger_note:
    "No number or name is listed here, because nobody has verified it yet. Verified information will be added here.",

  /* private form */
  /* NEEDS REVIEW: rp_limits_1, rp_limits_2, rp_limits_3, rp_anon_1, rp_anon_2,
     rp_anon_3, rp_next_1, rp_next_2, rp_next_3, rp_next_4 */
  report_h1: "Report privately",
  report_covers:
    "On this page: the limits of confidentiality, the anonymous option, and what happens after you report.",
  rp_limits_h: "The limits of confidentiality",
  rp_limits_1:
    "Your college's DDSR will not pass what you tell them to anyone else without your permission.",
  rp_limits_2:
    "Confidentiality ends in only two cases: immediate danger, and a duty under the law. There is no other exception.",
  rp_limits_3:
    "This form is built to reach your college's DDSR. It is not a place to file a police complaint, and it is not connected to any government system.",
  rp_anon_h: "Reporting without your name",
  rp_anon_1: "You can report without giving your name.",
  rp_anon_2:
    "But if you report anonymously, the DDSR cannot reply to you, because they will not know who you are.",
  rp_anon_3:
    "You can give a way to contact you if you wish. It is optional, but it lets the DDSR talk with you.",
  rp_next_h: "What happens after you report",
  rp_next_1: "What you write goes to the DDSR of your own college.",
  rp_next_2:
    "If you gave a way to contact you, the DDSR talks with you and helps you preserve evidence.",
  rp_next_3:
    "The DDSR does not investigate, does not discipline anyone, and does not file anything on your behalf.",
  rp_next_4:
    "You choose the next step yourself: do nothing yet, seek counselling, speak to family, or get legal help.",
  rp_form_h: "Fill in the form",
  rp_endpoint_chip: "[FORM ENDPOINT NOT SET]",
  rp_grp_about: "About you",
  rp_grp_about_hint: "These two fields are needed before what you write can be sent.",
  rp_college_label: "Name of your college",
  rp_college_ph: "For example: write the name",
  rp_what_label: "What happened",
  rp_what_hint:
    "Write in your own words. Add the date, the time and the platform if you remember. Do not upload images or files.",
  rp_what_ph: "Briefly write what happened",
  rp_grp_contact: "A way to reach you (optional)",
  rp_grp_contact_hint: "You can leave any of these three fields empty.",
  rp_name_label: "Name",
  rp_name_ph: "Your name",
  rp_phone_label: "Phone number",
  rp_phone_ph: "For example: 01XXXXXXXXX",
  rp_email_label: "Email",
  rp_email_ph: "Your email address",
  rp_anon_note_title: "Anonymous reporting is on",
  rp_anon_note_body:
    "The contact fields have been cleared and disabled. The DDSR cannot reply to an anonymous report.",
  rp_anon_label: "I want to report without my name",
  rp_anon_hint:
    "If you choose this, the three contact fields above are cleared and disabled.",
  rp_submit: "Send it",
  rp_after_h: "If you are in immediate danger",
  rp_after_p:
    "If someone is threatening to hurt you, do not wait for this form. Go straight to a safety measure.",

  /* timeline builder */
  /* NEEDS REVIEW: tl_privacy_body, tl_add_h, tl_platform_ph, tl_what_ph,
     tl_note_ph, tl_empty, tl_print, tl_print_note */
  tl_h1: "Build your evidence timeline",
  tl_covers:
    "On this page: how to put your events in date order, and a one page printable record.",
  tl_privacy_title: "Your information goes nowhere",
  tl_privacy_body:
    "What you type stays on your device and is not saved anywhere. If you close the page, all of it is gone. If you print or save it, that copy is in your hands.",
  tl_add_h: "Add a new event",
  tl_date_label: "Date",
  tl_time_label: "Time (optional)",
  tl_platform_label: "Platform (optional)",
  tl_platform_ph: "For example: Messenger, Instagram, YouTube",
  tl_what_label: "What happened",
  tl_what_ph: "Briefly write what happened",
  tl_note_label: "Link or screenshot name (optional)",
  tl_note_ph: "For example: screenshot-1, img_20260314.png",
  tl_add: "Add event",
  tl_cancel_edit: "Cancel editing",
  tl_list_h: "Your events",
  tl_sort_oldest: "Oldest first",
  tl_sort_newest: "Newest first",
  tl_empty: "No event has been added yet.",
  tl_recorded: "{count} events recorded so far.",
  tl_print: "Make a printable record",
  tl_edit: "Edit",
  tl_remove: "Delete",
  tl_print_title: "SafeSteps: evidence timeline",
  tl_col_date: "Date",
  tl_col_time: "Time",
  tl_col_platform: "Platform",
  tl_col_what: "What happened",
  tl_col_note: "Link or file name",
  tl_print_note: "Keep this record to yourself. It has not been submitted anywhere."
};

/* Strings JavaScript creates at runtime, so there is no HTML to read. */
var STRINGS_EN_DYNAMIC = {
  tl_added: "Added to your timeline.",
  tl_updated: "Your change has been saved.",
  tl_save: "Save the change",
  tl_edit_cancelled: "Editing cancelled.",
  tl_removed: "Deleted from your timeline.",
  tl_editing: "Editing an event. Change the fields, then choose Save.",
  tl_nothing_edit: "No event is selected for editing.",
  tl_confirm_remove: "Delete this event? This cannot be undone.",
  tl_print_ready: "Preparing your printable record.",
  tl_generated: "Generated on {date}",
  tl_platform_on: "Platform: {value}",
  tl_note_on: "Link or file: {value}",
  err_date: "Please choose a date.",
  err_what: "Please write what happened.",
  err_college: "Please write your college name.",
  form_draft_restored:
    "What you had written has been put back. It stays in this tab only and is gone when you close it.",
  form_not_ready:
    "The form is not connected yet, so nothing was sent. What you typed has not left your device.",
  form_sending: "Sending. Please wait.",
  form_sent:
    "It has been sent to your college's DDSR. You can close this page now.",
  form_failed:
    "The message could not be sent. Please try again in a moment. Nothing was saved on this page."
};

var STRINGS_BN_DYNAMIC = {
  nf_h1: "পাতাটি পাওয়া যায়নি",
  nf_lede: "আপনি যে ঠিকানাটি খুঁজছেন সেটি এই সাইটে নেই। লিংকটি ভুল হতে পারে, অথবা পাতাটি সরানো হয়েছে। আপনার কোনো ভুল নেই।",
  nf_where_h: "যেখানে যেতে পারেন",
  nf_home_p: "শুরুর পাতা। তিনটি টুলের তালিকা।",
  nf_evidence_p: "কী কী সংরক্ষণ করবেন, কী করবেন না, কোথায় রাখবেন।",
  nf_timeline_p: "ঘটনার সময়ক্রম লিখে রাখুন। আপনার ডিভাইসেই চলে।",
  nf_report_p: "আপনার কলেজের DDSR-এর কাছে গোপনে জানান।",
  nf_exit_h: "দ্রুত বের হতে চাইলে",
  nf_exit_p: "উপরের কমলা বোতামটি, অথবা কীবোর্ডে Esc চাপলেই, আপনি এই সাইট থেকে বের হয়ে যাবেন।",

  form_draft_restored: "আপনি যা লিখেছিলেন তা ফিরিয়ে আনা হয়েছে। এটি শুধু এই ট্যাবেই থাকে, ট্যাব বন্ধ করলেই মুছে যাবে।",
  tl_recorded: "এখন পর্যন্ত {count}টি ঘটনা লেখা হয়েছে।",
  tl_added: "আপনার টাইমলাইনে যোগ করা হয়েছে।",
  tl_updated: "আপনার পরিবর্তন সংরক্ষণ করা হয়েছে।",
  tl_save: "পরিবর্তন সংরক্ষণ করুন",
  tl_edit_cancelled: "সম্পাদনা বাতিল করা হয়েছে।",
  tl_removed: "আপনার টাইমলাইন থেকে মুছে ফেলা হয়েছে।",
  tl_editing: "একটি ঘটনা সম্পাদনা করছেন। ঘরগুলো বদলে সংরক্ষণ চাপুন।",
  tl_nothing_edit: "সম্পাদনার জন্য কোনো ঘটনা বাছাই করা নেই।",
  tl_confirm_remove: "এই ঘটনাটি মুছে ফেলবেন? এটি আর ফেরানো যাবে না।",
  tl_print_ready: "আপনার প্রিন্টযোগ্য রেকর্ড তৈরি করা হচ্ছে।",
  tl_generated: "তৈরির তারিখ: {date}",
  tl_platform_on: "প্ল্যাটফর্ম: {value}",
  tl_note_on: "লিংক বা ফাইল: {value}",
  err_date: "একটি তারিখ বেছে নিন।",
  err_what: "যা ঘটেছে তা লিখুন।",
  err_college: "আপনার কলেজের নাম লিখুন।",
  form_not_ready:
    "ফর্মটি এখনো যুক্ত নয়, তাই কিছুই পাঠানো হয়নি। আপনার লেখা ডিভাইস থেকে বাইরে যায়নি।",
  form_sending: "পাঠানো হচ্ছে। একটু অপেক্ষা করুন।",
  form_sent: "আপনার কলেজের DDSR-এর কাছে পাঠানো হয়েছে। এখন এই পাতাটি বন্ধ করতে পারেন।",
  form_failed:
    "বার্তাটি পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন। এই পাতায় কিছুই সেভ হয়নি।"
};

var I18N_KEY = "safesteps.lang";
var BN_DOM = {};
var changeHandlers = [];

function currentLang() {
  return document.documentElement.lang === "en" ? "en" : "bn";
}

function read() {
  try {
    return window.localStorage.getItem(I18N_KEY);
  } catch (e) {
    return null;
  }
}

function save(lang) {
  try {
    window.localStorage.setItem(I18N_KEY, lang);
  } catch (e) {
    /* storage unavailable, the choice just will not persist */
  }
}

function lookup(key, lang) {
  if (lang === "en") return STRINGS_EN[key] || STRINGS_EN_DYNAMIC[key];
  return STRINGS_BN_DYNAMIC[key] || "";
}

function capture(el, attr) {
  if (currentLang() === "en") return;
  var id = attr + ":" + el.getAttribute(attr);
  if (!BN_DOM[id]) BN_DOM[id] = el.textContent;
}

function captureAll() {
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
    capture(el, "data-i18n");
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-placeholder]"), function (el) {
    var key = "ph:" + el.getAttribute("data-i18n-placeholder");
    if (!BN_DOM[key]) BN_DOM[key] = el.getAttribute("placeholder") || "";
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-aria-label]"), function (el) {
    var key = "al:" + el.getAttribute("data-i18n-aria-label");
    if (!BN_DOM[key]) BN_DOM[key] = el.getAttribute("aria-label") || "";
  });
}

function apply(root) {
  var scope = root || document;
  var lang = currentLang();
  var en = lang === "en";

  Array.prototype.forEach.call(scope.querySelectorAll("[data-i18n]"), function (el) {
    capture(el, "data-i18n");
    var key = el.getAttribute("data-i18n");
    /* a key that JavaScript assigns at runtime has no HTML Bangla to read,
       so its Bangla comes from STRINGS_BN_DYNAMIC */
    var s = en
      ? STRINGS_EN[key] || STRINGS_EN_DYNAMIC[key]
      : STRINGS_BN_DYNAMIC[key] || BN_DOM["data-i18n:" + key];
    if (!s) return;

    /* Nothing to do when the string is already what the element says, which is
       always true in Bangla. Assigning textContent anyway would flatten any
       inner markup, so an element like the evidence list, whose <strong> lead
       in term and <a> link live inside one [data-i18n] node, would silently
       lose them on load. English still has to assign, and assigning flattens, so
       an element with inner markup keeps only its first text run. */
    if (el.textContent === s) return;
    el.textContent = s;
  });

  Array.prototype.forEach.call(scope.querySelectorAll("[data-i18n-placeholder]"), function (el) {
    var key = el.getAttribute("data-i18n-placeholder");
    if (!BN_DOM["ph:" + key] && !en) BN_DOM["ph:" + key] = el.getAttribute("placeholder") || "";
    if (en) {
      var s = STRINGS_EN[key] || STRINGS_EN_DYNAMIC[key];
      if (s) el.setAttribute("placeholder", s);
    } else {
      el.setAttribute("placeholder", BN_DOM["ph:" + key]);
    }
  });

  Array.prototype.forEach.call(scope.querySelectorAll("[data-i18n-aria-label]"), function (el) {
    var key = el.getAttribute("data-i18n-aria-label");
    if (!BN_DOM["al:" + key] && !en) BN_DOM["al:" + key] = el.getAttribute("aria-label") || "";
    var s = en ? STRINGS_EN[key] : BN_DOM["al:" + key];
    if (s) el.setAttribute("aria-label", s);
  });
}

function set(lang) {
  document.documentElement.lang = lang === "en" ? "en" : "bn";
  apply(document);
  Array.prototype.forEach.call(document.querySelectorAll("[data-lang]"), function (btn) {
    btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === document.documentElement.lang ? "true" : "false");
  });
  changeHandlers.forEach(function (fn) {
    fn(document.documentElement.lang);
  });
}

function t(key) {
  var lang = currentLang();
  var s = lookup(key, lang);
  return s === undefined ? key : s;
}

Array.prototype.forEach.call(document.querySelectorAll("[data-lang]"), function (btn) {
  btn.addEventListener("click", function () {
    var lang = btn.getAttribute("data-lang");
    save(lang);
    set(lang);
  });
});

captureAll();
set(read() === "en" ? "en" : "bn");

window.SafeStepsI18n = {
  t: t,
  apply: apply,
  onChange: function (fn) {
    changeHandlers.push(fn);
  }
};
