// Alaa Ahmad
//GET  http://localhost:3000/orders/summary
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dbURI = 'mongodb://localhost:27017/orders-app-q52';

app.use(express.json());

// status must be one of this values.
const orderSchema = new mongoose.Schema({
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
  total: { type: Number, required: true }
});
const Order = mongoose.model('Order', orderSchema);


app.get('/orders/summary', async (req, res) => {
  try {
    
    const summary = await Order.aggregate([
      // Group documents by the'status' field.
      {
        $group: {
          _id: '$status', // Group by the status (e.g., all 'pending' orders together).
          totalValue: { $sum: '$total' }, // Calculate the sum of the 'total' for each group.
          count: { $sum: 1 } // Count the number of documents in each group.
        }
      },
      //Sort the results alphabetically by status (_id).
      { $sort: { _id: 1 } }
    ]);
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


async function seedDatabase() {
  await Order.deleteMany({}); // Clear existing data.
  await Order.insertMany([
    { status: 'pending', total: 100, user: 'Alaa' },
    { status: 'shipped', total: 150, user: 'Alaa' },
    { status: 'delivered', total: 200, user: 'Alaa' },
    { status: 'shipped', total: 120, user: 'Alaa' },
    { status: 'pending', total: 80, user: 'Alaa' }
  ]);
  console.log('Database seeded with sample order data.');
}

// Start the server 
async function startServer() {
  try {
    await mongoose.connect(dbURI);
    console.log('Database connected.');
    await seedDatabase();
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();