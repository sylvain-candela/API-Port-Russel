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

// Dans models/user.js
User.pre('save', async function() { // On enlève le "next" ici
    if (!this.isModified('password')) {
        return; // Plus besoin de next()
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error; // Mongoose attrapera l'erreur tout seul
    }
});
module.exports = mongoose.model('User', User);