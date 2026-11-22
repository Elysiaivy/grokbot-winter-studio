const languageButton = document.querySelector(".locale");
const copy = [...document.querySelectorAll("[data-en]")].map((element) => ({
  element,
  chinese: element.textContent,
  english: element.dataset.en,
}));
const pictures = [...document.querySelectorAll("[data-alt-en]")].map((element) => ({
  element,
  chinese: element.alt,
  english: element.dataset.altEn,
}));
const chineseTitle = document.title;
let useEnglish = new URLSearchParams(window.location.search).get("lang") === "en";

function showLanguage() {
  const language = useEnglish ? "english" : "chinese";
  document.documentElement.lang = useEnglish ? "en" : "zh-CN";
  document.title = useEnglish ? "Grokbot Winter Studio" : chineseTitle;
  for (const entry of copy) entry.element.textContent = entry[language];
  for (const entry of pictures) entry.element.alt = entry[language];
  languageButton.textContent = useEnglish ? "中文" : "EN";
  languageButton.setAttribute("aria-label", useEnglish ? "阅读中文版本" : "Read in English");
}

languageButton.addEventListener("click", () => {
  useEnglish = !useEnglish;
  showLanguage();
  const url = new URL(window.location.href);
  if (useEnglish) url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  window.history.replaceState(null, "", url);
});

showLanguage();
languageButton.hidden = false;
