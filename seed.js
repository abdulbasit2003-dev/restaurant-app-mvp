const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
const Reservation = require('./models/Reservation');
const Order = require('./models/Order');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');

    await User.deleteMany();
    await MenuItem.deleteMany();
    await Table.deleteMany();
    await Reservation.deleteMany();
    await Order.deleteMany();

    const hashedPassword = await bcrypt.hash('123456', 10);

    const users = await User.insertMany([
      { name: 'John Customer', email: 'customer@biteflow.com', password: hashedPassword, role: 'customer' },
      { name: 'Alice Manager', email: 'manager@biteflow.com', password: hashedPassword, role: 'manager' }
    ]);

    const menuItems = await MenuItem.insertMany([
      { name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil', price: 12.99, category: 'Mains', isAvailable: true },
      { name: 'Pepperoni Pizza', description: 'Classic pepperoni with mozzarella', price: 14.99, category: 'Mains', isAvailable: true },
      { name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan', price: 8.99, category: 'Starters', isAvailable: true },
      { name: 'Garlic Bread', description: 'Toasted baguette with garlic butter', price: 5.99, category: 'Starters', isAvailable: true },
      { name: 'Cheeseburger', description: 'Beef patty, cheddar cheese, lettuce, tomato', price: 11.99, category: 'Mains', isAvailable: true },
      { name: 'Veggie Burger', description: 'Plant-based patty with fresh veggies', price: 10.99, category: 'Mains', isAvailable: true },
      { name: 'Pasta Carbonara', description: 'Creamy sauce, bacon, parmesan', price: 13.99, category: 'Mains', isAvailable: true },
      { name: 'Penne Arrabbiata', description: 'Spicy tomato sauce, garlic, parsley', price: 11.49, category: 'Mains', isAvailable: true },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center', price: 6.99, category: 'Desserts', isAvailable: true },
      { name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 7.49, category: 'Desserts', isAvailable: true },
      { name: 'Iced Latte', description: 'Espresso with cold milk and ice', price: 4.50, category: 'Beverages', isAvailable: true },
      { name: 'Fresh Lemonade', description: 'Freshly squeezed lemons with mint', price: 3.99, category: 'Beverages', isAvailable: true },
      { name: 'BBQ Chicken Wings', description: 'Crispy wings tossed in BBQ sauce', price: 9.99, category: 'Starters', isAvailable: true },
      { name: 'Grilled Salmon', description: 'Served with steamed vegetables', price: 18.99, category: 'Mains', isAvailable: true },
      { name: 'Fruit Platter', description: 'Seasonal fresh cut fruits', price: 6.50, category: 'Desserts', isAvailable: true }
    ]);

    const tables = await Table.insertMany([
      { tableNumber: 1, capacity: 2 },
      { tableNumber: 2, capacity: 2 },
      { tableNumber: 3, capacity: 4 },
      { tableNumber: 4, capacity: 4 },
      { tableNumber: 5, capacity: 6 },
      { tableNumber: 6, capacity: 8 }
    ]);

    console.log('Database successfully seeded!');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();