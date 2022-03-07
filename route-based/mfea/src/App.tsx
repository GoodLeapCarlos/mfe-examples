import { useRoutes } from "react-router-dom";
import FundingRoutes from "./funding-routes";
export default function App() {
  let element = useRoutes(FundingRoutes);
  return element;
}
