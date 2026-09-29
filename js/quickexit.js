/* SafeSteps Quick Exit.
   Button on every page plus the Esc key. Uses location.replace so the Back
   button does not return to SafeSteps.
   This does NOT erase browser history. No website can guarantee that. */

var QUICK_EXIT_URL = "https://www.google.com";

function quickExit() {
  window.location.replace(QUICK_EXIT_URL);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") quickExit();
});

var quickExitButton = document.querySelector(".quick-exit");
if (quickExitButton) {
  quickExitButton.addEventListener("click", quickExit);
}
