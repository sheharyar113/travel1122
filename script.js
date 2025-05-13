document.addEventListener('DOMContentLoaded', function () {
    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Apply specific animation based on data attribute if needed
                    // const animationName = entry.target.dataset.animationName || 'fadeInUp';
                    // entry.target.style.animationName = animationName;
                    
                    // Set delay if specified
                    const delay = entry.target.dataset.animationDelay;
                    if (delay) {
                        entry.target.style.transitionDelay = delay;
                    }
                    
                    // obs.unobserve(entry.target); // Optional: unobserve after animation
                }
            });
        }, {
            threshold: 0.15 // Trigger when 15% of the element is visible
        });

        animatedElements.forEach(el => {
            // Set initial state for transform-based animations
            if (!el.classList.contains('is-visible')) { // Avoid resetting if already visible
                 el.style.transform = 'translateY(30px)';
            }
            observer.observe(el);
        });
    }

    // --- Navbar Active Link on Scroll & Smooth Scroll ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 70;

    function changeActiveLink() {
        let index = sections.length;
        const offset = navbarHeight + 20; // 20px buffer

        while(--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {} 
        
        navLinks.forEach((link) => link.classList.remove('active'));
        
        if (index >= 0 && sections[index] && document.querySelector(`.navbar-nav .nav-link[href="#${sections[index].id}"]`)) {
            document.querySelector(`.navbar-nav .nav-link[href="#${sections[index].id}"]`).classList.add('active');
        } else if (index < 0 && sections.length > 0 && window.scrollY < sections[0].offsetTop - offset) { // Adjusted for top
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    if (sections.length > 0) {
        changeActiveLink(); 
        window.addEventListener('scroll', changeActiveLink);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                // Smooth scroll is handled by CSS `scroll-behavior: smooth;`
                // and `scroll-padding-top` on html element.
                
                // Close mobile navbar if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // --- Set Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Navbar style change on scroll ---
    // const navbar = document.querySelector('.navbar');
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) {
    //         navbar.classList.add('scrolled');
    //     } else {
    //         navbar.classList.remove('scrolled');
    //     }
    // });

});