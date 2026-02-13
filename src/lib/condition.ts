export function getConditionLabel(score: number): { label: string; grade: string; color: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10", color: "text-condition-excellent border-condition-excellent/40" };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10`, color: "text-condition-verygood border-condition-verygood/40" };
  if (score >= 5) return { label: "Good", grade: `${score}/10`, color: "text-condition-good border-condition-good/40" };
  return { label: "Fair", grade: `${score}/10`, color: "text-condition-fair border-condition-fair/40" };
}
