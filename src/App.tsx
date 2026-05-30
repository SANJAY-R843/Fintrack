/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  HoverInteractiveText,
  NeonHighlightHeader,
  GlowSegmentedControl,
  BentoSelectCard,
  CyberDock
} from "./components/InteractiveCustomizer";
import PricingSection from "./components/PricingSection";
import ResourcesSection from "./components/ResourcesSection";
import LoginSection from "./components/LoginSection";
import { 
  ChevronDown, 
  ArrowRight, 
  Check, 
  PieChart, 
  ShieldCheck, 
  Cloud, 
  Users, 
  CreditCard, 
  BarChart3, 
  Lock,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
  HelpCircle,
  BookOpen,
  LineChart,
  Target,
  FileCheck,
  Plus,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRightLeft,
  Calendar,
  Wallet,
  Coins,
  RefreshCw,
  Sliders,
  DollarSign,
  Activity,
  Award,
  ArrowLeft,
  Calculator,
  MessageSquare
} from "lucide-react";

// Types corresponding to specifications
interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Budget {
  category: string;
  limit: number;
  spent: number;
}

interface Investment {
  id: string;
  name: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
  type: 'Stocks' | 'Mutual Funds' | 'Gold';
}

interface BillReminder {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: string;
  category: string;
  status: 'Unpaid' | 'Paid';
}

// Micro-counter animation helper for statistics row
interface FintechStatUnitProps {
  label: string;
  targetValue?: number;
  valueString?: string;
  suffix?: string;
  prefix?: string;
}

function FintechStatUnit({ label, targetValue, valueString, suffix = "", prefix = "" }: FintechStatUnitProps) {
  const [val, setVal] = useState(0);
  
  useEffect(() => {
    if (targetValue === undefined) return;
    let current = 0;
    const step = targetValue / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= targetValue) {
        setVal(targetValue);
        clearInterval(interval);
      } else {
        setVal(parseFloat(current.toFixed(2))); // preserve decimals elegantly
      }
    }, 25);
    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-zinc-950/70 rounded-xl border border-zinc-900 hover:border-[#5f5df5]/40 hover:bg-zinc-950/90 transition-all duration-300 text-center group">
      <span className="text-xl md:text-2xl font-black text-white group-hover:text-[#7a78fa] transition-colors filter group-hover:drop-shadow-[0_0_10px_rgba(95,93,245,0.35)]">
        {valueString ? valueString : `${prefix}${val}${suffix}`}
      </span>
      <span className="text-[10px] md:text-[11px] font-bold text-zinc-500 tracking-widest uppercase mt-1.5 group-hover:text-zinc-400 transition-colors">
        {label}
      </span>
    </div>
  );
}

