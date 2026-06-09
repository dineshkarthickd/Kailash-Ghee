import { Sidebar } from '../../components/admin/Sidebar';

export const Settings = () => {
  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto w-full px-4 py-4 md:px-6 md:py-6">
        <div className="mb-4 md:mb-6 border-b-2 border-gold pb-3">
          <h1 className="text-lg md:text-xl font-heading font-bold text-darkbrown">Store Settings</h1>
          <p className="text-sm text-darkbrown opacity-70 mt-2">Manage your store's payments and notifications.</p>
        </div>
      
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-lightgold max-w-2xl">
          <div className="bg-[#FFFDF8] p-4 md:p-5 rounded-xl border border-cream">
            <h2 className="text-lg font-heading font-bold text-darkbrown mb-4 flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold bg-opacity-20 flex items-center justify-center mr-3 text-gold text-xs">1</span>
              Notifications
            </h2>
            <div className="text-sm md:text-base text-darkbrown bg-blue-50 p-4 rounded-lg border border-blue-200">
              Notifications are sent via Telegram to admin automatically when orders are placed.
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
