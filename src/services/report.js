import jsPDF from 'jspdf';

/**
 * Generates and downloads a full sales report PDF.
 * Handles 1000+ orders across multiple pages correctly:
 *  - Teal table header repeats on every new page
 *  - Teal footer + page numbers on every page
 *  - Grand Total row always on the last page
 */
export const generateReportPDF = (orders) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth  = doc.internal.pageSize.width;  // 210
  const pageHeight = doc.internal.pageSize.height; // 297

  // ── Color Palette (matches invoice) ──────────────────
  const TEAL       = [42, 110, 120];
  const TEAL_LIGHT = [224, 242, 244];
  const WHITE      = [255, 255, 255];
  const LIGHT_BG   = [245, 250, 251];
  const DARK       = [25, 40, 42];
  const MID        = [80, 100, 105];
  const BORDER     = [190, 215, 218];

  // ── Stats ─────────────────────────────────────────────
  const totalRevenue   = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const totalOrders    = orders.length;
  const pendingCount   = orders.filter(o => o.orderStatus === 'pending').length;
  const confirmedCount = orders.filter(o => o.orderStatus === 'confirmed').length;
  const shippedCount   = orders.filter(o => o.orderStatus === 'shipped').length;
  const deliveredCount = orders.filter(o => o.orderStatus === 'delivered').length;

  const sorted = [...orders].sort((a, b) => {
    const at = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
    const bt = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
    return bt - at;
  });

  const generatedOn = new Date().toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  // ── ROW HEIGHT & USABLE AREA ──────────────────────────
  const ROW_H       = 9;
  const FOOTER_H    = 10;
  const TABLE_TOP   = 14;  // y where table starts on continuation pages
  const STOP_Y      = pageHeight - FOOTER_H - 4; // leave room for footer

  // ════════════════════════════════════════════════════════
  // HELPERS
  // ════════════════════════════════════════════════════════

  /** Draws teal footer + page number on the CURRENT page */
  const drawFooter = (pageNum, totalPages) => {
    doc.setFillColor(...TEAL);
    doc.rect(0, pageHeight - FOOTER_H, pageWidth, FOOTER_H, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...WHITE);
    doc.text(
      'Kailash Ghee  |  kailashgheeoddanchatram@gmail.com  |  +91 9360282155  |  Oddanchatram, Tamil Nadu',
      pageWidth / 2, pageHeight - 3.5, { align: 'center' }
    );

    // Page number — right side
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth - 15, pageHeight - 3.5, { align: 'right' }
    );
  };

  /** Draws LIGHT_BG over the full page */
  const drawPageBg = () => {
    doc.setFillColor(...LIGHT_BG);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  };

  /** Draws teal table header row, returns new y */
  const drawTableHeader = (startY) => {
    doc.setFillColor(...TEAL);
    doc.rect(14, startY, pageWidth - 28, ROW_H, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...WHITE);
    doc.text('Order ID',   16,  startY + 6);
    doc.text('Date',       52,  startY + 6);
    doc.text('Customer',   82,  startY + 6);
    doc.text('Items',      122, startY + 6);
    doc.text('Total',      163, startY + 6);
    doc.text('Status',     183, startY + 6);
    return startY + ROW_H;
  };

  // ── Pre-calculate total pages ─────────────────────────
  // Page 1: starts drawing table after the summary/banner sections (~y≈118)
  // Continuation pages: full table from y=14 to STOP_Y
  const PAGE1_TABLE_START = 118; // approximate y where table rows begin on page 1
  const rowsPage1 = Math.floor((STOP_Y - PAGE1_TABLE_START) / ROW_H);
  const rowsPerContinuationPage = Math.floor((STOP_Y - TABLE_TOP - ROW_H) / ROW_H);

  let totalPages = 1;
  if (totalOrders > rowsPage1) {
    totalPages += Math.ceil((totalOrders - rowsPage1) / rowsPerContinuationPage);
  }

  // ════════════════════════════════════════════════════════
  // PAGE 1 — Header + Banner + Cards + Status + Table
  // ════════════════════════════════════════════════════════
  drawPageBg();

  // White header section
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...TEAL);
  doc.text('Kailash Ghee', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MID);
  doc.text('The Taste of Pure Tradition', 14, 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...TEAL);
  doc.text('Sales Report', pageWidth - 14, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MID);
  doc.text(`Generated: ${generatedOn}`, pageWidth - 14, 21, { align: 'right' });

  // Teal divider
  doc.setFillColor(...TEAL);
  doc.rect(0, 32, pageWidth, 1.2, 'F');

  // "View your report details" banner
  let y = 40;
  doc.setFillColor(...TEAL);
  doc.rect(14, y, pageWidth - 28, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...WHITE);
  doc.text('View your sales report details', pageWidth / 2, y + 6.8, { align: 'center' });

  // Summary cards
  y += 16;
  const cardW = (pageWidth - 28 - 9) / 4;
  const cards = [
    { label: 'Total Revenue', value: `Rs.${totalRevenue.toLocaleString('en-IN')}` },
    { label: 'Total Orders',  value: `${totalOrders}`    },
    { label: 'Pending',       value: `${pendingCount}`   },
    { label: 'Delivered',     value: `${deliveredCount}` },
  ];
  cards.forEach((card, i) => {
    const x = 14 + i * (cardW + 3);
    doc.setFillColor(...WHITE);
    doc.rect(x, y, cardW, 22, 'F');
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.rect(x, y, cardW, 22, 'S');
    doc.setFillColor(...TEAL);
    doc.rect(x, y, cardW, 2.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...MID);
    doc.text(card.label.toUpperCase(), x + cardW / 2, y + 9.5, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...DARK);
    doc.text(card.value, x + cardW / 2, y + 18, { align: 'center' });
  });

  // Status bar
  y += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  doc.text('Order Status Breakdown', 14, y);
  y += 5;

  const barSegments = [
    { label: 'Pending',   count: pendingCount,   color: [220, 165, 32] },
    { label: 'Confirmed', count: confirmedCount, color: [42, 130, 180] },
    { label: 'Shipped',   count: shippedCount,   color: [72, 100, 160] },
    { label: 'Delivered', count: deliveredCount, color: [42, 110, 120] },
  ];
  let bx = 14;
  barSegments.forEach(seg => {
    const sw = totalOrders > 0 ? (pageWidth - 28) * (seg.count / totalOrders) : 0;
    if (sw > 0) { doc.setFillColor(...seg.color); doc.rect(bx, y, sw, 7, 'F'); bx += sw; }
  });
  y += 10;
  let lx = 14;
  barSegments.forEach(seg => {
    doc.setFillColor(...seg.color);
    doc.rect(lx, y - 3.5, 4, 4, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...MID);
    doc.text(`${seg.label}: ${seg.count}`, lx + 6, y);
    lx += 42;
  });

  // "All Orders" label
  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  doc.text('All Orders', 14, y);
  y += 5;

  // Table header (page 1)
  y = drawTableHeader(y);

  // ════════════════════════════════════════════════════════
  // ORDER ROWS — paginate automatically
  // ════════════════════════════════════════════════════════
  const statusColorMap = {
    pending:   [180, 120, 10],
    confirmed: [42, 130, 180],
    shipped:   [72, 100, 160],
    delivered: [42, 110, 120],
  };

  let currentPage = 1;

  sorted.forEach((order, idx) => {
    // Need a new page?
    if (y + ROW_H > STOP_Y) {
      // Draw footer on current page before leaving
      drawFooter(currentPage, totalPages);
      currentPage++;

      doc.addPage();
      drawPageBg();

      y = TABLE_TOP;
      y = drawTableHeader(y);
    }

    const rowBg = idx % 2 === 0 ? WHITE : TEAL_LIGHT;
    doc.setFillColor(...rowBg);
    doc.rect(14, y, pageWidth - 28, ROW_H, 'F');
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.2);
    doc.line(14, y + ROW_H, pageWidth - 14, y + ROW_H);

    const dateStr    = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN') : '—';
    const customer   = (order.customer?.name || order.customerDetails?.name || 'Guest').slice(0, 18);
    const itemsRaw   = (order.items || []).map(i => `${i.name} x${i.qty}`).join(', ');
    const itemsShort = itemsRaw.length > 30 ? itemsRaw.slice(0, 30) + '…' : itemsRaw;
    const sCol       = statusColorMap[order.orderStatus] || MID;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...DARK);
    doc.text(order.orderId || order.id?.slice(0, 12) || '—', 16,  y + 6);
    doc.text(dateStr,    52,  y + 6);
    doc.text(customer,   82,  y + 6);
    doc.text(itemsShort, 122, y + 6);
    doc.text(`Rs.${order.totalAmount}`, 163, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...sCol);
    doc.text((order.orderStatus || '').toUpperCase(), 183, y + 6);

    y += ROW_H;
  });

  // Grand Total row (teal) — at end of last page
  if (y + ROW_H <= STOP_Y) {
    y += 2;
    doc.setFillColor(...TEAL);
    doc.rect(14, y, pageWidth - 28, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...WHITE);
    doc.text('Grand Total', 16, y + 6.8);
    doc.text(`Rs.${totalRevenue.toLocaleString('en-IN')}`, 163, y + 6.8);
  }

  // Footer on LAST page
  drawFooter(currentPage, totalPages);

  // ── Save ──────────────────────────────────────────────
  doc.save(`KailashGhee-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
};
