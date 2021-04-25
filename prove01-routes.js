const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove01 - Home</title></head>');
        res.write('<body>');
        res.write('<h1>Welcome!</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<label for="username">Username</label>');
        res.write('<input name="username" type="text"> ');
        res.write('<button type="submit">Submit</button>');
        res.write('</form');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    else if (url === '/users') {
        fs.readFile('data.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Prove01 - Home</title></head>');
            res.write('<body>');
            res.write('<h1>User List</h1>');
            res.write('<ul>');
            const users = data.split(',');
            users.forEach(user => {
                res.write(`<li>${user}</li>`)
            });
            res.write('</ul>');
            res.write('</body>')
            res.write('</html>');
            return res.end();
        })
    }
    else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedbody = Buffer.concat(body).toString();
            const username = parsedbody.split('=')[1]
            fs.appendFile('data.txt', `,${username.replaceAll('+', ' ')}`, err => {
                if (err) throw err;
                console.log('Saved!');
            });
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

module.exports = requestHandler