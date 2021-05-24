import {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";


type FileContextData = {
  refresh: boolean,
  isLoading: boolean,
  loaderCounter: number,
  loaderCounting: number,
  refreshPage: () => void,
  startLoaderCounting: (value) => void,
  isLoadingPage: (state: boolean) => void
}

export const FileContext = createContext({} as FileContextData)


type FileContextProviderProps = {
  children: ReactNode
}

export function FileContextProvider({ children }: FileContextProviderProps) {
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loaderCounter, setLoaderCounter] = useState<number>(0)
  const [loaderCounting, setLoaderCounting] = useState<number>(0)

  function refreshPage() {
    setRefresh(!refresh)
  }

  function startLoaderCounting(value: number) {
    setLoaderCounter(value)
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
        loaderCounter,
        loaderCounting,
        isLoadingPage,
        startLoaderCounting
      }}>{children}</FileContext.Provider>
  )
}

export const useFileContext = () => {
  return useContext(FileContext)
}