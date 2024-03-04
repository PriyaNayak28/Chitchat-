const express = require('express');
const routes = express.Router();
const fs = require('fs');
routes.use(express.json());

routes.get('/login', (req, res, next) => {
    res.send(`
    <html>
    <head>
    <title>chatAPP</title>
    </head>
    <body>
    <form action ="/user" method ="POST">
    <h1>welcome to login page</h1>
    <input type="text" name="username" value="" id="username" placeholder="username">
    <button type="submit">login</button>
    </form>
    </body>
    </html>
    <script>
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const user = {
            username,
        };

        localStorage.setItem('username', JSON.stringify(user));
        this.submit();
    });
</script> `)
})

routes.post('/user', (req, res, next) => {

    const username = req.body.username;
    const message = req.body.chat;

    fs.writeFile('userDetails.txt', `${username}:${message}\n`, { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error writing to file');
        }
        res.redirect('/');
    });
});

routes.get('/', (req, res, next) => {
    fs.readFile('userDetails.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            data = 'no chat exist';
        }
        res.send(`
    ${data}
    <form action ="/user" method ="POST">
    <input type="hidden" name="username" value="" id="username">
    <input type="text" name="chat" value="">
    <button type="submit">send message</button>
    </form>
`
        )
    })
})

module.exports = routes;












// const express = require('express');
// const routes = express.Router();
// const fs = require('fs');
// routes.use(express.json());

// routes.get('/login', (req, res, next) => {
//     res.send(`
//     <html>
//     <head>
//     <title>chatAPP</title>
//     </head>
//     <body>
//     <form action="/user" method="POST">
//     <h1>welcome to login page</h1>
//     <input type="text" name="username" value="" id="username" placeholder="username">
//     <button type="submit">login</button>
//     </form>
//      </body>
//     </html>
//     <script>
//     document.querySelector('form').addEventListener('submit', function (event) {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const user = {
//             username,
//         };

//         localStorage.setItem('username', JSON.stringify(user));
//         this.submit();
//     });
// </script> `);
// });

// routes.post('/user', (req, res, next) => {
//     const username = req.body.username;
//     const message = req.body.chat;
//     fs.writeFile('userDetails.txt', `${username}: ${message}\n`, { flag: 'a' }, (err) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send('Error writing to file');
//         }
//         res.redirect('/');
//     });
// });

// routes.get('/', (req, res, next) => {
//     fs.readFile('userDetails.txt', 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//             data = '';
//         }
//         res.send(`
//             ${data}
//             <form action="/user" method="POST">
//                 <h1>welcome to login page</h1>
//                 <input type="hidden" name="username" value="" id="username">
//                 <input type="text" name="chat" value="">
//                 <button type="submit">Send Message</button>
//             </form>
//         `);
//     });
// });

// module.exports = routes;
