const Taskbook = require("../models/Taskbook");

exports.getTaskbook = async (req, res) => {
  const taskbook = await Taskbook.findOne({ userRef: req.user._id });

  if (taskbook) {
    res.status(200).json(taskbook.entries);
  } else {
    res
      .status(400)
      .json({ err: "No taskbook was found under the requested user id" });
  }
};

exports.saveEntries = async (req, res) => {
  const entries = req.body;
  console.log(req.body);

  const taskbook = await Taskbook.findOne({ userRef: req.user._id }); //userRef is softlevel join

  if (taskbook) {
    taskbook.entries = taskbook.entries.concat(entries);
    console.log(taskbook.entries);

    const workbook_ = await taskbook.save();

    res.status(200).json(taskbook.entries.length);
  } else {
    const toSave = {
      userRef: req.user._id,
      entries: entries,
    };
    console.log(toSave);
    const newWorkbook = new Taskbook({ ...toSave });
    const workbook_ = await newWorkbook.save();

    res.status(200).json(toSave.entries.length);
  }
};
