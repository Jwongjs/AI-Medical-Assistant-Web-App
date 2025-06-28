// src/types/medical.ts - EXACT match with medical_schemas.py

// Matches WorkflowPathType from backend
export type WorkflowPathType = 
  | "textual_only"           // Instance 1: Direct textual analysis
  | "textual_to_image"       // Instance 2: Textual -> Image
  | "textual_to_followup"    // Instance 3 & 4: Textual -> Follow-up (start)
  | "followup_only"          // Instance 3: Follow-up -> Overall analysis
  | "followup_to_image";     // Instance 4: Follow-up -> Image -> Overall analysis

// Matches TextualSymptomAnalysisResult exactly
export interface TextualSymptomAnalysisResult {
  text_diagnosis: string;
  diagnosis_confidence: number;
}

// Matches SkinLesionImageAnalysisResult exactly
export interface SkinLesionImageAnalysisResult {
  image_diagnosis?: string | null;
  confidence_score?: Record<string, number> | null;
}

// Matches OverallAnalysisResult exactly
export interface OverallAnalysisResult {
  final_diagnosis: string;
  final_confidence: number;
  final_severity: string;  // mild/moderate/severe/critical/emergency
  reasoning: string;       // Medical justification
  specialist_recommendation: string; // For Google Maps integration
}

// Matches HealthcareRecommendationResult exactly
export interface HealthcareRecommendationResult {
  recommendation_type: string;
  self_care_advice?: string[] | null;
  specialist_type?: string | null;
  nearby_facilities?: Record<string, any>[] | null;
  facility_search_radius?: string | null;
  emergency_contacts?: Record<string, string>[] | null;
  appointment_urgency?: string | null;
  insurance_guidance?: string[] | null;
  rag_evidence?: string[] | null;
  telemedicine_options?: Record<string, any>[] | null;
  cost_estimates?: Record<string, string> | null;
}

// Matches AgentState exactly - THIS IS CRITICAL!
export interface AgentState {
  // Required fields
  session_id: string;
  latest_user_message: string;
  image_required: boolean;
  
  // Optional workflow control
  current_workflow_stage?: string | null;
  workflow_path?: WorkflowPathType[] | null;
  image_input?: string | null;
  user_location?: Record<string, number> | null; // { lat: number, lng: number }
  
  // STAGE 1: Textual Symptom Analysis
  userInput_symptoms?: string | null;
  textual_analysis?: TextualSymptomAnalysisResult[] | null;
  average_confidence?: number | null;
  
  // Follow-up stage (if required based on confidence)
  requires_user_input?: boolean | null;
  followup_questions?: string[] | null;
  followup_response?: Record<string, string> | null;
  followup_qna?: Record<string, string> | null;
  followup_diagnosis?: TextualSymptomAnalysisResult[] | null;
  
  // STAGE 2: Skin Lesion Image Analysis (Optional)
  userInput_skin_symptoms?: string | null;
  skin_lesion_analysis?: SkinLesionImageAnalysisResult | null;
  
  // STAGE 3: Overall Analysis
  overall_analysis?: OverallAnalysisResult | null;
  
  // STAGE 4: Healthcare Treatment Recommendation
  healthcare_recommendation?: HealthcareRecommendationResult | null;
  
  // FINAL STAGE: Medical Report Generation
  medical_report?: string | null;
}

// Convenience types for specific use cases
export type DiagnosisResult = OverallAnalysisResult;
export type HealthcareRecommendation = HealthcareRecommendationResult;