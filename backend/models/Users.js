const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
      }
    }
  ],
  orders: [
    { 
      status: {
        type: String,
        default: "Processing"
      },
      items: [{
        _id: false,
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
      }],
      totalPayment: {
          type: mongoose.Schema.Types.Decimal128,
          required: true
      },
      paymentType: {
        type: String,
        required: true
      },
      deliveryAddress: [{
        _id: false,
        address: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        postcode: {
          type: String,
          required: true
        }
      }],
      date: {
        type: Date,
        default: Date.now,
        required: true
      }
    }
  ],
  vouchers: [
    {
      voucherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vouchers',
        required: true
      }
    }
  ]
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
