import Surreal from "surrealdb.js";
const db = new Surreal("http://127.0.0.1:8000/rpc");

async function queries() {
  await db.signin({
    user: "root",
    pass: "root",
  });

  await db.use("testnd", "testdb");

  const count = await db.query("SELECT count() FROM airport GROUP BY ALL;");
  console.log(JSON.stringify(count));

  const detail = await db.query(
    "SELECT * FROM airport WHERE ident = 'SK-151';"
  );
  console.log(JSON.stringify(detail));
}

queries();
