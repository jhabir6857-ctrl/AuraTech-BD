import styles from './ProductGrid.module.css';
import { prisma } from '@/lib/prisma';
import AddToCartButton from './AddToCartButton';

export default async function ProductGrid() {
  const products = await prisma.product.findMany();

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
