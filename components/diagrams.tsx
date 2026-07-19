import type { CSSProperties, ReactNode } from 'react';

/**
 * Warren docs diagram library.
 * Reproduces the rendered-diagram language from the Warren technical docs
 * (nodes, arrows, branches, panels, ladder, timeline) using the site's
 * Fumadocs theme tokens, so diagrams match the dark theme + mint accent.
 * Registered globally in components/mdx.tsx: use in MDX without imports.
 */

const FG = 'var(--color-fd-foreground, #f5f5f5)';
const MUTED = 'var(--color-fd-muted-foreground, #a3a3a3)';
const BORDER = 'var(--color-fd-border, #1f1f1f)';
const SURFACE = 'var(--color-fd-muted, #141414)';
const MINT = 'var(--color-fd-primary, #2EE6A6)';
const MINT_SOFT = 'rgba(46, 230, 166, 0.10)';
const MINT_LINE = 'rgba(46, 230, 166, 0.38)';
const WARN = '#D9A94F';
const WARN_LINE = 'rgba(217, 169, 79, 0.55)';
const WARN_SOFT = 'rgba(217, 169, 79, 0.08)';
const STOP = '#8b949c';
const STOP_LINE = 'rgba(139, 148, 156, 0.55)';
const STOP_SOFT = 'rgba(139, 148, 156, 0.10)';
const RED = '#e07a6d';

/* ---------- primitives ---------- */

export function Diagram({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ margin: '1.6em 0', border: `1px solid ${BORDER}`, borderRadius: 12, background: SURFACE, overflow: 'hidden' }}>
      <div style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, padding: '9px 16px', borderBottom: `1px solid ${BORDER}` }}>
        {title}
      </div>
      <div style={{ padding: '22px 16px', overflowX: 'auto' }}>{children}</div>
    </div>
  );
}

export function DStack({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</div>;
}

const nodeTone: Record<string, CSSProperties> = {
  default: { background: 'rgba(46, 230, 166, 0.04)', borderColor: MINT_LINE },
  hl: { background: MINT_SOFT, borderColor: MINT },
  warn: { background: WARN_SOFT, borderColor: WARN_LINE },
  stop: { background: STOP_SOFT, borderColor: STOP_LINE },
};

export function DNode({ tone = 'default', title, note, mono }: { tone?: 'default' | 'hl' | 'warn' | 'stop'; title: ReactNode; note?: ReactNode; mono?: boolean }) {
  return (
    <div style={{ ...nodeTone[tone], border: '1.5px solid', borderRadius: 10, padding: '10px 18px', fontSize: '0.9rem', color: FG, textAlign: 'center', maxWidth: 620, fontFamily: mono ? 'var(--font-proto-mono, monospace)' : undefined }}>
      <b style={{ fontWeight: 600 }}>{title}</b>
      {note ? <small style={{ display: 'block', color: MUTED, fontSize: '0.78rem', marginTop: 3, fontWeight: 400 }}>{note}</small> : null}
    </div>
  );
}

export function DArrow({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: MUTED }}>
      <div style={{ width: 2, height: 12, background: MINT_LINE }} />
      {label ? (
        <>
          <div style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10, padding: '2px 0', color: MUTED }}>{label}</div>
          <div style={{ width: 2, height: 12, background: MINT_LINE }} />
        </>
      ) : null}
      <div style={{ color: MINT, fontSize: 11, lineHeight: 0.9 }}>▼</div>
    </div>
  );
}

export function DBranch({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 2 }}>{children}</div>;
}

export function DCol({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</div>;
}

function Stat({ tone, value, label }: { tone?: 'g' | 'y' | 'r'; value: string; label: string }) {
  const color = tone === 'g' ? MINT : tone === 'y' ? WARN : tone === 'r' ? RED : FG;
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '10px 14px', minWidth: 86, background: 'rgba(255,255,255,0.02)', margin: '0 3px' }}>
      <span style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontWeight: 600, fontSize: '1.02rem', color }}>{value}</span>
      <span style={{ fontSize: '0.74rem', color: MUTED }}>{label}</span>
    </span>
  );
}

/* ---------- composed diagrams ---------- */

