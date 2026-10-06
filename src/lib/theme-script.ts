export const THEME_STORAGE_KEY = "theme"

// Runs in <head> before the page is painted, so a visitor who prefers dark
// mode never sees a flash of the light theme. It must stay plain JavaScript
// because it is inlined as a string, not bundled.
export const themeScript = `(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme =
      stored === "dark" || stored === "light"
        ? stored
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.classList.add(theme);
  } catch (e) {}
})()`
