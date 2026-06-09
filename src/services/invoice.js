import jsPDF from 'jspdf';

export const generateInvoicePDF = (orderData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // ─── BACKGROUND ───────────────────────────
  // Main white background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top header band - dark brown
  doc.setFillColor(59, 31, 10);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Gold accent line below header
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 45, pageWidth, 2, 'F');

  // Bottom footer band
  doc.setFillColor(59, 31, 10);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

  // Gold accent line above footer
  doc.setFillColor(212, 175, 55);
  doc.rect(0, pageHeight - 22, pageWidth, 2, 'F');


  // ─── HEADER ───────────────────────────────
  // Brand name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(212, 175, 55);
  doc.text('Kailash Ghee', pageWidth / 2, 20, { align: 'center' });

  // Tagline
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(255, 248, 231);
  doc.text('The Taste of Pure Tradition', pageWidth / 2, 30, { align: 'center' });

  // INVOICE label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 248, 231);
  doc.text('INVOICE', pageWidth / 2, 40, { align: 'center' });


  // ─── GOLD DECORATIVE LINE ─────────────────
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(20, 55, pageWidth - 20, 55);


  // ─── ORDER INFO + CUSTOMER DETAILS ────────
  // Left side - Order details box
  doc.setFillColor(255, 248, 231);
  doc.roundedRect(15, 62, 80, 50, 3, 3, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, 62, 80, 50, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(59, 31, 10);
  doc.text('ORDER DETAILS', 25, 71);

  doc.setDrawColor(212, 175, 55);
  doc.line(25, 73, 85, 73);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 50, 20);
  doc.text('Order ID:', 25, 81);
  doc.setFont('helvetica', 'bold');
  doc.text(`${orderData.orderId}`, 55, 81);

  doc.setFont('helvetica', 'normal');
  doc.text('Date:', 25, 89);
  doc.setFont('helvetica', 'bold');
  doc.text(`${new Date().toLocaleDateString('en-IN')}`, 55, 89);

  doc.setFont('helvetica', 'normal');
  doc.text('Payment:', 25, 97);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 139, 34);
  doc.text('Cash on Delivery', 55, 97);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 50, 20);
  doc.text('Status:', 25, 105);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 107, 0);
  doc.text(`${orderData.orderStatus || 'Confirmed'}`, 55, 105);


  // Right side - Customer details box
  doc.setFillColor(255, 248, 231);
  doc.roundedRect(110, 62, 80, 50, 3, 3, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(110, 62, 80, 50, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(59, 31, 10);
  doc.text('CUSTOMER DETAILS', 120, 71);

  doc.setDrawColor(212, 175, 55);
  doc.line(120, 73, 182, 73);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(59, 31, 10);
  doc.text(`${orderData.customer?.name || orderData.customerName || 'N/A'}`, 120, 81);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 50, 20);
  doc.text(`${orderData.customer?.phone || orderData.customerPhone || 'N/A'}`, 120, 89);

  const addressLines = doc.splitTextToSize(`${orderData.customer?.address || orderData.address || 'N/A'}`, 65);
  doc.text(addressLines, 120, 97);

  doc.text(`${orderData.customer?.city || orderData.city || 'N/A'}, ${orderData.customer?.state || orderData.state || 'N/A'}`, 120, 105);
  doc.text(`PIN: ${orderData.customer?.pincode || orderData.pincode || 'N/A'}`, 120, 111);


  // ─── ITEMS TABLE ──────────────────────────
  // Table header
  doc.setFillColor(59, 31, 10);
  doc.roundedRect(15, 122, pageWidth - 30, 10, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text('ITEM', 25, 129);
  doc.text('VARIANT', 95, 129);
  doc.text('QTY', 125, 129);
  doc.text('PRICE', 160, 129, { align: 'right' });
  doc.text('TOTAL', 190, 129, { align: 'right' });

  // Table rows
  let yPos = 140;
  orderData.items.forEach((item, index) => {
    // Alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(255, 252, 240);
      doc.rect(15, yPos - 6, pageWidth - 30, 10, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(59, 31, 10);
    doc.text(`${item.name}`, 25, yPos);
    
    // Account for variant object vs string
    const variantLabel = item.variant?.size || item.variant || '-';
    doc.text(`${variantLabel}`, 95, yPos);
    
    doc.text(`${item.qty}`, 125, yPos);
    doc.text(`Rs.${item.price}`, 160, yPos, { align: 'right' });
    doc.text(`Rs.${item.qty * item.price}`, 190, yPos, { align: 'right' });

    yPos += 12;
  });

  // Table bottom border
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(15, yPos, pageWidth - 15, yPos);


  // ─── TOTAL SECTION ────────────────────────
  yPos += 10;

  // Total box
  doc.setFillColor(59, 31, 10);
  doc.roundedRect(pageWidth - 95, yPos - 5, 80, 20, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 248, 231);
  doc.text('TOTAL AMOUNT:', pageWidth - 88, yPos + 7);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(12);
  doc.text(`Rs.${orderData.totalAmount}`, pageWidth - 18, yPos + 7, { align: 'right' });


  // ─── THANK YOU NOTE ───────────────────────
  yPos += 35;

  doc.setFillColor(255, 248, 231);
  doc.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(59, 31, 10);
  doc.text('Thank you for choosing Kailash Ghee!', pageWidth / 2, yPos + 10, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 80, 40);
  doc.text('Pure • Natural • Traditional | Delivering across Tamil Nadu', pageWidth / 2, yPos + 18, { align: 'center' });


  // ─── FOOTER ───────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 248, 231);
  doc.text('Kailash Ghee | info@kailashghee.com | +91 7010857596 | Chennai, Tamil Nadu', pageWidth / 2, pageHeight - 8, { align: 'center' });


  // ─── SAVE PDF ─────────────────────────────
  doc.save(`KailashGhee-Invoice-${orderData.orderId}.pdf`);
};
