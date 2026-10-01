export type Page = 'login' | 'signup' | 'home' | 'category' | 'product' | 'cart' | 'checkout' | 'success' | 'orders' | 'order-detail' | 'profile'

export type Product = {
  id: string
  name: string
  price: number
  old: number
  rating: string
  reviews: number
  color: string
  image: number
  category: string
}

export type CartItem = { id: string; size: string; color: string; quantity: number }
export type Account = { name: string; email: string; phone: string; address: string }
export type Order = {
  id: string
  date: string
  items: CartItem[]
  total: number
  address: Account
}

export const products: Product[] = [
  { id: 'floral', name: 'Floral Summer Dress', price: 1299, old: 1999, rating: '4.5', reviews: 120, color: 'Pink', image: 0, category: "Women's Fashion" },
  { id: 'top', name: 'Casual Top', price: 799, old: 1199, rating: '4.3', reviews: 89, color: 'White', image: 1, category: "Women's Fashion" },
  { id: 'evening', name: 'Evening Dress', price: 1899, old: 2499, rating: '4.6', reviews: 210, color: 'Green', image: 2, category: "Women's Fashion" },
  { id: 'blazer', name: 'Tailored Blazer', price: 2299, old: 2999, rating: '4.8', reviews: 76, color: 'Camel', image: 3, category: "Women's Fashion" },
  { id: 'linen-shirt', name: 'Linen Resort Shirt', price: 1499, old: 2199, rating: '4.6', reviews: 84, color: 'Sage', image: 4, category: "Men's Fashion" },
  { id: 'denim-jacket', name: 'Classic Denim Jacket', price: 2599, old: 3499, rating: '4.7', reviews: 132, color: 'Blue', image: 5, category: "Men's Fashion" },
  { id: 'headphones', name: 'Wireless Headphones', price: 3299, old: 4499, rating: '4.8', reviews: 243, color: 'Midnight', image: 6, category: 'Electronics' },
  { id: 'smart-watch', name: 'Everyday Smart Watch', price: 4999, old: 6499, rating: '4.5', reviews: 178, color: 'Silver', image: 7, category: 'Electronics' },
  { id: 'table-lamp', name: 'Ceramic Table Lamp', price: 1899, old: 2599, rating: '4.7', reviews: 94, color: 'Cream', image: 8, category: 'Home & Living' },
  { id: 'lounge-chair', name: 'Accent Lounge Chair', price: 6999, old: 8999, rating: '4.6', reviews: 68, color: 'Terracotta', image: 9, category: 'Home & Living' },
  { id: 'glow-serum', name: 'Glow Serum Set', price: 1099, old: 1599, rating: '4.9', reviews: 211, color: 'Amber', image: 10, category: 'Beauty & Personal Care' },
  { id: 'face-cream', name: 'Botanical Face Cream', price: 899, old: 1299, rating: '4.6', reviews: 156, color: 'Ivory', image: 11, category: 'Beauty & Personal Care' },
  { id: 'dumbbells', name: 'Training Dumbbells', price: 1799, old: 2499, rating: '4.7', reviews: 125, color: 'Charcoal', image: 12, category: 'Sports & Fitness' },
  { id: 'yoga-mat', name: 'Everyday Yoga Mat', price: 1199, old: 1799, rating: '4.8', reviews: 193, color: 'Lilac', image: 13, category: 'Sports & Fitness' },
  { id: 'design-stories', name: 'Design Stories', price: 699, old: 999, rating: '4.8', reviews: 73, color: 'Coral', image: 14, category: 'Books' },
  { id: 'cookbook', name: 'The Everyday Cookbook', price: 599, old: 899, rating: '4.7', reviews: 112, color: 'Mint', image: 15, category: 'Books' },
  { id: 'teddy-bear', name: 'Cuddle Teddy Bear', price: 999, old: 1499, rating: '4.9', reviews: 221, color: 'Honey', image: 16, category: 'Toys & Kids' },
  { id: 'building-blocks', name: 'Rainbow Building Blocks', price: 1299, old: 1899, rating: '4.8', reviews: 165, color: 'Rainbow', image: 17, category: 'Toys & Kids' },
  { id: 'crossbody', name: 'Mini Crossbody Bag', price: 2199, old: 2999, rating: '4.6', reviews: 108, color: 'Taupe', image: 18, category: 'Bags & Accessories' },
  { id: 'backpack', name: 'Canvas City Backpack', price: 2799, old: 3799, rating: '4.7', reviews: 92, color: 'Olive', image: 19, category: 'Bags & Accessories' },
  { id: 'oxford-shirt', name: 'Oxford Cotton Shirt', price: 1699, old: 2399, rating: '4.7', reviews: 96, color: 'Blue', image: 20, category: "Men's Fashion" },
  { id: 'knit-polo', name: 'Textured Knit Polo', price: 1899, old: 2699, rating: '4.6', reviews: 88, color: 'Sand', image: 21, category: "Men's Fashion" },
  { id: 'bluetooth-speaker', name: 'Portable Bluetooth Speaker', price: 2499, old: 3499, rating: '4.7', reviews: 143, color: 'Sage', image: 22, category: 'Electronics' },
  { id: 'wireless-earbuds', name: 'Wireless Earbuds', price: 2999, old: 3999, rating: '4.8', reviews: 216, color: 'White', image: 23, category: 'Electronics' },
  { id: 'stoneware-vase', name: 'Stoneware Flower Vase', price: 1299, old: 1899, rating: '4.6', reviews: 82, color: 'Ivory', image: 24, category: 'Home & Living' },
  { id: 'throw-blanket', name: 'Soft Woven Throw', price: 2199, old: 2999, rating: '4.7', reviews: 119, color: 'Oat', image: 25, category: 'Home & Living' },
  { id: 'rose-lip-tint', name: 'Rose Lip Tint', price: 699, old: 999, rating: '4.8', reviews: 174, color: 'Rose', image: 26, category: 'Beauty & Personal Care' },
  { id: 'body-lotion', name: 'Botanical Body Lotion', price: 849, old: 1199, rating: '4.7', reviews: 138, color: 'Amber', image: 27, category: 'Beauty & Personal Care' },
  { id: 'running-shoes', name: 'Everyday Running Shoes', price: 3499, old: 4799, rating: '4.8', reviews: 187, color: 'Gray', image: 28, category: 'Sports & Fitness' },
  { id: 'resistance-bands', name: 'Fitness Resistance Bands', price: 999, old: 1499, rating: '4.6', reviews: 101, color: 'Multi', image: 29, category: 'Sports & Fitness' },
  { id: 'travel-journal', name: 'The Travel Journal', price: 649, old: 949, rating: '4.7', reviews: 68, color: 'Navy', image: 30, category: 'Books' },
  { id: 'mindful-living', name: 'Mindful Living', price: 749, old: 1099, rating: '4.8', reviews: 94, color: 'Cream', image: 31, category: 'Books' },
  { id: 'wooden-train', name: 'Wooden Toy Train', price: 1499, old: 2199, rating: '4.9', reviews: 129, color: 'Multi', image: 32, category: 'Toys & Kids' },
  { id: 'plush-bunny', name: 'Plush Bunny', price: 899, old: 1299, rating: '4.8', reviews: 206, color: 'Cream', image: 33, category: 'Toys & Kids' },
  { id: 'leather-tote', name: 'Everyday Leather Tote', price: 3999, old: 5499, rating: '4.7', reviews: 115, color: 'Cognac', image: 34, category: 'Bags & Accessories' },
  { id: 'minimal-wallet', name: 'Minimal Leather Wallet', price: 1599, old: 2299, rating: '4.6', reviews: 78, color: 'Olive', image: 35, category: 'Bags & Accessories' },
]

export const categories = ["Women's Fashion", "Men's Fashion", 'Electronics', 'Home & Living', 'Beauty & Personal Care', 'Sports & Fitness', 'Books', 'Toys & Kids', 'Bags & Accessories', 'Offers']
// Catalog prices and saved order totals are stored in cents.
const euroFormats = {
  en: new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }),
  de: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
  nl: new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }),
}
export const money = (value: number) => {
  let language: keyof typeof euroFormats = 'en'
  try {
    const saved = JSON.parse(localStorage.getItem('ss-language') ?? '"en"')
    if (saved === 'de' || saved === 'nl') language = saved
  } catch { /* Use the Ireland format when storage is unavailable. */ }
  return euroFormats[language].format(value / 100)
}
