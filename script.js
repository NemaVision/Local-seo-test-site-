// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Form Validation and Handling
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(leadForm);
            const website = formData.get('website');
            const businessType = formData.get('business_type');
            const businessName = formData.get('business_name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            
            // Basic validation
            if (!website || !businessType || !businessName || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate URL format
            if (!isValidUrl(website)) {
                alert('Please enter a valid website URL (e.g., https://yourbusiness.com)');
                document.getElementById('website').focus();
                return;
            }
            
            // Validate email format
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                document.getElementById('email').focus();
                return;
            }
            
            // Show loading state
            const submitButton = leadForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Store website name for thank you page
                localStorage.setItem('auditWebsite', website);
                localStorage.setItem('auditBusinessName', businessName);
                
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            }, 1000);
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Thank you page personalization
    if (window.location.pathname.includes('thank-you')) {
        const websiteName = localStorage.getItem('auditWebsite');
        const businessName = localStorage.getItem('auditBusinessName');
        
        if (websiteName) {
            const websiteNameElement = document.getElementById('websiteName');
            if (websiteNameElement) {
                websiteNameElement.textContent = websiteName;
            }
        }
        
        // Clear stored data after use
        localStorage.removeItem('auditWebsite');
        localStorage.removeItem('auditBusinessName');
    }
    
    // Add form focus effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add URL formatting help
    const websiteInput = document.getElementById('website');
    if (websiteInput) {
        websiteInput.addEventListener('blur', function() {
            let url = this.value.trim();
            if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                this.value = 'https://' + url;
            }
        });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    }
});

// Utility Functions
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Analytics tracking (placeholder - replace with actual tracking)
function trackFormSubmission(formData) {
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'Lead Generation',
            'event_label': 'Website Audit Request',
            'business_type': formData.get('business_type')
        });
    }
    
    // Example: Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: 'Website Audit',
            business_type: formData.get('business_type')
        });
    }
}

// Scroll animations (optional enhancement)
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.benefit, .discovery-item, .success-case').forEach(el => {
        observer.observe(el);
    });
}