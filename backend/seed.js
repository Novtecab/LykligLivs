const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

const sampleProducts = [
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, sustainable organic cotton t-shirt perfect for everyday wear. Made with eco-friendly materials that feel great on your skin.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Clothing",
    stock: 50,
    featured: true,
    tags: ["organic", "cotton", "eco-friendly", "comfortable"]
  },
  {
    name: "Bamboo Water Bottle",
    description: "Eco-friendly bamboo water bottle with stainless steel interior. Keep your drinks cold for 24 hours or hot for 12 hours.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    category: "Home & Garden",
    stock: 30,
    featured: true,
    tags: ["bamboo", "eco-friendly", "insulated", "sustainable"]
  },
  {
    name: "Natural Skincare Set",
    description: "Complete skincare routine with natural ingredients. Includes cleanser, toner, moisturizer, and serum for glowing skin.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    category: "Beauty & Health",
    stock: 25,
    featured: true,
    tags: ["natural", "skincare", "organic", "beauty"]
  },
  {
    name: "Meditation Cushion",
    description: "Comfortable meditation cushion filled with buckwheat hulls. Perfect for yoga, meditation, and mindfulness practices.",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    category: "Wellness",
    stock: 20,
    featured: false,
    tags: ["meditation", "yoga", "comfort", "mindfulness"]
  },
  {
    name: "Essential Oil Diffuser",
    description: "Ultrasonic aromatherapy diffuser with LED lights. Create a calming atmosphere in any room with your favorite essential oils.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    category: "Home & Garden",
    stock: 15,
    featured: false,
    tags: ["aromatherapy", "essential oils", "relaxation", "home"]
  },
  {
    name: "Organic Green Tea",
    description: "Premium organic green tea leaves sourced from sustainable farms. Rich in antioxidants and perfect for daily wellness.",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
    category: "Food & Beverages",
    stock: 100,
    featured: false,
    tags: ["organic", "tea", "antioxidants", "wellness"]
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat made from natural rubber. Perfect grip and cushioning for all your yoga and fitness routines.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    category: "Wellness",
    stock: 35,
    featured: true,
    tags: ["yoga", "fitness", "rubber", "non-slip"]
  },
  {
    name: "Wooden Phone Stand",
    description: "Handcrafted wooden phone stand made from sustainable bamboo. Perfect for video calls, watching content, or charging.",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    category: "Accessories",
    stock: 40,
    featured: false,
    tags: ["wooden", "bamboo", "phone", "sustainable"]
  }
]

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lykliglivs')
    console.log('Connected to MongoDB')

    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')

    // Insert sample products
    const products = await Product.insertMany(sampleProducts)
    console.log(`Inserted ${products.length} products`)

    console.log('Sample products:')
    products.forEach(product => {
      console.log(`- ${product.name} ($${product.price})`)
    })

    process.exit(0)
  } catch (error) {
    console.error('Error seeding products:', error)
    process.exit(1)
  }
}

seedProducts()