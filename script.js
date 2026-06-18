const initPortfolio = ($) => {
  const $window = $(window);
  const $body = $("body");
  const $loader = $(".loader-wrapper");
  const $topBtn = $(".top-btn");
  const $themeToggle = $(".theme-switch");
  const $typingText = $(".typing-text");
  const $menuToggle = $(".menu-toggle");
  const $menuPanel = $(".menu-panel");
  const $sections = $("[data-section]");
  const $navActions = $("[data-scroll-target]");
  const words = ["PHP Developer", "Laravel Developer", "CodeIgniter Developer", "Backend Engineer", "API Developer"];
  let wordIndex = 0;
  let ticking = false;
  let topVisible = false;

  const setThemeIcon = () => {
    const icon = $body.hasClass("light-mode") ? "bi-sun-fill" : "bi-moon-stars-fill";
    $themeToggle.html(`<i class="bi ${icon}" aria-hidden="true"></i>`);
  };

  const setActiveNav = () => {
    const scrollTop = $window.scrollTop();
    let current = "home";

    $sections.each(function () {
      if (scrollTop >= $(this).offset().top - 220) {
        current = $(this).data("section");
      }
    });

    $navActions.each(function () {
      const $action = $(this);
      $action.toggleClass("active", $action.attr("data-scroll-target") === current);
    });
  };

  const updateScrollState = () => {
    const shouldShowTop = $window.scrollTop() > 300;

    if (shouldShowTop !== topVisible) {
      topVisible = shouldShowTop;
      $topBtn.toggle(shouldShowTop);
    }

    setActiveNav();
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  };

  $window.on("load", () => {
    $loader.fadeOut(160);
  });

  if ($typingText.length) {
    window.setInterval(() => {
      $typingText.text(words[wordIndex]);
      wordIndex = (wordIndex + 1) % words.length;
    }, 2000);
  }

  $topBtn.hide().on("click", () => {
    $("html, body").stop(true).scrollTop(0);
  });

  $navActions.on("click", function () {
    const target = $(this).attr("data-scroll-target");
    const $section = $(`[data-section="${target}"]`);

    if (!$section.length) return;

    $("html, body").stop(true).scrollTop($section.offset().top);
    $menuPanel.removeClass("show");
    $menuToggle.attr("aria-expanded", "false");
    updateScrollState();
  });

  $menuToggle.on("click", () => {
    const isOpen = !$menuPanel.hasClass("show");
    $menuPanel.toggleClass("show", isOpen);
    $menuToggle.attr("aria-expanded", String(isOpen));
  });

  if (localStorage.getItem("theme") === "light") {
    $body.addClass("light-mode");
  }

  setThemeIcon();

  $themeToggle.on("click", () => {
    $body.toggleClass("light-mode");
    localStorage.setItem("theme", $body.hasClass("light-mode") ? "light" : "dark");
    setThemeIcon();
  });

  $window.on("scroll", requestScrollUpdate);
  updateScrollState();
};

if (window.jQuery) {
  initPortfolio(window.jQuery);
} else {
  window.addEventListener("cdnAssetsReady", () => initPortfolio(window.jQuery), { once: true });
}
