document.addEventListener("DOMContentLoaded", function() {
    let lastScrollTop = 0;
    const navMenu = document.querySelector(".nav-menu");
    const header = document.querySelector("header");
    const toggleMenu = document.querySelector("#toggle-menu");
    const navLinks = navMenu.querySelectorAll("a");

    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add("hidden");
        } else {
            // Scrolling up
            header.classList.remove("hidden");
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);

    toggleMenu.addEventListener("change", function() {
        if (this.checked) {
            // Prevent body from scrolling when nav menu is visible
            document.body.style.overflow = "hidden";
        } else {
            // Allow body to scroll when nav menu is hidden
            document.body.style.overflow = "";
        }
    });

    navLinks.forEach(link => {
        link.onclick = () => {
            toggleMenu.checked = false;
            document.body.style.overflow = "";
        };
    });

    // for animating the text/element when shown in viewport
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.toggle('visible', entry.isIntersecting);
                observer.unobserve(entry.target); // Optional: stop observing once the animation has triggered
            } 
        });
    }

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.2 // Trigger when 10% of the element is visible
    });

    // Target elements to observe
    const targets = document.querySelector('#about').querySelectorAll('*');
    targets.forEach(target => {
        observer.observe(target);
    });
});
