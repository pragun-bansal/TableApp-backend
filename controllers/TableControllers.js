const TableModel = require('../models/TableModel');
const EntryModel = require('../models/EntryModel');


const saveTable = async (req, res) => {
    //code to try and create a new table in try catch 
    try {
      const { name } = req.body;
      const table = await TableModel.create({ name: name, entries: [] });
      console.log("Added Successfully....");
      console.log(table);
      res.send(table);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to save table");
    }
  };
  

const updateTable= async (req,res)=>{
    //code to update a table name in try catch
    try {
      const { _id, name } = req.body;
      await TableModel.findByIdAndUpdate(_id, { name });
      const newTable= await TableModel.findById(_id);
      console.log("Updated Successfully....");
      console.log(newTable);
      res.send(newTable);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to update table");
    }
}


  
  


const deleteTable = async (req, res) => {
    //code to delete table and all its entries in table.entries in a try catch block
    try{
        const { _id } = req.body;
        const table = await TableModel.findById(_id);
        console.log(table);
        const entries = table.entries;
        for (let i = 0; i < entries.length; i++) {
            const _id = entries[i];
            await EntryModel.findByIdAndDelete(_id);
        }
        await TableModel.findByIdAndDelete(_id);
        console.log("Deleted Successfully....");
        res.send("Deleted Successfully....");
    }
    catch(err){
        console.log(err)
        res.status(500).send("Failed to delete table")
    }
  };

  //code to write a function getAllTables to get all tables in a try catch block
    const getAllTables = async (req, res) => {
        try {
        const tables = await TableModel.find({});
        console.log("Fetched Successfully....");
        res.send(tables);
        } catch (err) {
        console.log(err);
        res.status(500).send("Failed to fetch tables");
        }
    };

//code to get table by id with all its entries in a try catch block
const getTableById = async (req, res) => {
    try {
      const { _id } = req.body;
      console.log(_id);
      console.log(req.body)
      const table = await TableModel.findById(_id);
      const entries = await Promise.all(table.entries.map(entryId => EntryModel.findById(entryId)));
      // return entries;
      console.log("Fetched Successfully....");
      res.send({ table, entries });
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to fetch table");
    }
  };



module.exports={
    saveTable,
    updateTable,
    deleteTable,
    getAllTables,
    getTableById
}