async function loadComponents() {
    const elements = document.querySelectorAll('[data-include]');
    
    for (const element of elements) {
        try {
            const response = await fetch(element.getAttribute('data-include'));
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
