require('dotenv').config()

const environments = {};

environments.development = {
  httpPort: process.env.PORT || 8081,
  envName: 'development',
  
  database: {
    url: 'mongodb://localhost:27017/tabtracker',
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET
  }
}

environments.production = {
  httpPort: process.env.PORT || 8081,
  envName: 'production',
  
  database: {
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodb-cluster-zusxa.gcp.mongodb.net/tabtracker?retryWrites=true&w=majority`,
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET
  }
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environment defined above,
// if not default to prodution
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.production;

// export the module
module.exports = environmentToExport;
