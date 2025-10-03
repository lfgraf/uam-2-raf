import { SharpSidebar } from '@/components/advertiser-2/SharpSidebar';

export default function Advertiser2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#1A202C]">
      <SharpSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
