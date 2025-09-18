(() => {
  const SECTION_SELECTOR = '[data-parallax]';
  const sections = Array.from(document.querySelectorAll(SECTION_SELECTOR));
  if (!sections.length || !('requestAnimationFrame' in window)) return;

  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallViewportQuery = window.matchMedia('(max-width: 375px)');

  const tracked = sections
    .map((el) => {
      const background = window.getComputedStyle(el).backgroundImage;
      if (!background || background === 'none') return null;
      const factor = parseFloat(el.dataset.parallaxFactor || '0.35');
      return {
        el,
        factor: Number.isFinite(factor) ? factor : 0.35,
      };
    })
    .filter(Boolean);

  if (!tracked.length) return;

  let active = false;
  let ticking = false;
  let lastY = -1;

  const subscribe = (query, handler) => {
    if (typeof query.addEventListener === 'function') query.addEventListener('change', handler);
    else if (typeof query.addListener === 'function') query.addListener(handler);
  };

  const unsubscribe = (query, handler) => {
    if (typeof query.removeEventListener === 'function') query.removeEventListener('change', handler);
    else if (typeof query.removeListener === 'function') query.removeListener(handler);
  };

  const shouldEnable = () => !reduceMotionQuery.matches && !smallViewportQuery.matches;

  const applyOffsets = (y) => {
    tracked.forEach(({ el, factor }) => {
      el.style.setProperty('--parallax-offset', `${Math.round(-y * factor)}px`);
    });
  };

  const update = () => {
    const y = window.scrollY || window.pageYOffset || 0;
    if (y === lastY) {
      ticking = false;
      return;
    }
    lastY = y;
    applyOffsets(y);
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  const handleScroll = () => {
    requestTick();
  };

  const handleChange = () => {
    if (shouldEnable()) {
      if (!active) enable();
      requestTick();
    } else {
      disable();
    }
  };

  const enable = () => {
    if (active) return;
    active = true;
    lastY = -1;
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleChange, { passive: true });
    requestTick();
  };

  const disable = () => {
    if (!active) return;
    active = false;
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleChange);
    tracked.forEach(({ el }) => {
      el.style.removeProperty('--parallax-offset');
    });
    ticking = false;
    lastY = -1;
  };

  subscribe(reduceMotionQuery, handleChange);
  subscribe(smallViewportQuery, handleChange);

  if (shouldEnable()) enable();

  window.addEventListener('pageshow', () => {
    // Re-enable after bfcache restores or forward/back navigation.
    handleChange();
  });

  window.addEventListener('beforeunload', () => {
    disable();
    unsubscribe(reduceMotionQuery, handleChange);
    unsubscribe(smallViewportQuery, handleChange);
  });
})();
