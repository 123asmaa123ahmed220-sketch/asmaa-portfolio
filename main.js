/**
 * Main Application Script - Asmaa Ahmed Salah Portfolio
 * Handles navigation, mobile menu, case-study modal, scroll-reveal, copy helpers, and toast notifications.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Real Project Case Study Data (Strictly from Asmaa's Real CV)
  // --------------------------------------------------------------------------
  const projectCaseStudies = {
    'amazon-sales': {
      title: 'Amazon Sales Data Analysis',
      category: 'Sales Analytics & Business Intelligence',
      tools: ['Excel'],
      overview: 'Analyzed Amazon sales data to uncover trends in revenue, product performance, and customer behavior. Built interactive summaries to present key insights and recommendations.',
      objective: 'Clean raw transaction records, summarize sales dynamics across product categories, regions, and time periods, and communicate findings via Excel dashboards.',
      approach: [
        'Analyzed Amazon sales data to uncover trends in revenue, product performance, and customer behavior.',
        'Built Pivot Tables and Pivot Charts to summarize sales by category, region, and time period.',
        'Cleaned and organized raw data to ensure accuracy before analysis.',
        'Presented key insights and recommendations through Excel dashboards.'
      ],
      visualPlaceholder: 'Real Excel Dashboard / Pivot Charts Screenshot',
      githubUrl: 'https://github.com/123asmaa123ahmed220-sketch'
    },
    'hotel-booking': {
      title: 'Hotel Booking Analysis',
      category: 'Data Analytics & Interactive Dashboards',
      tools: ['Power BI', 'Python', 'Pandas', 'Matplotlib'],
      overview: 'Explored hotel booking data to identify patterns in cancellations, booking lead time, and occupancy rates, delivering an interactive Power BI dashboard.',
      objective: 'Identify operational reservation patterns, calculate hospitality metrics with DAX measures, and provide actionable visual insights for data-driven decisions.',
      approach: [
        'Explored hotel booking data to identify patterns in cancellations, booking lead time, and occupancy rates.',
        'Designed an interactive Power BI dashboard to visualize booking trends and key performance metrics.',
        'Used DAX measures to calculate KPIs such as cancellation rate and average length of stay.',
        'Delivered actionable insights to support data-driven decision making.'
      ],
      visualPlaceholder: 'Real Power BI Dashboard / Python Visuals Screenshot',
      githubUrl: 'https://github.com/123asmaa123ahmed220-sketch'
    },
    'course-database': {
      title: 'Online Course Platform Database Project',
      category: 'Database Architecture & SQL Modeling',
      tools: ['SQL', 'Database'],
      overview: 'Designed and implemented a relational database for an online course platform managing courses, student enrollments, and instructors.',
      objective: 'Design a normalized relational schema to eliminate data redundancy, ensure relational integrity, and perform efficient data retrieval operations with SQL queries.',
      approach: [
        'Designed and implemented a database for an online course platform.',
        'Created tables to manage courses, students, enrollments, and instructors.',
        'Applied database normalization to improve efficiency and reduce redundancy.',
        'Performed SQL queries for data retrieval and management operations.'
      ],
      visualPlaceholder: 'Real SQL Schema / Query Interface Screenshot',
      githubUrl: 'https://github.com/123asmaa123ahmed220-sketch'
    }
  };

  // --------------------------------------------------------------------------
  // Header Scroll Elevation
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.innerHTML = isOpen 
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // --------------------------------------------------------------------------
  // Active Navigation Scrollspy
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 130;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-init');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // --------------------------------------------------------------------------
  // Toast Notification System
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast-notice');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // Project Case Study Modal
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalOverview = document.getElementById('modal-overview');
  const modalObjective = document.getElementById('modal-objective');
  const modalToolsList = document.getElementById('modal-tools-list');
  const modalApproachList = document.getElementById('modal-approach-list');
  const modalVisualPlaceholder = document.getElementById('modal-visual-placeholder');
  const modalGithubLink = document.getElementById('modal-github-link');
  let previouslyFocusedElement = null;

  function openProjectModal(projectId) {
    const project = projectCaseStudies[projectId];
    if (!project || !modalOverlay) return;

    previouslyFocusedElement = document.activeElement;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalOverview.textContent = project.overview;
    modalObjective.textContent = project.objective;

    // Tools
    modalToolsList.innerHTML = '';
    project.tools.forEach((tool) => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tool;
      modalToolsList.appendChild(badge);
    });

    // Approach bullet list
    modalApproachList.innerHTML = '';
    project.approach.forEach((step) => {
      const li = document.createElement('li');
      li.textContent = step;
      modalApproachList.appendChild(li);
    });

    // Visual placeholder text
    if (modalVisualPlaceholder) {
      modalVisualPlaceholder.textContent = project.visualPlaceholder;
    }

    // GitHub link
    if (modalGithubLink) {
      modalGithubLink.href = project.githubUrl;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Keyboard Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // Copy Email Helper
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = '123asma123aahmed123@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard: ' + email);
        }).catch(() => {
          showToast('Email: ' + email);
        });
      } else {
        showToast('Email: ' + email);
      }
    });
  });

  // --------------------------------------------------------------------------
  // Contact Form Handler
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been prepared for transmission.');
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // Current Year in Footer
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
