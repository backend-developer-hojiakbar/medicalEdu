import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export const generateCertificateId = (courseId: string, userId: string) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `MED-${courseId}-${userId}-${timestamp}-${random}`;
};

export const generatePDFCertificate = async (data: {
  studentName: string;
  courseTitle: string;
  date: string;
  certificateId: string;
  instructorName: string;
}) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [842, 595] // A4 Landscape
  });

  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 842, 595, 'F');
  
  // Border
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(10);
  doc.rect(20, 20, 802, 555);

  // Content
  doc.setTextColor(30, 64, 175);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.text('MEDEDU ONLINE', 421, 80, { align: 'center' });
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(24);
  doc.text('MALAKA OSHIRISH SERTIFIKATI', 421, 130, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(18);
  doc.text('Ushbu hujjat tasdiqlaydiki,', 421, 180, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(30, 64, 175);
  doc.text(data.studentName.toUpperCase(), 421, 240, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('muvaffaqiyatli yakunladi:', 421, 280, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(`"${data.courseTitle}"`, 421, 320, { align: 'center' });

  doc.setFontSize(14);
  doc.text(`Sana: ${data.date}`, 421, 360, { align: 'center' });

  // QR Code
  const qrDataUrl = await QRCode.toDataURL(`https://mededu.uz/verify/${data.certificateId}`);
  doc.addImage(qrDataUrl, 'PNG', 381, 380, 80, 80);

  doc.setFontSize(10);
  doc.text(`ID: ${data.certificateId}`, 421, 470, { align: 'center' });

  // Signatures
  doc.setFontSize(12);
  doc.text('Platforma Direktori', 150, 520, { align: 'center' });
  doc.text('O\'qituvchi', 692, 520, { align: 'center' });
  
  doc.line(100, 510, 200, 510);
  doc.line(642, 510, 742, 510);
  
  doc.text('MedEdu Admin', 150, 505, { align: 'center' });
  doc.text(data.instructorName, 692, 505, { align: 'center' });

  return doc;
};
