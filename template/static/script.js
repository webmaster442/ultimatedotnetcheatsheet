"use strict";

(function () {
    var THEME_KEY = "theme-preference-ultimatedotnetcheatsheet";
    var root = document.documentElement;
    var sidebar = document.getElementById("sidebar");
    var menuToggle = document.getElementById("menu-toggle");
    var themeToggle = document.getElementById("theme-toggle");
    var printButton = document.getElementById("print-button");
    var scrollTopButton = document.getElementById("scroll-top-button");
    var article = document.getElementById("article-content");
    var articleHeadings = document.getElementById("article-headings");

    function getPreferredTheme() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved === "dark" || saved === "light") {
            return saved;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        if (themeToggle) {
            var next = theme === "dark" ? "light" : "dark";
            themeToggle.setAttribute("aria-label", "Switch to " + next + " mode");
        }
    }

    function toggleTheme() {
        var current = root.getAttribute("data-theme") || "light";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
    }

    function setMenuState(open) {
        if (!sidebar || !menuToggle) {
            return;
        }
        sidebar.classList.toggle("is-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
    }

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            var isOpen = !!(sidebar && sidebar.classList.contains("is-open"));
            setMenuState(!isOpen);
        });
    }

    if (printButton) {
        printButton.addEventListener("click", function () {
            let divContents = document.getElementById("article-content").innerHTML;
            let printWindow = window.open('', '', '');
            printWindow.document.open();
            printWindow.document.write(`
            <html>
            <head>
                <title>Print content: ${document.title}</title>
                <link rel="stylesheet" href="./static/print.css" type="text/css">
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                ${divContents}
            </body>
            </html>`);
            printWindow.onload = function () {
                printWindow.focus();
                printWindow.print();
            };
            printWindow.document.close();
        });
    }

    if (article && articleHeadings) {
        const headers = article.querySelectorAll('h2, h3, h4, h5, h6');
        const offset = 150;

        const headingTree = { level: 1, children: [] };
        const parentHeadings = [headingTree];

        headers.forEach((header, index) => {
            const level = parseInt(header.tagName.substring(1), 10);
            if (!header.id) {
                header.id = `header-${index}`;
            }

            while (parentHeadings[parentHeadings.length - 1].level >= level) {
                parentHeadings.pop();
            }

            const heading = { element: header, level: level, children: [] };
            parentHeadings[parentHeadings.length - 1].children.push(heading);
            parentHeadings.push(heading);
        });

        function renderHeadings(headings, list) {
            headings.forEach((heading) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
                a.textContent = heading.element.textContent;
                a.href = `#${heading.element.id}`;

            a.addEventListener('click', (event) => {
                event.preventDefault();
                    const targetPosition = heading.element.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                    history.replaceState(null, '', a.href);
            });

            li.appendChild(a);

                if (heading.children.length > 0) {
                const ul = document.createElement('ul');
                    renderHeadings(heading.children, ul);
                    li.appendChild(ul);
            }

                list.appendChild(li);
            });
        }

        renderHeadings(headingTree.children, articleHeadings);

        if (headers.length < 2) {
            articleHeadings.style.display = "none";
        }
    }

    if (scrollTopButton) {
        function updateScrollTopVisibility() {
            var scrolled = (window.pageYOffset || document.documentElement.scrollTop) > 0;
            scrollTopButton.style.display = scrolled ? "block" : "none";
        }

        window.addEventListener("scroll", updateScrollTopVisibility);
        updateScrollTopVisibility();

        scrollTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    document.addEventListener("click", function (event) {
        var mobile = window.matchMedia("(max-width: 960px)").matches;
        if (!mobile || !sidebar || !menuToggle || !sidebar.classList.contains("is-open")) {
            return;
        }

        var target = event.target;
        if (!(target instanceof Node)) {
            return;
        }

        if (!sidebar.contains(target) && !menuToggle.contains(target)) {
            setMenuState(false);
        }
    });

    window.addEventListener("resize", function () {
        var desktop = window.matchMedia("(min-width: 961px)").matches;
        if (desktop) {
            setMenuState(false);
        }
    });


    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("/sw.js");
        });
    }

})();
