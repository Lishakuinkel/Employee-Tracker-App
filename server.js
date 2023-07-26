//importing and requiring dependencies
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded)({ extended: false });
app.use(express.json());

//connecting to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
},
    console.log('successfully connected to the employee_db database')
);


app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});