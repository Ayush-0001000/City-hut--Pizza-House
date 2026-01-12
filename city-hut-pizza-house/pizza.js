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
    1: { id: 1, title: "Cloude 9 Pizza", desc: "Fresh mozzarella, basil, and tomato sauce.", images: ["../menu-img/section-1/cloude-2.jpg", "../menu-img/section-1/cloude-1.jpg"], section: 1, typeId: 'pizzaType1' },


    2: { id: 2, title: "Veggie House pizza", desc: "Classic pepperoni with mozzarella cheese.", images: ["../menu-img/section-2/veggie-house-pizza.jpg", "../menu-img/section-2/veggie-house-pizza2.jpg"], section: 2, typeId: 'pizzaType1' },

    3: { id: 3, title: "Farm House Pizza", desc: "Peppers, mushrooms, olives, and onions.", images: ["../menu-img/section-2/farm-house-pizza.jpg", "../menu-img/section-2/farm-house-pizza2.jpg"], section: 2, typeId: 'pizzaType1' },


    4: { id: 4, title: "Pery2 Fries Pizza", desc: "Smoky BBQ sauce with grilled chicken.", images: ["../menu-img/section-2/pery2-fries-pizza.jpg", "../menu-img/section-2/pery2-fries-pizza2.jpg"], section: 2, typeId: 'pizzaType1' },


    5: { id: 5, title: "Paneer Tikka Pizza", desc: "Garlic, herbs, and mozzarella blend.", images: ["../menu-img/section-2/paneer-tikka.jpg", "../menu-img/section-2/paneer-tikka2.jpg"], section: 2, typeId: 'pizzaType2' },

    6: { id: 6, title: "Pery Pery Paneer Pizza", desc: "Blend of mozzarella, cheddar, feta, and parmesan.", images: ["../menu-img/section-2/pery-pery-paneer.jpg", "../menu-img/section-2/pery-pery-paneer2.jpg"], section: 2, typeId: 'pizzaType2' },

    7: { id: 7, title: "Butter Paneer Pizza", desc: "Hot and fiery with jalapeños and red peppers.", images: ["../menu-img/section-2/butter-paneer.jpg", "../menu-img/section-2/butter-paneer2.jpg"], section: 2, typeId: 'pizzaType2' },


    8: { id: 8, title: "Pery Pery Mushroom Pizza", desc: "Fresh spinach with feta cheese and olive oil.", images: ["../menu-img/section-2/pery-pery-mushroom.jpg", "../menu-img/section-2/pery-pery-mushroom2.jpg"], section: 2, typeId: 'pizzaType2' },


    9: { id: 9, title: "Butter Mushroom Pizza", desc: "Earthy mushrooms with truffle oil and herbs.", images: ["../menu-img/section-2/butter-mushroom.jpg", "../menu-img/section-2/butter-mushroom2.jpg"], section: 2, typeId: 'pizzaType3' },
   
   
    10: { id: 10, title: "Chinese Baby Corn pizza", desc: "Tomatoes, olives, capers, artichokes, and herbs.", images: ["../menu-img/section-2/chineese-corn.jpg", "../menu-img/section-2/chineese-corn2.jpg"], section: 2, typeId: 'pizzaType3' },


    11: { id: 11, title: "corn deluxe pizza", desc: "Fresh shrimp, calamari, and mussels blend.", images: ["../menu-img/section-2/corn-deluxe.jpg", "../menu-img/section-2/corn-deluxe2.jpg"], section: 2, typeId: 'pizzaType3' },


    12: { id: 12, title: "cheese N Corn pizza", desc: "Broccoli, zucchini, bell peppers, and tomatoes.", images: ["../menu-img/section-3/cheese-n-corn.jpg", "../menu-img/section-3/cheese-n-corn2.jpg"], section: 3, typeId: 'pizzaType3' },

    13: { id: 13, title: "Fresh Paneer Pizza", desc: "Pepperoni, sausage, ham, and bacon blend.", images: ["../menu-img/section-3/fresh-paneer.jpg", "../menu-img/section-3/fresh-paneer2.jpg"], section: 3, typeId: 'pizzaType4' },

    14: { id: 14, title: "Fresh Mushroom Pizza", desc: "Spicy buffalo sauce with grilled chicken pieces.", images: ["../menu-img/section-3/mushroom-pizza.jpg", "../menu-img/section-3/mushroom-pizza2.jpg"], section: 3, typeId: 'pizzaType4' },


    15: { id: 15, title: "Plain cheese Pizza", desc: "Pineapple, ham, and mozzarella combination.", images: ["../menu-img/section-4/plain-cheese.jpg", "../menu-img/section-4/plain-cheese2.jpg"], section: 4, typeId: 'pizzaType4' },

    16: { id: 16, title: "Onion Pizza", desc: "Pizza with extra cheese stuffed in the crust.", images: ["../menu-img/section-4/onion-pizza.jpg", "../menu-img/section-4/onion-pizza2.jpg"], section: 5, typeId: 'pizzaType4' },
   
   
    17: { id: 17, title: "Tamato Pizza", desc: "Black olives, onions, and tomatoes on crispy base.", images: ["../menu-img/section-4/tamato-pizza.jpg", "../menu-img/section-4/tamato-pizza2.jpg"], section: 5, typeId: 'pizzaType1' },


    18: { id: 18, title: "Achari Do pyaza Pizza", desc: "Ricotta, mozzarella, and fresh herbs without tomato.", images: ["../menu-img/section-4/achari-pizza.jpg", "../menu-img/section-4/achari-pizza2.jpg"], section: 5, typeId: 'pizzaType2' }
};

window.pizzaCardsData = pizzaCardsData;

// Pizza Pricing System - Scalable Structure
const pizzaMenu = {
    section1: {
        name: "Section 1",
        pan: {
            regular: 200,
            medium: 300,
            large: 400
        },
        cheeseBurst: {
            regular: 300,
            medium: 460,
            large: 600
        }
    },
    section2: {
        name: "Section 2",
        pan: {
            regular: 170,
            medium: 260,
            large: 330
        },
        cheeseBurst: {
            regular: 300,
            medium: 460,
            large: 600
        }
    },
    section3: {
        name: "Section 3",
        pan: {
            regular: 150,
            medium: 240,
            large: 310
        },
        cheeseBurst: {
            regular: 290,
            medium: 430,
            large: 580
        }
    },
    section4: {
        name: "Section 4",
        pan: {
            regular: 89,
            medium: "not avilable",
            large: "not avilable"
        },
        cheeseBurst: {
            regular: "not avilable",
            medium: "not avilable",
            large: "not avilable"
        }
    },
    section5: {
        name: "Section 4",
        pan: {
            regular: 100,
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

