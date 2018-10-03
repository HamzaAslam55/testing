const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DoitSchema = new Schema({
    
userid:{type:Schema.Types.ObjectId,ref:'User'},
reciverid:{type:Schema.Types.ObjectId,ref:'Reciver'},

    title: String,       
    info: String,
    category:String,
    about:String,
    picture:{type:String,default:"https://gravatar.com/avatar/"}
});
module.exports=mongoose.model('Doit',DoitSchema);