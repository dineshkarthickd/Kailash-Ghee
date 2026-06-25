import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { FiBell, FiImage, FiUsers, FiUpload, FiX, FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import { getSettings, updateSettings } from '../../firebase/settings';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import toast from 'react-hot-toast';

export const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hero image state
  const [heroFile, setHeroFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [heroUploading, setHeroUploading] = useState(false);

  // Admin emails state
  const [adminEmails, setAdminEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [savingAdmins, setSavingAdmins] = useState(false);

  // Load current settings from Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();
        setSettings(data || {});
        setAdminEmails(data?.adminEmails || [import.meta.env.VITE_ADMIN_EMAIL || '']);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Hero Image ──────────────────────────────────────────
  const handleHeroFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
  };

  const handleHeroUpload = async () => {
    if (!heroFile) return;
    setHeroUploading(true);
    try {
      const url = await uploadImageToCloudinary(heroFile);
      await updateSettings({ heroImageURL: url });
      setSettings(prev => ({ ...prev, heroImageURL: url }));
      setHeroFile(null);
      setHeroPreview(null);
      toast.success('Hero image updated successfully!');
    } catch (err) {
      toast.error('Failed to upload image.');
      console.error(err);
    } finally {
      setHeroUploading(false);
    }
  };

  const handleRemoveHeroImage = async () => {
    try {
      await updateSettings({ heroImageURL: null });
      setSettings(prev => ({ ...prev, heroImageURL: null }));
      setHeroFile(null);
      setHeroPreview(null);
      toast.success('Hero image removed. Using default image.');
    } catch (err) {
      toast.error('Failed to remove image.');
    }
  };

  // ── Admin Emails ────────────────────────────────────────
  const handleAddEmail = () => {
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed) return;
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (adminEmails.includes(trimmed)) {
      toast.error('This email is already an admin.');
      return;
    }
    setAdminEmails(prev => [...prev, trimmed]);
    setNewEmail('');
  };

  const handleRemoveEmail = (email) => {
    if (adminEmails.length === 1) {
      toast.error('At least one admin email is required.');
      return;
    }
    setAdminEmails(prev => prev.filter(e => e !== email));
  };

  const handleSaveAdmins = async () => {
    if (adminEmails.length === 0) {
      toast.error('You must have at least one admin.');
      return;
    }
    setSavingAdmins(true);
    try {
      await updateSettings({ adminEmails });
      toast.success('Admin accounts updated successfully!');
    } catch (err) {
      toast.error('Failed to save admin accounts.');
      console.error(err);
    } finally {
      setSavingAdmins(false);
    }
  };

  const currentHeroImage = heroPreview || settings?.heroImageURL;

  if (loading) return (
    <Sidebar>
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    </Sidebar>
  );

  return (
    <Sidebar>
      <div className="flex flex-col gap-8 h-full min-h-[80vh]">

        {/* Header */}
        <div className="flex justify-between items-end border-b-[1px] border-primary/10 pb-4">
          <div>
            <h1 className="font-heading text-3xl text-primary mb-2">Store Settings</h1>
            <p className="font-sans text-primary/60">Manage your store's hero image, admin accounts, and notifications.</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-2xl">

          {/* ── Hero Image Section ──────────────────────────── */}
          <div className="bg-white/20 backdrop-blur-md border-[1px] border-primary/20 p-8 flex flex-col gap-5">
            <div className="flex items-center gap-4 text-primary pb-4 border-b-[1px] border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FiImage className="stroke-[1.5]" />
              </div>
              <div>
                <h2 className="font-heading text-xl">Hero Section Image</h2>
                <p className="font-sans text-xs text-primary/50 mt-0.5">Upload a custom hero image. If none is set, the default local image is used.</p>
              </div>
            </div>

            {/* Current image preview */}
            <div className="relative w-full h-44 bg-primary/5 border-[1px] border-primary/10 overflow-hidden">
              <img
                src={currentHeroImage || '/Hero.png'}
                alt="Hero preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="font-sans text-[11px] text-white tracking-widest uppercase bg-black/40 px-3 py-1">
                  {currentHeroImage && currentHeroImage !== '/Hero.png'
                    ? heroPreview ? 'New image (not saved yet)' : 'Current custom image'
                    : 'Default local image'}
                </span>
              </div>
              {settings?.heroImageURL && !heroPreview && (
                <button
                  onClick={handleRemoveHeroImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Remove custom image"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Upload controls */}
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center gap-2 justify-center border-[1px] border-dashed border-primary/30 px-4 py-3 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all font-sans text-sm text-primary/70">
                <FiUpload className="w-4 h-4" />
                {heroFile ? heroFile.name : 'Choose image file…'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleHeroFileChange}
                />
              </label>

              {heroFile && (
                <button
                  onClick={handleHeroUpload}
                  disabled={heroUploading}
                  className="flex items-center gap-2 px-5 py-3 bg-primary text-white font-sans text-[12px] tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {heroUploading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSave className="w-4 h-4" />
                  )}
                  {heroUploading ? 'Uploading…' : 'Save Image'}
                </button>
              )}
            </div>
          </div>

          {/* ── Admin Accounts Section ──────────────────────── */}
          <div className="bg-white/20 backdrop-blur-md border-[1px] border-primary/20 p-8 flex flex-col gap-5">
            <div className="flex items-center gap-4 text-primary pb-4 border-b-[1px] border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FiUsers className="stroke-[1.5]" />
              </div>
              <div>
                <h2 className="font-heading text-xl">Admin Accounts</h2>
                <p className="font-sans text-xs text-primary/50 mt-0.5">Manage who has access to the admin panel.</p>
              </div>
            </div>

            {/* Current admin list */}
            <div className="flex flex-col gap-2">
              {adminEmails.map(email => (
                <div key={email} className="flex items-center justify-between px-4 py-3 bg-primary/5 border-[1px] border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-accent-gold/20 flex items-center justify-center">
                      <span className="font-sans text-[11px] font-bold text-accent-gold uppercase">
                        {email[0]}
                      </span>
                    </div>
                    <span className="font-sans text-sm text-primary">{email}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="w-7 h-7 flex items-center justify-center text-primary/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove admin"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new admin */}
            <div className="flex gap-3">
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddEmail()}
                placeholder="Enter email address…"
                className="flex-1 bg-transparent border-[1px] border-primary/20 focus:border-primary px-4 py-2.5 font-sans text-sm text-primary placeholder-primary/40 outline-none transition-colors"
              />
              <button
                onClick={handleAddEmail}
                className="flex items-center gap-2 px-4 py-2.5 border-[1px] border-primary/30 text-primary font-sans text-[12px] tracking-widest uppercase hover:bg-primary/5 transition-colors"
              >
                <FiPlus className="w-4 h-4" /> Add
              </button>
            </div>

            <button
              onClick={handleSaveAdmins}
              disabled={savingAdmins}
              className="self-start flex items-center gap-2 px-6 py-3 bg-primary text-white font-sans text-[12px] tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {savingAdmins ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiSave className="w-4 h-4" />
              )}
              {savingAdmins ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
          
          <div className="flex flex-col gap-3 font-sans text-primary/70 bg-primary/5 p-6 border-[1px] border-primary/10 rounded-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-lg mt-0.5">✉️</span>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Email Notifications (Primary)</p>
                <p className="text-sm">Admin order notifications and customer confirmation emails are sent automatically via EmailJS when an order is placed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-lg mt-0.5">📨</span>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Telegram Notifications (Secondary / Backup)</p>
                <p className="text-sm">Telegram notifications run alongside email as a backup channel. Telegram may be temporarily unavailable due to a government restriction in India — Email notifications will continue working regardless.</p>
              </div>
            </div>
            <p className="text-xs italic text-primary/50 mt-1">No configuration needed — both channels are already active.</p>
          </div>

        </div>
      </div>
    </Sidebar>
  );
};
