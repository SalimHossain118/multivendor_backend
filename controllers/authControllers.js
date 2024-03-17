/** @format */

const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel.js");
class authControllers {
  admin_login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase(); // Normalize email address
    console.log("Normalized Email:", normalizedEmail); // Log the normalized email address

    try {
      const admin = await adminModel.findOne({ email: normalizedEmail });
      console.log("Admin from DB:", admin);
      if (!admin) {
        console.log("No admin found with the provided email");
        return res
          .status(404)
          .json({ error: "No admin found with the provided email" });
      }

      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      console.log("Password Match:", passwordMatch); // Log password match result
      if (!passwordMatch) {
        console.log("Incorrect password");
        return res.status(401).json({ error: "Incorrect password" });
      }

      console.log("Admin found:", admin);
      res.status(200).json({ message: "Admin logged in successfully", admin });
    } catch (error) {
      console.error("Error occurred during admin lookup:", error);
      res.status(500).json({ error: "An error occurred during admin lookup" });
    }
  };
}

module.exports = new authControllers();
