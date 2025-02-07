import jwt from "jsonwebtoken";
const generateAdminToken = (user, res) => {
  res.send(
    jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
  );
};
export { generateAdminToken };
