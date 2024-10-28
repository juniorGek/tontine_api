// checkUserType.js
const checkUserType = (req, res, next) => {
    const { user } = req.user;
    console.log(user);
    if (user !== "Admin" && user !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Access Denied: Insufficient Privileges" });
    }
    next();
  };
  
  module.exports = checkUserType;
  