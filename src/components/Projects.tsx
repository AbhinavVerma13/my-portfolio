import React from 'react';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const projectList = [
    {
      title: 'AI Startup Builder Agent',
      status: 'ACTIVE // DEPLOYED',
      statusType: 'active',
      desc: 'An intelligent, agentic platform that translates raw business concepts into ready-to-launch product outlines, structure maps, and tasks in minutes.',
      link: 'https://ai-startup-agent-0jge.onrender.com/',
      linkLabel: 'Live Web App',
      image: '/ai_startup_agent_mockup.png',
      tag: 'WEBAPP'
    },
    {
      title: 'Local WhatsApp AI Agent',
      status: 'RUNNING // LOCALHOST',
      statusType: 'local',
      desc: 'A custom, locally hosted assistant integrated directly with WhatsApp. It parses queries, manages task states, and responds autonomously via custom prompt logic.',
      link: 'https://github.com/AbhinavVerma13',
      linkLabel: 'Source Code',
      image: '/whatsapp_agent_mockup.png',
      tag: 'LOCAL'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {projectList.map((project, idx) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl glass glass-glow min-h-[460px]"
        >
          {/* Card Image Header */}
          <div className="relative w-full h-52 overflow-hidden border-b border-neutral-800 bg-neutral-950">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent z-10" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                // Fallback elegant graphic in case images are loading
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Visual backup graphic */}
            <div className="absolute inset-0 flex items-center justify-center font-code text-xs text-neutral-600 opacity-20 pointer-events-none select-none">
              [ AGENTIC_INTERFACE_MOCKUP ]
            </div>
            
            {/* Overlay Tag */}
            <span className="absolute top-4 right-4 z-20 px-2 py-1 rounded bg-neutral-950/80 border border-neutral-800 font-code text-[10px] text-accent-cyan">
              {project.tag}
            </span>
          </div>

          {/* Card Body */}
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              {/* Status Dot Header */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`w-2 h-2 rounded-full ${
                    project.statusType === 'active' ? 'bg-accent-green shadow-[0_0_8px_#39ff14]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                  }`}
                />
                <span className="font-code text-[10px] text-neutral-500 tracking-wider">
                  {project.status}
                </span>
              </div>

              <h3 className="font-heading font-black text-xl text-white mb-3 tracking-wide">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Links footer */}
            <div className="mt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-tag={project.statusType === 'active' ? 'LAUNCH' : 'SOURCE'}
                className="inline-flex items-center gap-2 text-xs font-code font-bold text-accent-cyan hover:text-white transition-colors group/link"
              >
                <span>{project.linkLabel}</span>
                <span className="group-hover/link:translate-x-1 transition-transform">➔</span>
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
