import React, { useState } from "react";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer ,toast} from "react-toastify";

function NonVeg() {

  const nonVegItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 250,
      image: "Chicken-Biryani.jpg",
      description: "Aromatic basmati rice cooked with spicy chicken."
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: 280,
      image: "butter.jpg",
      description: "Creamy tomato gravy with tender chicken pieces."
    },
    {
      id: 3,
      name: "Chicken Tikka",
      price: 220,
      image: "tikka.jpg",
      description: "Grilled spicy chicken cubes."
    },
    {
      id: 4,
      name: "Mutton Curry",
      price: 320,
      image: "goat.jpg",
      description: "Rich and spicy mutton curry."
    },
    {
      id: 5,
      name: "Grilled Fish",
      price: 250,
      image: "fish.jpg",
      description: "Fresh fish marinated and grilled."
    },
    {
      id: 6,
      name: "Prawn Fry",
      price: 280,
      image: "prawn.JPG",
      description: "Crispy fried prawns with spices."
    },
    {
      id: 7,
      name: "Chicken 65",
      price: 230,
      image: "chicken65.jpg",
      description: "Deep-fried spicy chicken bites tossed with curry leaves and special masala."
    },
    {
      id: 8,
      name: "Tandoori Chicken",
      price: 300,
      image: "tandoori.jpg",
      description: "Chicken marinated in yogurt and spices, roasted in traditional tandoor."
    },
    {
      id: 9,
      name: "Egg Curry",
      price: 160,
      image: "egg.jpg",
      description: "Boiled eggs cooked in rich onion-tomato spicy gravy."
    }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = nonVegItems.slice(indexOfFirstItem, indexOfLastItem);

  let dispatch = useDispatch();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000}/>

      <div className="nonveg-container">
        <h1 className="nonveg-title">🍗 Non-Veg Special Menu</h1>

        <div className="nonveg-grid">
          {currentItems.map((item) => (
            <div className="nonveg-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="nonveg-content">
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
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    {"<"}
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    {">"}
  </button>
  </div>
      
    </>
  );
}

export default NonVeg;