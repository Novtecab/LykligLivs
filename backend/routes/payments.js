const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const authMiddleware = require('../middleware/auth')

// Create payment intent
router.post('/create-intent', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'usd',
      customer: req.user.email, // You might want to create Stripe customers
      metadata: {
        userId: req.user._id.toString()
      }
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message })
  }
})

// Confirm payment
router.post('/confirm', authMiddleware, async (req, res) => {
  try {
    const { paymentIntentId } = req.body

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      res.json({
        success: true,
        message: 'Payment confirmed',
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount / 100
        }
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not confirmed',
        status: paymentIntent.status
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message })
  }
})

// Webhook for Stripe events (optional)
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful:', paymentIntent.id)
      // Update order status, send confirmation email, etc.
      break
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object
      console.log('PaymentIntent failed:', failedPayment.id)
      // Handle failed payment
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})

module.exports = router