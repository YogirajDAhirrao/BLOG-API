import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API documentation for Blog API using Express + Prisma",
    },
    servers: [
      {
        url: "http://localhost:5000", // change if deployed
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token", // JWT cookie name
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // will read JSDoc from route files
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
