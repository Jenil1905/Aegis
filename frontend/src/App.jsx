import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ConfigForm from './components/ConfigForm';
import TerminalScanner from './components/TerminalScanner';
import ReportDashboard from './components/ReportDashboard';
import { Shield } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState('landing');
  const [config, setConfig] = useState(null);
  const [reportData, setReportData] = useState(null);

  const handleLaunch = () => setAppState('config');

  const startScan = (scanConfig) => {
    setConfig(scanConfig);
    setAppState('scanning');

    // Call the FastAPI Backend asynchronously without blocking the state update
    fetch('/api/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(scanConfig)
    })
      .then(res => res.json())
      .then(data => {
        setConfig(prev => ({ ...prev, jobId: data.job_id }));
      })
      .catch(e => {
        console.error("Backend not reachable. Ensure FastAPI is running on port 8000.");
      });
  };

  const resetScan = () => {
    setAppState('config');
    setConfig(null);
    setReportData(null);
  };

  const handleScanComplete = (findings) => {
    setReportData(findings);
    setAppState('report');
  };

  if (appState === 'landing') {
    return <LandingPage onLaunch={handleLaunch} />;
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 md:p-8 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Background gradients for premium feel */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Navigation / Branding */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-20 pt-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setAppState('landing')}>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Aegis AI
          </span>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setAppState('landing')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
            Exit Workspace
          </button>
        </div>
      </nav>

      <div className="z-10 w-full max-w-5xl flex-grow flex flex-col justify-center pb-20">

        <div className="glass-card p-6 md:p-12 rounded-3xl w-full relative overflow-hidden transition-all duration-500">

          {appState === 'config' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-10">
                <h2 className="text-3xl font-semibold mb-2 tracking-tight">Configure Autonomous Scan</h2>
                <p className="text-gray-400">Define the attack surface and set operational boundaries.</p>
              </div>
              <ConfigForm onScanStart={startScan} />
            </div>
          )}

          {appState === 'scanning' && (
            <div className="animate-in fade-in zoom-in-95 duration-700">
              <TerminalScanner config={config} onScanComplete={handleScanComplete} />
            </div>
          )}

          {appState === 'report' && (
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <ReportDashboard onReset={resetScan} reportData={reportData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
