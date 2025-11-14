(function () {
  function initAnimations() {
    // Scroll parallax
    const parallaxEls = document.querySelectorAll(".parallax-bg");
    if (parallaxEls.length) {
      window.addEventListener("scroll", () => {
        parallaxEls.forEach((bg) => {
          const parent = bg.parentElement;
          const speed =
            parseFloat(
              getComputedStyle(parent).getPropertyValue("--parallax-speed")
            ) || 0.5;
          const rect = parent.getBoundingClientRect();
          const offset = -rect.top * speed;
          bg.style.transform = `translateY(${offset}px)`;
        });
      });
    }

    function applyPulseVars(el) {
      const map = [
        ["pulseDelay", "--pulse-delay"],
        ["pulseDuration", "--pulse-duration"],
        ["pulseIterationCount", "--pulse-iteration-count"],
      ];
      map.forEach(([attr, prop]) => {
        const val = el.dataset[attr];
        if (!val) return;

        let cssValue;
        if (attr === "pulseIterationCount") {
          cssValue = val;
        } else if (/^\d+$/.test(val)) {
          cssValue = `${val}ms`;
        } else {
          cssValue = val;
        }

        el.style.setProperty(prop, cssValue);
      });
    }

    // onload animations
    document.querySelectorAll(".animate-on-load").forEach((el) => {
      const delay = parseInt(el.dataset.delay, 10) || 0;
      applyPulseVars(el);
      setTimeout(() => el.classList.add("in-view"), delay);
    });

    // on-scroll animations
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.dataset.delay, 10) || 0;
          applyPulseVars(el);
          setTimeout(() => el.classList.add("in-view"), delay);
          obs.unobserve(el);
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }
})();
