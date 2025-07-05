document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle aria-expanded for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close nav when a link is clicked (for mobile)
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // FAQ Accordion Toggle (if on FAQ page)
    const faqItems = document.querySelectorAll('.faq-item h3');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const parent = item.parentElement;
                const answer = item.nextElementSibling; // The <p> tag with class faq-answer

                // Check if this item is already active
                const isActive = parent.classList.contains('active');

                // Close all other open FAQs
                document.querySelectorAll('.faq-item.active').forEach(otherItem => {
                    if (otherItem !== parent) { // Don't close the clicked item if it was already active
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null; // Collapse
                            otherAnswer.style.opacity = 0;
                        }
                        const otherIcon = otherItem.querySelector('.toggle-icon');
                        if (otherIcon) {
                            otherIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                        }
                    }
                });

                // Toggle the clicked FAQ
                if (isActive) {
                    parent.classList.remove('active');
                    answer.style.maxHeight = null; // Collapse
                    answer.style.opacity = 0;
                    item.querySelector('.toggle-icon').classList.replace('fa-chevron-up', 'fa-chevron-down');
                } else {
                    parent.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px"; // Expand to content height
                    answer.style.opacity = 1;
                    item.querySelector('.toggle-icon').classList.replace('fa-chevron-down', 'fa-chevron-up');
                }
            });
        });
    }

    // Set active class for current page in navigation
    const currentPath = window.location.pathname.split('/').pop(); // Gets 'index.html', 'about.html', etc.
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure only current page is active
        }
    });
});