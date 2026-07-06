import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-underline-text-one';

export const BentoAbout: React.FC = () => {
  const skills = ['Python', 'JavaScript', 'TypeScript', 'Prompt Engineering', 'LangChain', 'n8n', 'Make.com', 'Web Scraping', 'Local APIs'];
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Animated Header using AnimatedText */}
        <div className="md:col-span-2 glass glass-glow rounded-2xl p-8 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="text-[10px] font-code text-neutral-500 tracking-[3px] uppercase mb-4">// System Profile</div>
            <AnimatedText
              text="ABHINAV VERMA"
              textClassName="text-4xl sm:text-5xl font-heading font-black tracking-wider text-left text-white"
              underlineClassName="text-accent-cyan"
              underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
              underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
              underlineDuration={1.8}
              className="items-start"
            />
          </div>
          <p className="text-neutral-400 text-sm mt-6 leading-relaxed">
            I am a software engineer obsessed with automation. I construct autonomous AI systems, design prompt networks, and connect local services (like WhatsApp API chains) to put repetitive tasks on complete autopilot.
          </p>
        </div>

        {/* Box 2: Quick Specs */}
        <div className="glass glass-glow rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-code text-neutral-500 tracking-[3px] uppercase mb-4">// Core Stack</div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Technical Focus</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Leveraging advanced LLM prompts, local server hooks, and multi-agent workflows to optimize workflows.
            </p>
          </div>
          <div className="mt-4 flex gap-2 font-code text-xs text-accent-cyan">
            <span>[ python ]</span>
            <span>[ typescript ]</span>
          </div>
        </div>

        {/* Box 3: Tech Stack tags */}
        <div className="glass glass-glow rounded-2xl p-8 md:col-span-3">
          <div className="text-[10px] font-code text-neutral-500 tracking-[3px] uppercase mb-4">// Technologies & Frameworks</div>
          <h3 className="font-heading font-bold text-lg text-white mb-4">Autonomous Toolset</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05, borderColor: 'var(--accent-cyan)' }}
                className="px-4 py-2 border border-neutral-800 rounded-md font-code text-xs text-neutral-300 bg-neutral-950/40 cursor-default"
                data-cursor-tag="TECH"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Box 4: Future learning path */}
        <div className="glass glass-glow rounded-2xl p-8 md:col-span-2">
          <div className="text-[10px] font-code text-neutral-500 tracking-[3px] uppercase mb-4">// Next Modules</div>
          <h3 className="font-heading font-bold text-lg text-white mb-4">Eager to Learn & Master</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-400">
            <div className="flex items-start gap-2">
              <span className="text-accent-cyan mt-1">▶</span>
              <span>Multi-agent orchestration engines (CrewAI, AutoGen) for distributed processing.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-cyan mt-1">▶</span>
              <span>Advanced cloud workflow platforms (n8n self-hosted, Make API integrations).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-cyan mt-1">▶</span>
              <span>Vector databases, semantic searching, and agentic memory synchronization.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-cyan mt-1">▶</span>
              <span>Commercial deployment models to provide automation agents as a service.</span>
            </div>
          </div>
        </div>

        {/* Box 5: Node Status */}
        <div className="glass glass-glow rounded-2xl p-8 flex flex-col justify-between bg-gradient-to-br from-neutral-950/60 to-purple-950/10">
          <div>
            <div className="text-[10px] font-code text-neutral-500 tracking-[3px] uppercase mb-4">// System Status</div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Nodes Active</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Connected and serving automation queries on local socket connections.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse shadow-[0_0_10px_#39ff14]" />
            <span className="font-code text-xs text-neutral-400 tracking-wider">ALL CLIENT WORKERS ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
