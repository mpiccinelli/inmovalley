$(function () {
  initSelects();
  drawMobileMenu();
  initClearFilters();
  initFormValidation();
  initParallax();
  initNewsCards();
  initPropertyCards();
  initFeaturedProperty();
  initCategoriesSection();
  $(".advanced-search-btn").on("click", togleAdvancedSearch);

  console.log("Script cargado correctamente.");
});

function drawMobileMenu() {
  // Copy desktop menu to mobile menu
  const desktopMenuHtml = $(".mp-main-nav").html();
  $("#mp-mobile-menu-body").html(desktopMenuHtml);

  // Change classes to mobile menu styles
  $("#mp-mobile-menu-body ul.list-inline")
    .removeClass("list-inline")
    .addClass("mp-mobile-nav");
  $("#mp-mobile-menu-body li.list-inline-item")
    .removeClass("list-inline-item")
    .addClass("mp-mobile-nav-item");

  // Change "Propiedades" dropdown to a normal submenu in mobile menu
  var $mobileMenu = $("#mp-mobile-menu-body");

  // Select the first dropdown item (Propiedades)
  var $propItem = $mobileMenu.find(".mp-mobile-nav-item.dropdown").first();
  var $propLink = $propItem.children("a").first();
  var $propSubmenu = $propItem.find(".dropdown-menu").first();

  // Delete attributes and classes from the main link
  $propLink
    .removeAttr("data-bs-toggle aria-expanded role id")
    .removeClass("dropdown-toggle");

  // Move submenu out of the <li> and change its classes
  $propSubmenu
    .removeClass("dropdown-menu p-0 bg-dark")
    .addClass("mp-mobile-subnav")
    .appendTo($propItem);

  // Change submenu items classes
  $propSubmenu.find(".dropdown-item").each(function () {
    $(this).addClass("mp-mobile-subnav-item");
    $(this).removeClass("dropdown-item");
  });
}

// Initialize Select2 for multiple select elements
function initSelects() {
  $(".mp-select").select2({
    theme: "bootstrap-5",
    width: "100%",
    minimumResultsForSearch: Infinity,
    placeholder: function () {
      return $(this).data("placeholder") || "";
    },
    allowClear: true,
  });
}

// Function to clear all filters
function clearFilters() {
  // Clear all Select2 elements
  $("#estado").val(null).trigger("change");
  $("#tipo").val(null).trigger("change");
  $("#poblacion").val(null).trigger("change");
  $("#zona").val(null).trigger("change");
  $("#precio-hasta").val(null).trigger("change");
  $("#precio-desde").val(null).trigger("change");
  $("#banos").val(null).trigger("change");
  $("#precio-desde").val(null).trigger("change");
  $("#banos").val(null).trigger("change");
  $("#piscina").prop("checked", false);

  // Clear the reference input field
  $("#referencia").val("");

  // Clear custom checkboxes
  $(".mp-custom-check-input").prop("checked", false);

  console.log("Todos los filtros han sido limpiados.");
} // Initialize event listeners for clear filter buttons
function initClearFilters() {
  // Add event listener to all buttons with "Limpiar Filtros" text
  $(".reset-filters").on("click", function () {
    clearFilters();
  });
}

// Initialize form validation
function initFormValidation() {
  // Bootstrap native validation
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        const recaptchaError = document.getElementById("recaptcha-error");

        if (!recaptchaResponse) {
          recaptchaError.style.display = "block";
          return;
        } else {
          recaptchaError.style.display = "none";
        }

        if (form.checkValidity()) {
          alert("Formulario listo para enviar!");
          const data = $(form).serializeArray();
          console.log("Datos del formulario:", data);
          console.log("reCAPTCHA token:", recaptchaResponse);

          // Clear form after successful submission
          form.reset();
          form.classList.remove("was-validated");

          // Reset reCAPTCHA after successful submission
          grecaptcha.reset();

          // Clear custom checkboxes
          $(".mp-custom-check-input").prop("checked", false);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

function togleAdvancedSearch() {
  const $section = $(".advanced-search-section");

  if ($section.hasClass("d-none")) {
    $section
      .removeClass("d-none")
      .css("opacity", 0)
      .animate({ opacity: 1 }, 300);
  } else {
    $section.animate({ opacity: 0 }, 300, function () {
      $(this).addClass("d-none").css("opacity", "");

      // Clear advanced search filters when hiding
      $("#precio-desde").val(null).trigger("change");
      $("#banos").val(null).trigger("change");
      $("#piscina").prop("checked", false);
    });
  }
}

// Initialize parallax effect
function initParallax() {
  $(".img-parallax").each(function () {
    var img = $(this);
    var imgParent = $(this).parent();

    function parallaxImg() {
      var speed = img.data("speed") || 0.5;
      var imgY = imgParent.offset().top;
      var winY = $(window).scrollTop();
      var winH = $(window).height();
      var parentH = imgParent.innerHeight();

      var winBottom = winY + winH;

      if (winBottom > imgY && winY < imgY + parentH) {
        var imgBottom = (winBottom - imgY) * speed;
        var imgTop = winH + parentH;
        var imgPercent = (imgBottom / imgTop) * 100 + (50 - speed * 50);
      }

      img.css({
        top: imgPercent + "%",
        transform: "translate(-50%, -" + imgPercent + "%)",
      });
    }

    $(window).on("scroll", parallaxImg);
    $(document).ready(parallaxImg);
  });
}

// Initialize news cards interaction
function initNewsCards() {
  // Handle keyboard navigation and click effects
  $(".news-card").on("click", function (e) {
    // Let the default link behavior handle navigation
    // Add a subtle animation effect
    $(this).addClass("animate");
    setTimeout(() => {
      $(this).removeClass("animate");
    }, 200);
  });

  // Handle keyboard navigation
  $(".news-card").on("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = this.href;
    }
  });

  // Add hover animation effects
  $(".news-card").on("mouseenter", function () {
    $(this).find(".news-card-accent-bar").css("animation", "pulse 0.6s ease");
  });

  $(".news-card").on("mouseleave", function () {
    $(this).find(".news-card-accent-bar").css("animation", "");
  });
}

