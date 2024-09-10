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