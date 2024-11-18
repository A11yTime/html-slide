let slideIndex = 1;
    let isPlaying = true;
    let intervalId;
    const slides = document.querySelectorAll('.mySlides');
    // const dots = document.querySelectorAll('.dot');
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const ariaLive = document.getElementById('slideshow');
    
    // Initialize the slideshow
    function showSlides() {
      if (slideIndex > slides.length) slideIndex = 1;
      if (slideIndex < 1) slideIndex = slides.length;
  
      slides.forEach(slide => slide.style.display = 'none');
    //   dots.forEach(dot => dot.classList.remove('active'));
  
      slides[slideIndex - 1].style.display = 'block';
    //   dots[slideIndex - 1].classList.add('active');
    }
  
    // Start auto-rotation
    function startAutoRotation() {
      intervalId = setInterval(() => {
        if (isPlaying) {
          nextSlide();
        }
      }, 3000); // Change slide every 3 seconds
    }
  
    // Stop auto-rotation
    function stopAutoRotation() {
      clearInterval(intervalId);
    }
  
    // Show next slide
    function nextSlide() {
      slideIndex++;
      showSlides();
    }
  
    // Show previous slide
    function prevSlide() {
      slideIndex--;
      showSlides();
    }
  
    // Jump to specific slide
    function currentSlide(n) {
      slideIndex = n;
      showSlides();
    }
  
    // Toggle play/pause
    function togglePlayPause() {
      isPlaying = !isPlaying;
      if (isPlaying) {
        startAutoRotation();
        playPauseIcon.className = 'fas fa-pause';
        playPauseButton.setAttribute('aria-pressed', 'true');
      } else {
        stopAutoRotation();
        playPauseIcon.className = 'fas fa-play';
        playPauseButton.setAttribute('aria-pressed', 'false');
      }
      updateAriaLive();
    }
  
    // Update aria-live based on play/pause status
    function updateAriaLive() {
      if (isPlaying) {
        ariaLive.setAttribute('aria-live', 'off'); // Off during auto-rotation
      } else {
        ariaLive.setAttribute('aria-live', 'polite'); // Polite when paused
      }
    }
  
    // Initialize controls and start the slideshow
    playPauseButton.addEventListener('click', togglePlayPause);
  
    // Add focus and blur event listeners to next and previous buttons
    prevButton.addEventListener('focus', () => {
      ariaLive.setAttribute('aria-live', 'polite');
      stopAutoRotation(); // Stop auto-rotation when button is focused
    });
    prevButton.addEventListener('blur', () => {
      ariaLive.setAttribute('aria-live', 'off');
      startAutoRotation(); // Resume auto-rotation when focus is lost
    });
  
    nextButton.addEventListener('focus', () => {
      ariaLive.setAttribute('aria-live', 'polite');
      stopAutoRotation(); // Stop auto-rotation when button is focused
    });
    nextButton.addEventListener('blur', () => {
      ariaLive.setAttribute('aria-live', 'off');
      startAutoRotation(); // Resume auto-rotation when focus is lost
    });
  
    // Add focus and blur event listeners to images (stop rotation on focus, resume on blur)
    const images = document.querySelectorAll('.mySlides img');
    
    images.forEach(image => {
      image.addEventListener('focus', () => {
        stopAutoRotation(); // Stop auto-rotation when image is focused
      });
      image.addEventListener('blur', () => {
        startAutoRotation(); // Resume auto-rotation when image loses focus
      });
    });
  
    showSlides();
    startAutoRotation(); // Initially start auto-rotation