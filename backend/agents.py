import os
import time
from typing import List, Dict, Any
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
load_dotenv()

# We use OpenRouter via Langchain's ChatOpenAI wrapper
def get_llm():
    return ChatOpenAI(
        model=os.getenv("LLM_MODEL", "meta-llama/llama-3.1-8b-instruct"),
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        max_tokens=1500, # Lowered to accommodate current 1854 token balance
        default_headers={"HTTP-Referer": "http://localhost:5173", "X-Title": "Aegis AI Hackathon MVP"}
    )

class BaseAgent:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.llm = get_llm()

    def run(self, target: str, restrictions: List[str]) -> Dict[str, Any]:
        """Base method for agents to run their analysis"""
        return {}

# --- 1. Mock MCP Servers (Tools) ---
# In a real app these would connect via MCP protocol. We mock them for safety and speed.

def mock_nmap_scan(target: str) -> str:
    time.sleep(1.5)
    return f"""
    Starting Nmap 7.93 ( https://nmap.org )
    Nmap scan report for {target} (192.168.1.100)
    Host is up (0.014s latency).
    Not shown: 997 closed tcp ports (reset)
    PORT     STATE SERVICE
    22/tcp   open  ssh
    80/tcp   open  http
    8080/tcp open  http-proxy
    Nmap done: 1 IP address (1 host up) scanned in 1.45 seconds
    """

def mock_git_scan(target: str) -> str:
    time.sleep(1.2)
    return f"""
    [TruffleHog] Searching active directory...
    Found 1 high entropy string.
    File: .env
    Commit: Initial commit
    Match: -----BEGIN RSA PRIVATE KEY-----...
    Validating key... KEY IS ACTIVE.
    """

def mock_dynamic_scan(target: str) -> str:
    time.sleep(2.0)
    return f"""
    [ZAP Fuzzer] Target: http://{target}/api/admin/users
    Payload: ' OR 1=1 --
    Response Code: 401 Unauthorized
    Payload: JWT Token omitting signature
    Response Code: 401 Unauthorized
    Payload: Direct GET without Bearer Token
    Response Code: 200 OK (Data returned)
    WARNING: Unauthenticated BOLA detected on /api/admin/*
    """

# --- 2. AI Agents ---

class NetworkAgent(BaseAgent):
    def __init__(self):
        super().__init__("NetworkAgent", "Map ports and discover misconfigured services.")
        
    def run(self, target: str, restrictions: List[str]) -> Dict[str, Any]:
        print(f"[{self.name}] Connecting to mock MCP Server: Nmap...")
        raw_output = mock_nmap_scan(target)
        
        prompt = PromptTemplate(
            input_variables=["output"],
            template="You are a Network Security Expert. Extract actionable vulnerabilities from this raw nmap output. Output JSON ONLY with keys: title, description, raw_evidence. \n{output}"
        )
        
        # In a real app, we'd invoke the LLM safely with JSON parsing.
        # For this hackathon demo, we will simulate the LLM parsing to guarantee a reliable demo flow.
        return {
            "source": self.name,
            "raw_output": raw_output,
            "findings": [
                {"title": "Open SSH Port", "description": "Port 22 is exposed to the public internet.", "raw_evidence": "22/tcp open ssh"}
            ]
        }

class StaticAnalysisAgent(BaseAgent):
    def __init__(self):
        super().__init__("StaticAnalysisAgent", "Scan codebase for hardcoded secrets.")
        
    def run(self, target: str, restrictions: List[str]) -> Dict[str, Any]:
        print(f"[{self.name}] Connecting to mock MCP Server: TruffleHog...")
        raw_output = mock_git_scan(target)
        return {
            "source": self.name,
            "raw_output": raw_output,
            "findings": [
                {"title": "Leaked RSA Key", "description": "High entropy private key found in .env.", "raw_evidence": "-----BEGIN RSA PRIVATE KEY-----"}
            ]
        }


class DynamicWebAgent(BaseAgent):
    def __init__(self):
        super().__init__("DynamicWebAgent", "Scan APIs for BOLA, XSS, and SQLi.")
        
    def run(self, target: str, restrictions: List[str]) -> Dict[str, Any]:
        print(f"[{self.name}] Connecting to real MCP Server: OWASP ZAP (127.0.0.1:8081)")
        zap_api_base = "http://127.0.0.1:8081"
        
        # We enforce "Safe Mode" by only doing a Passive Spider instead of Active Scan if "safe_mode" is in restrictions
        # For a hackathon demo, we will attempt to trigger the ZAP spider.
        
        try:
            # 1. Trigger the ZAP Spider
            start_url = f"http://juice-shop:3000" if "juice-shop" in target.lower() else target
            print(f"[{self.name}] Instructing ZAP to spider target: {start_url} ...")
            spider_res = requests.get(f"{zap_api_base}/JSON/spider/action/scan/", params={"url": start_url}, timeout=3)
            spider_id = spider_res.json().get("scan")
            
            # Wait a few seconds for spider to grab some URLs
            time.sleep(5) 
            
            # 2. Get the Alerts (Vulnerabilities)
            alerts_res = requests.get(f"{zap_api_base}/JSON/core/view/alerts/", params={"baseurl": start_url})
            alerts = alerts_res.json().get("alerts", [])
            
            # 3. Parse findings into our standard schema
            parsed_findings = []
            for alert in alerts[:5]:  # Limit to top 5 for demo speed
                parsed_findings.append({
                    "title": alert.get("name"),
                    "description": alert.get("description"),
                    "raw_evidence": alert.get("evidence", "No explicit evidence")
                })
                
            if not parsed_findings:
                 parsed_findings.append({"title": "No vulnerabilities found yet", "description": "The spider may still be running or the application is clean.", "raw_evidence": ""})

            return {
                 "source": self.name,
                 "raw_output": f"ZAP successfully spidered {start_url} and found {len(alerts)} underlying alerts.",
                 "findings": parsed_findings
            }
            
        except Exception as e:
            print(f"[{self.name}] Could not reach ZAP Docker container. Falling back to Mock Mocks. Error: {e}")
            raw_output = mock_dynamic_scan(target)
            return {
                 "source": self.name + " (Mock Fallback)",
                 "raw_output": raw_output,
                 "findings": [
                     {"title": "Unauthenticated API Access", "description": "Admin endpoint accessible without token validation.", "raw_evidence": "Response Code: 200 OK"}
                 ]
            }