export function DiagramRegimeLadder() {
  const steps = [
    { t: 'strong bullish', c: 'rgba(46,230,166,0.30)' },
    { t: 'bullish', c: 'rgba(46,230,166,0.20)' },
    { t: 'slightly bullish', c: 'rgba(46,230,166,0.10)' },
    { t: 'sideways', c: 'rgba(139,148,156,0.18)' },
    { t: 'slightly bearish', c: 'rgba(217,169,79,0.10)' },
    { t: 'bearish', c: 'rgba(217,169,79,0.20)' },
    { t: 'strong bearish', c: 'rgba(217,169,79,0.30)' },
  ];
  return (
    <Diagram title="The seven-step ladder: three basic directions">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 640 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((s) => (
            <div key={s.t} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-proto-mono, monospace)', fontSize: '0.68rem', padding: '10px 2px', borderRadius: 8, border: `1px solid ${BORDER}`, color: FG, background: s.c }}>
              {s.t}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ flex: 3, textAlign: 'center', fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 0', borderRadius: 7, fontWeight: 600, background: 'rgba(46,230,166,0.12)', color: MINT }}>bullish</div>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 0', borderRadius: 7, fontWeight: 600, background: 'rgba(139,148,156,0.14)', color: STOP }}>ranging</div>
          <div style={{ flex: 3, textAlign: 'center', fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 0', borderRadius: 7, fontWeight: 600, background: 'rgba(217,169,79,0.12)', color: WARN }}>bearish</div>
        </div>
      </div>
    </Diagram>
  );
}

export function DiagramContinuousVsRegime() {
  return (
    <Diagram title="Continuous vs. regime-segmented, same strategy">
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div style={{ flex: 1, minWidth: 250, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, marginBottom: 12 }}>Continuous: one window</div>
          <Stat value="+9%" label="full year" />
          <div style={{ marginTop: 12, fontSize: '0.82rem', color: MUTED, fontStyle: 'italic' }}>one blended number, hides when it works</div>
        </div>
        <div style={{ flex: 1.4, minWidth: 300, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, marginBottom: 12 }}>Regime-segmented: per condition</div>
          <Stat tone="g" value="+34%" label="bull · edge" />
          <Stat tone="y" value="−6%" label="range · bleed" />
          <Stat tone="r" value="−22%" label="bear · disqualified" />
          <div style={{ marginTop: 12, fontSize: '0.82rem', color: MUTED, fontStyle: 'italic' }}>the profile you actually deploy on</div>
        </div>
      </div>
    </Diagram>
  );
}

export function DiagramEvaluationFlow() {
  const steps: Array<[string, string, boolean?]> = [
    ['1 · Read the current regime', 'what market are we in now?'],
    ['2 · Plan windows: all-regimes sweep', 'best clean window per regime'],
    ['3 · Backtest bull, bear, and range', 'regime mode; the mixed-guard protects each window'],
    ['4 · Grade robustness', 'judge the WORST regime, not the average'],
    ['5 · Full-period backtest (1–2 yr)', 'reality check: the run-it-blindly aggregate'],
    ['6 · Deploy to match the current regime', 'plan to switch when it turns', true],
  ];
  return (
    <Diagram title="The recommended evaluation flow">
      <DStack>
        {steps.map(([t, n, hl], i) => (
          <DCol key={t}>
            {i > 0 ? <DArrow /> : null}
            <DNode tone={hl ? 'hl' : 'default'} title={t} note={n} />
          </DCol>
        ))}
      </DStack>
    </Diagram>
  );
}

export function DiagramSignalPipeline() {
  return (
    <Diagram title="The signal pipeline">
      <DStack>
        <DNode title="Scheduled scanners sweep the universe" note="hundreds of tokens, around the clock, out of the conversation path" />
        <DArrow />
        <DNode title="Narration types the raw scans" note="analysis · anomaly · continuation · bounce · armed-entry follow-up" />
        <DArrow />
        <DNode title="Signal published" note="direction · confidence · entry / stop / target · validity horizon" />
        <DArrow label="horizon elapses" />
        <DNode title="Outcome validated against what price did" />
        <DArrow />
        <DNode tone="hl" title="Hit-rate analytics on real forward returns" note="per signal type and trigger, misses included" />
      </DStack>
    </Diagram>
  );
}

export function DiagramStrategyLifecycle() {
  return (
    <Diagram title="Strategy lifecycle">
      <DStack>
        <DBranch>
          <DCol><DNode title="Describe rules in plain English" note="indicators + entry/exit conditions" /></DCol>
          <DCol><DNode title="Supply full strategy code" note="arbitrary logic" /></DCol>
        </DBranch>
        <DArrow label="validated · categorized" />
        <DNode tone="hl" title="A strategy in your library" note="content-addressed: every version hashed, last 25 kept, rollback anytime" />
        <DArrow />
        <DNode title="Backtest ⇄ tune ⇄ diagnose" note="results keyed to the exact code version" />
        <DBranch>
          <DCol><DArrow /><DNode title="Deploy as a bot" note="paper first" /></DCol>
          <DCol><DArrow /><DNode title="Publish to the marketplace" note="with its verified record" /></DCol>
        </DBranch>
      </DStack>
    </Diagram>
  );
}

export function DiagramBacktestJobFlow() {
  return (
    <Diagram title="Backtest job flow">
      <DStack>
        <DNode title="Backtest request" />
        <DArrow label="weight = pairs × days × candle density" />
        <DNode title="Compute router" />
        <DBranch>
          <DCol><DArrow label="light" /><DNode title="Serverless function" note="returns in seconds" /></DCol>
          <DCol><DArrow label="heavy · all tuning" /><DNode title="Container task" note="more CPU / memory" /></DCol>
        </DBranch>
        <DArrow label="results to object storage" />
        <DNode tone="hl" title="Poll returns results + verdicts" note="risk-adjusted stats computed at read time · dead compute reconciled to failed" />
      </DStack>
    </Diagram>
  );
}

export function DiagramCapitalPool() {
  return (
    <Diagram title="One capital pool, two books">
      <DStack>
        <DNode tone="hl" title="Trading allocation: one capital pool" note="margin reservations prevent double-spending across books" />
        <DBranch>
          <DCol><DArrow /><DNode title="Strategy bots" note="sessions · guards · fleet controls" /></DCol>
          <DCol><DArrow /><DNode title="Warren's discretionary book" note="$100K paper sandbox · per-position SL / TP" /></DCol>
        </DBranch>
        <DArrow />
        <DNode tone="warn" title="Confirm-to-approve gate on every money action" note="pre-trade risk review · leverage cap · paper / live control" />
      </DStack>
    </Diagram>
  );
}

export function DiagramAutopilotGate() {
  return (
    <Diagram title="The autopilot gate, per action">
      <DStack>
        <DNode title="Scheduled run fires" note="flagged unattended by the internal scheduler, never by a message" />
        <DArrow />
        <DNode title="Is the action read-only analysis?" />
        <DBranch>
          <DCol><DArrow label="yes" /><DNode tone="hl" title="Runs" note="observe & report" /></DCol>
          <DCol>
            <DArrow label="no: it would change state" />
            <DNode title="Autonomous execution armed?" />
            <DBranch>
              <DCol><DArrow label="yes" /><DNode tone="warn" title="Runs, still risk-gated" note="pre-trade review · leverage cap · paper/live control" /></DCol>
              <DCol><DArrow label="no (default)" /><DNode tone="stop" title="Vetoed" note="deny-by-default: unknown actions refused" /></DCol>
            </DBranch>
          </DCol>
        </DBranch>
      </DStack>
    </Diagram>
  );
}

export function DiagramListingLifecycle() {
  return (
    <Diagram title="A listing's lifecycle">
      <DStack>
        <DNode title="Publish" note="description · category · direction · risk · tags, clonable or view-only" />
        <DArrow />
        <DNode tone="hl" title="Live listing" note="showcase metrics auto-computed from verified backtests, bound to the code version" />
        <DBranch>
          <DCol><DArrow label="anytime" /><DNode title="Update metadata · refresh showcase" note="after re-running backtests, numbers update from verified results" /></DCol>
          <DCol><DArrow label="anytime" /><DNode tone="warn" title="Unpublish" note="visibility removed, code preserved; re-publish later" /></DCol>
        </DBranch>
      </DStack>
    </Diagram>
  );
}

export function DiagramClonePath() {
  return (
    <Diagram title="The safe clone path">
      <DStack>
        <DNode title="Browse" note="official + community · filter by category, risk, pair · sort by profit, win rate, most cloned" />
        <DArrow />
        <DNode title="Inspect the real stats" note="aggregate + per-pair breakdown · worst drawdown · author's record" />
        <DArrow />
        <DNode title="Clone into your library" note="clonable listings only: full rules included, re-keyed to you" />
        <DArrow />
        <DNode title="Re-validate yourself" note="backtest across regimes; grade robustness on the worst one" />
        <DArrow />
        <DNode tone="hl" title="Deploy, paper first" />
      </DStack>
    </Diagram>
  );
}

export function DiagramSurvival() {
  return (
    <Diagram title="Age-conditioned survival">
      <DStack>
        <DNode mono title="S(t) = P(spell lasts > t)" note="the empirical survival curve of comparable regime spells" />
        <DArrow />
        <DNode mono title="P(persist +h | age a) = S(a+h) / S(a)" note="conditioned on how long this regime has already run" />
        <DArrow />
        <DNode title="Enough comparable history?" note="age inside observed support · enough spells still at risk" />
        <DBranch>
          <DCol><DArrow label="yes" /><DNode tone="hl" title="Survival estimate" /></DCol>
          <DCol><DArrow label="no: regime too young / thin history" /><DNode tone="warn" title="Baseline fallback, or abstain" /></DCol>
        </DBranch>
      </DStack>
    </Diagram>
  );
}

export function DiagramFallbackChain() {
  return (
    <Diagram title="Coverage fallback chain">
      <DStack>
        <DNode tone="hl" title="Token-specific" note="this exact pair has its own regime windows: best" />
        <DArrow label="none available ↓" />
        <DNode title="ETH proxy" note="alt-coins track ETH cycles closely" />
        <DArrow label="none available ↓" />
        <DNode title="BTC proxy" note="broad-market approximation" />
        <DArrow label="none available ↓" />
        <DNode tone="stop" title="Generic fallback" note="a recent default window, regime &quot;mixed&quot;: least reliable, and says so" />
      </DStack>
    </Diagram>
  );
}

function LayerCard({ n, name, desc }: { n: string; name: string; desc: string }) {
  return (
    <div style={{ width: '100%', maxWidth: 640, border: `1.5px solid ${MINT_LINE}`, background: 'rgba(46,230,166,0.04)', borderRadius: 12, padding: '12px 18px', textAlign: 'left' }}>
      <div style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: MINT, fontWeight: 600 }}>{n}</div>
      <div style={{ fontWeight: 600, fontSize: '1.05rem', margin: '2px 0', color: FG }}>{name}</div>
      <div style={{ fontSize: '0.85rem', color: MUTED }}>{desc}</div>
    </div>
  );
}

