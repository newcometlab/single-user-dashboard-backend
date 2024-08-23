// const fs = require('fs');
// const pg = require('pg');
// const url = require('url');

// const config = {
//     user: "",
//     password: "",
//     host: "",
//     port: 11968,
//     database: "",
//     ssl: {
//         rejectUnauthorized: true,
//         ca: ``,
//     },
// };

// const client = new pg.Client(config);
// client.connect(function (err) {
//     if (err)
//         throw err;
//     client.query("SELECT VERSION()", [], function (err, result) {
//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         client.end(function (err) {
//             if (err)
//                 throw err;
//         });
//     });
// });