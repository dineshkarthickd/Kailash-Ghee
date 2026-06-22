import emailjs from '@emailjs/browser';

const PUBLIC_KEY          = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID          = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID   = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;

// Initialise EmailJS once at module load
emailjs.init(PUBLIC_KEY);

// ── Helpers ────────────────────────────────────────────────
/**
 * Formats cart items into a readable string for the email body.
 * e.g. "Kailash Pure Ghee 500g x2 = Rs.1200"
 */
const formatItemsList = (items = []) =>
  items
    .map(item => {
      const variant = item.variant?.size || item.variant || '';
      return `${item.name} ${variant} x${item.qty} = Rs.${item.qty * item.price}`;
    })
    .join('\n');

// ── Admin notification email ───────────────────────────────
/**
 * Sends a new-order notification to the store admin.
 * Returns true on success, false on failure (never throws).
 */
export const sendAdminEmail = async (orderData) => {
  try {
    const city     = orderData.customer?.city     || orderData.city     || '';
    const state    = orderData.customer?.state    || orderData.state    || '';
    const pincode  = orderData.customer?.pincode  || orderData.pincode  || '';
    const address  = orderData.customer?.address  || orderData.address  || '';

    await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, {
      order_id:          orderData.orderId,
      customer_name:     orderData.customer?.name  || orderData.customerName  || 'N/A',
      customer_phone:    orderData.customer?.phone || orderData.customerPhone || 'N/A',
      customer_address:  `${address}, ${city}, ${state} - ${pincode}`,
      items_list:        formatItemsList(orderData.items),
      total_amount:      orderData.totalAmount,
      payment_method:    'Cash on Delivery',
    });

    console.log('✅ Admin email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Admin email failed:', error);
    return false;
  }
};

// ── Customer confirmation email ────────────────────────────
/**
 * Sends an order-confirmation email to the customer.
 * Silently skips if no customer email is available.
 * Returns true on success, false on failure (never throws).
 */
export const sendCustomerEmail = async (orderData) => {
  const customerEmail =
    orderData.customer?.email || orderData.customerEmail;

  if (!customerEmail) {
    console.log('ℹ️ No customer email provided — skipping customer confirmation email.');
    return false;
  }

  try {
    await emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, {
      to_email:       customerEmail,
      to_name:        orderData.customer?.name || orderData.customerName || 'Customer',
      order_id:       orderData.orderId,
      items_list:     formatItemsList(orderData.items),
      total_amount:   orderData.totalAmount,
      payment_method: 'Cash on Delivery',
    });

    console.log('✅ Customer confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Customer email failed:', error);
    return false;
  }
};
