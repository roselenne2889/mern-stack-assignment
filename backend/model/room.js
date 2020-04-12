const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = new Schema(
    {
        name: {
            type: String
        },
        created_date: {
            type: Date
        },
        edit_date: {
            type: Date
        },
        status: {
            type: String
        }
    },
    {
        collection: "room"
    }
);
module.exports = mongoose.model("Room", Room);
