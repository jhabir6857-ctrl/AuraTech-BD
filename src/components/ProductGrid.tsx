import styles from './ProductGrid.module.css';
import { prisma } from '@/lib/prisma';
import AddToCartButton from './AddToCartButton';

const defaultProducts = [
  { id: 1, name: 'AuraWatch Ultra', price: '৳ 32,500', tag: 'Bestseller', image: '⌚' },
  { id: 2, name: 'AuraBook Pro 14"', price: '৳ 145,000', tag: 'New', image: '💻' },
  { id: 3, name: 'Wireless Charging Pad', price: '৳ 2,500', tag: '', image: '🔋' },
  { id: 4, name: 'Smart Home Hub', price: '৳ 8,900', tag: '', image: '🏠' },
];

export default async function ProductGrid() {
  let products = defaultProducts;
  
  try {
    const dbProducts = await prisma.product.findMany();
    if (dbProducts.length > 0) {
      products = dbProducts;
    }
  } catch (error) {
    console.error('Failed to fetch products from database:', error);
    // Use default products as fallback
  }

  return (
    <section className={styles.productSection} id="products">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trending Tech</h2>
          <a href="#" className={styles.viewAll}>View All &rarr;</a>
        </div>
        
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              {product.tag && <span className={styles.tag}>{product.tag}</span>}
              <div className={styles.imagePlaceholder}>
                <span style={{ fontSize: '4rem' }}>{product.image}</span>
              </div>
              <div className={styles.info}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
                <AddToCartButton 
                  className={styles.addBtn} 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
