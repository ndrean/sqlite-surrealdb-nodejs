import { parse } from "csv-parse";
import https from "https";
import Surreal from "surrealdb.js";
const db = new Surreal("http://127.0.0.1:8000/rpc");

const unzipped_airports =
  "https://pkgstore.datahub.io/core/airport-codes/airport-codes_csv/data/e07739e49300d125989ee543d5598c4b/airport-codes_csv.csv";

async function upload() {
  const start = new Date();
  https.get(unzipped_airports, (response) => {
    response
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("error", function (error) {
        console.log(error.message);
      })
      .on("data", async function (row) {
        await db.create("airport", {
          ident: row[0],
          type: row[1],
          name: row[2],
          elevation_ft: row[3],
          continent: row[4],
          iso_country: row[5],
          iso_region: row[6],
          municipality: row[7],
          gps_code: row[8],
          iata_code: row[9],
          local_code: row[10],
          coordinates: row[11],
        });
      })
      .on("end", async function () {
        console.log("finished");
        console.log(new Date() - start);
        // await queries();
      });
  });
}

async function main() {
  await db.signin({
    user: "root",
    pass: "root",
  });

  await db.use("testnd", "testdb");

  return upload();
}

main();

// export { db };
