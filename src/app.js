const express = require("express")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./utils/swagger.json");
const bodyparser = require('body-parser')
const cors = require('cors')
require("dotenv").config();
const app = express()
app.use(cors())
app.use(bodyparser.json())

const port = process.env.PORT || 3000;
// Import and use your routes
const api = require("./routes/api");
app.use("/api", api);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("*", function (req, res) {
  res.status(404).send("Route Not Found");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
