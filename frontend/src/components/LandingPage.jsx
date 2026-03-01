import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Activity, ArrowRight, Zap, CheckCircle2, Globe, Database, Network } from 'lucide-react';

export default function LandingPage({ onLaunch }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <div className="min-h-screen bg-[#020205] text-[#f0f0f5] overflow-x-hidden font-sans selection:bg-indigo-500/30">

            {/* --- Ambient Background Glares --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
                <motion.div style={{ y: y2 }} className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
            </div>

            {/* --- Elegant Navbar --- */}
            <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#020205]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Aegis AI</span>
                    </div>

                    <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
                        <a href="#platform" className="hover:text-white transition-colors">Platform</a>
                        <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
                        <a href="#security" className="hover:text-white transition-colors">Security</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Log in
                        </button>
                        <button className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
                            Sign up
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative z-10 pt-40 pb-20 md:pt-52 md:pb-32 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-sm font-medium text-indigo-200">Aegis AI is now live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
                >
                    Autonomous Red Teaming.<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                        Infinite Scale.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
                >
                    Aegis AI deploys a swarm of specialized, autonomous agents that test your applications just like a human Red Team would.
                    It doesn't just list vulnerabilities—our Model Council pieces together individual weaknesses to prove catastrophic exploit chains, eliminating false positives and alert fatigue.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
                >
                    <button
                        onClick={onLaunch}
                        className="w-full sm:w-auto group flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span>Deploy Workspace</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all">
                        Book Demo
                    </button>
                </motion.div>

                {/* Abstract Hero Image/Graphic Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                    className="mt-20 w-full max-w-5xl h-[400px] md:h-[600px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm relative overflow-hidden flex items-center justify-center shadow-2xl shadow-indigo-500/10"
                >
                    {/* Decorative elements representing AI Nodes */}
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-indigo-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-48 h-48 border border-purple-500/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>

                    <div className="flex flex-col items-center z-10 w-full max-w-3xl px-8">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl mb-8 shadow-2xl shadow-indigo-500/30">
                            <Shield className="w-12 h-12 text-white" />
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 w-full backdrop-blur-md">
                            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                <span className="font-mono text-sm text-gray-400">Agent Swarm Live View</span>
                                <div className="flex space-x-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                </div>
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                                    <span className="text-indigo-400">Network Agent</span>
                                    <span className="text-gray-400">Scanning Ports...</span>
                                </div>
                                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                                    <span className="text-purple-400">Static Agent</span>
                                    <span className="text-gray-400">Reading Repositories...</span>
                                </div>
                                <div className="flex justify-between items-center bg-indigo-500/20 p-3 rounded-lg border border-indigo-500/30">
                                    <span className="text-white font-bold">Model Council</span>
                                    <span className="text-indigo-300">Synthesizing findings into exploits...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subtle grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
                </motion.div>
            </section>

            {/* --- Platform Interface Showcase --- */}
            <section className="relative z-10 py-24 bg-[#0a0a0f] border-y border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">See It In Action.</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">From autonomous configuration to a final intelligence report, watch how Aegis AI transforms cybersecurity operations.</p>
                    </div>

                    <div className="space-y-32">
                        {/* Step 1: Config */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="md:w-1/2"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 text-xl font-bold mb-6">1</div>
                                <h3 className="text-3xl font-bold mb-4">Define The Attack Surface</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">Enter a target domain, select which specialized AI agents to deploy, and set strict operational boundaries to ensure safe, non-destructive testing.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="md:w-1/2 w-full perspective-1000"
                            >
                                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-indigo-500/10 transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-500">
                                    <img src="/assets/config.png" alt="Configuration Dashboard" className="w-full h-auto object-cover" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Step 2: Swamp */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="md:w-1/2"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 text-xl font-bold mb-6">2</div>
                                <h3 className="text-3xl font-bold mb-4">Live Multi-Agent Telemetry</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">Monitor the swarm in real-time as agents concurrently map networks, fuzzy-test web apps, and analyze repositories, while the Council synthesizes data on the fly.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="md:w-1/2 w-full perspective-1000"
                            >
                                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/10 transform rotate-y-[5deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-500">
                                     <img src="/assets/report.png" alt="Finalized Security Report" className="w-full h-auto object-cover" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Step 3: Report */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="md:w-1/2"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 text-xl font-bold mb-6">3</div>
                                <h3 className="text-3xl font-bold mb-4">Actionable Intelligence</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">Receive a finalized report that maps confirmed exploit combinations instead of endless unrelated warnings. Includes precise remediation protocols for immediate patching.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                                className="md:w-1/2 w-full perspective-1000"
                            >
                                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-emerald-500/10 transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-500">
                                    <img src="/assets/terminal.png" alt="Live Scanning Terminal" className="w-full h-auto object-cover" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Value Prop Sections --- */}
            <section id="platform" className="relative z-10 py-24 bg-black/20 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16 md:mb-24 md:w-2/3">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Security Intelligence,<br />Not Just Scanners.</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">Most tools overwhelm developers with thousands of "Medium" severity CVEs. Aegis AI takes the findings from individual specialized agents and uses a powerful LLM Model Council to actively chain vulnerabilities together, proving real-world risk paths before flagging them.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group">
                            <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <Globe className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Autonomous Agent Swarm</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">Instead of one rigid scanner, we spin up concurrent AI agents holding specialized tools. The Network Agent checks ports while the Static Agent simultaneously combs your configuration files.</p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group">
                            <div className="bg-purple-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                                <Network className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Chaining Exploits via LLM</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">Our <strong>Model Council</strong> correlates data across all agents. It connects a leaked token found by the Static Agent with an open API endpoint discovered by the Network Agent to map a devastating breach.</p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group">
                            <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Zero False-Positive Guarantee</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">Because our agents write and execute benign validation payloads to confirm theories, if a vulnerability appears in your custom Aegis dashboard, it is 100% real and exploitable.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- How it Works / Social Proof --- */}
            <section id="solutions" className="relative z-10 py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Integrated tightly with your engineering velocity.</h2>
                            <div className="space-y-6">
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-6">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold pb-0.5">1</div>
                                        <div className="w-0.5 h-16 bg-white/10 my-2"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="text-xl font-bold mb-2">Connect Your CI/CD</h4>
                                        <p className="text-gray-400">Deploy Aegis AI directly into GitHub Actions, GitLab CI, or run it against staging environments periodically.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-6">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold pb-0.5">2</div>
                                        <div className="w-0.5 h-16 bg-white/10 my-2"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="text-xl font-bold mb-2">Autonomous Agent Dispatch</h4>
                                        <p className="text-gray-400">Upon new code pushes, specialized network, static, and dynamic agents are spun up to probe the exact diff surface.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full">
                                    <div className="flex">
                                        <div className="flex flex-col items-center mr-6">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold pb-0.5">3</div>
                                        </div>
                                        <div className="pb-8">
                                            <h4 className="text-xl font-bold mb-2">Actionable Remediation</h4>
                                            <p className="text-gray-400">Instead of raw generic output, developers receive exact copy-pasteable patches and configuration changes.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="security" className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-3xl opacity-20 rounded-full"></div>
                            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative">
                                <div className="border-b border-white/10 pb-4 mb-4 flex items-center justify-between">
                                    <span className="font-mono text-xs text-gray-400">aegis_council.log</span>
                                    <div className="flex space-x-1.5">
                                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                    </div>
                                </div>
                                <div className="font-mono text-sm space-y-3 opacity-80">
                                    <p className="text-indigo-400">{"{"}</p>
                                    <p className="pl-4 text-gray-300">"status": <span className="text-emerald-400">"verified_chain"</span>,</p>
                                    <p className="pl-4 text-gray-300">"vector_1": <span className="text-yellow-400">"Leaked JWT Secret in Dockerfile"</span>,</p>
                                    <p className="pl-4 text-gray-300">"vector_2": <span className="text-yellow-400">"BOLA in /api/v1/users/{'{'}id{'}'}"</span>,</p>
                                    <p className="pl-4 text-gray-300">"attack_path": <span className="text-white">"Forged admin JWT -&gt; Escalated privileges -&gt; Dumped PII via BOLA"</span>,</p>
                                    <p className="pl-4 text-gray-300">"severity": <span className="text-red-400">"CRITICAL"</span></p>
                                    <p className="text-indigo-400">{"}"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Footer CTA --- */}
            <footer id="pricing" className="relative z-10 border-t border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to secure your infrastructure?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl">Join forward-thinking enterprise security teams actively replacing legacy scanners with autonomous intelligence.</p>
                    <button
                        onClick={onLaunch}
                        className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-xl"
                    >
                        Start Your Free Evaluation
                    </button>
                </div>
                <div className="border-t border-white/5 py-8 text-center text-sm text-gray-500 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                        <Shield className="w-4 h-4" />
                        <span className="font-bold">Aegis AI Inc.</span>
                    </div>
                    <p>© 2026 Aegis AI. All rights reserved. Built for SpeedRun 2026.</p>
                </div>
            </footer>
        </div>
    );
}
