const express = require("express");
require("./db/Config");
const users = require("./db/users");
const products = require("./db/product");
const cors = require("cors");

const Jwt = require("jsonwebtoken");
const Jwtkey = "e-com";

const app = express();

// -----------signup api-------------------
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, resp) => {
  let user = new users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  if (result) {
    Jwt.sign({ result }, Jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send({ result: "somthin went wrong" });
      }
      resp.send({ result, auth: token });
    });
  }
});

// -----------login api-------------------
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await users.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, Jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "somthin went wrong" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "user not found" });
    }
  } else {
    resp.send({ result: "user not found" });
  }
});

// -----------PRODUCTS POST API--------------
app.post("/add-product", VeryfyToken, async (req, resp) => {
  let product = new products(req.body);
  let result = await product.save();
  resp.send(result);
});

// -----------PRODUCTS GET API--------------
app.get("/products", VeryfyToken, async (req, resp) => {
  let product = await products.find();
  if (product.length > 0) {
    resp.send(product);
  } else {
    resp.send({ result: "No Products Found" });
  }
});

// -----------PRODUCTS DELETE API--------------
app.delete("/delete/:id", VeryfyToken, async (req, resp) => {
  const result = await products.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// -----------PRODUCTS GET  update ke add form ki API--------------
app.get("/product/:id", async (req, resp) => {
  let result = await products.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "user data not found" });
  }
});

// -----------PRODUCTS UPDATE API--------------
app.put("/update/:id", VeryfyToken, async (req, resp) => {
  const result = await products.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

// -----------Search API--------------
app.get("/search/:key", VeryfyToken, async (req, resp) => {
  const result = await products.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function VeryfyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, Jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "please add token with header" });
  }
}

app.listen(4000);
