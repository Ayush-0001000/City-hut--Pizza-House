/*
    Speciality script (speciality.js)
    - Purpose: render the 'Our Speciality' card grid on `index.html` and provide a simple
        detail overlay for items without an external `link`.
    - Data source: `specialityData` (object below). Some items include a `link` property
        that points to a category page under `manu/` (these open in a new tab).
    - Render target: `#specialityCardsContainer` on `index.html`.
    - Connections:
        * Items with `link` use `<a target="_blank">` to open the category page in a new tab.
        * Items without `link` use `openSpecialityCard(id)` to show the in-page detail overlay.
    - Main functions: `renderSpecialityCards()`, `openSpecialityCard()`, slider helpers and `goBackSpeciality()`.
*/
// Speciality Section - Separate JS for index.html
const specialityData = {
    1: { title: "Margherita Pizza", desc: "Classic pizza with fresh mozzarella, basil, and tomato sauce.", images: ["banner/bg2.png"], price: "₹100", link: "./manu/pizza.html" },



    2: { title: "Schezwan Rice", desc: " For those who crave heat—rice tossed in a bold, spicy, and garlicky Schezwan sauce.", images: ["./menu-img/basmati-special/schezwanrice2.jpg"], price: "₹130", link: "./manu/basmati-special.html" },


  
    3: { title: "Chili paneer", desc: " Soft paneer chunks tossed with bell peppers and onions in a classic soy-based sauce..", images: ["./menu-img/chinese-chillies/paneer-chilli2.jpg"], price: "₹140", link: "./manu/chinese-chillis.html" },
    
    4: { title: "Veg Hara Bhara Kabab", desc: "Vibrant green patties made with spinach, peas, and spices.", images: ["./menu-img/petro-bites/harabhra-kabab2.jpg"], price: "₹100", link: "./manu/petro-bite&soup.html" },

    5: { title: "Schezwan Noodles", desc: "Fiery noodles tossed in a signature spicy sauce.", images: ["./menu-img/premium-noodles/schezwan-noodles2.jpg"], price: "₹160", link: "./manu/premum-noodles.html" },
    
    6: { title: "Bombay Masala Sandwich", desc: " A street-food favorite packed with spiced potatoes and zesty chutney for a true taste of Mumbai.", images: ["./menu-img/sandwich/bombay-sand.jpg"], price: "₹90", link: "./manu/sandwich.html" },
    
    7: { title: "Peri Peri Corn", desc: "Sweet corn with a spicy and tangy African bird's eye chili kick.", images: ["./menu-img/corn-spring/pery-corn.jpg"], price: "₹50", link: "./manu/cornspring.html" },

    8: { title: "Red Sauce Pasta", desc: "Robust pasta in a tangy, herbed tomato sauce.", images: ["./menu-img/crispy-and-pasta/red-pasta.jpg"], price: "₹120", link: "./manu/crispy&pasta.html" },

    9: { title: "Hot Coffee", desc: " A classic, warming brew to start your day or end your meal.", images: ["./menu-img/coffee-and-tea/milk-coffee2.jpg", "./menu-img/coffee-and-tea/milk-coffee.jpg"], price: "₹25", link: "./manu/coffee&tea.html" },

    10: { title: "Blue Lagoon", desc: "A striking blue, citrusy, and tropical non-alcoholic drink.", images: ["./menu-img/mocktail-and-cold-delight/blue-lagoon.jpg", "./menu-img/mocktail-and-cold-delight/blue-lagoon2.jpg"], price: "₹100", link: "./manu/mocktail.html" }
};

// Debug: show that speciality data has been loaded into memory
// (This helps track where the card data originates when the page initializes)
console.log('speciality.js: specialityData loaded', specialityData);
let specialityCurrentId = null, specialityCurrentIndex = 0, specialitySlideTimer = null;
const specialityCardsContainer = document.getElementById('specialityCardsContainer');
const specialitySlidesEl = document.getElementById('specialitySlides'), specialityDotsWrap = document.getElementById('specialityDotsWrap'), specialityPrevBtn = document.getElementById('specialityPrevBtn'), specialityNextBtn = document.getElementById('specialityNextBtn');

