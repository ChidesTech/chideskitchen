import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../redux-actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

const CartPage = (props) => {
    const prodId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch()
    useEffect(() => {
        if (prodId) {
            dispatch(addToCart(prodId, qty))
        }
    }, [dispatch, prodId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }



    const checkoutHandler = (id) => {
        props.history.push(`/login?redirect=delivery`)

    }
    return (<>
        <div className="content cart">
            <div className="cart-item">
                <ul className="cart-item-container">
                    <li>
                        <h1>Cart Items</h1>
                        <h3>Price(₦)</h3>
                    </li>
                    {cartItems.length === 0 ? <Popup>You Have No Item In Cart.</Popup> :
                        cartItems.map(item =>
                            <li key={item.product} className="it">
                                <div className="cart-img">
                                    <Link to={`/product/${item.product}`}>
                                        <img src={item.image} alt={item.name} />
                                    </Link>
                                </div>
                                <div className="cart-name">
                                    <div className="name">
                                        <Link className="cartname" to={`/product/${item.product}`}> {item.name}</Link>
                                    </div>
                                    <div className="quantity">
                                        <select className="selected-quantity" value={item.qty} onChange={(event) =>
                                            dispatch(addToCart(item.product, Number(event.target.value))
                                            )}>
                                            {[...Array(100).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                            }
                                        </select>
                                        <button type="button" className="deleteBtn" onClick={() => removeFromCartHandler(item.product)}>
                                            <img src="../trash-alt-solid.svg" style={{ height: "3rem", width: "2rem", marginTop: "-13px" }} alt="" /></button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    {item.price.toLocaleString()}
                                </div>

                            </li >
                        )
                    }


                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal of <span id="item-num">{cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)}</span>  Product(s)
      <div id="subtotal"> ₦{(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString()}</div>
                </h3>
                <button onClick={checkoutHandler}

                    className="btn" disabled={cartItems.length === 0}>
                    Checkout</button>

            </div>

        </div>

    </>
    )
};

export default CartPage;