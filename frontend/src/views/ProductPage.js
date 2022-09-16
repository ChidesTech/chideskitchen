import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../components/Popup";
import { useEffect } from "react";
import { createReview, detailsProduct, listProducts } from "../redux-actions/productActions";
import { LinearProgress } from "@material-ui/core";
import { REVIEW_CREATE_RESET } from "../redux-constants/productConstants";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import styled from '@emotion/styled';
import "swiper/swiper-bundle.min.css";
import Swal from "sweetalert2";
// import CategoryItem from '../components/CategoryItem';

SwiperCore.use([Navigation, Autoplay]);

const ProductPageStyles = styled.div`
padding:  0;

// display: flex;
// flex-direction: column;
.project-items{
  display: flex;
  gap:3rem;
  margin-top: 5rem;
  
 
}
.container{
    padding: 0 1rem;
}
.center{
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 10rem;
 
}
.swiper-container{
  padding-top: 8rem;
  max-width:100%

}

.swiper-button-prev,
.swiper-button-next{
  position: absolute;
  height: 50px;
  width: 50px;
//  background-color: orangered;
  z-index:18;
  right: 60px;
  left: auto;
  top: 23vh;
  transform: translateY(50%);
   color:white;
   border-radius:8px;
   text-shadow: 3px 1px 1px orangered
}

.swiper-button-next{
  right:0;
  

}
.swiper-button-prev{
 left:0
 

}
.swiper-button-prev::after,
.swiper-button-next::after{
  font-size: 2rem;
  font-weight: bolder;
}
@media only screen and (max-width: 768px){
  .project-items{
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 7rem;
    gap: 5rem;
    .project-img{
      width:100% 
    }
  }
  .swiper-button-prev,
.swiper-button-next{
  position: absolute;
  height: 40px;
  width: 40px;
   background-color: transparent;
  z-index:10;
  right: 60px;
  left: auto;
  top: 8.5rem;
  transform: translateY(50%);
   color:white;
   border-radius:3px;
   text-shadow:none;
  font-weight: bolder;
  z-index:2;
  text-shadow:1px 0 1px blue;

   
}
 .swiper-button-next{
     right:0;
   }
   .swiper-button-prev{
     left:0
    
   
    }
   .swiper-button-prev::after,
.swiper-button-next::after{
  font-size: 2rem;
  font-weight: bolder;
  opacity:1;
}
}
`

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const prodId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const productList = useSelector((state) => state.productList);
  const { error: errorList, products,
    // pages, page,
    loading: loadingList } = productList;
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const reviewCreate = useSelector(state => state.reviewCreate);
  const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate } = reviewCreate;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {

    if (successReviewCreate) {
      Swal.fire("Done", "Your review has been added successfully", "success");
      setRating("")
      setComment("")
      dispatch({ type: REVIEW_CREATE_RESET })
    }
    dispatch(detailsProduct(prodId));
    dispatch(listProducts({}))


  }, [dispatch, prodId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${prodId}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(createReview(prodId, { rating, comment, name: userInfo.name }))
    } else {
      Swal.fire("Error", "Please add a rating and a comment", "error");
    }
  }
  return (<ProductPageStyles>
    {loading ?
      <LinearProgress
        style={{ margin: "15% 30%", height: "2rem" }}

      /> :
      error ? <Popup variant="danger">{error}</Popup> :
        <div className="content">
          {/* <div className="back">
        <Link to="/">Go Back</Link>
        </div> */}
          <div className="details">
            <div className="image-details">
              {/* <img src={`images/${product.image}`} alt={product.name}/> */}
              <img src={product.image} alt={product.name} />
            </div>
            <div className="info-details">
              <ul>
                <li><h1>{product.name}</h1></li>
                <li> <Rating rating={product.rating} reviews={product.numReviews} /></li>
                <li><h2><strong>₦{product.price.toLocaleString()}</strong></h2></li>
                <li><strong>Details</strong><div>{product.description}</div></li>
              </ul>
            </div>
            <div className="action-details">
              <ul>

                <li>Availability: {product.countInStock > 0 ? <span className="success">Still In Stock </span> :
                  <span className="error">Out Of Stock</span>}
                </li>
                {
                  //  product.countInStock>0 && 
                  (
                    <>
                      <li className="quantity">
                        Quantity: <span>
                          <select className="quantity selected-quantity" value={qty} onChange={event => setQty(event.target.value)}>
                            {
                              [...Array(100).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))
                            }
                          </select>
                        </span>
                      </li>
                      <li style={{ display: "flex", gap: "4rem", marginTop: "3rem", marginBottom: "-2.5rem" }}>
                        <li><Link id="add-btn" to={`/wishlist/${prodId}`} className="btn">Save Item</Link></li>
                        <li><button id="add-btn" onClick={addToCartHandler} className="btn">Add To Cart</button></li>
                      </li>
                    </>

                  )}
              </ul>
            </div>
          </div>
          <br />
          <div id="reviews">
            <h3 style={{ marginLeft: "1rem", fontSize: "2.5rem", color: "orangered", textShadow: "1px 1px 1px black" }}>Customer Reviews</h3>
  
            {product.reviews.length === 0 && <Popup>No review for this product.</Popup>}
            <ul>
              {
                product.reviews.map(review => {
                  return (<>
                    <li key={review._id}  >
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><strong>{review.name}</strong>

                        <div style={{ fontSize: ".1rem" }}><Rating rating={review.rating} ></Rating></div>

                      </div>
                      <p>{review.comment}</p>
                      <p>{review.createdAt.substring(0, 10)}</p>

                    </li>
                  </>)
                })}
              <li style={{ marginLeft: "-4rem", }}>
                {userInfo ?
                  <form action="" onSubmit={submitHandler} className="form">
                    <div><h3 className="text-center" style={{ color: "orangered", textShadow: "1px 1px 1px black" }}>review and rating</h3> </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <div><label style={{ color: 'orangered' }} htmlFor="rating">Rating <i className="fa fa-star"></i></label></div>
                      <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "orangered" }} >
                        <input  onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value="1" />1
                        <input style={{marginLeft:".5rem"}} onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value="2" />2
                        <input style={{marginLeft:".5rem"}} onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value="3" />3
                        <input style={{marginLeft:".5rem"}} onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value="4" />4
                        <input style={{marginLeft:".5rem"}} onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value="5" />5
                      </div>
                    </div>
                    <div>
                      <label style={{ color: "orangered" }} htmlFor="comment">Comment <i className="fa fa-edit"></i></label>
                      <textarea style={{ border: "2px solid orangered" }} name="" value={comment} id="" onChange={(e) => setComment(e.target.value)} cols="30" rows="3"></textarea>
                    </div>

                    <div><label htmlFor=""></label>
                      <button className="btn">Submit</button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LinearProgress
                        style={{ margin: "1% 30%" }}


                      />}
                      {errorReviewCreate &&
                        <Popup variant="danger">{errorReviewCreate}</Popup>
                      }
                    </div>
                  </form> :
                  (<Popup> <a style={{ fontWeight: "bolder", color: "orangered" }} href="/login">Login</a> to submit a review</Popup>)}
              </li>




            </ul>
          </div>

        </div>
    }

    <h2 style={{ textAlign: "center", marginTop: "4rem", marginBottom: "-9rem", color: "orangered", textShadow: "1px 0 0 black" }}>Product Gallery </h2>


    <div className="container">
      <div className="project-items">
        <Swiper spaceBetween={10} slidesPerView={1} navigation
          breakpoints={
            {
              640: {
                //when >=640px
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 4
              },
              1200: {
                slidesPerView: 5
              }
            }
          }
        >
          {loadingList ? <div>Loading</div> : errorList ? "" : products.map((c, index) => {
            //  if(c._id === product._id) return null;
            return (<>

              <SwiperSlide navigation key={index}>
                <Link to={`/product/${c._id}`}>
                  <img style={{ width: "100%", height: "30vh", borderRadius: "3px" }} src={c.image} alt="" />
                </Link>


              </SwiperSlide>

            </>
            )


          })}
        </Swiper>
      </div>
    </div>

  </ProductPageStyles>


  )
};

export default ProductPage;