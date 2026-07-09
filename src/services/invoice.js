/* eslint-disable no-unused-vars */
import jsPDF from 'jspdf';

export const generateInvoicePDF = (orderData) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.width;   // 210
  const pageHeight = doc.internal.pageSize.height; // 297

  // ── Color Palette ──────────────────────────────────────
  const TEAL       = [42, 110, 120];   // header / accent
  const TEAL_LIGHT = [224, 242, 244];  // table header bg
  const TEAL_ROW   = [42, 110, 120];   // total row bg
  const DARK       = [30, 30, 30];     // primary text
  const MID        = [80, 80, 80];     // secondary text
  const LIGHT_BG   = [245, 250, 251];  // page background
  const WHITE      = [255, 255, 255];
  const BORDER     = [200, 215, 218];  // light border

  // ── Page background ────────────────────────────────────
  doc.setFillColor(...LIGHT_BG);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // ══════════════════════════════════════════════════════
  // HEADER SECTION
  // ══════════════════════════════════════════════════════
  // White header card
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Company name – left
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...TEAL);
  doc.text('Kailash Ghee', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MID);
  doc.text('The Taste of Pure Tradition', 14, 21);

  // "Order Confirmation" – right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...TEAL);
  doc.text('Order Confirmation', pageWidth - 14, 16, { align: 'right' });

  // Thin teal border under header
  doc.setFillColor(...TEAL);
  doc.rect(0, 38, pageWidth, 1.5, 'F');

  // ── Thanks banner ──────────────────────────────────────
  doc.setFillColor(...WHITE);
  doc.rect(0, 40, pageWidth, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...DARK);
  doc.text('Thanks for your order!!', pageWidth / 2, 50, { align: 'center' });

  const customerFirstName = (orderData.customer?.name || orderData.customerName || 'Customer').split(' ')[0];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MID);
  doc.text(
    `Hi ${customerFirstName}, we've received your order #${orderData.orderId} and are working on it now.`,
    pageWidth / 2, 57, { align: 'center' }
  );

  // ── Teal "View your order details" banner ─────────────
  doc.setFillColor(...TEAL);
  doc.rect(14, 62, pageWidth - 28, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...WHITE);
  doc.text('View your order details', pageWidth / 2, 68.5, { align: 'center' });

  // ══════════════════════════════════════════════════════
  // TWO-COLUMN INFO SECTION
  // ══════════════════════════════════════════════════════
  const colLeft = 14;
  const colMid  = 110;
  let y = 80;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MID);
  doc.text('Order or shipping info:', colLeft, y);

  y += 7;

  // ── Left column headings ──────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...DARK);
  doc.text('Order Details:', colLeft, y);

  // ── Right column headings ─────────────────────────────
  doc.text('Shipping Address:', colMid, y);

  y += 6;

  // Left values
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MID);
  doc.text(`Order #:`, colLeft, y);
  doc.setTextColor(...DARK);
  doc.text(`${orderData.orderId}`, colLeft + 22, y);

  // Right – Name
  doc.setTextColor(...MID);
  doc.text('Name:', colMid, y);
  doc.setTextColor(...DARK);
  doc.text(`${orderData.customer?.name || orderData.customerName || 'N/A'}`, colMid + 18, y);

  y += 6;

  // Date
  doc.setTextColor(...MID);
  doc.text('Date:', colLeft, y);
  doc.setTextColor(...DARK);
  doc.text(`${new Date().toLocaleDateString('en-IN')}`, colLeft + 22, y);

  // Address
  doc.setTextColor(...MID);
  doc.text('Address:', colMid, y);
  const addressStr = `${orderData.customer?.address || orderData.address || 'N/A'}`;
  const addressLines = doc.splitTextToSize(addressStr, 72);
  doc.setTextColor(...DARK);
  doc.text(addressLines, colMid + 18, y);

  y += 6;

  // Payment
  doc.setTextColor(...MID);
  doc.text('Payment:', colLeft, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...TEAL);
  doc.text('Cash on Delivery', colLeft + 22, y);
  doc.setFont('helvetica', 'normal');

  // City/State/Pin
  doc.setTextColor(...MID);
  doc.text('Phone No.:', colMid, y);
  doc.setTextColor(...DARK);
  doc.text(`${orderData.customer?.phone || orderData.customerPhone || 'N/A'}`, colMid + 18, y);

  y += 6;

  // Status
  doc.setTextColor(...MID);
  doc.text('Status:', colLeft, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...TEAL);
  doc.text(`${(orderData.orderStatus || 'Confirmed').toUpperCase()}`, colLeft + 22, y);
  doc.setFont('helvetica', 'normal');

  // City
  doc.setTextColor(...MID);
  doc.text('City/State:', colMid, y);
  doc.setTextColor(...DARK);
  doc.text(
    `${orderData.customer?.city || ''}, ${orderData.customer?.state || ''} - ${orderData.customer?.pincode || ''}`,
    colMid + 18, y
  );

  // ══════════════════════════════════════════════════════
  // ITEMS TABLE
  // ══════════════════════════════════════════════════════
  y += 14;

  // Table header – teal background
  doc.setFillColor(...TEAL);
  doc.rect(14, y, pageWidth - 28, 9, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...WHITE);

  const col1 = 18;
  const col2 = 108;
  const col3 = 135;
  const col4 = 162;
  const col5 = pageWidth - 18;

  doc.text('Items Ordered', col1, y + 6);
  doc.text('Variant', col2, y + 6);
  doc.text('Qty', col3, y + 6);
  doc.text('Item Price', col4, y + 6);
  doc.text('Total', col5, y + 6, { align: 'right' });

  y += 9;

  // Table rows
  orderData.items.forEach((item, index) => {
    const rowBg = index % 2 === 0 ? [255, 255, 255] : [240, 248, 249];
    doc.setFillColor(...rowBg);
    doc.rect(14, y, pageWidth - 28, 9, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...DARK);

    const itemName = doc.splitTextToSize(item.name || '', 85);
    doc.text(itemName, col1, y + 6);

    const variantLabel = item.variant?.size || item.variant || '-';
    doc.text(`${variantLabel}`, col2, y + 6);
    doc.text(`${item.qty}`, col3, y + 6);
    doc.text(`Rs.${item.price}`, col4, y + 6);
    doc.text(`Rs.${item.qty * item.price}`, col5, y + 6, { align: 'right' });

    // Light bottom border
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.2);
    doc.line(14, y + 9, pageWidth - 14, y + 9);

    y += 9;
  });

  // ══════════════════════════════════════════════════════
  // TOTALS SECTION — right-aligned rows
  // ══════════════════════════════════════════════════════
  y += 4;
  const summaryX = 128;
  const summaryW = pageWidth - 14 - summaryX;

  const drawSummaryRow = (label, value, isBold = false, isTeal = false) => {
    if (isTeal) {
      doc.setFillColor(...TEAL_ROW);
      doc.rect(summaryX, y - 4, summaryW, 9, 'F');
      doc.setTextColor(...WHITE);
    } else {
      doc.setFillColor(...WHITE);
      doc.rect(summaryX, y - 4, summaryW, 9, 'F');
      doc.setTextColor(...DARK);
    }

    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.2);
    doc.line(summaryX, y + 5, pageWidth - 14, y + 5);

    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(8.5);
    doc.text(label, summaryX + 4, y + 2);
    doc.text(value, pageWidth - 18, y + 2, { align: 'right' });
    y += 9;
  };

  drawSummaryRow('Sub Total', `Rs.${orderData.totalAmount}`, false, false);
  drawSummaryRow('Shipping', 'FREE', false, false);
  drawSummaryRow('Estimated Sales Tax', 'Rs.0.00', false, false);
  drawSummaryRow('Order Total', `Rs.${orderData.totalAmount}`, true, true);

  // ══════════════════════════════════════════════════════
  // FOOTER — "We are here to help"
  // ══════════════════════════════════════════════════════
  y += 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text('We are here to help', 14, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MID);
  doc.text('Call: +91 9360282155', 14, y);
  y += 5;
  doc.text('Email-Id: kailashgheeoddanchatram@gmail.com', 14, y);
  y += 5;
  doc.text('Oddanchatram, Tamil Nadu, India', 14, y);

  // Bottom teal bar
  doc.setFillColor(...TEAL);
  doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...WHITE);
  doc.text(
    'Kailash Ghee  |  kailashgheeoddanchatram@gmail.com  |  +91 9360282155  |  Oddanchatram, Tamil Nadu',
    pageWidth / 2, pageHeight - 4, { align: 'center' }
  );

  // ── Save ───────────────────────────────────────────────
  doc.save(`KailashGhee-Invoice-${orderData.orderId}.pdf`);
};
