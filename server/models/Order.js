const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        weightInGrams: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    coupon:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    price: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    totalWeight: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type:String,
    },
    address: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^\d{6}$/.test(value),
        message: "Pincode must be a 6-digit number.",
      },
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    trackingNumber:{
      type: String,
      default: "",
    },
    shippingCarrier:{
      type: String,
      default: "",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    // deliveryDate: {
    //   type: Date,
    //   default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    // },
  },
  { timestamps: true }
);

// Indexes for Performance
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model("Order", orderSchema);