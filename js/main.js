// Package data
const packages = {
    'Singapore Package': {
        title: 'Discover Singapore',
        price: 'AED 2730',
        duration: '4 Nights - 5 Days',
        description: 'Experience the best of Singapore including Night Safari, Universal Studios, and Marina Bay Sands',
        image: 'images/singapore.jpg',
        link: 'packages/singapore.html'
    },
    'Malaysia Package': {
        title: 'Visit Malaysia',
        price: 'AED 1250',
        duration: '4N/5D',
        description: 'Explore Kuala Lumpur with tours to Batu Caves and Genting Highlands',
        image: 'images/malaysia.jpg',
        link: 'packages/malaysia.html'
    },
    'Georgia Package': {
        title: 'Discover the Charm of Georgia',
        price: 'AED 755',
        duration: '3 Nights - 4 Days',
        description: 'Experience stunning landscapes, rich history and warm hospitality',
        image: 'images/georgia.jpg',
        link: 'packages/georgia.html'
    },
    'Baku & Gabala Package': {
        title: 'Explore Baku & Gabala',
        price: 'AED 1130',
        duration: '5 Nights - 6 Days',
        description: 'Complete Azerbaijan experience with city tours and shopping',
        image: 'images/baku.jpg',
        link: 'packages/baku.html'
    },
    'Desert Safari': {
        title: 'Desert Safari Adventure',
        price: 'AED 100',
        duration: 'Half Day',
        description: 'Explore the timeless beauty of the desert',
        image: 'images/desert.jpg',
        link: 'packages/desert-safari.html'
    },
    'Mussandam Dibba': {
        title: 'Mussandam Dibba Tour',
        price: 'AED 250',
        duration: 'Full Day',
        description: 'Experience the fjords of Arabia with stunning mountain and sea views',
        image: 'images/mussandam.jpg',
        link: 'packages/mussandam-dibba.html'
    },
    'Dubai City Tour': {
        title: 'Dubai City Tour',
        price: 'AED 150',
        duration: 'Half Day',
        description: 'Explore the highlights of Dubai including Burj Khalifa and Dubai Mall',
        image: 'images/dubai-city.jpg',
        link: 'packages/dubai-city-tour.html'
    },
    'Abu Dhabi Tour': {
        title: 'Abu Dhabi City Tour',
        price: 'AED 200',
        duration: 'Full Day',
        description: 'Visit the Grand Mosque, Emirates Palace, and other iconic landmarks',
        image: 'images/abu-dhabi.jpg',
        link: 'packages/abu-dhabi-tour.html'
    },
    'F1 Grand Prix': {
        title: 'F1 Abu Dhabi Grand Prix',
        price: 'Contact for Price',
        duration: '3 Days',
        description: 'Experience the thrill of Formula 1 at Yas Marina Circuit',
        image: 'images/f1.jpg',
        link: 'packages/f1-grand-prix.html'
    }
};

// Handle search functionality
const searchInput = document.getElementById('packageSearch');
const searchDropdown = document.getElementById('searchDropdown');

function createDropdownItem(packageName, packageData) {
    return `
        <div class="dropdown-item" data-link="${packageData.link}">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0">${packageData.title}</h6>
                    <small class="text-muted">${packageData.duration}</small>
                </div>
                <span class="package-price">${packageData.price}</span>
            </div>
        </div>
    `;
}

function showAllPackages() {
    searchDropdown.innerHTML = '';
    Object.entries(packages).forEach(([name, data]) => {
        searchDropdown.innerHTML += createDropdownItem(name, data);
    });
    searchDropdown.classList.add('show');
}

function filterPackages(searchTerm) {
    searchDropdown.innerHTML = '';
    if (!searchTerm) {
        showAllPackages();
        return;
    }

    const filteredPackages = Object.entries(packages).filter(([name]) => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredPackages.length > 0) {
        filteredPackages.forEach(([name, data]) => {
            searchDropdown.innerHTML += createDropdownItem(name, data);
        });
        searchDropdown.classList.add('show');
    } else {
        searchDropdown.classList.remove('show');
    }
}

searchInput.addEventListener('input', (e) => {
    filterPackages(e.target.value);
});

searchInput.addEventListener('focus', () => {
    showAllPackages();
});

document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('show');
    }
});

searchDropdown.addEventListener('click', (e) => {
    const dropdownItem = e.target.closest('.dropdown-item');
    if (dropdownItem) {
        window.location.href = dropdownItem.dataset.link;
    }
});

// Populate featured packages
function populateFeaturedPackages() {
    const container = document.getElementById('featuredPackages');
    Object.values(packages).forEach(pkg => {
        const packageCard = `
            <div class="col-md-4 mb-4">
                <div class="package-card">
                    <img src="${pkg.image}" class="card-img-top" alt="${pkg.title}">
                    <div class="card-body">
                        <h5 class="card-title">${pkg.title}</h5>
                        <p class="card-text">${pkg.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="package-price">From ${pkg.price}</div>
                            <div class="package-duration small text-muted">${pkg.duration}</div>
                        </div>
                        <div class="text-end mt-3">
                            <a href="${pkg.link}" class="btn btn-danger">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += packageCard;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateFeaturedPackages();
});
