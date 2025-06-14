import { atom } from 'jotai'

export interface SpotFilters {
  category: string[]
  hasNursingRoom: boolean | null
  hasDiaperSpace: boolean | null
  hasKidsSpace: boolean | null
  hasStrollerSpace: boolean | null
  hasSink: boolean | null
  hasDiaperTrash: boolean | null
  indoor: boolean | null
  ageRange: [number, number]
}

export const filtersAtom = atom<SpotFilters>({
  category: [],
  hasNursingRoom: null,
  hasDiaperSpace: null,
  hasKidsSpace: null,
  hasStrollerSpace: null,
  hasSink: null,
  hasDiaperTrash: null,
  indoor: null,
  ageRange: [0, 18]
})

export const searchQueryAtom = atom<string>('')

export const isFilterDrawerOpenAtom = atom<boolean>(false)