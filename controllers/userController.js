const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { User } = require("../models");
const { response } = require("express");

module.exports = {
  index: async (req, res) => {
    const usuarios = await User.findAll();
    res.render("users", { users: usuarios });
  },

  store: async (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        avatar: path.basename(files.avatar.path),
      },
      res.redirect("/usuarios"));

      console.log("ERRORES:");
      console.log(err);
      console.log("FIELDS:");
      console.log(fields);
      console.log("FILES:");
      console.log(files);
    });
  },

  create: async (req, res) => {
    res.render("createUser");
  },
};
