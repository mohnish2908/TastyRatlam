import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    loading: false,
};

const calculateTotal = (cart) => {
    return cart.reduce((total, item) => {
        const price = item.selectedWeight ? item.selectedWeight.price : item.price;
        return total + price * item.quantity;
    }, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCart(state, action) {
            state.cart = action.payload;
            state.total = calculateTotal(state.cart);
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.cart.find(cartItem => 
                cartItem._id === item._id && 
                (cartItem.selectedOption ? cartItem.selectedOption === item.selectedOption : true)
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...item, quantity: 1 });
            }
            state.total = calculateTotal(state.cart);
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
        },
    },
});

export const { setCart, setLoading, addToCart } = cartSlice.actions;
export default cartSlice.reducer;