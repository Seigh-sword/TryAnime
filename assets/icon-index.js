async function loadIcons() {
    try {
        const response = await fetch('assets/icon-index.json');
        const icons = await response.json();
        
        const elements = document.querySelectorAll('[data-icon]');
        
        elements.forEach(el => {
            const iconKey = el.getAttribute('data-icon');
            const path = icons[iconKey];
            
            if (path) {
                if (el.tagName === 'IMG') {
                    el.src = path;
                } else if (el.tagName === 'LINK') {
                    el.href = path;
                }
            }
        });

        return icons;
    } catch (err) {
        console.error("Icon loader failed:", err);
    }
}

export { loadIcons };