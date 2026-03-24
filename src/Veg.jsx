import React, { useState } from "react";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"

function Veg() {

  const vegItems = [
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 220,
      image: "panner.webp",
      description: "Creamy tomato-based curry cooked with soft paneer cubes and Indian spices."
    },
    {
      id: 2,
      name: "Veg Biryani",
      price: 180,
      image: "vegbiriyani.jpg",
      description: "Aromatic basmati rice cooked with fresh vegetables and flavorful spices."
    },
    {
      id: 3,
      name: "Masala Dosa",
      price: 90,
      image: "dosa.avif",
      description: "Crispy South Indian dosa stuffed with spiced potato filling."
    },
    {
      id: 4,
      name: "Chole Bhature",
      price: 120,
      image: "chole.jpg",
      description: "Spicy chickpea curry served with fluffy deep-fried bhature."
    },
    {
      id: 5,
      name: "Veg Fried Rice",
      price: 150,
      image: "vegfried.jpg",
      description: "Stir-fried rice mixed with fresh vegetables and soy-based seasonings."
    },
    {
      id: 6,
      name: "Paneer Samosa",
      price: 180,
      image: "pannersamosa.jpg",
      description: "Crispy samosa stuffed with spiced paneer filling."
    },
    {
      id: 7,
      name: "Aloo Gobi",
      price: 130,
      image: "aloo.jpg",
      description: "Classic Indian curry made with potatoes and cauliflower."
    },
    {
      id: 8,
      name: "Mushroom Masala",
      price: 170,
      image: "Mushroom-Masala.jpg",
      description: "Fresh mushrooms cooked in spicy onion-tomato gravy."
    },
    {
      id: 9,
      name: "Veg Noodles",
      price: 120,
      image: "veg-noodles.jpg",
      description: "Stir-fried noodles tossed with crunchy vegetables and sauces."
    },
    {
      id: 10,
      name: "Sambar Rice",
      price: 120,
      description: "Steamed rice mixed with flavorful South Indian sambar.",
      image: "https://images.unsplash.com/photo-1617622141675-d3005b9067c5"
    },
    {
      id: 11,
      name: "Gobi Paratha",
      price: 90,
      description: "Soft whole wheat flatbread stuffed with cauliflower.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },
    {
      id: 12,
      name: "Paneer Paratha",
      price: 110,
      description: "Whole wheat flatbread stuffed with paneer.",
      image: "https://images.unsplash.com/photo-1626500155537-93690c24099e"
    }
  ]

  const vegItemsPerPage = 4;
  const totalPages = Math.ceil(vegItems.length / vegItemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastVegItem = currentPage * vegItemsPerPage;
  const indexOfFirstVegItem = indexOfLastVegItem - vegItemsPerPage;

  const currentItems = vegItems.slice(indexOfFirstVegItem, indexOfLastVegItem);

  let dispatch = useDispatch();

  return (
    <>
      <ToastContainer position="topo-right" autoClose={2000} />

      <div className="veg-container">
        <h1 className="veg-title">🌿 Veg Special Menu</h1>

        <div className="veg-grid">
          {currentItems.map((item) => (
            <div className="veg-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="veg-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹ {item.price}</h4>

                <button onClick={() => {
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

export default Veg;