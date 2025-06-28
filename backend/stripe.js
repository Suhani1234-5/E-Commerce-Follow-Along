// ✅ 1. backend/stripe.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-stripe-session', async (req, res) => {
  try {
    const { items, email, address } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:3000/order-success',
      cancel_url: 'http://localhost:3000/order-cancel',
      shipping_address_collection: {
        allowed_countries: ['IN', 'US'],
      },
      metadata: {
        address: JSON.stringify(address),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ message: 'Stripe session creation failed' });
  }
});

module.exports = router;
