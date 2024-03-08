const TableModel = require('../models/TableModel');
const EntryModel = require('../models/EntryModel');

const saveEntry = async (req, res) => {
    try {
      const { name, email, phone_number, hobby, tableId } = req.body;
      console.log(req.body);
      const entry = await EntryModel.create({
        name: name,
        email: email,
        phone_number: phone_number,
        hobby: hobby,
        tableId: tableId,
      });
      console.log(entry);
      const updatedTable = await TableModel.findByIdAndUpdate(
        entry.tableId,
        { $push: { entries: entry._id } },
        { new: true } // Add this option to return the updated data
      );

      // const updatedTable = await TableModel.findById(entry.tableId);

      console.log("Added Successfully....");
      console.log(updatedTable);

      res.send(entry); // Send the updated table data instead of the entry
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to save entry");
    }
  };
  

const updateEntry = async (req, res) => {
  try {
    const { _id, name, email, phone_number, hobby } = req.body;
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      _id,
      { name, email, phone_number, hobby },
      { new: true }
    );


    console.log("Updated Successfully....");
    console.log(updatedEntry);

    res.send(updatedEntry);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to update entry");
  }
};


  
  


const deleteEntry = async (req, res) => {
  try{
  
    const { ids } = req.body;
    console.log(req.body);
    //do this for each _id in ids
    for (let i = 0; i < ids.length; i++) {
      const _id = ids[i];
      console.log(_id)
        const entry = await EntryModel.findById(_id);
        console.log(entry);
        const tableId = entry.tableId;
        await EntryModel.findByIdAndDelete(_id);
    
        TableModel.findById(tableId)
        .then((data) => {
            const newTasks = data.entries.filter((entry) => {
            return entry !== _id; // Add return statement here
            });
            TableModel.findByIdAndUpdate(tableId, { entries: newTasks }).then((data) => { // Replace newentries with newTasks
            console.log("Deleted Successfully....");
            console.log(data);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    res.send("Deleted Successfully....");
  }
  catch(err){
      console.log(err)
      res.status(500).send("Failed to delete entry")
  };
  
}




module.exports={
    saveEntry,
    updateEntry,
    deleteEntry,
}