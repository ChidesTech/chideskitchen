import React, { useEffect } from 'react';
import styled from '@emotion/styled'
import { Link, useParams } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
// import * as RiIcons from "react-icons/ri";
import { useState } from 'react';
// import {UserSideBarData} from './SideBarData';
import { AdminSideBarData } from './SideBarData';
import SideBarSubMenu from './SideBarSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../redux-actions/productActions';
import SideBarSubMenuUser from './SideBarSubMenuUser';

const Nav = styled.div`
background: orangered;
// height: 4.5rem;
display: flex;
justify-content: flex-start;
align-items:center;


`;
const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2.5rem;
color: orangered;
.closeIcon{
    margin-top:1rem;
     font-size:2.7rem;
    //   padding:0 2rem;
    //   background-color:orangered;
       border-radius:29px 10px 10px 29px;
        font-weight:bold;
        margin-left:80%;
        margin-bottom:1.7rem;
 }
`;
const SideBarNav = styled.nav`
background:white;
width:300px;
 position: fixed;
 overflow:scroll;
z-index:3;
// min-height:100vh;
height: 100%;
display: flex;
justify-content: center;
top:0;
   left:${({ sidebar }) => (sidebar ? '0' : "-100%")};
   transition: 350ms;




 @media(max-width:600px){
      width:75%;
     height:150%;
      
      .closeIcon{
        margin-top:1rem;
         font-size:3rem;
        //   padding:0 2rem;
           border-radius:29px 10px 10px 29px;
            font-weight:bold;
            margin-bottom:0;
     }

 }

`;
const SideBarWrap = styled.div`
width: 100%

`;

const Sidebar = (props) => {
    const [sideBar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sideBar);
    const userSignin = useSelector(state => state.userSignin);
    const categoryList = useSelector(state => state.categoryList);
    const { loading, categories } = categoryList;
    const {name = "all", pageNumber=1, category="all"} = useParams();

    const dispatch = useDispatch();

    const { userInfo } = userSignin;
    useEffect(() => {
        dispatch(listCategories())
       
    }, [dispatch])

    const UserSideBarData = [
        {
            name: "ChidesKitchen",
            path: "/",
            icon: <AiIcons.AiFillHome />
         },

    
    
    ]
    const getFilterUrl =(filter)=>{
        const filterPage =  filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/product/${filterName}/pageNumber/${filterPage}`
    
    }
    

    return (<>
        <Nav>
            <NavIcon to="#">
                <FaIcons.FaBars style={{ color: "white" }} onClick={showSideBar} />
            </NavIcon>
        </Nav>
        <SideBarNav sidebar={sideBar}>
            <SideBarWrap>
                <NavIcon to="#">
                    <AiIcons.AiOutlineClose className="closeIcon" onClick={showSideBar} />
                </NavIcon>

                {userInfo && userInfo.isAdmin ?

                    (
                        AdminSideBarData.map((item, index) => {
                            return <SideBarSubMenu item={item} key={index}>
                                {item.icon}
                            </SideBarSubMenu>

                        })) :

                    (
                       loading?  UserSideBarData.map((item, index) => {
                        return <SideBarSubMenu  item={item} key={index}>
                          
                        </SideBarSubMenu>

                    }): 
                    
                   categories && categories.map((c, index) => {
                            return (<>
                            

                            <SideBarSubMenuUser url={getFilterUrl({category: c.name})} item={c} key={index}>
                            <IoIcons.IoMdHelpCircle />
                            </SideBarSubMenuUser>
</>)
                        }))


                }
            </SideBarWrap>
        </SideBarNav>
    </>
    )
}

export default Sidebar