"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, Moon } from "lucide-react";

const demoPlayers = [
  { id: "player1", name: "Mike de Jong", position: "ST" },
  { id: "player2", name: "Tim van Dijk", position: "CM" },
  { id: "player3", name: "Lars Bakker", position: "RB" },
  { id: "player4", name: "Sem Jansen", position: "LW" },
  { id: "player5", name: "Daan Peters", position: "GK" },
  { id: "player6", name: "Rick de Vries", position: "CB" },
];

type SessionType = "training" | "wedstrijd" | "rust";

interface DailyCheckInFormData {
  playerId: string;
  sessionType: SessionType;
  sessionLoad: number;
  sleepHours: number;
  sleepBedtime: string;
  sleepWakeTime: string;
  lastMealTime: string;
  hydrationIntake: number;
  urineColorMorning: number;
  urineColorEvening: number;
  nightAwakenings: number;
  notes: string;
}

export default function DailyCheckInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<DailyCheckInFormData>({
    playerId: "player1",
    sessionType: "training",
    sessionLoad: 5,
    sleepHours: 7.5,
    sleepBedtime: "22:00",
    sleepWakeTime: "07:00",
    lastMealTime: "20:30",
    hydrationIntake: 6,
    urineColorMorning: 2,
    urineColorEvening: 3,
    nightAwakenings: 1,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/daily-wellness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.refresh();
        }, 2000);
      } else {
        alert("Fout bij opslaan");
      }
    } catch (error) {
      alert("Netwerk fout");
    } finally {
      setLoading(false);
    }
  };

  const updateSlider = (field: keyof DailyCheckInFormData, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateInput = (field: keyof DailyCheckInFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center">
        <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-emerald-800 mb-4">Check-in opgeslagen!</h2>
        <p className="text-lg text-emerald-700">Dank je {demoPlayers.find(p => p.id === formData.playerId)?.name}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-white/50">
      {/* Player Select */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Speler</label>
        <select
          value={formData.playerId}
          onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
          className="w-full p-4 border border-slate-200 rounded-xl bg-white/50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {demoPlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name} - {player.position}
            </option>
          ))}
        </select>
      </div>

      {/* Session Type */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["training", "wedstrijd", "rust"] as SessionType[]).map((type) => (
          <label key={type} className="flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer group hover:shadow-md hover:scale-[1.02] relative overflow-hidden">
            <input
              type="radio"
              name="sessionType"
              value={type}
              checked={formData.sessionType === type}
              onChange={() => setFormData({ ...formData, sessionType: type })}
              className="sr-only"
            />
            <span className={`w-3 h-3 rounded-full mr-3 border-2 transition-all ${formData.sessionType === type ? 'border-blue-500 bg-blue-500' : 'border-slate-300 group-hover:border-slate-400'}`} />
            <span className="font-medium capitalize text-slate-700">{type}</span>
          </label>
        ))}
      </div>

      {/* Sliders - ProSport velden */}
      <div className="space-y-6">
        <SliderField label="Belasting (RPE)" value={formData.sessionLoad} min={0} max={10} field="sessionLoad" onChange={updateSlider} />
        <SliderField label="Slaapuren" value={formData.sleepHours} min={0} max={12} step={0.5} field="sleepHours" onChange={updateSlider} />
        <SliderField label="Water (glazen)" value={formData.hydrationIntake} min={0} max={10} field="hydrationIntake" onChange={updateSlider} />
        <SliderField label="Plaskleur ochtend" value={formData.urineColorMorning} min={1} max={5} field="urineColorMorning" onChange={updateSlider} />
        <SliderField label="Plaskleur avond" value={formData.urineColorEvening} min={1} max={5} field="urineColorEvening" onChange={updateSlider} />
        <SliderField label="Nachtelijk wakker" value={formData.nightAwakenings} min={0} max={5} field="nightAwakenings" onChange={updateSlider} icon={<Moon className="w-4 h-4" />} />
      </div>

      {/* Times */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <InputField label="Bedtijd" value={formData.sleepBedtime} field="sleepBedtime" onChange={updateInput} />
        <InputField label="Wakertijd" value={formData.sleepWakeTime} field="sleepWakeTime" onChange={updateInput} />
        <InputField label="Laatste maaltijd" value={formData.lastMealTime} field="lastMealTime" onChange={updateInput} />
      </div>

      {/* Notes */}
      <div className="mt-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Notities</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Vul eventuele bijzonderheden in..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-10 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-5 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Opslaan...</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Check-in opslaan</span>
          </>
        )}
      </button>
    </form>
  );
}

type SliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  field: keyof DailyCheckInFormData;
  onChange: (field: keyof DailyCheckInFormData, value: number) => void;
  icon?: React.ReactNode;
};

function SliderField({ label, value, min, max, step = 1, field, onChange, icon }: SliderFieldProps) {
  const lowLabel = min.toString();
  const highLabel = max.toString();

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(field, parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600 transition-all"
        />
        <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wider px-1 mt-1">
          <span>{lowLabel}</span>
          <span className="font-bold text-slate-900">{value}</span>
          <span>{highLabel}</span>
        </div>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  field: keyof DailyCheckInFormData;
  onChange: (field: keyof DailyCheckInFormData, value: string) => void;
};

function InputField({ label, value, field, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full p-3 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
}
