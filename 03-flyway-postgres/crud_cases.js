const pg = require('pg');

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

; (async function () {
    try {
        const client = await pool.connect();
        try {
            console.log("# Inserting values");
            const result = await client.query('INSERT INTO userinfo(username,departname,created) VALUES($1,$2,$3) returning uid;', ["shen", "R&D", "2020-08-02"]);
            console.log(result.rows[0]);
            const uid = result.rows[0].uid;

            console.log("last inserted id =", uid);
            console.log("# Updating");
            const result1 = await client.query('update userinfo set username=$1 where uid=$2', ['eric', uid]);
            console.log(result1.rowCount, 'rows changes');

            console.log("# Querying")
            const { rows } = await client.query("SELECT * FROM userinfo");

            console.log("uid | username | department | created ")
            rows.forEach(r => {
                console.log(`${r.uid}  | ${r.username} | ${r.departname} | ${r.created} `);
            });

            console.log("# Deleting")
            const result2 = await client.query("delete from userinfo where uid=$1", [uid]);
            console.log(result2.rowCount, "rows changed")
        } catch (err) {
            console.error("failed to execute query", err);
        }
        client.release();
    } catch (err) {
        console.error("failed to create pool", err);
    }
})();

