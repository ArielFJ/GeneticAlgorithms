import { RouterProvider } from "react-router-dom";
import GAProvider from "./context/GAContext";
import router from "./routes";

function App() {
  return (
    <GAProvider>
      <RouterProvider router={router} />
    </GAProvider>
  );
}

export default App;
