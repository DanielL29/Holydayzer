import express from 'express'
import cors from 'cors'
import holidays from './db.js'

const app = express()
const PORT = 4000

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}...`))
app.use(cors())

app.get('/holidays', (_, res) => {
    res.send(holidays)
})

app.get('/is-today-holiday', (_, res) => {
    const today = new Date()

    for(let i = 0; i < holidays.length; i++) {
        if(today.toLocaleDateString('en-US') === holidays[i].date) {
            return res.send(`Sim, hoje é ${holidays[i].name}`)
        }
    }

    return res.send('Não, hoje não é feriado')
})

app.get('/holidays/:id', (req, res) => {
    const id = req.params.id

    const monthHolidays = holidays.filter(holiday => holiday.date.split('/')[0] === id)
    res.send(monthHolidays)
})