const bcrypt = require('bcrypt')

const users = []  //temp database


const user_index = (req, res) => {
   // res.send("Users");
    res.json(users);
}

const encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(); //generate salt
    return await bcrypt.hash(password, salt); //hash password    
}

const login = async (req, res) => {
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
}

const signup = async (req, res) => {
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
}



module.exports = {
    user_index,
    login,
    signup,
    users,
}