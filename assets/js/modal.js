document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;
    let slides = [];
    
    // Get all portfolio links
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    // Add click event to each portfolio link
    portfolioLinks.forEach(link => {
        link.addEventListener('click', handlePortfolioClick);
    });
  const modalHTML = `
        <div class="portfolio-modal">
            <div class="modal-content">
                <button class="modal-close"><i class="las la-times"></i></button>
                <div class="slider-container">
                    <div class="slider-wrapper"></div>
                    <button class="slider-arrow slider-prev"><i class="las la-angle-left"></i></button>
                    <button class="slider-arrow slider-next"><i class="las la-angle-right"></i></button>
                </div>
            </div>
        </div>
    `;

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Get modal elements
  const modal = document.querySelector(".portfolio-modal");
  const modalClose = modal.querySelector(".modal-close");
  const sliderWrapper = modal.querySelector(".slider-wrapper");
  const prevButton = modal.querySelector(".slider-prev");
  const nextButton = modal.querySelector(".slider-next");

    function handlePortfolioClick(e) {
        e.preventDefault();
        
        try {
            // Get images from data-images attribute
            slides = JSON.parse(this.getAttribute('data-images') || '[]');
            if (slides.length === 0) {
                slides = [this.querySelector('img').src];
            }

            // Create slides
            sliderWrapper.innerHTML = slides.map(slide => `
                <div class="slider-slide">
                    <img src="${slide}" alt="Project image">
                </div>
            `).join('');

            // Reset current slide and show modal
            currentSlideIndex = 0;
            updateSlider();
            modal.classList.add('active');
                }
            } catch (error) {
                // Fallback to main image if data-images is invalid
                slides = [item.querySelector("img").src];
                console.error("Error parsing data-images:", error);
            }      // Create slides
      sliderWrapper.innerHTML = slides
        .map(
          (slide) => `
                <div class="slider-slide">
                    <img src="${slide}" alt="Project image">
                </div>
            `
        )
        .join("");

      // Reset current slide
      currentSlideIndex = 0;
      updateSlider();

      // Show modal
      modal.classList.add("active");
    });
  });

    // Close modal
    modalClose.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("active");
    });  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Previous slide
  prevButton.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Next slide
  nextButton.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlider();
  });

  // Update slider position
  function updateSlider() {
    requestAnimationFrame(() => {
        sliderWrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // Show/hide navigation arrows based on number of slides
        if (slides.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'flex';
            nextButton.style.display = 'flex';
        }
    });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      modal.classList.remove("active");
    } else if (e.key === "ArrowLeft") {
      prevButton.click();
    } else if (e.key === "ArrowRight") {
      nextButton.click();
    }
  });
});
