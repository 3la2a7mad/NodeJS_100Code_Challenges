// Alaa Ahmad

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
// Transactions require a replica set connection string.
const dbURI = "mongodb://localhost:27017/transaction-app-q53?replicaSet=rs0";

const Log = mongoose.model('Log', new mongoose.Schema({ message: String, timestamp: Date }));

app.get('/run-transaction', async (req, res) => {
  // 1. Start a session. This is required for transactions.
  const session = await mongoose.startSession();

  try {
    // 2. Start the transaction within the session.
    session.startTransaction();

    // 3. Perform database operations, passing the session to each.
    // All of these operations are now part of a single atomic transaction.
    await Log.create([{ message: 'Transaction started.', timestamp: new Date() }], { session });
    await Log.create([{ message: `Transaction initiated by ${req.ip}`, timestamp: new Date() }], { session });
    
    // For testing a failure, you could uncomment the next line.
    // if (true) throw new Error("Simulating a transaction failure.");

    // 4. If all operations succeed, commit the transaction.
    await session.commitTransaction();
    res.status(200).send("Transaction completed successfully.");
  } catch (err) {
    // 5. If any operation fails, abort the transaction.
    // This will roll back all previous operations within this transaction.
    await session.abortTransaction();
    res.status(500).send("Transaction failed and was rolled back.");
    console.error('Transaction aborted:', err.message);
  } finally {
    // 6. Always end the session to release server resources.
    session.endSession();
  }
});


async function startServer() {
  try {
    await mongoose.connect(dbURI);
    console.log('Database connected (replica set).');
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch (err) {
    console.error('Failed to connect to DB. Ensure it is a running replica set.', err.message);
    process.exit(1);
  }
}

startServer();