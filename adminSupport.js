function getStats() {
  return {
    totalUsers: 12480,
    totalDeposits: 4820000,
    totalWithdrawals: 3140000,
    totalBets: 9280000
  }
}

function getUsers() {
  return [
    { id: 4951, name: 'MEMBERNNGYKPIJ', phone: '98xxxx2210', balance: 152659.22, status: 'Active' },
    { id: 4952, name: 'USER9081', phone: '91xxxx4588', balance: 8240, status: 'Active' },
    { id: 4953, name: 'PLAYER777', phone: '88xxxx9201', balance: 42100, status: 'Blocked' }
  ]
}

function getTransactions() {
  return [
    { user: 'MEMBERNNGYKPIJ', type: 'Deposit', amount: 10000, status: 'Pending' },
    { user: 'PLAYER777', type: 'Withdraw', amount: 4500, status: 'Pending' }
  ]
}

module.exports = { getStats, getUsers, getTransactions }
