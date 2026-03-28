export interface AnalyzeRequest {
  message: string;
}

export interface AnalyzeResponse {
  is_phishing: boolean;
  confidence: number;
  alert: string;
}

export interface AnalysisRecord extends AnalyzeResponse {
  id: string;
  message: string;
  timestamp: number;
}
