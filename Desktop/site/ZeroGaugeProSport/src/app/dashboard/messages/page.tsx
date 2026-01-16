import Header from "@/components/Header";
import RecentMessagesWidget from "@/components/RecentMessagesWidget";

export default function MessagesPage() {
    return (
        <main className="min-h-screen bg-[#050509] text-white font-sans">
            <Header />

            <section className="pt-32 px-6 pb-24 max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-semibold text-blue-500 mb-4 uppercase tracking-wider">
                            Communicatie
                        </span>
                        <h1 className="text-4xl font-bold tracking-tight">Berichten Inbox</h1>
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/5 rounded-[32px] overflow-hidden min-h-[600px]">
                    {/* Reuse the widget logic but maybe we expand it later to be a full chat UI */}
                    {/* For now, wrapping the widget is a pragmatic MVP */}
                    <RecentMessagesWidget />
                </div>
            </section>
        </main>
    );
}
