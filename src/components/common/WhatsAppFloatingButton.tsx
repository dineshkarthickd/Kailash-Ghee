// @ts-nocheck
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppFloatingButton = () => {
  // Ideally, this number comes from Firebase settings
  // Using a placeholder for UI demonstration, which can be dynamically updated later
  const whatsappNumber = "919360282155"; 
  const message = encodeURIComponent("Hello Kailash Ghee! I would like to know more about your pure A2 cow ghee products.");
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-50"
      aria-label="Chat on WhatsApp"
      role="button"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
};
