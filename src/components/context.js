import React, { createContext } from "react";
import { getFavorites } from "../utils/local-storage-util";

export const FavoritesContext = createContext(getFavorites());

export function FavoriteProvider({ children, value }) {
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
