// Alaa Ahmad

const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

// Define the Zod schema for environment variable validation.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL is a required environment variable.' }),
  API_KEY: z.string().min(1, { message: 'API_KEY is a required environment variable.' })
});

const parsedEnv = envSchema.safeParse(process.env);

// If validation fails, log the errors and exit the process.
if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  );
  process.exit(1);
}


module.exports = {
  config: parsedEnv.data
};