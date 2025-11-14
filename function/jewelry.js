// Jewelry Collection JavaScript Functions

function createNavbar(data) {
    const header = document.querySelector('header');
    const navDiv = document.createElement('div');
    navDiv.className = 'navbar';

    const logoDiv = document.createElement('div');
    logoDiv.id = 'logo';
    logoDiv.innerHTML = `
        <p class="p-logo">${data.navbar.logo.text1}</p>
        <p class="p-logo">${data.navbar.logo.text2}</p>
    `;

    const rightDiv = document.createElement('div');
    rightDiv.className = 'right';

    navDiv.appendChild(logoDiv);
    navDiv.appendChild(rightDiv);
    header.appendChild(navDiv);
}

function createHeroSection(data) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    const div1 = document.createElement('div');
    div1.className = 'div1';

    div1.innerHTML = `
        <div class="header-content">
            <span class="material-symbols-outlined">storefront</span>
            <h1>${data.section1.title}</h1>
        </div>
        <p>${data.section1.description}</p>
    `;

    section.appendChild(div1);
    main.appendChild(section);
}

function createShopCards(data) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    const div2 = document.createElement('div');
    div2.className = 'div2';

    data.shopCards.forEach(card => {
        const shopCard = document.createElement('div');
        shopCard.className = `shop-card ${card.color}`;

        shopCard.innerHTML = `
            <div class="image-container">
                <div class="right-side-content">
                    <div class="website-name" style="color: ${card.textColor};">${card.shopName}</div>
                    <button class="view-button">${card.buttonText}</button>
                </div>
            </div>
        `;

        div2.appendChild(shopCard);
    });

    section.appendChild(div2);
    main.appendChild(section);
}

function createBackButton(data) {
    const main = document.querySelector('main');
    const backDiv = document.createElement('div');
    backDiv.className = 'home';
    backDiv.innerHTML = `<a href="${data.backButton.href}" style="color:white; text-decoration: none; font-size:25px">${data.backButton.text}</a>`;
    main.appendChild(backDiv);
}

function createFooter(data) {
    const footer = document.querySelector('footer');
    const section = document.createElement('section');
    const div3 = document.createElement('div');
    div3.className = 'div3';

    let footerHTML = `<h2 class="section-title">${data.footer.title}</h2><div class="footer-content">`;

    data.footer.columns.forEach(column => {
        footerHTML += `
            <div class="footer-column">
                <h3>${column.heading}</h3>
                ${column.items.map(item => `<p>${item}</p>`).join('')}
            </div>
        `;
    });

    footerHTML += '</div>';
    div3.innerHTML = footerHTML;

    section.appendChild(div3);
    footer.appendChild(section);
}

// Initialize Page - Call all functions
function initPage(jewelryData) {
    createNavbar(jewelryData);
    createHeroSection(jewelryData);
    createShopCards(jewelryData);
    createBackButton(jewelryData);
    createFooter(jewelryData);
}

// Load JSON data and initialize page
fetch('../json/jewelry.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
        return response.json();
    })
    .then(data => {
        initPage(data);
    })
    .catch(err => {
        console.error('Failed to load jewelry.json:', err);
        // Optional: display a user-friendly message or fallback UI here
    });