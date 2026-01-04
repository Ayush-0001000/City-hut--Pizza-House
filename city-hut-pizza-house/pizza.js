/*
    pizza.js - centralized pizza data and pricing model
    - `pizzaCardsData`: master list of pizza items used by `manu/pizza.html`.
        Each pizza entry contains: `id`, `title`, `desc`, `images`, `section` (1-4), and `typeId`.
    - `pizzaMenu` / `pizzaTypes`: scalable pricing structure organized by section -> crust -> size.
    - Exposes globals: `window.pizzaCardsData`, `window.pizzaMenu`, and `window.pizzaTypes`.
    - Consumers:
        * `manu/pizza.html` reads `pizzaCardsData` to render cards and to determine default section for a pizza.
        * `menu.js` may look up `window.pizzaCardsData` to match a menu item to its pizza section.
*/
// Pizza Cards Data with Section IDs
const pizzaCardsData = {
    1: { id: 1, title: "Margherita Pizza", desc: "Fresh mozzarella, basil, and tomato sauce.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 1, typeId: 'pizzaType1' },
    2: { id: 2, title: "Pepperoni Pizza", desc: "Classic pepperoni with mozzarella cheese.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType1' },
    3: { id: 3, title: "Veggie Supreme", desc: "Peppers, mushrooms, olives, and onions.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType1' },
    4: { id: 4, title: "BBQ Chicken Pizza", desc: "Smoky BBQ sauce with grilled chicken.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType1' },
    5: { id: 5, title: "Garlic Bread Pizza", desc: "Garlic, herbs, and mozzarella blend.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType2' },
    6: { id: 6, title: "Four Cheese Pizza", desc: "Blend of mozzarella, cheddar, feta, and parmesan.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType2' },
    7: { id: 7, title: "Spicy Jalapeño Pizza", desc: "Hot and fiery with jalapeños and red peppers.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType2' },
    8: { id: 8, title: "Feta & Spinach Pizza", desc: "Fresh spinach with feta cheese and olive oil.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType2' },
    9: { id: 9, title: "Mushroom Truffle Pizza", desc: "Earthy mushrooms with truffle oil and herbs.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType3' },
    10: { id: 10, title: "Mediterranean Mix", desc: "Tomatoes, olives, capers, artichokes, and herbs.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType3' },
    11: { id: 11, title: "Seafood Pizza", desc: "Fresh shrimp, calamari, and mussels blend.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 2, typeId: 'pizzaType3' },
    12: { id: 12, title: "Veggie Delight", desc: "Broccoli, zucchini, bell peppers, and tomatoes.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 3, typeId: 'pizzaType3' },
    13: { id: 13, title: "Meat Lovers", desc: "Pepperoni, sausage, ham, and bacon blend.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 3, typeId: 'pizzaType4' },
    14: { id: 14, title: "Buffalo Chicken", desc: "Spicy buffalo sauce with grilled chicken pieces.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 3, typeId: 'pizzaType4' },
    15: { id: 15, title: "Hawaiian Pizza", desc: "Pineapple, ham, and mozzarella combination.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 4, typeId: 'pizzaType4' },
    16: { id: 16, title: "Cheesy Crust", desc: "Pizza with extra cheese stuffed in the crust.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 4, typeId: 'pizzaType4' },
    17: { id: 17, title: "Black Olives Pizza", desc: "Black olives, onions, and tomatoes on crispy base.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 4, typeId: 'pizzaType1' },
    18: { id: 18, title: "White Pizza", desc: "Ricotta, mozzarella, and fresh herbs without tomato.", images: ["../banner/bg2.png", "../banner/bg2.png", "../banner/bg2.png"], section: 4, typeId: 'pizzaType2' }
};

window.pizzaCardsData = pizzaCardsData;

// Pizza Pricing System - Scalable Structure
const pizzaMenu = {
    section1: {
        name: "Section 1",
        pan: {
            regular: 99,
            medium: 199,
            large: 299
        },
        cheeseBurst: {
            regular: 149,
            medium: 249,
            large: 349
        }
    },
    section2: {
        name: "Section 2",
        pan: {
            regular: 129,
            medium: 229,
            large: 329
        },
        cheeseBurst: {
            regular: 179,
            medium: 279,
            large: 379
        }
    },
    section3: {
        name: "Section 3",
        pan: {
            regular: 159,
            medium: 259,
            large: 359
        },
        cheeseBurst: {
            regular: 209,
            medium: 309,
            large: 409
        }
    },
    section4: {
        name: "Section 4",
        pan: {
            regular: 189,
            medium: "not avilable",
            large: "not avilable"
        },
        cheeseBurst: {
            regular: "not avilable",
            medium: "not avilable",
            large: "not avilable"
        }
    }
};

// Legacy structure for backward compatibility
const panPizza = {
    section1: pizzaMenu.section1.pan,
    section2: pizzaMenu.section2.pan,
    section3: pizzaMenu.section3.pan,
    section4: pizzaMenu.section4.pan
};

const cheesePizza = {
    section1: pizzaMenu.section1.cheeseBurst,
    section2: pizzaMenu.section2.cheeseBurst,
    section3: pizzaMenu.section3.cheeseBurst,
    section4: pizzaMenu.section4.cheeseBurst
};

const pizzaTypes = {
    pan: panPizza,
    cheese: cheesePizza
};

window.pizzaTypes = pizzaTypes;
window.pizzaMenu = pizzaMenu;

