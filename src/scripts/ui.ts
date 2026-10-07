const root = document.documentElement;

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("edesigrs-theme", next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f6f3ec" : "#0b0e12");
});

const navBtn = document.getElementById("nav-toggle");
const navPanel = document.getElementById("mobile-nav");
navBtn?.addEventListener("click", () => {
  const willOpen = navPanel?.hasAttribute("hidden") ?? false;
  if (willOpen) navPanel?.removeAttribute("hidden");
  else navPanel?.setAttribute("hidden", "");
  navBtn.setAttribute("aria-expanded", String(willOpen));
});

const fitSearch = document.querySelector<HTMLInputElement>("#fit-search");
const cards = [...document.querySelectorAll<HTMLElement>("[data-audience]")];
let category = "All";

function applyFit() {
  const needle = (fitSearch?.value ?? "").trim().toLowerCase();
  let shown = 0;
  cards.forEach((card) => {
    const okCategory = category === "All" || card.dataset.category === category;
    const okQuery = !needle || (card.dataset.search ?? "").includes(needle);
    const visible = okCategory && okQuery;
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  const empty = document.getElementById("fit-empty");
  if (empty) empty.hidden = shown !== 0;
}

document.querySelectorAll<HTMLButtonElement>("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    category = button.dataset.category ?? "All";
    document.querySelectorAll<HTMLButtonElement>("[data-category]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    applyFit();
  });
});
fitSearch?.addEventListener("input", applyFit);

document.querySelectorAll<HTMLButtonElement>(".faq-q").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling as HTMLElement | null;
    const willOpen = panel?.hasAttribute("hidden") ?? false;
    document.querySelectorAll(".faq-a").forEach((item) => item.setAttribute("hidden", ""));
    document.querySelectorAll(".faq-q").forEach((item) => item.setAttribute("aria-expanded", "false"));
    if (willOpen && panel) panel.removeAttribute("hidden");
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

const guideSearch = document.querySelector<HTMLInputElement>("#guide-search");
const guideCards = [...document.querySelectorAll<HTMLElement>("[data-guide]")];
guideSearch?.addEventListener("input", () => {
  const needle = guideSearch.value.trim().toLowerCase();
  let shown = 0;
  guideCards.forEach((card) => {
    const visible = !needle || (card.dataset.guide ?? "").includes(needle);
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  const empty = document.getElementById("guide-empty");
  if (empty) empty.hidden = shown !== 0;
});

document.querySelectorAll<HTMLFormElement>("form[data-inquiry]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const error = form.querySelector<HTMLElement>("[data-error]");
    const status = form.querySelector<HTMLElement>("[data-status]");
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const offer = String(data.get("offer") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const intent = String(data.get("intent") ?? "contact");
    const fail = (message: string) => {
      if (!error) return;
      error.hidden = false;
      error.textContent = message;
    };
    if (name.length < 2) return fail("Add your name so the reply is not a blank thread.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Use a real email. The reply goes there, not to this page.");
    if (intent === "offer" && offer && !/^\d[\d,]*$/.test(offer)) {
      return fail("Offer should be a number in US dollars, or leave it blank to discuss.");
    }
    if (error) error.hidden = true;
    const subject =
      intent === "buy"
        ? "Buy now: edesigrs.cloud at $149,000"
        : intent === "offer"
          ? "Offer for edesigrs.cloud"
          : "edesigrs.cloud acquisition inquiry";
    const intro =
      intent === "buy"
        ? "I am prepared to acquire edesigrs.cloud at the listed price of $149,000 USD."
        : intent === "offer"
          ? "I would like to make an offer on edesigrs.cloud."
          : "I am inquiring about acquiring edesigrs.cloud.";
    const body = [
      "Hello,",
      "",
      intro,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      intent === "offer" ? `Offer (USD): ${offer}` : "",
      "Intended use:",
      note,
      "",
      "Thank you.",
    ]
      .filter(Boolean)
      .join("\n");
    if (status) {
      status.hidden = false;
      status.textContent = "Your mail app should open with the inquiry filled in. Send it from your own account.";
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cta", cta: intent });
    window.location.href = `mailto:sales@desertrich.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("[data-cta]") : null;
  if (!target) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "cta", cta: target.getAttribute("data-cta") });
});

document.querySelectorAll<HTMLElement>("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("exit")?.setAttribute("hidden", "");
  });
});

if (!sessionStorage.getItem("edesigrs-exit") && !window.matchMedia("(pointer: coarse)").matches) {
  const started = performance.now();
  let entered = false;
  let armed = false;

  const tryArm = () => {
    const elapsed = performance.now() - started;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const deep = max > 80 && window.scrollY / max >= 0.55;
    if (elapsed >= 12000 || (deep && elapsed >= 8000)) armed = true;
  };

  const dwell = window.setTimeout(tryArm, 12000);
  document.documentElement.addEventListener("mouseenter", () => {
    entered = true;
  });
  document.addEventListener("scroll", tryArm, { passive: true });
  document.documentElement.addEventListener("mouseleave", (event) => {
    if (!entered || !armed || event.clientY > 0) return;
    sessionStorage.setItem("edesigrs-exit", "1");
    document.getElementById("exit")?.removeAttribute("hidden");
    window.clearTimeout(dwell);
  });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
