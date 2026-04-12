        /* ── Typewriter ── */
        const words = ['Naufal Nur Fanani', 'Builder', 'Creator'];
        let wIdx = 0,
            cIdx = 0,
            deleting = false;
        const el = document.getElementById('typed-text');

        function tick() {
            const word = words[wIdx];
            if (!deleting) {
                cIdx++;
                el.textContent = word.slice(0, cIdx);
                if (cIdx === word.length) {
                    deleting = true;
                    setTimeout(tick, 2200);
                    return;
                }
                setTimeout(tick, wIdx === 0 ? 72 : 100);
            } else {
                cIdx--;
                el.textContent = word.slice(0, cIdx);
                if (cIdx === 0) {
                    deleting = false;
                    wIdx = (wIdx + 1) % words.length;
                    setTimeout(tick, 400);
                    return;
                }
                setTimeout(tick, wIdx === 0 ? 36 : 52);
            }
        }
        setTimeout(tick, 800);

        /* ── Navbar scroll darken ── */
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }, {
            passive: true
        });

        /* ── Nav active state on scroll ── */
        const navSections = [
            { id: 'web-dev',      link: document.querySelector('.nav-links a[href="#web-dev"]') },
            { id: 'ai-automation',link: document.querySelector('.nav-links a[href="#ai-automation"]') },
            { id: 'data-analyst', link: document.querySelector('.nav-links a[href="#data-analyst"]') },
            { id: 'uiux-design',  link: document.querySelector('.nav-links a[href="#uiux-design"]') },
        ];

        function updateActiveNav() {
            const scrollY = window.scrollY;
            const navHeight = 68;
            let current = null;

            navSections.forEach(({ id }) => {
                const section = document.getElementById(id);
                if (section && section.offsetTop - navHeight - 40 <= scrollY) {
                    current = id;
                }
            });

            navSections.forEach(({ id, link }) => {
                if (link) link.classList.toggle('active', id === current);
            });
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();

        /* ── Intersection Observer — slow scroll reveal ── */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });

        /* ── Burger menu ── */
        const burger = document.querySelector('.nav-burger');
        const mobileMenu = document.getElementById('mobile-menu');

        function closeMobileMenu() {
            if (!mobileMenu || !burger) return;
            mobileMenu.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }

        if (burger && mobileMenu) {
            burger.addEventListener('click', () => {
                const isOpen = !mobileMenu.classList.contains('open');
                mobileMenu.classList.toggle('open', isOpen);
                burger.classList.toggle('open', isOpen);
                burger.setAttribute('aria-expanded', String(isOpen));
                mobileMenu.setAttribute('aria-hidden', String(!isOpen));
            });

            /* Close on nav link click */
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });

            /* Close on scroll (only if menu is open) */
            window.addEventListener('scroll', () => {
                if (mobileMenu.classList.contains('open')) closeMobileMenu();
            }, { passive: true });

            /* Close on outside click */
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            });

            /* Close on resize to desktop width */
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) closeMobileMenu();
            }, { passive: true });
        }
