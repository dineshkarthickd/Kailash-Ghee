import { Sidebar } from '../../components/admin/Sidebar';
import { FiBell } from 'react-icons/fi';

export const Settings = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-8 h-full min-h-[80vh]">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-[1px] border-primary/10 pb-4">
          <div>
            <h1 className="font-heading text-3xl text-primary mb-2">Store Settings</h1>
            <p className="font-sans text-primary/60">Manage your store's payments and notifications.</p>
          </div>
        </div>

        <div className="max-w-2xl bg-white/20 backdrop-blur-md border-[1px] border-primary/20 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-primary pb-4 border-b-[1px] border-primary/10">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FiBell className="stroke-[1.5]" />
            </div>
            <h2 className="font-heading text-xl">Notifications</h2>
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
