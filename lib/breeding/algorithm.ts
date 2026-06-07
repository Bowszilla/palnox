import { BREEDING_DATA } from '@/data/static/breeding-data'

export interface BreedingPal {
  id: string
  palNumber: number
  name: string
  elementPrimary: string
  rarity: string
  imageUrl?: string
}

export interface BreedingCombo {
  parentA: BreedingPal
  parentB: BreedingPal
}

function getRank(pal: BreedingPal): number {
  return BREEDING_DATA[pal.palNumber]?.rank ?? 0
}

function isChildEligible(pal: BreedingPal): boolean {
  return BREEDING_DATA[pal.palNumber]?.childEligible ?? true
}

/**
 * Palworld breeding formula:
 * childRank = floor((rankA + rankB) / 2)
 * child = pal with rank closest to childRank (among child-eligible pals)
 * Ties broken by lower rank (rarer pal wins)
 */
export function calculateChild(
  parentA: BreedingPal,
  parentB: BreedingPal,
  allPals: BreedingPal[]
): BreedingPal | null {
  const rankA = getRank(parentA)
  const rankB = getRank(parentB)
  if (!rankA || !rankB) return null

  const childRank = Math.floor((rankA + rankB) / 2)
  const eligible = allPals.filter(isChildEligible)

  return eligible.reduce<BreedingPal | null>((best, pal) => {
    if (!best) return pal
    const diff = Math.abs(getRank(pal) - childRank)
    const bestDiff = Math.abs(getRank(best) - childRank)
    if (diff < bestDiff) return pal
    if (diff === bestDiff) return getRank(pal) < getRank(best) ? pal : best
    return best
  }, null)
}

/**
 * Find all parent pairs that produce the given target child.
 * Returns combinations sorted by average parent rank (easiest first).
 */
export function findParentsForTarget(
  target: BreedingPal,
  allPals: BreedingPal[],
  maxResults = 30
): BreedingCombo[] {
  const results: BreedingCombo[] = []

  for (let i = 0; i < allPals.length; i++) {
    for (let j = i; j < allPals.length; j++) {
      const a = allPals[i]
      const b = allPals[j]
      if (!getRank(a) || !getRank(b)) continue

      const child = calculateChild(a, b, allPals)
      if (child?.palNumber === target.palNumber) {
        results.push({ parentA: a, parentB: b })
        if (results.length >= maxResults) return results
      }
    }
  }

  // Sort: pairs with more common pals first (higher rank = easier to find)
  return results.sort((a, b) =>
    (getRank(b.parentA) + getRank(b.parentB)) - (getRank(a.parentA) + getRank(a.parentB))
  )
}
