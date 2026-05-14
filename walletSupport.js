const wallets = new Map()

function ensureWallet(userId) {
  if (!wallets.has(userId)) wallets.set(userId, { userId, balance: 0, logs: [] })
  return wallets.get(userId)
}

function getWallet(userId) {
  return { ok: true, wallet: ensureWallet(userId) }
}

function creditWallet(userId, amount, reason = 'credit') {
  const wallet = ensureWallet(userId)
  wallet.balance += Number(amount)
  wallet.logs.unshift({ type: 'credit', amount: Number(amount), reason, time: new Date().toISOString() })
  return { ok: true, wallet }
}

function debitWallet(userId, amount, reason = 'debit') {
  const wallet = ensureWallet(userId)
  amount = Number(amount)
  if (wallet.balance < amount) return { ok: false, message: 'Low balance' }
  wallet.balance -= amount
  wallet.logs.unshift({ type: 'debit', amount, reason, time: new Date().toISOString() })
  return { ok: true, wallet }
}

module.exports = { getWallet, creditWallet, debitWallet }
