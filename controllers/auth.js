function requireAuth(req, res, next) {
  // If there is no one logged in brings them  to the login page
  if (!req.session.userId) {
    res.redirect("/login");
    return; 
  }

  
  next();
}

module.exports = requireAuth;