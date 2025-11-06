document.addEventListener("DOMContentLoaded", function () {
  const portfolioItems = document.querySelectorAll(
    ".portfolio-items .col-md-12"
  );
  const loadMoreBtn = document.getElementById("load-more-btn");
  const itemsToShow = 4; // عدد المشاريع التي تظهر في البداية

  // إخفاء المشاريع الزائدة
  portfolioItems.forEach((item, index) => {
    if (index >= itemsToShow) {
      item.classList.add("hidden-portfolio");
    }
  });

  // التحقق مما إذا كان هناك حاجة لزر "عرض المزيد"
  if (portfolioItems.length <= itemsToShow) {
    loadMoreBtn.classList.add("hidden");
  }

  // إضافة حدث النقر على زر "عرض المزيد"
  loadMoreBtn.addEventListener("click", function () {
    const hiddenItems = document.querySelectorAll(".hidden-portfolio");

    hiddenItems.forEach((item, index) => {
      if (index < itemsToShow) {
        item.classList.add("show");
        setTimeout(() => {
          item.classList.remove("hidden-portfolio");
        }, 500);
      }
    });

    // إخفاء الزر إذا تم عرض كل المشاريع
    if (
      document.querySelectorAll(".hidden-portfolio:not(.show)").length === 0
    ) {
      this.classList.add("hidden");
    }

    // تحديث تأثيرات التمرير للمحتوى الجديد
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });
});
