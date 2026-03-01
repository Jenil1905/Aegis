import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Cpu, Globe, ArrowRight } from 'lucide-react';

const STATIC_LOGS = [
    { text: "Executing secure code analysis container...", type: "system" },
    { text: "Mapping repository topology & dependency graphs...", type: "info" },
    { text: "Analyzing configuration files for hardcoded secrets.", type: "info" },
    { text: "FLAG: High entropy RSA key signature detected in environment variables.", type: "warning" },
    { text: "Static layer analysis successfully completed.", type: "success" }
];

const NETWORK_LOGS = [
    { text: "Initiating stealth port discovery protocol...", type: "system" },
    { text: "Mapping top 1000 TCP/UDP service endpoints...", type: "info" },
    { text: "Port 22/tcp (ssh) - OPEN (OpenSSH 8.2p1)", type: "warning" },
    { text: "Port 80/tcp (http) - OPEN", type: "info" },
    { text: "Port 8080/tcp (http-proxy) - OPEN", type: "info" },
    { text: "Validating anonymous login perimeter on Port 22...", type: "info" },
    { text: "CRITICAL ALERT: Anonymous SSH authentication permitted.", type: "alert" },
];

const COUNCIL_LOGS = [
    { text: "Model Council: Synthesizing telemetry from active agents...", type: "council" },
    { text: "Model Council: Correlating RSA key signature with Port 22 access vector...", type: "council" },
    { text: "Model Council: HYPOTHESIS GENERATED -> Root Remote Code Execution.", type: "council" },
    { text: "Dispatching ephemeral validation agent to confirm hypothesis...", type: "council" },
    { text: "Validation Agent: Exploit path confirmed. Payload executed benignly.", type: "alert" },
    { text: "Aegis AI: Terminating scan sequence. Compiling intelligence report.", type: "system" }
];

export default function TerminalScanner({ config, onScanComplete }) {
    const [logs, setLogs] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        let currentLog = 0;
        const allLogs = [];

        allLogs.push({ text: `Establishing secure uplink to: ${config?.domain || 'Target'}`, type: "system" });
        allLogs.push({ text: `Active security clusters deployed: ${config?.vulnerabilities?.length || 0}`, type: "system" });

        if (config?.vulnerabilities?.includes('static_analysis')) allLogs.push(...STATIC_LOGS);
        if (config?.vulnerabilities?.includes('network_scan')) allLogs.push(...NETWORK_LOGS);

        allLogs.push(...COUNCIL_LOGS);

        // Simulated visual log feed for the demo effect
        const animationInterval = setInterval(() => {
            if (currentLog < allLogs.length) {
                const logToPush = allLogs[currentLog];
                if (logToPush) {
                    setLogs(prev => [...prev, logToPush]);
                }
                currentLog++;
            } else {
                clearInterval(animationInterval);
            }
        }, 500);

        return () => clearInterval(animationInterval);
    }, []); // Run animation only once on mount

    useEffect(() => {
        // Actual Backend Polling Logic
        const pollBackendInterval = setInterval(async () => {
            if (!config?.jobId) return; // Wait until API responds with Job ID

            try {
                const res = await fetch(`/api/report/${config.jobId}`);
                if (!res.ok) return;

                const data = await res.json();

                if (data.status === 'completed') {
                    clearInterval(pollBackendInterval);
                    // Wait briefly after logs finish before transitioning
                    setTimeout(() => {
                        onScanComplete(data.findings);
                    }, 1500);
                } else if (data.status === 'failed') {
                    clearInterval(pollBackendInterval);
                    console.error("Backend scan failed:", data.message);
                }
            } catch (err) {
                // Backend not running / connection refused
            }
        }, 2000);

        return () => clearInterval(pollBackendInterval);
    }, [config?.jobId, onScanComplete]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getLogStyle = (type) => {
        switch (type) {
            case 'warning': return 'text-amber-400 font-medium';
            case 'alert': return 'text-rose-500 font-bold';
            case 'success': return 'text-emerald-400 font-medium';
            case 'council': return 'text-indigo-300 font-medium border-l-2 border-indigo-500/50 pl-3 ml-2';
            case 'system': return 'text-white/40 font-mono text-xs tracking-wider uppercase';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="w-full bg-[#030308] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[550px] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 bg-white/[0.02] border-b border-white/5 backdrop-blur-md relative z-10">
                <div className="flex items-center space-x-6 text-sm font-semibold text-gray-500">
                    <span className="flex items-center text-indigo-400"><Activity className="w-4 h-4 mr-2" /> AEGIS_CORE</span>
                    <span className="flex items-center"><Globe className="w-4 h-4 mr-2" /> DATA_STREAM</span>
                    <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> VERIFICATION</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="animate-pulse w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">Live Telemetry</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto flex-grow font-sans text-[15px] leading-relaxed relative z-10 custom-scrollbar">
                <AnimatePresence>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-4 w-full flex items-start ${getLogStyle(log?.type)}`}
                        >
                            <ArrowRight className="w-4 h-4 shrink-0 mr-4 opacity-30 mt-1" />
                            <span className="break-words">{log?.text || "..."}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <div className="mt-4 flex items-center">
                    <ArrowRight className="w-4 h-4 shrink-0 mr-4 opacity-30" />
                    <span className="animate-pulse block w-2.5 h-5 bg-indigo-500 rounded-sm"></span>
                </div>

                <div ref={bottomRef} className="h-8" />
            </div>

            {/* Bottom Bar */}
            <div className="px-8 py-4 bg-black/40 border-t border-white/5 flex justify-between items-center text-xs font-mono text-gray-500 relative z-10">
                <div className="flex space-x-8">
                    <span>TARGET: {config.domain}</span>
                    <span>LATENCY: 14ms</span>
                </div>
                <div className="flex items-center text-indigo-400/50 space-x-2">
                    <Cpu className="w-3 h-3" />
                    <span>COUNCIL SYNC: 99.8%</span>
                </div>
            </div>
        </div>
    );
}
