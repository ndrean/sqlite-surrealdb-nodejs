import sqlite3 from "sqlite3";

function startDB(db) {
  db.exec(`
    DROP TABLE IF EXISTS airport;
    CREATE TABLE IF NOT EXISTS airport (
        ident text,
        elevation_ft text,
        type text,
        name text,
        continent text,
        iso_country text,
        iso_region text,
        municipality text,
        iata_code text,
        local_code text,
        gps_code text,
        coordinates text
        )
  `);
}

export { sqlite3, startDB };
