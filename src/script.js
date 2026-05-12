document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 2. Counters Animation
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const count = parseInt(el.innerText);
        const increment = target / 50;

        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(el), 30);
        } else {
            el.innerText = target + (el.innerText.includes('+') ? '+' : '');
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuBtn?.addEventListener('click', toggleMenu);
    closeMenuBtn?.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 5. Testimonial Auto-Slider Logic (Simple CSS-based transition handling)
    const testimonialTrack = document.querySelector('.testimonial-track');
    if (testimonialTrack) {
        let index = 0;
        const slides = testimonialTrack.children;
        const totalSlides = slides.length;

        setInterval(() => {
            index = (index + 1) % (totalSlides - 1); // Adjust based on visible count
            const offset = (index * (testimonialTrack.offsetWidth / 2)) * -1; // Basic offset logic
            // In modern browsers, we can just use CSS scroll-snap, 
            // but for custom sliding we can translate
            // testimonialTrack.style.transform = `translateX(${offset}px)`;
        }, 5000);
    }

    // 6. Sticky Header Shadow
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
        } else {
            header.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
        }
    });

    // 7. Form Submission Placeholder
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Thank you! Your message has been sent. We will contact you shortly.');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
});