// Initialize property cards interaction
function initPropertyCards() {
  // Handle property card clicks (excluding heart button)
  $(".property-card").on("click", function (e) {
    // Don't trigger if clicking on heart button
    if ($(e.target).closest(".property-card-heart").length) {
      return;
    }

    // Get property reference or create link
    const ref = $(this).find(".property-card-ref").text();
    window.location.href = `#property/${ref}`;
  });

  // Handle favorite button clicks
  $(".property-card-heart").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    const $heart = $(this);
    const $icon = $heart.find(".heart-icon");

    // Toggle favorite state
    if ($heart.hasClass("favorited")) {
      $heart.removeClass("favorited");
      $icon.attr("src", "./assets/images/icon_heart_outline.svg");
      $heart.attr("aria-label", "Añadir a favoritos");
    } else {
      $heart.addClass("favorited");
      $icon.attr("src", "./assets/images/icon_heart_fill.svg");
      $heart.attr("aria-label", "Remover de favoritos");
    }

    // Add animation
    $heart.addClass("animate");
    setTimeout(() => {
      $heart.removeClass("animate");
    }, 300);
  });

  // Add hover effects
  $(".property-card").on("mouseenter", function () {
    $(this).addClass("hovered");
  });

  $(".property-card").on("mouseleave", function () {
    $(this).removeClass("hovered");
  });
}

// Initialize featured property interaction
function initFeaturedProperty() {
  // Handle featured property clicks (excluding heart button)
  $(".featured-property-link").on("click", function (e) {
    // Don't trigger if clicking on heart button
    if ($(e.target).closest(".featured-property-heart").length) {
      return;
    }

    // Get property reference
    const ref = $(this).find(".featured-property-ref").text();
    window.location.href = `#property/${ref}`;
  });

  // Handle favorite button clicks for featured property (reuse existing function)
  $(".featured-property-heart").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    const $heart = $(this);
    const $icon = $heart.find(".heart-icon");

    // Toggle favorite state
    if ($heart.hasClass("favorited")) {
      $heart.removeClass("favorited");
      $icon.attr("src", "./assets/images/icon_heart_outline.svg");
      $heart.attr("aria-label", "Añadir a favoritos");
    } else {
      $heart.addClass("favorited");
      $icon.attr("src", "./assets/images/icon_heart_fill.svg");
      $heart.attr("aria-label", "Remover de favoritos");
    }

    // Add animation
    $heart.addClass("animate");
    setTimeout(() => {
      $heart.removeClass("animate");
    }, 300);
  });

  // Add hover sound effect or additional animations
  $(".featured-property-link").on("mouseenter", function () {
    $(this).addClass("hovered");
  });

  $(".featured-property-link").on("mouseleave", function () {
    $(this).removeClass("hovered");
  });
}

// Initialize categories section interaction
function initCategoriesSection() {
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 767;

  // Initialize - ensure first banner is active
  $(".category-banner").removeClass("active");
  $(".category-banner-01").addClass("active");

  // Desktop and mobile behavior - hover/touch to switch banners
  $(".category-card").on("mouseenter touchstart", function (e) {
    e.preventDefault();
    const targetBanner = $(this).data("banner");

    // Hide all banners
    $(".category-banner").removeClass("active");

    // Show target banner with fade effect
    $(`.${targetBanner}`).addClass("active");
  });

  if (!isMobile) {
    // Desktop only - reset to default banner when mouse leaves
    $(".categories-list").on("mouseleave", function () {
      // Reset to first banner (default)
      $(".category-banner").removeClass("active");
      $(".category-banner-01").addClass("active");
    });

    // Handle focus events for accessibility
    $(".category-card").on("focus", function () {
      $(this).trigger("mouseenter");
    });
  } else {
    // Mobile - also handle tap events specifically
    $(".category-card").on("click", function (e) {
      e.preventDefault();
      const targetBanner = $(this).data("banner");

      // Hide all banners
      $(".category-banner").removeClass("active");

      // Show target banner
      $(`.${targetBanner}`).addClass("active");
    });
  } // Handle category card clicks for navigation (both desktop and mobile)
  $(".category-card").on("click", function (e) {
    // Let the default link behavior handle navigation
    const href = $(this).attr("href");
    if (href) {
      window.location.href = href;
    }
  });

  // Add keyboard navigation support
  $(".category-card").on("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const href = $(this).attr("href");
      if (href) {
        window.location.href = href;
      }
    }
  });
}
