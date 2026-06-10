import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { Pill, Toggle } from '../components/core';
import { Navbar } from '../components/Navbar';

export function DashboardView() {
  const { logout } = useAuth();
  const { request, loading, error } = useApi();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [agentSummary, setAgentSummary] = useState(null);

  useEffect(() => {
    request('/agents/summary')
      .then(data => setAgentSummary(data))
      .catch(() => {});
  }, [request]);

  const kpis = useMemo(() => {
    const agentsOnline = agentSummary?.total ?? 141;
    const disconnected = agentSummary?.disconnected ?? 24;

    return {
      agentsOnline,
      disconnected,
      criticalThreats: 26,
      criticalEndpoints: 9,
      events: 528,
      eventEndpoints: 323,
    };
  }, [agentSummary]);

  return (
    <div className="min-h-screen aegira-app-bg text-zinc-100">
      <div className="w-full px-6 py-5 lg:px-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 flex items-center justify-center">
              <img src="/public/logo.png" alt="Aegira" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-soc border border-white/10 bg-bg-panel px-2.5 py-2">
              <button type="button" className="h-7 w-7 inline-flex items-center justify-center rounded-soc border border-white/8 bg-white/4 text-zinc-300 hover:bg-white/7">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12.5 4.5 7.5 10l5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="text-xs text-zinc-300 tracking-wide">Today, Jun 03</div>
              <button type="button" className="h-7 w-7 inline-flex items-center justify-center rounded-soc border border-white/8 bg-white/4 text-zinc-300 hover:bg-white/7">
                <img src="/assets/icons/calendar.png" alt="Calendar" />
              </button>
            </div>

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-3 rounded-soc border border-white/10 bg-bg-panel px-3 py-2 hover:bg-white/6 transition-colors"
            >
              <div className="text-left leading-tight">
                <div className="text-[11px] text-zinc-200">John Montaña</div>
                <div className="text-[10px] text-zinc-500">jmontaña@aegira.com</div>
              </div>
              <div className="h-8 w-8 rounded-soc border border-white/10 bg-gradient-to-br from-amber-200 to-rose-400" />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Navbar activeId="control-hub" />

          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-soc border border-white/10 bg-white/6 flex items-center justify-center text-zinc-200">
                  <img src="/assets/icons/control-hub.png" alt="Control Hub" />
                </div>
                <div className="text-2xl tracking-tight text-zinc-100">Control Hub</div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="h-9 px-4 rounded-soc border border-white/10 bg-bg-panel text-xs text-zinc-400 hover:bg-white/6 transition-colors">
                  Refresh
                </button>
                <button type="button" className="h-9 w-9 rounded-soc border border-white/10 bg-bg-panel text-zinc-400 hover:bg-white/6 transition-colors inline-flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M10 9v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M10 6.3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <div className="rounded-soc border border-white/10 bg-bg-panel px-4 py-3 h-[92px] flex items-center justify-between">
                  <div>
                    <div className="text-3xl leading-none text-zinc-100">{kpis.agentsOnline}</div>
                    <div className="text-[11px] text-zinc-400 mt-1">Agents Online</div>
                    <div className="text-[10px] text-zinc-600 mt-1">{kpis.disconnected} Disconnected</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="rounded-soc border border-white/10 bg-alert-soft px-4 py-3 h-[92px] text-zinc-950 flex items-center justify-between">
                  <div>
                    <div className="text-3xl leading-none">{kpis.criticalThreats}</div>
                    <div className="text-[11px] mt-1">Critical Threats</div>
                    <div className="text-[10px] mt-1 text-zinc-800/80">{kpis.criticalEndpoints} Endpoints</div>
                  </div>
                  <Pill tone="rose" className="self-start text-[9px] border-rose-700/25 bg-rose-700/25 text-zinc-100">
                    +12%
                  </Pill>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="rounded-soc border border-white/10 bg-[#f5f5f4] px-4 py-3 h-[92px] text-zinc-950 flex items-center justify-between">
                  <div>
                    <div className="text-3xl leading-none">{kpis.events}</div>
                    <div className="text-[11px] mt-1">Events</div>
                    <div className="text-[10px] mt-1 text-zinc-700/80">{kpis.eventEndpoints} Endpoints</div>
                  </div>
                  <Pill tone="success" className="self-start text-[9px]">
                    +6%
                  </Pill>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="rounded-soc border border-white/10 bg-bg-panel px-4 py-3 h-[170px]">
                  <div className="text-[11px] text-zinc-300 mb-3">Threat Surface</div>
                  <div className="space-y-2">
                    {[
                      { host: 'srv-dns-01', value: 202 },
                      { host: 'srv-web-main', value: 34 },
                      { host: 'pc-jason-linux', value: 22 },
                      { host: 'lap-dev04-win', value: 17 },
                      { host: 'pc-invite-win', value: 10 },
                    ].map((row, idx) => (
                      <div key={row.host} className="grid grid-cols-[18px_1fr_36px] gap-2 items-center">
                        <div className="text-[10px] text-zinc-600">{idx + 1}</div>
                        <div className="flex items-center gap-3">
                          <div className="text-[10px] text-zinc-300 w-[110px] truncate">{row.host}</div>
                          <div className="flex-1 h-[2px] bg-white/10 relative">
                            <div className="absolute left-0 top-0 h-[2px] bg-white/40" style={{ width: `${Math.min(100, (row.value / 202) * 100)}%` }} />
                          </div>
                        </div>
                        <div className="text-[10px] text-zinc-500 text-right">{row.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-8">
                <div className="rounded-soc border border-white/10 bg-bg-panel px-4 py-3 h-[170px]">
                  <div className="text-[11px] text-zinc-300 mb-3">Global Risk Score</div>
                  <div className="flex gap-6 h-[126px]">
                    <div className="w-[110px] h-[110px] rounded-soc border border-white/10 bg-gradient-to-b from-[#fff3e3] to-[#b88455] flex flex-col justify-center items-center text-zinc-900">
                      <div className="text-2xl font-bold leading-none">65</div>
                      <div className="text-[10px] text-zinc-800/70 -mt-0.5">/100</div>
                      <div className="text-[10px] text-zinc-800/80 mt-1">Score</div>
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-lg text-red-300 leading-none">26</div>
                          <div className="text-[10px] text-zinc-500">Critical severity</div>
                          <div className="text-[10px] text-zinc-600">15 or higher</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg text-amber-200 leading-none">46</div>
                          <div className="text-[10px] text-zinc-500">High severity</div>
                          <div className="text-[10px] text-zinc-600">12 to 14</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg text-sky-300 leading-none">423</div>
                          <div className="text-[10px] text-zinc-500">Medium severity</div>
                          <div className="text-[10px] text-zinc-600">7 to 11</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg text-zinc-100 leading-none">33</div>
                          <div className="text-[10px] text-zinc-500">Low severity</div>
                          <div className="text-[10px] text-zinc-600">0 to 6</div>
                        </div>
                      </div>

                      <div className="mt-4 h-[3px] rounded-full overflow-hidden bg-white/10">
                        <div
                          className="h-full"
                          style={{
                            background:
                              'linear-gradient(90deg, rgba(248,113,113,0.9) 0%, rgba(253,224,71,0.9) 33%, rgba(125,211,252,0.9) 66%, rgba(255,255,255,0.9) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="rounded-soc border border-white/10 bg-bg-panel px-4 py-3 h-[168px] overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[11px] text-zinc-300">Active Footprint</div>
                    <div className="text-[10px] text-zinc-600">Nations: 21</div>
                  </div>
                  <div className="relative h-[122px] rounded-soc border border-white/8 bg-white/3 overflow-hidden">
                    <svg viewBox="0 0 600 250" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      <path
                        d="M62 86c34-23 68-31 108-26 34 4 58 19 74 31 10 8 16 17 19 25 2 5 8 9 14 8 20-2 47-2 72 6 20 6 31 18 48 30 16 11 34 16 60 14 28-2 58-10 83-23 10-5 20 2 20 12 0 26-21 57-55 73-44 20-101 26-160 24-64-2-141-12-222-9-48 2-92 10-129 30-16 9-31-6-27-22 8-33 35-76 95-103Z"
                        fill="rgba(255,255,255,0.06)"
                        stroke="rgba(255,255,255,0.10)"
                        strokeWidth="2"
                      />
                      {[
                        { cx: 150, cy: 130, r: 8 },
                        { cx: 232, cy: 112, r: 6 },
                        { cx: 312, cy: 150, r: 7 },
                        { cx: 392, cy: 98, r: 6 },
                        { cx: 455, cy: 138, r: 7 },
                        { cx: 510, cy: 110, r: 6 },
                      ].map((p, i) => (
                        <g key={i}>
                          <circle cx={p.cx} cy={p.cy} r={p.r} fill="rgba(248,113,113,0.30)" />
                          <circle cx={p.cx} cy={p.cy} r={Math.max(2, p.r - 3)} fill="rgba(248,113,113,0.75)" />
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-5">
                <div className="rounded-soc border border-white/10 bg-bg-panel px-4 py-3 h-[168px]">
                  <div className="text-[11px] text-zinc-300 mb-3">High Priority Alerts</div>
                  <div className="space-y-2.5">
                    {[
                      { sev: 'Critical', name: 'Credential Stuffing', host: 'srv-dns-01' },
                      { sev: 'Critical', name: 'Ransomware', host: 'srv-web-main' },
                      { sev: 'Critical', name: 'Host Compromise', host: 'pc-jason-linux' },
                      { sev: 'Critical', name: 'Persistence', host: 'lap-dev04-win' },
                    ].map((row) => (
                      <div key={row.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Pill tone="rose" className="bg-rose-500/16 border-rose-500/25 text-rose-200">
                            {row.sev}
                          </Pill>
                          <div>
                            <div className="text-[11px] text-zinc-200 leading-tight">{row.name}</div>
                            <div className="text-[10px] text-zinc-600 leading-tight">Active Threat</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                          <span>{row.host}</span>
                          <span className="ml-2 text-zinc-700">↑</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-3">
                <div className="grid grid-cols-2 gap-3 h-[168px]">
                  {[
                    { title: 'MITRE ATT&CK', subtitle: 'TACTIC', value: 'T1059.001 (PowerShell)', detail: 'Very Malicious Dude..' },
                    { title: 'TOP ATTACKING', subtitle: 'IP', value: '185.220.101.5', detail: 'Tor Exit Node (Malicious)' },
                    { title: 'GLOBAL', subtitle: 'ADVISORY', value: 'CISA Alert', detail: 'Ransomware Campaign' },
                    { title: 'ACTIVE DETECTION', subtitle: 'ENGINE', value: 'Wazuh Core', detail: 'Rule ID: 60118 (Sysmon)' },
                  ].map((card) => (
                    <div key={`${card.title}-${card.subtitle}`} className="rounded-soc border border-white/10 bg-bg-panel px-3 py-3">
                      <div className="text-[9px] text-zinc-500 tracking-widest uppercase leading-none">
                        {card.title}
                      </div>
                      <div className="text-[9px] text-zinc-500 tracking-widest uppercase leading-none mt-1">
                        {card.subtitle}
                      </div>
                      <div className="mt-3 text-[11px] text-zinc-200 leading-tight">{card.value}</div>
                      <div className="mt-1 text-[10px] text-zinc-600 leading-tight">{card.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12">
                <div className="rounded-soc border border-white/10 bg-bg-panel px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-[11px] text-zinc-300">Export</div>
                    <div className="flex items-center gap-2">
                      <button type="button" className="h-7 px-3 rounded-soc border border-white/10 bg-white/4 text-[10px] tracking-widest uppercase text-amber-100/80 hover:bg-white/7">
                        JSON
                      </button>
                      <button type="button" className="h-7 px-3 rounded-soc border border-white/10 bg-white/4 text-[10px] tracking-widest uppercase text-emerald-100/80 hover:bg-white/7">
                        CSV
                      </button>
                      <button type="button" className="h-7 px-3 rounded-soc border border-rose-500/20 bg-rose-500/10 text-[10px] tracking-widest uppercase text-rose-200 hover:bg-rose-500/16">
                        PDF
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-[11px] text-zinc-500">Auto-Refresh</div>
                    <Pill tone={autoRefresh ? 'success' : 'neutral'} className="text-[9px] tracking-widest uppercase">
                      {autoRefresh ? 'ON' : 'OFF'}
                    </Pill>
                    <div className="text-[10px] text-zinc-600">10 sec</div>
                    <Toggle checked={autoRefresh} onChange={setAutoRefresh} />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-[10px] text-zinc-600">
                      Last Fetch: <span className="text-zinc-400">22:07:19 (2026-06-05)</span>
                    </div>
                    <button type="button" className="h-8 w-8 rounded-soc border border-white/10 bg-white/4 text-[11px] text-zinc-200 hover:bg-white/7">
                      AI
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {loading && <div className="mt-4 text-[11px] text-zinc-600">Syncing metrics...</div>}
            {error && <div className="mt-2 text-[11px] text-rose-300">ERR: {error}</div>}
          </main>
        </div>
      </div>
    </div>
  );
}
