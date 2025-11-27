// Modal Functionality
const modal = document.getElementById('contactModal');
const ctaButtons = document.querySelectorAll('.cta-button, .primary-button, .cta-main-button, .service-button');
const closeBtn = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');

// Function to open contact modal
function openContactModal() {
    modal.style.display = 'block';
}

// Open Modal
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Começar') || 
            button.textContent.includes('Agendar') ||
            button.textContent.includes('Iniciar') ||
            button.textContent.includes('Saiba Mais')) {
            modal.style.display = 'block';
        }
    });
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const company = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && company && message) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Enviando...';
        submitBtn.disabled = true;
        
        // Prepare WhatsApp message
        const whatsappMessage = `*Novo Contato - ReImagineSites*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Empresa:* ${encodeURIComponent(company)}%0A%0A*Mensagem:*%0A${encodeURIComponent(message)}`;
        
        // WhatsApp API URL
        const whatsappPhone = '258878092230'; // Seu número com código do país
        const whatsappURL = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;
        
        // Log form data
        const formData = {
            name,
            email,
            company,
            message,
            timestamp: new Date().toISOString()
        };
        console.log('Dados do formulário:', formData);
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappURL, '_blank');
        
        // Show success message
        submitBtn.textContent = '✓ Redirecionando para WhatsApp...';
        submitBtn.style.background = '#25d366';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            modal.style.display = 'none';
        }, 2000);
    }
});

// Smooth scroll for navigation links
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

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .about-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// Counter animation for stats (optional feature)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        
        // Only add ripple if button has position set
        if (this.style.position === '' || this.style.position === 'static') {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transition = 'all 0.6s ease';
            ripple.style.width = '400px';
            ripple.style.height = '400px';
            ripple.style.opacity = '0';
        }, 0);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Preload images for portfolio
function preloadImages() {
    document.querySelectorAll('.portfolio-image').forEach(img => {
        // Obtain computed background image (works for inline style or stylesheet)
        const bg = img.style.backgroundImage || window.getComputedStyle(img).backgroundImage;

        if (!bg || bg === 'none') return;

        // Ignore gradients or non-url backgrounds
        if (bg.startsWith('linear-gradient') || bg.includes('gradient(')) return;

        // Extract URL from value like: url("images/clinica.png")
        const match = bg.match(/url\((['"]?)(.*?)\1\)/);
        if (match && match[2]) {
            const url = match[2];
            const tempImg = new Image();
            tempImg.src = url;
        }
    });
}

// Call preload when page loads
window.addEventListener('load', preloadImages);

// Add keyboard support for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// Analytics tracking (placeholder - replace with actual service)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send to analytics service like Google Analytics
}

// Track button clicks
document.querySelectorAll('.primary-button, .cta-button, .service-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            buttonText: button.textContent,
            timestamp: new Date().toISOString()
        });
    });
});

// Lazy load sections as they come into view
const sections_to_observe = document.querySelectorAll('.about, .services, .portfolio, .cta-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections_to_observe.forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.8s ease';
    sectionObserver.observe(section);
});
