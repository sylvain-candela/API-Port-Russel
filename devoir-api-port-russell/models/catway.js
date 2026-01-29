const mongoose = require('mongoose');

const catwaySchema = mongoose.Schema ({
    catwayNumber: {type:Number, required: true, unique: true },
    catwayType: {type:String, required: true, enum:['long','short']},
    catwayState: {type:String, required:true},
    description:{type:String},
})

module.exports = mongoose.model('Catway', catwaySchema);