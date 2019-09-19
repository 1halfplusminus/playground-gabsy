import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { createStore } from "./src";

export default ({ element }: { element: ReactNode }) => {
  const store = createStore();
  return <Provider store={store}>{element}</Provider>;
};
