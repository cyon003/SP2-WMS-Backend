const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

export async function checkAIHealth() {
  const response = await fetch(`${AI_SERVICE_URL}/health`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`AI service returned ${response.status}`);
  }

  return response.json();
}