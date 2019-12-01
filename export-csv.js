const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cad'
})

const fs = require('fs')

const writable = fs.createWriteStream('users.csv')

writable.write('id,nome,cargo\n', ()=> {

    connection.connect((err)=> {
        const query = connection.query('select * from users')
        query.on('result', (row)=> {
            const data = row.id+','+row.nome+','+row.cargo+'\n'
            writable.write(data)
        })

        query.on('end', ()=> {
            writable.end()
            connection.end()
            console.log('Finished')
        })
    })
})