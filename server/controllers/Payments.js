const { instance } = require("../config/razorpay");
const Order = require("../models/Order");
const crypto = require("crypto");
const User = require("../models/User");
const Product = require("../models/Product");
const ComboProduct = require("../models/ComboProduct");

// Capture payment controller
exports.capturePayment = async (req, res) => {
  // Implementation here
};

// Verify payment controller
exports.verifyPayment = async (req, res) => {
  // Implementation here
};

// Send payment success email controller
exports.sendPaymentSuccessEmail = async (req, res) => {
  // Implementation here
};

// Place order controller
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available from the middleware
    const { products, shippingAddress } = req.body; // Extract products and shipping address from the request

    console.log("body", req.body);

    // Validate required fields
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ error: "Shipping address is required" });
    }

    // Prepare an array to hold order product details
    const orderProducts = [];
    let totalAmount = 0;

    // Iterate over the products in the order
    for (let i = 0; i < products.length; i++) {
      const { productId, weightInGrams, quantity } = products[i];

      // Check if it's a combo product
      const comboProduct = await ComboProduct.findById(productId);
      if (comboProduct) {
        let comboTotal = 0;
        let comboProductDetails = [];

        // Iterate over each product in the combo
        for (let j = 0; j < comboProduct.products.length; j++) {
          const comboItem = comboProduct.products[j];
          const product = await Product.findById(comboItem.productId);
          if (!product) {
            return res.status(400).json({ error: `Product with ID ${comboItem.productId} not found` });
          }

          const productWeight = product.pricePerWeight.find(p => p.weightInGrams === comboItem.weightInGrams);
          if (!productWeight) {
            return res.status(400).json({ error: `Price for the weight ${comboItem.weightInGrams} grams not found` });
          }

          const itemTotal = productWeight.price * quantity;
          comboTotal += itemTotal;

          comboProductDetails.push({
            productId: product._id,
            name: product.name,
            weightInGrams: comboItem.weightInGrams,
            price: itemTotal,
          });
        }

        // Add combo product to order
        orderProducts.push({
          productId: comboProduct._id,
          name: comboProduct.name,
          price: comboTotal,
          quantity,
          productsInCombo: comboProductDetails,
        });
        totalAmount += comboTotal;
      } else {
        // Handle normal product
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(400).json({ error: `Product with ID ${productId} not found` });
        }

        const productWeight = product.pricePerWeight.find(p => p.weightInGrams === weightInGrams);
        if (!productWeight) {
          return res.status(400).json({ error: `Price for the weight ${weightInGrams} grams not found` });
        }

        const totalProductPrice = productWeight.price * quantity;

        orderProducts.push({
          productId: product._id,
          name: product.name,
          price: totalProductPrice,
          quantity,
          weightInGrams,
        });
        totalAmount += totalProductPrice;
      }
    }

    // Create the order
    const newOrder = new Order({
      user: userId,
      products: orderProducts,
      totalAmount,
      shippingAddress,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order, please try again later" });
  }
};
