import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-underline-text-one';

export const BentoAbout: React.FC = () => {
  const skills = ['JavaScript', 'TypeScript', 'Prompt Engineering', 'LangChain', 'n8n', 'Make.com', 'Web Scraping', 'Local APIs'];
  
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
            <span>[ javascript ]</span>
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

        {/* Box 4: Academic Background Timeline */}
        <div className="glass glass-glow rounded-2xl p-8 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-code text-neutral-500 tracking-[3px] uppercase mb-4">// Academic Background</div>
            <h3 className="font-heading font-bold text-lg text-white mb-6">Education</h3>
            
            <div className="space-y-6">
              <div className="relative pl-6 border-l border-neutral-800">
                <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent-cyan" />
                <h4 className="text-sm font-semibold text-white">Bachelor of Technology (B.Tech)</h4>
                <p className="text-xs text-neutral-400 mt-1">Shri Ramswaroop Memorial College of Engineering and Management (SRMCEM)</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[9px] font-mono tracking-wide uppercase border border-neutral-800 bg-neutral-950/40 text-neutral-400 rounded">
                  AKTU Affiliated
                </span>
              </div>

              <div className="relative pl-6 border-l border-neutral-800">
                <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent-cyan" />
                <h4 className="text-sm font-semibold text-white">Class XII (Senior Secondary)</h4>
                <p className="text-xs text-neutral-400 mt-1">Central Academy Senior Secondary School</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[9px] font-mono tracking-wide uppercase border border-neutral-800 bg-neutral-950/40 text-neutral-400 rounded">
                  CBSE Board
                </span>
              </div>

              <div className="relative pl-6 border-l border-neutral-800">
                <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent-cyan" />
                <h4 className="text-sm font-semibold text-white">Class X (Secondary)</h4>
                <p className="text-xs text-neutral-400 mt-1">Central Academy Senior Secondary School</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[9px] font-mono tracking-wide uppercase border border-neutral-800 bg-neutral-950/40 text-neutral-400 rounded">
                  CBSE Board
                </span>
              </div>
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
