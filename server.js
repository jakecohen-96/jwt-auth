const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRouter.js");
const path = require("path");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://jwt-auth-dipt.onrender.com"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const { PORT } = process.env;
app.listen(PORT || 5001, () => {
  console.log(`Server running on port ${PORT || 5001}`);
});