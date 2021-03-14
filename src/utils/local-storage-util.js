const LOCAL_STORAGE_ITEM_NAME = "space-x-favorites";

export function saveToFavorites(item, category) {
  let favorites = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || "[]"
  );

  item.category = category;

  if (
    !favorites.find(
      (o) =>
        o.flight_number === item.flight_number && o.site_id === item.site_id
    )
  ) {
    favorites.push(item);
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(favorites));
  }
  return getFavorites();
}

export function getFavorites() {
  let favorites = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || "[]"
  );

  return favorites;
}

export function deleteFromFavorites(item) {
  let favorites = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || "[]"
  );

  favorites = favorites.filter(
    (o) => o.flight_number !== item.flight_number || o.site_id !== item.site_id
  );

  localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(favorites));

  return getFavorites();
}

export function isFavorite(item) {
  let favorites = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || "[]"
  );

  let favoriteExist = favorites.some(
    (o) => o.flight_number === item.flight_number && o.site_id === item.site_id
  );
  return favoriteExist;
}
