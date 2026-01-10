
/*
    app.js - Shared data & rendering for category pages
    Purpose:
      - Provide sample `itemdata` used to render category cards on various subpages
      - Render cards, handle detail views (sliders, crumbs, detail content), and provide small utilities (lazy-loading)
    Notes:
      - Avoid changing element IDs (e.g., `cardsContainer`, `detailPage`, `slides`) since the HTML and other scripts depend on them.
*/
const itemdata = {
    1: { title: "Margherita Pizza", desc: "Classic pizza with fresh mozzarella, basil, and tomato sauce.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/pizza.html" },

    2: { title: "Garlic Bread", desc: "Crispy bread toasted with butter, garlic, and herbs.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/burger&french,fries.html" },

    3: { title: "Pepperoni Pizza", desc: "Loaded with pepperoni and mozzarella cheese.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/cornspring.html" },

    4: { title: "Veggie Supreme", desc: "Peppers, mushrooms, olives, and onions on crispy crust.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/petro-bite&soup.html" },

    5: { title: "Coke", desc: "Cold, refreshing cola drink. Perfect with your pizza.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/crispy&pasta.html" },

    6: { title: "Cheesy Crust", desc: "Pizza with extra cheese in the crust. Mozzarella overload!", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/coffee&tea.html" },

    7: { title: "BBQ Chicken Pizza", desc: "Smoky BBQ sauce with grilled chicken and onions.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/chinese-chillis.html" },

    8: { title: "Feta & Spinach", desc: "Fresh spinach with feta cheese and olive oil drizzle.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/basmati-special.html" },

    9: { title: "Four Cheese", desc: "Blend of mozzarella, parmesan, cheddar, and ricotta.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/premum-noodles.html" },

    10: { title: "Spicy Jalapeño", desc: "Hot and fiery with jalapeños, red peppers, and spices.", images: ["banner/bg2.png", "banner/bg2.png", "banner/bg2.png"], link: "manu/sandwich.html" }

};

function makeSVGDataURI(label = "Item", bg = "#fff", accent = "#333") { var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='" + bg + "' stop-opacity='1'/><stop offset='1' stop-color='" + accent + "' stop-opacity='0.06'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><g><rect x='40' y='40' width='1120' height='620' rx='20' fill='rgba(255,255,255,0.04)'/><text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, Arial' font-size='54' fill='" + accent + "' font-weight='700'>" + escapeXML(label) + "</text></g></svg>"; return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg) }
function escapeXML(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') } const cardsContainer = document.getElementById('cardsContainer');
// Render menu cards into the target container (default `cardsContainer`).
// Each card may be wrapped in a link (if `item.link` exists) or be a non-clickable card.
function renderCards(containerId = 'cardsContainer') {
    const container = cardsContainer;
    if (!container) return;
    container.innerHTML = '';
    Object.keys(itemdata).forEach(key => {
        const item = itemdata[key];
        const card = document.createElement('div');
        card.className = 'card';

        const thumbHTML = item.images ? ("<img loading=\"lazy\" src=\"" + item.images[0] + "\" alt=\"" + item.title + "\">") : ("<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f5f5f5;color:#666;font-size:14px;font-weight:600;\">" + (item.text ? item.text[0] : '') + "</div>");
        card.innerHTML = "<div class=\"thumb\">" + thumbHTML + "</div><h3>" + item.title + "</h3><p>" + item.desc + "</p><div class=\"price\">" + item.price + "</div>";

        // If item has a link, wrap the card in an anchor so it navigates instead of opening the detail overlay
        if (item.link) {
            const a = document.createElement('a');
            a.href = item.link;
            a.style.display = 'block';
            a.style.textDecoration = 'none';
            a.style.color = 'inherit';
            a.appendChild(card);
            container.appendChild(a);
        } else {
            // no link — render non-clickable card (you can still add onclick if desired later)
            container.appendChild(card);
        }
    })
}
renderCards('cardsContainer');

let currentId = null, currentIndex = 0, slideTimer = null; const slidesEl = document.getElementById('slides'), dotsWrap = document.getElementById('dotsWrap'), prevBtn = document.getElementById('prevBtn'), nextBtn = document.getElementById('nextBtn');
// Show the detail view for the clicked item and initialize the slider.
function openCard(id) { document.getElementById("menuPage").style.display = "none"; document.getElementById("detailPage").style.display = "block"; currentId = id; currentIndex = 0; populateDetail(id); startAutoPlay() }

// Populate the detail panel with title, description, price and build slides/dots.
function populateDetail(id) { const item = itemdata[id]; if (!item) return; document.getElementById('crumb').innerText = 'Menu / ' + item.title; document.getElementById('detailTitle').innerText = item.title; document.getElementById('detailDesc').innerText = item.desc; document.getElementById('detailPrice').innerText = item.price || ''; document.getElementById('sideTitle').innerText = item.title; document.getElementById('sideText').innerText = item.desc; slidesEl.innerHTML = ''; dotsWrap.innerHTML = ''; const slideSource = item.images || item.text; slideSource.forEach((src, i) => { const s = document.createElement('div'); s.className = 'slide'; if (item.images) { s.innerHTML = "<img loading=\"lazy\" src=\"" + src + "\" alt=\"" + item.title + " image " + (i + 1) + "\">"; } else { s.innerHTML = "<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:320px;background:#f5f5f5;color:#666;font-size:18px;font-weight:600;\">" + src + "</div>"; } slidesEl.appendChild(s); const dot = document.createElement('div'); dot.className = 'dot' + (i === 0 ? ' active' : ''); dot.addEventListener('click', () => goToSlide(i)); dotsWrap.appendChild(dot) }); updateSlidePosition() }
function updateSlidePosition() { slidesEl.style.transform = "translateX(-" + (currentIndex * 100) + "%)"; Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === currentIndex)) }
function prevSlide() { currentIndex = (currentIndex - 1 + slidesEl.children.length) % slidesEl.children.length; updateSlidePosition(); resetAutoPlay() }
function nextSlide() { currentIndex = (currentIndex + 1) % slidesEl.children.length; updateSlidePosition(); resetAutoPlay() }
function goToSlide(i) { currentIndex = i; updateSlidePosition(); resetAutoPlay() }
function startAutoPlay() { clearInterval(slideTimer); slideTimer = setInterval(() => nextSlide(), 3500) }
function resetAutoPlay() { clearInterval(slideTimer); slideTimer = setTimeout(() => startAutoPlay(), 2800) }
function stopAutoPlay() { clearInterval(slideTimer) }
prevBtn.addEventListener('click', prevSlide); nextBtn.addEventListener('click', nextSlide);
let startX = 0, isDown = false; const sliderRoot = document.getElementById('sliderRoot');
sliderRoot.addEventListener('pointerdown', e => { isDown = true; startX = e.clientX || (e.touches && e.touches[0].clientX); stopAutoPlay() });
window.addEventListener('pointerup', e => { if (!isDown) return; isDown = false; const dx = (e.clientX || 0) - startX; if (dx > 40) prevSlide(); else if (dx < -40) nextSlide(); startAutoPlay() });
function goBack() { document.getElementById("detailPage").style.display = "none"; document.getElementById("menuPage").style.display = "block"; stopAutoPlay() }
// Temporary UI helper: notify user an item is added to cart (placeholder behavior)
function addToCart() { alert((itemdata[currentId]?.title || 'Item') + " added to your order!") }
window.addEventListener('resize', () => updateSlidePosition());

// Non-intrusive lazy-loading helper: set native loading="lazy" on images and iframes.
// This does not change src attributes or functionality — only adds the browser's
// native lazy-loading hint where it's missing. It also observes the DOM for
// images/iframes that are added later (e.g., inserted by JS) and sets loading.
(function () {
    function setLazy(el) {
        try {
            if (!el) return;
            var tag = (el.tagName || '').toUpperCase();
            if ((tag === 'IMG' || tag === 'IFRAME') && !el.hasAttribute('loading')) {
                el.setAttribute('loading', 'lazy');
            }
        } catch (e) {
            // ignore
        }
    }

    function enableNativeLazy() {
        try {
            // Set on existing images/iframes
            document.querySelectorAll('img,iframe').forEach(setLazy);

            // Observe DOM for added images/iframes and set loading attribute
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (m) {
                    m.addedNodes.forEach(function (node) {
                        if (node.nodeType !== 1) return;
                        // If the added node is an image/iframe
                        if (node.matches && node.matches('img,iframe')) {
                            setLazy(node);
                        } else {
                            // also check descendants
                            node.querySelectorAll && node.querySelectorAll('img,iframe').forEach(setLazy);
                        }
                    });
                });
            });
            observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
        } catch (e) {
            // silent fallback
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableNativeLazy);
    } else {
        enableNativeLazy();
    }
})();

