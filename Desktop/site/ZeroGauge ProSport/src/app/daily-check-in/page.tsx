"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Moon,
  Activity,
  Zap,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Flame,
  Droplets,
  Clock,
  Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Specific types based on "Meetpakket"
type FormData = {
  // Belasting
  sessionLoad: number; // RPE 1-10

  // Slaap
  sleepHours: number;
  sleepStartTime: string; // "22:30"
  nightAwakenings: number; // 0, 1, 2, 3+

  // Voeding
  lastMealTime: string; // "20:00"

  // Hydratatie
  urineColorMorning: number; // 1-5
  urineColorEvening: number; // 1-5
  waterIntakeLiters: number; // liters

  // Legacy (Required by schema/risk calc mostly, can be inferred or kept minimal)
  pain: number;
  energy: number;
  mood: number;
  nutrition: number;
  hydration: number; // 1-5 score derived or manual? User asked for liters. We can map liters to score internally or keep both.

  notes: string;
};

const initialData: FormData = {
  sessionLoad: 5,
  sleepHours: 7.5,
  sleepStartTime: "23:00",
  nightAwakenings: 0,
  lastMealTime: "19:00",
  urineColorMorning: 2,
  urineColorEvening: 2,
  waterIntakeLiters: 2.5,
  pain: 0,
  energy: 3,
  mood: 3,
  nutrition: 3,
  hydration: 3,
  notes: ""
};

const STEPS = [
  { id: 1, title: "Belasting", icon: Activity },
  { id: 2, title: "Slaap", icon: Moon },
  { id: 3, title: "Voeding & Vocht", icon: Droplets },
  { id: 4, title: "Overzicht", icon: CheckCircle },
];

export default function DailyCheckIn() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050509] text-white flex items-center justify-center">Laden...</div>}>
      <DailyCheckInContent />
    </Suspense>
  );
}

function DailyCheckInContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pulseId = searchParams.get('pulseId');

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const update = (field: keyof FormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/daily-wellness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, pulseId })
      });
      if (res.ok) {
        setCompleted(true);
        setTimeout(() => {
          router.push('/dashboard/personal');
        }, 2000);
      } else {
        alert("Fout bij opslaan. Probeer opnieuw.");
      }
    } catch (error) {
      console.error(error);
      alert("Er is iets misgegaan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[#050509] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Check-in Voltooid!</h1>
        <p className="text-zinc-500">Je data is opgeslagen. Goed bezig! 🔥</p>
        <Link href="/dashboard/personal" className="mt-8 text-blue-400 hover:text-white transition-colors">
          Terug naar Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050509] text-white flex flex-col">
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#050509]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#121214] border border-white/5 flex items-center justify-center">
            <Activity className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h1 className="font-bold text-sm uppercase tracking-wider text-zinc-400">Check-in</h1>
            <p className="font-bold text-white">Stap {step} / {STEPS.length}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {STEPS.map(s => (
            <div key={s.id} className={`h-1.5 w-8 rounded-full transition-all ${step >= s.id ? 'bg-blue-600' : 'bg-zinc-800'}`} />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-8 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500" key={step}>

        {/* STEP 1: Belasting (RPE) */}
        {step === 1 && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <Activity className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Hoe zwaar was het?</h2>
              <p className="text-zinc-500 mt-2 text-lg">Gebruik je gevoel van direct na de training of wedstrijd, niet achteraf.</p>
            </div>

            <div className="space-y-4 p-6 bg-[#121214] rounded-2xl border border-white/5">
              <label className="block text-center text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6">RPE Score</label>
              <div className="flex flex-wrap gap-2 justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                  <button
                    key={val}
                    onClick={() => update('sessionLoad', val)}
                    className={`w-12 h-12 rounded-xl font-black text-lg transition-all active:scale-95 ${data.sessionLoad === val
                      ? 'bg-red-500 text-white scale-110 shadow-lg shadow-red-500/20'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="text-center mt-6">
                <span className="inline-block px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 font-medium border border-white/5">
                  {data.sessionLoad <= 3 ? "Licht (Herstel)" : data.sessionLoad <= 7 ? "Gemiddeld (Training)" : "Zwaar (Wedstrijd/Max)"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Slaap Details */}
        {step === 2 && (
          <div className="space-y-10">
            <div className="text-center mb-8">
              <Moon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Slaap Details</h2>
              <p className="text-zinc-500 mt-2 text-lg">Als je dit dagelijks invult, zien jij en je coach sneller patronen in je herstel.</p>
            </div>

            {/* Uren */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-wider">Aantal Uur Geslapen</label>
              <input
                type="range" min="0" max="12" step="0.5"
                value={data.sleepHours}
                onChange={(e) => update('sleepHours', parseFloat(e.target.value))}
                className="w-full h-12 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 touch-none"
              />
              <div className="text-center text-5xl font-black text-white">{data.sleepHours}h</div>
            </div>

            {/* Bedtijd */}
            <div className="bg-[#121214] p-6 rounded-2xl border border-white/5 flex items-center justify-between min-h-[80px]">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-indigo-400" />
                <span className="font-bold text-zinc-300">Starttijd Slaap</span>
              </div>
              <input
                type="time"
                value={data.sleepStartTime}
                onChange={(e) => update('sleepStartTime', e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-white text-xl font-bold rounded-lg px-4 py-3 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Awakenings */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Aantal keer wakker</label>
              <div className="flex gap-4">
                {[0, 1, 2, 3].map(val => (
                  <button
                    key={val}
                    onClick={() => update('nightAwakenings', val)}
                    className={`flex-1 py-4 rounded-xl border font-bold text-lg transition-all active:scale-95 ${data.nightAwakenings === val
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400'
                      : 'bg-[#121214] border-zinc-800 text-zinc-500 hover:border-zinc-600'
                      }`}
                  >
                    {val === 3 ? "3+" : val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Voeding & Hydratatie */}
        {step === 3 && (
          <div className="space-y-10">
            <div className="text-center mb-8">
              <Utensils className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Voeding & Vocht</h2>
              <p className="text-zinc-500 mt-2 text-lg">Lichtere urine en voldoende drinken helpen blessures en kramp te voorkomen.</p>
            </div>

            {/* Last Meal */}
            <div className="bg-[#121214] p-6 rounded-2xl border border-white/5 flex items-center justify-between min-h-[80px]">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-zinc-300">Laatste Maaltijd</span>
              </div>
              <input
                type="time"
                value={data.lastMealTime}
                onChange={(e) => update('lastMealTime', e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-white text-xl font-bold rounded-lg px-4 py-3 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Water Intake */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-wider">Water Gedronken (Liters)</label>
              <input
                type="range" min="0" max="6" step="0.5"
                value={data.waterIntakeLiters}
                onChange={(e) => update('waterIntakeLiters', parseFloat(e.target.value))}
                className="w-full h-12 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 touch-none"
              />
              <div className="text-center text-4xl font-black text-cyan-400">{data.waterIntakeLiters}L</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Urine Morning */}
              <UrineScale
                label="Urine Ochtend"
                value={data.urineColorMorning}
                onChange={(v) => update('urineColorMorning', v)}
              />
              {/* Urine Evening */}
              <UrineScale
                label="Urine Avond"
                value={data.urineColorEvening}
                onChange={(v) => update('urineColorEvening', v)}
              />
            </div>
          </div>
        )}

        {/* STEP 4: Overzicht */}
        {step === 4 && (
          <div className="space-y-8 text-center bg-[#050509]">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-3xl font-bold text-white">Even checken...</h2>

            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 text-left space-y-4">
              <ReviewRow label="Inspanning (RPE)" value={data.sessionLoad.toString()} />
              <ReviewRow label="Slaap" value={`${data.sleepHours}u (Start: ${data.sleepStartTime})`} />
              <ReviewRow label="Wakker" value={`${data.nightAwakenings}x`} highlight={data.nightAwakenings > 1} />
              <ReviewRow label="Laatste Hap" value={data.lastMealTime} />
              <ReviewRow label="Water" value={`${data.waterIntakeLiters}L`} />
              <ReviewRow label="Urine (Ochtend)" value={`Score ${data.urineColorMorning}`} />
              <ReviewRow label="Urine (Avond)" value={`Score ${data.urineColorEvening}`} highlight={data.urineColorEvening > 3} />
            </div>

            {/* Conditional Coach Note - only for pulse-triggered check-ins */}
            {pulseId && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-blue-300 text-sm font-medium">
                  ⚡ Deze check-in wordt gekoppeld aan de pulse van je coach.
                </p>
              </div>
            )}

            <button
              onClick={submit}
              disabled={submitting}
              className="w-full bg-emerald-500 text-white px-8 py-5 rounded-xl font-black text-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 touch-manipulation"
            >
              {submitting ? 'Aan het opslaan...' : 'NU VERZENDEN'} <CheckCircle className="w-6 h-6" />
            </button>
          </div>
        )}

      </main>

      {/* Footer Navigation */}
      {step < 4 && (
        <footer className="p-8 border-t border-white/5 bg-[#050509] sticky bottom-0 z-20 backdrop-blur-md bg-opacity-95">
          <div className="max-w-2xl mx-auto flex justify-between">
            <button
              onClick={() => step === 1 ? router.push('/dashboard/personal') : prevStep()}
              disabled={submitting}
              className="px-6 py-4 rounded-xl font-bold text-zinc-400 hover:text-white transition-colors min-w-[100px] active:bg-white/5"
            >
              {step === 1 ? 'Annuleren' : 'Terug'}
            </button>

            <button
              onClick={nextStep}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20 min-w-[140px] justify-center active:scale-95"
            >
              Volgende <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

function ReviewRow({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-zinc-400 text-sm uppercase tracking-wide">{label}</span>
      <span className={`font-bold font-mono ${highlight ? 'text-red-500' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function UrineScale({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-3">
      <label className="block text-center text-xs font-bold text-zinc-400 uppercase tracking-wider">{label}</label>
      <div className="flex flex-col gap-1.5">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`h-8 rounded-md border-2 transition-all ${value === v ? 'border-white scale-110 shadow-lg z-10' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            style={{
              backgroundColor: v === 1 ? '#fefce8' : v === 2 ? '#fef08a' : v === 3 ? '#fde047' : v === 4 ? '#eab308' : '#a16207'
            }}
          />
        ))}
      </div>
      <div className="flex justify-between px-1">
        <span className="text-[10px] text-zinc-500">Licht</span>
        <span className="text-[10px] text-zinc-500">Donker</span>
      </div>
    </div>
  );
}
