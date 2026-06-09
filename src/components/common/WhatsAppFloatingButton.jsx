import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppFloatingButton = () => {
  // Ideally, this number comes from Firebase settings
  // Using a placeholder for UI demonstration, which can be dynamically updated later
  const whatsappNumber = "919999999999"; 
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      role="button"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};
