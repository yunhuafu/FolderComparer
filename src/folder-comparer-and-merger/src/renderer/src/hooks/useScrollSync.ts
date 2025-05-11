import { useEffect, RefObject } from 'react'

export function useScrollSync(
  ref1: RefObject<HTMLDivElement | null>,
  ref2: RefObject<HTMLDivElement | null>
): void {
  useEffect(() => {
    if (!ref1 || !ref2) return

    const el1 = ref1.current
    const el2 = ref2.current
    if (!el1 || !el2) return

    const div1: HTMLDivElement = el1.getElementsByTagName('div')[0]
    const div2: HTMLDivElement = el2.getElementsByTagName('div')[0]

    let isSyncing = false

    const handleScroll = (source: HTMLElement, target: HTMLElement): void => {
      if (isSyncing) return
      isSyncing = true
      target.scrollTop = source.scrollTop
      target.scrollLeft = source.scrollLeft
      isSyncing = false
    }

    const onScroll1 = (): void => handleScroll(div1, div2)
    const onScroll2 = (): void => handleScroll(div2, div1)

    div1.addEventListener('scroll', onScroll1)
    div2.addEventListener('scroll', onScroll2)

    return () => {
      div1.removeEventListener('scroll', onScroll1)
      div2.removeEventListener('scroll', onScroll2)
    }
  }, [ref1, ref2])
}
