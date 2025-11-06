document.addEventListener("DOMContentLoaded", function () {
  // تهيئة Fancybox
  Fancybox.bind('[data-fancybox="portfolio-gallery"]', {
    // خيارات عامة
    infinite: true,
    keyboard: true,
    compact: false,
    idle: false,
    dragToClose: false,

    // خيارات العرض
    animated: true,
    showClass: "f-fadeIn",
    hideClass: "f-fadeOut",

    // خيارات الصور
    Image: {
      zoom: true,
      wheel: "slide",
      fit: "contain",
      Panzoom: {
        maxScale: 2,
      },
    },

    // خيارات التنقل
    Navigation: {
      prevTpl: '<span class="las la-angle-left"></span>',
      nextTpl: '<span class="las la-angle-right"></span>',
    },

    // خيارات الشريط العلوي
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },

    // خيارات المصغرات
    Thumbs: {
      type: "classic",
      Carousel: {
        center: true,
        fillSlide: true,
      },
    },
  });

  // تحويل روابط المشاريع الحالية لتعمل مع Fancybox
  document.querySelectorAll(".portfolio-link").forEach((link) => {
    link.onclick = function (e) {
      e.preventDefault();

      try {
        const images = JSON.parse(this.getAttribute("data-images") || "[]");
        if (images.length > 0) {
          Fancybox.show(
            images.map((src) => ({
              src,
              type: "image",
            })),
            {
              startIndex: 0,
            }
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }

      return false;
    };
  });
});
