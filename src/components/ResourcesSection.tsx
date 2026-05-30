import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Calculator,
  HelpCircle,
  HelpCircle as QuestionIcon,
  MessageSquare,
  Sparkles,
  Search,
  ChevronDown,
  Clock,
  Calendar,
  CheckCircle,
  TrendingUp,
  Mail,
  Send,
  AlertCircle,
  Bookmark,
  ChevronRight,
  ArrowRight,
  Info
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface ResourcesSectionProps {
  initialTab?: string;
  onBackHome: () => void;
  showToast: (msg: string) => void;
}

export default function ResourcesSection({ initialTab = "guides", onBackHome, showToast }: ResourcesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Tabs structure
  const tabs = [
    { id: "guides", name: "Financial Guides", icon: BookOpen },
    { id: "calculator", name: "Savings Calculator", icon: Calculator },
    { id: "help", name: "Help Center", icon: HelpCircle },
    { id: "faqs", name: "FAQs", icon: QuestionIcon },
    { id: "notes", name: "Release Notes", icon: Sparkles },
    { id: "support", name: "Support Hub", icon: MessageSquare }
  ];

  // 1. FINANCIAL GUIDES & COURSES (Section 1, 2, 3)
  // Financial Guides
  const guidesList = [
    {
      title: "How to Create a Monthly Budget",
      desc: "Master the fundamental skills of mapping your income streams and categorizing core bills to prevent end-of-month shortfalls.",
      category: "Personal Finance 101",
      readTime: "4 mins read",
      date: "28 May 2026",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80&referrerPolicy=no-referrer"
    },
    {
      title: "50/30/20 Budget Rule Explained",
      desc: "Divide your post-tax earnings into 50% Needs, 30% Wants, and 20% future Goals for an optimized structure.",
      category: "Budgeting Strategy",
      readTime: "6 mins read",
      date: "25 May 2026",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80&referrerPolicy=no-referrer"
    },
    {
      title: "How to Reduce Unnecessary Expenses",
      desc: "Audit your subscriptions, microtransaction bills, and dining habits to leakproof your daily cash outflows with compound calculations.",
      category: "Frugal Living",
      readTime: "5 mins read",
      date: "21 May 2026",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80&referrerPolicy=no-referrer"
    },
    {
      title: "Emergency Fund Planning",
      desc: "Secure 3 to 6 months of absolute living expenses inside high-liquidity accounts to absorb life's unforeseen events effortlessly.",
      category: "Risk Mitigation",
      readTime: "7 mins read",
      date: "14 May 2026",
      image: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=600&auto=format&fit=crop&q=80&referrerPolicy=no-referrer"
    },
    {
      title: "Smart Spending Habits",
      desc: "Construct strong cognitive checkpoints using rules like 'Wait 48 hours before discretionary purchases' to master financial discipline.",
      category: "Behavioral Economics",
      readTime: "4 mins read",
      date: "09 May 2026",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80&referrerPolicy=no-referrer"
    }
  ];

  // Budgeting Academy state
  const [academyProgress, setAcademyProgress] = useState<number>(3); // standard current lesson indicator out of 10
  const academyLessons = [
    { id: 1, title: "Foundations of Value creation & Budgeting", completed: true },
    { id: 2, title: "The Art of Multi-Envelope Capital allocation", completed: true },
    { id: 3, title: "Debt Consolidation Strategies & Snowball Methods", active: true },
    { id: 4, title: "Automating savings rates without severe lifestyle changes", completed: false },
    { id: 5, title: "Leveraging Tax-saving mechanisms under Indian standard brackets", completed: false },
    { id: 6, title: "Financial Freedom milestones and compounding targets", completed: false }
  ];

  const handleLessonCheck = (lessonId: number) => {
    if (lessonId <= academyProgress) {
      setAcademyProgress(lessonId - 1);
      showToast("Updated learning trajectory");
    } else {
      setAcademyProgress(lessonId);
      showToast(`Bravo! Lesson ${lessonId} Completed. Your academy score is up!`);
    }
  };

  // Investment Basics list
  const investmentBasics = [
    {
      title: "Stocks Explained",
      type: "EQUITY ASSETS",
      metric: "High Risk / High Return",
      desc: "Owning fractional shares of enterprise corporations. Leverage equity growth & dividends. Ideal for long-term compound runways.",
      formula: "Capital Growth = (Current Price - Purchase Price) * Total Shares"
    },
    {
      title: "Mutual Funds",
      type: "DIVERSIFIED POOLS",
      metric: "Medium Risk / Moderate Return",
      desc: "Managed capital pooling investing across diverse equity/debt instruments. SIP structures auto-compound seamlessly monthly.",
      formula: "Portfolio NAV = Total Asset Net Asset Value / Outstanding Units"
    },
    {
      title: "Gold Investments",
      type: "INFLATION HEDGES",
      metric: "Low Risk / Consistent Hedge",
      desc: "Sovereign Gold Bonds or physical bullion. Protects asset baskets during persistent hyperinflation waves or market volatility correction.",
      formula: "Yield = SGB Annual 2.50% interest payout + Bullion Spot Market Value delta"
    },
    {
      title: "Risk Management",
      type: "SHIELD STRATEGIES",
      metric: "Critical Checkpoint",
      desc: "Never concentrate allocations inside one bucket. Align risks strictly against your age brackets and long-term liquidity targets.",
      formula: "Allocation = 100 - Current Age (Estimated general guideline for equity weight)"
    },
    {
      title: "Portfolio Diversification",
      type: "ASSET MATCHING",
      metric: "Efficient Frontier",
      desc: "Balancing stock equities, mutual funds, real estate, cash certificates, and precious metals to withstand any macroeconomic climate.",
      formula: "β value < 1.0 reduces volatile swings relative to market averages"
    }
  ];

  // 2. SAVINGS CALCULATOR (Interactive state & projections)
  const [inputMonthlySavings, setInputMonthlySavings] = useState<number>(5000);
  const [inputYears, setInputYears] = useState<number>(5);
  const [inputAnnualRate, setInputAnnualRate] = useState<number>(8); // 8% average return
  const [inputPrincipal, setInputPrincipal] = useState<number>(50000); // initial start balance

  // Formula details & output logic
  // PMT = monthly savings (P), r = annual rate / 12, n_months = years * 12
  // Future Value of annuity = PMT * [((1 + r)^n_months - 1) / r] * (1 + r)
  // Plus Future Value of principal = Principal * (1+r)^n_months
  const savingsProjectionData = useMemo(() => {
    const data = [];
    const monthlyRate = (inputAnnualRate / 100) / 12;
    const totalMonths = inputYears * 12;
    
    let runningTotalInvested = inputPrincipal;
    let runningBalance = inputPrincipal;

    // We store year-by-year calculations
    data.push({
      year: "Start",
      TotalInvested: Math.round(runningTotalInvested),
      FutureValue: Math.round(runningBalance),
      InterestEarned: 0
    });

    for (let yr = 1; yr <= inputYears; yr++) {
      for (let m = 0; m < 12; m++) {
        runningTotalInvested += inputMonthlySavings;
        runningBalance = (runningBalance + inputMonthlySavings) * (1 + monthlyRate);
      }
      data.push({
        year: `Yr ${yr}`,
        TotalInvested: Math.round(runningTotalInvested),
        FutureValue: Math.round(runningBalance),
        InterestEarned: Math.round(runningBalance - runningTotalInvested)
      });
    }
    return data;
  }, [inputMonthlySavings, inputYears, inputAnnualRate, inputPrincipal]);

  const finalComputedSavings = savingsProjectionData[savingsProjectionData.length - 1];

  // 3. HELP CENTER Search & Categories
  const [helpSearchQuery, setHelpSearchQuery] = useState("");
  const helpArticles = [
    { title: "Getting Started", category: "Basics", desc: "How to initialize accounts, configure currency defaults, and back up browser state profiles." },
    { title: "Managing Transactions", category: "Transactions", desc: "Understanding tags, auto-classification terms, and modifying chronological dates manually." },
    { title: "Setting Budgets", category: "Budgets", desc: "Establishing strict thresholds on specific dining, entertainment, and utilities limits with alert levels." },
    { title: "Tracking Investments", category: "Investments", desc: "Log purchase prices, current gold gram counts, SIP targets, and visualize returns grids instantly." },
    { title: "Bill Reminders", category: "Bills", desc: "Configure monthly rent alerts, cellular bills, schedule renewals, and route items as transactions." },
    { title: "Account Settings", category: "Security", desc: "Adjust system typography moods, theme modules, toggle CyberDock presets, and purge local trackers." }
  ];

  const filteredHelpArticles = useMemo(() => {
    if (!helpSearchQuery.trim()) return helpArticles;
    return helpArticles.filter(art => 
      art.title.toLowerCase().includes(helpSearchQuery.toLowerCase()) || 
      art.desc.toLowerCase().includes(helpSearchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(helpSearchQuery.toLowerCase())
    );
  }, [helpSearchQuery]);

  // 4. FAQS Accordions
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const faqs = [
    {
      q: "Is my data secure?",
      a: "Yes, completely! FinTrack values user privacy above all. Because this is a localized Sandbox application, your transaction histories, investment values, and custom configurations are compiled and stored 100% on your device's browser local database. No external servers ever collect, audit, or monetize your details."
    },
    {
      q: "Can I export my data?",
      a: "Absolutely! From the Expense tracking workspace, you can trigger CSV exports of your entire transactional log. This makes audit reporting, Excel formatting, and custom planning effortless."
    },
    {
      q: "How do recurring bills work?",
      a: "When you mark a reminder as Paid, our interconnected transactional engine automatically deducts the amount from your designated budgets and adds a transaction. It then triggers an automated recurring scheduler to queue the next monthly renewal bill automatically."
    },
    {
      q: "Can I delete my account?",
      a: "Since we operate completely serverless and private on your standard local system, you have absolute control over your profile. You can purge all financial caches and start slate-clean with a click of our reset controls from the dashboard anytime."
    },
    {
      q: "Is FinTrack free?",
      a: "Yes! Our core features—such as expense logging, basic category budgets, and simple asset listings—are entirely free forever. We also feature premium Pro and VIP packages simulating custom design libraries and compounding analyzers."
    }
  ];

  // 5. RELEASE NOTES (Timeline format)
  const releases = [
    {
      version: "v1.3",
      date: "May 2026",
      title: "Interconnected Wealth Monitor Integration",
      notes: [
        "Added live sovereign gold bond and mutual fund tracking modules.",
        "Improved dashboard animation sequences with high-framerate Motion frames.",
        "Integrated budget caution zones with 50% / 75% / 90% threshold alerts."
      ]
    },
    {
      version: "v1.2",
      date: "April 2026",
      title: "Advanced Categorization Model",
      notes: [
        "Enabled intelligent regex strings to automatically categorise Swiggy, Uber, Zomato, Jio entries.",
        "Added customizable dashboard customizers (Luxurious, Retro, Space-Tech themes).",
        "Configured offline persistence fallback to prevent data loss."
      ]
    },
    {
      version: "v1.1",
      date: "March 2026",
      title: "Initial Launch",
      notes: [
        "Deployed clean mobile-first grids for simple cash flow logging.",
        "Implemented secure sandbox layout with fully reactive state tables.",
        "Initialized instant CSV spreadsheet export structures."
      ]
    }
  ];

  // 6. CONTACT SUPPORT (Interactive form)
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportType, setSupportType] = useState("Bug Report");
  const [supportMsg, setSupportMsg] = useState("");
  const [supportSubmitting, setSupportSubmitting] = useState(false);

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMsg) {
      showToast("❌ Please fill out all required fields.");
      return;
    }
    setSupportSubmitting(true);
    setTimeout(() => {
      showToast(`✉ Support Ticket Submitted! Ref: FT-${Math.floor(Math.random() * 90000 + 10000)}`);
      setSupportName("");
      setSupportEmail("");
      setSupportMsg("");
      setSupportSubmitting(false);
    }, 1800);
  };

  return (
    <div className="w-full">
      
      {/* Intro Header */}
      <div className="text-center py-6 max-w-2xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5f5df5]/10 border border-[#5f5df5]/20 text-[10px] font-bold text-[#7a78fa] tracking-widest uppercase mb-4">
          <BookOpen className="w-3.5 h-3.5 text-[#5f5df5]" />
          <span>FinTrack Knowledge Hub</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans uppercase">
          RESOURCES &amp; EDUCATION
        </h1>
        <p className="mt-3 text-zinc-400 text-xs sm:text-sm">
          Optimize your personal wealth strategies with interactive savers projection models, structured lesson timeline guides, and full documentation.
        </p>
      </div>

      {/* Horizontal Nav Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-zinc-950/80 rounded-2xl border border-zinc-900/60 max-w-4xl mx-auto mb-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                showToast(`Loaded section: ${tab.name}`);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#5f5df5] text-white shadow-[0_0_15px_rgba(95,93,245,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        
        {/* ==============================================
            TAB 1: FINANCIAL GUIDES, BUDGET ACADEMY & INVESTMENT BASICS
            ============================================== */}
        {activeTab === "guides" && (
          <motion.div
            key="tab-guides"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
            {/* Split layout: Academy progress tracker & list of guides */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Academy status (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 filter blur-2xl rounded-full" />
                
                <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Academy Course</span>
                </div>

                <h3 className="text-lg font-black text-white">Budgeting Academy</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Join structural lesson blueprints and track progress on managing compound interest ratios, debt snuffs, and micro spend leaks.
                </p>

                {/* Progress Card dashboard */}
                <div className="mt-6 p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Current Trajectory</span>
                    <h4 className="text-sm font-black text-white mt-1">Lesson {academyProgress} of 6 Completed</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-mono font-black text-emerald-400">
                      {Math.round((academyProgress / 6) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-950">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${(academyProgress / 6) * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>

                {/* Checklist lessons */}
                <div className="mt-6 space-y-2.5">
                  {academyLessons.map((les) => (
                    <div 
                      key={les.id}
                      onClick={() => handleLessonCheck(les.id)}
                      className={`group flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                        les.id <= academyProgress
                          ? "bg-emerald-500/5 border-emerald-950/40 text-emerald-400"
                          : "bg-zinc-950 border-zinc-900/60 text-zinc-400 hover:border-zinc-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                          les.id <= academyProgress
                            ? "bg-emerald-500 border-emerald-400 text-zinc-950"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400"
                        }`}>
                          {les.id}
                        </div>
                        <span className="font-semibold leading-snug group-hover:text-white transition-colors">
                          {les.title}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Educational Articles (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">Recommended Reading Guides</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Explore our deep dives on structured wealth planning workflows.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guidesList.map((guide, idx) => (
                    <div 
                      key={idx}
                      className="group bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden hover:border-[#5f5df5]/40 transition-all duration-350 flex flex-col justify-between"
                    >
                      <div>
                        {/* Cover image referencing actual Unsplash photos with JSX fallback */}
                        <div className="h-32 w-full relative overflow-hidden bg-zinc-900">
                          <img 
                            src={guide.image} 
                            alt={guide.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                          />
                          <div className="absolute top-3 left-3 bg-zinc-950/80 border border-zinc-800 rounded px-2 py-0.5 text-[9px] font-bold text-[#7a78fa] uppercase">
                            {guide.category}
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center gap-3 text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#5f5df5]" />
                              {guide.readTime}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-zinc-600" />
                              {guide.date}
                            </span>
                          </div>
                          
                          <h4 className="text-sm font-black text-white group-hover:text-[#7a78fa] transition-colors leading-tight line-clamp-1">
                            {guide.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-sans font-light">
                            {guide.desc}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <button
                          onClick={() => showToast(`Opening article: "${guide.title}"`)}
                          className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-indigo-950/40 border border-zinc-800 text-[10px] font-bold text-zinc-300 group-hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Review Full Whitepaper</span>
                          <ArrowRight className="w-3 h-3 text-[#5f5df5]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Part C: Investment Basics Details */}
            <div className="pt-10 border-t border-zinc-900/60">
              <div className="mb-6">
                <span className="text-[10px] text-[#5f5df5] font-black uppercase tracking-widest bg-[#5f5df5]/10 px-2.5 py-1 rounded border border-indigo-950">
                  Asset Taxonomy Basics
                </span>
                <h3 className="text-xl font-extrabold text-white mt-3">Investment Fundamentals Roadmap</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Deepen your understanding of stock markets, gold reserves, and diversification metrics before making allocations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentBasics.map((asset, idx) => (
                  <div 
                    key={idx}
                    className="p-5 bg-zinc-950/80 border border-zinc-900/60 rounded-2xl flex flex-col justify-between hover:border-zinc-800 transition-all hover:bg-zinc-950"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-[9px] font-black tracking-widest uppercase">
                        <span className="text-[#7a78fa]">{asset.type}</span>
                        <span className="text-emerald-400">{asset.metric}</span>
                      </div>
                      <h4 className="text-sm font-black text-white">{asset.title}</h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans font-light">
                        {asset.desc}
                      </p>
                    </div>

                    <div className="mt-5 p-3.5 bg-zinc-950 border border-zinc-900 rounded-lg font-mono text-[9px] text-indigo-300">
                      <span className="text-zinc-500 uppercase font-black block mb-1">Standard Calculation:</span>
                      {asset.formula}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ==============================================
            TAB 2: SAVINGS CALCULATOR (Dynamic Projection Charts)
            ============================================== */}
        {activeTab === "calculator" && (
          <motion.div
            key="tab-calculator"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Hand: Controls & Input values (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between">
              
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] text-[#5f5df5] font-black uppercase tracking-widest">
                    Compound Interest Projection Model
                  </span>
                  <h3 className="text-lg font-black text-white mt-1.5">Interactive Estimator</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Simulate how small, consistent monthly savings compound over long horizons at custom interest rate yields.
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 pt-4 border-t border-zinc-900/60">
                  
                  {/* Monthly savings */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-wide">
                        Monthly Contribution
                      </label>
                      <span className="text-xs font-bold text-[#7a78fa] font-mono">
                        ₹{inputMonthlySavings.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={50000}
                      step={500}
                      value={inputMonthlySavings}
                      onChange={(e) => setInputMonthlySavings(Number(e.target.value))}
                      className="w-full accent-[#5f5df5] bg-zinc-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 uppercase font-bold mt-1">
                      <span>₹1,000</span>
                      <span>₹50,000</span>
                    </div>
                  </div>

                  {/* Years */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-wide">
                        Investment Horizon
                      </label>
                      <span className="text-xs font-bold text-[#7a78fa] font-mono">
                        {inputYears} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      step={1}
                      value={inputYears}
                      onChange={(e) => setInputYears(Number(e.target.value))}
                      className="w-full accent-[#5f5df5] bg-zinc-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 uppercase font-bold mt-1">
                      <span>1 Year</span>
                      <span>25 Years</span>
                    </div>
                  </div>

                  {/* Growth Rate / ROI Yield */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-wide">
                        Assumed Return Rate (APY)
                      </label>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {inputAnnualRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={18}
                      step={0.5}
                      value={inputAnnualRate}
                      onChange={(e) => setInputAnnualRate(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-zinc-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 uppercase font-bold mt-1">
                      <span>2% Savings</span>
                      <span>18% Crypto/Equity</span>
                    </div>
                  </div>

                  {/* Principal */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-wide">
                        Initial Lump Sum Capital
                      </label>
                      <span className="text-xs font-bold text-zinc-400 font-mono">
                        ₹{inputPrincipal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={500000}
                      step={5000}
                      value={inputPrincipal}
                      onChange={(e) => setInputPrincipal(Number(e.target.value))}
                      className="w-full accent-zinc-500 bg-zinc-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 uppercase font-bold mt-1">
                      <span>₹0</span>
                      <span>₹5,00,000</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Proportional Growth Explanation Formula overlay */}
              <div className="mt-8 p-4 bg-zinc-950 border border-zinc-900 rounded-2xl font-mono text-[9px] text-zinc-500 space-y-1.5 text-left leading-relaxed">
                <span className="text-zinc-400 font-bold block">Compounding Growth Formula:</span>
                <p className="text-indigo-400 text-[10px] font-bold">FV = PV &times; (1 + r)&sup1;&sup2;&sup1; + PMT &times; [((1 + r)&sup1;&sup2;&sup1; - 1) / r]</p>
                <p>
                  Where <strong className="text-zinc-400">PV</strong> equals Initial Capital, <strong className="text-zinc-400">PMT</strong> represents Monthly Savings contribution, <strong className="text-zinc-400">r</strong> is interest rate / 12, and <strong className="text-zinc-400">t</strong> is length of compound periods.
                </p>
              </div>

            </div>

            {/* Right Hand: Interactive chart & results panels (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between">
              
              {/* Summary stats grids */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                
                {/* Stat 1 */}
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Total Invested</span>
                  <p className="text-lg font-black text-white mt-1">
                    ₹{finalComputedSavings.TotalInvested.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="p-4 bg-zinc-950 border border-indigo-950 rounded-2xl">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Est. Interest</span>
                  <p className="text-lg font-black text-emerald-400 mt-1">
                    +₹{finalComputedSavings.InterestEarned.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="p-4 bg-zinc-950 border border-indigo-900/40 rounded-2xl">
                  <span className="text-[9px] text-indigo-400 font-black uppercase tracking-wider block">Future Savings</span>
                  <p className="text-lg font-black text-[#7a78fa] mt-1">
                    ₹{finalComputedSavings.FutureValue.toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

              {/* Chart Visualizer Area (Recharts) */}
              <div className="h-64 w-full bg-zinc-950/60 rounded-2xl p-4 border border-zinc-900/60 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                    Projection Runway Timeline
                  </span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">
                    Compounded Annually
                  </span>
                </div>

                <div className="w-full h-full flex-1 min-h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={savingsProjectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorFv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5f5df5" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#5f5df5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#a1a1aa" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="year" 
                        stroke="#71717a" 
                        fontSize={9} 
                        tickLine={false} 
                      />
                      <YAxis 
                        stroke="#71717a" 
                        fontSize={9} 
                        tickLine={false}
                        tickFormatter={(v) => `₹${Math.round(v/1000)}k`} 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px" }}
                        labelStyle={{ color: "#a1a1aa", fontSize: "10px", fontWeight: "bold" }}
                        itemStyle={{ fontSize: "11px" }}
                        formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`]}
                      />
                      <Area 
                        name="Future Capital" 
                        type="monotone" 
                        dataKey="FutureValue" 
                        stroke="#5f5df5" 
                        strokeWidth={2.5} 
                        fillOpacity={1} 
                        fill="url(#colorFv)" 
                      />
                      <Area 
                        name="Invested Cash" 
                        type="monotone" 
                        dataKey="TotalInvested" 
                        stroke="#71717a" 
                        strokeWidth={1.5} 
                        fillOpacity={1} 
                        fill="url(#colorInvested)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action and feedback */}
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-2xl border border-emerald-950/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-900/30">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">Compound Arbitrage unlocked</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      Starting with ₹{inputPrincipal.toLocaleString()} and adding ₹{inputMonthlySavings.toLocaleString()} monthly for {inputYears} years results in additional savings.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Projection saved to sandbox preferences!")}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-extrabold cursor-pointer border border-zinc-800"
                >
                  Save Strategy
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==============================================
            TAB 3: HELP CENTER WITH KEY CATEGORIES SEARCH
            ============================================== */}
        {activeTab === "help" && (
          <motion.div
            key="tab-help"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            {/* Custom Search bar design */}
            <div className="p-6 bg-zinc-950/80 border border-zinc-900 rounded-3xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#5f5df5]/35 to-transparent" />
              
              <h3 className="text-md font-bold text-white uppercase tracking-wider">How can we help?</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Search our interactive directory database instantly</p>
              
              <div className="relative mt-4 w-full max-w-md">
                <input
                  type="text"
                  placeholder="e.g. settings, manual entries, backups, gold value..."
                  value={helpSearchQuery}
                  onChange={(e) => setHelpSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#5f5df5] transition-colors"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Filtered items list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHelpArticles.map((art, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-zinc-950/40 hover:bg-zinc-950/70 border border-zinc-900 hover:border-zinc-800 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-[9px] tracking-wider uppercase mb-2">
                    <Bookmark className="w-3.5 h-3.5 text-[#5f5df5]" />
                    <span>{art.category}</span>
                  </div>
                  <h4 className="text-sm font-black text-white">{art.title}</h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans font-light">
                    {art.desc}
                  </p>
                  
                  <button
                    onClick={() => showToast(`Opening documentation: "${art.title}"`)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-[#7a78fa] hover:text-[#5f5df5] font-bold tracking-wider uppercase"
                  >
                    <span>Read Full Document</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {filteredHelpArticles.length === 0 && (
                <div className="p-8 text-center bg-zinc-950 rounded-2xl border border-zinc-900 col-span-2">
                  <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-xs text-zinc-500 font-semibold uppercase">No matching articles found</p>
                  <p className="text-[11px] text-zinc-600 mt-1">Try testing other generic keywords such as 'reminders' or 'budgets'</p>
                </div>
              )}
            </div>

            {/* Quick action checklist summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
              {[
                "Getting Started",
                "Transactions",
                "Setting Budgets",
                "Investments",
                "Reminders",
                "Configurations"
              ].map((act, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setHelpSearchQuery(act);
                    showToast(`Quick filter: ${act}`);
                  }}
                  className="p-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-[10px] font-bold text-zinc-400 hover:text-white border border-zinc-900 text-center cursor-pointer select-none"
                >
                  {act}
                </button>
              ))}
            </div>

          </motion.div>
        )}

        {/* ==============================================
            TAB 4: FAQS (Accordion List layout)
            ============================================== */}
        {activeTab === "faqs" && (
          <motion.div
            key="tab-faqs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="mb-6 text-center">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">Clear Answers</span>
              <h3 className="text-lg font-black text-white mt-1">Frequently Answered Questions</h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-zinc-200 hover:text-white cursor-pointer select-none"
                    >
                      <span className="text-xs sm:text-sm font-bold leading-snug">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#5f5df5] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-5 pt-0 text-xs text-zinc-400 border-t border-zinc-950 leading-relaxed font-sans font-light">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==============================================
            TAB 5: RELEASE NOTES (SaaS Timeline format)
            ============================================== */}
        {activeTab === "notes" && (
          <motion.div
            key="tab-notes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="border-l-[1.5px] border-zinc-800 space-y-10 pl-6 relative ml-4 py-4">
              
              {releases.map((rel, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-[2px] border-indigo-500 scale-110 group-hover:bg-[#5f5df5] transition-colors" />

                  {/* Date and Version header */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black text-[#7a78fa] bg-[#5f5df5]/10 border border-[#5f5df5]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {rel.version}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-bold uppercase">{rel.date}</span>
                  </div>

                  {/* Notes Card */}
                  <div className="mt-4 p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
                    <h4 className="text-sm font-black text-white leading-tight">{rel.title}</h4>
                    <ul className="mt-4 space-y-2 text-xs text-zinc-400 font-sans font-light leading-relaxed">
                      {rel.notes.map((note, noteIdx) => (
                        <li key={noteIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}

            </div>
          </motion.div>
        )}

        {/* ==============================================
            TAB 6: DEDICATED SUPPORT DESK
            ============================================== */}
        {activeTab === "support" && (
          <motion.div
            key="tab-support"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto"
          >
            {/* Left Col: Contact Info Cards (5 cols) */}
            <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
                  <div className="p-2.5 bg-[#5f5df5]/10 text-[#5f5df5] border border-indigo-950 rounded-xl w-max mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Direct Email Desk</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Drop our developer sandbox hub a note. We typically answer technical queries inside 4 hours.
                  </p>
                  <span className="text-xs font-extrabold text-[#7a78fa] block mt-3">
                    support@fintrack-sandbox.in
                  </span>
                </div>

                <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-950 rounded-xl w-max mb-3">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Submit Quick Ticket</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Write feature suggestions, sandbox bug logs, or typography customisations requests.
                  </p>
                </div>
              </div>

              {/* Status footer */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Support Service: 100% ONLINE
              </div>

            </div>

            {/* Right Col: Support Ticket Form (7 cols) */}
            <div className="md:col-span-7 bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6">
              <h3 className="text-md font-bold text-white uppercase tracking-wider mb-1">Create Support Ticket</h3>
              <p className="text-xs text-zinc-500 mb-5">Fill our secure routing form below:</p>

              <form onSubmit={handleSubmitSupport} className="space-y-4 text-left">
                
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanjay Ramaswamy"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5f5df5] transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sanjay@example.com"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5f5df5] transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-1.5">
                    Ticket Classification
                  </label>
                  <select
                    value={supportType}
                    onChange={(e) => setSupportType(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5f5df5] transition-colors font-semibold"
                  >
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Role/Pricing Query</option>
                    <option>Other Sandbox Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-1.5">
                    Elaborate details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how we can make your FinTrack sandbox cleaner..."
                    value={supportMsg}
                    onChange={(e) => setSupportMsg(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5f5df5] transition-colors font-light leading-relaxed font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={supportSubmitting}
                    className="w-full bg-gradient-to-r from-[#5f5df5] to-[#7a78fa] text-white py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(95,93,245,0.3)] transition-all cursor-pointer select-none active:scale-98"
                  >
                    <span>{supportSubmitting ? "Routing to Support agent..." : "Submit Secured Ticket"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Return back home CTA under resources */}
      <div className="mt-16 text-center py-8 bg-gradient-to-t from-[#5f5df5]/5 to-transparent rounded-2xl border border-zinc-900/40 p-6 max-w-xl mx-auto flex flex-col items-center gap-4">
        <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Explored the FinTrack Knowledge Hub?</p>
        <button
          onClick={() => {
            onBackHome();
            showToast("Returned to Overview Dashboard");
          }}
          className="py-3 px-8 rounded-xl bg-[#5f5df5] hover:bg-[#7a78fa] text-xs font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-[0_0_20px_rgba(95,93,245,0.4)]"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Return Back Home
        </button>
      </div>

    </div>
  );
}
