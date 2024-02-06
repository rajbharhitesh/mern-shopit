import Stripe from 'stripe';
import asyncHandler from '../middlewares/asyncHandler.js';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**-----------------------------------------------
 * @desc    Stripe Checkout
 * @route   /api/v1/payment/checkout_session
 * @method  POST
 * @access  Private
 ------------------------------------------------*/
const stripeCheckoutSession = asyncHandler(async (req, res, next) => {
  const body = req?.body;

  const line_items = body?.orderItems?.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item?.name,
          images: [item?.image],
          metadata: { productId: item?.product },
        },
        unit_amount: item?.price * 100,
      },
      tax_rates: ['txr_1OYNwuSGS0PWkaeB8mZpFPZo'],
      quantity: item?.quantity,
    };
  });

  const shippingInfo = body?.shippingInfo;

  const shipping_rate =
    body?.itemsPrice >= 200
      ? 'shr_1OYNspSGS0PWkaeB0PzDj9AD'
      : 'shr_1OYO2jSGS0PWkaeB2uHjvsBm';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${process.env.FRONTEND_URL}/me/orders`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: 'payment',
    metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
    shipping_options: [
      {
        shipping_rate,
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url,
  });
});

export { stripeCheckoutSession };
