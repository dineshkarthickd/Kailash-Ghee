import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ProductCard = ({ product }) => {
  const { i18n } = useTranslation();
  const name = i18n.language === 'ta' && product.nameTA ? product.nameTA : product.name;
  
  return (
    <div className="card-premium group relative overflow-hidden flex flex-col h-full hover:-translate-y-1 w-full">
      <Link to={`/products/${product.id}`} className="block relative w-full h-32 md:h-44 overflow-hidden bg-ivory">
        <div className="absolute inset-0 bg-gold bg-opacity-5 group-hover:bg-opacity-0 transition-all z-10"></div>
        <img 
          src={product.imageURL || 'https://via.placeholder.com/400x400?text=Ghee'} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </Link>
      <div className="p-3 md:p-4 flex flex-col flex-grow text-center">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading font-semibold text-xs md:text-sm text-darkbrown mb-2">{name}</h3>
        </Link>
        <p className="text-saffron font-bold text-xs md:text-sm mt-auto mb-3">From ₹{product.variants[0]?.price || 0}</p>
        
        <Link 
          to={`/products/${product.id}`}
          className="btn-primary w-full py-1.5 px-3 text-xs"
        >
          View Options
        </Link>
      </div>
    </div>
  );
};
