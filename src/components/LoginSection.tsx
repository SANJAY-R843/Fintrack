import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface LoginSectionProps {
  onLoginSuccess: (email: string) => void;
  onCancel: () => void;
  showToast: (msg: string) => void;
}

export default function LoginSection({ onLoginSuccess, onCancel, showToast }: LoginSectionProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast("❌ Please fill out a valid email address.");
      return;
    }
    if (!password) {
      showToast("❌ Please specify your sandbox credential password.");
      return;
    }
    if (!agreeTerms) {
      showToast("❌ Please accept FinTrack's sandbox conditions.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate premium loading pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`🔑 Access Granted! Welcome back to FinTrack, ${email}`);
      onLoginSuccess(email);
    }, 1800);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    showToast("⚡ Querying Secured Google Authentication Gateway...");
    setTimeout(() => {
      setIsSubmitting(false);
      const mockGoogleEmail = "sanjayr2006.demo@gmail.com";
      showToast(`🔑 Logged in successfully via Google secure token!`);
      onLoginSuccess(mockGoogleEmail);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto relative z-30">
      
      {/* Visual glowing elements behind the login system */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#5f5df5]/10 filter blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/5 filter blur-3xl rounded-full pointer-events-none" />

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-zinc-950/90 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
      >
        
        {/* Core title badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5f5df5]/10 border border-[#5f5df5]/20 text-[10px] font-bold text-[#7a78fa] tracking-widest uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5f5df5]" />
            <span>FinTrack Secure Gateway</span>
          </div>
        </div>

        {/* Dynamic header texts based on flow */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            {activeTab === "signin" ? "WELCOME TO FINTRACK" : "CREATE NEW PROFILE"}
          </h2>
          <p className="mt-2 text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
            {activeTab === "signin" 
              ? "Access your hyper-secure personalized cash flows, asset boards, and micro projections instantly." 
              : "Set up a sandbox account structure to log recurring expenditures and monitor mutual funds."
            }
          </p>
        </div>

        {/* Tab System (Sign In vs Sign Up Tab Option) */}
        <div className="grid grid-cols-2 p-1 bg-zinc-900/60 rounded-xl border border-zinc-800/80 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("signin");
              showToast("Switched to Sign In form");
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "signin" 
                ? "bg-zinc-850 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign In Profile
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("signup");
              showToast("Switched to Create Profile form");
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "signup" 
                ? "bg-zinc-850 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign up if new
          </button>
        </div>

        {/* Demo Alert Sandbox Announcement Banner */}
        <div className="mb-6 p-3.5 bg-indigo-950/20 border border-indigo-900/30 rounded-xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#7a78fa] flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <span className="text-[9px] font-black uppercase text-[#7a78fa] block tracking-widest">Demo Workflow Mode Active</span>
            <p className="text-[10px] text-zinc-400 mt-0.5 font-light leading-snug">
              Because this is a secure web sandbox application, you can enter any matching login credentials (e.g., <strong className="text-zinc-200">sanjay@demo.com</strong>) to successfully boot the workspace dashboard.
            </p>
          </div>
        </div>

        {/* Form elements */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* Email input details context */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
              Secure Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="you@domain.com (any email works)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#5f5df5] transition-all font-semibold"
              />
            </div>
          </div>

          {/* Password secure view toggle content */}
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                Account Access Password
              </label>
              {activeTab === "signin" && (
                <button
                  type="button"
                  onClick={() => showToast("Sandbox Recovery: type any credentials to overwrite and log in instantly.")}
                  className="text-[9px] text-[#7a78fa] hover:text-[#5f5df5] font-black uppercase tracking-wider cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={activeTab === "signin" ? "Enter password credential" : "Establish password structure"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#5f5df5] transition-all font-mono font-bold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Privacy Terms layout checkbox */}
          <div className="pt-2 flex items-center gap-2.5 text-left">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="accent-[#5f5df5] rounded"
            />
            <label htmlFor="agreeTerms" className="text-[10px] text-zinc-500 cursor-pointer select-none">
              Agree to sandbox testing policies &amp; encrypted offline data storage targets.
            </label>
          </div>

          {/* Form Actions Submit Button with custom loading overlay styling */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#5f5df5] hover:bg-[#7a78fa] font-black text-xs text-white uppercase tracking-wider hover:shadow-[0_0_25px_rgba(95,93,245,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating Gateway...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === "signin" ? "LOG IN SECURELY" : "ESTABLISH CUSTOM PROFILE"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Separator block */}
            <div className="flex items-center justify-between text-zinc-700 text-[10px] font-bold uppercase tracking-widest py-2">
              <span className="w-[43%] h-[1px] bg-zinc-900" />
              <span>OR</span>
              <span className="w-[43%] h-[1px] bg-zinc-900" />
            </div>

            {/* Google Authentication simulation option with standard design */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleGoogleLogin}
              className="w-full py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 hover:border-[#5f5df5]/40 border border-zinc-800 text-zinc-300 hover:text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105.996 5.047 1.892l3.423-3.29C18.435 1.21 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.74 11.57-11.4 0-.765-.085-1.35-.18-1.865h-11.39z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest cursor-pointer mt-2"
          >
            Cancel and Return Home
          </button>
        </div>

      </motion.div>

    </div>
  );
}
