const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const User = new Schema({
    username: {
        type:String,
        trim: true,
        required: [true, 'le nom requis']
    },
    email: {
        type:String,
        required: [true, 'Email requis'],
        unique:true,
        lowercase:true
    },
    password: {
        type:String,
        trim:true
    },
},{
    timestamps: true
});

User.pre('save', async function() { 
    if (!this.isModified('password')) {
        return; 
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});
module.exports = mongoose.model('User', User);