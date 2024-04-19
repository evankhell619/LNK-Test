import Data from "../models/dataModel.js";

const createData = async (req, res) => {
  try {
    const newData = new Data({
      email: req.body.email,
    });
    const savedData = await newData.save();
    res.json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateData = async (req, res) => {
  try {
    const update = await Data.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteData = async (req, res) => {
  try {
    const deleted = await Data.deleteOne({ _id: req.params.id });
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 *! login logout
 */
const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await Data.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    await Data.findOneAndUpdate(
      { email },
      { $set: { loginTimestamp: new Date() } }
    );
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logoutUser = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await Data.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    await Data.findOneAndUpdate(
      { email },
      { $set: { logoutTimestamp: new Date() } }
    );
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  createData,
  getAllData,
  updateData,
  deleteData,
  loginUser,
  logoutUser,
};
