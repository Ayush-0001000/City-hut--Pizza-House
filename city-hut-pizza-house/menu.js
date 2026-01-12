/*
    Menu page script (menu.js)
    - Purpose: render top-level menu cards on `menu.html`.
    - Data source: `itemdata` (defined below). Each entry may include `link` (navigates to category page)
        or no link (will open the built-in detail overlay via `openCard(id)`).
    - Render target: `#cardsContainer`.
    - Connections:
        * Category navigation links point to files under `manu/` (e.g. `manu/pizza.html`).
        * If a card is a pizza-like item the detail pane will try to read pricing from `window.pizzaTypes` (provided by `pizza.js`).
    - Main functions: `renderCards()`, `openCard()`, `populateDetail()` and slider helpers.
*/
// Menu Page - Separate JS for menu.html
const itemdata = {
    1: { title: "Pizzas", images: ["menu-img/section-2/pery2-fries-pizza.jpg"], link: "manu/pizza.html" },

    2: { title: "Burgers & French Fries", images: ["logo-img/menu-burger.png"], link: "manu/burger&french,fries.html" },

    3: { title: "Chinese Chillies", images: ["menu-img/chinese-chillies/paneer-chilli2.jpg"], link: "manu/chinese-chillis.html" },

    4: { title: "petro-bite&soup", images: ["menu-img/petro-bites/harabhra-kabab2.jpg"], link: "manu/petro-bite&soup.html" },
    5: { title: "crispy&pasta", images: ["menu-img/crispy-and-pasta/red-pasta2.jpg"], link: "manu/crispy&pasta.html" },

    6: { title: "coffee&tea", images: ["menu-img/coffee-and-tea/milk-coffee2.jpg"], link: "manu/coffee&tea.html" },

    7: { title: "cornsprings", images: ["menu-img/corn-spring/paneer-spring2.jpg"], link: "manu/cornspring.html" },
    8: { title: "Basmati Special", images: ["menu-img/basmati-special/vegbiryani2.jpg"], link: "manu/basmati-special.html" },

    9: { title: "Premium Noodles", images: ["menu-img/premium-noodles/singapuri-noodles.jpg"], link: "manu/premum-noodles.html" },

    10: { title: "sandwiches", images: ["menu-img/sandwich/bombay-sand2.jpg"], link: "manu/sandwich.html" },

    11: { title: "mocktails", images: ["menu-img/mocktail-and-cold-delight/orio-milk.jpg"], link: "manu/mocktail.html" }

};

