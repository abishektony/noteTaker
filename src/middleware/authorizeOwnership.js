export async function authorizeOwnership(req, res, next) {
  if (!req.user) {
    const error = new Error('Not authenticated. Please provide a valid token.');
    error.status = 401;
    return next(error);
  }

  if (req.user.role !== 'ADMIN') {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }

  next();
}
