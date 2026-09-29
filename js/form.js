/* SafeSteps private form.

   FORM_ENDPOINT is the only place the destination is set. While it is empty the
   form shows a visible placeholder chip and the submit button is disabled, so
   nobody thinks the form works.

   Nothing about a submission is logged or printed to the console.

   A draft of what has been typed is kept in sessionStorage, so an accidental
   navigation does not destroy an account of what happened. That is the one
   place case text touches device storage, and it is deliberately the weakest
   kind: sessionStorage is scoped to the tab, is not shared with other tabs, is
   not written to disk by this site, and is gone the moment the tab is closed.
   Nothing is sent anywhere. A successful submit clears it. Theme and language
   use their own localStorage keys, handled by their own files.
*/

var FORM_ENDPOINT = "";
var DRAFT_KEY = "safesteps.report.draft";

(function () {
  "use strict";

  var form = document.getElementById("report-form");
  if (!form) return;

  var I = window.SafeStepsI18n;
  var chip = document.getElementById("endpoint-chip");
  var submit = document.getElementById("submit-btn");
  var status = document.getElementById("form-status");
  var anon = document.getElementById("anonymous");
  var anonNote = document.getElementById("anon-note");
  var contactIds = ["contact-name", "contact-phone", "contact-email"];
  var statusKey = "";

  function t(key) {
    return I ? I.t(key) : key;
  }

  /* ---------- draft, sessionStorage only ---------- */

  function readDraft() {
    try {
      var raw = window.sessionStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeDraft() {
    try {
      var data = {};
      ["college", "what"].concat(contactIds).forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.value) data[id] = el.value;
      });
      if (anon.checked) data.anonymous = true;
      if (Object.keys(data).length === 0) {
        window.sessionStorage.removeItem(DRAFT_KEY);
        return;
      }
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) {
      /* private mode, quota, or storage disabled. Losing the draft is the
         correct failure here, so nothing is reported to the user. */
    }
  }

  function clearDraft() {
    try {
      window.sessionStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      /* nothing to do */
    }
  }

  function restoreDraft() {
    var data = readDraft();
    if (!data) return false;
    var restored = false;
    Object.keys(data).forEach(function (id) {
      if (id === "anonymous") return;
      var el = document.getElementById(id);
      if (el && typeof data[id] === "string") {
        el.value = data[id];
        restored = true;
      }
    });
    if (data.anonymous) {
      anon.checked = true;
      restored = true;
    }
    return restored;
  }

  function showStatus(key, className) {
    statusKey = key;
    status.textContent = key ? t(key) : "";
    status.className = className || "";
  }

  /* anonymous clears and disables the contact fields */
  function syncAnon() {
    var on = anon.checked;
    anonNote.hidden = !on;
    contactIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (on) {
        el.value = "";
        el.disabled = true;
      } else {
        el.disabled = false;
      }
    });
  }

  anon.addEventListener("change", function () {
    syncAnon();
    writeDraft();
  });
  syncAnon();

  /* Restore before wiring, so a restored anonymous state disables the contact
     fields instead of showing what was typed into them a moment ago. */
  if (restoreDraft()) {
    syncAnon();
    showStatus("form_draft_restored", "muted");
  }

  form.addEventListener("input", writeDraft);

  function clearError(field) {
    var box = document.getElementById(field + "-error");
    box.textContent = "";
    box.hidden = true;
    document.getElementById(field).removeAttribute("aria-invalid");
  }

  function showError(field, key) {
    var box = document.getElementById(field + "-error");
    box.textContent = t(key);
    box.hidden = false;
    document.getElementById(field).setAttribute("aria-invalid", "true");
  }

  if (!FORM_ENDPOINT) {
    chip.hidden = false;
    submit.disabled = true;

    var note = document.createElement("p");
    note.className = "chip-note";
    note.id = "endpoint-note";
    note.textContent = t("form_not_ready");
    form.insertBefore(note, submit.parentNode);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!FORM_ENDPOINT) return;

    var college = document.getElementById("college");
    var what = document.getElementById("what");

    clearError("college");
    clearError("what");

    var valid = true;
    if (!college.value.trim()) {
      showError("college", "err_college");
      valid = false;
    }
    if (!what.value.trim()) {
      showError("what", "err_what");
      valid = false;
    }
    if (!valid) {
      (college.value.trim() ? what : college).focus();
      return;
    }

    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    showStatus("form_sending", "muted");

    var payload = new FormData(form);
    if (anon.checked) {
      payload.delete("contactName");
      payload.delete("contactPhone");
      payload.delete("contactEmail");
    }

    fetch(FORM_ENDPOINT, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response;
      })
      .then(function () {
        form.reset();
        clearError("college");
        clearError("what");
        clearDraft();
        syncAnon();
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
        showStatus("form_sent", "form-ok");
      })
      .catch(function () {
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
        showStatus("form_failed", "form-error");
      });
  });

  if (I) {
    I.onChange(function () {
      if (statusKey) showStatus(statusKey, status.className);
      var note = document.getElementById("endpoint-note");
      if (note) note.textContent = t("form_not_ready");
      ["college", "what"].forEach(function (field) {
        var box = document.getElementById(field + "-error");
        if (box && !box.hidden) box.textContent = t(field === "college" ? "err_college" : "err_what");
      });
    });
  }
})();
