// 1. Button Component
export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors duration-150 rounded-soc focus:outline-none cursor-pointer disabled:opacity-50";
  
  const variants = {
    primary: "bg-brand-primary text-black hover:bg-brand-hover",
    secondary: "border border-border-subtle bg-transparent text-zinc-300 hover:bg-zinc-900/50",
    danger: "bg-alert-high text-white hover:bg-red-600",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// 2. Input Component
export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{label}</label>}
      <input 
        className="w-full bg-zinc-900/40 border border-border-subtle px-3 py-2 text-sm text-zinc-200 rounded-soc focus:outline-none focus:border-brand-primary transition-colors placeholder:text-zinc-600"
        {...props}
      />
      {error && <span className="text-[11px] text-alert-high mt-0.5">{error}</span>}
    </div>
  );
}

// 3. Panel/Card Component
export function Panel({ title, children, className = '', headerAction }) {
  return (
    <div className={`bg-bg-panel border border-border-subtle rounded-soc overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3 bg-zinc-900/20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{title}</h2>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

// 4. Status Badge Component
export function Badge({ status = 'info', children }) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-zinc-800 text-zinc-400 border-zinc-700",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-sm ${styles[status]}`}>
      {children}
    </span>
  );
}

export function IconButton({ children, active = false, className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center h-10 w-10 rounded-soc border transition-colors duration-150 focus:outline-none";
  const stateStyle = active
    ? "bg-white/10 border-white/18 text-zinc-100"
    : "bg-transparent border-white/8 text-zinc-500 hover:text-zinc-200 hover:bg-white/6 hover:border-white/12";

  return (
    <button className={`${baseStyle} ${stateStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Pill({ tone = 'neutral', children, className = '' }) {
  const tones = {
    neutral: "bg-white/6 text-zinc-300 border-white/10",
    soft: "bg-white/10 text-zinc-200 border-white/12",
    success: "bg-emerald-500/12 text-emerald-300 border-emerald-500/20",
    danger: "bg-red-500/12 text-red-300 border-red-500/20",
    rose: "bg-rose-500/18 text-rose-200 border-rose-500/25",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] leading-none border rounded-soc ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function Toggle({ checked, onChange, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full border transition-colors focus:outline-none ${checked ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/6 border-white/10'} ${className}`}
      {...props}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${checked ? 'translate-x-5 bg-emerald-300' : 'translate-x-1 bg-zinc-400'}`} />
    </button>
  );
}
