// Hira Sons Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth fade-in animation on page load for hero section
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.transition = 'all 1s ease-out';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // // Enhanced hover effect for logo
    // const logo = document.querySelector('.logo-image');
    // if (logo) {
    //     logo.addEventListener('mouseenter', function() {
    //         this.style.transform = 'scale(1.05)';
    //         this.style.transition = 'transform 0.3s ease';
    //     });
        
    //     logo.addEventListener('mouseleave', function() {
    //         this.style.transform = 'scale(1)';
    //     });
    // }

    // Scroll arrow functionality
    const scrollArrow = document.getElementById('scrollArrow');
    const aboutScrollArrow = document.getElementById('aboutScrollArrow');
    const rjcScrollArrow = document.getElementById('rjcScrollArrow');
    const aboutSection = document.getElementById('aboutSection');
    const rjcSection = document.querySelector('.rjc-section');
    const footerSection = document.querySelector('.footer-section');
    
    // Scroll arrow click handler - Enhanced to ensure full section visibility
    if (scrollArrow && aboutSection) {
        scrollArrow.addEventListener('click', function() {
            // Calculate offset to ensure the entire section is visible
            const sectionTop = aboutSection.getBoundingClientRect().top + window.pageYOffset;
            const headerOffset = 0; // Small offset from top
            
            window.scrollTo({
                top: sectionTop - headerOffset,
                behavior: 'smooth'
            });
        });
    }

    // About section scroll arrow click handler
    if (aboutScrollArrow && rjcSection) {
        aboutScrollArrow.addEventListener('click', function() {
            // Calculate offset to ensure the RJC section aligns with the top
            const sectionTop = rjcSection.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        });
    }

    // RJC section scroll arrow click handler
    if (rjcScrollArrow && footerSection) {
        rjcScrollArrow.addEventListener('click', function() {
            // Calculate offset to ensure the footer section aligns with the top
            const sectionTop = footerSection.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        });
    }

    // Hide scroll arrows on scroll and show/hide sections based on scroll position
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        // Hide/show scroll arrows
        if (scrollTop > 100) {
            scrollArrow.classList.add('hidden');
        } else if (scrollTop < lastScrollTop && scrollTop < 50) {
            scrollArrow.classList.remove('hidden');
        }

        // Hide/show about section scroll arrow
        if (aboutScrollArrow) {
            const aboutRect = aboutSection.getBoundingClientRect();
            if (aboutRect.top < -100 || aboutRect.bottom < 0) {
                aboutScrollArrow.classList.add('hidden');
            } else {
                aboutScrollArrow.classList.remove('hidden');
            }
        }
        
        // Enhanced section visibility detection
        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            const aboutInView = aboutRect.top < windowHeight * 0.9 && aboutRect.bottom > windowHeight * 0.2;
            
            if (aboutInView) {
                aboutSection.classList.add('in-view');
            }
        }
        
        if (rjcSection) {
            const rjcRect = rjcSection.getBoundingClientRect();
            const rjcInView = rjcRect.top < windowHeight * 0.8 && rjcRect.bottom > windowHeight * 0.2;
            
            if (rjcInView) {
                rjcSection.classList.add('in-view');
            }
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for RJC section to ensure it fits properly
                if (entry.target.classList.contains('rjc-content')) {
                    // Add a small delay to ensure smooth transition
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe the about content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        observer.observe(aboutContent);
    }

    // Observe the RJC content with special handling
    const rjcContent = document.querySelector('.rjc-content');
    if (rjcContent) {
        observer.observe(rjcContent);
    }

    // Smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
                const headerOffset = 20;
                
                window.scrollTo({
                    top: targetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add subtle animation to content sections on scroll with better visibility handling
    const contentSections = document.querySelectorAll('.content-section, .rjc-value-item');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    contentSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s ease-out ${index * 0.1}s`; // Staggered animation
        sectionObserver.observe(section);
    });

    // Email link click tracking (optional analytics)
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('Email link clicked');
        });
    }

    // Enhanced section heading animation
    const sectionHeadings = document.querySelectorAll('.section-heading, .rjc-heading');
    sectionHeadings.forEach(heading => {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });

        heading.style.opacity = '0';
        heading.style.transform = 'translateY(30px)';
        heading.style.transition = 'all 1s ease-out';
        headingObserver.observe(heading);
    });

    // Special handling for RJC section scroll-to-fit functionality
    if (rjcSection) {
        // Create a more precise observer for the RJC section
        const rjcObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ensure the RJC section is properly positioned when it comes into view
                    const rect = entry.target.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // If the section is partially visible and user is scrolling down
                    if (rect.top < windowHeight * 0.5 && rect.top > 0) {
                        // Add a class to indicate the section is in focus
                        entry.target.classList.add('section-in-focus');
                    }
                }
            });
        }, {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '0px 0px -100px 0px'
        });

        rjcObserver.observe(rjcSection);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'S' to scroll to about section
        if (e.key === 's' || e.key === 'S') {
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Press 'R' to scroll to RJC section
        if (e.key === 'r' || e.key === 'R') {
            if (rjcSection) {
                rjcSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Enhanced mobile touch support
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiping up - move to next section
                const currentSection = getCurrentSection();
                 if (currentSection === 'hero' && aboutSection) {
                     aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (currentSection === 'about' && rjcSection) {
                    rjcSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (currentSection === 'rjc' && footerSection) {
                    footerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                // Swiping down - move to previous section
                const currentSection = getCurrentSection();
                if (currentSection === 'footer' && rjcSection) {
                    rjcSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (currentSection === 'rjc' && aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (currentSection === 'about') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    }
    
    // Define all sections for full-page scrolling
    const sections = [
        { id: 'hero', element: document.querySelector('.container') },
        { id: 'about', element: aboutSection },
        { id: 'rjc', element: rjcSection },
        { id: 'footer', element: footerSection }
    ];
    
    // Get current section based on scroll position
    function getCurrentSection() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const windowCenter = scrollTop + (windowHeight / 2);
        
        // Find which section contains the center of the viewport
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (!section.element) continue;
            
            const sectionTop = section.element.offsetTop;
            const sectionBottom = sectionTop + section.element.offsetHeight;
            
            if (windowCenter >= sectionTop && windowCenter <= sectionBottom) {
                return section.id;
            }
        }
        
        // Default to first section if none match
        return 'hero';
    }
    
    // Get next section based on current section and direction
    function getAdjacentSection(currentSectionId, direction) {
        const currentIndex = sections.findIndex(section => section.id === currentSectionId);
        if (currentIndex === -1) return null;
        
        const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex < 0 || targetIndex >= sections.length) return null;
        
        return sections[targetIndex];
    }
    
    // Full-page scrolling functionality
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollTime = 0;
    
    // Wheel event for desktop
    window.addEventListener('wheel', function(e) {
        e.preventDefault(); // Prevent default scrolling
        
        const now = Date.now();
        if (now - lastScrollTime < 50) return; // Throttle events
        lastScrollTime = now;
        
        if (isScrolling) return;
        
        const direction = e.deltaY > 0 ? 'next' : 'prev';
        scrollToAdjacentSection(direction);
    }, { passive: false });
    
    function scrollToAdjacentSection(direction) {
        if (isScrolling) return;
        
        const currentSectionId = getCurrentSection();
        const targetSection = getAdjacentSection(currentSectionId, direction);
        
        if (targetSection && targetSection.element) {
            isScrolling = true;
            
            // Scroll to the target section
            targetSection.element.scrollIntoView({ behavior: 'smooth', block: 'start'  });
            
            // Reset scrolling flag after animation completes
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1500); // Match this to your scroll animation duration
        }
    }
    
    // Resize handler to ensure proper section fitting on window resize
    window.addEventListener('resize', function() {
        // Debounce resize events
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            // Recalculate positions if needed
            const currentSection = getCurrentSection();
            console.log('Window resized, current section:', currentSection);
        }, 250);
    });

    // Initialize scroll position check
    setTimeout(() => {
        updateOnScroll();
    }, 1500);
});
