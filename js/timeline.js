/* SafeSteps evidence timeline builder.

   Everything lives in one array in memory. Nothing is written to localStorage,
   sessionStorage or cookies, and no network request is made from this file.
   Closing the page clears it.
*/

(function () {
  "use strict";

  var form = document.getElementById("entry-form");
  if (!form) return;

  var I = window.SafeStepsI18n;
  var entries = [];
  var nextId = 1;
  var editingId = null;
  var newestFirst = false;

  var list = document.getElementById("entry-list");
  var emptyState = document.getElementById("empty-state");
  var recordHead = document.getElementById("record-head");
  var recordFacade = document.getElementById("record-facade");
  var recordCount = document.getElementById("record-count");
  var printTrigger = document.getElementById("print-trigger");
  var status = document.getElementById("entry-status");
  var submitBtn = document.getElementById("entry-submit");
  var cancelBtn = document.getElementById("entry-cancel");
  var sortBtn = document.getElementById("sort-toggle");
  var entryTemplate = document.getElementById("entry-template");
  var printBody = document.getElementById("print-body");
  var printGenerated = document.getElementById("print-generated");
  var printRowTemplate = document.getElementById("print-row-template");

  var fields = {
    date: document.getElementById("t-date"),
    time: document.getElementById("t-time"),
    platform: document.getElementById("t-platform"),
    what: document.getElementById("t-what"),
    note: document.getElementById("t-note")
  };

  function t(key) {
    return I ? I.t(key) : key;
  }

  var statusKey = "";

  function showStatus(key) {
    statusKey = key;
    status.textContent = key ? t(key) : "";
  }

  function setEditing(on) {
    editingId = on ? editingId : null;
    submitBtn.setAttribute("data-i18n", on ? "tl_save" : "tl_add");
    /* apply to the parent, because apply walks descendants */
    if (I) I.apply(submitBtn.parentNode);
    cancelBtn.hidden = !on;
  }

  function fill(node, key, value) {
    var el = node.querySelector('[data-field="' + key + '"]');
    if (el) el.textContent = value;
  }

  function sorted() {
    var copy = entries.slice().sort(function (a, b) {
      var ka = a.date + " " + (a.time || "");
      var kb = b.date + " " + (b.time || "");
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    });
    return newestFirst ? copy.reverse() : copy;
  }

  /* One window lights per recorded event, and the strip caps at the fifteen
     panes the facade has. Past fifteen the count carries the rest, so the strip
     never overstates what is in the list. */
  function renderFacade() {
    if (!recordFacade) return;
    var panes = recordFacade.children;
    var lit = Math.min(entries.length, panes.length);
    for (var i = 0; i < panes.length; i++) {
      if (i < lit) panes[i].setAttribute("data-lit", "true");
      else panes[i].removeAttribute("data-lit");
    }
    if (recordCount) {
      recordCount.textContent = t("tl_recorded").replace("{count}", String(entries.length));
    }
    if (recordHead) recordHead.hidden = entries.length === 0;
  }

  function render(highlightId) {
    list.textContent = "";
    emptyState.hidden = entries.length > 0;
    printTrigger.hidden = entries.length === 0;
    renderFacade();

    sorted().forEach(function (entry) {
      var node = entryTemplate.content.firstElementChild.cloneNode(true);
      node.setAttribute("data-id", entry.id);
      fill(node, "when", entry.time ? entry.date + "  " + entry.time : entry.date);
      fill(node, "what", entry.what);
      if (entry.platform) {
        var p = node.querySelector('[data-field="platform"]');
        p.textContent = t("tl_platform_on").replace("{value}", entry.platform);
        p.hidden = false;
      }
      if (entry.note) {
        var n = node.querySelector('[data-field="note"]');
        n.textContent = t("tl_note_on").replace("{value}", entry.note);
        n.hidden = false;
      }
      /* the row that was just added or edited fades in, so it is obvious which
         one the form produced. The class is removed on the next render, and the
         animation is inside a prefers-reduced-motion block, so with reduced
         motion the row is simply there */
      if (entry.id === highlightId) node.classList.add("entry-new");
      list.appendChild(node);
    });

    renderPrintSheet();
    if (I) I.apply(list);
  }

  function renderPrintSheet() {
    printBody.textContent = "";
    printGenerated.textContent = t("tl_generated").replace(
      "{date}",
      new Date().toISOString().slice(0, 10)
    );

    sorted().forEach(function (entry) {
      var row = printRowTemplate.content.firstElementChild.cloneNode(true);
      fill(row, "date", entry.date);
      fill(row, "time", entry.time || "");
      fill(row, "platform", entry.platform || "");
      fill(row, "what", entry.what);
      fill(row, "note", entry.note || "");
      printBody.appendChild(row);
    });
  }

  function setError(field, key) {
    var box = document.getElementById("t-" + field + "-error");
    box.textContent = t(key);
    box.hidden = false;
    fields[field].setAttribute("aria-invalid", "true");
  }

  function clearErrors() {
    ["date", "what"].forEach(function (field) {
      var box = document.getElementById("t-" + field + "-error");
      box.textContent = "";
      box.hidden = true;
      fields[field].removeAttribute("aria-invalid");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    var valid = true;
    if (!fields.date.value) {
      setError("date", "err_date");
      valid = false;
    }
    if (!fields.what.value.trim()) {
      setError("what", "err_what");
      valid = false;
    }
    if (!valid) {
      (fields.date.value ? fields.what : fields.date).focus();
      return;
    }

    var data = {
      date: fields.date.value,
      time: fields.time.value,
      platform: fields.platform.value.trim(),
      what: fields.what.value.trim(),
      note: fields.note.value.trim()
    };

    var highlight;
    if (editingId !== null) {
      highlight = editingId;
      Object.assign(entries.find(function (e) { return e.id === editingId; }), data);
      showStatus("tl_updated");
    } else {
      /* entries.length is NOT usable as the id: deleting an entry shrinks the
         array, so the next add would reuse a live id. The counter is two lines
         and it is the thing that makes the id unique. */
      data.id = nextId++;
      highlight = data.id;
      entries.push(data);
      showStatus("tl_added");
    }

    form.reset();
    setEditing(false);
    render(highlight);
  });

  cancelBtn.addEventListener("click", function () {
    form.reset();
    clearErrors();
    setEditing(false);
    showStatus("tl_edit_cancelled");
  });

  list.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-action]");
    if (!button) return;

    var id = Number(button.closest("[data-id]").getAttribute("data-id"));
    var index = entries.findIndex(function (entry) { return entry.id === id; });
    if (index < 0) return;

    if (button.getAttribute("data-action") === "edit") {
      var entry = entries[index];
      editingId = id;
      fields.date.value = entry.date;
      fields.time.value = entry.time;
      fields.platform.value = entry.platform;
      fields.what.value = entry.what;
      fields.note.value = entry.note;
      setEditing(true);
      showStatus("tl_editing");
      fields.what.focus();
    } else {
      if (!window.confirm(t("tl_confirm_remove"))) return;
      entries.splice(index, 1);
      if (editingId === id) {
        form.reset();
        setEditing(false);
      }
      showStatus("tl_removed");
      render();
    }
  });

  sortBtn.addEventListener("click", function () {
    newestFirst = !newestFirst;
    sortBtn.setAttribute("aria-pressed", newestFirst ? "true" : "false");
    sortBtn.querySelector('[data-i18n="tl_sort_oldest"]').hidden = newestFirst;
    sortBtn.querySelector('[data-i18n="tl_sort_newest"]').hidden = !newestFirst;
    render();
  });

  document.getElementById("print-btn").addEventListener("click", function () {
    showStatus("tl_print_ready");
    window.print();
  });

  window.addEventListener("beforeprint", renderPrintSheet);

  if (I) {
    I.onChange(function () {
      if (editingId !== null) setEditing(true);
      showStatus(statusKey);
      render();
    });
  }

  render();
})();
