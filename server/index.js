const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const database = require("./config/database");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// const cors = require("cors");
// app.use(cors());

// Connect to the Database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");
const paymentRoutes = require("./routes/Payment");

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/payment', paymentRoutes);






// Cloudinary Configuration
cloudinaryConnect();

// Start the Server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
