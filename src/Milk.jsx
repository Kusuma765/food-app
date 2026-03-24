import React, { useState } from "react";
import "./Milk.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";

function Milk() {

  const milkProducts = [
    { id: 1, name: "Fresh Milk", price: 50, image: "milk.jpg", description: "Pure and fresh cow milk rich in nutrients." },
    { id: 2, name: "Badam Milk", price: 70, image: "badam.jpg", description: "Sweet almond flavored milk served chilled." },
    { id: 3, name: "Chocolate Milk", price: 60, image: "chocolate.jpg", description: "Creamy milk blended with rich chocolate." },
    { id: 4, name: "Strawberry Milk", price: 65, image: "strawberry-milkshake.webp", description: "Refreshing strawberry flavored milk." },
    { id: 5, name: "Cold Coffee Milk", price: 90, image: "coldcoffee.jpg", description: "Chilled milk blended with rich coffee." },
    { id: 6, name: "Turmeric Milk", price: 55, image: "Turmeric.jpg", description: "Healthy haldi milk with immunity benefits." },
    { id: 7, name: "Vanilla Milk", price: 75, image: "vanilla.jpg", description: "Smooth and creamy vanilla flavored milk." },
    { id: 8, name: "Oats Milk", price: 110, image: "oatmilk.jpg", description: "Healthy dairy-free oats milk alternative." },
    { id: 9, name: "Protein Milk", price: 95, image: "protein.jpg", description: "High-protein milk for energy and strength." }
  ];

  const milkPerPage = 4;
  const totalPages = Math.ceil(milkProducts.length / milkPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * milkPerPage;
  const indexOfFirstItem = indexOfLastItem - milkPerPage;

  const currentItems = milkProducts.slice(indexOfFirstItem, indexOfLastItem);

  let dispatch = useDispatch();

  return (
  <>
    <ToastContainer position="top-right" autoClose={2000}/>

    <div className="milk-container">
      <h1 className="milk-title">🥛 Milk Products</h1>

      <div className="milk-grid">
        {currentItems.map((item) => (
          <div className="milk-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="milk-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <h4>₹ {item.price}</h4>

              <button onClick={()=>{
                dispatch(addToCart(item));
                toast.success(`${item.name} added to your cart successfully`);
              }}>
                Add to Cart
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="pagination">

      <button
      disabled={currentPage === 1}
      onClick={()=> setCurrentPage(currentPage-1)}
      >
      {"<"}
      </button>

      {Array.from({length:totalPages},(_,index)=>(
        <button
        key={index}
        onClick={()=> setCurrentPage(index+1)}
        >
        {index+1}
        </button>
      ))}

      <button
      disabled={currentPage === totalPages}
      onClick={()=> setCurrentPage(currentPage+1)}
      >
      {">"}
      </button>

    </div>

    </>
  );
}

export default Milk;