import React from "react";
import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {
  const orderHistory = useSelector((state) => state.order);

  return (
    <div className="orders-page">
      <h2 className="orders-heading">Order History</h2>

      {orderHistory.length === 0 ? (
        <p className="no-orders">No Orders Found</p>
      ) : (
        orderHistory.map((order, index) => {
          
          // ✅ Calculate total if not present
          const totalAmount = order.totalprice
            ? order.totalprice
            : order.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              );

          return (
            <div key={index} className="order-card">

              <div className="order-top">
                <div>
                  <p className="label">Date</p>
                  <p>{order.date}</p>
                </div>

                <div className="total-box">
                  ₹{totalAmount}
                </div>
              </div>

              <div className="items-section">
                {order.items.map((item) => (
                  <div key={item.id} className="item-row">
                    <div>
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <div className="item-price">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;