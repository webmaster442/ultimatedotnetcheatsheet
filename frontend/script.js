function generateHeaderList(containerId, listId) {
    const container = document.getElementById(containerId);
    const toc = document.getElementById(listId);
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

    let lastLevels = [toc];

    headers.forEach(header => {
        const level = parseInt(header.tagName.substring(1));
        const li = document.createElement('li');
        li.textContent = header.textContent;
        
        li.addEventListener('click', () => {
            header.scrollIntoView({ behavior: 'smooth' });
        });

        // Create a new list element if necessary
        if (level > lastLevels.length) {
            const ul = document.createElement('ul');
            lastLevels[lastLevels.length - 1].appendChild(ul);
            lastLevels.push(ul);
        }

        while (level < lastLevels.length) {
            lastLevels.pop();
        }

        lastLevels[lastLevels.length - 1].appendChild(li);
    });
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

document.addEventListener('DOMContentLoaded', function() {
    generateHeaderList('content', 'pagenav')
});