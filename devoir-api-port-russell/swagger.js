const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { title: 'API Port Russel', description: 'Description' },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);