function renderSpecialityCards() {
    if (!specialityCardsContainer) return;
    // Debug: ensure container element is present before rendering
    console.log('renderSpecialityCards: container element', specialityCardsContainer);
    specialityCardsContainer.innerHTML = '';
    Object.keys(specialityData).forEach(key => {
        const item = specialityData[key];
        // Debug: log each item as it is read for rendering
        console.log('renderSpecialityCards: rendering item', key, item);
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';

        const thumbHTML = item.images ? ("<img loading=\"lazy\" src=\"" + item.images[0] + "\" alt=\"" + item.title + "\">") : ("<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f5f5f5;color:#666;font-size:14px;font-weight:600;\">" + (item.text ? item.text[0] : '') + "</div>");
        card.innerHTML = "<div class=\"thumb\">" + thumbHTML + "</div><h3>" + item.title + "</h3><p>" + item.desc + "</p><div class=\"price\">" + item.price + "</div>";

        // If item has a link, wrap in anchor for navigation; otherwise make clickable for detail
        if (item.link) {
            // Debug: this item has an external link (navigates to category page)
            console.log('renderSpecialityCards: item has link, creating anchor', key, item.link);
            const a = document.createElement('a');
            a.href = item.link;
           
            a.rel = 'noopener noreferrer';
            a.style.display = 'block';
            a.style.textDecoration = 'none';
            a.style.color = 'inherit';
            a.appendChild(card);
            specialityCardsContainer.appendChild(a);
        } else {
            // Debug: this item will open the in-page detail overlay
            // Use addEventListener to allow adding logging without changing behavior
            card.addEventListener('click', () => {
                console.log('renderSpecialityCards: card clicked, opening detail for', key);
                openSpecialityCard(key);
            });
            specialityCardsContainer.appendChild(card);
        }
    })
}

function openSpecialityCard(id) {
    // Debug: entering detail view for a particular speciality card
    console.log('openSpecialityCard: opening detail for id', id);
    document.getElementById("specialityCardsContainer").parentElement.style.display = "none";
    document.getElementById("specialityDetailPage").style.display = "block";
    specialityCurrentId = id;
    specialityCurrentIndex = 0;
    populateSpecialityDetail(id);
    startSpecialityAutoPlay();
}

function populateSpecialityDetail(id) {
    const item = specialityData[id];
    // Debug: populate detail - verify that we have the item data
    console.log('populateSpecialityDetail: id ->', id);
    if (!item) {
        console.warn('populateSpecialityDetail: no item found for id', id);
        return;
    }
    console.log('populateSpecialityDetail: item data', item);
    document.getElementById('specialityCrumb').innerText = 'Speciality / ' + item.title;
    document.getElementById('specialityDetailTitle').innerText = item.title;
    document.getElementById('specialityDetailDesc').innerText = item.desc;
    document.getElementById('specialityDetailPrice').innerText = item.price || '';
    document.getElementById('specialitySideTitle').innerText = item.title;
    document.getElementById('specialitySideText').innerText = item.desc;
    specialitySlidesEl.innerHTML = '';
    specialityDotsWrap.innerHTML = '';
    const slideSource = item.images || item.text;
    console.log('populateSpecialityDetail: slideSource length', slideSource && slideSource.length);
    slideSource.forEach((src, i) => {
        const s = document.createElement('div');
        s.className = 'slide';
        if (item.images) {
            s.innerHTML = "<img loading=\"lazy\" src=\"" + src + "\" alt=\"" + item.title + " image " + (i + 1) + "\">";
        } else {
            s.innerHTML = "<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:320px;background:#f5f5f5;color:#666;font-size:18px;font-weight:600;\">" + src + "</div>";
        }
        specialitySlidesEl.appendChild(s);
        // Debug: each slide added for this detail view
        console.log('populateSpecialityDetail: added slide', i, src);
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSpecialitySlide(i));
        specialityDotsWrap.appendChild(dot);
    });
    updateSpecialitySlidePosition();
}

