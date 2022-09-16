import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom"



const Product = ({ product }) => {
  return (
    <>
      <li key={product._id}>
        <div className="product">
          <Link to={`/product/${product._id}`}>
            <img style={{ borderRadius: "2px" }} src={product.image} alt={product.name} />
          </Link>

          {/* <div className="overlay "> */}
          {/* <Link  className="a"  to= {`/product/${product._id}`}>
                       <i  style={{height:"2rem", padding: "1.5rem 1.7rem", width:'2rem',marginLeft:"-.8rem"  
                      }} className="fa fa-info icon"></i>
                    </Link> */}
          {/* <Link  className="a"  to= {`/wishlist/${product._id}`}>
                       <i  style={{height:"2rem", padding:"1.5rem 1.7rem", width:'2rem', 
                      }} className="fa fa-heart icon"></i>
                    </Link> */}
          {/* {product.countInStock > 0 &&  */}
          {/* <Link  className="a"  to= {`/cart/${product._id}`}>
                       <i   style={{height:"2rem", padding:"1.5rem 1.7rem", width:'2rem', fontSize:"2rem", 
                      }} className="fa fa-cart-plus icon"></i>
                       </Link> */}
          {/* } */}

          {/* </div> */}

          <div className="icon1" style={{ position: "absolute" }} >
            -10%
          </div>
          <Link className="heart" style={{ position: "relative" }} to={`/wishlist/${product._id}`}>
            <i style={{
              height: "2rem", padding: "1.2rem 1.2rem", width: '2rem', fontSize: "2rem",
            }} className="fa fa-heart icon icon2"></i>
          </Link>

          <div className="product-name">
            <Link style={{ fontWeight: "bold", textTransform: "capitalize" }} to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </div>
         
          <div className="category-price">
            <div className="price">
              <div href="">₦{product.price.toLocaleString()}</div>
            </div>
          </div>
          <div >
            <Rating rating={product.rating} reviews={6}/>
          </div>

          <Link className="addToCartBtn" to={`/cart/${product._id}`}>Add To Cart</Link>

        </div>

      </li>

    </>
  )
};

export default Product;