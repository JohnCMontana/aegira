import controlHubIcon from '../assets/icons/control-hub.png';
import endpointsIcon from '../assets/icons/endpoints.png';
import alertsIcon from '../assets/icons/alerts.png';
import ndrIcon from '../assets/icons/ndr.png';

export function Navbar({ onSelect, onExpand, className = '' }) {
  const baseButtonStyle = "inline-flex items-center justify-center h-11 w-11 rounded-soc transition-colors duration-150 focus:outline-none bg-transparent";

  const navItems = [
    {
      id: 'control-hub',
      label: 'Control Hub',
      img: controlHubIcon,
    },
    {
      id: 'endpoints',
      label: 'Endpoints',
      img: endpointsIcon,
    },
    {
      id: 'alerts',
      label: 'Alerts',
      img: alertsIcon,
    },
    {
      id: 'telemetry',
      label: 'Telemetry',
      img: ndrIcon,
    },
  ];

  return (
    <aside className={`w-14 shrink-0 ${className}`}>
      <div className="h-full rounded-soc border border-white/10 bg-bg-panel px-2 py-3 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-label={item.label}
              onClick={() => onSelect?.(item.id)}
              className={`${baseButtonStyle} text-zinc-500 hover:text-zinc-200`}
            >
              {item.img ? (
                <img src={item.img} alt={item.label} className="h-[20px] w-[20px] opacity-90" />
              ) : (
                item.icon
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 items-center">
          <button
            type="button"
            aria-label="Settings"
            onClick={() => onSelect?.('settings')}
            className={`${baseButtonStyle} text-zinc-500 hover:text-zinc-200`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M8.2 3.5 10 2l1.8 1.5 2.3-.2.7 2.2 1.9 1.3-.9 2.1.9 2.1-1.9 1.3-.7 2.2-2.3-.2L10 18l-1.8-1.5-2.3.2-.7-2.2-1.9-1.3.9-2.1-.9-2.1 1.9-1.3.7-2.2 2.3.2Z" stroke="currentColor" strokeWidth="1.0" />
              <path d="M10 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" stroke="currentColor" strokeWidth="1.0" />
            </svg>
          </button>
          <button
            type="button"
            className="text-[10px] text-zinc-600 hover:text-zinc-300 tracking-widest uppercase"
            onClick={() => onExpand?.()}
          >
            Expand
          </button>
        </div>
      </div>
    </aside>
  );
}
