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

document.querySelectorAll('a, .work-row, button').forEach(el => {
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

// FLOATING PREVIEW LOGIC
const workRows = document.querySelectorAll('.work-row');
const preview = document.getElementById('workPreview');
const previewImg = document.getElementById('previewImg');
const previewInner = preview ? preview.querySelector('.preview-inner') : null;

if (preview && workRows.length > 0) {
    let previewX = 0, previewY = 0;
    let targetX = 0, targetY = 0;
    let listActive = false;
    let currentActiveRow = null;

    // Track mouse position globally for this section
    document.addEventListener('mousemove', e => {
        targetX = e.clientX;
        targetY = e.clientY;
        updateActiveRowFromPoint();
    });

    // Update on scroll - detect what's under the stationary mouse
    window.addEventListener('scroll', () => {
        updateActiveRowFromPoint();
    }, { passive: true });

    function updateActiveRowFromPoint() {
        const element = document.elementFromPoint(targetX, targetY);
        const row = element ? element.closest('.work-row') : null;

        if (row) {
            if (currentActiveRow !== row) {
                currentActiveRow = row;
                const imgUrl = row.getAttribute('data-img');
                if (previewImg) previewImg.src = imgUrl;
                preview.classList.add('active');

                if (previewInner) {
                    const randomRotation = (Math.random() * 8 - 4).toFixed(1);
                    previewInner.style.transform = `rotate(${randomRotation}deg)`;
                }
            }
        } else {
            currentActiveRow = null;
            preview.classList.remove('active');
        }
    }

    function animatePreview() {
        // Smoothly follow mouse with slight delay
        previewX += (targetX - previewX) * 0.12;
        previewY += (targetY - previewY) * 0.12;

        // Position preview significantly ABOVE the cursor to avoid bottom clipping
        // We also center it horizontally
        const verticalOffset = -20; // Slight upward lift from base CSS transform
        preview.style.left = previewX + 'px';
        preview.style.top = previewY + 'px';

        requestAnimationFrame(animatePreview);
    }
    animatePreview();
}
