// @ts-nocheck
import { useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { useProducts } from '../../hooks/useProducts';
import { addProduct, deleteProduct, updateProduct } from '../../firebase/products';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Loader } from '../../components/common/Loader';
import { FiBox, FiPlus, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { translateToTamil } from '../../utils/translateToTamil';

export const ManageProducts = () => {
  const { products, loading, refetch } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', nameTA: '', description: '', descriptionTA: '',
    category: 'cow_ghee', price: '', size: '500ml',
    isOffer: false, offerType: 'combo', originalPrice: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

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

      // Auto-translate to Tamil if Tamil fields are empty
      let nameTA = formData.nameTA;
      let descriptionTA = formData.descriptionTA;
      if (!nameTA && formData.name) {
        toast.loading('Auto-translating to Tamil...', { id: 'translating' });
        nameTA = await translateToTamil(formData.name);
      }
      if (!descriptionTA && formData.description) {
        descriptionTA = await translateToTamil(formData.description);
        toast.dismiss('translating');
      }

      const productData = {
        name: formData.name,
        nameTA,
        description: formData.description,
        descriptionTA,
        category: formData.category,
        imageURL,
        isOffer: formData.isOffer,
        offerType: formData.isOffer ? formData.offerType : null,
        variants: [
          { 
            size: formData.size, 
            price: Number(formData.price),
            ...(formData.isOffer && formData.originalPrice ? { originalPrice: Number(formData.originalPrice) } : {})
          }
        ],
        inStock: existingProduct ? existingProduct.inStock : true
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        toast.success('Product updated & translated successfully');
      } else {
        await addProduct(productData);
        toast.success('Product added & translated successfully');
        setCurrentPage(1);
      }
      
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', nameTA: '', description: '', descriptionTA: '', category: 'cow_ghee', price: '', size: '500ml', isOffer: false, offerType: 'combo', originalPrice: '' });
      setImageFile(null);
      refetch();
    } catch (error) {
      toast.dismiss('translating');
      toast.error(editingId ? 'Failed to update product' : 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoTranslateAll = async () => {
    const missing = products.filter(p => !p.nameTA);
    if (missing.length === 0) { toast.success('All products already have Tamil names!'); return; }
    toast.loading(`Translating ${missing.length} products...`, { id: 'bulk-translate' });
    try {
      for (const p of missing) {
        const nameTA = await translateToTamil(p.name);
        const descriptionTA = p.description ? await translateToTamil(p.description) : '';
        await updateProduct(p.id, { ...p, nameTA, descriptionTA });
      }
      toast.dismiss('bulk-translate');
      toast.success(`✅ ${missing.length} products translated to Tamil!`);
      refetch();
    } catch {
      toast.dismiss('bulk-translate');
      toast.error('Translation failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
        // Handle case where deleting the last item on a page
        if (paginatedProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
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
      isOffer: product.isOffer || false,
      offerType: product.offerType || 'combo',
      originalPrice: product.variants[0]?.originalPrice || '',
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

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <Sidebar><div className="flex justify-center items-center h-full"><Loader /></div></Sidebar>;

  return (
    <Sidebar>
      <div className="flex flex-col gap-8 h-full min-h-[80vh]">
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end border-b-[1px] border-primary/10 pb-4 gap-3">
          <div>
            <h1 className="font-heading text-3xl text-primary mb-2">Manage Products</h1>
            <p className="font-sans text-primary/60">Add, edit, or remove store products.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoTranslateAll}
              className="flex items-center gap-2 bg-accent-gold/90 text-white px-5 py-3 font-sans text-xs uppercase tracking-widest hover:bg-accent-gold transition-colors shadow-sm"
              title="Auto-fill Tamil names for all products"
            >
              🌐 Auto Translate All
            </button>
            <button 
              onClick={() => {
                if (isAdding) {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ name: '', nameTA: '', description: '', descriptionTA: '', category: 'cow_ghee', price: '', size: '500ml', isOffer: false, offerType: 'combo', originalPrice: '' });
                } else {
                  setIsAdding(true);
                }
              }}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-sans text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-sm"
            >
              {isAdding ? 'Cancel' : <><FiPlus className="stroke-[2]" /> Add New Product</>}
            </button>
          </div>
        </div>

        {isAdding && (
          <div className="bg-white/20 backdrop-blur-md border-[1px] border-primary/20 p-8">
            <h2 className="font-heading text-xl text-primary mb-6 pb-4 border-b-[1px] border-primary/10">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name (English)" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary font-sans text-sm" />
              <input type="text" placeholder="Name (Tamil - Optional)" value={formData.nameTA} onChange={e => setFormData({...formData, nameTA: e.target.value})} className="bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary font-sans text-sm" />
              <textarea placeholder="Description (English)" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary md:col-span-2 font-sans text-sm"></textarea>
              <textarea placeholder="Description (Tamil - Optional)" value={formData.descriptionTA} onChange={e => setFormData({...formData, descriptionTA: e.target.value})} className="bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary md:col-span-2 font-sans text-sm"></textarea>
              
              <div className="md:col-span-2 flex items-center gap-4 bg-primary/5 p-4 border border-primary/20">
                <label className="flex items-center gap-2 cursor-pointer font-sans text-sm text-primary font-medium">
                  <input type="checkbox" checked={formData.isOffer} onChange={e => setFormData({...formData, isOffer: e.target.checked})} className="accent-primary w-4 h-4" />
                  Is this a Special Offer / Combo?
                </label>
                
                {formData.isOffer && (
                  <select value={formData.offerType} onChange={e => setFormData({...formData, offerType: e.target.value})} className="bg-white border border-primary/20 p-2 text-sm font-sans outline-none focus:border-primary ml-auto">
                    <option value="combo">Combo Offer</option>
                    <option value="single">Single Product Offer</option>
                  </select>
                )}
              </div>

              <input type="text" placeholder="Variant Size (e.g., 500ml or 1L x 2)" required value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary font-sans text-sm" />
              
              <div className="flex gap-2">
                {formData.isOffer && (
                  <input type="number" placeholder="Orig. Price (₹)" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="w-1/2 bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary font-sans text-sm line-through text-primary/60" />
                )}
                <input type="number" placeholder={formData.isOffer ? "Offer Price (₹)" : "Price (₹)"} required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={`${formData.isOffer ? 'w-1/2' : 'w-full'} bg-white/50 border border-primary/20 p-3 outline-none focus:border-primary font-sans text-sm font-medium`} />
              </div>

              <div className="md:col-span-2 mt-2">
                <label className="block text-xs uppercase tracking-widest text-primary/70 mb-2 font-sans">Product Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full bg-white/50 border border-primary/20 p-3 font-sans text-sm" required={!editingId} />
              </div>
              <div className="md:col-span-2 flex justify-end mt-4">
                <button disabled={isSubmitting} type="submit" className="bg-primary text-white py-3 px-8 hover:bg-primary/90 transition-colors font-sans text-xs uppercase tracking-widest shadow-sm">
                  {isSubmitting ? 'Saving...' : (editingId ? 'Update Product' : 'Save Product')}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex-1 bg-white/20 backdrop-blur-md border-[1px] border-primary/20 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-sans border-collapse">
              <thead className="bg-primary/5 border-b-[1px] border-primary/20 text-xs uppercase tracking-widest text-primary/70">
                <tr>
                  <th className="p-4 font-medium w-24 text-center">Image</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 text-sm text-primary">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/40 transition-colors duration-300">
                    <td className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto bg-primary/5 rounded-md overflow-hidden border-[1px] border-primary/10">
                        <img src={product.imageURL || 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=800&auto=format&fit=crop'} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      <div>{product.name}</div>
                      {product.nameTA 
                        ? <div className="text-xs text-green-700/70 mt-1">{product.nameTA}</div>
                        : <div className="text-xs text-red-600/60 mt-1 italic">Tamil name missing – click edit</div>
                      }
                    </td>
                    <td className="p-4">₹{product.variants[0]?.price}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStock(product.id, product.inStock)}
                        className={`px-3 py-1 rounded-full text-xs tracking-widest uppercase ${product.inStock ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => handleEditClick(product)} className="text-primary hover:text-accent-gold transition-colors inline-flex p-2 hover:bg-primary/5 rounded-full"><FiEdit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-700/70 hover:text-red-700 transition-colors inline-flex p-2 hover:bg-red-50 rounded-full"><FiTrash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-primary/50">
                <FiBox className="w-12 h-12 mb-4 opacity-50" />
                <h3 className="font-heading text-xl mb-2">No products added yet</h3>
                <p className="mb-6 font-sans">Start building your store by adding your first product.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-primary text-white py-3 px-8 hover:bg-primary/90 transition-colors font-sans text-xs uppercase tracking-widest"
                >
                  <FiPlus className="inline mr-2" /> Add Your First Product
                </button>
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t-[1px] border-primary/10 bg-white/40 p-4 flex items-center justify-between font-sans text-sm text-primary">
              <span className="opacity-70">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border-[1px] border-primary/20 bg-white hover:bg-primary/5 disabled:opacity-50 transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center border-[1px] transition-colors ${
                        currentPage === i + 1 
                        ? 'bg-primary text-white border-primary' 
                        : 'border-primary/20 bg-white hover:bg-primary/5 text-primary'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border-[1px] border-primary/20 bg-white hover:bg-primary/5 disabled:opacity-50 transition-colors"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};