function makeSVGDataURI(label = "Item", bg = "#fff", accent = "#333") {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='" + bg + "' stop-opacity='1'/><stop offset='1' stop-color='" + accent + "' stop-opacity='0.06'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><g><rect x='40' y='40' width='1120' height='620' rx='20' fill='rgba(255,255,255,0.04)'/><text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, Arial' font-size='54' fill='" + accent + "' font-weight='700'>" + escapeXML(label) + "</text></g></svg>";
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function escapeXML(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const cardsContainer = document.getElementById('cardsContainer');

function renderCards() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';
    Object.keys(itemdata).forEach(key => {
        const item = itemdata[key];
        const card = document.createElement('div');
        card.className = 'card';

        const thumbHTML = item.images ? ("<img src=\"" + item.images[0] + "\" alt=\"" + item.title + "\" loading=\"lazy\">") : ("<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f5f5f5;color:#666;font-size:14px;font-weight:600;\">" + (item.text ? item.text[0] : '') + "</div>");
        card.innerHTML = "<div class=\"thumb\">" + thumbHTML + "</div><h3>" + item.title + "</h3>";

        // If item has a link, wrap the card in an anchor so it navigates instead of opening the detail overlay
        if (item.link) {
            const a = document.createElement('a');
            a.href = item.link;
            a.style.display = 'block';
            a.style.textDecoration = 'none';
            a.style.color = 'inherit';
            a.appendChild(card);
            cardsContainer.appendChild(a);
        } else {
            card.style.cursor = 'pointer';
            card.onclick = () => openCard(key);
            cardsContainer.appendChild(card);
        }
    })
}

let currentId = null, currentIndex = 0, slideTimer = null;
const slidesEl = document.getElementById('slides'), dotsWrap = document.getElementById('dotsWrap'), prevBtn = document.getElementById('prevBtn'), nextBtn = document.getElementById('nextBtn');

function openCard(id) {
    document.getElementById("menuPage").style.display = "none";
    document.getElementById("detailPage").style.display = "block";
    currentId = id;
    currentIndex = 0;
    populateDetail(id);
    startAutoPlay();
}

function populateDetail(id) {
    const item = itemdata[id];
    if (!item) return;
    currentId = id;
    document.getElementById('crumb').innerText = 'Menu / ' + item.title;
    document.getElementById('detailTitle').innerText = item.title;
    document.getElementById('detailDesc').innerText = item.desc;
    document.getElementById('sideTitle').innerText = item.title;
    document.getElementById('sideText').innerText = item.desc;

    // Show inline pizza option controls in the detail aside for pizza items
    const isPizza = item.title.includes("Pizza");
    const detailPizzaControls = document.getElementById('detailPizzaControls');
    const addCartBtn = document.getElementById('addCartBtn');
    if (isPizza) {
        if (detailPizzaControls) detailPizzaControls.style.display = 'block';
        if (addCartBtn) addCartBtn.style.display = 'none';

        // set defaults for inline controls
        const typeEl = document.getElementById('detailPizzaType');
        const sectionEl = document.getElementById('detailPizzaSection');
        const sizeEl = document.getElementById('detailPizzaSize');
        if (typeEl) typeEl.value = 'pan';
        if (sizeEl) sizeEl.value = 'regular';

        // attempt to find matching pizza in pizzaCardsData by title to determine section
        let foundSection = null;
        if (window.pizzaCardsData) {
            for (let pid in window.pizzaCardsData) {
                if (window.pizzaCardsData[pid].title === item.title) {
                    foundSection = window.pizzaCardsData[pid].section;
                    break;
                }
            }
        }
        if (sectionEl) sectionEl.value = foundSection ? ('section' + foundSection) : 'section1';

        // update price for the detail controls
        if (typeof updatePizzaPrice === 'function') {
            try { updatePizzaPrice('detail'); } catch (e) { }
        }
    } else {
        if (detailPizzaControls) detailPizzaControls.style.display = 'none';
        if (addCartBtn) addCartBtn.style.display = 'block';
    }

    slidesEl.innerHTML = '';
    dotsWrap.innerHTML = '';
    const slideSource = item.images || item.text;
    slideSource.forEach((src, i) => {
        const s = document.createElement('div');
        s.className = 'slide';
        if (item.images) {
            s.innerHTML = "<img src=\"" + src + "\" alt=\"" + item.title + " image " + (i + 1) + "\" loading=\"lazy\">";
        } else {
            s.innerHTML = "<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:320px;background:#f5f5f5;color:#666;font-size:18px;font-weight:600;\">" + src + "</div>";
        }
        slidesEl.appendChild(s);
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsWrap.appendChild(dot);
    });
    updateSlidePosition();
}

function updateSlidePosition() {
    slidesEl.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slidesEl.children.length) % slidesEl.children.length;
    updateSlidePosition();
    resetAutoPlay();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slidesEl.children.length;
    updateSlidePosition();
    resetAutoPlay();
}

function goToSlide(i) {
    currentIndex = i;
    updateSlidePosition();
    resetAutoPlay();
}

function startAutoPlay() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => nextSlide(), 3500);
}

function resetAutoPlay() {
    clearInterval(slideTimer);
    slideTimer = setTimeout(() => startAutoPlay(), 2800);
}

