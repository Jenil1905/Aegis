import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Activity, ShieldAlert, Zap, Lock, Database } from 'lucide-react';

const VULNERABILITY_TYPES = [
    { id: 'static_analysis', label: 'Static Analysis & Secrets', desc: 'Scan codebases for hardcoded credentials and CVEs.', icon: <Server className="w-5 h-5 text-indigo-400" /> },
    { id: 'network_scan', label: 'Network & Port Scanning', desc: 'Map open ports and discover misconfigured services.', icon: <Activity className="w-5 h-5 text-indigo-400" /> },
    { id: 'web_dynamic', label: 'Web Dynamic & Fuzzing', desc: 'Active probing for XSS, SQLi, and injection attacks.', icon: <Zap className="w-5 h-5 text-indigo-400" /> },
];

const RESTRICTIONS = [
    { id: 'safe_mode', label: 'Strict Safe Mode (Non-destructive)', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'rate_limit', label: 'Throttle: 5 requests / sec', icon: <Activity className="w-4 h-4" /> },
    { id: 'no_db_writes', label: 'Prohibit Database Mutations', icon: <Database className="w-4 h-4" /> },
];

export default function ConfigForm({ onScanStart }) {
    const [domain, setDomain] = useState('');
    const [selectedVulns, setSelectedVulns] = useState(['static_analysis', 'network_scan']);
    const [selectedRestrictions, setSelectedRestrictions] = useState(['safe_mode', 'no_db_writes']);

    const handleToggle = (setter, list, item) => {
        setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!domain) return;
        onScanStart({ domain, vulnerabilities: selectedVulns, restrictions: selectedRestrictions });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 w-full font-sans">

            {/* Domain Input */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
                <label className="block text-sm font-semibold mb-3 text-gray-300 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-indigo-400" />
                    Target Surface Area
                </label>
                <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden focus-within:border-indigo-500/50 focus-within:bg-indigo-500/5 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300">
                    <div className="px-6 py-5 bg-black/40 border-r border-white/10 flex items-center justify-center">
                        <span className="text-gray-500 font-mono text-sm leading-none">https://</span>
                    </div>
                    <input
                        type="text"
                        className="w-full bg-transparent px-6 py-5 outline-none text-white placeholder-gray-600 font-mono text-lg transition-colors"
                        placeholder="api.production.corp"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Vulnerability Scope */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <label className="block text-sm font-semibold mb-4 text-gray-300 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-indigo-400" />
                        Agent Swarm Scope
                    </label>
                    <div className="space-y-4">
                        {VULNERABILITY_TYPES.map(vuln => {
                            const isSelected = selectedVulns.includes(vuln.id);
                            return (
                                <div
                                    key={vuln.id}
                                    onClick={() => handleToggle(setSelectedVulns, selectedVulns, vuln.id)}
                                    className={`flex items-start p-5 rounded-2xl cursor-pointer border transition-all duration-300 shadow-sm
                    ${isSelected ? 'bg-indigo-500/10 border-indigo-500/40 shadow-indigo-500/10' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}`}
                                >
                                    <div className={`flex-shrink-0 mr-4 p-2 rounded-xl bg-black/40 border ${isSelected ? 'border-indigo-500/30' : 'border-white/5'}`}>
                                        {vuln.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <span className={`block font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                            {vuln.label}
                                        </span>
                                        <span className="block text-xs text-gray-500 leading-relaxed font-medium">
                                            {vuln.desc}
                                        </span>
                                    </div>
                                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all
                    ${isSelected ? 'bg-indigo-500 border-indigo-500 flex' : 'border-white/20'}`}>
                                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Safety Limits */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <label className="block text-sm font-semibold mb-4 text-gray-300 flex items-center">
                        <Lock className="w-4 h-4 mr-2 text-purple-400" />
                        Operational Constraints
                    </label>
                    <div className="space-y-4">
                        {RESTRICTIONS.map(rest => {
                            const isSelected = selectedRestrictions.includes(rest.id);
                            return (
                                <label
                                    key={rest.id}
                                    className={`flex items-center p-5 rounded-2xl cursor-pointer border transition-all duration-300
                     ${isSelected ? 'bg-purple-500/10 border-purple-500/40' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}`}
                                >
                                    <div className={`w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center mr-4 transition-all
                     ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20 bg-black/40'}`}>
                                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                    </div>
                                    <div className="flex items-center text-sm font-medium">
                                        <span className={`mr-2 ${isSelected ? 'text-purple-300' : 'text-gray-500'}`}>{rest.icon}</span>
                                        <span className={`${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                            {rest.label}
                                        </span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="pt-8"
            >
                <button
                    type="submit"
                    className="w-full relative overflow-hidden group bg-white text-black font-bold text-lg py-5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:bg-gray-100"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="flex items-center justify-center relative z-10">
                        Deploy Autonomous Swarm
                        <Zap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                    </span>
                </button>
            </motion.div>
        </form>
    );
}

// Need to import Globe locally as it wasn't in original
import { Globe } from 'lucide-react';
