function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// Scroll-reveal: fade in elements when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Close mobile menu if clicked
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if(menu.classList.contains("open")) {
            menu.classList.remove("open");
            icon.classList.remove("open");
        }
    });
});

// Dynamic Nav Background on Scroll
window.addEventListener('scroll', () => {
    const desktopNav = document.getElementById('desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');
    
    if (window.scrollY > 50) {
        if(desktopNav) desktopNav.classList.add('scrolled');
        if(hamburgerNav) hamburgerNav.classList.add('scrolled');
    } else {
        if(desktopNav) desktopNav.classList.remove('scrolled');
        if(hamburgerNav) hamburgerNav.classList.remove('scrolled');
    }
});

// Groups Carousel Logic
let currentSlide = 0;
let slideInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if(slides.length === 0) return;
    
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = '';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set heights correctly for all slides instead of display none
    slides.forEach((slide, index) => {
        slide.style.display = 'block';
    });
    
    startAutoSlide();
}

function updateCarousel() {
    const viewport = document.querySelector('.carousel-viewport');
    if(viewport) {
        viewport.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if(slides.length === 0) return;
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    if(slideInterval) startAutoSlide();
}

// Manual scroll function for horizontal snapping Projects Grid
function scrollProjects(direction, btn) {
    const wrapper = btn.closest('.projects-carousel-wrapper');
    if (!wrapper) return;
    const grid = wrapper.querySelector('.projects-grid');
    if (!grid) return;
    
    // Calculates the exact width of one visible card + gap (or dynamically get clientWidth for a chunk)
    const scrollAmount = grid.clientWidth; 
    grid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});
