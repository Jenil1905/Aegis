import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Network, Lock, FileCode2, ArrowRight } from 'lucide-react';

const MOCK_FINDINGS = [
    {
        id: 'vuln-1',
        severity: 'CRITICAL',
        title: 'Remote Code Execution Chain Identified',
        description: 'Autonomous agents mapped a multi-step exploit starting with a high-entropy RSA key leaked in a .git environment file, combined with open anonymous SSH access on Port 22.',
        recommendation: 'Disable anonymous SSH access within sshd_config and immediately rotate all exposed RSA keys. Ensure .git directories are stripped from the production build artifact context.',
        icon: <Lock className="w-5 h-5" />
    },
    {
        id: 'vuln-2',
        severity: 'HIGH',
        title: 'Unauthenticated Administrative Endpoint',
        description: 'Network telemetry identified /api/admin/* endpoints accepting requests without required JWT bearer token verification.',
        recommendation: 'Enforce strict RBAC middleware globally on all routes prefixed with /api/admin.',
        icon: <Network className="w-5 h-5" />
    }
];

export default function ReportDashboard({ onReset, reportData }) {
    const displayFindings = reportData && reportData.length > 0 ? reportData : MOCK_FINDINGS;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full font-sans text-[#f0f0f5]"
        >
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-white/10 gap-6">
                <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Scan Complete</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Security Intelligence Report
                    </h2>
                    <p className="text-gray-400 mt-2 text-lg">
                        Aegis AI Council has finalized autonomous verification.
                    </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/20 px-8 py-4 rounded-2xl flex flex-col items-center shadow-2xl shadow-rose-500/5">
                    <span className="text-rose-500 font-bold text-2xl tracking-tight mb-1">
                        {displayFindings.filter(f => f.severity === 'CRITICAL').length} Critical
                    </span>
                    <span className="text-rose-500/70 text-sm font-medium">Verified by Council</span>
                </div>
            </div>

            <div className="space-y-8">
                {displayFindings.map((finding, index) => {
                    const isCritical = finding.severity === 'CRITICAL';
                    const indicatorColor = isCritical ? 'bg-rose-500' : 'bg-amber-500';
                    const badgeClass = isCritical ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20';

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            key={finding.id}
                            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl relative overflow-hidden group hover:bg-white/[0.04] transition-colors"
                        >
                            {/* Premium abstract highlight line */}
                            <div className={`absolute top-0 left-0 w-1 h-full ${indicatorColor}`}></div>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-grow">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                        <span className={`inline-flex items-center px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider border ${badgeClass}`}>
                                            {finding.severity}
                                        </span>
                                        <h3 className="text-2xl font-semibold tracking-tight">{finding.title}</h3>
                                    </div>

                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        {finding.description}
                                    </p>

                                    <div className="bg-[#020205] rounded-2xl p-6 border border-white/5 relative">
                                        <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#020205] px-2 text-xs font-semibold text-indigo-400 uppercase tracking-widest flex items-center">
                                            <FileCode2 className="w-3 h-3 mr-2" />
                                            Remediation Protocol
                                        </div>
                                        <p className="text-gray-300 leading-relaxed font-medium">
                                            {finding.recommendation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-12 text-center pt-8 border-t border-white/5">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onReset}
                    className="group inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg tracking-wide hover:bg-indigo-50 transition-colors shadow-2xl"
                >
                    <span>Return to Workspace</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </motion.div>
    );
}
