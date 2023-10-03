const express = require('express')
const app = express(); //initialize express app
const userRoute = require('./routes/User');
const port = 3000; //port

app.use(express.json()) //allow express to parse json data
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index.ejs');
})


//user routes
app.use('/user', userRoute);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`)); //start server