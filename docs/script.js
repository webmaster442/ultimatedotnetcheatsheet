if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', { scope: '/ultimatedotnetcheatsheet/' });
}

document.addEventListener("DOMContentLoaded", applyCopyButton);

window.onscroll = function () { scrollFunction() };

function applyCopyButton() {
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
                notify('Failed to copy code: '+ err);
            });
        });
    });
}

function notify(message) {
    let notify = document.getElementById('notify');
    notify.style.display = 'block';
    notify.innerText = message;
    setTimeout(() => {
        notify.style.display = 'none';
    }, 800);
}

function scrollFunction() {
    const scrollBtn = document.getElementById('navigate-top');
    if (document.body.scrollTop > 100
        || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
