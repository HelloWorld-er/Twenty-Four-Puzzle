import {createContext, useContext} from "solid-js";
import {createStore} from "solid-js/store";

const AppContext = createContext();
const appContextDefaultData = {
  numberOfPickedCards: 4,
  isGameStart: false,
  isPickingCards: false,
  finishCreatingPickingCardsResources: false,
  finishPickingCardsAnimations: Array(),
  finishCardsPicking: false,
  cardsPicked: Array(),
  getAnswer: false
};

export function AppContextProvider(props) {
  const [appState, setAppState] = createStore({...appContextDefaultData})
  const appContextData = {
    appState,
    setAppState,
    reset: () => {
      setAppState(appContextDefaultData);
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
