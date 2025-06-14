// In your app.js or main server file
exports.cur_user=((req, res, next) => {
  res.locals.cur_user = req.session.cur_user || null;
  next();
});