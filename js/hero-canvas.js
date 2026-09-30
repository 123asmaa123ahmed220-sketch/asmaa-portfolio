/**
 * Subtle Interactive Data Canvas for Asmaa Ahmed Portfolio
 * Concept: Latent Space / Data Cluster Graph
 * - Ultra lightweight, zero dependencies
 * - Low opacity & elegant (supports identity, doesn't distract)
 * - Strict prefers-reduced-motion support (static render if reduced motion)
 * - Pauses automatically when off-screen via IntersectionObserver
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Check prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isReducedMotion = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
    isReducedMotion = e.matches;
    if (isReducedMotion && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      renderStatic();
    } else if (!isReducedMotion) {
      lastTime = performance.now();
      loop();
    }
  });

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isVisible = true;
  let lastTime = performance.now();

  const mouse = {
    x: -9999,
    y: -9999,
    radius: 120,
    targetX: -9999,
    targetY: -9999
  };

  // Node configuration (subtle, restrained, data-inspired)
  const NODE_COUNT_DESKTOP = 45;
  const NODE_COUNT_MOBILE = 25;
  let nodes = [];
  const MAX_CONNECT_DISTANCE = 130;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
    initNodes();

    if (isReducedMotion) {
      renderStatic();
    }
  }

  function initNodes() {
    const count = width < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    nodes = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.25,
        isHighlight: Math.random() > 0.85
      });
    }
  }

  function update() {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce smoothly off boundaries
      if (node.x < 0) { node.x = 0; node.vx *= -1; }
      else if (node.x > width) { node.x = width; node.vx *= -1; }
      if (node.y < 0) { node.y = 0; node.vy *= -1; }
      else if (node.y > height) { node.y = height; node.vy *= -1; }

      // Gentle mouse interaction
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius && dist > 0) {
        const force = (1 - dist / mouse.radius) * 0.3;
        node.x -= (dx / dist) * force * 2;
        node.y -= (dy / dist) * force * 2;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle interconnections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_CONNECT_DISTANCE) {
          const alpha = (1 - dist / MAX_CONNECT_DISTANCE) * 0.16;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Draw mouse connection if nearby
      const dxMouse = mouse.x - nodes[i].x;
      const dyMouse = mouse.y - nodes[i].y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < mouse.radius) {
        const alpha = (1 - distMouse / mouse.radius) * 0.22;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      if (node.isHighlight) {
        ctx.fillStyle = `rgba(56, 189, 248, ${node.baseAlpha + 0.2})`;
      } else {
        ctx.fillStyle = `rgba(148, 163, 184, ${node.baseAlpha})`;
      }
      ctx.fill();
    }
  }

  function renderStatic() {
    ctx.clearRect(0, 0, width, height);
    draw();
  }

  function loop() {
    if (!isVisible || isReducedMotion) return;
    update();
    draw();
    animationFrameId = requestAnimationFrame(loop);
  }

  // Mouse event handlers
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = -9999;
      mouse.y = -9999;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Optimize when hero is scrolled out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !isReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        loop();
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.05 });

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    observer.observe(heroSection);
  }

  // Handle window resizing with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
    }, 150);
  });

  // Initialize
  resize();
  if (!isReducedMotion) {
    loop();
  }
})();
