from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uuid

# Import our custom logic
from agents import NetworkAgent, StaticAnalysisAgent, DynamicWebAgent
from council import ModelCouncil

app = FastAPI(title="Aegis AI Red Team Platform API")

# Setup CORS for the Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database for job storage (Mocking a real DB like Postgres)
JOBS_DB: Dict[str, Dict[str, Any]] = {}

class ScanRequest(BaseModel):
    domain: str
    vulnerabilities: List[str]
    restrictions: List[str]

# --- Background Task to run the AI Pipeline ---
def run_autonomous_scan(job_id: str, request: ScanRequest):
    print(f"\n--- [SYSTEM] Starting Autonomous Scan on Target: {request.domain} ---")
    active_agents = []
    
    # 1. Dispatch correct agents based on user selection
    if "network_scan" in request.vulnerabilities:
        active_agents.append(NetworkAgent())
    if "static_analysis" in request.vulnerabilities:
        active_agents.append(StaticAnalysisAgent())
    if "web_dynamic" in request.vulnerabilities:
        active_agents.append(DynamicWebAgent())
        
    if not active_agents:
        JOBS_DB[job_id]["status"] = "failed"
        JOBS_DB[job_id]["error"] = "No valid agent categories selected."
        return

    # 2. Run Agents (In a real scenario, this would be highly concurrent (asyncio/threading))
    # We do sequentially here for simpler console logging tracing during demo
    all_findings = []
    for agent in active_agents:
        try:
            agent_result = agent.run(target=request.domain, restrictions=request.restrictions)
            all_findings.append(agent_result)
        except Exception as e:
            print(f"[Error in {agent.name}]: {str(e)}")

    # 3. Model Council Analysis Phase
    council = ModelCouncil()
    final_report = council.aggregate_and_analyze(all_findings)
    
    # 4. Save to DB
    JOBS_DB[job_id]["status"] = "completed"
    JOBS_DB[job_id]["findings"] = final_report
    print(f"--- [SYSTEM] Scan Job {job_id} Completed successfully ---\n")

# --- API Endpoints ---

@app.post("/api/scan")
async def start_scan(request: ScanRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    JOBS_DB[job_id] = {
        "status": "scanning",
        "domain": request.domain,
        "findings": []
    }
    
    # Run the heavy agent pipeline in the background so API responds immediately to frontend
    background_tasks.add_task(run_autonomous_scan, job_id, request)
    
    return {"status": "scanning", "job_id": job_id, "message": f"Dispatched Aegis swarm to {request.domain}"}

@app.get("/api/report/{job_id}")
async def get_report(job_id: str):
    if job_id not in JOBS_DB:
        raise HTTPException(status_code=404, detail="Job ID not found")
        
    job_record = JOBS_DB[job_id]
    
    if job_record["status"] == "scanning":
         return {"status": "scanning", "message": "Council is still analyzing telemetry."}
         
    if job_record["status"] == "failed":
         return {"status": "failed", "message": job_record.get("error", "Unknown error occurred.")}
         
    return {"status": "completed", "findings": job_record["findings"]}

@app.get("/")
def read_root():
    return {"message": "Aegis AI Orchestrator Core is online"}
