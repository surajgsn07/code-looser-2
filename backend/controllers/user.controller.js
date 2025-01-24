import {User} from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
  try {
    console.log({req : req.body})
    const { name , email, password} = req.body;

    if(!name || !email || !password ) {
    return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password
    });

    // Save user to the database
    await user.save();
    
    // Generate JWT
    const token = await user.generateJWT();

    res.status(201).json({
      message: "User registered successfully!",
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = await user.generateJWT();

    res.status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const avatarPath = req.file.path;

    const avatar = await uploadToCloudinary(avatarPath);

    if (!avatar) {
      return res.status(500).json({ message: "Avatar upload failed" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatar.secure_url },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Avatar updated successfully",
      user: updatedUser,
    });


    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, skills, bio, achievements, links, address } = req.body;        

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, skills, bio, achievements, links, address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
