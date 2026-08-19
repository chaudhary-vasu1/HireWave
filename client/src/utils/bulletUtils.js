/**
 * Helper to parse description text or array into clean bullet point strings.
 * Handles arrays, multiline strings, inline bullet characters (•, -, *), and legacy comma-separated lists.
 */
export const parseBulletPoints = (desc) => {
  if (!desc) return [];

  if (Array.isArray(desc)) {
    return desc
      .flatMap(item => typeof item === 'string' ? item.split('\n') : String(item))
      .map(item => item.replace(/^[•\-\*\s]+/, '').trim())
      .filter(Boolean);
  }

  if (typeof desc !== 'string' || !desc.trim()) return [];

  const raw = desc.trim();
  const lines = raw.split('\n');
  const points = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Split by bullet markers if multiple exist on one line
    const inlineBullets = trimmed.split(/(?=[•\-\*]\s+)/);
    for (const sub of inlineBullets) {
      const cleaned = sub.replace(/^[•\-\*\s]+/, '').trim();
      if (cleaned) points.push(cleaned);
    }
  }

  return points.length > 0 ? points : [raw];
};
