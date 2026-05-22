"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ 
  product, 
  className 
}: { 
  product: { id: number, name: string, price: string, image: string }, 
  className?: string 
}) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    window.dispatchEvent(new Event('open-cart')); // open drawer on add
  };

  return (
    <button className={className} onClick={handleAdd}>
      Add to Cart
    </button>
  );
}
