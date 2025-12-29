"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Zap, Play, Mail, Loader2, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
      alert("Check je email voor de Magic Link!");
      setEmailOpen(false);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4 relative overflow-hidden text-white">
      {/* Pulse Orb Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">
              VIBECHAIN
            </h1>
            <h2 className="text-3xl md:text-5xl font-light text-white/90">
              Vlinders resoneren
            </h2>
          </div>

          <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0">
            Connect deeper than just looks. Record your vibe, find your resonance, and let the butterflies guide you.
          </p>

          <Link href="/vibe/chain/new" className="inline-block">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl py-8 px-10 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] animate-pulse transition-all transform hover:scale-105 border-0 cursor-pointer">
              <Mic className="w-6 h-6 mr-2" />
              Start VibeChain
            </Button>
          </Link>

          <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">98%</span>
              <span className="text-sm text-white/50">Match Rate</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">24k+</span>
              <span className="text-sm text-white/50">Vibes Sent</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">4.9</span>
              <span className="text-sm text-white/50">Resonance</span>
            </div>
          </div>
        </div>

        {/* Right Image / Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-50"></div>
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 flex flex-col items-center shadow-2xl">
            <div className="relative w-full aspect-[4/5] max-w-md rounded-xl overflow-hidden mb-6 group">
              <Image
                src="/hero-image.png"
                alt="VibeChain Hero"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Floating Cards Mockup */}
              <div className="absolute bottom-6 left-4 right-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <Zap size={12} className="fill-current" /> 97% Match
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">Lisa, 24</h3>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Play size={18} className="fill-white text-white ml-1" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Voice Intro</div>
                    <div className="h-1 w-24 bg-white/20 rounded-full mt-1 overflow-hidden">
                      <div className="h-full w-2/3 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-white/60">0:14</span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              {user ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <p className="text-emerald-400 font-medium">Welcome back!</p>
                    <p className="text-xs text-white/50">{user.email}</p>
                  </div>
                  <Link href="/vibe/chain/new">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-xl text-lg">
                      <Zap className="mr-2 h-5 w-5 fill-current" />
                      Continue VibeChain
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" className="w-full text-white/40 hover:text-white/80 h-10">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white h-12 rounded-xl text-lg font-normal">
                        Continue with Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Sign in with VibeChain</DialogTitle>
                        <DialogDescription>
                          Enter your email to receive a magic login link.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email" className="text-white/60">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-zinc-900 border-white/20 text-white placeholder:text-white/30"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white" disabled={loading}>
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                          Send Magic Link
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={handleGoogleLogin} variant="outline" className="w-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white h-12 rounded-xl text-lg font-normal" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue with Google"}
                  </Button>
                </>
              )}
            </div>

            <p className="mt-6 text-xs text-white/40 text-center">
              By joining, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
