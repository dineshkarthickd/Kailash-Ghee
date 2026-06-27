const TELEGRAM_BOT_TOKEN =
  import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID =
  import.meta.env.VITE_TELEGRAM_CHAT_ID

export const sendAdminNotification = async (orderData) => {
  const message =
`🛒 NEW ORDER - Kailash Ghee

📦 Order ID: ${orderData.orderId}
👤 Customer: ${orderData.customer?.name || orderData.customerName}
📱 Phone: ${orderData.customer?.phone || orderData.customerPhone}
📍 Address: ${orderData.customer?.address || orderData.address}, ${orderData.customer?.city || orderData.city}, ${orderData.customer?.state || orderData.state} - ${orderData.customer?.pincode || orderData.pincode}

🧾 Items:
${orderData.items.map(item =>
  `• ${item.name} ${item.variant || ''} x${item.qty} = Rs.${item.qty * item.price}`
).join('\n')}

💰 Total: Rs.${orderData.totalAmount}
💳 Payment: Cash on Delivery

Please confirm the order!`

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    )
    const data = await response.json()
    if (!data.ok) {
      console.log('Telegram send failed (may be blocked in India):', data)
    }
    return data.ok
  } catch (error) {
    console.log('Telegram unreachable (may be blocked in India):', error)
    return false
  }
}
