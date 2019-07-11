const mongoose = require('mongoose');

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserModel = mongoose.Schema({
    id: { type: Number, required: true, unique : true },
    name: { type : String, required: true },
    status: { type : String, required: true },
    birthdate: { type : Date, required: true },
    email: { type : String, trim: true, validate: [validateEmail, 'Debes de especificar un correo valido'], required: true, unique : true},
    fav_sports: { type: [String] , enum: { values : ['futbol', 'basquetbol', 'natacion'], message : "[futbol,basquetbol,natacion]:Deportes permitidos" } },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', UserModel);