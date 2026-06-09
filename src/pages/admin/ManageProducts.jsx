import { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { useProducts } from '../../hooks/useProducts';
import { addProduct, deleteProduct, updateProduct } from '../../firebase/products';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Loader } from '../../components/common/Loader';
import { FiBox, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ManageProducts = () => {
  const { products, loading, refetch } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', nameTA: '', description: '', descriptionTA: '',
    category: 'cow_ghee', price: '', size: '500ml'
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const existingProduct = editingId ? products.find(p => p.id === editingId) : null;
      let imageURL = '';
      if (imageFile) {
        imageURL = await uploadImageToCloudinary(imageFile);
      } else if (existingProduct) {
        imageURL = existingProduct.imageURL;
      }

      const productData = {
        name: formData.name,
        nameTA: formData.nameTA,
        description: formData.description,
        descriptionTA: formData.descriptionTA,
        category: formData.category,
        imageURL,
        variants: [
          { size: formData.size, price: Number(formData.price) }
        ],
        inStock: existingProduct ? existingProduct.inStock : true
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        toast.success("Product updated successfully");
      } else {
        await addProduct(productData);
        toast.success("Product added successfully");
      }
      
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', nameTA: '', description: '', descriptionTA: '', category: 'cow_ghee', price: '', size: '500ml' });
      setImageFile(null);
      refetch();
    } catch (error) {
      toast.error(editingId ? "Failed to update product" : "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleEditClick = (product) => {
    setIsAdding(true);
    setEditingId(product.id);
    setFormData({
      name: product.name,
      nameTA: product.nameTA || '',
      description: product.description,
      descriptionTA: product.descriptionTA || '',
      category: product.category || 'cow_ghee',
      price: product.variants[0]?.price || '',
      size: product.variants[0]?.size || '500ml',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleStock = async (id, currentStatus) => {
    try {
      await updateProduct(id, { inStock: !currentStatus });
      toast.success("Stock status updated");
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Sidebar><Loader /></Sidebar>;

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto w-full px-4 py-4 md:px-6 md:py-6">
        <div className="mb-6 animate-fadeInUp">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-gold pb-3">
            <h1 className="text-lg md:text-xl font-heading font-bold text-darkbrown">Manage Products</h1>
          <button 
            onClick={() => {
              if (isAdding) {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ name: '', nameTA: '', description: '', descriptionTA: '', category: 'cow_ghee', price: '', size: '500ml' });
              } else {
                setIsAdding(true);
              }
            }}
            className="btn-primary py-2 px-4 shadow-lg text-sm flex items-center gap-2"
          >
            {isAdding ? 'Cancel' : <><FiPlus className="w-4 h-4" /> Add New Product</>}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-lightgold mb-6 animate-fadeInUp">
          <h2 className="text-lg md:text-xl font-heading font-bold mb-4 text-darkbrown border-b border-cream pb-2">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <input type="text" placeholder="Name (English)" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-cream rounded-lg focus:ring-0 focus:border-gold transition-colors" />
              <input type="text" placeholder="Name (Tamil)" required value={formData.nameTA} onChange={e => setFormData({...formData, nameTA: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-cream rounded-lg focus:ring-0 focus:border-gold transition-colors" />
              <textarea placeholder="Description (English)" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-cream rounded-lg col-span-1 md:col-span-2 min-h-[100px] focus:ring-0 focus:border-gold transition-colors"></textarea>
              <textarea placeholder="Description (Tamil)" required value={formData.descriptionTA} onChange={e => setFormData({...formData, descriptionTA: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-cream rounded-lg col-span-1 md:col-span-2 min-h-[100px] focus:ring-0 focus:border-gold transition-colors"></textarea>
              <input type="text" placeholder="Variant Size (e.g., 500ml)" required value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-cream rounded-lg focus:ring-0 focus:border-gold transition-colors" />
              <input type="number" placeholder="Price (₹)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 text-sm border-2 border-cream rounded-lg focus:ring-0 focus:border-gold transition-colors" />
              <div className="col-span-1 md:col-span-2 bg-cream p-3 md:p-4 rounded-lg border border-dashed border-gold">
                <label className="block text-xs md:text-sm mb-2 text-darkbrown font-bold">Product Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gold file:text-white hover:file:bg-saffron cursor-pointer text-xs" required={!editingId} />
              </div>
            </div>
            <button disabled={isSubmitting} type="submit" className="btn-primary w-full mt-6 py-2 md:py-2.5 text-sm">
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Product' : 'Save Product')}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-md border border-lightgold overflow-hidden animate-fadeInUp" style={{animationDelay: '100ms'}}>
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#3B1F0A] text-[#FFFDF8] uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-2 font-semibold sticky left-0 z-10 bg-[#3B1F0A]">Image</th>
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Price</th>
                <th className="px-3 py-2 font-semibold">Stock</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lightgold">
              {products.map((product, index) => (
                <tr key={product.id} className={`hover:bg-yellow-50 hover:border-l-4 hover:border-l-gold transition-all duration-200 group ${index % 2 === 0 ? 'bg-white border-l-4 border-l-transparent' : 'bg-[#FFF8E7] border-l-4 border-l-transparent'}`}>
                  <td className="px-3 py-2 sticky left-0 z-10 group-hover:bg-yellow-50 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-colors">
                    <img src={product.imageURL || 'https://via.placeholder.com/50'} alt={product.name} className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gold" />
                  </td>
                  <td className="px-3 py-2 text-xs md:text-sm font-bold text-darkbrown">{product.name}</td>
                  <td className="px-3 py-2 text-saffron font-bold text-sm md:text-base">₹{product.variants[0]?.price}</td>
                  <td className="px-3 py-2">
                    <button 
                      onClick={() => toggleStock(product.id, product.inStock)}
                      className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider shadow-sm border transition-colors hover:opacity-80 ${product.inStock ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    <button onClick={() => handleEditClick(product)} className="text-gold hover:bg-yellow-50 hover:text-darkbrown text-xs font-bold px-3 py-1 border border-gold rounded-lg transition-colors min-h-[32px]">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:bg-red-50 hover:text-red-700 text-xs font-bold px-3 py-1 border border-red-200 rounded-lg transition-colors min-h-[32px]">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-gold mb-4 shadow-inner border border-gold border-opacity-30">
                <FiBox className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-darkbrown mb-2">No products added yet</h3>
              <p className="text-sm text-darkbrown opacity-60 mb-4 md:mb-6">Start building your store by adding your first product.</p>
              <button 
                onClick={() => setIsAdding(true)}
                className="btn-primary py-2 px-4 shadow-lg text-sm flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" /> Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </Sidebar>
  );
};
