const express = require('express')
const bcrypt = require('bcrypt')

const app = express(); //initialize express app
const port = 3000; //port

app.use(express.json()) //allow express to parse json data
const users = []  //temp tatabase

app.get('/', (req, res) => {
    console.log('Entered website!');
})

app.get('/users', (req, res) => {
    res.json(users);
})

 const encryptPassword = async (password) =>{
        const salt = await bcrypt.genSalt(); //generate salt
        return await bcrypt.hash(password, salt); //hash password    
}

app.post('/users/signup',  async (req, res) => {
        try{
        const hashedPassword = await encryptPassword(req.body.password);
        const user = {
            userName: req.body.userName,
            name: req.body.name,
            lastName: req.body.lastName,
            city: req.body.city,
            email: req.body.email,
            password: hashedPassword} //create user object
        users.push(user); //add user to database
        res.status(201).send(); //send response
        } catch{
            res.status(500).send();
        }
})

app.post('/users/login',  async (req, res) => {
    const user = users.find(user => user.userName === req.body.userName); //find
    if(user == null){
        return res.status(400).send('User not found');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('logged in');
        }  else {   
            res.send ('Not Allowed');
        }
    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
app.listen(port, () => console.log(`Server started on http://localhost:${port}`)); //start server