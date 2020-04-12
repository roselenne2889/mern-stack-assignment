const express = require("express");
const roomRoute = express.Router();

const Room = require("../model/room");

// Get all rooms
roomRoute.route("/").get((req, res, next) => {
    Room.find((error, rooms) => {
        if (error) {
            return next(error);
        }
        res.json(rooms);
    });
});

// Update room
roomRoute.route("/update-room").post((req, res, next) => {
    Room.findOneAndUpdate(
        { name: req.body.old_name },
        {
            status: req.body.status,
            name: req.body.name,
            edit_date: req.body.edit_date
        },
        (error, updatedDoc) => {
            if (error) {
                return next(error);
            }
            res.json(updatedDoc);
        }
    );
});

// Create room
roomRoute.route("/create-room").post((req, res, next) => {
    Room.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});

module.exports = roomRoute;
