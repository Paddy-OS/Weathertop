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
  }
};

export default userStore;
