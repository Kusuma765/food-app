// import { configureStore } from "@reduxjs/toolkit";
// import cart from "./cart";
// import cartReducers from "./CartSlice";
// import cuponReducers from "./CuponSlice";
// import orderReducers from "./OrderSlice"
// const store = configureStore({
// reducer:{
//    cart:cartReducers,
//    coupon:cuponReducers,
//    order:orderReducers
// }
// }
// );
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./cartSlice";
import couponReducers from "./couponSlice";
import orderReducers from "./orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducers,
    coupon: couponReducers,
    order: orderReducers
  }
});

export default store;
