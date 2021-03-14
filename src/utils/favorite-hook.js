import { useContext } from "react";
import { FavoritesContext } from "../components/context";
import { deleteFromFavorites, saveToFavorites } from "./local-storage-util";
import useToast from "@chakra-ui/core/dist/Toast";

export const useLocalStorageHook = () => {
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const toast = useToast();

  const saveFavoriteHook = (item, category) => {
    let list = saveToFavorites(item, category);
    setFavorites(list);
  };

  const deleteFavoriteHook = (item) => {
    let list = deleteFromFavorites(item);
    setFavorites(list);
  };

  const isFavoriteHook = (item) => {
    let favoriteExist = favorites.some(
      (o) =>
        o.flight_number === item.flight_number && o.site_id === item.site_id
    );
    return favoriteExist;
  };

  const toggleFavoriteHook = (item, category) => {
    isFavoriteHook(item)
      ? deleteFavoriteHook(item)
      : saveFavoriteHook(item, category);

    toast({
      title: isFavoriteHook(item)
        ? "Deleted from your favorites."
        : "Added to your favorites ",
      description: "Item " + (item.flight_number || item.site_id),
      status: isFavoriteHook(item) ? "error" : "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return {
    saveFavoriteHook,
    deleteFavoriteHook,
    isFavoriteHook,
    toggleFavoriteHook,
  };
};
