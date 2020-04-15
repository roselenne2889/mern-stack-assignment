const express = require("express");
const app = express();
const adminRoute = express.Router();

// Admin model
const Admin = require("../model/admin");

// Admin login
adminRoute.route("/login").post((req, res, next) => {
    if (req.body.username && req.body.password) {
        Admin.authenticate(
            req.body.username,
            req.body.password,
            (error, admin) => {
                return res.json(admin);
            }
        );
    }
});

module.exports = adminRoute;
