// Load header and footer for static HTML pages
function loadHeader() {
    fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-placeholder');
            if (headerContainer) {
                headerContainer.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('../html/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-placeholder');
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Auto-load on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});
