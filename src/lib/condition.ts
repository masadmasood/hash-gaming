export function getConditionLabel(score: number): { label: string; grade: string; badgeClass: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10", badgeClass: "text-foreground border-border bg-surface" };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10`, badgeClass: "text-foreground border-border bg-surface" };
  if (score >= 5) return { label: "Good", grade: `${score}/10`, badgeClass: "text-foreground border-border bg-surface" };
  return { label: "Fair", grade: `${score}/10`, badgeClass: "text-foreground border-border bg-surface" };
}
