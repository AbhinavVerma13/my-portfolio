// Cursor spotlight effect and Bento Card mouse tracking
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Set global radial gradient mouse position
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    
    // Set local bento card mouse positions for hover overlays
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const localX = x - rect.left;
        const localY = y - rect.top;
        card.style.setProperty('--mouse-x', `${localX}px`);
        card.style.setProperty('--mouse-y', `${localY}px`);
    });
});

// Hero Terminal simulator (auto adding lines to make it feel alive)
const heroTerminal = document.getElementById('hero-terminal');
const extraLogs = [
    { type: 'cmd', text: 'python run_local_agent.py --module whatsapp' },
    { type: 'info', text: '[Core] Initializing LLM chain connectors...' },
    { type: 'info', text: '[Core] Loading system prompt parameters...' },
    { type: 'success', text: '[Success] Connection established with Render.com dashboard.' },
    { type: 'cmd', text: 'ping -c 2 https://ai-startup-agent-0jge.onrender.com/' },
    { type: 'info', text: '64 bytes from 21st.dev: icmp_seq=1 ttl=56 time=18.4 ms' },
    { type: 'success', text: 'Host online. System fully synchronized.' },
];

let logIndex = 0;
function appendHeroLog() {
    if (logIndex < extraLogs.length) {
        const log = extraLogs[logIndex];
        const line = document.createElement('div');
        line.className = `terminal-line ${log.type}`;
        if (log.type === 'cmd') {
            line.innerHTML = `abhinav@agent:~$ ${log.text}`;
        } else {
            line.textContent = log.text;
        }
        heroTerminal.appendChild(line);
        heroTerminal.scrollTop = heroTerminal.scrollHeight;
        logIndex++;
        // Speed up initial logs, slow down later ones
        setTimeout(appendHeroLog, logIndex % 2 === 0 ? 1800 : 800);
    }
}
// Start appending hero logs after 1.5s
setTimeout(appendHeroLog, 1500);

// Interactive Console Widget Scripts
const consoleTitle = document.getElementById('console-title');
const consoleScreen = document.getElementById('console-screen');

const agentData = {
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

function runAgentSimulation(agentKey) {
    const data = agentData[agentKey];
    consoleTitle.textContent = data.title;
    consoleScreen.innerHTML = ''; // clear
    
    let index = 0;
    function printNextLine() {
        if (index < data.logs.length) {
            const log = data.logs[index];
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            // Map types to styling colors
            if (log.type === 'success') {
                line.style.color = 'var(--accent-green)';
            } else if (log.type === 'incoming') {
                line.style.color = '#fbbf24'; // amber
            } else if (log.type === 'outgoing') {
                line.style.color = '#38bdf8'; // light blue
            } else if (log.type === 'processing') {
                line.style.color = '#818cf8'; // purple/indigo
            } else if (log.type === 'system') {
                line.style.color = '#94a3b8'; // grey
            } else {
                line.style.color = '#10b981'; // green default
            }
            
            line.textContent = log.text;
            consoleScreen.appendChild(line);
            consoleScreen.scrollTop = consoleScreen.scrollHeight;
            index++;
            setTimeout(printNextLine, 500 + Math.random() * 500); // realistic variance
        }
    }
    printNextLine();
}

// Controller button listeners
const buttons = {
    whatsapp: document.getElementById('btn-whatsapp'),
    scraper: document.getElementById('btn-scraper'),
    optimizer: document.getElementById('btn-optimizer')
};

Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener('click', () => {
        // Toggle active button style
        Object.values(buttons).forEach(btn => btn.classList.remove('active'));
        buttons[key].classList.add('active');
        
        // Run agent logs
        runAgentSimulation(key);
    });
});

// Auto-run first simulation on page load
setTimeout(() => {
    runAgentSimulation('whatsapp');
}, 800);
