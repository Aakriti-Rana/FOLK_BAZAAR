// Bag Collection JavaScript Functions

// Function to build the navbar
function buildNavbar(navbar) {
    const header = document.querySelector('header');
    const navDiv = document.createElement('div');
    navDiv.className = 'navbar';

    // Logo section
    const logoDiv = document.createElement('div');
    logoDiv.id = 'logo';
    logoDiv.innerHTML = `
        <p class="p-logo">${navbar.logo.text1}</p>
        <img class="img-logo" src="${navbar.logo.imageSrc}" alt="${navbar.logo.imageAlt}" height="25px" width="25px">
        <p class="p-logo">${navbar.logo.text2}</p>
    `;

    // Icons section
    const rightDiv = document.createElement('div');
    rightDiv.className = 'right';
    navbar.icons.forEach(icon => {
        const iconEl = document.createElement('i');
        iconEl.className = icon.class;
        rightDiv.appendChild(iconEl);
    });

    navDiv.appendChild(logoDiv);
    navDiv.appendChild(rightDiv);
    header.appendChild(navDiv);
}

// Function to build section 1
function buildSection1(section1) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    const div1 = document.createElement('div');
    div1.className = 'div1';

    div1.innerHTML = `
        <div class="header-content">
            <span class="material-symbols-outlined">storefront</span>
            <h1>${section1.title}</h1>
        </div>
        <p>${section1.description}</p>
    `;

    section.appendChild(div1);
    main.appendChild(section);
}

// Function to build shop cards
function buildShopCards(shopCards) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    const div2 = document.createElement('div');
    div2.className = 'div2';

    shopCards.forEach(card => {
        const shopCard = document.createElement('div');
        shopCard.className = `shop-card ${card.color}`;

        shopCard.innerHTML = `
            <div class="image-container">
                <img src="${card.imageSrc}" alt="${card.imageAlt}">
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

// Function to build back button
function buildBackButton(backButton) {
    const main = document.querySelector('main');
    const backDiv = document.createElement('div');
    backDiv.className = 'home';
    backDiv.innerHTML = `<a href="${backButton.href}" style="color:white; text-decoration: none; font-size:25px">${backButton.text}</a>`;
    main.appendChild(backDiv);
}

// Function to build footer
function buildFooter(footer) {
    const footerTag = document.querySelector('footer');
    const section = document.createElement('section');
    const div3 = document.createElement('div');
    div3.className = 'div3';

    let footerContentHTML = `<h2 class="section-title">${footer.title}</h2><div class="footer-content">`;

    footer.columns.forEach(column => {
        footerContentHTML += `
            <div class="footer-column">
                <h3>${column.heading}</h3>
                ${column.items.map(item => `<p>${item}</p>`).join('')}
            </div>
        `;
    });

    footerContentHTML += '</div>';
    div3.innerHTML = footerContentHTML;

    section.appendChild(div3);
    footerTag.appendChild(section);
}

// Main function to initialize the page
function initializePage(jsonData) {
    buildNavbar(jsonData.navbar);
    buildSection1(jsonData.section1);
    buildShopCards(jsonData.shopCards);
    buildBackButton(jsonData.backButton);
    buildFooter(jsonData.footer);
}

// Load JSON data and initialize page
fetch('../json/bags.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
        return response.json();
    })
    .then(data => {
        initializePage(data);
    })
    .catch(err => {
        console.error('Failed to load bags.json:', err);
        // Optional: display a user-friendly message or fallback UI here
    });