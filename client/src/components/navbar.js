function createNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'bg-card border-b border-border shadow-sm fixed w-full z-20 top-0 left-0';

    const mainContainer = document.createElement('div');
    mainContainer.className = 'max-w-6xl mx-auto px-4 flex items-center justify-between h-16';

    const logoSection = document.createElement('div');
    logoSection.className = 'flex items-center gap-2';

    const iconBackground = document.createElement('div');
    iconBackground.className = 'bg-primary rounded-full p-2';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svgIcon = document.createElementNS(svgNS, 'svg');
    svgIcon.setAttribute('class', 'w-6 h-6 text-white');
    svgIcon.setAttribute('fill', 'none');
    svgIcon.setAttribute('stroke', 'currentColor');
    svgIcon.setAttribute('stroke-width', '2');
    svgIcon.setAttribute('viewBox', '0 0 24 24');

    const svgPath = document.createElementNS(svgNS, 'path');
    svgPath.setAttribute('stroke-linecap', 'round');
    svgPath.setAttribute('stroke-linejoin', 'round');
    svgPath.setAttribute('d', 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 100-8 4 4 0 000 8zm6 6v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1');
    
    svgIcon.appendChild(svgPath);

    iconBackground.appendChild(svgIcon);

    const brandName = document.createElement('a');
    brandName.className = 'text-xl font-bold text-primary';
    brandName.textContent = 'UrbanEcho';
    brandName.href = '/client/index.html';

    logoSection.appendChild(iconBackground);
    logoSection.appendChild(brandName);

    const navLinksSection = document.createElement('div');
    navLinksSection.className = 'flex space-x-6';

    let links = [
        { href: '#features', text: 'Features' },
        { href: '/client/src/pages/register.html', text: 'Register' },
        { href: '/client/src/pages/login.html', text: 'Login' },
        { href: '#contact', text: 'Contact' }
    ];
    
    let currentPage = window.location.pathname;
    const commonUpdater = () => {
        logoSection.removeChild(iconBackground);
        brandName.textContent = '← Home';
        brandName.className = 'text-primary hover:text-accent font-medium transition flex items-center gap-2';
}
    
// const navbarMap = {
//     'register.html': [
//         { href: '/client/src/pages/login.html', text: 'Login' },
//     ],
//     'login.html': [
//         { href: '/client/src/pages/register.html', text: 'Register' },
//     ],
//     'dashboard.html': [
//         { href: '/client/src/pages/login.html', text: 'Logout' },
//     ],
//     'admin.html': [
//         { href: '/client/src/pages/login.html', text: 'Logout' },
//     ],
// }

    // const renderedLinks = navbarMap[currentPage.split('/').pop()];
    if (currentPage.includes('register.html')) {
        commonUpdater();
        links = [
            { href: '/client/src/pages/login.html', text: 'Login' },
        ];
    } else if (currentPage.includes('login.html')) {
        commonUpdater();
        links = [
            { href: '/client/src/pages/register.html', text: 'Register' },
        ];
    } else if(currentPage.includes('dashboard.html') || currentPage.includes('admin.html')) {
        commonUpdater();
        links = [
            { href: '/client/src/pages/login.html', text: 'Logout' }
        ];
    }
    
    links.forEach(linkInfo => {
        const link = document.createElement('a');
        link.href = linkInfo.href;
        link.className = 'text-primary hover:text-accent font-medium transition';
        link.textContent = linkInfo.text;
        navLinksSection.appendChild(link);
    });

    mainContainer.appendChild(logoSection);
    mainContainer.appendChild(navLinksSection);

    nav.appendChild(mainContainer);

    document.body.appendChild(nav);
}

createNavbar();
