// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navigation between sections
    function navigateToSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        navMenu.classList.remove('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
        }
    });

    // Make navigateToSection globally available for button clicks
    window.navigateToSection = navigateToSection;
});

// Copy to clipboard functionality
function copyToClipboard(button) {
    const codeBlock = button.closest('.code-block');
    const codeElement = codeBlock.querySelector('code');
    
    if (!codeElement) return;
    
    const text = codeElement.textContent;
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyTextToClipboard(text, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text, button);
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

// Show copy error feedback
function showCopyError(button) {
    const originalText = button.textContent;
    button.textContent = 'Error';
    button.style.background = 'rgba(239, 68, 68, 0.8)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Smooth scrolling enhancement
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

// Add intersection observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .component-category, .command-card, .doc-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
    
    // Navigate with arrow keys when focus is on nav links
    if (e.target.classList.contains('nav-link')) {
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.indexOf(e.target);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navLinks.length;
            navLinks[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
            navLinks[prevIndex].focus();
        }
    }
});

// Add focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trap for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        trapFocus(navMenu);
    }
});

// Performance optimization: Debounce resize events
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

// Debounced resize handler
const debouncedResize = debounce(function() {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Add loading state management
document.addEventListener('DOMContentLoaded', function() {
    // Remove any loading classes once DOM is loaded
    document.body.classList.remove('loading');
    
    // Add loaded class for any CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Enhanced error handling for copy functionality
window.addEventListener('error', function(e) {
    console.warn('An error occurred:', e.error);
});

// Add support for reduced motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--duration-fast', '0ms');
    document.documentElement.style.setProperty('--duration-normal', '0ms');
}

// Listen for changes in motion preference
prefersReducedMotion.addEventListener('change', function() {
    if (this.matches) {
        document.documentElement.style.setProperty('--duration-fast', '0ms');
        document.documentElement.style.setProperty('--duration-normal', '0ms');
    } else {
        document.documentElement.style.setProperty('--duration-fast', '150ms');
        document.documentElement.style.setProperty('--duration-normal', '250ms');
    }
});

// Add custom event for section changes
function dispatchSectionChange(sectionId) {
    const event = new CustomEvent('sectionChange', {
        detail: { sectionId: sectionId }
    });
    document.dispatchEvent(event);
}

// Update navigateToSection to dispatch custom event
const originalNavigateToSection = window.navigateToSection;
window.navigateToSection = function(sectionId) {
    originalNavigateToSection(sectionId);
    dispatchSectionChange(sectionId);
};

// Example listener for section changes (can be used for analytics, etc.)
document.addEventListener('sectionChange', function(e) {
    console.log('Section changed to:', e.detail.sectionId);
});

// Add smooth reveal animation for code blocks
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    codeBlocks.forEach(block => {
        block.style.transform = 'translateY(20px)';
        block.style.opacity = '0';
        block.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        codeObserver.observe(block);
    });
});