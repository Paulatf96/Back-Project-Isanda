const express = require("express");
const app = express();
const routes = require("./src/routes/router");
const cors = require("cors");
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use("/", routes);
app.use((err, req, res, next) => {
  console.error("Global error", err),
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
