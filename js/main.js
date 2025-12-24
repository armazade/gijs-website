// Minimal aesthetic animations
document.addEventListener('DOMContentLoaded', function() {

    // Fade in page on load
    document.body.classList.add('loaded');

    // Image Modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = '<button class="image-modal-close" aria-label="Close"></button><img src="" alt="">';
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.image-modal-close');

    function openModal(src, alt) {
        modalImg.src = src;
        modalImg.alt = alt || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Click on gallery/project images to open modal
    document.querySelectorAll('.gallery-item img, .project-main-image img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(img.src, img.alt);
        });
    });

    // Close modal on overlay click, close button, or Escape key
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalClose) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .project-card, .gallery-item, .about-text, .about-image, .contact-info, .project-text, .project-specs, .cv-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Smooth magnetic effect on nav items
    const navItems = document.querySelectorAll('.nav-corner a');
    navItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            item.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0)';
        });
    });

    // Parallax effect on hero (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.transform = `translateY(${rate}px)`;
            hero.style.opacity = 1 - (scrolled * 0.002);
        });
    }

    // Image reveal on scroll
    const images = document.querySelectorAll('.project-image, .project-main-image, .gallery-item');
    images.forEach(img => {
        observer.observe(img);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
