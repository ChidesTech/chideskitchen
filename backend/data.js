const bcrypt = require("bcryptjs");

module.exports = data = {
    users:[
        {name: "Desmond",
         email: "dnwosu008@gmail.com",
         password: bcrypt.hashSync("des", 8),
         isAdmin: true,
         isSuper: true,

    },
        {name: "Des",
         email: "des@des.com",
         password: bcrypt.hashSync("des", 8),
         isAdmin: true,
         isSuper: false

    },
        {name: "Fr",
         email: "fr@fr.com",
         password: bcrypt.hashSync("fr", 8),
         isAdmin: false,
         isSuper: false

    },
    
        {name: "Be",
         email: "be@be.com",
         password: bcrypt.hashSync("be", 8),
         isAdmin: false,
         isSuper: true

    }
    ],
    categories:[
        {name: "yes"},
        {name: "no"},
        {name: "es"},
        {name: "gh"},
        {name: "ehhhnhs"},
        {name: "ejhks"},
],

    products:[
        {
         name: "Jollof Rice",
         category: "Rice",
         image: "/images/sweatshirt.jpg",
         rating:0,
         numReviews:0,
         countInStock:10,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 1600
    },
        {
         name: "Egusi Soup",
         category: "Soup",
         image: "/images/product.jpg",
         rating:0,
         numReviews:0,
         countInStock:10,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 2000
    },
        {
         name: "Yam And Egg Sauce",
         category: "Tubers",
         image: "/images/roller.jpg",
         rating:0,
         numReviews:0,
         countInStock:10,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 1500
    },
        {
         name: "Yam Porridge",
         category: "Tubers",
         image: "/images/rollerskates.jpg",
         rating:0,
         numReviews:0,
         countInStock:10,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 1500
    },
        {
         name: "Smoothie",
         category: "Drinks",
         image: "/images/leopard.jpg",
         rating:0,
         numReviews:0,
         countInStock:10,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 1500
    },
        {
         name: "Shawarma",
         category: "Snacks",
         image: "/images/phone.jpg",
         rating:0,
         numReviews:0,
         countInStock:0,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 1700
    },
        {
         name: "Fried Rice",
         category: "Rice",
         image: "/images/roller.jpg",
         rating:0,
         numReviews:0,
         countInStock:0,
         description:"Lorem ipsum sit dolor nwet  cologirum gity unibulasti",
         price: 2100
    },
    ]
}




