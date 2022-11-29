import { atom } from "recoil";

export const resetListState = atom<boolean>({
  key: "resetListState",
  default: false,
});

export const filterDogState = atom<boolean>({
  key: "filterDogState",
  default: false,
});

export const filterPetTypeState = atom<string>({
  key: "filterPetTypeState",
  default: "",
});

export const filterGenderState = atom<string>({
  key: "filterGenderState",
  default: "",
});

export const filterGoodWithState = atom<string>({
  key: "filterGoodWithState",
  default: "",
});
export const filterFemaleState = atom<boolean>({
  key: "filterFemaleState",
  default: false,
});

export const filterMaleState = atom<boolean>({
  key: "filterMaleState",
  default: false,
});

export const filterCatState = atom<boolean>({
  key: "filterCatState",
  default: false,
});

export const filterSmallState = atom<boolean>({
  key: "filterSmallState",
  default: false,
});

export const filterMediumState = atom<boolean>({
  key: "filterMediumState",
  default: false,
});

export const filterLargeState = atom<boolean>({
  key: "filterLargeState",
  default: false,
});

export const filterVaccinatedState = atom<boolean>({
  key: "filterVaccinatedState",
  default: false,
});

export const filterSpayedState = atom<boolean>({
  key: "filterSpayedState",
  default: false,
});

export const sortAgeState = atom<boolean>({
  key: "sortAgeState",
  default: false,
});

export const sortDescendingState = atom<boolean>({
  key: "sortDescendingState",
  default: false,
});

export const sortPriceState = atom<boolean>({
  key: "sortPriceState",
  default: false,
});

export const sortTypeState = atom<string>({
  key: "sortTypeState",
  default: "",
});

export const favortiesListState = atom<string[]>({
  key: "favortiesListState",
  default: [],
});

export const showFavoritesState = atom<boolean>({
  key: "showFavoritesState",
  default: false,
});

export const favoritesListPriceState = atom<number>({
  key: "favoritesListPriceState",
  default: 0,
});
