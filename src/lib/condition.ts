export function getConditionLabel(score: number): { label: string; grade: string; color: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10", color: "text-condition-excellent border-condition-excellent/30 bg-condition-excellent/10" };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10`, color: "text-condition-verygood border-condition-verygood/30 bg-condition-verygood/10" };
  return { label: "Good", grade: `${score}/10`, color: "text-condition-good border-condition-good/30 bg-condition-good/10" };
}
