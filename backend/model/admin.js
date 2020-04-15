const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AdminSchema = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        collection: "admin"
    }
);

AdminSchema.statics.authenticate = function(username, password, callback) {
    Admin.findOne({ username: username }).exec(function(err, admin) {
        if (err) {
            return callback(err);
        } else if (!admin) {
            var err = new Error("Admin not found.");
            err.status = 401;
            return callback(err);
        }
        if (password === admin.password) {
            return callback(null, admin);
        } else {
            return callback();
        }
    });
};
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
