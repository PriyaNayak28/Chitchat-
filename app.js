const express = require('express');
const app = express();
const loginRoutes = require('./routes/login');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(loginRoutes);

app.use((req, res, next) => {
    res.send("<h1>you went wrong page</h1>")
});

app.listen(3000); 