"use client";
import { useEffect, useState } from 'react';
import styles from './CartDrawer.module.css';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, subtotal, totalItems, clearCart } = useCart();
  
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-cart', handleOpen);
    return () => window.removeEventListener('open-cart', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsCheckout(false);
      setIsSuccess(false);
      setCustomerName('');
      setPhone('');
      setDivision('');
    }, 300);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          division,
          totalAmount: `৳ ${subtotal.toLocaleString()}`
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        clearCart();
      } else {
        alert("Failed to process checkout. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={handleClose}></div>}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>{isSuccess ? 'Order Complete' : isCheckout ? 'Checkout' : 'Your Cart'}</h2>
          <button onClick={handleClose} className={styles.closeBtn}>&times;</button>
        </div>
        
        <div className={styles.content}>
          {isSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Thank you for your order!</h3>
              <p>We have received your order and will contact you shortly to confirm delivery.</p>
            </div>
          ) : isCheckout ? (
            <form id="checkout-form" onSubmit={handleCheckout} className={styles.checkoutForm}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input required type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="01XXX-XXXXXX" />
              </div>
              <div className={styles.formGroup}>
                <label>Division</label>
                <select required value={division} onChange={e => setDivision(e.target.value)}>
                  <option value="">Select Division</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>
            </form>
          ) : cart.length === 0 ? (
            <div className={styles.emptyCart}>Your cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>{item.image}</div>
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                  <div className={styles.qty}>Qty: {item.quantity}</div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>&times;</button>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          {!isSuccess && (
            <div className={styles.total}>
              <span>Subtotal</span>
              <span>৳ {subtotal.toLocaleString()}</span>
            </div>
          )}
          
          {isSuccess ? (
            <button className={styles.checkoutBtn} onClick={handleClose}>Continue Shopping</button>
          ) : isCheckout ? (
            <>
              <button 
                type="button" 
                className={styles.backBtn} 
                onClick={() => setIsCheckout(false)}
                disabled={isSubmitting}
              >
                Back to Cart
              </button>
              <button 
                type="submit" 
                form="checkout-form" 
                className={styles.checkoutBtn} 
                disabled={isSubmitting}
                style={{ marginTop: '10px' }}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </>
          ) : (
            <>
              <p className={styles.taxNotice}>Delivery fee calculated at checkout.</p>
              <button 
                className={styles.checkoutBtn} 
                disabled={cart.length === 0}
                onClick={() => setIsCheckout(true)}
              >
                Secure Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
