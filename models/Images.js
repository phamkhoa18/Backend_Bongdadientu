	

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title       : {type : String } ,
    description : {type : String } ,
    image       : String ,
    link        : String ,
    created_at  : {type : Date , default : Date.now()},
    updated_at  : {type : Date , default : Date.now()},
    posision : {type : String , default : '' },
})

const Sliders = mongoose.model('Images' , imageSchema);
module.exports = Sliders ;
