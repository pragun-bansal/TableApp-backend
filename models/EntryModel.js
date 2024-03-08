const mongoose=require("mongoose")

const EntrySchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
        // validate: [isEmail, "invalid email"],
      },
    phone_number:{
        type:String,
        required:true
    },
    hobby:{
        type:String,
        required:true
    },
    tableId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Table"
    }
  
})

module.exports = mongoose.model('Entry',EntrySchema);

