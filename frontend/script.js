'use strict'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', { scope: '/ultimatedotnetcheatsheet/' });
}

function generateHeaderList(containerId, listId) {
    const container = document.getElementById(containerId);
    const toc = document.getElementById(listId);
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const offset = 150;

    let lastLevels = [toc];

    let counter = 0;

    headers.forEach((header, index) => {

        ++counter;

        const level = parseInt(header.tagName.substring(1));

        if (!header.id) {
            header.id = `header-${index}`;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = header.textContent;
        a.href = `#`;

        a.addEventListener('click', (event) => {
            event.preventDefault();

            const targetPosition = header.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });

        li.appendChild(a);

        // Create a new list element if necessary
        if (level > lastLevels.length) {
            const ul = document.createElement('ul');
            lastLevels[lastLevels.length - 1].appendChild(ul);
            lastLevels.push(ul);
        }

        // Move up the hierarchy if the header level is lower
        while (level < lastLevels.length) {
            lastLevels.pop();
        }

        lastLevels[lastLevels.length - 1].appendChild(li);
    });

    if (counter < 2) {
        toc.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function themeSwitcher() {
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    }

    setTheme(getPreferredTheme());

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme');

        if (!themeSwitcher) {
            return;
        }

        const themeSwitcherText = document.querySelector('#bd-theme-text');
        const activeThemeIcon = document.querySelector('.theme-icon-active use');
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active');
            element.setAttribute('aria-pressed', 'false');
        });

        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
        activeThemeIcon.setAttribute('href', svgOfActiveBtn);
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

        if (focus) {
            themeSwitcher.focus();
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });

    showActiveTheme(getPreferredTheme());

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value');
            setStoredTheme(theme);
            setTheme(theme);
            showActiveTheme(theme, true);
        });
    });
}

function changelogModal() {

    let modalContent = document.getElementById("modalContent");
    fetch('changelog.html').then(response => {
        if (!response.ok) {
            throw new Error("Network error");
        }
        return response.text();
    }).then(data => {
        modalContent.innerHTML = data;
    })
        .catch(error => {
            modalContent.innerHTML = 'Error loading changelog.';
            console.error(error);
        });

    let modalInstance = new bootstrap.Modal(document.getElementById("changelogModal"));
    modalInstance.show();

    document.getElementById("closeModalHeader").addEventListener('click', function () {
        modalInstance.hide();
    });
    document.getElementById("closeModalFooter").addEventListener('click', function () {
        modalInstance.hide();
    });
}

window.onscroll = function () {
    const scrollBtn = document.getElementById('navigate-top');
    if (document.body.scrollTop > 100
        || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = 'block';
    }
    else {
        scrollBtn.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', function () {
    generateHeaderList('content', 'pagenav');
    themeSwitcher();

    const codeElements = document.querySelectorAll('code');
    codeElements.forEach((codeElement) => {
        const hasLanguageClass = Array.from(codeElement.classList).some(cls => cls.startsWith('language-'));
        if (hasLanguageClass) {
            codeElement.setAttribute('data-prismjs-copy', 'copy');
        }
    });

});