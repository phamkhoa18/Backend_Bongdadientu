const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    title       : {type : String , required : true} ,
    type_id : {type : mongoose.Types.ObjectId , ref : "Types"} ,
    data : [mongoose.Schema.Types.Mixed] ,
    created_at  : {type : Date , default : Date.now()},
    updated_at  : {type : Date , default : Date.now()},
})

const Ranks = mongoose.model('Ranks' , rankSchema);
module.exports = Ranks ;
