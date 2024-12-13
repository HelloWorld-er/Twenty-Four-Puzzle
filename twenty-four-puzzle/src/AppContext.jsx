import {createContext, useContext} from "solid-js";
import {createStore, reconcile} from "solid-js/store";

const AppContext = createContext();
const appContextDefaultData = {
  isGameStart: false,
  isPickingCards: false
};

export function AppContextProvider(props) {
  const [appState, setAppState] = createStore({...appContextDefaultData})
  const appContextData = {
    appState,
    setAppState,
    reset: () => {
      setAppState(reconcile(appContextDefaultData));
    }
  };
  return (
    <AppContext.Provider value={appContextData}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("can't find AppContext");
  }
  return useContext(AppContext);
}
