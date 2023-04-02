import CoinChanger from "../views/CoinChanger";
import GeneticAlgorithm from "../views/GeneticAlgorithm";

interface Route {
  path: string;
  element: JSX.Element;
  key: string;
  label: string;
}

export const ROUTES: { [key: string]: Route } = {
  HOME: {
    path: "/",
    element: <GeneticAlgorithm />,
    key: "home",
    label: "Word Finder",
  },
  COIN_CHANGER: {
    path: "/coin-changer",
    element: <CoinChanger />,
    key: "coin-changer",
    label: "Coin Changer",
  },
};
