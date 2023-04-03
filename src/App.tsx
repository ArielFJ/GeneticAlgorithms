import { RouterProvider } from "react-router-dom";
import WordFinderGAProvider from "./context/WordFinderGAContext";
import router from "./routes";
import CoinChangerGAProvider from "./context/CoinChangerGAContext";

function App() {
  return (
    <WordFinderGAProvider>
      <CoinChangerGAProvider>
        <RouterProvider router={router} />
      </CoinChangerGAProvider>
    </WordFinderGAProvider>
  );
}

export default App;