function updateSpecialitySlidePosition() {
    // Debug: update slide transform and active dot
    console.log('updateSpecialitySlidePosition: currentIndex', specialityCurrentIndex);
    specialitySlidesEl.style.transform = "translateX(-" + (specialityCurrentIndex * 100) + "%)";
    Array.from(specialityDotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === specialityCurrentIndex));
}

function specialityPrevSlide() {
    // Debug: navigate to previous slide
    console.log('specialityPrevSlide: beforeIndex', specialityCurrentIndex);
    specialityCurrentIndex = (specialityCurrentIndex - 1 + specialitySlidesEl.children.length) % specialitySlidesEl.children.length;
    updateSpecialitySlidePosition();
    resetSpecialityAutoPlay();
}

function specialityNextSlide() {
    // Debug: navigate to next slide
    console.log('specialityNextSlide: beforeIndex', specialityCurrentIndex);
    specialityCurrentIndex = (specialityCurrentIndex + 1) % specialitySlidesEl.children.length;
    updateSpecialitySlidePosition();
    resetSpecialityAutoPlay();
}

function goToSpecialitySlide(i) {
    // Debug: direct navigation to slide index
    console.log('goToSpecialitySlide: targetIndex', i);
    specialityCurrentIndex = i;
    updateSpecialitySlidePosition();
    resetSpecialityAutoPlay();
}

function startSpecialityAutoPlay() {
    // Debug: start auto-play timer
    console.log('startSpecialityAutoPlay: starting autoplay');
    clearInterval(specialitySlideTimer);
    specialitySlideTimer = setInterval(() => specialityNextSlide(), 3500);
}

function resetSpecialityAutoPlay() {
    // Debug: reset auto-play (pause/resume)
    console.log('resetSpecialityAutoPlay: resetting autoplay timer');
    clearInterval(specialitySlideTimer);
    specialitySlideTimer = setTimeout(() => startSpecialityAutoPlay(), 2800);
}

function stopSpecialityAutoPlay() {
    // Debug: stop auto-play
    console.log('stopSpecialityAutoPlay: stopping autoplay');
    clearInterval(specialitySlideTimer);
}

specialityPrevBtn.addEventListener('click', specialityPrevSlide);
specialityNextBtn.addEventListener('click', specialityNextSlide);

let specialityStartX = 0, specialityIsDown = false;
const specialitySliderRoot = document.getElementById('specialitySliderRoot');
specialitySliderRoot.addEventListener('pointerdown', e => {
    // Debug: pointer/touch start on slider
    specialityIsDown = true;
    specialityStartX = e.clientX || (e.touches && e.touches[0].clientX);
    console.log('specialitySlider: pointerdown startX', specialityStartX);
    stopSpecialityAutoPlay();
});

window.addEventListener('pointerup', e => {
    // Debug: pointer/touch end - compute delta to determine swipe
    if (!specialityIsDown) return;
    specialityIsDown = false;
    const dx = (e.clientX || 0) - specialityStartX;
    console.log('specialitySlider: pointerup dx', dx);
    if (dx > 40) specialityPrevSlide();
    else if (dx < -40) specialityNextSlide();
    startSpecialityAutoPlay();
});

function goBackSpeciality() {
    // Debug: returning from detail page to card grid
    console.log('goBackSpeciality: returning to cards view from id', specialityCurrentId);
    document.getElementById("specialityDetailPage").style.display = "none";
    document.getElementById("specialityCardsContainer").parentElement.style.display = "block";
    stopSpecialityAutoPlay();
}

function addToSpecialityCart() {
    // Debug: add-to-cart invoked for current detail item
    console.log('addToSpecialityCart: currentId', specialityCurrentId, 'item', specialityData[specialityCurrentId]);
    alert((specialityData[specialityCurrentId]?.title || 'Item') + " added to your order!");
}

window.addEventListener('resize', () => updateSpecialitySlidePosition());

// Initialize speciality cards on page load
renderSpecialityCards();
console.log('speciality.js: renderSpecialityCards() called and initialization complete');