function stopAutoPlay() {
    clearInterval(slideTimer);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

let startX = 0, isDown = false;
const sliderRoot = document.getElementById('sliderRoot');
sliderRoot.addEventListener('pointerdown', e => { isDown = true; startX = e.clientX || (e.touches && e.touches[0].clientX); stopAutoPlay() });
window.addEventListener('pointerup', e => { if (!isDown) return; isDown = false; const dx = (e.clientX || 0) - startX; if (dx > 40) prevSlide(); else if (dx < -40) nextSlide(); startAutoPlay() });

function goBack() {
    document.getElementById("detailPage").style.display = "none";
    document.getElementById("menuPage").style.display = "block";
    stopAutoPlay();
}

function addToCart() {
    alert((itemdata[currentId]?.title || 'Item') + " added to your order!");
}

window.addEventListener('resize', () => updateSlidePosition());

// Pizza options handler
function openPizzaFromDetail() {
    document.getElementById("detailPage").style.display = "none";
    document.getElementById("pizzaOptionsPage").style.display = "block";
    updatePizzaPrice();
}

function goBackToPizza() {
    document.getElementById("pizzaOptionsPage").style.display = "none";
    document.getElementById("detailPage").style.display = "block";
}

// Pizza pricing is provided by `pizza.js` as `window.pizzaTypes`.

function updatePizzaPrice(prefix) {
    // prefix: optional string. If provided, the function looks for elements like
    // `${prefix}PizzaType`, `${prefix}PizzaSection`, `${prefix}PizzaSize`, `${prefix}PizzaPrice`.
    // If prefix is not provided, it falls back to `pizzaType`, `pizzaSection`, `pizzaSize`, `pizzaPrice`.
    prefix = prefix || '';
    const idType = prefix ? (prefix + 'PizzaType') : 'pizzaType';
    const idSection = prefix ? (prefix + 'PizzaSection') : 'pizzaSection';
    const idSize = prefix ? (prefix + 'PizzaSize') : 'pizzaSize';
    const idPrice = prefix ? (prefix + 'PizzaPrice') : 'pizzaPrice';

    const typeEl = document.getElementById(idType);
    const sectionEl = document.getElementById(idSection);
    const sizeEl = document.getElementById(idSize);
    const priceEl = document.getElementById(idPrice);
    if (!typeEl || !sectionEl || !sizeEl || !priceEl) return;

    const type = typeEl.value;
    const section = sectionEl.value;
    const size = sizeEl.value;

    let price = undefined;
    const types = (window.pizzaTypes || (typeof pizzaTypes !== 'undefined' && pizzaTypes) || null);
    if (types && types[type] && types[type][section]) {
        price = types[type][section][size];
    }
    if (price === undefined) {
        priceEl.innerText = '';
    } else {
        priceEl.innerText = '₹' + price;
    }
}

function addPizzaToCart() {
    const type = document.getElementById("pizzaType").value;
    const section = document.getElementById("pizzaSection").value;
    const size = document.getElementById("pizzaSize").value;
    const price = document.getElementById("pizzaPrice").innerText;

    const typeDisplay = type === 'pan' ? 'Pan Pizza' : 'Cheese Pizza';
    const sizeDisplay = size.charAt(0).toUpperCase() + size.slice(1);

    alert("Added to Order:\n" + typeDisplay + " - " + section.toUpperCase() + " - " + sizeDisplay + "\n" + price);
    goBackToPizza();
}

function addPizzaToCartFromDetail() {
    const typeEl = document.getElementById('detailPizzaType');
    const sectionEl = document.getElementById('detailPizzaSection');
    const sizeEl = document.getElementById('detailPizzaSize');
    const priceEl = document.getElementById('detailPizzaPrice');
    if (!typeEl || !sectionEl || !sizeEl || !priceEl) return;

    const type = typeEl.value;
    const section = sectionEl.value;
    const size = sizeEl.value;
    const price = priceEl.innerText || '';
    const typeDisplay = type === 'pan' ? 'Pan Pizza' : 'Cheese Pizza';
    const sizeDisplay = size.charAt(0).toUpperCase() + size.slice(1);

    alert("Added to Order:\n" + typeDisplay + " - " + section.toUpperCase() + " - " + sizeDisplay + "\n" + price);
    // Keep user on the same detail page per request (no navigation)
}

// Initialize menu cards on page load
renderCards();

// Defensive: ensure the detail and pizza options are hidden on load and add light logging
document.addEventListener('DOMContentLoaded', function () {
    try {
        const detail = document.getElementById('detailPage');
        const pizzaOpts = document.getElementById('pizzaOptionsPage');
        const menu = document.getElementById('menuPage');
        if (detail) detail.style.display = 'none';
        if (pizzaOpts) pizzaOpts.style.display = 'none';
        if (menu) menu.style.display = 'block';
    } catch (e) { }
});

// Add light instrumentation to help debug unexpected opens
const _openCard = openCard;
openCard = function (id) { console.log('openCard called for', id); return _openCard(id); };
if (typeof openPizzaFromDetail === 'function') {
    const _openPizzaFromDetail = openPizzaFromDetail;
    openPizzaFromDetail = function () { console.log('openPizzaFromDetail called'); return _openPizzaFromDetail(); };
}
if (typeof goBackToPizza === 'function') {
    const _goBackToPizza = goBackToPizza;
    goBackToPizza = function () { console.log('goBackToPizza called'); return _goBackToPizza(); };
}
