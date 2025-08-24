

import userStore from "../models/user-store.js"; 

export const accountsController = {
  

  showSignup(req, res) { // https://expressjs.com/en/api.html
    // Render the signup
    res.render("signup");
  },

  showLogin(req, res) {
    // Render the login
    res.render("login");
  },


  signup(req, res) {
    // Pull form 
    const { name, email, password } = req.body;

    // Simple duplicate-email 
    if (userStore.getByEmail(email)) {
      // Send a plain message back if the email is already taken
     
      res.send("Email already registered");
      return; // stops if email already in use https://www.geeksforgeeks.org/web-tech/express-js-res-redirect-function/
    }

    // Create user in our in-memory store
    const user = userStore.createUser(name, email, password);

    // Mark user as logged in by saving their id in the session https://stackoverflow.com/questions/65805015/extending-session-object-in-express-session
    
    req.session.userId = user.id; 

    // Redirect the browser to /dashboard after signup https://stackoverflow.com/questions/65805015/extending-session-object-in-express-session
    res.redirect("/dashboard");
  },

  // Show the profile edit page
showAccount(req, res) {
  const userId = req.session.userId;        // who is logged in

  // block guests / not logged in
  if (!userId || userId === "guest") {
    res.redirect("/login");
    return;
  }

  const user = userStore.getById(userId);   // fetch user record
  if (!user) {
    res.redirect("/login");
    return;
  }

  // render the view with the user data
  res.render("account", { user: user });
},

// Handle profile form submit
updateAccount(req, res) {
  const userId = req.session.userId;

  // block guests / not logged in
  if (!userId || userId === "guest") {
    res.redirect("/login");
    return;
  }

  const user = userStore.getById(userId);
  if (!user) {
    res.redirect("/login");
    return;
  }

  // read fields from the form
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // build a simple patch with only non-empty values
  const patch = {};
  if (name && name.trim() !== "")   patch.name = String(name);
  if (email && email.trim() !== "") patch.email = String(email);
  if (password && password !== "")  patch.password = String(password);

  // apply changes and go back to the profile page
  userStore.update(userId, patch);
  res.redirect("/account");
},

showAccount(req, res) {
  const userId = req.session.userId;
  if (!userId || userId === "guest") {  // not logged in
    res.redirect("/login");
    return;
  }
  const user = userStore.getById(userId);
  if (!user) {                          // just in case
    res.redirect("/login");
    return;
  }
  res.render("account", { user: user });
},

updateAccount(req, res) {
  const userId = req.session.userId;
  if (!userId || userId === "guest") {
    res.redirect("/login");
    return;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const patch = {};
  if (name && name.trim() !== "")   patch.name = String(name);
  if (email && email.trim() !== "") patch.email = String(email);
  if (password && password !== "")  patch.password = String(password);

  userStore.update(userId, patch);
  res.redirect("/account");
},


  login(req, res) {
    // Read submitted email/password
    const { email, password } = req.body;

    // Find the user record by email
    const user = userStore.getByEmail(email);

    //  password check  https://www.sitepoint.com/using-json-web-tokens-node-js/
    if (!user || user.password !== password) {
      // If invalid, send a basic message
      res.send("Invalid email or password");
      return;
    }

    // Store the users id in the session
    req.session.userId = user.id;

    // Redirect to the dashboard page
    res.redirect("/dashboard");
  },

 

  
    // ends the session Then send the user to the login page https://www.w3schools.in/express-js/session-management?
    logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed");
    }
    // clear the default  cookie
    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
}

};
