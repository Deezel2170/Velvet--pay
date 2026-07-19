// File location: netlify/functions/create-request-link.js
//
// Creates a shareable Stripe Checkout link for requesting money from someone.
// Reuses the same pattern as Add Money, but framed as a "request" -
// the amount/description reflect who's paying whom.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, note, requesterName } = JSON.parse(event.body || '{}');

    if (!amount || amount < 50) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Amount must be at least $0.50' }) };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: note || `Payment request${requesterName ? ` from ${requesterName}` : ''}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
