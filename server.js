const express = require('express'); //import express library
const app = express(); //initialize express app
const port = 3000; //port
const bcrypt = require('bcrypt'); //import bcrypt library

app.use(express.json()) //allow express to parse json data
const users = []  //temp tatabase

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users',  async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(); //generate salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //hash password
        console.log(salt);
        console.log(hashedPassword);
        const user = {name: req.body.name, password: hashedPassword} //create user object
        users.push(user); //add user to users array
        res.status(201).send(); //send response
    }
    catch {
        res.status(500).send()
    }

})

app.post('/users/login',  async (req, res) => {
    const user = users.find(user => user.name === req.body.name); //find
    if(user == null){
        return res.status(400).send('User not found');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success');
        }  else {            
            res.send ('Not Allowed');
        }
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
app.listen(port, () => console.log(`Server started on http://localhost:${port}`)); //start server