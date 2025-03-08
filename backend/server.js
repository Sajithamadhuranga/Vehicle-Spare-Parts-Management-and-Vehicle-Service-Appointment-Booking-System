const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sign Up
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, password } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (user && user.password === password) {
    res.json({ message: "Login successful", userId: user.id });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Contact Us
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const contact = await prisma.contactMessage.create({ data: { name, email, message } });
  res.json({ message: "Message sent successfully", contact });
});

// Add Spare Part
app.post("/spare-parts", async (req, res) => {
  const { name, description, price } = req.body;
  const part = await prisma.sparePart.create({
    data: { name, description, price: parseFloat(price) },
  });
  res.json(part);
});

// Get Spare Parts
app.get("/spare-parts", async (req, res) => {
  const parts = await prisma.sparePart.findMany();
  res.json(parts);
});

// Delete Spare Part
app.delete("/spare-parts/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.sparePart.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Deleted successfully" });
});

// Add to Cart
app.post("/cart", async (req, res) => {
  const { partId } = req.body;
  const cartItem = await prisma.cartItem.create({ data: { partId } });
  res.json(cartItem);
});

// Get Cart Items
app.get("/cart", async (req, res) => {
  const cart = await prisma.cartItem.findMany({
    include: { sparePart: true },
  });
  res.json(cart);
});

// Remove from Cart
app.delete("/cart/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.cartItem.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Removed from cart" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
