import { createContext, useContext } from "react"

export type NavigationDestination = "home" | "history" | "comparison" | "about"

type NavigationContextValue = {
  currentPage: string
  navigate: (destination: NavigationDestination) => void
}

export const NavigationContext = createContext<NavigationContextValue | null>(null)

export function useAppNavigation() {
  return useContext(NavigationContext)
}
