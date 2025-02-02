import * as authService from "../services/auth.services.js";

export const createUser = async (req, res) => {
  try {
    const {
      email,
      name,
      mobile,
      role,
      password,
    } = req.body;
    const user = await authService.createUser({
      email,
      name,
      mobile,
      role,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    res.json(user);
  } catch (error) {
    console.log("error", error);

    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {

  try {
    const { oldPassword, newPassword } = req.body;
    const user = await authService.changePassword({
      oldPassword,
      newPassword,
      userId: req.user._id,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserInfo = async (req, res) => {

  try {
    const user = await authService.getUserInfo(req.user._id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};