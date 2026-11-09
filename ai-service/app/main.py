
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="SiamHub WMS AI Service",
    version="1.0.0"
)

class AnalyzeRequest(BaseModel):
    product_id: str
    description: str

@app.get("/health")
def health():
    return {
        "status": "success",
        "message": "SiamHub AI Service is running"
    }

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    return {
        "product_id": request.product_id,
        "status": "received",
        "message": "AI model not implemented yet"
    }
