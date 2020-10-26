const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://mongoDbUser:98765@cluster0.s1bez.mongodb.net/react-shopping-cart-db?retryWrites=true&w=majority", {
    dbName: "react-shopping-cart-db",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});
const Product = mongoose.model("products", new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        price: Number,
        availableColor: [String]
    })
);

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const PORT = process.env.PORT || 5000;

const Order = mongoose.model("order", new mongoose.Schema({
        _id:{
            type: String,
            default: shortid.generate
        },
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
            {
                _id: String,
                title: String,
                price: Number,
                count: String
            }
        ]
    },
    {
        timestamps: true
    }
))
app.post("/api/orders", async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.address || !req.body.total || !req.body.cartItems){
        return res.send({message: "Data is required"})
    }
    const order = await Order(req.body).save();
    res.send(order);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });


app.use(express.static('client/build'))
