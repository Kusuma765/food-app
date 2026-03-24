import { createSlice } from "@reduxjs/toolkit";
import { coupons } from './Coupon';
const cuponSlice=createSlice({
    name:"coupon",
    initialState:{
        code:" ",
        discount:0,
        applied:false,
        message:" ",

    },
    reducers:{
        applyCoupon:(state,action)=>{
            const enteredCode=action.payload.toUpperCase();
            if(coupons[enteredCode]){
                state.code=enteredCode;
                state.discount=coupons[enteredCode];
                state.applied=true;
                state.message= `Coupons "${enteredCode}" applied ! you got ${coupons[enteredCode]}% off.`;

            }
            else{
                state.message=`Invalid coupon code .`;
                
            }
        },
        resetCoupon:(state)=>{
           state.code=" ";
        state.discount=0;
        state.applied=false;
        state,message="" ;
        }
            
    }
});
export const{applyCoupon,resetCoupon}=cuponSlice.actions;

export default cuponSlice.reducer