const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
require('dotenv').config()

const { createDeposit, gatewayWebhook } = require('./paymentSupport')
const { getStats, getUsers, getTransactions } = require('./adminSupport')
const { getWallet, creditWallet, debitWallet } = require('./walletSupport')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

let timer = 30
setInterval(() => {
  timer--
  io.emit('timer', timer)

  if (timer <= 0) {
    const results = ['RED', 'GREEN', 'VIOLET', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const result = results[Math.floor(Math.random() * results.length)]
    io.emit('result', result)
    timer = 30
  }
}, 1000)

app.get('/', (req, res) => res.json({ ok: true, message: 'Tiranga backend running' }))

app.get('/api/admin/stats', (req, res) => res.json({ ok: true, stats: getStats() }))
app.get('/api/admin/users', (req, res) => res.json({ ok: true, users: getUsers() }))
app.get('/api/admin/transactions', (req, res) => res.json({ ok: true, transactions: getTransactions() }))

app.post('/api/payments/create-deposit', (req, res) => res.json({ ok: true, request: createDeposit(req.body) }))
app.post('/api/payments/gateway-webhook', (req, res) => res.json(gatewayWebhook(req.body, req.headers)))

app.get('/api/wallet/:userId', (req, res) => res.json(getWallet(req.params.userId)))
app.post('/api/wallet/credit', (req, res) => res.json(creditWallet(req.body.userId, req.body.amount, req.body.reason)))
app.post('/api/wallet/debit', (req, res) => res.json(debitWallet(req.body.userId, req.body.amount, req.body.reason)))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on ${PORT}`))
