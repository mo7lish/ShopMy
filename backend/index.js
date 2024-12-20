const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Navid:NavidShopMy@shopmycluster.fe5vuty.mongodb.net/ShopMy?retryWrites=true&w=majority&appName=ShopMyCluster');

//import the usermodel: it returns a value
const UserModel = require('./models/Users');

app.get("/getUsers", async (req, res) => {
    try {
        const result = await UserModel.find({});
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

app.get("/getUser/:userId", async (req, res) => {
    try {
        const result = await UserModel.findById(req.params.userId);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

app.post("/createUser", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
});

app.post("/authenticateUser", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: "Authentication successful", user });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shopmy.official@gmail.com',
        pass: 'yfmkgsmrdkjlesjx'
    }
});

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

app.post("/resetPasswordRequest", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = generateToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        const mailOptions = {
            from: 'shopmy.official@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) has requested to reset the password for your account. Please click on the following link to reset your password: http://localhost:3000/resetPassword/${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Email sent with password reset instructions" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/resetPassword", async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});




//Cart
const cartRoutes = require('./routes/Cart');
const wishlistRoutes = require('./routes/wishlist');
const voucherRoutes = require('./routes/voucher');
const checkoutRoutes = require('./routes/checkout');
const profile = require('./routes/profile');
const ProdApi = require('./routes/ProdApi')
const supportRoutes = require('./routes/support')
const manageOrderRoutes = require('./routes/Manageorder')

app.use('/api/orders', manageOrderRoutes);
app.use('/api/checkout', checkoutRoutes)
app.use('/api/vouchers', voucherRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use(ProdApi)
app.use(profile)
app.use(supportRoutes)

app.listen(3002, () => {
    console.log("server 1 has started");
});
app.listen(3001, () => {
    console.log("server 2 has started");
});
