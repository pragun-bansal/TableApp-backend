const mongoose=require("mongoose")

const TableSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    entries: [
        {
          type: String,
          
          ref: "Entry",
        },
      ],

})

module.exports = mongoose.model('Table',TableSchema);

