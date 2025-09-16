// Alaa Ahmad

const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/indexing-app-q51';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1, createdAt: -1 });

const User = mongoose.model('User', userSchema);

async function initializeDatabaseAndIndex() {
  try {
    await mongoose.connect(dbURI);
    console.log('Database connected.');

    
    const tempUserExists = await User.findOne({ email: 'test@example.com' });
    if (!tempUserExists) {
        await User.create({ email: 'test@example.com' });
        console.log('Created a temporary user to ensure database and index creation.');
    }
   

    console.log('You can now check MongoDB Compass to verify the index.');
  } catch (err) {
    console.error('Database connection or creation failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

initializeDatabaseAndIndex();