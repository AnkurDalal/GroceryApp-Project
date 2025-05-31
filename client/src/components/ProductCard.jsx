import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";

export const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-md p-3 bg-white w-full h-full"
      >
        <div className="group cursor-pointer w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
          <img
            className="group-hover:scale-105 transition-all duration-200 max-h-full"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm mt-2">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-base sm:text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 sm:w-4"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p className="text-xs">(4)</p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="text-base sm:text-lg font-medium text-green-600">
              {currency} {product.offerPrice}{" "}
              <span className="text-gray-500/60 text-xs sm:text-sm line-through">
                {currency} {product.price}
              </span>
            </p>
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-green-600"
            >
              {!cartItems?.[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-green/10 border border-green/40 px-2 sm:px-3 h-[32px] rounded text-sm text-green-600 font-medium cursor-pointer"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart icon" className="w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 px-2 sm:px-3 h-[32px] bg-green rounded text-green-600 text-sm">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-4 text-center">
                    {cartItems?.[product._id] || 0}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
