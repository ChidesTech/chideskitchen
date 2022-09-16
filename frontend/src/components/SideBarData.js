import React from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"





export  const UserSideBarData =[
    {title:"ChidesKitchen",
path:"/",
icon:<AiIcons.AiFillHome/>},

{title:"Top Categories",
path:"#",
 icon: <FaIcons.FaCartPlus/>,
iconClose:<RiIcons.RiArrowDownSFill/>,
iconOpen:<RiIcons.RiArrowUpSFill/>,
subNav:[
    {
        title:"Soup",
        path:"/cart",
        icon: <IoIcons.IoMdHelpCircle/>,
    },
    {
        title:"Rice",
        path:"/wishlist",
        icon: <FaIcons.FaCartPlus/>,
    },
    {
        title:"Swallow",
        path:"/order-history",
        icon: <IoIcons.IoMdHelpCircle/>,
    },
    {
        title:"Drinks",
        path:"/account",
        icon: <FaIcons.FaCartPlus/>,
    },
    {
        title:"Snacks",
        path:"/account",
        icon: <FaIcons.FaCartPlus/>,
    },
]


},


]

export  const AdminSideBarData =[
    {name:"ChidesKitchen",
path:"/",
icon:<AiIcons.AiFillHome/>},
   
    {name:"Dashboard",
path:"/dashboard",
icon:<span  className="far fa-calendar-alt"/>},
    {name:"Users",
path:"/users",
icon:<span  className="fa fa-users"/>},
   
    {name:"Categories",
path:"/category-list",
icon:<span  className="fa fa-clipboard"/>},
 {name:"Products",
path:"/product-list",
icon:<span  className="fa fa-shopping-cart"/>},
    {name:"Orders",
path:"/order-list",
icon:<span  className="fa fa-clipboard"/>},
//     {name:"Reservations",
// path:"/reservation-list",
// icon:<span  className="fa fa-clipboard"/>},
    {name:"Customer Support",
path:"/support",
icon:<IoIcons.IoMdHelpCircle/>},


]
// export  const AdminSideBarData =[
//     {name:"ChidesKitchen",
// path:"/",
// icon:<AiIcons.AiFillHome/>},

// {title:"Administrator",
// path:"#",
//  icon: <FaIcons.FaCartPlus/>,
// iconClose:<RiIcons.RiArrowDownSFill/>,
// iconOpen:<RiIcons.RiArrowUpSFill/>,
// subNav:[
//     {
//         title:"Dashboard",
//         path:"/dashboard",
//         icon: <IoIcons.IoMdHelpCircle/>,
//     },
//     {
//         title:"Users",
//         path:"/users",
//         icon: <FaIcons.FaCartPlus/>,
//     },
//     {
//         title:"Products",
//         path:"/product-list",
//         icon: <IoIcons.IoMdHelpCircle/>,
//     },
//     {
//         title:"Orders",
//         path:"/orders",
//         icon: <FaIcons.FaCartPlus/>,
//     },
//     {
//         title:"Customer Support",
//         path:"/support",
//         icon: <FaIcons.FaCartPlus/>,
//     },
// ]


// },


// ]

