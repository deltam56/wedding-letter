/* =========================================================
   Wedding Invitation — script.js
   한태현 ♥ 옥정미 (2026.11.07)
   Vanilla JS only. Implements motion-spec.md Must/Should items.
   ========================================================= */

(function () {
  'use strict';

  // ============== Globals ==============
  const reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isReduced = () => reducedMotionMQ.matches;

  const TARGET_DATE = new Date('2026-11-07T12:30:00+09:00');
  const PALETTE = {
    coral: '#E54C2E',
    green: '#3F8F4A',
    mustard: '#F5C84C',
    amber: '#E89A4D',
  };

  // ============== A. Background Particle Canvas ==============
  function initParticles() {
    if (isReduced()) return; // 정적 SVG fallback이 CSS에서 처리됨

    const canvas = document.querySelector('.bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, particles = [], rafId = null, running = true;
    const COUNT = window.innerWidth < 480 ? 16 : 20;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // 3종 파티클 비율: 하트 30% / 잎사귀 35% / 꽃잎 35%
    function pickType() {
      const r = Math.random();
      if (r < 0.30) return 'heart';
      if (r < 0.65) return 'leaf';
      return 'petal';
    }
    function pickColorFor(type) {
      if (type === 'heart') return PALETTE.coral;
      if (type === 'leaf') return PALETTE.green;
      return Math.random() < 0.5 ? PALETTE.mustard : PALETTE.amber;
    }

    class Particle {
      constructor(initStagger) { this.reset(initStagger); }
      reset(initStagger) {
        this.type = pickType();
        this.color = pickColorFor(this.type);
        this.size = 10 + Math.random() * 12; // 10-22
        this.x = Math.random() * W;
        // 아래에서 위로 떠오름
        this.y = initStagger ? Math.random() * H : H + 30;
        this.duration = (14 + Math.random() * 8) * 1000; // 14-22s
        this.start = performance.now() - (initStagger ? Math.random() * this.duration : 0);
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04; // ~ -1.2 ~ 1.2 deg/frame
        this.swayAmp = 25 + Math.random() * 25; // 25-50
        this.swayPeriod = (3.5 + Math.random() * 2.5) * 1000; // 3.5-6s
        this.swayPhase = Math.random() * Math.PI * 2;
        this.opacity = 0.35 + Math.random() * 0.35; // 0.35-0.70
        this.baseX = this.x;
      }
      step(now) {
        const elapsed = now - this.start;
        const t = elapsed / this.duration;
        if (t >= 1) { this.reset(false); return; }
        // 위로 떠오름: 시작 y(=H+30 또는 stagger) → -30
        this.y = (H + 30) - (H + 60) * t;
        // 수평 sway
        this.x = this.baseX + Math.sin((now / this.swayPeriod) * Math.PI * 2 + this.swayPhase) * this.swayAmp;
        this.rot += this.rotSpeed;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.fillStyle = this.color;
        if (this.type === 'heart') {
          this.drawHeart();
        } else if (this.type === 'leaf') {
          this.drawLeaf();
        } else {
          this.drawPetal();
        }
        ctx.restore();
      }
      drawHeart() {
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.4, -s * 1.1, s * 0.4, 0, s);
        ctx.bezierCurveTo(s * 1.1, s * 0.4, s, -s * 0.4, 0, s * 0.3);
        ctx.fill();
      }
      drawLeaf() {
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.35, this.size * 0.75, 0, 0, Math.PI * 2);
        ctx.fill();
        // 잎맥
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.6);
        ctx.lineTo(0, this.size * 0.6);
        ctx.stroke();
      }
      drawPetal() {
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.45, this.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop(now) {
      if (running) {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) {
          p.step(now);
          p.draw();
        }
      }
      rafId = requestAnimationFrame(loop);
    }

    resize();
    particles = Array.from({ length: COUNT }, () => new Particle(true));

    // viewport 밖이거나 탭 백그라운드일 때 일시정지
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
    });

    // debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }, { passive: true });

    rafId = requestAnimationFrame(loop);
  }

  // ============== B. Section Fade-up (IntersectionObserver) ==============
  function initFadeUp() {
    const els = document.querySelectorAll('.fade');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
  }

  // ============== C. Calendar Render ==============
  function initCalendar() {
    const tbl = document.querySelector('.cal');
    if (!tbl) return;
    const target = new Date(tbl.dataset.target + 'T00:00:00');
    const y = target.getFullYear();
    const m = target.getMonth();
    const targetDay = target.getDate();
    const first = new Date(y, m, 1).getDay();
    const lastDate = new Date(y, m + 1, 0).getDate();
    const tbody = tbl.querySelector('tbody');

    let html = '<tr>';
    for (let i = 0; i < first; i++) html += '<td></td>';
    let col = first;
    for (let d = 1; d <= lastDate; d++) {
      let cls = '';
      if (col === 0) cls = 'sunday';
      if (col === 6) cls = 'saturday';
      if (d === targetDay) cls = (cls ? cls + ' ' : '') + 'today';
      html += `<td${cls ? ' class="' + cls + '"' : ''}>${d}</td>`;
      col++;
      if (col === 7 && d !== lastDate) {
        html += '</tr><tr>';
        col = 0;
      }
    }
    while (col < 7 && col !== 0) {
      html += '<td></td>';
      col++;
    }
    html += '</tr>';
    tbody.innerHTML = html;
  }

  // ============== D. D-Day Countdown ==============
  function getRemaining(target, now) {
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) {
      return { totalDays: Math.ceil(-diff / 86400000), past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const totalDays = Math.ceil(diff / 86400000);
    return { totalDays, past: false, days, hours, minutes, seconds };
  }

  function countUp(el, target, duration) {
    if (isReduced() || duration === 0) {
      el.textContent = target;
      return;
    }
    const start = performance.now();
    const startVal = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initDDay() {
    const wrap = document.querySelector('.dday-wrap');
    if (!wrap) return;
    const ddayNumEl = document.getElementById('dday-num');
    const ddaySuffix = document.getElementById('dday-suffix');
    const valEls = wrap.querySelectorAll('.dday-val');

    function update(initial) {
      const rem = getRemaining(TARGET_DATE, new Date());
      if (rem.past) {
        if (rem.totalDays === 0) {
          if (ddayNumEl) ddayNumEl.textContent = 'Day';
          if (ddaySuffix) ddaySuffix.textContent = '오늘이 저희 결혼식이에요!';
        } else {
          if (ddayNumEl) ddayNumEl.textContent = '+' + rem.totalDays;
          if (ddaySuffix) ddaySuffix.textContent = '함께해 주셔서 감사했습니다.';
        }
        valEls.forEach((el) => { el.textContent = 0; });
        return;
      }
      // 진입 시 카운트업, 이후는 즉시 갱신
      if (initial) {
        countUp(ddayNumEl, rem.totalDays, 1000);
        valEls.forEach((el) => {
          const unit = el.dataset.unit;
          const val = rem[unit];
          countUp(el, val, 1000);
        });
      } else {
        if (ddayNumEl) ddayNumEl.textContent = rem.totalDays;
        valEls.forEach((el) => { el.textContent = rem[el.dataset.unit]; });
      }
      if (ddaySuffix) ddaySuffix.textContent = '남았어요';
    }

    // 섹션 진입 시 1회 카운트업
    let triggered = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        update(true);
        // 초마다 갱신
        setInterval(() => update(false), 1000);
      }
    }, { threshold: 0.3 });
    io.observe(wrap);
  }

  // ============== E. Gallery Grid ==============
  let galleryItems = [];     // [{ full, alt }]
  let lbIdx = 0;
  let resetLightboxZoom = null;

  function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const items = Array.from(grid.querySelectorAll('.grid-item'));
    galleryItems = items.map((el) => ({
      full: el.dataset.full,
      alt: el.querySelector('img') ? el.querySelector('img').alt : '',
    }));
    items.forEach((el, i) => {
      el.addEventListener('click', () => openLightbox(i));
    });
  }

  // ============== F. Lightbox + Pinch Zoom + Nav ==============
  function showLightboxItem(i) {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    if (!img || !galleryItems.length) return;
    lbIdx = (i + galleryItems.length) % galleryItems.length;
    const it = galleryItems[lbIdx];
    img.src = it.full;
    img.alt = it.alt;
    img.style.transform = 'translate(0,0) scale(1)';
    if (resetLightboxZoom) resetLightboxZoom();
    if (counter) counter.textContent = `${lbIdx + 1} / ${galleryItems.length}`;
  }
  function openLightbox(i) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    showLightboxItem(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('is-visible'));
  }
  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb) return;
    lb.classList.remove('is-visible');
    document.body.style.overflow = '';
    setTimeout(() => {
      lb.hidden = true;
      if (img) { img.src = ''; img.style.transform = 'translate(0,0) scale(1)'; }
    }, 250);
  }
  function lbNext() { showLightboxItem(lbIdx + 1); }
  function lbPrev() { showLightboxItem(lbIdx - 1); }

  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (!lb || !img) return;

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); lbPrev(); });
    nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); lbNext(); });
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') lbNext();
      else if (e.key === 'ArrowLeft') lbPrev();
    });

    // Pinch zoom + double-tap + (확대 안 된 상태) 좌우 스와이프로 사진 전환
    let scale = 1, lastDist = 0, originX = 0, originY = 0;
    let lastTap = 0;
    let panStartX = 0, panStartY = 0, panning = false, accumX = 0, accumY = 0;
    let swipeStartX = 0, swipeX = 0, swiping = false;

    function applyTransform() {
      img.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
    }
    resetLightboxZoom = function () {
      scale = 1; lastDist = 0; originX = 0; originY = 0; accumX = 0; accumY = 0;
      panning = false; swiping = false;
    };

    img.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const [a, b] = e.touches;
        lastDist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        swiping = false;
      } else if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTap < 300) {
          if (scale === 1) { scale = 2; }
          else { scale = 1; originX = 0; originY = 0; accumX = 0; accumY = 0; }
          applyTransform();
        }
        lastTap = now;
        if (scale > 1) {
          panning = true;
          panStartX = e.touches[0].clientX;
          panStartY = e.touches[0].clientY;
        } else {
          swiping = true;
          swipeStartX = e.touches[0].clientX;
          swipeX = 0;
        }
      }
    }, { passive: true });

    img.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        const [a, b] = e.touches;
        const d = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        if (lastDist > 0) {
          scale = Math.max(1, Math.min(3, scale * (d / lastDist)));
          if (scale === 1) { originX = 0; originY = 0; accumX = 0; accumY = 0; }
          applyTransform();
        }
        lastDist = d;
      } else if (e.touches.length === 1 && panning && scale > 1) {
        const dx = e.touches[0].clientX - panStartX;
        const dy = e.touches[0].clientY - panStartY;
        originX = accumX + dx;
        originY = accumY + dy;
        applyTransform();
      } else if (e.touches.length === 1 && swiping && scale === 1) {
        swipeX = e.touches[0].clientX - swipeStartX;
      }
    }, { passive: true });

    img.addEventListener('touchend', () => {
      lastDist = 0;
      if (panning) { accumX = originX; accumY = originY; panning = false; }
      if (swiping) {
        swiping = false;
        if (Math.abs(swipeX) > 50) {
          if (swipeX > 0) lbPrev(); else lbNext();
          if (navigator.vibrate) try { navigator.vibrate(10); } catch (_) {}
        }
        swipeX = 0;
      }
    });
  }

  // ============== G. Account Copy ==============
  function copyText(txt) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(txt);
    }
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = txt;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg || '복사되었어요';
    t.hidden = false;
    if (navigator.vibrate) { try { navigator.vibrate(15); } catch (_) {} }
    requestAnimationFrame(() => t.classList.add('is-visible'));
    clearTimeout(showToast._tid);
    showToast._tid = setTimeout(() => {
      t.classList.remove('is-visible');
      setTimeout(() => { t.hidden = true; }, 350);
    }, 1600);
  }

  function initCopyButtons() {
    const buttons = document.querySelectorAll('.btn-copy');
    buttons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const txt = btn.dataset.copy;
        if (!txt) return;
        try {
          await copyText(txt);
          const orig = btn.textContent;
          btn.classList.add('is-copied');
          btn.textContent = '복사됨 ✓';
          showToast('계좌번호가 복사되었어요');
          setTimeout(() => {
            btn.classList.remove('is-copied');
            btn.textContent = orig;
          }, 1500);
        } catch (e) {
          showToast('복사에 실패했어요');
        }
      });
    });
  }

  // ============== I. RSVP Button ==============
  function initRSVP() {
    const btn = document.getElementById('rsvp-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || href === '#' || href === '') {
        e.preventDefault();
        showToast('RSVP 폼이 준비되는 대로 안내드릴게요');
      }
    });
  }

  // ============== J. Share (Kakao + Link Copy) ==============
  function initShare() {
    const kakaoBtn = document.getElementById('share-kakao');
    const linkBtn = document.getElementById('share-link');

    kakaoBtn?.addEventListener('click', async () => {
      if (navigator.vibrate) { try { navigator.vibrate(10); } catch (_) {} }
      // Kakao SDK가 로드되어 있으면 sendDefault 호출, 아니면 fallback
      if (typeof window.Kakao !== 'undefined' && window.Kakao && window.Kakao.Share) {
        try {
          window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: '한태현 ♥ 옥정미 결혼합니다',
              description: '2026.11.07 토요일 오후 12:30 · 로프트가든 344',
              imageUrl: location.origin + '/images/hero.jpg',
              link: {
                mobileWebUrl: location.href,
                webUrl: location.href,
              },
            },
            buttons: [
              {
                title: '청첩장 열기',
                link: { mobileWebUrl: location.href, webUrl: location.href },
              },
            ],
          });
        } catch (e) {
          fallbackShare();
        }
      } else {
        fallbackShare();
      }
    });

    async function fallbackShare() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: '한태현 ♥ 옥정미 결혼합니다',
            text: '2026.11.07 토요일 오후 12:30 · 로프트가든 344',
            url: location.href,
          });
          return;
        } catch (_) { /* cancelled */ }
      }
      // 최종 fallback: 링크 복사
      try {
        await copyText(location.href);
        showToast('링크가 복사되었어요. 공유해 주세요!');
      } catch {
        showToast('공유를 지원하지 않아요');
      }
    }

    linkBtn?.addEventListener('click', async () => {
      if (navigator.vibrate) { try { navigator.vibrate(10); } catch (_) {} }
      try {
        await copyText(location.href);
        showToast('링크가 복사되었어요');
      } catch (e) {
        showToast('링크 복사에 실패했어요');
      }
    });
  }

  // ============== K. Scroll Indicator hide on scroll ==============
  function initScrollIndicator() {
    const ind = document.querySelector('.scroll-indicator');
    if (!ind) return;
    let hidden = false;
    window.addEventListener('scroll', () => {
      if (!hidden && window.scrollY > 80) {
        ind.style.transition = 'opacity 300ms ease';
        ind.style.opacity = '0';
        hidden = true;
      } else if (hidden && window.scrollY <= 80) {
        ind.style.opacity = '1';
        hidden = false;
      }
    }, { passive: true });
  }

  // ============== L. reduced-motion 변경 감지 ==============
  function watchReducedMotion() {
    try {
      reducedMotionMQ.addEventListener('change', () => {
        // 단순 처리: 페이지 리로드로 모든 모션 분기 재설정
        location.reload();
      });
    } catch (_) {
      // 구형 브라우저
      try { reducedMotionMQ.addListener(() => location.reload()); } catch (_) {}
    }
  }

  // ============== Init ==============
  function init() {
    initParticles();
    initFadeUp();
    initCalendar();
    initDDay();
    initGallery();
    initLightbox();
    initCopyButtons();
    initRSVP();
    initShare();
    initScrollIndicator();
    watchReducedMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
