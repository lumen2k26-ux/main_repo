import React, { createContext, useState } from "react";

export const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }){
  const [subs, setSubs] = useState([]);
  return (
    <SubscriptionContext.Provider value={{ subs, setSubs }}>
      {children}
    </SubscriptionContext.Provider>
  );
}