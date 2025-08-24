// models/user-store.js
import { v4 as uuid } from "uuid";

const userStore = { //y to hold users data
  users: [], // { id, name, email, password }  // PLAIN TEXT (for learning only)

  createUser(name, email, password) { // creates new user and adds it to array
    const user = { id: uuid(), name: name || "", email, password };// builds a profile with details
    this.users.push(user);
    return user;
  },

  getByEmail(email) {// finds first user whos email matches one entered https://www.youtube.com/watch?v=R8rmfD9Y5-c, https://www.freecodecamp.org/news/javascript-array-find-tutorial-how-to-iterate-through-elements-in-an-array/?
    return this.users.find(u => u.email === email);
  },

  getById(id) { // finds user with id
    return this.users.find(u => u.id === id);
  }, 

  // Update details
 update(id, changes) {
  if (!this.users) this.users = [];

  var i = 0;// starts at first index
  while (i < this.users.length) {// loop for array
    var u = this.users[i];// user at index i

    if (u && u.id === id) { // check ids match
      if (changes) { // only update if there is something to update https://stackoverflow.com/questions/65316870/how-to-use-patch-with-node-js-and-express
        // if the key exists in patch update it https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
        if ('name'     in changes) u.name = changes.name;// update name/ email/ password https://stackoverflow.com/questions/13632999/ifkey-in-object-or-ifobject-hasownpropertykey
        if ('email'    in changes) u.email = changes.email;
        if ('password' in changes) u.password = changes.password;
      }
      return true; // update done
    }

    i = i + 1; // next user
  }

  return false; // not found
}
};

export default userStore;
