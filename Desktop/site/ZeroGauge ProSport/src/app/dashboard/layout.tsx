import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-accent/30 flex">
            <DashboardSidebar />
            <div className="flex-1 pl-[260px]">
                {children}
            </div>
        </div>
    );
}
