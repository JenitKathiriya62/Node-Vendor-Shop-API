const User = require("../models/usermodel");
const bcryptjs = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const createToken = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, config.secret_jwt);
    return token;
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: spassword,
      image: req.file.filename,
      mobile: req.body.mobile,
      type: req.body.type,
    });

    const userData = await User.findOne({ email: req.body.email });

    if (userData) {
      return res
        .status(401)
        .send({ success: false, msg: "This Email already Exist" });
    } else {
      const user_data = await user.save();
      return res.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: req.body.email });

    if (!userData) {
      return res
        .status(401)
        .send({ success: false, msg: "Please First Register to Login" });
    } else {
      const cpassword = await bcryptjs.compare(password, userData.password);
      if (cpassword) {
        const tokenData = await createToken(userData._id);
        const userResult = {
          _id: userData._id,
          nmae: userData.name,
          email: userData.email,
          password: userData.password,
          image: userData.image,
          mobile: userData.mobile,
          type: userData.type,
          token: tokenData,
        };
        const response = {
          success: true,
          msg: "User Details",
          data: userResult,
        };

        return res.status(200).send(response);
      } else {
        return res
          .status(401)
          .send({ success: false, msg: "Login Details Incorrect !" });
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const password = req.body.password;

    const updatePassword = await User.findOne({ _id: user_id });

    if (updatePassword) {
      const newPassword = await securePassword(password);
     await User.findByIdAndUpdate({_id:user_id},{
        $set:{
          password:newPassword
        }
      });

      return res.status(200).send({ success: true, msg: "User Password Changed" });

    } else {
      return res.status(400).send({ success: false, msg: "User Id Not found" });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
};
