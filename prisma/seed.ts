import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates
  await prisma.product.deleteMany({});
  
  await prisma.product.createMany({
    data: [
      { name: 'AuraWatch Ultra', price: '৳ 32,500', tag: 'Bestseller', image: '⌚' },
      { name: 'AuraBook Pro 14"', price: '৳ 145,000', tag: 'New', image: '💻' },
      { name: 'Wireless Charging Pad', price: '৳ 2,500', tag: '', image: '🔋' },
      { name: 'Smart Home Hub', price: '৳ 8,900', tag: '', image: '🏠' },
    ],
  });
  console.log('Successfully seeded the database with products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
