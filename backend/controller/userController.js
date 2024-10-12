const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const ApiError = require("../error/ApiError.js");
const { User, Cart } = require("../models/models.js");

const generateJwt = (id, email, role) => {
  return jwtoken.sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badrequest("Invalid Password or Email"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badrequest("User with this email adress already exists")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const cart = await Cart.create({ userId: user.id });
    const jwt = generateJwt(user.id, user.email, user.role);

    return res.json({ jwt });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Invalid password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
