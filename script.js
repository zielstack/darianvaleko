/**
 * Darian Vale Koh — Personal Professional Website
 * Client Interactions: Hero Video Autoplay, Mobile Navigation, ScrollSpy, and Header Behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  const hamburgerToggle = document.getElementById('hamburgerToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const heroVideo = document.getElementById('heroVideo');

  // Video Autoplay & Refresh Handling
  if (heroVideo) {
    heroVideo.muted = true;
    const attemptPlay = () => {
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser restrictions require explicit interaction
          heroVideo.muted = true;
          const resumeOnInteraction = () => {
            heroVideo.play();
            document.removeEventListener('click', resumeOnInteraction);
            document.removeEventListener('touchstart', resumeOnInteraction);
          };
          document.addEventListener('click', resumeOnInteraction);
          document.addEventListener('touchstart', resumeOnInteraction);
        });
      }
    };
    attemptPlay();
  }

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    const isOpen = hamburgerToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('open', isOpen);
    hamburgerToggle.setAttribute('aria-expanded', isOpen);
    mobileNavOverlay.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburgerToggle.classList.remove('active');
    mobileNavOverlay.classList.remove('open');
    hamburgerToggle.setAttribute('aria-expanded', 'false');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerToggle) {
    hamburgerToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Header Scroll Effect & Active Section Highlighting (ScrollSpy)
  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header subtle elevation
    if (scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
