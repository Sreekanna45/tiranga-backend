const { creditWallet } = require('./walletSupport')

function createDeposit({ userId, amount }) {
  return {
    depositId: 'DEP' + Date.now(),
    userId,
    amount: Number(amount),
    status: 'created',
    gateway: 'YOUR_OWN_UPI_GATEWAY',
    createdAt: new Date().toISOString()
  }
}

function verifyGatewaySignature(payload, headers) {
  // Replace this with your own gateway signature check.
  return true
}

function gatewayWebhook(payload, headers) {
  if (!verifyGatewaySignature(payload, headers)) {
    return { ok: false, message: 'Invalid gateway signature' }
  }

  const { userId, amount, status, gatewayPaymentId } = payload

  if (status !== 'SUCCESS') {
    return { ok: true, message: 'Payment not successful yet' }
  }

  const credit = creditWallet(userId, Number(amount), 'UPI_GATEWAY_' + gatewayPaymentId)
  return { ok: true, message: 'Wallet credited', credit }
}

module.exports = { createDeposit, gatewayWebhook, verifyGatewaySignature }
