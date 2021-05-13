import {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";


type FileContextData = {
  refresh: boolean,
  isLoading: boolean,
  refreshPage: () => void,
  isLoadingPage: (state: boolean) => void
}

export const FileContext = createContext({} as FileContextData)


type FileContextProviderProps = {
  children: ReactNode
}

export function FileContextProvider({ children }: FileContextProviderProps) {
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function refreshPage() {
    setRefresh(!refresh)
  }

  function isLoadingPage(state: boolean) {
    setIsLoading(state)
  }


  return (
    <FileContext.Provider
      value={{
        refresh,
        isLoading,
        refreshPage,
        isLoadingPage
      }}>{children}</FileContext.Provider>
  )
}

export const useFileContext = () => {
  return useContext(FileContext)
}