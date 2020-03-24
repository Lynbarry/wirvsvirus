const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
const port = process.env.PORT || 3001;

const sheets = google.sheets("v4");

const spreadsheetId = "1Kyb0LPvplFFeT5vNmcs1GIfuEmrAqDR4fLDK4R2BkI4";

sheets.spreadsheets.values
  .get({
    auth: process.env.GOOGLE_SHEET_API_KEY,
    spreadsheetId,
    range: "A1:R100"
  })
  .then(res => {
    const dataWithoutFirstRow = res.data.values.slice(1);
    return dataWithoutFirstRow.map(row => {
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
    app.use(cors());
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
      const convertedSelection = convertSelection(req.body);
      const fittingListings = getFittingListing(
        cleanedListings,
        convertedSelection
      );
      res.json(fittingListings);
    });

    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  });

/*
  Takes data in the form of:
  {
    kopfbauch: 'Kopf',
    helldunkel: 'Hell',
    grossklein: 'Klein',
    lautleise: 'Leise'
  }
  and converts it to what we need
  */
function convertSelection(selection) {
  return {
    light: selection.helldunkel,
    body: selection.kopfbauch,
    size: selection.grossklein,
    noise: selection.lautleise
  };
}

function getFittingListing(listings, input) {
  const fittingListings = listings.filter(listing => {
    return input.light
      ? listing.categories.light === input.light
      : true && input.body
      ? listing.categories.body === input.body
      : true && input.size
      ? listing.categories.size === input.size
      : true && input.noise
      ? listing.categories.noise === input.noise
      : true && input.clean
      ? listing.categories.clean === input.clean
      : true && input.speed
      ? listing.categories.speed === input.speed
      : true;
  });

  const randomFittingListing =
    fittingListings[Math.floor(Math.random() * fittingListings.length)];
  return randomFittingListing;
}
