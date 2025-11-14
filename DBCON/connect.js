let mongoose = require("mongoose");
let con_string = "mongodb+srv://aakriti24cse_db_user:o9ek44PhLQZBnbfJ@studentcluster0.ylgrtuo.mongodb.net/studentDB";

let connectDB = async () => {
  try {
    await mongoose.connect(con_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database is connected");
  } catch (err) {
    console.log("Error: " + err);
  }
};

module.exports = connectDB;