import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { CoachPulses } from "@/components/CoachPulses";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";

export default function HoeHetWerktPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Header />
            <HowItWorks />
            <UseCases />
            <CoachPulses />
            <FAQ />
            <BottomCTA />
            <Footer />
        </main>
    );
}
