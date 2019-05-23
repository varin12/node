const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql');
var fs = require('fs');

var port = process.env.PORT || 3100;
var con1 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pse8m3",
    database: "work"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/save', (req, res) => {
    let arrStr = req.body;
    var sql = 'INSERT INTO `workk`(`num1`) VALUES (?)';
    con1.query(sql, [arrStr.join(",")], function (err, rows) {
        if (err) throw err;
        res.send('sucsess');
    })
});

app.delete('/delete', (req, res) => {
    var sql = "DELETE FROM `workk`";
    con1.query(sql, function (err, rows) {
        if (err) throw err;
        res.send('sucsess');
    })

})

app.get('/getLL', (req, res) => {
    var sql = "SELECT * FROM `shownum` ";
    con1.query(sql, function (err, rows) {
        if (err) throw err;
        let data = rows.filter((data) => {
            console.log((data.num2 / 5))
            return (data.num2 / 5 == 0);
        })
        let array_data = [];
        data.map((data) => {
            array_data.push(data.num2);
        })
        res.json(data);
    });
})

app.get('/getoo', (req, res) => {
    var sql = "SELECT * FROM `shownum` ";
    con1.query(sql, function (err, rows) {
        if (err) throw err;
        let data = rows.filter((data) => {
            return (data.num2 * 2 == 1000);
        })
        res.json(data);
    });
})

app.get('', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./index.html', null, function (error, data) {
        res.write(data);
        res.end();
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))