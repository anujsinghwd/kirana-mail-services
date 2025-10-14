const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Express Router Configuration
const userRouter = require("./routes/user.routes");

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({working: true});
});

app.listen(PORT, function () {
  console.log("Server is running at PORT:", PORT);
});
