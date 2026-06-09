const TELEGRAM_BOT_TOKEN =
  import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID =
  import.meta.env.VITE_TELEGRAM_CHAT_ID

export const sendAdminNotification =
  async (orderData) => {

  const message =
`🛒 NEW ORDER - Kailash Ghee

📦 Order ID: ${orderData.orderId}
👤 Customer: ${orderData.customerName}
📱 Phone: ${orderData.customerPhone}
📍 Address: ${orderData.address},
   ${orderData.city}, ${orderData.state}
   PIN: ${orderData.pincode}

🧾 Items:
${orderData.items.map(item =>
  `• ${item.name} ${item.variant.size} x${item.qty} = ₹${item.price * item.qty}`
).join('\n')}

💰 Total: ₹${orderData.totalAmount}
💳 Payment: Cash on Delivery

⏰ Time: ${new Date().toLocaleString('en-IN')}

Please confirm the order!`

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    )
    const data = await response.json()
    if (!data.ok) {
      console.error('Telegram error:', data)
    }
  } catch (error) {
    console.error('Notification failed:', error)
  }
}
