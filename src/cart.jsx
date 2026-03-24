import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQuantity, increaseQuantity, removeCart} from './cartSlice';
import {ToastContainer , toast } from 'react-toastify';
import { applyCoupon, resetCoupon } from './couponSlice';
import {QRCode} from "react-qr-code";
import { addOrder } from './orderSlice';
import "./Cart.css";
import emailjs from "@emailjs/browser";

function Cart() {
    let dispatch =useDispatch();
    let cartItems=useSelector(state=>state.cart)
    let [discountPer,setDiscountPer]=useState(0);
    let [input,setInput]=useState("");

    const totalAmount=cartItems.reduce(
      (total,item)=> total+item.price*item.quantity,0);

    let discountAmount=(totalAmount*discountPer)/ 100;
    let price=totalAmount-discountAmount;
    let gst=(price*18)/100;
    let finalAmount= price+gst;

    let {code, applied,discount,message} =useSelector(globalState=>globalState.coupon);

    let disAmount = discount/100*totalAmount;
    let amountToBePaid= (finalAmount-disAmount); 

    const [isCheckout, setIsCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [customerEmail,setCustomerEmail] = useState("");

    let templateparams={
      order_id:"ORDER123",
      orders:cartItems.map(item=>({
        name:item.name,
        price:(item.price*item.quantity).toFixed(2),
        units:item.quantity,
        image:item.image
      })),
      cost:{
        shipping:10,
        tax:gst.toFixed(2),
        total:amountToBePaid.toFixed(2)
      },
      email:customerEmail
    };

    let purchaseDetails={
      date:new Date().toLocaleString(),
      items:[...cartItems],
      totalAmount:amountToBePaid,
    }

    // ✅ Checkout (login check added)
    let handleCheckout = () => {

      const currentUser = JSON.parse(localStorage.getItem("currentUser")); // ✅ ADDED

      if (!currentUser) {   // ✅ ADDED
        alert("Please login or register first");
        return;
      }

      if (!customerEmail) {
        alert("Please enter your email");
        return;
      }

      emailjs.send(
        "service_o339uvl",
        "template_l624tym",
        templateparams,
        "cvahWAe-VSl0ayJ7j"
      )
      .then(() => {
        alert("Email sent successfully");
      })
      .catch((error) => {
        alert("Email sending failed");
      })

      dispatch(addOrder(purchaseDetails));
      dispatch(clearCart());
      dispatch(resetCoupon());
      setIsCheckout(false);
    };

    // ✅ Place Order (login check added)
    const handlePlaceOrder = () => {

      const currentUser = JSON.parse(localStorage.getItem("currentUser")); // ✅ ADDED

      if (!currentUser) {   // ✅ ADDED
        alert("Please login or register to place an order");
        return;
      }

      if (cartItems.length === 0) {
        alert("Cart is empty!");
        return;
      }

      if (!paymentMethod) {
        alert("Please select a payment method");
        return;
      }

      alert("Order placed successfully!");
      dispatch(addOrder(purchaseDetails))
      dispatch(clearCart());
      dispatch(resetCoupon());
    };

  return (
    <>
    <div className="cart-container">

  <ToastContainer position="top-right" autoClose={2000} />

  {cartItems.length === 0 ? (
    <h1>Your cart is empty</h1>
  ) : (
    <>
      <button
        className="clear-btn"
        onClick={() => {
          dispatch(clearCart());
          dispatch(resetCoupon());
        }}
      >
        Clear Cart
      </button>

<ol className="cart-list">
  {cartItems.map(item => (
    <li key={item.id} className="cart-item">

      <div className="item-image">
        <img 
          src={item.image}
          alt={item.name}
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
      </div>

      <div className="item-info">
        <h3>{item.name}</h3>
        <p>Price: ₹{item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>

      <div className="quantity-control">
        <button onClick={()=>dispatch(decreaseQuantity(item))}>-</button>
        <span>{item.quantity}</span>
        <button onClick={()=>dispatch(increaseQuantity(item))}>+</button>
      </div>

      <button
        className="remove-btn"
        onClick={() => {
          dispatch(removeCart(item));
          toast.error(`${item.name} removed from cart`);
          if (cartItems.length===1){
            dispatch(resetCoupon());
          }
        }}
      >
        Remove
      </button>

    </li>
  ))}
</ol>

      <div className="summary">

        <h3>Total Amount: ₹{totalAmount}</h3>

        <div className="discount-buttons">
          <button onClick={() => setDiscountPer(10)}>10%</button>
          <button onClick={() => setDiscountPer(20)}>20%</button>
          <button onClick={() => setDiscountPer(30)}>30%</button>
          <button onClick={()=>setDiscountPer(0)}>Reset</button>
          <h3> Discount ({discountPer}%): {discountAmount}</h3>
        </div>

        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter coupon"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => dispatch(applyCoupon(input))}>
            Apply
          </button>
          <button onClick={() => dispatch(resetCoupon())}>
            Reset
          </button>
          {applied && ( <h2>Coupon Discount: {disAmount}</h2> )}
        </div>

        <h3>GST (18%): ₹{gst}</h3>
        <h2>Final Amount: ₹{amountToBePaid}</h2>
       
        {!isCheckout && (
          <button
            className="checkout-btn"
            onClick={() => setIsCheckout(true)}>
            Proceed to Checkout
          </button>
        )}
         
        {isCheckout && (
          <div className="payment-section">

            <h3>Select Payment Method</h3>

            <button onClick={() => setPaymentMethod("Card")}>
              Card
            </button>

            <button onClick={() => setPaymentMethod("QR")}>
              UPI QR
            </button>

            {paymentMethod === "QR" && (
              <div className="qr-box">
                <h4>Scan to Pay ₹{amountToBePaid}</h4>
                <QRCode
                  value={`upi://pay?pa=gunjikusuma30@okicici&pn=KusumaStore&am=${amountToBePaid}&cu=INR`}
                  size={200}
                />
              </div>
            )}

            {paymentMethod === "Card" && (
              <p>Card payment not available</p>
            )}

          </div>
        )}

        <div>
          <label>Enter your Gmail to receive order confirmation</label>
          <input
          type="email"
          value={customerEmail}
          onChange={(e)=>setCustomerEmail(e.target.value)}
          placeholder="You@example.com"/>
        </div>

        <button onClick={handleCheckout}>Checkout & Send Email</button>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Orders</button>
      
    </>
  )}
</div>
     </>
  );
}

export default Cart;