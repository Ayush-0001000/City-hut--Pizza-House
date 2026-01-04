/* mocktail.js
    - Centralized data for Mocktails.
    - Pricing Logic: Organized by Section -> Variant (Normal vs Special).
*/

// 1. Mocktail Inventory
const mocktailCardsData = {
    1: { id: 1, title: "Cold Coffee", desc: "A chilled, creamy, and refreshing coffee treat.", images: ["../menu-img/mocktail-and-cold-delight/cold-coffee2.jpg", "../menu-img/mocktail-and-cold-delight/cold-coffee.jpg"], section: 1 },

    2: { id: 2, title: "Chocolate Milkshake", desc: " A rich, velvety shake for the chocolate enthusiast.", images: ["../menu-img/mocktail-and-cold-delight/chocolate-milk.jpg", "../menu-img/mocktail-and-cold-delight/chocolate-milk2.jpg"], section: 2 },
    
    3: { id: 3, title: "Orio Milkshake", desc: "A thick shake blended with crunchy chocolate sandwich cookies.", images: ["../menu-img/mocktail-and-cold-delight/orio-milk.jpg", "../menu-img/mocktail-and-cold-delight/orio-milk2.jpg"], section: 2 },
    
    4: { id: 4, title: "Butterscotch Shake", desc: "A sweet, buttery shake with a classic caramel-like flavor.", images: ["../menu-img/mocktail-and-cold-delight/butter-scotch.jpg", "../menu-img/mocktail-and-cold-delight/butter-scotch2.jpg"], section: 2 },
    
    5: { id: 5, title: "Vanila Milkshake", desc: "The timeless, smooth, and creamy classic.", images: ["../menu-img/mocktail-and-cold-delight/vanilla.jpg", "../menu-img/mocktail-and-cold-delight/vanilla2.jpg"], section: 3 },
    
    6: { id: 6, title: "strawberry Shake", desc: "A fruity and sweet favorite made with vibrant berries.", images: ["../menu-img/mocktail-and-cold-delight/strawberry-shake.jpg", "../menu-img/mocktail-and-cold-delight/strawberry-shake2.jpg"], section: 3 },
    
    7: { id: 7, title: "Pista Milkshake", desc: "A unique, nutty, and flavorful green-hued shake.", images: ["../menu-img/mocktail-and-cold-delight/pista-shake.jpg", "../menu-img/mocktail-and-cold-delight/pista-shake2.jpg"], section: 3 },
    
    8: { id: 8, title: "Masala Coke", desc: "A refreshing cola with a savory, spiced local twist.", images: ["../menu-img/mocktail-and-cold-delight/masalacoke.jpg", "../menu-img/mocktail-and-cold-delight/masalacoke2.jpg"], section: 4 },
    
    9: { id: 9, title: "Blue Lagoon", desc: "A striking blue, citrusy, and tropical non-alcoholic drink.", images: ["../menu-img/mocktail-and-cold-delight/blue-lagoon.jpg", "../menu-img/mocktail-and-cold-delight/blue-lagoon2.jpg"], section: 5 },
    
    10: { id: 10, title: "Virgin Mojito", desc: " A classic refreshing blend of mint and lime over ice.", images: ["../menu-img/mocktail-and-cold-delight/vrigin.jpg", "../menu-img/mocktail-and-cold-delight/vrigiN2.jpg"], section: 5 }
};

// Make it global
window.mocktailCardsData = mocktailCardsData;

// 2. Pricing System
// Logic: Section -> Variant (Normal or Special)
const mocktailMenu = {
    section1: {
        name: "Basic Refreshers",
        normal: '100',
        special: '120' // Special includes extra garnish or premium syrup
    },
    section2: {
        name: "Creamy & Frozen",
        normal: '120',
        special: '170' // Special includes whipped cream or extra fruit
    },
    section3: {
        name: "Premium Exotics",
        normal: '90',
        special: '140'
    },


   
    section4: {
        name: "Premium Exotics",
        normal: '50',
       
    },

    section5: {
        name: "Premium Exotics",
        normal: '100',
       
    }
};

window.mocktailMenu = mocktailMenu;