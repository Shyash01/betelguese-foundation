(function () {
    const header = document.querySelector(".header");
    if (!header) return;

    const scrollThreshold = 24;

    function updateHeaderGlass() {
        header.classList.toggle("is-scrolled", window.scrollY > scrollThreshold);
    }

    updateHeaderGlass();
    window.addEventListener("scroll", updateHeaderGlass, { passive: true });
})();

(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = document.querySelectorAll(".motion-reveal");
    if (!revealNodes.length) return;

    if (reduceMotion) {
        revealNodes.forEach(function (el) {
            el.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    revealNodes.forEach(function (el) {
        observer.observe(el);
    });
})();
