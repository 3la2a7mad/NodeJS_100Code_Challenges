// Alaa Ahmad

const express = require('express');
const { z } = require('zod');

// Define the Zod schema for validation.
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  age: z.number().int().min(18, { message: "User must be at least 18 years old." })
});

const app = express();
app.use(express.json()); // Middleware to parse JSON request

// Create the route that performs the validation.
app.post('/users', (req, res) => {
  
  // safeParse returns a result object instead of throwing an error.
  const validationResult = userSchema.safeParse(req.body);

  //Handle validation failure.
  if (!validationResult.success) {
    const formattedErrors = validationResult.error.flatten().fieldErrors;
    return res.status(400).json({
      message: "Invalid data provided.",
      errors: formattedErrors
    });
  }

  // Handle validation success.
  const { email, age } = validationResult.data;
  console.log(`Received valid data: Email - ${email}, Age - ${age}`);
  res.status(200).json({
    message: `User created successfully for ${email}. Student: Alaa Ahmad.`,
    data: validationResult.data
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});