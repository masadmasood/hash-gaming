export function getConditionLabel(score: number): { label: string; grade: string; color: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10", color: "text-condition border-condition/40" };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10`, color: "text-condition border-condition/40" };
  return { label: "Good", grade: `${score}/10`, color: "text-condition border-condition/40" };
}
