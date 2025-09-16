
require('dotenv').config();
// Validate the NODE_ENV.
const validEnvironments = ['dev', 'test', 'prod'];
const currentEnv = process.env.NODE_ENV;

if (!currentEnv || !validEnvironments.includes(currentEnv)) {
    // If the validation fails, throw a hard error and crash the app.
    throw new Error(`Invalid NODE_ENV specified: '${currentEnv}'. Must be one of: ${validEnvironments.join(', ')}.`);
}

//Create a configuration object based on the environment.
const config = {
    env: currentEnv,
    port: process.env.PORT || 3000,
    ...({
        dev: {
            dbUrl: process.env.DATABASE_URL,
            apiKey: process.env.API_KEY,
            logLevel: 'debug'
        },
        test: {
            dbUrl: 'mongodb://localhost:27017/test_db',
            apiKey: 'test-api-key',
            logLevel: 'info'
        },
        prod: {
            dbUrl: process.env.PROD_DATABASE_URL, 
            apiKey: process.env.PROD_API_KEY,
            logLevel: 'warn'
        }
    })[currentEnv] 
};

// Export the final, frozen configuration object
module.exports = Object.freeze(config);