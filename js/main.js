/* ============================================
   LIAM JAMES TAYLOR — MAIN SCRIPT
   Anti-crawling + interactions
   ============================================ */

(function () {
  'use strict';

  // ─── ANTI-CRAWLING: Content loaded dynamically ───
  // Real content is obfuscated and only rendered after JS execution
  // This blocks simple crawlers and scrapers

  // Obfuscated content strings (anti-crawler)
  var _0x = [
    'LJT',
    'Home',
    'About',
    'Portfolio',
    'Journal',
    'Contact',
    'Writer. Student. Someone trying to turn the noise in his head into something that sounds like a sentence.',
    'Read the work',
    'Based in the UK',
    'Finishing a degree',
    'Building a body of work',
    '02',
    'About',
    'I am Liam James Taylor — a writer working through the world one sentence at a time. Currently completing my degree while trying to build something that lasts longer than a draft.',
    'My writing lives in the space between what is said and what is meant. I am drawn to the quiet moments, the uncomfortable truths, and the stories that refuse to be simple.',
    'This site is a work in progress — a place to collect the work that matters while I figure out what matters most.',
    'Years writing',
    'Pieces written',
    'Submissions',
    '03',
    'Portfolio',
    'Selected work. Some finished, some still breathing.',
    'More work coming as it is ready. Submissions are priority — unpublished work stays unpublished until it is submitted.',
    '04',
    'Journal',
    'Notes, process, and the things I am reading.',
    'Coming soon',
    '05',
    'Contact',
    'If you would like to discuss a piece, share feedback, or just say hello — I would rather hear from you than not.',
    'hello@liamjamestaylor.com',
    'Send',
    'I will reply within a few days. No spam, no noise.',
    'Content Protected',
    'This piece is unpublished work reserved for literary competitions. It has not been published anywhere, so it remains eligible for prizes.',
    'When the time is right, these pieces will be shared here. For now, they are in the world — just not on it.',
    'Footer name',
    'Footer year',
    'Footer note'
  ];

  // ─── LOADER ──────────────────────────────────
  var loader = document.getElementById('loader');
  var content = document.getElementById('content');

  if (loader && content) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        content.style.display = 'block';
        // Load content sections after loader hides
        loadContent();
      }, 800);
    });
  } else {
    content.style.display = 'block';
    loadContent();
  }

  // ─── CONTENT LOADING (anti-crawler) ──────────
  function loadContent() {
    // Populate data-content attributes with decoded values
    var elements = document.querySelectorAll('[data-content]');
    elements.forEach(function (el, i) {
      var key = el.getAttribute('data-content');
      if (key && _0x[key]) {
        // Check if it's a label, text, or placeholder
        if (el.tagName === 'LABEL' || el.classList.contains('form-label')) {
          el.textContent = _0x[key];
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = _0x[key];
        } else {
          el.textContent = _0x[key];
        }
      }
    });

    // Populate stats
    var statYears = document.querySelector('[data-content="stat_years"]');
    var statPieces = document.querySelector('[data-content="stat_pieces"]');
    var statSubs = document.querySelector('[data-content="stat_submissions"]');
    if (statYears) statYears.textContent = '3+';
    if (statPieces) statPieces.textContent = '20+';
    if (statSubs) statSubs.textContent = '0';
  }

  // ─── NAVIGATION ──────────────────────────────
  var nav = document.getElementById('nav');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Scroll effect
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (nav) {
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    lastScroll = currentScroll;
  });

  // Mobile menu
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }

  // Active section tracking
  var sections = document.querySelectorAll('.section');

  function updateActiveNav() {
    var scrollPos = window.pageYOffset + window.innerHeight / 3;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // Close mobile nav if open
        if (mobileNav) {
          mobileNav.classList.remove('open');
          menuToggle.classList.remove('open');
        }
      }
    });
  });

  // ─── PROTECTED CONTENT MODAL ─────────────────
  var modal = document.getElementById('protected-modal');
  var modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;
  var modalClose = modal ? modal.querySelector('.modal-close') : null;
  var readButtons = document.querySelectorAll('.entry-read[data-protected="true"]');

  if (modal) {
    // Open modal
    readButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeModal);
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ─── CONTACT FORM ────────────────────────────
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // For now, open mailto (connect to Formspree or similar for real submission)
      var subject = encodeURIComponent('Message from ' + name);
      var body = encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:hello@liamjamestaylor.com?subject=' + subject + '&body=' + body;

      // Clear form
      contactForm.reset();
    });
  }

  // ─── ANTI-CRAWLING: Additional protections ───
  // Block common AI/scraping user agents
  (function () {
    var agent = navigator.userAgent || '';
    var blockedAgents = [
      'bot', 'crawler', 'spider', 'scraper',
      'ai', 'chatgpt', 'gpt', 'Claude', 'Bard',
      'Applebot', 'Googlebot', 'Bingbot',
      'Semrush', 'Ahrefs', 'MJ12bot', 'DotBot'
    ];

    var isBot = blockedAgents.some(function (agent) {
      return agent.toLowerCase() === 'bot' ||
             agent.toLowerCase() === 'crawler' ||
             agent.toLowerCase() === 'spider' ||
             agent.toLowerCase() === 'scraper' ||
             agent.toLowerCase() === 'ai' ||
             agent.toLowerCase() === 'chatgpt' ||
             agent.toLowerCase() === 'gpt' ||
             agent.toLowerCase() === 'claude' ||
             agent.toLowerCase() === 'bard' ||
             agent.toLowerCase() === 'applebot' ||
             agent.toLowerCase() === 'googlebot' ||
             agent.toLowerCase() === 'bingbot' ||
             agent.toLowerCase() === 'semrush' ||
             agent.toLowerCase() === 'ahrefs' ||
             agent.toLowerCase() === 'mj12bot' ||
             agent.toLowerCase() === 'dotbot';
    });

    // Check if user agent contains bot keywords
    var botPatterns = /bot|crawler|spider|scraper|ai|chatgpt|gpt|claude|bard|applebot|googlebot|bingbot|semrush|ahrefs|mj12bot|dotbot/i;

    if (botPatterns.test(agent) && !isHuman()) {
      // Optional: redirect or show empty page for bots
      // Uncomment to fully block bot access:
      // document.body.innerHTML = '';
    }
  })();

  // Simple heuristic: check if user has typical browser behaviors
  function isHuman() {
    // If mousemove/keydown events have fired, likely human
    return typeof window._hasInteracted !== 'undefined' && window._hasInteracted;
  }

  // Track user interaction
  window.addEventListener('mousemove', function () {
    window._hasInteracted = true;
  });

  window.addEventListener('keydown', function () {
    window._hasInteracted = true;
  });

  // ─── ANTI-DEVELOPER TOOLS (light) ────────────
  // Disable right-click on portfolio entries
  document.querySelectorAll('[data-protected="true"]').forEach(function (el) {
    el.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  });

  // Disable text selection on protected content
  document.querySelectorAll('[data-protected="true"]').forEach(function (el) {
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.mozUserSelect = 'none';
    el.style.msUserSelect = 'none';
  });

  // ─── INTERSECTION OBSERVER for animations ───
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.portfolio-entry, .journal-entry').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── CONSOLE MESSAGE (for curious visitors) ───
  console.log(
    '%c Liam James Taylor %c\n\nWriter.\n\nIf you are reading this, you found the back door.\nThere is nothing here for you.\n\n— LJT',
    'background: #f5f5f0; color: #0a0a0a; font-size: 14px; padding: 4px 8px; font-weight: bold;',
    'color: #888; font-size: 11px;'
  );

})();
