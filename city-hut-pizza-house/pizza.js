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
    1: { id: 1, title: "Cloude 9 Pizza", desc: "Fresh mozzarella, basil, and tomato sauce — a classic Margherita.", description: "Fresh mozzarella, basil, and tomato sauce — a classic Margherita.", images: ["../menu-img/section-1/cloude-2.jpg", "../menu-img/section-1/cloude-1.jpg"], section: 1, typeId: 'pizzaType1' },


    2: { id: 2, title: "Veggie House pizza", desc: "Seasonal vegetables (bell peppers, olives, onions, tomatoes) with melted mozzarella.", description: "Seasonal vegetables (bell peppers, olives, onions, tomatoes) with melted mozzarella.", images: ["../menu-img/section-2/veggie-house-pizza.jpg", "../menu-img/section-2/veggie-house-pizza2.jpg"], section: 2, typeId: 'pizzaType1' },

    3: { id: 3, title: "Farm House Pizza", desc: "Crisp peppers, mushrooms, olives, and red onions on a herbed tomato base.", description: "Crisp peppers, mushrooms, olives, and red onions on a herbed tomato base.", images: ["../menu-img/section-2/farm-house-pizza.jpg", "../menu-img/section-2/farm-house-pizza2.jpg"], section: 2, typeId: 'pizzaType1' },


    4: { id: 4, title: "Pery2 Fries Pizza", desc: "Smoky BBQ sauce topped with corn, bell peppers and crispy potato fries.", description: "Smoky BBQ sauce topped with corn, bell peppers and crispy potato fries.", images: ["../menu-img/section-2/pery2-fries-pizza.jpg", "../menu-img/section-2/pery2-fries-pizza2.jpg"], section: 2, typeId: 'pizzaType1' },


    5: { id: 5, title: "Paneer Tikka Pizza", desc: "Tandoori paneer cubes, onions, and capsicum with a spiced tikka sauce and mozzarella.", description: "Tandoori paneer cubes, onions, and capsicum with a spiced tikka sauce and mozzarella.", images: ["../menu-img/section-2/paneer-tikka.jpg", "../menu-img/section-2/paneer-tikka2.jpg"], section: 2, typeId: 'pizzaType2' },

    6: { id: 6, title: "Pery Pery Paneer Pizza", desc: "Spicy paneer cubes and a four-cheese blend with chili flakes and herbs.", description: "Spicy paneer cubes and a four-cheese blend with chili flakes and herbs.", images: ["../menu-img/section-2/pery-pery-paneer.jpg", "../menu-img/section-2/pery-pery-paneer2.jpg"], section: 2, typeId: 'pizzaType2' },

    7: { id: 7, title: "Butter Paneer Pizza", desc: "Creamy butter paneer with mild spices, fenugreek, and melted mozzarella.", description: "Creamy butter paneer with mild spices, fenugreek, and melted mozzarella.", images: ["../menu-img/section-2/butter-paneer.jpg", "../menu-img/section-2/butter-paneer2.jpg"], section: 2, typeId: 'pizzaType2' },


    8: { id: 8, title: "Pery Pery Mushroom Pizza", desc: "Spicy sautéed mushrooms with garlic, chili flakes, and melted cheese.", description: "Spicy sautéed mushrooms with garlic, chili flakes, and melted cheese.", images: ["../menu-img/section-2/pery-pery-mushroom.jpg", "../menu-img/section-2/pery-pery-mushroom2.jpg"], section: 2, typeId: 'pizzaType2' },


    9: { id: 9, title: "Butter Mushroom Pizza", desc: "Sautéed mushrooms in garlic butter with a drizzle of truffle oil and herbs.", description: "Sautéed mushrooms in garlic butter with a drizzle of truffle oil and herbs.", images: ["../menu-img/section-2/butter-mushroom.jpg", "../menu-img/section-2/butter-mushroom2.jpg"], section: 2, typeId: 'pizzaType3' },


    10: { id: 10, title: "Chinese Baby Corn pizza", desc: "Stir-fried baby corn, bell peppers, and spring onion with a tangy soy-chili glaze.", description: "Stir-fried baby corn, bell peppers, and spring onion with a tangy soy-chili glaze.", images: ["../menu-img/section-2/chineese-corn.jpg", "../menu-img/section-2/chineese-corn2.jpg"], section: 2, typeId: 'pizzaType3' },


    11: { id: 11, title: "corn deluxe pizza", desc: "Sweet corn, bell peppers, olives, and a creamy cheese topping.", description: "Sweet corn, bell peppers, olives, and a creamy cheese topping.", images: ["../menu-img/section-2/corn-deluxe.jpg", "../menu-img/section-2/corn-deluxe2.jpg"], section: 2, typeId: 'pizzaType3' },


    12: { id: 12, title: "cheese N Corn pizza", desc: "Sweet corn with a three-cheese blend, broccoli, and bell peppers.", description: "Sweet corn with a three-cheese blend, broccoli, and bell peppers.", images: ["../menu-img/section-3/cheese-n-corn.jpg", "../menu-img/section-3/cheese-n-corn2.jpg"], section: 3, typeId: 'pizzaType3' },

    13: { id: 13, title: "Fresh Paneer Pizza", desc: "Fresh paneer cubes, bell peppers, and onions with a spiced tomato base.", description: "Fresh paneer cubes, bell peppers, and onions with a spiced tomato base.", images: ["../menu-img/section-3/fresh-paneer.jpg", "../menu-img/section-3/fresh-paneer2.jpg"], section: 3, typeId: 'pizzaType4' },

    14: { id: 14, title: "Fresh Mushroom Pizza", desc: "Fresh mushrooms with garlic butter, herbs, and melted mozzarella.", description: "Fresh mushrooms with garlic butter, herbs, and melted mozzarella.", images: ["../menu-img/section-3/mushroom-pizza.jpg", "../menu-img/section-3/mushroom-pizza2.jpg"], section: 3, typeId: 'pizzaType4' },


    15: { id: 15, title: "Plain cheese Pizza", desc: "Classic mozzarella cheese on a crisp, golden crust.", description: "Classic mozzarella cheese on a crisp, golden crust.", images: ["../menu-img/section-4/plain-cheese.jpg", "../menu-img/section-4/plain-cheese2.jpg"], section: 4, typeId: 'pizzaType4' },

    16: { id: 16, title: "Onion Pizza", desc: "Caramelized onions with extra cheese stuffed in the crust for a rich finish.", description: "Caramelized onions with extra cheese stuffed in the crust for a rich finish.", images: ["../menu-img/section-4/onion-pizza.jpg", "../menu-img/section-4/onion-pizza2.jpg"], section: 5, typeId: 'pizzaType4' },


    17: { id: 17, title: "Tamato Pizza", desc: "Sliced tomatoes, black olives, and red onions on a crispy base with basil.", description: "Sliced tomatoes, black olives, and red onions on a crispy base with basil.", images: ["../menu-img/section-4/tamato-pizza.jpg", "../menu-img/section-4/tamato-pizza2.jpg"], section: 5, typeId: 'pizzaType1' },


    18: { id: 18, title: "Achari Do pyaza Pizza", desc: "Tangy achari spices with double onions and melted mozzarella for a zesty bite.", description: "Tangy achari spices with double onions and melted mozzarella for a zesty bite.", images: ["../menu-img/section-4/achari-pizza.jpg", "../menu-img/section-4/achari-pizza2.jpg"], section: 5, typeId: 'pizzaType2' }
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

