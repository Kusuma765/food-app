import React, { useState } from "react";
import "./Desserts.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { ToastContainer,toast } from "react-toastify";


function Desserts() {
  const dessertItems = [
    {
      id: 1,
      name: "Gulab Jamun",
      price: 90,
      image: "gulab.jpg",
      description: "Soft and juicy Indian sweet soaked in sugar syrup."
    },
    {
      id: 2,
      name: "Chocolate Cake",
      price: 150,
      image: "chocolate-cake.jpg",
      description: "Rich and moist chocolate layered cake."
    },
    {
      id: 3,
      name: "Ice Cream",
      price: 80,
      image: "ice.jpg",
      description: "Creamy and delicious frozen dessert."
    },
    {
      id: 4,
      name: "Rasgulla",
      price: 100,
      image: "rasgulla.jpg",
      description: "Soft and spongy Bengali sweet."
    },
    {
      id: 5,
      name: "Brownie",
      price: 120,
      image: "brownie.jpg",
      description: "Fudgy chocolate brownie with nuts."
    },
    {
      id: 6,
      name: "Cupcake",
      price: 60,
      image: "cupcake.jpg",
      description: "Small soft cake topped with cream frosting."
    },{
    id: 7,
    name: "Cheesecake",
    price: 180,
    image: "cheesecake.jpg",
    description: "Creamy and smooth baked cheesecake with a biscuit base."
  },
  {
    id: 8,
    name: "Donut",
    price: 50,
    image: "Donut.jpg",
    description: "Soft and fluffy donut glazed with chocolate."
  },
  {
    id: 9,
    name: "Fruit Salad",
    price: 70,
    image: "fruit-salad.jpg",
    description: "Fresh mixed fruits served chilled with honey."
  }
  ];
   const itemsPerPage = 4;
    const totalPages = Math.ceil(dessertItems.length / itemsPerPage);
  
    const [currentPage, setCurrentPage] = useState(1);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    const currentItems = dessertItems.slice(indexOfFirstItem, indexOfLastItem);
  
  let dispatch=useDispatch();

  return (
    <>
    <ToastContainer Position="top-right"auto close={2000}/>
    <div className="desserts-container">
      <h1 className="title">Our Delicious Desserts</h1>

      <div className="desserts-grid">
        {currentItems.map((item) => (
          <div className="dessert-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>₹{item.price}</h3>
            <button onClick={()=>{dispatch(addToCart(item));toast.success(`${item.name} added to your cart successfully`);}}>Add to Cart</button>
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

export default Desserts;
