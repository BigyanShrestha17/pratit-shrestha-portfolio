    // CURSOR
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, .work-card, button').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // HERO ANIMATIONS
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelectorAll('.hero-animate').forEach(el => el.classList.add('loaded'));
      }, 100);
    });

    // PARALLAX ON HERO BG TEXT
    const heroBgText = document.getElementById('heroBgText');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (heroBgText) {
        heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
      }
      // Parallax on hero portrait
      const portrait = document.getElementById('heroPortrait');
      if (portrait && scrollY < window.innerHeight) {
        portrait.style.transform = `translateX(-50%) translateY(${scrollY * 0.15}px)`;
      }
    });

    // SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));

    // MARQUEE CLONE
    const track = document.getElementById('marqueeTrack');
    if (track) {
      track.innerHTML += track.innerHTML;
    }
