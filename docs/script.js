if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', { scope: '/ultimatedotnetcheatsheet/' });
}

document.addEventListener("DOMContentLoaded", onLoaded);

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

function onLoaded() {
    //apply copy buttons
    const preElements = document.querySelectorAll('pre');

    preElements.forEach(pre => {
        const copyButton = document.createElement('button');
        copyButton.classList.add('copyButton');
        copyButton.textContent = 'Copy to clipboard';
        pre.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            const codeToCopy = pre.firstChild.textContent;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                notify('Code copied to clipboard');
            }).catch(err => {
                notify('Failed to copy code: ' + err);
            });
        });
    });

    //link fixing
    Array.from(document.links)
        .filter(link => link.hostname != window.location.hostname)
        .forEach(link => link.target = '_blank');


    //navigation links close
    const navlinks = document.getElementById("toc").getElementsByTagName('a');
    Array.from(navlinks).forEach(a => a.onclick = function (ev) {
        const classes = document.querySelector('.container').classList;
        classes.remove('toc-visible');
        classes.add('toc-collapsed');
    });

    //correct menu switching
    if (window.location.href.endsWith('index.html')) {
        document.getElementById('menu-net').style.display = "none";
    }
    else if (window.location.href.endsWith('csharp.html')) {
        document.getElementById('menu-csharp').style.display = "none";
    }
}

function notify(message) {
    let notify = document.getElementById('notify');
    notify.style.display = 'block';
    notify.innerText = message;
    setTimeout(() => {
        notify.style.display = 'none';
    }, 800);
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function printPage() {
    window.print();
}

function openCloseNav() {
    const classes = document.querySelector('.container').classList;

    if (classes.contains('toc-collapsed')) {
        classes.remove('toc-collapsed');
        classes.add('toc-visible');
    }
    else {
        classes.remove('toc-visible');
        classes.add('toc-collapsed');
    }
}
