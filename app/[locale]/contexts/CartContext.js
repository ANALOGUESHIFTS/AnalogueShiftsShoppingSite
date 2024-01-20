import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartNumber, setCartNumber] = useState(0);

  const updateCartNumber = (num) => {
    // Perform login logic (e.g., send login request, set user data)
    setCartNumber(num);
  };
  return (
    <CartContext.Provider value={{ cartNumber, updateCartNumber }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