export default function App() {
  // Navigation active states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<string>("home"); // "home" | "expense" | "budget" | "investment" | "reminders"
  const [resourceActiveTab, setResourceActiveTab] = useState<string>("guides");
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>("Free");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extraordinary UI customisation states
  const [typographyMood, setTypographyMood] = useState<"tech" | "lux" | "retro" | "default">("default");
  const [navTheme, setNavTheme] = useState<"standard" | "cyberdock">("standard");

  // Dynamic Typography style resolution Helper
  const getHeadlineFont = () => {
    switch (typographyMood) {
      case "tech": return "font-space tracking-tight text-white";
      case "lux": return "font-serif tracking-normal text-amber-100/95 italic";
      case "retro": return "font-mono tracking-widest text-[#10b981]";
      default: return "font-sans tracking-[-0.03em] font-extrabold text-white";
    }
  };

  // Core reactive data states
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "tx-1", amount: 450, description: "Swiggy Fresh Kitchen", category: "Food & Dining", date: "29 May" },
    { id: "tx-2", amount: 1500, description: "Zudio Clothing Store", category: "Shopping", date: "28 May" },
    { id: "tx-3", amount: 199, description: "Netflix Premium Stream", category: "Entertainment", date: "27 May" },
    { id: "tx-4", amount: 120, description: "Uber Auto Ride", category: "Transport", date: "25 May" },
    { id: "tx-5", amount: 999, description: "Jio Fiber Postpaid Broadband", category: "Bills", date: "22 May" },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { category: "Food & Dining", limit: 5000, spent: 3200 },
    { category: "Shopping", limit: 3000, spent: 1500 },
    { category: "Transport", limit: 2000, spent: 750 },
    { category: "Entertainment", limit: 2000, spent: 199 },
    { category: "Bills", limit: 6000, spent: 999 },
  ]);

  const [investments, setInvestments] = useState<Investment[]>([
    { id: "inv-1", name: "Reliance Industries", shares: 10, buyPrice: 2400, currentPrice: 2650, type: "Stocks" },
    { id: "inv-2", name: "HDFC Mutual Fund", shares: 50, buyPrice: 120, currentPrice: 155, type: "Mutual Funds" },
    { id: "inv-3", name: "Sovereign Gold Bond", shares: 2, buyPrice: 5500, currentPrice: 6200, type: "Gold" },
  ]);

  const [billReminders, setBillReminders] = useState<BillReminder[]>([
    { id: "bill-1", name: "Netflix Stream Subscription", amount: 199, dueDate: "Tomorrow", frequency: "Monthly", category: "Entertainment", status: "Unpaid" },
    { id: "bill-2", name: "Electricity Power Board", amount: 1200, dueDate: "Due in 5 days", frequency: "Monthly", category: "Bills", status: "Unpaid" },
    { id: "bill-3", name: "Jio Fiber Broadband", amount: 999, dueDate: "Due in 10 days", frequency: "Monthly", category: "Bills", status: "Unpaid" },
  ]);

  // Investment filtering timeline simulation (updates mock current rates)
  const [investmentPeriod, setInvestmentPeriod] = useState<string>("All Time");

  // Form input variables
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>("");
  const [newExpenseDesc, setNewExpenseDesc] = useState<string>("");
  
  const [newBudgetLimit, setNewBudgetLimit] = useState<string>("");
  const [newBudgetCategory, setNewBudgetCategory] = useState<string>("Food & Dining");

  const [newInvName, setNewInvName] = useState<string>("");
  const [newInvShares, setNewInvShares] = useState<string>("");
  const [newInvBuyPrice, setNewInvBuyPrice] = useState<string>("");
  const [newInvType, setNewInvType] = useState<'Stocks' | 'Mutual Funds' | 'Gold'>("Stocks");

  const [newBillName, setNewBillName] = useState<string>("");
  const [newBillAmount, setNewBillAmount] = useState<string>("");
  const [newBillCategory, setNewBillCategory] = useState<string>("Entertainment");
  const [newBillDays, setNewBillDays] = useState<string>("5");

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  // -------------------------------------------------------------------------
  // CORE LOGICAL CONNECTORS (Unified Financial Engine)
  // -------------------------------------------------------------------------

  // Auto classification engine & integrated budget deduct/alert workflow
  const addTransactionInline = (amount: number, description: string) => {
    if (!amount || amount <= 0 || !description.trim()) return;

    // A. Automatic spend categorization logic
    let category = "Misc";
    const descLower = description.toLowerCase();
    
    if (descLower.includes("swiggy") || descLower.includes("zomato") || descLower.includes("food") || descLower.includes("pizza") || descLower.includes("burger") || descLower.includes("dining")) {
      category = "Food & Dining";
    } else if (descLower.includes("amazon") || descLower.includes("myntra") || descLower.includes("clothes") || descLower.includes("shopping") || descLower.includes("shirt") || descLower.includes("flipkart")) {
      category = "Shopping";
    } else if (descLower.includes("uber") || descLower.includes("ola") || descLower.includes("auto") || descLower.includes("cab") || descLower.includes("metro") || descLower.includes("transport") || descLower.includes("petrol")) {
      category = "Transport";
    } else if (descLower.includes("netflix") || descLower.includes("spotify") || descLower.includes("show") || descLower.includes("movie") || descLower.includes("entertainment") || descLower.includes("hotstar")) {
      category = "Entertainment";
    } else if (descLower.includes("electricity") || descLower.includes("jio") || descLower.includes("broadband") || descLower.includes("fiber") || descLower.includes("bill") || descLower.includes("wifi") || descLower.includes("postpaid")) {
      category = "Bills";
    }

    // B. Build the unified transaction record
    const newTx: Transaction = {
      id: "tx-" + Math.random().toString(36).substring(2, 9),
      amount,
      description: description.trim(),
      category,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    };

    setTransactions(prev => [newTx, ...prev]);

    // C. Cascade subtraction to appropriate budget & trigger alerts
    setBudgets(prev => prev.map(b => {
      if (b.category === category) {
        const updatedSpent = b.spent + amount;
        const pct = (updatedSpent / b.limit) * 100;
        
        // Dynamic notification tier based on specs
        if (updatedSpent > b.limit) {
          showToast(`🚨 ALERT: Exceeded budget limit for ${category}! Cap: ₹${b.limit}`);
        } else if (pct >= 90) {
          showToast(`⚠️ WARNING: Critical limit! Used 90% of your ${category} Budget.`);
        } else if (pct >= 75) {
          showToast(`⚠️ Alert: Entered caution zone! Used 75% of ${category} Budget.`);
        } else if (pct >= 50) {
          showToast(`💡 Info: Halfway check. Used 50% of your ${category} Budget.`);
        }
        return { ...b, spent: updatedSpent };
      }
      return b;
    }));

    showToast(`✅ Added ${description} (₹${amount}) sorted into "${category}" category.`);
  };

  // Connected billing processor
  const payBill = (bill: BillReminder) => {
    // 1. Instantly toggle Status to Paid
    setBillReminders(prev => prev.map(b => b.id === bill.id ? { ...b, status: "Paid" } : b));
    
    // 2. Automatically generate matching transaction (cascades automatically to update budgets & reports)
    addTransactionInline(bill.amount, `Paid ${bill.name}`);

    // 3. Automatically schedule subsequent recurring month due date (recurring automation)
    setTimeout(() => {
      setBillReminders(prev => prev.map(b => {
        if (b.id === bill.id) {
          return {
            ...b,
            status: "Unpaid",
            dueDate: "Due in 30 Days"
          };
        }
        return b;
      }));
      showToast(`🔄 Recurring Engine: Scheduled next renewal for ${bill.name}.`);
    }, 4000);

    showToast(`💸 Bill Payment Executed: Transferred ₹${bill.amount} to ${bill.name}.`);
  };

  // -------------------------------------------------------------------------
  // MOCK CALCULATED METRICS
  // -------------------------------------------------------------------------
  const totalMonthlySpend = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const spendByCategory = useMemo(() => {
    const categoriesMap: Record<string, number> = {};
    transactions.forEach(t => {
      categoriesMap[t.category] = (categoriesMap[t.category] || 0) + t.amount;
    });
    return categoriesMap;
  }, [transactions]);

  const maxCategoryMetric = useMemo(() => {
    const entries = Object.entries(spendByCategory);
    if (entries.length === 0) return { category: "None", val: 0 };
    const sorted = [...entries].sort((a, b) => (b[1] as number) - (a[1] as number));
    return {
      category: sorted[0][0],
      val: sorted[0][1] as number
    };
  }, [spendByCategory]);

  const investmentsMetrics = useMemo(() => {
    // Modify current prices simulate depending on timeline selector to showcase high visual fidelity
    let factor = 1.0;
    if (investmentPeriod === "1 Week") factor = 0.96;
    if (investmentPeriod === "1 Month") factor = 1.02;
    if (investmentPeriod === "3 Months") factor = 1.08;
    if (investmentPeriod === "1 Year") factor = 1.15;
    if (investmentPeriod === "All Time") factor = 1.0; // standard mock values

    let totalInvested = 0;
    let totalCurrent = 0;
    
    const simulatedList = investments.map(inv => {
      const buyVal = inv.shares * inv.buyPrice;
      const currentVal = inv.shares * (inv.currentPrice * factor);
      totalInvested += buyVal;
      totalCurrent += currentVal;

      return {
        ...inv,
        buyVal,
        currentVal,
        profit: currentVal - buyVal,
        percentage: ((currentVal - buyVal) / buyVal) * 100
      };
    });

    const profitLoss = totalCurrent - totalInvested;
    const bestAsset = [...simulatedList].sort((a,b) => b.percentage - a.percentage)[0];
    const worstAsset = [...simulatedList].sort((a,b) => a.percentage - b.percentage)[0];

    return {
      list: simulatedList,
      totalInvested,
      totalCurrent,
      profitLoss,
      growthPercent: ((totalCurrent - totalInvested) / totalInvested) * 100,
      bestAsset: bestAsset ? `${bestAsset.name} (${bestAsset.percentage.toFixed(1)}%)` : "N/A",
      worstAsset: worstAsset ? `${worstAsset.name} (${worstAsset.percentage.toFixed(1)}%)` : "N/A"
    };
  }, [investments, investmentPeriod]);

  // Form submit handlers
  const handleAddCustomExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newExpenseAmount);
    if (!parsedAmount || parsedAmount <= 0) {
      showToast("❌ Enter a valid cost amount.");
      return;
    }
    if (!newExpenseDesc.trim()) {
      showToast("❌ Specify a brief expenditure description.");
      return;
    }
    addTransactionInline(parsedAmount, newExpenseDesc);
    setNewExpenseAmount("");
    setNewExpenseDesc("");
  };

  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = parseFloat(newBudgetLimit);
    if (!limit || limit <= 0) {
      showToast("❌ Budget limit must be positive.");
      return;
    }
    
    // Check if category already has budget
    const exists = budgets.some(b => b.category.toLowerCase() === newBudgetCategory.toLowerCase());
    if (exists) {
      setBudgets(prev => prev.map(b => b.category === newBudgetCategory ? { ...b, limit } : b));
      showToast(`🔄 Adjusted ${newBudgetCategory} budget cap to ₹${limit}.`);
    } else {
      setBudgets(prev => [...prev, { category: newBudgetCategory, limit, spent: 0 }]);
      showToast(`✨ Opened initial ${newBudgetCategory} budget for up to ₹${limit}.`);
    }
    setNewBudgetLimit("");
  };

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    const shares = parseFloat(newInvShares);
    const buyPrice = parseFloat(newInvBuyPrice);
    if (!newInvName.trim() || !shares || shares <= 0 || !buyPrice || buyPrice <= 0) {
      showToast("❌ Complete all investment parameters accurately.");
      return;
    }

    const newInv: Investment = {
      id: "inv-" + Math.random().toString(36).substring(2, 9),
      name: newInvName.trim(),
      shares,
      buyPrice,
      currentPrice: buyPrice * 1.1, // mock starting standard
      type: newInvType
    };

    setInvestments(prev => [...prev, newInv]);
    showToast(`📈 Ported ${newInv.name} (${shares} Shares) to your monitored holdings.`);
    setNewInvName("");
    setNewInvShares("");
    setNewInvBuyPrice("");
  };

  const handleAddNewBill = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newBillAmount);
    if (!newBillName.trim() || !amount || amount <= 0) {
      showToast("❌ Enter descriptive name and budget amount.");
      return;
    }

    const days = parseInt(newBillDays) || 5;
    const dueString = days === 0 ? "Due Today" : days === 1 ? "Due Tomorrow" : `Due in ${days} days`;

    const newBill: BillReminder = {
      id: "bill-" + Math.random().toString(36).substring(2, 9),
      name: newBillName.trim(),
      amount,
      dueDate: dueString,
      frequency: "Monthly",
      category: newBillCategory,
      status: "Unpaid"
    };

    setBillReminders(prev => [...prev, newBill]);
    showToast(`⏰ Registered ${newBill.name} recurring bill alert.`);
    setNewBillName("");
    setNewBillAmount("");
    setNewBillDays("5");
  };

  // Navigations Lists
  const featuresMenu = [
    { title: "Expense Tracking", key: "expense", desc: "Automate spend categorization", icon: LineChart },
    { title: "Smart Budgets", key: "budget", desc: "Set dynamically adjusting limits", icon: Target },
    { title: "Investment Monitor", key: "investment", desc: "Track asset growth in real-time", icon: BarChart3 },
    { title: "Bill Reminders", key: "reminders", desc: "Never miss a due date again", icon: FileCheck },
  ];

  const whyFinTrackMenu = [
    { title: "Indian Market Optimization", desc: "Customized for ₹ transactions & tax rules", icon: Sparkles },
    { title: "Bank-Grade Encryption", desc: "Your financial details are absolutely isolated", icon: ShieldCheck },
    { title: "Offline Privacy", desc: "Store your data entirely on your device", icon: Lock },
  ];

  const resourcesMenu = [
    { title: "Financial Guides", key: "guides", desc: "Educational articles and academy learning progress", icon: BookOpen },
    { title: "Savings Calculator", key: "calculator", desc: "Interactive future compound savings calculator & graph", icon: Calculator },
    { title: "Help Center", key: "help", desc: "Step-by-step guides and documentation database", icon: HelpCircle },
    { title: "FAQs", key: "faqs", desc: "Frequently answered questions and accordion details", icon: HelpCircle },
    { title: "Release Notes", key: "notes", desc: "Chronological SaaS feature release updates roadmap", icon: Sparkles },
    { title: "Contact Support", key: "support", desc: "Submit tickets and report sandbox issues", icon: MessageSquare },
  ];

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-hidden pb-24 transition-all duration-300 ${
      typographyMood === "tech" ? "font-space" : 
      typographyMood === "lux" ? "font-serif" : 
      typographyMood === "retro" ? "font-mono" : 
      "font-sans"
    }`}>
      {/* Background Vetra Style glowing warm horizon curve */}
      <div className="vetra-horizon-glow" />
      <div className="vetra-horizon-arc" />

      {/* Side Glowing Ambient lights - Indigo and Violet color stacks */}
      <div className="absolute top-[-5%] left-[-10%] w-[45%] h-[40%] rounded-full bg-[#5f5df5]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[#7a78fa]/5 blur-[150px] pointer-events-none" />

      {/* Main Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-zinc-950 border border-[#5f5df5]/20 text-zinc-100 px-5 py-3 rounded-xl shadow-[0_0_30px_rgba(95,93,245,0.15)] backdrop-blur-md max-w-md w-[90%] sm:w-auto"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#5f5df5] animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* =========================================================================
            HEADER / NAVIGATION SECTION (Indigo/violet glow styles)
            ========================================================================= */}
        {activeFeature !== "why-fintrack" && activeFeature !== "pricing" && (
          <header className="py-6 relative z-30">
            <div className="flex items-center justify-between">
              {/* Logo and Tagline group with custom bottom bar below the logo alone */}
              <div className="relative pb-2 group">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setActiveFeature("home");
                    showToast("FinTrack: Personalized Connected Smart Finance");
                  }}
                >
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-10 h-10 text-[#5f5df5] transition-all duration-300 group-hover:scale-105 active:scale-95 group-hover:text-[#7a78fa] filter drop-shadow-[0_0_8px_rgba(95,93,245,0.3)]"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer Vetra-style circle */}
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4.5" />
                    
                    {/* Inner layered circular sketches to mimic hand-drawn organic feel of your photo logo */}
                    <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="2.5" strokeDasharray="35 8 20 12" className="opacity-90" />
                    <circle cx="49.5" cy="50.5" r="21.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="10 5 30 10" className="opacity-60" />
                    <path d="M 32 46 C 30 52, 35 60, 48 64" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" strokeLinecap="round" />
                    
                    {/* Inside graph connector line and nodes */}
                    <path 
                      d="M 43 53 Q 48 53 51 57 T 60 41" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <circle cx="43" cy="53" r="5" fill="currentColor" />
                    <circle cx="60" cy="41" r="5" fill="currentColor" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl tracking-tight text-white group-hover:text-[#7a78fa] transition-colors uppercase font-sans">
                      FinTrack
                    </span>
                    <span className="text-[9px] text-zinc-500 tracking-wider font-extrabold uppercase mt-[-1px]">
                      Personal Finance Manager
                    </span>
                  </div>
                </div>
                {/* Premium indicator line right below the FinTrack Logo metadata group alone */}
                <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#5f5df5] via-[#7a78fa] to-transparent rounded-full" />
              </div>

              {/* Desktop Navigation Link Toggles */}
              <nav className="hidden md:flex items-center gap-7 relative select-none">
                
                {/* Features Trigger Link */}
                <button 
                  onClick={() => {
                    setActiveFeature("expense"); // Directly navigates to the first core feature workspace
                    setActiveDropdown(null);
                    showToast("Unified Multi-Feature Workspace Activated");
                  }}
                  className={`text-sm font-semibold transition-all duration-200 py-2 cursor-pointer ${
                    activeFeature === "expense" || activeFeature === "budget" || activeFeature === "investment" || activeFeature === "reminders" || activeFeature === "home"
                      ? "text-[#5f5df5] font-black border-b-2 border-[#5f5df5]" 
                      : "text-zinc-300 hover:text-[#5f5df5]"
                  }`}
                >
                  Features
                </button>

                {/* Why FinTrack Trigger */}
                <button 
                  onClick={() => {
                    setActiveFeature("why-fintrack");
                    setActiveDropdown(null);
                    showToast("🎯 Built for India. Designed for privacy. Secured for the future.");
                  }}
                  className={`text-sm font-semibold transition-all duration-200 py-2 cursor-pointer ${activeFeature === "why-fintrack" ? "text-[#5f5df5] font-black border-b-2 border-[#5f5df5]" : "text-zinc-300 hover:text-[#5f5df5]"}`}
                >
                  Why FinTrack
                </button>

                {/* Pricing Trigger */}
                <button 
                  onClick={() => {
                    setActiveFeature("pricing");
                    setActiveDropdown(null);
                    showToast("Secured Sandbox Billing Module Loaded");
                  }}
                  className={`text-sm font-semibold transition-all duration-200 py-2 cursor-pointer ${activeFeature === "pricing" ? "text-[#5f5df5] font-black border-b-2 border-[#5f5df5]" : "text-zinc-300 hover:text-[#5f5df5]"}`}
                >
                  Pricing
                </button>

                {/* Resources Trigger Link */}
                <button 
                  onClick={() => {
                    setActiveFeature("resources");
                    setActiveDropdown(null);
                    showToast("FinTrack Knowledge Hub Loaded");
                  }}
                  className={`text-sm font-semibold transition-all duration-200 py-2 cursor-pointer ${activeFeature === "resources" ? "text-[#5f5df5] font-black border-b-2 border-[#5f5df5]" : "text-zinc-300 hover:text-[#5f5df5]"}`}
                >
                  Resources
                </button>

              </nav>

              {/* Right Header Action Button in Warm Orange Glow */}
              <div className="flex items-center gap-5">
                {currentPlan !== "Free" ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      currentPlan === "Pro" 
                        ? "bg-[#5f5df5]/10 text-[#7a78fa] border border-[#5f5df5]/30 shadow-[0_0_15px_rgba(95,93,245,0.25)]" 
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-current" />
                    <span>★ {currentPlan} Tier</span>
                  </motion.div>
                ) : (
                  <button 
                    onClick={() => {
                      setActiveFeature("pricing");
                      showToast("Upgrade sandbox features details below.");
                    }}
                    className="text-xs font-bold text-zinc-400 hover:text-indigo-400 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Go Premium
                  </button>
                )}
                
                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[10px] font-black text-white/90 leading-tight uppercase tracking-wider">{currentUser.email.split('@')[0]}</span>
                      <span className="text-[9px] text-[#7a78fa] font-bold uppercase tracking-widest">{currentPlan} Member</span>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentUser(null);
                        showToast("Successfully logged out from secure session.");
                      }}
                      className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg text-[10px] font-bold border border-zinc-900 transition-all cursor-pointer animate-fade-in"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setActiveFeature("login");
                      showToast("Loaded secure Sandbox Authenticator workspace");
                    }}
                    className={`text-sm font-semibold transition-all cursor-pointer active:scale-95 ${activeFeature === "login" ? "text-[#5f5df5] font-black" : "text-zinc-300 hover:text-white"}`}
                  >
                    Log in
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    setActiveFeature("expense");
                    showToast("Welcome! Sandbox workspace loaded with default items.");
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#5f5df5] sm:text-sm text-xs font-bold text-white hover:bg-[#7a78fa] hover:shadow-[0_0_20px_rgba(95,93,245,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  Get started
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Dynamic header tabs for ease of switching between the feature pages directly on the main viewport */}
        {activeFeature !== "why-fintrack" && activeFeature !== "pricing" && activeFeature !== "resources" && activeFeature !== "login" && (
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 bg-zinc-950/40 p-1 rounded-xl border border-zinc-900 w-full sm:w-max mx-auto md:mx-0">
            <button 
              onClick={() => setActiveFeature("home")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeFeature === "home" ? "bg-[#5f5df5] text-white font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveFeature("expense")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeFeature === "expense" ? "bg-[#5f5df5] text-white font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Expense Tracking
            </button>
            <button 
              onClick={() => setActiveFeature("budget")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeFeature === "budget" ? "bg-[#5f5df5] text-white font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Smart Budget
            </button>
            <button 
              onClick={() => setActiveFeature("investment")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeFeature === "investment" ? "bg-[#5f5df5] text-white font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Investment Monitor
            </button>
            <button 
              onClick={() => setActiveFeature("reminders")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeFeature === "reminders" ? "bg-[#5f5df5] text-white font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Bill Reminders
            </button>
          </div>
        )}

        {/* =========================================================================
            DYNAMIC VIEWPORTS
            ========================================================================= */}
        <AnimatePresence mode="wait">
          {activeFeature === "home" && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              {/* =========================================================================
                  DEFAULT HERO LANDING VIEW
                  ========================================================================= */}
              <main className="pt-16 pb-16 md:pt-24 md:pb-24 flex flex-col items-start text-left relative z-10 w-full lg:max-w-[58%]">
                
                {/* Micro announcement pill matching Vetra "New version out" styles */}
                <div 
                  className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-[#5f5df5]/10 cursor-pointer text-[11px] font-medium hover:border-[#5f5df5]/30 transition-all hover:translate-y-[-1px]"
                  onClick={() => {
                    setActiveFeature("expense");
                    showToast("Redirected to interactive multi-feature workspace.");
                  }}
                >
                  <span className="text-[#5f5df5] font-bold uppercase tracking-wider text-[9px] bg-[#5f5df5]/10 px-2 py-0.5 rounded-full">New Update</span>
                  <span className="text-zinc-300">Unified interconnected finance engine is live</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5f5df5]" />
                </div>

                {/* Exact Copy Headline */}
                <h1 className={`text-[44px] leading-[1.08] sm:text-[62px] md:text-[76px] lg:text-[84px] font-extrabold tracking-[-0.03em] max-w-4xl text-white transition-all duration-300 ${getHeadlineFont()}`}>
                  <HoverInteractiveText text="Take control of" mood={typographyMood} /> <br />
                  <span className="text-[#5f5df5] bg-gradient-to-r from-[#7a78fa] via-[#5f5df5] to-[#403eef] bg-clip-text text-transparent">
                    your financial future
                  </span>
                </h1>

                {/* Subtitle containing exact copy */}
                <p className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl tracking-normal">
                  Track expenses, set budgets, manage investments <br className="hidden sm:inline" />
                  and achieve your goals — all in one place.
                </p>

                {/* Trust point badges - separated by clean thin vertical lines */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2.5">
                    <PieChart className="w-5 h-5 text-[#5f5df5]" />
                    <span className="text-xs font-semibold text-zinc-200 tracking-wide">Smart Insights</span>
                  </div>
                  
                  <div className="hidden sm:block w-[1px] h-5 bg-zinc-800" />
                  
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#5f5df5]" />
                    <span className="text-xs font-semibold text-zinc-200 tracking-wide">Bank-Level Security</span>
                  </div>
                  
                  <div className="hidden sm:block w-[1px] h-5 bg-zinc-800" />
                  
                  <div className="flex items-center gap-2.5">
                    <Cloud className="w-5 h-5 text-[#5f5df5]" />
                    <span className="text-xs font-semibold text-zinc-200 tracking-wide">Secure & Private</span>
                  </div>
                </div>

                {/* Main CTA interactive row (blue/indigo aligned) */}
                <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveFeature("expense");
                      showToast("Connected! Try adding expenses below to see real-time updates.");
                    }}
                    className="group py-4 px-7 rounded-xl bg-[#5f5df5] hover:bg-[#7a78fa] text-sm md:text-base font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_25px_rgba(95,93,245,0.45)] cursor-pointer active:scale-98"
                  >
                    Get started for free
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveFeature("expense");
                      showToast("Loaded features workspace. Browse individual tabs!");
                    }}
                    className="py-4 px-7 rounded-xl bg-transparent border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/40 text-sm md:text-base font-semibold text-zinc-200 active:scale-98 cursor-pointer transition-all duration-200 flex items-center justify-center"
                  >
                    Explore features
                  </button>
                </div>

                {/* Safe Check Status Row directly under CTA */}
                <div className="mt-4 flex items-center gap-2 text-zinc-500 text-xs sm:text-xs font-medium pl-1">
                  <div className="w-4 h-4 rounded-full bg-indigo-950/40 flex items-center justify-center border border-indigo-900/60">
                    <Check className="w-3.5 h-3.5 text-[#5f5df5]" strokeWidth={3} />
                  </div>
                  <span>No credit card required &bull; Cancel anytime</span>
                </div>

              </main>

              {/* =========================================================================
                  PROMINENT STATISTICS PANEL - Indigo Glow style
                  ========================================================================= */}
              <section className="mb-8">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/25 p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-[20%] w-[40%] h-[1.5px] bg-gradient-to-r from-transparent via-[#5f5df5]/40 to-transparent group-hover:via-[#5f5df5]/80 transition-all duration-500" />

                  {/* Column 1: Happy Users */}
                  <div className="flex items-center gap-5 md:px-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#5f5df5] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold text-white tracking-tight">50K+</span>
                      <span className="text-xs font-medium text-zinc-500 mt-0.5">Happy Users</span>
                    </div>
                  </div>

                  {/* Vertical Divider 1 */}
                  <div className="hidden lg:block w-[1px] h-10 bg-zinc-900/60 self-center" />

                  {/* Column 2: Transactions Tracked */}
                  <div className="flex items-center gap-4 md:px-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#5f5df5] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold text-white tracking-tight">₹500Cr+</span>
                      <span className="text-xs font-medium text-zinc-500 mt-0.5">Transactions Tracked</span>
                    </div>
                  </div>

                  {/* Vertical Divider 2 */}
                  <div className="hidden lg:block w-[1px] h-10 bg-zinc-900/60 self-center" />

                  {/* Column 3: Data Accuracy */}
                  <div className="flex items-center gap-4 md:px-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#5f5df5] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold text-white tracking-tight">98%</span>
                      <span className="text-xs font-medium text-zinc-500 mt-0.5">Data Accuracy</span>
                    </div>
                  </div>

                  {/* Vertical Divider 3 */}
                  <div className="hidden lg:block w-[1px] h-10 bg-zinc-900/60 self-center" />

                  {/* Column 4: Security rating */}
                  <div className="flex items-center gap-4 md:px-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#5f5df5] flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold text-white tracking-tight">100%</span>
                      <span className="text-xs font-medium text-zinc-500 mt-0.5">Secure & Encrypted</span>
                    </div>
                  </div>

                </div>
              </section>


            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT: WHY FINTRACK PHILOSOPHY (Option 2 Alternating Bento Layout)
              ========================================================================= */}
          {activeFeature === "why-fintrack" && (
            <motion.div
              key="view-why-fintrack"
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 w-full relative z-30"
            >
              {/* Top Back-To-Home Control Bar */}
              <div className="max-w-5xl mx-auto px-2 pt-2 flex justify-start">
                <button
                  onClick={() => {
                    setActiveFeature("home");
                    showToast("Returned to Overview Dashboard");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-[#5f5df5]/40 text-xs font-bold text-zinc-300 hover:text-[#7a78fa] hover:shadow-[0_0_15px_rgba(95,93,245,0.15)] transition-all cursor-pointer group active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-[#5f5df5] group-hover:translate-x-[-3px] transition-transform" />
                  <span>Return Back Home</span>
                </button>
              </div>

              {/* Outer Glow Header Container */}
              <div className="text-center py-10 md:py-16 max-w-3xl mx-auto flex flex-col items-center">
                {/* Micro badge indicator */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5f5df5]/10 border border-[#5f5df5]/20 text-[11px] font-bold text-[#7a78fa] tracking-wider uppercase">
                  <Award className="w-4 h-4 text-[#5f5df5]" />
                  <span>Value Philosophy</span>
                </div>

                <h1 className={`text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white ${getHeadlineFont()}`}>
                  Why Choose FinTrack?
                </h1>
                
                <p className="mt-6 text-zinc-300 text-sm sm:text-base md:text-lg font-medium tracking-normal leading-relaxed text-zinc-300">
                  Built for modern Indian consumers who demand security, privacy, and complete control over their finances.
                </p>

                {/* Fintech slogan quote block */}
                <div className="mt-8 px-6 py-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl shadow-lg inline-block">
                  <p className="text-xs sm:text-sm font-bold tracking-widest text-[#7a78fa] uppercase">
                    &ldquo;Built for India. Designed for privacy. Secured for the future.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bento Grid layout for Option 2: Indian optimization + security + offline cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-4 px-2">
                
                {/* CARD 1: Indian Market Optimization 🇮🇳 (Large Featured Card, spans 2 cols on md) */}
                <motion.div
                  className="group relative md:col-span-2 overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/25 p-6 md:p-8 hover:bg-zinc-905/80 hover:border-[#5f5df5]/60 hover:shadow-[0_0_40px_rgba(95,93,245,0.18)] transition-all duration-300 ease-out cursor-pointer"
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Subtle decorative inner corner highlight line */}
                  <div className="absolute top-0 right-[15%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#5f5df5]/40 to-transparent group-hover:via-[#5f5df5]/80 transition-all duration-300" />
                  
                  <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    {/* Visual Badge Emoji */}
                    <div className="w-16 h-16 rounded-2xl bg-zinc-950/90 border border-zinc-900 flex items-center justify-center text-4xl group-hover:scale-125 transition-all duration-300 shadow-md flex-shrink-0 self-start md:self-center">
                      🇮🇳
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-900/50">Core Differentiator</span>
                        <span className="text-zinc-600 font-medium text-[11px]">&bull; INR-Native Engine</span>
                      </div>
                      
                      <h3 className="text-lg md:text-2xl font-extrabold text-white mt-1.5 group-hover:text-indigo-400 transition-colors">
                        Built for the Indian Financial Ecosystem
                      </h3>
                      
                      <p className="text-xs md:text-sm text-zinc-400 mt-2.5 leading-relaxed font-normal">
                        Designed specifically for Indian users with native support for INR transactions, local spending habits, recurring bill structures, and financial workflows. From UPI payments to monthly budgeting patterns, every feature is optimized for how Indians manage money every day.
                      </p>

                      {/* Small checklist highlights */}
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {["INR Native", "UPI Friendly", "India-First Experience"].map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-900 text-[11px] font-semibold text-emerald-400">
                             <span className="text-emerald-400 font-bold">&bull;</span>
                             <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CARD 2: Bank-Grade Encryption 🔒 */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/25 p-6 md:p-8 hover:bg-zinc-905/80 hover:border-[#5f5df5]/60 hover:shadow-[0_0_40px_rgba(95,93,245,0.18)] transition-all duration-300 ease-out cursor-pointer"
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute top-0 right-[25%] w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#5f5df5]/20 to-transparent group-hover:via-[#5f5df5]/60 transition-all duration-300" />
                  
                  <div className="flex flex-col gap-5">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-zinc-950/90 border border-zinc-900 flex items-center justify-center text-3xl group-hover:scale-125 transition-all duration-300 shadow-md self-start">
                      🔒
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-900/50">Security Standard</span>
                      <h3 className="text-lg font-extrabold text-white mt-1.5 group-hover:text-indigo-400 transition-colors">
                        Enterprise-Level Security
                      </h3>
                      
                      <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed font-normal">
                        Your financial information is protected using industry-standard encryption and secure authentication protocols. Every transaction, budget, and investment record is safeguarded with the same security principles trusted by modern financial platforms.
                      </p>

                      {/* Small checklist highlights */}
                      <div className="mt-4 flex flex-col gap-1.5">
                        {["Encrypted Data Storage", "Secure Authentication", "Protected Financial Records"].map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-405">
                             <span className="text-[#5f5df5] font-black">&bull;</span>
                             <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CARD 3: Offline Privacy 🛡️ */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/25 p-6 md:p-8 hover:bg-zinc-905/80 hover:border-[#5f5df5]/60 hover:shadow-[0_0_40px_rgba(95,93,245,0.18)] transition-all duration-300 ease-out cursor-pointer"
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute top-0 right-[25%] w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#5f5df5]/20 to-transparent group-hover:via-[#5f5df5]/60 transition-all duration-300" />
                  
                  <div className="flex flex-col gap-5">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-zinc-950/90 border border-zinc-900 flex items-center justify-center text-3xl group-hover:scale-125 transition-all duration-300 shadow-md self-start">
                      🛡️
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-900/50">Data Sovereignty</span>
                      <h3 className="text-lg font-extrabold text-white mt-1.5 group-hover:text-indigo-400 transition-colors">
                        Privacy That Stays With You
                      </h3>
                      
                      <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed font-normal">
                        Sensitive financial information can be stored locally on your device, ensuring you maintain complete control over your personal data. Your spending history, budgets, and financial records remain private and accessible only to you.
                      </p>

                      {/* Small checklist highlights */}
                      <div className="mt-4 flex flex-col gap-1.5">
                        {["User-Controlled Data", "Local Storage Support", "Privacy First"].map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-405">
                             <span className="text-[#5f5df5] font-black">&bull;</span>
                             <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Stat counters section directly below cards */}
              <div className="max-w-5xl mx-auto mt-12 px-2">
                <div className="border-t border-zinc-900 pt-6 mb-2">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">
                    Fintech Integrity Standards & Security Credentials
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <FintechStatUnit label="256-bit Encryption" targetValue={256} suffix="-bit" />
                  <FintechStatUnit label="99.99% Data Integrity" targetValue={99.99} suffix="%" />
                  <FintechStatUnit label="100% User-Controlled Privacy" targetValue={100} suffix="%" />
                  <FintechStatUnit label="INR-Native Transactions" valueString="INR-Native" />
                </div>
              </div>

              {/* Bottom CTA to return back home directly from the philosophy page */}
              <div className="mt-16 text-center py-10 bg-gradient-to-t from-[#5f5df5]/5 to-transparent rounded-2xl border border-zinc-900/40 p-6 max-w-xl mx-auto flex flex-col items-center gap-4">
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Explored the FinTrack Philosophy?</p>
                <button
                  onClick={() => {
                    setActiveFeature("home");
                    showToast("Returned to Overview Dashboard");
                  }}
                  className="py-3 px-8 rounded-xl bg-[#5f5df5] hover:bg-[#7a78fa] text-xs font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-[0_0_20px_rgba(95,93,245,0.4)]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return Back Home
                </button>
              </div>

            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT: PRICING (Elegant 17% savings Monthly/Yearly details subscription with Indian payment gateways)
              ========================================================================= */}
          {activeFeature === "pricing" && (
            <motion.div
              key="view-pricing"
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 w-full relative z-30"
            >
              <PricingSection
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
                onBackHome={() => {
                  setActiveFeature("home");
                  showToast("Returned to Dashboard Overview");
                }}
                showToast={showToast}
              />
            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT: RESOURCES (Financial Guides, Budgeting, Investment, Savings Calculator, Help, FAQs, Support)
              ========================================================================= */}
          {activeFeature === "resources" && (
            <motion.div
              key="view-resources"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 w-full relative z-30"
            >
              <ResourcesSection
                initialTab={resourceActiveTab}
                onBackHome={() => {
                  setActiveFeature("home");
                  showToast("Returned to Dashboard Overview");
                }}
                showToast={showToast}
              />
            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT: SECURE LOGIN
              ========================================================================= */}
          {activeFeature === "login" && (
            <motion.div
              key="view-login"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 w-full relative z-30"
            >
              <LoginSection
                onLoginSuccess={(email) => {
                  setCurrentUser({ email });
                  setActiveFeature("home");
                }}
                onCancel={() => {
                  setActiveFeature("home");
                  showToast("Authentication canceled.");
                }}
                showToast={showToast}
              />
            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT 1: EXPENSE TRACKING
              ========================================================================= */}
          {activeFeature === "expense" && (
            <motion.div
              key="view-expense"
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 bg-zinc-950/40 rounded-2xl border border-zinc-900 p-6 md:p-8 relative z-30"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Form Column & Overview analytics */}
                <div className="w-full lg:w-[45%] flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-2.5 text-[#5f5df5] font-bold uppercase tracking-wider text-xs mb-1">
                      <Activity className="w-4 h-4" />
                      <span>Financial Module #1</span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">Expense Tracker Console</h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Log, classify, and track expenses. Includes intelligent auto-categorization matching swiching. Give it a test run with typical tags like <span className="text-[#7a78fa]">"Swiggy"</span> or <span className="text-[#7a78fa]">"Uber ride"</span>.
                    </p>
                  </div>
 
                  {/* Add expense form */}
                  <form onSubmit={handleAddCustomExpense} className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 text-zinc-300">
                      <Plus className="w-4 h-4 text-[#5f5df5]" /> Add New Expense
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Amount (INR)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-extrabold">₹</span>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 450"
                            value={newExpenseAmount}
                            onChange={(e) => setNewExpenseAmount(e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded-lg py-2 pl-7 pr-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#5f5df5] transition-all font-semibold"
                          />
                        </div>
                      </div>
 
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Description / Vendor</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Swiggy food order"
                          value={newExpenseDesc}
                          onChange={(e) => setNewExpenseDesc(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#5f5df5] transition-all"
                        />
                      </div>
                    </div>
 
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#5f5df5] hover:bg-[#7a78fa] font-bold text-white text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      Process Transaction
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 bg-black/40 p-2 rounded leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-[#5f5df5] flex-shrink-0" />
                      <span>Auto-Categorization engine checks tags and automatically updates budgets! Try typing <b>"Swiggy"</b> to watch Food budget decrease automatically!</span>
                    </div>
                  </form>
 
                  {/* Summary Metric widgets inside tracker */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900">
                      <span className="text-[10px] font-bold uppercase text-zinc-500">Aggregate Outflow</span>
                      <span className="text-2xl font-extrabold text-white block mt-1">₹{totalMonthlySpend}</span>
                      <span className="text-[9px] text-zinc-400 mt-0.5 block flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#5f5df5]" /> Sorted across {Object.keys(spendByCategory).length} categories
                      </span>
                    </div>
 
                    <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase text-zinc-500">Highest Category spend</span>
                      <span className="text-lg font-bold text-[#7a78fa] mt-1 block truncate">
                        {maxCategoryMetric.category}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-semibold block">
                        Valued: ₹{maxCategoryMetric.val.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
 
                {/* Right Interactive transactions log & chart */}
                <div className="w-full lg:w-[55%] flex flex-col gap-6">
                  {/* Spend Category Visualization Panel */}
                  <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Category Outflow Chart</h3>
                    <div className="flex flex-col gap-3">
                      {budgets.map((b, idx) => {
                        const amtSpent = spendByCategory[b.category] || 0;
                        const pctOfTotal = totalMonthlySpend > 0 ? (amtSpent / totalMonthlySpend) * 100 : 0;
                        return (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-xs font-medium">
                              <span className="text-zinc-300">{b.category}</span>
                              <span className="text-zinc-500">
                                ₹{amtSpent} <span className="text-[10px] text-zinc-600">({pctOfTotal.toFixed(0)}%)</span>
                              </span>
                            </div>
                            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-[#5f5df5] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${pctOfTotal}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
 
                  {/* Transaction log */}
                  <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest">Real-time Transaction History</h3>
                      <span className="text-[10px] py-1 px-2 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 font-semibold">Latest Logs</span>
                    </div>
 
                    <div className="overflow-y-auto max-h-[220px] pr-1 flex flex-col gap-2">
                      <AnimatePresence initial={false}>
                        {transactions.map((tx) => (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 transition-all flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              {/* category indicator colored square */}
                              <div className="w-2.5 h-2.5 rounded bg-[#5f5df5]" />
                              <div className="flex flex-col">
                                <span className="font-extrabold text-zinc-100">{tx.description}</span>
                                <span className="text-[10px] text-zinc-500 mt-0.5">{tx.category} &bull; {tx.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-black text-rose-500">-₹{tx.amount}</span>
                              <button 
                                onClick={() => {
                                  setTransactions(prev => prev.filter(t => t.id !== tx.id));
                                  showToast(`Restored ₹${tx.amount} back to balance.`);
                                }}
                                className="text-zinc-600 hover:text-rose-400 cursor-pointer p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT 2: SMART BUDGETS
              ========================================================================= */}
          {activeFeature === "budget" && (
            <motion.div
              key="view-budget"
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 bg-zinc-950/40 rounded-2xl border border-zinc-900 p-6 md:p-8 relative z-30"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side: configuration form and intelligence model recommendations */}
                <div className="w-full lg:w-[40%] flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-2.5 text-[#5f5df5] font-bold uppercase tracking-wider text-xs mb-1">
                      <Target className="w-4 h-4" />
                      <span>Financial Module #2</span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">Smart Budget Limits</h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Stop overspending using automated limits. Transaction amounts added inside Expense Tracking instantly subtract from these category budget targets in real time.
                    </p>
                  </div>

                  {/* Create budget form */}
                  <form onSubmit={handleCreateBudget} className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#5f5df5]" /> Allocate Budget
                    </h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Target Category</label>
                      <select 
                        value={newBudgetCategory} 
                        onChange={(e) => setNewBudgetCategory(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-sm text-zinc-200 outline-none focus:border-[#5f5df5] transition-all font-semibold"
                      >
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Monthly Maximum (INR)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-black">₹</span>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 5000"
                          value={newBudgetLimit}
                          onChange={(e) => setNewBudgetLimit(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg py-2 pl-7 pr-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#5f5df5] transition-all font-bold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-[#5f5df5] hover:bg-[#7a78fa] font-bold text-white text-xs transition-all active:scale-95 rounded-lg flex items-center justify-center gap-1"
                    >
                      Establish Budget Constraint
                    </button>
                  </form>

                  {/* Smart System History Analysis Suggestions */}
                  <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900">
                    <h3 className="text-[10px] font-extrabold uppercase text-[#5f5df5] tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> AI Historical Budget Assistant
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                      By analyzing spending over previous intervals (<i>Jan: ₹4,000 &bull; Feb: ₹4,500 &bull; Mar: ₹4,800</i>), the system projects optimal limits automatically.
                    </p>
                    <div className="bg-zinc-900/60 p-3.5 rounded-lg border border-zinc-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-300 font-bold">Recommended Food Goal:</span>
                        <span className="text-[#7a78fa] font-bold">₹5,000 / mo</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setBudgets(prev => prev.map(b => b.category === "Food & Dining" ? { ...b, limit: 5000 } : b));
                          showToast("AI Advice Implemented: Set Food Budget to recommended ₹5,000.");
                        }}
                        className="mt-3 w-full py-1.5 rounded bg-black text-[10px] text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#5f5df5]/50 transition-all font-bold cursor-pointer"
                      >
                        Apply AI Suggested limits
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side: visual budget progress elements with warnings */}
                <div className="w-full lg:w-[60%] flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Limit Cards</h3>
                    <span className="text-[11px] text-zinc-500 font-medium">Real-time depletion indicators</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {budgets.map((b, idx) => {
                      const spendRatio = b.spent / b.limit;
                      const spendPercent = Math.min(Math.round(spendRatio * 100), 100);
                      const isOver = b.spent > b.limit;
                      const remaining = b.limit - b.spent;

                      // Choose alert tag depending on percentage of usage
                      let badgeColor = "bg-green-950/40 text-green-400 border-green-900";
                      let warningTag = "Healthy";
                      
                      if (isOver) {
                        badgeColor = "bg-rose-950/60 text-rose-400 border-rose-900 animate-pulse";
                        warningTag = "Exceeded Limit";
                      } else if (spendRatio >= 0.9) {
                        badgeColor = "bg-indigo-950/60 text-indigo-400 border-indigo-900";
                        warningTag = "Critical Status (90% Used)";
                      } else if (spendRatio >= 0.75) {
                        badgeColor = "bg-yellow-950/40 text-yellow-500 border-yellow-900";
                        warningTag = "Caution Area (75% Used)";
                      } else if (spendRatio >= 0.5) {
                        badgeColor = "bg-indigo-950/40 text-zinc-300 border-indigo-900";
                        warningTag = "Moderate Spend (50% Used)";
                      }

                      return (
                        <div key={idx} className="bg-zinc-950/50 p-5 rounded-2xl border border-zinc-900 flex flex-col relative overflow-hidden group">
                          {/* Alert pill */}
                          <div className={`absolute top-4 right-4 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider bg-black ${badgeColor}`}>
                            {warningTag}
                          </div>

                          <span className="text-xs font-bold text-zinc-400 uppercase">{b.category}</span>
                          
                          <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-white">₹{b.spent}</span>
                            <span className="text-xs text-zinc-500">of ₹{b.limit}</span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-1.5 bg-zinc-900 rounded-full mt-4 overflow-hidden">
                            <motion.div 
                              className={`h-full ${isOver ? 'bg-rose-500' : 'bg-[#5f5df5]'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${spendPercent}%` }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>

                          <div className="flex items-center justify-between mt-3 text-[11px]">
                            <span className="text-zinc-500">Used: <b>{spendPercent}%</b></span>
                            <span className={remaining >= 0 ? "text-[#7a78fa] font-bold" : "text-rose-500 font-bold"}>
                              {remaining >= 0 ? `₹${remaining} left` : `₹${Math.abs(remaining)} over`}
                            </span>
                          </div>

                          {/* Quick testing trigger inline */}
                          <button
                            type="button"
                            onClick={() => {
                              addTransactionInline(500, `Quick ${b.category} spend`);
                            }}
                            className="mt-4 w-full py-1.5 rounded bg-zinc-900 text-[10px] text-zinc-400 hover:text-white transition-all hover:bg-zinc-800"
                          >
                            + Simulate ₹500 test swipe
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT 3: INVESTMENT MONITOR
              ========================================================================= */}
          {activeFeature === "investment" && (
            <motion.div
              key="view-investment"
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 bg-zinc-950/40 rounded-2xl border border-zinc-900 p-6 md:p-8 relative z-30"
            >
              <div className="flex flex-col gap-8">
                {/* Header title elements with timeline selector */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 text-[#5f5df5] font-bold uppercase tracking-wider text-xs mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Financial Module #3</span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">Investment Allocation Monitor</h2>
                    <p className="text-xs text-zinc-400 mt-1">Keep watch on active assets, market evaluations, real-time returns and allocations instantly.</p>
                  </div>

                  {/* Interval selector */}
                  <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-900 self-stretch sm:self-auto justify-between">
                    {["1 Week", "1 Month", "3 Months", "1 Year", "All Time"].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInvestmentPeriod(p);
                          showToast(`Adjusted timeline tracking to ${p}. Market values updated.`);
                        }}
                        className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${investmentPeriod === p ? "bg-[#5f5df5] text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top Metrics Bento style Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Portfolio evaluation</span>
                    <span className="text-2xl font-extrabold text-white block mt-1">₹{investmentsMetrics.totalCurrent.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">Live valuation</span>
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Total Capital Invested</span>
                    <span className="text-2xl font-extrabold text-zinc-400 block mt-1">₹{investmentsMetrics.totalInvested.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-zinc-500">Direct purchases cost</span>
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Net Returns Yield</span>
                    <span className={`text-2xl font-extrabold block mt-1 ${investmentsMetrics.profitLoss >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                      {investmentsMetrics.profitLoss >= 0 ? "+" : ""}₹{investmentsMetrics.profitLoss.toLocaleString("en-IN")}
                    </span>
                    <span className={`text-[10px] font-semibold ${investmentsMetrics.profitLoss >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      ({investmentsMetrics.growthPercent >= 0 ? "+" : ""}{investmentsMetrics.growthPercent.toFixed(2)}%)
                    </span>
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Top Performer</span>
                    <span className="text-sm font-extrabold text-emerald-400 block mt-2 truncate">{investmentsMetrics.bestAsset}</span>
                    <span className="text-[10px] text-zinc-500">Highest growth asset</span>
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Gold holding weight</span>
                    <span className="text-sm font-extrabold text-[#7a78fa] block mt-2">2 Grams</span>
                    <span className="text-[10px] text-zinc-500">Safe inflation hedge</span>
                  </div>
                </div>

                {/* Split layout: holding listing + form to buy */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Holdings List log */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Invested Portfolio Summary</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 pb-2">
                              <th className="py-2.5 font-bold">Asset Name</th>
                              <th className="py-2.5 font-bold text-right">Holdings</th>
                              <th className="py-2.5 font-bold text-right font-sans">Bought At</th>
                              <th className="py-2.5 font-bold text-right uppercase">Current Price</th>
                              <th className="py-2.5 font-bold text-right uppercase">Total returns</th>
                              <th className="py-2.5 font-bold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {investmentsMetrics.list.map((inv) => (
                              <tr key={inv.id} className="border-b border-zinc-900 hover:bg-zinc-900/20 text-xs font-medium transition-colors">
                                <td className="py-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#5f5df5]" />
                                    <div>
                                      <span className="text-white block font-bold">{inv.name}</span>
                                      <span className="text-[10px] text-zinc-500">{inv.type}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 text-right">{inv.shares} shares</td>
                                <td className="py-3 text-right text-zinc-400 font-sans">₹{inv.buyPrice}</td>
                                <td className="py-3 text-right text-zinc-200 font-bold">₹{inv.currentPrice.toFixed(0)}</td>
                                <td className={`py-3 text-right font-extrabold ${inv.profit >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                                  ₹{inv.profit.toFixed(0)} <span className="text-[10px] block">({inv.percentage.toFixed(1)}%)</span>
                                </td>
                                <td className="py-3 text-right">
                                  <button
                                    onClick={() => {
                                      setInvestments(prev => prev.filter(i => i.id !== inv.id));
                                      showToast(`Liquidated holdings for ${inv.name}. Sold for ₹${inv.currentVal.toFixed(0)}`);
                                    }}
                                    className="text-zinc-600 hover:text-rose-400 text-[11px] font-bold p-1 underline cursor-pointer"
                                  >
                                    Sell
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Allocation analysis bar */}
                    <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Wealth Allocation Breakdown</h3>
                      <div className="h-5 rounded-full overflow-hidden flex bg-zinc-900 mt-2">
                        <div className="bg-[#5f5df5] h-full flex items-center justify-center text-[9px] font-black" style={{ width: "50%" }}>STOCKS (50%)</div>
                        <div className="bg-[#7a78fa] h-full flex items-center justify-center text-[9px] font-black border-l border-zinc-950" style={{ width: "30%" }}>MUTUAL FUNDS (30%)</div>
                        <div className="bg-[#403eef] h-full flex items-center justify-center text-[9px] font-black border-l border-zinc-950 text-indigo-200" style={{ width: "20%" }}>GOLD (20%)</div>
                      </div>
                    </div>
                  </div>

                  {/* Right hand layout panel to add holdings manually */}
                  <div className="lg:col-span-4 bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 self-start">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                      <Coins className="w-5 h-5 text-[#5f5df5]" /> Track Asset purchase
                    </h3>

                    <form onSubmit={handleAddInvestment} className="flex flex-col gap-3.5 text-xs">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Stock/Fund Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Reliance"
                          value={newInvName}
                          onChange={(e) => setNewInvName(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-zinc-200 outline-none focus:border-[#5f5df5] transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Asset Class</label>
                        <select
                          className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-zinc-200 outline-none"
                          value={newInvType}
                          onChange={(e) => setNewInvType(e.target.value as any)}
                        >
                          <option value="Stocks">Stocks (Equity)</option>
                          <option value="Mutual Funds">Mutual Fund (SIP)</option>
                          <option value="Gold">Gold Hedge</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Shares/Qty</label>
                          <input
                            type="number"
                            required
                            step="any"
                            placeholder="e.g. 10"
                            value={newInvShares}
                            onChange={(e) => setNewInvShares(e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-zinc-200 outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Buy Price (INR)</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 2400"
                            value={newInvBuyPrice}
                            onChange={(e) => setNewInvBuyPrice(e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-zinc-200 outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-[#5f5df5] hover:bg-[#7a78fa] font-bold text-white text-xs transition-all mt-2 cursor-pointer active:scale-95"
                      >
                        Register Asset Holding
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* =========================================================================
              FEATURE VIEWPORT 4: BILL REMINDERS (With full connected payment workflow)
              ========================================================================= */}
          {activeFeature === "reminders" && (
            <motion.div
              key="view-reminders"
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 bg-zinc-950/40 rounded-2xl border border-zinc-900 p-6 md:p-8 relative z-30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left hand details panel + scheduler setup */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-2.5 text-[#5f5df5] font-bold uppercase tracking-wider text-xs mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Financial Module #4</span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-white">Bill Schedulers & Alerts</h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Stop incurring late penalties. Create recurring subscription targets. Clicking <span className="text-[#7a78fa]">"Mark as Paid"</span> triggers automatic deductions, writes expenses, subtracts targets, and schedules consecutive due dates!
                    </p>
                  </div>

                  {/* Add reminder form */}
                  <form onSubmit={handleAddNewBill} className="bg-zinc-905 p-5 rounded-xl border border-zinc-850 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#5f5df5]" /> Track Recurring Bill
                    </h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Provider / Bill Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Netflix Stream Subscription"
                        value={newBillName}
                        onChange={(e) => setNewBillName(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-xs text-zinc-200 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Monthly Charge</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 199"
                          value={newBillAmount}
                          onChange={(e) => setNewBillAmount(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-xs text-zinc-200 outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase">Due days (1-30)</label>
                        <input
                          type="number"
                          required
                          placeholder="5"
                          value={newBillDays}
                          onChange={(e) => setNewBillDays(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-xs text-zinc-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">Budget Category Impact</label>
                      <select
                        className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-xs text-zinc-200"
                        value={newBillCategory}
                        onChange={(e) => setNewBillCategory(e.target.value)}
                      >
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills & Utilities</option>
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Shopping">Shopping</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded bg-[#5f5df5] hover:bg-[#7a78fa] font-bold text-white text-xs transition-all active:scale-95"
                    >
                      Connect Scheduler
                    </button>
                  </form>
                </div>

                {/* Right hand: live reminder dashboard and system synchronization graph */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* System Interconnectivity Graph - Premium educational visualizer */}
                  <div className="bg-zinc-950 p-4 rounded-xl border border-[#5f5df5]/10">
                    <h3 className="text-[10px] font-black text-[#5f5df5] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> Verified connected fintech workflow architecture
                    </h3>
                    
                    {/* Visual connect map blocks block */}
                    <div className="grid grid-cols-5 gap-1.5 text-[9px] text-center font-bold font-sans">
                      <div className="bg-indigo-950/40 p-2 rounded border border-indigo-900/40 text-[#5f5df5]">
                        1. PAY BILL
                        <span className="block font-medium text-[8px] text-zinc-500 mt-0.5">Marked Paid</span>
                      </div>
                      <div className="flex items-center justify-center text-zinc-650 font-black">&rarr;</div>
                      <div className="bg-zinc-900/60 p-2 rounded border border-zinc-800 text-zinc-300">
                        2. OUTFLOW AUTO-LOGGED
                        <span className="block font-medium text-[8px] text-zinc-500 mt-0.5">Recorded Tx</span>
                      </div>
                      <div className="flex items-center justify-center text-zinc-650 font-black">&rarr;</div>
                      <div className="bg-indigo-950/40 p-2 rounded border border-indigo-900/40 text-[#5f5df5]">
                        3. BUDGET DEDUCTED
                        <span className="block font-medium text-[8px] text-zinc-500 mt-0.5">Caps Updated</span>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Bill List with payment trigger */}
                  <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                      <span>Live Upcoming Subscription list</span>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-zinc-500">Press pay to watch interconnected updates</span>
                    </h3>

                    <div className="flex flex-col gap-2.5">
                      {billReminders.map((bill) => {
                        const isPaid = bill.status === "Paid";
                        return (
                          <div 
                            key={bill.id} 
                            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${isPaid ? 'bg-zinc-900/10 border-zinc-900 opacity-60' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'}`}
                          >
                            <div className="flex items-center gap-3.5">
                              {/* status dot */}
                              <div className={`w-3 h-3 rounded-full ${isPaid ? 'bg-emerald-500 glow-[0_0_8px_rgba(16,185,129,0.3)]' : bill.dueDate === 'Tomorrow' ? 'bg-[#5f5df5] animate-pulse' : 'bg-yellow-500'}`} />
                              <div>
                                <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                                  {bill.name}
                                  {isPaid && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900/40">Paid</span>}
                                </h4>
                                <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                                  Type: <span className="text-zinc-400">{bill.category}</span> &bull; Renewal: <span className="text-[#7a78fa] font-bold">{bill.dueDate}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between">
                              <span className="text-lg font-extrabold text-white">₹{bill.amount}</span>
                              <button
                                type="button"
                                disabled={isPaid}
                                onClick={() => payBill(bill)}
                                className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-200 cursor-pointer ${isPaid ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/30' : 'bg-[#5f5df5] hover:bg-[#7a78fa] text-white hover:shadow-[0_0_15px_rgba(95,93,245,0.3)] active:scale-95'}`}
                              >
                                {isPaid ? "Processed" : "Mark as Paid"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeFeature !== "why-fintrack" && activeFeature !== "pricing" && activeFeature !== "resources" && activeFeature !== "login" && navTheme === "cyberdock" && (
          <CyberDock
            items={[
              { key: "home", label: "Overview", icon: Activity },
              { key: "expense", label: "Expenses", icon: LineChart },
              { key: "budget", label: "Smart Budget", icon: Target },
              { key: "investment", label: "Investments", icon: BarChart3 },
              { key: "reminders", label: "Reminders", icon: FileCheck },
            ]}
            activeKey={activeFeature}
            onSelect={(key) => {
              setActiveFeature(key);
              showToast(`Dock Activated: Navigated to ${key.toUpperCase()}`);
            }}
          />
        )}

      </div>
    </div>
  );
}
