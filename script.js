// Kínera - JavaScript functionality
// El arte que nos conecta

// Mobile menu functionality
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.nav-mobile');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Header background on scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'hsla(354, 100%, 97%, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'hsla(354, 100%, 97%, 0.95)';
        header.style.backdropFilter = 'blur(12px)';
    }
}

// Animation on scroll functionality
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Intersection Observer for scroll animations
function setupScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up');
animatedElements.forEach(el => {
    if (!el.closest('.header') && !el.closest('.nav-desktop')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    }
});
}

// Hover effects for cards
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .value-card, .workshop-card, .sdg-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-0.5rem) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Button click effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.width = ripple.style.height = '10px';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Parallax effect for decorative elements
function setupParallaxEffect() {
    const decorativeElements = document.querySelectorAll('.hero-decoration, .contact-decoration');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        decorativeElements.forEach((element, index) => {
            const rate = scrolled * (0.5 + index * 0.1);
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Typewriter effect for hero subtitle (optional enhancement)
function setupTypewriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary-foreground)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1500);
}

// Form validation for contact (if needed in future)
function setupFormValidation() {
    // Placeholder for future contact form functionality
    console.log('Form validation ready for future implementation');
}

// Performance optimization - lazy loading images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.transition = 'opacity 0.3s';
                        img.style.opacity = '1';
                    };
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Accessibility improvements
function setupAccessibilityFeatures() {
    // Add keyboard navigation for custom buttons
    const customButtons = document.querySelectorAll('button[onclick], .logo');
    
    customButtons.forEach(button => {
        button.setAttribute('tabindex', '0');
        
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        *:focus-visible {
            outline: 2px solid var(--ring);
            outline-offset: 2px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(focusStyle);
}

// Error handling for external links
function setupLinkValidation() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            try {
                // Add analytics tracking if needed
                console.log('External link clicked:', link.href);
            } catch (error) {
                console.warn('Link tracking error:', error);
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Kínera - El arte que nos conecta - Initialized');
    
    // Core functionality
    setupScrollObserver();
    setupCardHoverEffects();
    setupButtonEffects();
    addRippleAnimation();
    setupParallaxEffect();
    setupAccessibilityFeatures();
    setupLinkValidation();
    setupLazyLoading();
    
    // Optional enhancements
    // setupTypewriterEffect(); // Uncomment for typewriter effect
    
    // Event listeners
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize hero animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .animate-fade-in, .hero .animate-fade-in-up');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    const loadTime = performance.now();
    console.log(`Kínera website loaded in ${Math.round(loadTime)}ms`);
    
    // Trigger final animations
    document.body.classList.add('loaded');
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Export functions for potential external use
window.KineraJS = {
    scrollToSection,
    toggleMobileMenu
};