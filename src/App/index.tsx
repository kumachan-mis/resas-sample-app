import * as React from "react";

import { ResasApi } from "../api";

export const App: React.FC = () => {
  ResasApi.fetchPopulationTransition(1).then((transition) => console.log(transition));
  return <></>;
};
