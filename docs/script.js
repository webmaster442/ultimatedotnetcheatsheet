if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', { scope: '/' });
}

document.addEventListener("DOMContentLoaded", applyCopyButton);

window.onscroll = function () { scrollFunction() };

function applyCopyButton() {
    const pres = document.querySelectorAll('pre');


    pres.forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.classList.add('copyButton');
        copyBtn.textContent = 'Copy to clipboard';
        pre.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
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
    }, 500);
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
