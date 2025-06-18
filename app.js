// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initReadingProgress();
    initBackToTop();
    initCollapsibleSections();
    initCopyButton();
    initLoadingAnimations();
});

// Reading progress bar
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    
    window.addEventListener('scroll', function() {
        // Calculate how far down the page the user has scrolled
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Calculate the percentage scrolled
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Update the progress bar width
        progressBar.style.width = scrollPercent + '%';
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Collapsible sections
function initCollapsibleSections() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        const toggleBtn = header.querySelector('.toggle-btn');
        const content = header.nextElementSibling;
        
        header.addEventListener('click', function() {
            // Toggle the active class on the content
            content.classList.toggle('active');
            
            // Toggle the button text and class
            if (content.classList.contains('active')) {
                toggleBtn.textContent = 'Collapse';
                toggleBtn.classList.add('active');
            } else {
                toggleBtn.textContent = 'Expand';
                toggleBtn.classList.remove('active');
            }
        });
    });
}

// Copy button for JSON code
function initCopyButton() {
    const copyButton = document.getElementById('copyJsonBtn');
    const jsonCode = document.getElementById('jsonConfig');
    
    if (copyButton && jsonCode) {
        copyButton.addEventListener('click', function() {
            // Create a temporary textarea element to copy from
            const textarea = document.createElement('textarea');
            textarea.value = jsonCode.textContent;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            
            // Select and copy the text
            textarea.select();
            document.execCommand('copy');
            
            // Remove the temporary element
            document.body.removeChild(textarea);
            
            // Update button text temporarily
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            
            // Reset button text after a delay
            setTimeout(function() {
                copyButton.textContent = originalText;
            }, 2000);
        });
    }
}

// Loading bar animations
function initLoadingAnimations() {
    // Select all loading bars
    const loadingBars = document.querySelectorAll('.loading-bar');
    
    // The animation is handled by CSS, but we can add additional
    // functionality here if needed in the future
    
    // For demonstration, we could restart the animation occasionally
    setInterval(() => {
        loadingBars.forEach(bar => {
            // Remove and re-add the animation class to restart it
            bar.style.animation = 'none';
            setTimeout(() => {
                bar.style.animation = 'loadingProgress 3s ease-in-out infinite';
            }, 10);
        });
    }, 6000); // Restart every 6 seconds
}

// Navigation smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset to account for sticky header
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const noticeHeight = document.querySelector('.test-notice').offsetHeight;
            const totalOffset = headerHeight + noticeHeight;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});