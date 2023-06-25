require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI =process.env.mongoURI
module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---" + err);
    else {
      console.log("connected to mongo");
      const foodCollection = await mongoose.connection.db.collection(
        "food_items"
      );
      foodCollection.find({}).toArray(async function (err, data) {
        console.log(foodCollection);
        const categoryCollection = await mongoose.connection.db.collection(
          "foodcategory"
        );
        categoryCollection.find({}).toArray(async function (err, Catdata) {
          callback(err, data, Catdata);
          console.log(categoryCollection);
        });
      });
    }
  });
};
