const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Användarschema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    created_at: { 
        type: Date, 
        default: Date.now
    }
});

//Hasha lösenord
userSchema.pre('save', async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();

    } catch(error) {
        next(error);
    }
});

//Registrera användare
userSchema.statics.register = async function(username, password) {
    try {
        const user = new this({
            username,
            password
        });
        await user.save();
        return user;

    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            throw new Error("Användarnamnet är upptaget.");
        }
        throw error;
    }
};

//Jämför hashade lösenord
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);

    } catch (error) {
        throw error;
    }
}

//Logga in användare
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });

        if(!user) {
            throw new Error("Felaktigt användarnamn eller lösenord");
        }

        const isPasswordMatch = await user.comparePassword(password);

        //Inkorrekt
        if(!isPasswordMatch) {
            throw new Error("Felaktigt användarnamn eller lösenord");
        }

        //Korrekt
        return user;

    } catch (error) {
        throw error;
    }
}

const user = mongoose.model("user", userSchema);
module.exports = user;