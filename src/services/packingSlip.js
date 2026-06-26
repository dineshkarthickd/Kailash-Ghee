import jsPDF from 'jspdf';

export const generatePackingSlip = (order, format = 'a4') => {
  const isA4 = format === 'a4';
  const doc = new jsPDF({
    unit: 'mm',
    format: isA4 ? 'a4' : [101.6, 152.4], // 4x6 inches is approx 101.6 x 152.4 mm
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  const customer = order.customer || order.customerDetails || {};
  const address = customer.address || {};
  
  // Clean address parts
  const street = address.street || address.line1 || '';
  const area = address.area || address.line2 || '';
  const city = address.city || '';
  const state = address.state || '';
  const zip = address.zip || address.pincode || address.postalCode || '';
  
  // ── HEADER ─────────────────────────────────────────────────────────────
  doc.setFillColor(42, 110, 120); // Teal
  doc.rect(0, 0, pageWidth, 15, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('PACKING SLIP', pageWidth / 2, 10, { align: 'center' });

  // ── ORDER INFO ─────────────────────────────────────────────────────────
  let y = 25;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Order ID: ${order.orderId || order.id.slice(0, 10)}`, 10, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const dateStr = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN') : 'N/A';
  doc.text(`Date: ${dateStr}`, pageWidth - 10, y, { align: 'right' });

  // ── SHIPPING ADDRESS ───────────────────────────────────────────────────
  const boxStartY = y + 12;
  const boxHeight = 35;
  
  doc.setFillColor(245, 250, 251); // Light BG
  doc.rect(10, boxStartY, pageWidth - 20, boxHeight, 'F');
  doc.setDrawColor(190, 215, 218);
  doc.rect(10, boxStartY, pageWidth - 20, boxHeight, 'S');

  y = boxStartY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SHIP TO:', 15, y);
  
  y += 6;
  doc.setFontSize(12);
  doc.text(customer.name || 'Valued Customer', 15, y);
  
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  if (street) { doc.text(street, 15, y); y += 5; }
  if (area) { doc.text(area, 15, y); y += 5; }
  
  const cityStateZip = [city, state, zip].filter(Boolean).join(', ');
  if (cityStateZip) { doc.text(cityStateZip, 15, y); y += 5; }
  
  if (customer.phone) { 
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.text(`Phone: ${customer.phone}`, 15, y); 
    y += 5; 
  }

  // Ensure y moves past the bottom of the fixed box before printing Sender Info
  y = Math.max(y, boxStartY + boxHeight) + 8;

  // ── SENDER INFO (Return Address) ───────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('From: Kailash Ghee', 10, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Oddanchatram, Tamil Nadu', 10, y);
  if (isA4) {
    doc.text('Ph: +91 9360282155', pageWidth - 10, y, { align: 'right' });
  } else {
    y += 4;
    doc.text('Ph: +91 9360282155', 10, y);
  }
  
  doc.setDrawColor(200, 200, 200);
  y += 4;
  doc.line(10, y, pageWidth - 10, y);

  // ── ITEMS LIST ─────────────────────────────────────────────────────────
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ITEMS ORDERED:', 10, y);
  
  y += 6;
  // Table Header
  doc.setFillColor(42, 110, 120);
  doc.rect(10, y, pageWidth - 20, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Qty', 12, y + 5.5);
  doc.text('Product Name & Size', 25, y + 5.5);
  if (isA4) {
    doc.text('Price', pageWidth - 20, y + 5.5, { align: 'right' });
  }

  y += 8;
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  
  const items = order.items || [];
  items.forEach((item, idx) => {
    // Background for alternate rows
    if (idx % 2 === 1) {
      doc.setFillColor(245, 250, 251);
      doc.rect(10, y, pageWidth - 20, 8, 'F');
    }
    
    // Check if we need to add a new page (mostly for thermal format)
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 10;
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`${item.qty}x`, 12, y + 5.5);
    
    doc.setFont('helvetica', 'normal');
    const itemName = `${item.name} (${item.size || 'N/A'})`;
    // Truncate name if it's too long, especially for thermal
    const maxLen = isA4 ? 60 : 35;
    const shortName = itemName.length > maxLen ? itemName.slice(0, maxLen) + '...' : itemName;
    doc.text(shortName, 25, y + 5.5);
    
    if (isA4) {
      doc.text(`Rs.${item.price}`, pageWidth - 12, y + 5.5, { align: 'right' });
    }
    
    y += 8;
  });

  // ── TOTALS (Optional, usually on A4 only) ───────────────────────────────
  if (isA4) {
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total:', pageWidth - 35, y, { align: 'right' });
    doc.text(`Rs.${order.totalAmount}`, pageWidth - 12, y, { align: 'right' });
  }

  // ── FOOTER ─────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing Kailash Ghee!', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // ── SAVE ───────────────────────────────────────────────────────────────
  const filename = `PackingSlip_${order.orderId || order.id.slice(0,8)}_${format}.pdf`;
  doc.save(filename);
};
