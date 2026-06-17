const express = require("express");
const app = express();

app.use(express.json());

const bfhlRoutes = require("./routes/bfhlRoutes");

app.use("/bfhl", bfhlRoutes);

app.listen(3000, () => {
    console.log("Server started at port 3000");
});