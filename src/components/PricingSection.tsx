import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  QrCode,
  RefreshCw,
  Award
} from "lucide-react";

interface PricingSectionProps {
  currentPlan: string;
  setCurrentPlan: (plan: string) => void;
  onBackHome: () => void;
  showToast: (msg: string) => void;
}

export default function PricingSection({ currentPlan, setCurrentPlan, onBackHome, showToast }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  // Checkout & Payment simulation states
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: number;
    billingCycle: "monthly" | "yearly";
  } | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  
  // Input states
  const [upiId, setUpiId] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  
  // Checkout status
  const [checkoutStep, setCheckoutStep] = useState<"plans" | "pay-options" | "processing" | "success">("plans");
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Plan models
  const plans = [
    {
      id: "free",
      name: "Free Plan",
      desc: "Perfect for students and casual users",
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "Expense Tracking",
        "Manual Transaction Entry",
        "Basic Budgets",
        "Bill Reminders",
        "Monthly Reports",
        "Up to 500 Transactions",
        "Basic Dashboard"
      ],
      cta: "Start Free",
      isPopular: false,
      theme: "zinc"
    },
    {
      id: "pro",
      name: "Pro Plan",
      desc: "For serious personal finance management",
      priceMonthly: 199,
      priceYearly: 1999, // Save 17%
      features: [
        "Unlimited Transactions",
        "CSV Import/Export",
        "Advanced Analytics",
        "Investment Tracking",
        "Savings Goals",
        "Budget Recommendations",
        "Multi-Account Support",
        "Priority Support",
        "Dark Theme Customization"
      ],
      cta: "Upgrade to Pro",
      isPopular: true,
      theme: "indigo"
    },
    {
      id: "premium",
      name: "Premium Plan",
      desc: "For power users and financial enthusiasts",
      priceMonthly: 399,
      priceYearly: 3999, // Save 17%
      features: [
        "Family Accounts",
        "Shared Budgets",
        "Financial Calendar",
        "Advanced Reports",
        "Multi-Currency Tracking",
        "Wealth Analytics",
        "Net Worth Dashboard",
        "Early Access Features",
        "Data Backup & Recovery"
      ],
      cta: "Go Premium",
      isPopular: false,
      theme: "emerald"
    }
  ];

  // Card number input helper for spacing
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(" "));
    } else {
      setCardNumber(value);
    }
  };

  // Expiration date input helper for slash
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (value.length > 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const selectPlanForCheckout = (plan: typeof plans[number]) => {
    const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
    if (price === 0) {
      // Simulate direct instant free plan activation
      setCheckoutStep("processing");
      setTimeout(() => {
        setCurrentPlan("Free");
        setTransactionId(`TXN-FREE-${Math.floor(Math.random() * 900000 + 100000)}`);
        setCheckoutStep("success");
        setSelectedPlan({
          id: plan.id,
          name: plan.name,
          price: 0,
          billingCycle
        });
        showToast("Free Plan Activated Successfully!");
      }, 1500);
    } else {
      setSelectedPlan({
        id: plan.id,
        name: plan.name,
        price,
        billingCycle
      });
      setCheckoutStep("pay-options");
    }
  };

  const handlePay = () => {
    setPaymentError("");
    
    // Simulate real validations for standard forms
    if (paymentMethod === "upi" && !upiId.includes("@")) {
      setPaymentError("Please enter a valid UPI ID (e.g. name@okhdfcbank)");
      return;
    }
    if (paymentMethod === "card") {
      if (!cardName.trim()) {
        setPaymentError("Please enter Cardholder Name");
        return;
      }
      if (cardNumber.replace(/\s+/g, "").length < 16) {
        setPaymentError("Please enter a valid 16-digit Card Number");
        return;
      }
      if (cardExpiry.length < 5) {
        setPaymentError("Please enter Expiry Date (MM/YY)");
        return;
      }
      if (cardCvv.length < 3) {
        setPaymentError("Please enter 3-digit CVV number");
        return;
      }
    }
    if (paymentMethod === "netbanking" && !selectedBank) {
      setPaymentError("Please select an Indian bank to route your netbanking purchase");
      return;
    }

    setCheckoutStep("processing");

    // Simulate gorgeous loading sequence through bank gateways
    setTimeout(() => {
      // Finalize subscription plan
      const planNameMap: Record<string, string> = {
        free: "Free",
        pro: "Pro",
        premium: "Premium"
      };
      setCurrentPlan(planNameMap[selectedPlan?.id || "free"]);
      setTransactionId(`TXN-${Math.floor(Math.random() * 9000000000 + 1000000000)}`);
      setCheckoutStep("success");
      showToast(`${selectedPlan?.name} Payment Processed successfully!`);
    }, 3200);
  };

  return (
    <div className="w-full relative z-30 max-w-5xl mx-auto px-4 mt-6">
      
      {/* Top Navigation Control */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => {
            if (checkoutStep === "pay-options") {
              setCheckoutStep("plans");
            } else if (checkoutStep === "success") {
              onBackHome();
            } else {
              onBackHome();
            }
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-[#5f5df5]/40 text-xs font-bold text-zinc-300 hover:text-[#7a78fa] hover:shadow-[0_0_15px_rgba(95,93,245,0.15)] transition-all cursor-pointer group active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#5f5df5] group-hover:translate-x-[-3px] transition-transform" />
          <span>{checkoutStep === "pay-options" ? "Back to Plans" : "Return Back Home"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ==============================================
            STEP 1: DETAILED PRICING PLANS VIEW
            ============================================== */}
        {checkoutStep === "plans" && (
          <motion.div
            key="pricing-plans-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {/* Header / Intro */}
            <div className="text-center py-6 max-w-2xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5f5df5]/10 border border-[#5f5df5]/20 text-[10px] font-bold text-[#7a78fa] tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#5f5df5]" />
                <span>Premium Access &amp; Portfolios</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
                Simple, Honest Pricing
              </h1>
              <p className="mt-4 text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
                Empower your finances with custom visual customizers, AI-assisted recommendations, and multi-asset trackers curated for maximum integrity.
              </p>

              {/* Billing Cycle Toggle */}
              <div className="mt-8 flex items-center gap-4 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-900">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer ${
                    billingCycle === "monthly"
                      ? "bg-[#5f5df5] text-white shadow-[0_0_15px_rgba(95,93,245,0.3)]"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  MONTHLY
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`relative flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer ${
                    billingCycle === "yearly"
                      ? "bg-[#5f5df5] text-white shadow-[0_0_15px_rgba(95,93,245,0.3)]"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  YEARLY
                  <span className="absolute -top-3.5 -right-3.5 bg-emerald-500 text-[9px] text-zinc-950 font-black px-2 py-0.5 rounded-full uppercase tracking-normal">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>

            {/* Plans Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 items-stretch">
              {plans.map((plan) => {
                const isSelected = currentPlan.toLowerCase() === plan.id;
                const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
                
                return (
                  <motion.div
                    key={plan.id}
                    className={`relative overflow-hidden rounded-3xl border flex flex-col justify-between p-6 bg-zinc-950/40 hover:bg-zinc-950/70 transition-all duration-300 ${
                      plan.isPopular
                        ? "border-[#5f5df5] shadow-[0_0_40px_rgba(95,93,245,0.2)] md:scale-105 md:z-10"
                        : "border-zinc-900 hover:border-zinc-800"
                    }`}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Top Glow bar for popular card */}
                    {plan.isPopular && (
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#5f5df5] to-transparent shadow-[0_1px_15px_#5f5df5]" />
                    )}

                    {/* Popular Badge */}
                    {plan.isPopular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#5f5df5] to-[#7a78fa] text-[9px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider shadow-inner flex items-center gap-1">
                        <Award className="w-3 h-3 text-white" />
                        Most Popular
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-[11px] text-zinc-500 leading-relaxed min-h-[32px]">{plan.desc}</p>
                      </div>

                      {/* Pricing Unit */}
                      <div className="mb-6 pb-6 border-b border-zinc-900">
                        <div className="flex items-baseline gap-1 text-white">
                          <span className="text-4xl font-black">₹{price.toLocaleString("en-IN")}</span>
                          <span className="text-zinc-500 text-xs font-semibold">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        {billingCycle === "yearly" && price > 0 && (
                          <div className="mt-1 text-[10px] text-emerald-400 font-bold tracking-wide uppercase">
                            Equivalent to ₹{Math.round(price / 12)}/month
                          </div>
                        )}
                        {plan.id === "pro" && billingCycle === "yearly" && (
                          <div className="mt-1 text-[10px] text-indigo-400 font-semibold italic">
                            This is the plan most users choose.
                          </div>
                        )}
                      </div>

                      {/* Features Checklist */}
                      <div className="space-y-3.5 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <div className="rounded-full p-0.5 bg-zinc-900 text-emerald-400 flex-shrink-0 mt-0.5 border border-zinc-800">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => selectPlanForCheckout(plan)}
                      disabled={isSelected}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-950/40 cursor-default"
                          : plan.isPopular
                          ? "bg-[#5f5df5] hover:bg-[#7a78fa] hover:shadow-[0_0_20px_rgba(95,93,245,0.35)] text-white"
                          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
                      }`}
                    >
                      {isSelected ? "Currently Active" : plan.cta}
                      {!isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Safe Checklist */}
            <div className="mt-14 p-6 bg-zinc-950/70 border border-zinc-900/60 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 bg-zinc-900 rounded-xl text-[#5f5df5] border border-zinc-800 flex-shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Secured Sandbox Engine</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Payments are running under a high-integrity virtual environment. No real funds or sensitive details will be transferred.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest border border-zinc-900 px-3 py-1.5 rounded bg-zinc-950">
                  SSL 256-bit
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest border border-zinc-900 px-3 py-1.5 rounded bg-zinc-950">
                  PCI Compliant
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==============================================
            STEP 2: PAYMENT METHOD & OPTIONS VIEW (Secured Checkout)
            ============================================== */}
        {checkoutStep === "pay-options" && selectedPlan && (
          <motion.div
            key="payment-options-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto w-full"
          >
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              
              {/* Badge & Title */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-5 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-950">
                    Secured Checkout Gateway
                  </span>
                  <h2 className="text-xl font-extrabold text-white mt-1.5">Choose Payment Method</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Selected Plan</p>
                  <p className="text-sm font-black text-[#7a78fa]">
                    {selectedPlan.name}s ({selectedPlan.billingCycle})
                  </p>
                  <p className="text-md font-extrabold text-white">₹{selectedPlan.price.toLocaleString("en-IN")}</p>
                </div>
              </div>

              {/* Payment Tab Headers */}
              <div className="grid grid-cols-3 gap-3 mb-6 bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("upi");
                    setPaymentError("");
                  }}
                  className={`py-3 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "upi" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-900/50" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("card");
                    setPaymentError("");
                  }}
                  className={`py-3 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "card" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-900/50" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("netbanking");
                    setPaymentError("");
                  }}
                  className={`py-3 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "netbanking" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-900/50" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[220px]">
                
                {/* Method A: UPI */}
                {paymentMethod === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-2">
                          Enter UPI ID (VPA) 🇮🇳
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. sanjay@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5f5df5] transition-colors font-semibold"
                        />
                        <p className="text-[10px] text-zinc-500 mt-1.5">
                          Support for Google Pay, PhonePe, Paytm, BHIM and modern UPI clients.
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-center">
                        <QrCode className="w-24 h-24 text-zinc-600 mb-2 mt-1 animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
                          Dynamic INR QR Code Generated
                        </span>
                        <span className="text-[9px] text-[#5f5df5] font-semibold mt-1">
                          Secure instant routing sandbox
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Method B: CARD */}
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SANJAY RAMASWAMY"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5f5df5] font-semibold uppercase tracking-wider"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 8812 3456 7890"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#5f5df5] font-mono font-medium tracking-widest"
                        />
                        <CreditCard className="w-5 h-5 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5f5df5] font-semibold tracking-wider text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-2">
                          CVV Number
                        </label>
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5f5df5] font-mono text-center tracking-widest"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Method C: NETBANKING */}
                {paymentMethod === "netbanking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-1">
                      Select Indian Bank
                    </label>
                    <p className="text-[11px] text-zinc-500 mb-3">Please choose your preferred retail banking network:</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "hdfc", name: "HDFC Bank", details: "Secure Gateway A" },
                        { id: "sbi", name: "State Bank of India", details: "State Bank Hub" },
                        { id: "icici", name: "ICICI Bank", details: "iPayments Terminal" },
                        { id: "axis", name: "Axis Bank", details: "Axis Direct Hub" }
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                            selectedBank === bank.id
                              ? "bg-[#5f5df5]/10 border-[#5f5df5] text-white"
                              : "bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
                          }`}
                        >
                          <h4 className="text-xs font-bold">{bank.name}</h4>
                          <span className="text-[9px] text-zinc-500 mt-1 block">{bank.details}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Error Feedbacks */}
              {paymentError && (
                <div className="mt-4 p-3.5 bg-red-500/10 border border-red-900/60 text-red-400 rounded-xl text-center text-xs font-semibold leading-relaxed">
                  {paymentError}
                </div>
              )}

              {/* Final Proceed Checkout Button */}
              <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 items-center text-zinc-500">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                    UPI &amp; CARD SSL Secured
                  </span>
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("plans")}
                    className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs font-extrabold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePay}
                    className="w-1/2 sm:w-auto bg-gradient-to-r from-[#5f5df5] to-[#7a78fa] hover:from-[#7a78fa] hover:to-[#5f5df5] text-white px-7 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(95,93,245,0.4)] transition-all cursor-pointer select-none active:scale-95"
                  >
                    <span>Proceed &amp; Pay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==============================================
            STEP 3: GATEWAY PROCESSING STATUS (Simulated Progress)
            ============================================== */}
        {checkoutStep === "processing" && (
          <motion.div
            key="processing-gateway-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
          >
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 max-w-md w-full flex flex-col items-center shadow-2xl relative overflow-hidden">
              {/* Top Accent Scan Flow */}
              <div className="absolute top-0 inset-x-0 h-[2.5px] bg-indigo-500 animate-[pulse_1.5s_infinite]" />
              
              <RefreshCw className="w-12 h-12 text-[#5f5df5] animate-spin mb-6" />
              
              <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2">Connecting Secured Gateway</h2>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed px-4">
                We are processing your payment securely with standard banking networks. Please do not close, refresh, or hit the back button.
              </p>

              {/* Progress Indicator Bar */}
              <div className="mt-8 w-full bg-zinc-900 h-[3px] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.0, ease: "easeInOut" }}
                  className="h-full bg-indigo-500"
                />
              </div>

              {/* Security badges */}
              <div className="mt-8 pt-6 border-t border-zinc-900/80 w-full flex items-center justify-center gap-5 text-zinc-600 text-[10px] font-black tracking-widest uppercase">
                <span>&bull; RBI compliant</span>
                <span>&bull; SSL SECURE</span>
                <span>&bull; PCI DSS</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==============================================
            STEP 4: SUCCESS RECEIPT & COMPLETION VIEW
            ============================================== */}
        {checkoutStep === "success" && selectedPlan && (
          <motion.div
            key="payment-success-view"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto w-full"
          >
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)]">
              
              {/* Dynamic Confetti or Radial Glow */}
              <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/5 filter blur-3xl rounded-full" />
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-6 scale-110">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>

              <span className="text-[10px] uppercase font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-900">
                Purchase Finalized &bull; Live Active
              </span>

              <h2 className="text-2xl font-black text-white mt-4 font-sans uppercase tracking-tight">Payment Successful!</h2>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-2 leading-relaxed">
                Thank you for your trust. Your premium fintech features are unlocked. Your subscription has been initialized.
              </p>

              {/* Digital receipt */}
              <div className="mt-8 bg-zinc-950/80 border border-zinc-900 rounded-2xl p-5 text-left space-y-3 font-mono text-[11px] relative">
                
                {/* Decorative cut outs at the left & right sides to look like a teary paper receipt */}
                <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-zinc-950 border-r border-zinc-900 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-zinc-950 border-l border-zinc-900 -translate-y-1/2" />

                <div className="flex justify-between border-b border-zinc-900/80 pb-2.5">
                  <span className="text-zinc-500 uppercase font-black">Transaction ID</span>
                  <span className="text-zinc-200 font-extrabold">{transactionId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase font-black">Activated Plan</span>
                  <span className="text-white font-extrabold">{selectedPlan.name} ({selectedPlan.billingCycle})</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase font-black">Payment Mode</span>
                  <span className="text-zinc-200 font-extrabold">
                    {paymentMethod === "upi" ? "UPI Sandbox" : paymentMethod === "card" ? "Credit/Debit Card" : "Net Banking"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase font-black">Timestamp (IST)</span>
                  <span className="text-zinc-300 font-semibold">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex justify-between border-t border-zinc-900/80 pt-2.5 text-xs text-indigo-400 font-bold">
                  <span className="uppercase font-black text-zinc-400">Total Charged</span>
                  <span className="text-white font-black text-sm">₹{selectedPlan.price.toLocaleString("en-IN")}</span>
                </div>

                <div className="pt-2 text-center text-[9px] text-zinc-500 font-semibold tracking-wider border-t border-dashed border-zinc-900 mt-2">
                  SECURED BY FINTRACK SANDBOX GATEWAY (INDIA)
                </div>
              </div>

              {/* Action and finish */}
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onBackHome();
                  }}
                  className="py-3.5 px-8 rounded-xl bg-[#5f5df5] hover:bg-[#7a78fa] text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95"
                >
                  <span>Go to Workspace Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
