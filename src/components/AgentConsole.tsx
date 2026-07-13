import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogLine {
  type: 'system' | 'success' | 'incoming' | 'outgoing' | 'processing' | 'info';
  text: string;
}

interface AgentData {
  title: string;
  label: string;
  logs: LogLine[];
}

type AgentKey = 'whatsapp' | 'startup' | 'helpdesk' | 'twin';

export const AgentConsole: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<AgentKey>('whatsapp');
  const [printedLogs, setPrintedLogs] = useState<LogLine[]>([]);
  const screenRef = useRef<HTMLDivElement>(null);
  
  const agents: Record<AgentKey, AgentData> = {
    whatsapp: {
      title: '> WHATSAPP_TRAVEL_AGENT // ACTIVE',
      label: 'WhatsApp Travel Agent',
      logs: [
        { type: 'system', text: '[SYSTEM] Initializing WhatsApp Travel Agent...' },
        { type: 'system', text: '[SYSTEM] Checking credentials & active WhatsApp session...' },
        { type: 'success', text: '[SUCCESS] WhatsApp Cloud API webhook listener connected.' },
        { type: 'info', text: '[LISTENING] Awaiting incoming travel requests (#plan)...' },
        { type: 'incoming', text: '[INCOMING] Message from +91-98765-43210: "#plan Lucknow to Goa for 3 days budget 20k"' },
        { type: 'processing', text: '[AI] Parsing request & compiling flight and hotel itineraries...' },
        { type: 'outgoing', text: '[OUTGOING] Reply sent: "Your itinerary for Goa is ready! Estimated cost: ₹18,500. Flights checked..."' }
      ]
    },
    startup: {
      title: '> AI_STARTUP_AGENT // STANDBY',
      label: 'AI Startup Agent',
      logs: [
        { type: 'system', text: '[SYSTEM] Booting AI Startup Agent Blueprinting Engine...' },
        { type: 'info', text: '[CONFIG] Analyzing target market: SaaS & AI Tools' },
        { type: 'processing', text: '[CRUNCHBASE] Querying latest funding rounds and valuation multiples...' },
        { type: 'processing', text: '[COMPETITORS] Analyzing competitor products and marketing strategies...' },
        { type: 'success', text: '[SUCCESS] Generated 5-year financial model & pricing tiers.' },
        { type: 'info', text: '[EXPORT] Compiling full slide deck & pitch deck to PDF...' },
        { type: 'success', text: '[SUCCESS] Business blueprint ready for download.' }
      ]
    },
    helpdesk: {
      title: '> SRMCEM_AI_HELPDESK // ONLINE',
      label: 'SRMCEM AI Helpdesk',
      logs: [
        { type: 'system', text: '[SYSTEM] Connecting SRMCEM College Knowledge base...' },
        { type: 'info', text: '[VECTOR_DB] Indexing 1,200+ PDF documents (hostels, syllabus, fees)...' },
        { type: 'success', text: '[SUCCESS] Semantic search index populated on Pinecone Vector Store.' },
        { type: 'incoming', text: '[INCOMING] Student Query: "What is the fee structure for B.Tech CS?"' },
        { type: 'processing', text: '[SEARCH] Performing vector search over college knowledge base...' },
        { type: 'outgoing', text: '[OUTGOING] Reply sent: "B.Tech CS tuition fee is ₹1,12,000 per year. Exam fees..."' },
        { type: 'success', text: '[SUCCESS] Answer streamed with 99.4% confidence score.' }
      ]
    },
    twin: {
      title: '> AI_DIGITAL_TWIN // STANDBY',
      label: 'AI Digital Twin',
      logs: [
        { type: 'system', text: '[SYSTEM] Booting Abhinav Verma\'s AI Digital Twin...' },
        { type: 'info', text: '[KNOWLEDGE] Loading professional CV, project history, and tech stack info...' },
        { type: 'info', text: '[WIDGET] Live recruiter screening chat active.' },
        { type: 'incoming', text: '[INCOMING] Recruiter Query: "Do you have experience with n8n and Python?"' },
        { type: 'processing', text: '[TWIN] Generating response matching Abhinav\'s actual portfolio...' },
        { type: 'outgoing', text: '[OUTGOING] Reply: "Yes! Abhinav builds advanced n8n workflows for data routing and OpenAI integrations..."' },
        { type: 'success', text: '[SUCCESS] Recruiter screening chat logs parsed and saved.' }
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
        const nextLog = logs[index];
        setPrintedLogs(prev => [...prev, nextLog]);
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
          {(['whatsapp', 'startup', 'helpdesk', 'twin'] as const).map(key => (
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
              <span>{agents[key].label}</span>
              <span className="text-[10px] opacity-60">▶</span>
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-neutral-900 pt-6 font-code text-[11px] text-neutral-500">
          <div>CPU LOAD: 2.4%</div>
          <div className="mt-1">ACTIVE INSTANCES: 4</div>
        </div>
      </div>

      {/* Console screen logs */}
      <div className="flex flex-col h-[400px]">
        {/* Screen Header */}
        <div className="bg-neutral-950/20 border-b border-neutral-800 px-6 py-4 flex items-center justify-between font-code text-xs text-neutral-500">
          <span className="text-accent-cyan text-glow-cyan font-bold">
            {agents[activeAgent].title}
          </span>
          <span className="text-accent-green text-[10px]">ACTIVE</span>
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
