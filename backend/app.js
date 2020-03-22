const express = require("express");
var bodyParser = require("body-parser");
const csv = require("csvtojson");
const csvFilePath = "listings.csv";
const app = express();
const port = 3000;

csv({ output: "csv" })
  .fromFile(csvFilePath)
  .then(csvRows => {
    return csvRows.map(row => {
      return {
        created: row[0],
        title: row[1],
        abstract: row[2],
        date: row[3],
        time: row[4],
        duration: row[5],
        level: row[6],
        participantCount: row[7],
        broadcast: row[8],
        name: row[9],
        email: row[10],
        cost: row[11],
        categories: {
          light: row[12],
          body: row[13],
          size: row[14],
          noise: row[15],
          clean: row[16],
          speed: row[17]
        }
      };
    });
  })
  .then(cleanedListings => {
    app.use(bodyParser.json());
    app.get("/", (req, res) => res.send("Hello World!"));

    /* 
    Expect JSON in the following structure:
    { 
        light: Hell | Dunkel,
        body: Kopf | Bauch,
        size: Gross | Klein,
        noise: Laut | Leise,
        clean: Sauber | Dreckig,
        speed: Schnell | Langsam
    }
    Example:
    {"light":"Hell","body":"Kopf","size":"Klein","noise":"Leise","clean":"Sauber","speed":"Langsam"}
    */
    app.post("/listing", (req, res) => {
      const fittingListings = getFittingListing(cleanedListings, req.body);
      res.json(fittingListings);
    });

    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  });

function getFittingListing(listings, input) {
  const fittingListings = listings.filter(listing => {
    return (
      listing.categories.light === input.light &&
      listing.categories.body === input.body &&
      listing.categories.size === input.size &&
      listing.categories.noise === input.noise &&
      listing.categories.clean === input.clean &&
      listing.categories.speed === input.speed
    );
  });

  const randomFittingListing =
    fittingListings[Math.floor(Math.random() * fittingListings.length)];
  return randomFittingListing;
}
