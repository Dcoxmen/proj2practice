const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs =>
      res.render("gigs", {
        gigs
      })
    )
    .catch(err => console.log(err))
);

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
  let {
    title,
    technologies,
    budget,
    description,
    contact_email,
    venue,
    venueaddress
  } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }
  if (!venue) {
    errors.push({ text: "Please add a contact email" });
  }
  if (!venueaddress) {
    errors.push({ text: "Please add a contact email" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
      venue,
      venueaddress
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    // Insert into table
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
      venue,
      venueaddress
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

router.delete("api/gigs/:id", function(req, res) {
  connection.query("DELETE FROM gigs WHERE id = ?", [req.params.id], function(
    err,
    result
  ) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    } else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Search for gigs
router.get("/search", (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { venue: { [Op.like]: "%" + term + "%" } } })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

module.exports = router;
