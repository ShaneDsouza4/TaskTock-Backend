const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  prettyLength: {
    type: String,
    required: true,
  },
});

//Main Schema
const taskbookSchema = new mongoose.Schema(
  {
    entries: [entrySchema], //Will contain entry schema
    userRef: {
      //Soft level join, that corresponds to the User's _id
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "taskbooks",
  }
);

module.exports = mongoose.model("Taskbook", taskbookSchema);
