const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); 
const { Server } = require("socket.io"); 

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const sellerRoute = require("./routes/sellerRoute");
// const imageRouter = require("./routes/imageRouter");
const adminRouter = require("./routes/adminRouter");
const orderRoute = require("./routes/orderRouter");
const path = require("path");

const app = express();
const port = 5000;

connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

console.log("dirName", __dirname);

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/sellers", sellerRoute);
// app.use("/api/images", imageRouter);
app.use("/api/admin", adminRouter);
app.use("/api/orders", orderRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    credentials: true,
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.set("socketio", io);

server.listen(port, () => console.log(`Server running at port ${port}`));
