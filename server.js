const express = require('express'); //import express framework
const app = express(); //initialize express app
const port = 8080; //port

app.get('/', (req, res) => {   //get request
    res.send("Hello World!"); //send hello world 
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`)); //start server