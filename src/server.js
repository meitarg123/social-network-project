const express = require('express')
const app = express();
const userRoute = require('./routes/User');
const port = 3000;

app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log("Received a request for /");
    res.render('index.ejs');
})

app.get("/search/:key",(req, res) => {
    console.log(`Received a search request for ${req.params.key}`);
    res.send("searchDone");
})

app.use('/user', userRoute);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
