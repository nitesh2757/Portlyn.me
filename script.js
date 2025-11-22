// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    
    // Navigation link click handler
    function handleNavigation(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        
        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        // Update active page
        pages.forEach(page => page.classList.remove('active'));
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // Close mobile menu
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL hash
        window.location.hash = targetPage;
    }
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Handle buttons with data-page attribute
    document.addEventListener('click', function(e) {
        const target = e.target.closest('[data-page]');
        if (target && !target.classList.contains('nav-link')) {
            e.preventDefault();
            const targetPage = target.getAttribute('data-page');
            
            // Update active link
            navLinks.forEach(link => {
                if (link.getAttribute('data-page') === targetPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Update active page
            pages.forEach(page => page.classList.remove('active'));
            const targetElement = document.getElementById(targetPage);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update URL hash
            window.location.hash = targetPage;
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Handle page load with hash
    function loadPageFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetLink = document.querySelector(`[data-page="${hash}"]`);
            if (targetLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                targetLink.classList.add('active');
                
                pages.forEach(page => page.classList.remove('active'));
                const targetPage = document.getElementById(hash);
                if (targetPage) {
                    targetPage.classList.add('active');
                }
            }
        }
    }
    
    // Load correct page on initial load
    loadPageFromHash();
    
    // Handle browser back/forward
    window.addEventListener('hashchange', loadPageFromHash);
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Show success toast
            showToast('Success!', 'Your message has been sent successfully.');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', formData);
        });
    }
    
    // Toast notification function
    function showToast(title, description) {
        const toast = document.getElementById('toast');
        const toastTitle = document.getElementById('toastTitle');
        const toastDescription = document.getElementById('toastDescription');
        
        toastTitle.textContent = title;
        toastDescription.textContent = description;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Animate progress bars when skills page is visible
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const skillsPage = document.getElementById('skills');
    if (skillsPage) {
        skillsObserver.observe(skillsPage);
    }
    
    // Animate elements on scroll
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        animateObserver.observe(el);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-content')) {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
