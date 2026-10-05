/* =========================================================
   KEERTHI SRI VEMULA - PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ================= ELEMENTS ================= */

    const header = document.getElementById("header");

    const menuBtn = document.getElementById("menuBtn");

    const navbar = document.getElementById("navbar");

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("section[id]");

    const backToTop = document.getElementById("backToTop");

    const currentYear = document.getElementById("currentYear");

    const progressBar = document.getElementById("scrollProgress");

    const cursorGlow = document.getElementById("cursorGlow");

    const photoFrame = document.querySelector(".photo-frame");

    const hero = document.querySelector(".hero");


    /* ================= MOBILE MENU ================= */

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (!icon) return;

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    }


    /* ================= CLOSE MOBILE MENU ================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuBtn) {

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        });

    });


    /* ================= HEADER SCROLL ================= */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    /* ================= SCROLL PROGRESS ================= */

    function updateScrollProgress() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (scrollHeight <= 0) {

            progressBar.style.width = "0%";

            return;

        }

        const progress =
            (scrollTop / scrollHeight) * 100;

        progressBar.style.width = `${progress}%`;

    }


    /* ================= ACTIVE NAV ================= */

    function updateActiveNavigation() {

        const scrollPosition = window.scrollY + 180;

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    /* ================= SCROLL EVENTS ================= */

    function handleScroll() {

        updateHeader();

        updateScrollProgress();

        updateActiveNavigation();

        if (backToTop) {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();


    /* ================= REVEAL ANIMATION ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= STAGGER ANIMATION ================= */

    const animatedGroups = [
        ".skill-card",
        ".project-card",
        ".training-card"
    ];


    animatedGroups.forEach(selector => {

        const items =
            document.querySelectorAll(selector);

        items.forEach((item, index) => {

            item.style.setProperty(
                "--delay",
                `${index * 0.08}s`
            );

        });

    });


    /* ================= HERO PHOTO PARALLAX ================= */

    const canUseMouse =
        window.matchMedia("(pointer: fine)").matches;


    if (hero && photoFrame && canUseMouse) {

        let mouseX = 0;

        let mouseY = 0;

        let currentX = 0;

        let currentY = 0;

        let animationFrame;


        hero.addEventListener("mousemove", event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            mouseX =
                ((x - rect.width / 2) / rect.width) * 12;

            mouseY =
                ((y - rect.height / 2) / rect.height) * 12;

        });


        hero.addEventListener("mouseleave", () => {

            mouseX = 0;

            mouseY = 0;

        });


        function animatePhoto(time) {

            currentX +=
                (mouseX - currentX) * 0.06;

            currentY +=
                (mouseY - currentY) * 0.06;


            const floating =
                Math.sin(time / 900) * 4;


            photoFrame.style.transform =
                `rotate(2deg)
                 translate3d(${currentX}px,
                 ${currentY + floating}px, 0)`;


            animationFrame =
                requestAnimationFrame(animatePhoto);

        }


        animationFrame =
            requestAnimationFrame(animatePhoto);


        window.addEventListener("beforeunload", () => {

            cancelAnimationFrame(animationFrame);

        });

    }


    /* ================= BUTTON RIPPLE ================= */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(button => {

        button.addEventListener("click", event => {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* ================= BACK TO TOP ================= */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= DYNAMIC YEAR ================= */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* ================= CURSOR GLOW ================= */

    if (cursorGlow && canUseMouse) {

        let glowX = 0;

        let glowY = 0;

        let targetX = 0;

        let targetY = 0;


        document.addEventListener("mousemove", event => {

            targetX = event.clientX;

            targetY = event.clientY;

        });


        function animateGlow() {

            glowX +=
                (targetX - glowX) * 0.12;

            glowY +=
                (targetY - glowY) * 0.12;


            cursorGlow.style.left =
                `${glowX}px`;

            cursorGlow.style.top =
                `${glowY}px`;


            requestAnimationFrame(animateGlow);

        }


        animateGlow();

    } else if (cursorGlow) {

        cursorGlow.remove();

    }


    /* ================= IMAGE ERROR HANDLING ================= */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });


    /* ================= KEYBOARD ACCESSIBILITY ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navbar) {

                navbar.classList.remove("active");

            }

            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        }

    });


    /* ================= PAGE READY ================= */

    document.body.classList.add("loaded");


});
