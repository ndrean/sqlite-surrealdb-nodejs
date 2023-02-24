import { parse } from "csv-parse";
import https from "https";

import { sqlite3, startDB } from "./sqlite_db.mjs";
const db = new sqlite3.Database(":memory:");

let start = new Date();
const unzipped_airports =
  "https://pkgstore.datahub.io/core/airport-codes/airport-codes_csv/data/e07739e49300d125989ee543d5598c4b/airport-codes_csv.csv";

async function upload() {
  startDB(db);
  https.get(unzipped_airports, (response) => {
    response
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("end", function () {
        console.log("finished");
        console.log("total", new Date() - start);
        start = new Date();
        db.get(`SELECT count(*) FROM airport`, function (err, res) {
          console.log("count", new Date() - start);
          console.log("count:", res);
        });
        start = new Date();
        db.get(
          `SELECT * FROM airport WHERE ident = 'SK-151'`,
          function (err, res) {
            console.log("single", new Date() - start);
            console.log("single", res);
          }
        );
        db.close();
      })
      .on("error", function (error) {
        console.log(error.message);
      })
      .on("data", function (row) {
        db.run(
          `INSERT INTO airport VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6],
            row[7],
            row[8],
            row[9],
            row[10],
            row[11],
          ],
          function (error) {
            if (error) {
              return console.log(error.message);
            }
          }
        );
      });
  });
}

upload();
