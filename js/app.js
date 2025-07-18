// InterviewPro AI - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initCustomCursor();
    initRippleEffects();
    initParallaxEffects();
    initSmoothScrolling();
    initWebcamSimulation();
    initFormValidation();
    initHoverEffects();
    
    console.log('InterviewPro AI initialized successfully');
});

// Scroll-based animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation delays for grid items
                if (entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('problem-grid') ||
                    entry.target.parentElement.classList.contains('testimonials-grid')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .glass-card, .feature-card, .problem-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Custom cursor effects
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
}

// Ripple effects for buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .glass-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const hologram = document.querySelector('.ai-hologram');
    
    if (!heroSection || !hologram) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
            hologram.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Webcam simulation for demo page
function initWebcamSimulation() {
    const webcamButton = document.querySelector('#allow-webcam');
    const demoVideo = document.querySelector('#demo-video');
    const demoError = document.querySelector('#demo-error');
    
    if (!webcamButton) return;

    webcamButton.addEventListener('click', async function() {
        try {
            this.textContent = 'Accessing camera...';
            this.disabled = true;
            
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: true,
                audio: false 
            });
            
            if (demoVideo) {
                demoVideo.srcObject = stream;
                demoVideo.play();
                this.textContent = 'Camera Active';
                this.classList.add('btn-success');
                
                // Simulate AI analysis feedback
                setTimeout(() => {
                    showAIFeedback();
                }, 2000);
            }
            
        } catch (error) {
            console.error('Webcam access error:', error);
            
            let errorMessage = 'Webcam access not available. ';
            
            if (error.name === 'NotAllowedError') {
                errorMessage += 'Please allow camera access and try again.';
            } else if (error.name === 'NotFoundError') {
                errorMessage += 'No camera found on this device.';
            } else {
                errorMessage += 'Please try a compatible browser.';
            }
            
            if (demoError) {
                demoError.textContent = errorMessage;
                demoError.style.display = 'block';
            }
            
            this.textContent = 'Try Again';
            this.disabled = false;
        }
    });
}

// Show simulated AI feedback
function showAIFeedback() {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'ai-feedback glass-card';
    feedbackContainer.innerHTML = `
        <h3>AI Analysis Results</h3>
        <div class="feedback-metrics">
            <div class="metric">
                <span class="metric-label">Eye Contact:</span>
                <span class="metric-value good">Excellent</span>
            </div>
            <div class="metric">
                <span class="metric-label">Confidence Level:</span>
                <span class="metric-value good">87%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Speaking Pace:</span>
                <span class="metric-value warning">Slightly Fast</span>
            </div>
            <div class="metric">
                <span class="metric-label">Posture:</span>
                <span class="metric-value good">Professional</span>
            </div>
        </div>
        <p class="feedback-summary">Great job! Your eye contact and posture are excellent. Try to slow down your speaking pace slightly for better clarity.</p>
    `;
    
    const demoContainer = document.querySelector('.demo-container');
    if (demoContainer) {
        demoContainer.appendChild(feedbackContainer);
        feedbackContainer.classList.add('animate-fade-in');
    }
}

// Form validation for contact page
function initFormValidation() {
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Clear previous errors
        clearFormErrors();
        
        let isValid = true;
        
        // Validate name
        if (!name || name.trim().length < 2) {
            showFieldError('name', 'Please enter a valid name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message || message.trim().length < 10) {
            showFieldError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        if (isValid) {
            submitForm(formData);
        }
    });
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorElement);
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    const errorFields = document.querySelectorAll('.error');
    
    errorElements.forEach(el => el.remove());
    errorFields.forEach(field => field.classList.remove('error'));
}

function submitForm(formData) {
    const submitButton = document.querySelector('#submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage('Thank you! Your message has been sent successfully.');
        document.querySelector('#contact-form').reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message glass-card';
    successElement.textContent = message;
    
    const form = document.querySelector('#contact-form');
    form.parentNode.insertBefore(successElement, form);
    
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

// Enhanced hover effects
function initHoverEffects() {
    const cards = document.querySelectorAll('.glass-card, .feature-card, .problem-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
const debouncedScroll = debounce(() => {
    // Handle scroll events here if needed
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Touch device detection and optimization
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Disable hover effects on touch devices
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .glass-card:hover {
            transform: none !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadResources();

// Export functions for potential external use
window.InterviewProAI = {
    initScrollAnimations,
    initCustomCursor,
    initRippleEffects,
    showAIFeedback,
    debounce,
    throttle
};
