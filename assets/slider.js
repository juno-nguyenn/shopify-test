document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-slider="Slider"]').forEach(slider => {
    let count = 0;
    let isDragging = false;
    let startX;
 
    
    const prevButton = slider.querySelector(".prev");
    const nextButton = slider.querySelector(".next");
    const sliderContent = slider.querySelector(".js-slider-content");
    const sliders = sliderContent.querySelectorAll(".js-slider-item");
    const paginationContainer = slider.querySelector(".js-pagination");
    
    sliders[0].classList.add("show");
    
    paginationContainer.innerHTML = '';
    
    sliders.forEach((_, index) => {
      const dash = document.createElement("div");
      dash.className = "dash";
      dash.dataset.index = index;
      paginationContainer.appendChild(dash);
    });
    
    const dots = slider.querySelectorAll(".js-pagination .dash");
    
    initListeners();
    // setHeight();
    
    
    function initListeners() {
      nextButton.addEventListener("click", () => navigate(1));
      prevButton.addEventListener("click", () => navigate(-1));
      dots.forEach(dot => dot.addEventListener("click", onDotClick));
      slider.addEventListener("mousedown", onMouseDown);
      slider.addEventListener("touchstart", onTouchStart, { passive: false });
      slider.addEventListener("mousemove", onMove);
      slider.addEventListener("touchmove", onTouchMove, { passive: false });
      slider.addEventListener("mouseup", onEnd);
      slider.addEventListener("touchend", onEnd);
      // window.addEventListener("resize", setHeight);
    }
    
    function navigate(direction) {
      const max = sliders.length;
      const oldIndex = count;
      count = (count + direction + max) % max;
      updateSlides(oldIndex, count);
    }
    
    function onDotClick(e) {
      const index = parseInt(e.target.dataset.index, 10);
      if (index !== count) {
        const oldIndex = count;
        count = index;
        updateSlides(oldIndex, count);
      }
    }
    
    function updateSlides(oldIndex, newIndex) {
      sliders[oldIndex].classList.remove("show");
      dots[oldIndex].classList.remove("active");
      sliders[newIndex].classList.add("show");
      dots[newIndex].classList.add("active");
    }
    
    function onMouseDown(e) {
      isDragging = true;
      startX = e.pageX;
    }
    
    function onTouchStart(e) {
      isDragging = true;
      startX = e.touches[0].pageX;
    }
    
    function onMove(e) {
      if (isDragging) {
        const currentX = e.pageX || e.touches[0].pageX;
        const distance = currentX - startX;
        if (distance > 50) {
          navigate(-1);
          isDragging = false;
        } else if (distance < -50) {
          navigate(1);
          isDragging = false;
        }
      }
    }
    
    function onTouchMove(e) {
      e.preventDefault();
      onMove(e);
    }
    
    function onEnd() {
      isDragging = false;
    }
    
    function setHeight() {
      slider.style.height = `${sliders[0].offsetHeight}px`;
    }
    
    dots[0].classList.add("active");
  });
});