export function DiagramLayerMap() {
  return (
    <Diagram title="Layer map">
      <DStack>
        <div style={{ fontSize: '0.8rem', color: MUTED, fontFamily: 'var(--font-proto-mono, monospace)' }}>clients: web · API</div>
        <DArrow />
        <LayerCard n="Layer 1" name="The Warren agent" desc="persona + safety hooks: house rules · answer guard · tool-call gate" />
        <DArrow label="runs on" />
        <LayerCard n="Layer 2" name="The Kodeus runtime" desc="generic execution engine · per-user isolation · config / memory / credential stores" />
        <DArrow label="capability calls ▼ · state ▲" />
        <LayerCard n="Layer 3" name="The intelligence engine" desc="~64 capabilities, per-user scoped · closed candles · OOS gate · deflated Sharpe · coverage verdicts" />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', margin: '10px 0 2px' }}>
          {['database · cache · object storage', 'exchange adapters + venue registry', 'scheduled scanners + narration → curated signals'].map((s) => (
            <div key={s} style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: '8px 14px', fontSize: '0.8rem', color: MUTED, background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>{s}</div>
          ))}
        </div>
        <DArrow label="weight-based routing" />
        <LayerCard n="Layer 4" name="Compute & async jobs" desc="light → serverless function · heavy / tuning → container task · submit → poll" />
      </DStack>
    </Diagram>
  );
}

