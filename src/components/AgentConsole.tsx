import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogLine {
  type: 'system' | 'success' | 'incoming' | 'outgoing' | 'processing' | 'info';
  text: string;
}

interface AgentData {
  title: string;
  logs: LogLine[];
}

export const AgentConsole: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<'whatsapp' | 'scraper' | 'optimizer'>('whatsapp');
  const [printedLogs, setPrintedLogs] = useState<LogLine[]>([]);
  const screenRef = useRef<HTMLDivElement>(null);
  
  const agents: Record<'whatsapp' | 'scraper' | 'optimizer', AgentData> = {
    whatsapp: {
      title: '> WHATSAPP_MONITOR_AGENT // ACTIVE',
      logs: [
        { type: 'system', text: '[SYSTEM] Initializing WhatsApp Monitor...' },
        { type: 'system', text: '[SYSTEM] Checking credentials on localhost:3000...' },
        { type: 'success', text: '[SUCCESS] WhatsApp session connected successfully.' },
        { type: 'info', text: '[LISTENING] Awaiting incoming webhook messages...' },
        { type: 'incoming', text: '[INCOMING] Message from +91-98765-43210: ".ask What is the status of agent 2?"' },
        { type: 'processing', text: '[AGENT] Forwarding query to OpenAI system prompt context...' },
        { type: 'outgoing', text: '[OUTGOING] Reply sent: "Agent 2 status: ONLINE. Scraped 42 leads today."' }
      ]
    },
    scraper: {
      title: '> LEAD_SCRAPER_BOT // IDLE',
      logs: [
        { type: 'system', text: '[SYSTEM] Booting Lead Scraper Bot v1.2...' },
        { type: 'info', text: '[CONFIG] Target Domain: https://news.ycombinator.com/' },
        { type: 'info', text: '[CONFIG] Keywords to extract: "AI agent", "Automation"' },
        { type: 'processing', text: '[SCRAPE] Sending request & fetching DOM trees...' },
        { type: 'processing', text: '[PARSER] Parsing articles, titles, and links...' },
        { type: 'success', text: '[DATA] Extracted 5 articles matching filters.' },
        { type: 'info', text: '[EXPORT] Saving database payloads to ./leads_export.json...' },
        { type: 'success', text: '[SUCCESS] Payload sent to webhook. Scraper idle.' }
      ]
    },
    optimizer: {
      title: '> WORKFLOW_LINKER // DEPLOYED',
      logs: [
        { type: 'system', text: '[SYSTEM] Initializing Workflow Linker...' },
        { type: 'info', text: '[TRIGGER] Event hook active: "Gmail - New incoming message"' },
        { type: 'info', text: '[MAPPING] Linking triggers: Gmail -> Airtable DB -> Slack Alerts' },
        { type: 'processing', text: '[SIMULATE] Injecting trigger event: email subject "Request for AI services"' },
        { type: 'processing', text: '[WRITE] Appending parsed email columns into Airtable DB...' },
        { type: 'success', text: '[AIRTABLE] Row appended. ID: recXyZ1234abc' },
        { type: 'processing', text: '[POST] Forwarding alert hook payload to Slack channel #leads-alerts...' },
        { type: 'success', text: '[SLACK] Message sent: "New Lead Added: Abhinav Verma (AI Agent Inquiry)"' },
        { type: 'success', text: '[SUCCESS] Full automation workflow finished in 520ms.' }
      ]
    }
  };

  useEffect(() => {
    // Run simulation when activeAgent changes
    setPrintedLogs([]);
    const logs = agents[activeAgent].logs;
    let index = 0;
    let timer: any;

    const printNextLine = () => {
      if (index < logs.length) {
        setPrintedLogs(prev => [...prev, logs[index]]);
        index++;
        timer = setTimeout(printNextLine, 400 + Math.random() * 300);
      }
    };

    printNextLine();

    return () => clearTimeout(timer);
  }, [activeAgent]);

  // Scroll to bottom whenever new logs are printed
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [printedLogs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-accent-green';
      case 'incoming': return 'text-amber-400';
      case 'outgoing': return 'text-sky-400';
      case 'processing': return 'text-indigo-400';
      case 'system': return 'text-neutral-500';
      default: return 'text-emerald-400';
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#07070b]/90 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[260px_1fr] glass glass-glow">
      
      {/* Sidebar Controls */}
      <div className="bg-neutral-950/40 border-r border-neutral-800 p-6 flex flex-col gap-6">
        <span className="font-heading font-black text-xs text-neutral-500 tracking-[2px] uppercase">
          Agent Controller
        </span>
        <div className="flex flex-col gap-3">
          {(['whatsapp', 'scraper', 'optimizer'] as const).map(key => (
            <button
              key={key}
              onClick={() => setActiveAgent(key)}
              data-cursor-tag="RUN"
              className={`flex items-center justify-between text-left p-4 rounded-xl font-code text-xs transition-all border ${
                activeAgent === key
                  ? 'border-accent-cyan bg-accent-cyan/5 text-accent-cyan shadow-[0_0_15px_rgba(0,242,254,0.05)]'
                  : 'border-neutral-800 text-neutral-400 bg-neutral-950/20 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <span>{key === 'whatsapp' ? 'WhatsApp Monitor' : key === 'scraper' ? 'Lead Scraper Bot' : 'Workflow Linker'}</span>
              <span className="text-[10px] opacity-60">▶</span>
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-neutral-900 pt-6 font-code text-[11px] text-neutral-500">
          <div>CPU LOAD: 2.4%</div>
          <div className="mt-1">ACTIVE INSTANCES: 3</div>
        </div>
      </div>

      {/* Console screen logs */}
      <div className="flex flex-col h-[400px]">
        {/* Screen Header */}
        <div className="bg-neutral-950/20 border-b border-neutral-800 px-6 py-4 flex items-center justify-between font-code text-xs text-neutral-500">
          <span className="text-accent-cyan text-glow-cyan font-bold">
            {agents[activeAgent].title}
          </span>
          <span className="text-accent-green text-[10px]">IDLE</span>
        </div>

        {/* Console Screen logs list */}
        <div ref={screenRef} className="flex-1 bg-[#020204] p-6 overflow-y-auto font-code text-xs leading-relaxed flex flex-col gap-2">
          <AnimatePresence>
            {printedLogs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={getLogColor(log.type)}
              >
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};
