const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse the request body
app.use(bodyParser.json());

// POST /auth endpoint
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  // Perform any necessary authentication logic here
  // You can save the data to a database or check against existing records

  // Example response
  if (email === "example@example.com" && password === "password") {
    res.json({ success: true, isAdmin: false });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// POST /users endpoint
app.post("/users", (req, res) => {
  const { firstName, lastName, email, password, rePassword } = req.body;

  // Perform any necessary logic to store the user data
  // You can save the data to a database or perform any required validations

  // Example response
  res.json({ success: true, message: "User data stored successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
