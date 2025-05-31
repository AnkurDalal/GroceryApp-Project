import jwt from "jsonwebtoken";

//seller login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true, //prevent js to access the cookie
        secure: process.env.NODE_ENV === "production", //only send cookie over https in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //allow cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days(cookie expiration time)
      });
      return res.json({ success: true, message: "Logged In" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//seller isAuth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//seller logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true, //prevent js to access the cookie
      secure: process.env.NODE_ENV === "production", //only send cookie over https in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //allow cross-site cookie
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
