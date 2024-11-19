const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let currentIndex = 0; 
const totalSlides = slides.length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
   
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

  
    slides.forEach(slide => {
        const content = slide.querySelector('.slide-content');
        content.style.animation = 'none';
        content.offsetHeight; 
        content.style.animation = 'fadeInUp 0.5s forwards';
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}


nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// 6 seconds
let autoplayInterval = setInterval(nextSlide, 6000);

carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 6000);
});


let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    autoplayInterval = setInterval(nextSlide, 6000);
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});
