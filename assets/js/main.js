/**
 * W4 WAFFLE - Modern Artisan Dessert Portfolio
 * Interactive Architecture & TheDivine Filter Rail Standard
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Mobile Menu Drawer
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      const icon = menuToggle.querySelector('svg');
      if (icon) {
        icon.innerHTML = isOpen
          ? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
          : '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
      }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 2. Hero Video Controls
  // ==========================================
  const heroVideo = document.querySelector('.hero-video');
  const videoToggleBtn = document.querySelector('.video-toggle-btn');

  if (heroVideo && videoToggleBtn) {
    videoToggleBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        videoToggleBtn.setAttribute('aria-label', 'Pause Hero Video');
      } else {
        heroVideo.pause();
        videoToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        videoToggleBtn.setAttribute('aria-label', 'Play Hero Video');
      }
    });
  }

  // ==========================================
  // 3. TheDivine-Style Floating Tab Filter Rail
  // ==========================================
  const filterBtns = document.querySelectorAll('.portfolio-filter .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Smooth scroll button into center of horizontal rail (Mandatory Standard)
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ==========================================
  // 4. Staggered Scroll Reveals (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================
  // 5. WhatsApp Interactive Inquiry Form Handoff
  // ==========================================
  const inquiryForms = document.querySelectorAll('.inquiry-form');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value.trim() || 'Patron';
      const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
      const creation = form.querySelector('[name="creation"]')?.value.trim() || 'Signature Waffle';
      const timing = form.querySelector('[name="timing"]')?.value.trim() || 'Today';
      const notes = form.querySelector('[name="notes"]')?.value.trim() || 'Looking forward to fresh waffles!';

      const message = `Hello W4 WAFFLE! 🧇\n\nI would like to place an enquiry via your website:\n• Name: ${name}\n• Contact: ${phone}\n• Selected Creation / Order: ${creation}\n• Preferred Date & Time: ${timing}\n• Special Requests / Notes: ${notes}\n\nCould you please confirm availability at the Astra Tower kiosk? Thank you!`;

      const encoded = encodeURIComponent(message);
      const waUrl = `https://wa.me/919477757990?text=${encoded}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  });
});