export function DiagramEndToEnd() {
  const steps: Array<{ who: string; w?: boolean; g?: boolean; t: ReactNode }> = [
    { who: 'You', t: <>&ldquo;Is now a good time to run strategy X?&rdquo;</> },
    { who: 'Warren', w: true, t: <>House rules injected: the honest-uncertainty persona and the abstention contract.</> },
    { who: 'Engine', t: <>Regime read returns the label, cascade, and a <b>coverage verdict</b>.</> },
    { who: 'Guard', g: true, t: <><b>If the verdict is abstain:</b> the answer guard replaces the reply with an honest abstention. The turn ends here.</> },
    { who: 'Engine', t: <>Backtest becomes an async job → routed by weight to compute → results stored.</> },
    { who: 'Warren', w: true, t: <>Results surfaced with their caveats: an in-sample result is never framed as &ldquo;go live.&rdquo;</> },
    { who: 'Engine', t: <>Deploy (paper) validated against the venue registry; a bot session starts.</> },
    { who: 'Guard', g: true, t: <><b>If the run is unattended</b> (watch-and-report): the tool-call gate vetoes the deploy. Reads still pass.</> },
    { who: 'You', t: <>A calibrated answer, delivered with its uncertainty.</> },
  ];
  return (
    <Diagram title="End-to-end: ask → regime read → backtest → deploy">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 92px', textAlign: 'right', paddingTop: 2 }}>
              <span style={{ fontFamily: 'var(--font-proto-mono, monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', border: `1px solid ${s.w ? MINT_LINE : BORDER}`, borderRadius: 999, padding: '3px 9px', color: s.w ? MINT : MUTED, whiteSpace: 'nowrap' }}>{s.who}</span>
            </div>
            <div style={{ flex: 1, fontSize: '0.9rem', color: s.g ? FG : MUTED, borderLeft: `2px solid ${s.g ? WARN : BORDER}`, padding: `0 0 ${i === steps.length - 1 ? 2 : 16}px 16px` }}>
              {s.t}
            </div>
          </div>
        ))}
      </div>
    </Diagram>
  );
}
