import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res, next) {
  try {
    const { email, password, role } = req.body;
    const newUser = await signUp(email, password, role);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export async function logInHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const accessToken = await logIn(email, password);
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
}
