import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  favoritesListPriceState,
  filterGenderState,
  filterGoodWithState,
  filterLargeState,
  filterMediumState,
  filterPetTypeState,
  filterSmallState,
  filterSpayedState,
  filterVaccinatedState,
  resetListState,
  showFavoritesState,
  sortAgeState,
  sortDescendingState,
  sortPriceState,
  sortTypeState,
} from "../atoms";
import "../styles/Filters.css";

export const Filters = (): JSX.Element => {
  const [resetList, setResetList] = useRecoilState(resetListState);

  const [checkedFilterDog, setCheckedFilterDog] = useState(false);
  const [checkedFilterCat, setCheckedFilterCat] = useState(false);
  const [checkedFilterFemale, setCheckedFilterFemale] = useState(false);
  const [checkedFilterMale, setCheckedFilterMale] = useState(false);

  // size filters
  const [checkedFilterSmall, setCheckedFilterSmall] = useState(false);
  const [checkedFilterMedium, setCheckedFilterMedium] = useState(false);
  const [checkedFilterLarge, setCheckedFilterLarge] = useState(false);

  // size recoil set state
  const setFilterSmall = useSetRecoilState(filterSmallState);
  const setFilterMedium = useSetRecoilState(filterMediumState);
  const setFilterLarge = useSetRecoilState(filterLargeState);

  // good with filter
  const [checkedFilterKids, setCheckedFilterKids] = useState(false);
  const [checkedFilterNoPets, setCheckedFilterNoPets] = useState(false);
  const [checkedFilterOtherDogs, setCheckedFilterOtherDogs] = useState(false);
  const [checkedFilterOtherCats, setCheckedFilterOtherCats] = useState(false);

  const [checkedFilterSpayed, setCheckedFilterSpayed] = useState(false);
  const [checkedFilterVaccinated, setCheckedFilterVaccinated] = useState(false);
  const [checkedSortAge, setCheckedSortAge] = useState(false);
  const [checkedSortDescending, setCheckedSortDescending] = useState(false);

  const [checkedSortPrice, setCheckedSortPrice] = useState(false);

  const setGoodWith = useSetRecoilState(filterGoodWithState);
  const setFilterPetType = useSetRecoilState(filterPetTypeState);
  const setFilterGender = useSetRecoilState(filterGenderState);

  const setSortType = useSetRecoilState(sortTypeState);

  const setFilterVaccinated = useSetRecoilState(filterVaccinatedState);
  const setFilterSpayed = useSetRecoilState(filterSpayedState);

  const setSortAge = useSetRecoilState(sortAgeState);
  const setSortPrice = useSetRecoilState(sortPriceState);
  const setDescendingSort = useSetRecoilState(sortDescendingState);

  const [showFavorites, setShowFavorites] = useRecoilState(showFavoritesState);
  const favoritesListPrice = useRecoilValue(favoritesListPriceState);

  const [goodWithDiv, setGoodWithDiv] = useState(false);
  const [sizeDiv, setSizeDiv] = useState(false);
  const [typesDiv, setTypesDiv] = useState(false);
  const [genderDiv, setGenderDiv] = useState(false);

  const [healthDiv, setHealthDiv] = useState(false);

  // on first render, clear filters
  useEffect(() => {
    handleClearFiltersClick();
  }, []);

  const handleChangeFilterVaccinated = () => {
    setShowFavorites(false);
    if (!checkedFilterVaccinated) {
      setFilterVaccinated(true);
    } else {
      setFilterVaccinated(false);
    }
    setCheckedFilterVaccinated(!checkedFilterVaccinated);
  };

  const handleChangeFilterSpayed = () => {
    setShowFavorites(false);
    if (!checkedFilterSpayed) {
      setFilterSpayed(true);
    } else {
      setFilterSpayed(false);
    }
    setCheckedFilterSpayed(!checkedFilterSpayed);
  };

  const handleChangeFilterPetType = (type: string) => {
    setShowFavorites(false);
    if (type == "Dog") {
      if (!checkedFilterDog) {
        setCheckedFilterCat(false);
        setFilterPetType("Dog");
      } else {
        setFilterPetType("");
      }
      setCheckedFilterDog(!checkedFilterDog);
    }
    if (type == "Cat") {
      if (!checkedFilterCat) {
        setCheckedFilterDog(false);
        setFilterPetType("Cat");
      } else {
        setFilterPetType("");
      }
      setCheckedFilterCat(!checkedFilterCat);
    }
  };

  const handleChangeFilterGender = (gender: string) => {
    setShowFavorites(false);
    if (gender == "Male") {
      if (!checkedFilterMale) {
        setCheckedFilterFemale(false);
        setFilterGender("Male");
      } else {
        setFilterGender("");
      }
      setCheckedFilterMale(!checkedFilterMale);
    } else if (gender == "Female") {
      if (!checkedFilterFemale) {
        setCheckedFilterMale(false);
        setFilterGender("Female");
      } else {
        setFilterGender("");
      }
      setCheckedFilterFemale(!checkedFilterFemale);
    }
  };

  const handleChangeFilterSize = (size: string) => {
    setShowFavorites(false);
    switch (size) {
      case "small":
        if (!checkedFilterSmall) {
          setFilterSmall(true);
        } else {
          setFilterSmall(false);
        }
        setCheckedFilterSmall(!checkedFilterSmall);
        break;
      case "medium":
        if (!checkedFilterMedium) {
          setFilterMedium(true);
        } else {
          setFilterMedium(false);
        }
        setCheckedFilterMedium(!checkedFilterMedium);
        break;
      case "large":
        if (!checkedFilterLarge) {
          setFilterLarge(true);
        } else {
          setFilterLarge(false);
        }
        setCheckedFilterLarge(!checkedFilterLarge);
        break;
      default:
    }
  };

  useEffect(() => {
    if (!genderDiv) {
      setCheckedFilterFemale(false);
      setCheckedFilterMale(false);
      setFilterGender("");
    } else {
      setShowFavorites(false);
    }
  }, [genderDiv]);

  useEffect(() => {
    if (!typesDiv) {
      setCheckedFilterDog(false);
      setCheckedFilterCat(false);
      setFilterPetType("");
    } else {
      setShowFavorites(false);
    }
  }, [typesDiv]);

  useEffect(() => {
    if (!sizeDiv) {
      if (checkedFilterSmall) {
        setFilterSmall(false);
      }
      if (checkedFilterMedium) {
        setFilterMedium(false);
      }
      if (checkedFilterLarge) {
        setFilterLarge(false);
      }
      setCheckedFilterSmall(false);
      setCheckedFilterMedium(false);
      setCheckedFilterLarge(false);
    } else {
      setShowFavorites(false);
    }
  }, [sizeDiv]);

  useEffect(() => {
    if (!healthDiv) {
      if (checkedFilterSpayed) {
        setCheckedFilterSpayed(false);
        setFilterSpayed(false);
      }
      if (checkedFilterVaccinated) {
        setCheckedFilterVaccinated(false);
        setFilterVaccinated(false);
      }
    } else {
      setShowFavorites(false);
    }
  }, [healthDiv]);

  useEffect(() => {
    if (!goodWithDiv) {
      setCheckedFilterKids(false);
      setCheckedFilterOtherCats(false);
      setCheckedFilterOtherDogs(false);
      setCheckedFilterNoPets(false);
      setGoodWith("");
    } else {
      setShowFavorites(false);
    }
  }, [goodWithDiv]);

  const handleChangeSortDescending = () => {
    setShowFavorites(false);
    if (!checkedSortDescending) {
      setDescendingSort(true);
    } else {
      setDescendingSort(false);
    }
    setCheckedSortDescending(!checkedSortDescending);
  };

  const handleChangeSortType = (sortType: string) => {
    setShowFavorites(false);
    switch (sortType) {
      case "price":
        if (!checkedSortPrice) {
          setSortType(sortType);
          setCheckedSortAge(false);
        } else {
          setCheckedSortDescending(false);
          setSortType("");
          setDescendingSort(false);
        }
        setCheckedSortPrice(!checkedSortPrice);
        break;
      case "age":
        if (!checkedSortAge) {
          setSortType(sortType);
          setCheckedSortPrice(false);
        } else {
          setCheckedSortDescending(false);
          setSortType("");
          setDescendingSort(false);
        }
        setCheckedSortAge(!checkedSortAge);
        break;
      default:
        break;
    }
  };

  const handleGoodWith = (goodWith: string) => {
    switch (goodWith) {
      case "Kids":
        if (!checkedFilterKids) {
          setCheckedFilterNoPets(false);
          setCheckedFilterOtherCats(false);
          setCheckedFilterOtherDogs(false);
          setGoodWith(goodWith);
        } else {
          setGoodWith("");
        }
        setCheckedFilterKids(!checkedFilterKids);
        break;
      case "Other Dogs":
        if (!checkedFilterOtherDogs) {
          setCheckedFilterNoPets(false);
          setCheckedFilterOtherCats(false);
          setCheckedFilterKids(false);
          setGoodWith(goodWith);
        } else {
          setGoodWith("");
        }
        setCheckedFilterOtherDogs(!checkedFilterOtherDogs);
        break;
      case "Other Cats":
        if (!checkedFilterOtherCats) {
          setCheckedFilterNoPets(false);
          setCheckedFilterOtherDogs(false);
          setCheckedFilterKids(false);
          setGoodWith(goodWith);
        } else {
          setGoodWith("");
        }
        setCheckedFilterOtherCats(!checkedFilterOtherCats);
        break;
      case "No Pets":
        if (!checkedFilterNoPets) {
          setCheckedFilterOtherDogs(false);
          setCheckedFilterOtherCats(false);
          setCheckedFilterKids(false);
          setGoodWith(goodWith);
        } else {
          setGoodWith("");
        }
        setCheckedFilterNoPets(!checkedFilterNoPets);
        break;
      default:
        break;
    }
  };

  const handleClearSortingClick = () => {
    setCheckedSortDescending(false);
    setCheckedSortPrice(false);
    setCheckedSortAge(false);
    setSortType("");
    setDescendingSort(false);
  };

  const handleClearFiltersClick = () => {
    setShowFavorites(false);
    setFilterVaccinated(false);
    setCheckedFilterVaccinated(false);
    setCheckedFilterDog(false);
    setCheckedFilterCat(false);
    setGenderDiv(false);
    setTypesDiv(false);
    setSizeDiv(false);
    setHealthDiv(false);
    setGoodWithDiv(false);
    setCheckedFilterNoPets(false);
    setCheckedFilterOtherCats(false);
    setCheckedFilterOtherDogs(false);
    setCheckedFilterKids(false);
    setCheckedFilterVaccinated(false);
    setCheckedFilterSpayed(false);
    setCheckedFilterMedium(false);
    setCheckedFilterSmall(false);
    setCheckedFilterLarge(false);

    setFilterGender("");
    setFilterPetType("");
    setFilterVaccinated(false);
    setFilterSpayed(false);
    setFilterLarge(false);
    setFilterMedium(false);
    setFilterSmall(false);
    setGoodWith("");

    setResetList(!resetList);
  };

  const buttonText = showFavorites
    ? "Hide Favorites List"
    : "Show Favorites List";

  return (
    <div className="filters">
      <div className="filtersCategory">
        <div className="resetFiltersAndSort">
          <p>
            <b>Sort By: </b>
          </p>

          <Button
            onClick={handleClearSortingClick}
            color="secondary"
            variant="contained"
            size="small"
            sx={{
              height: 22,
              color: "black",
              backgroundColor: "lavender",
              borderColor: "black",
              "&:hover": {
                color: "white",
                backgroundColor: "#6b6be1",
              },
            }}
          >
            Clear Sorting
          </Button>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSortAge}
              onChange={() => handleChangeSortType("age")}
            />
          }
          label="Age"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSortPrice}
              onChange={() => handleChangeSortType("price")}
            />
          }
          label="Price"
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={!checkedSortAge && !checkedSortPrice}
              checked={checkedSortDescending}
              onChange={handleChangeSortDescending}
            />
          }
          label="Descending"
        />
      </div>
      <div className="filtersCategory">
        <div className="resetFiltersAndSort">
          <p>
            <b>Filter By: </b>
          </p>

          <Button
            onClick={handleClearFiltersClick}
            color="secondary"
            variant="contained"
            size="small"
            sx={{
              height: 22,
              color: "black",
              backgroundColor: "lavender",
              borderColor: "black",
              "&:hover": {
                color: "white",
                backgroundColor: "#6b6be1",
              },
            }}
          >
            Clear Filters
          </Button>
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={genderDiv}
                onChange={() => setGenderDiv(!genderDiv)}
              />
            }
            label="Gender:"
          />
          {genderDiv && (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFilterFemale}
                    onChange={() => handleChangeFilterGender("Female")}
                  />
                }
                label="Female"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFilterMale}
                    onChange={() => handleChangeFilterGender("Male")}
                  />
                }
                label="Male"
              />
            </div>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={typesDiv}
                onChange={() => setTypesDiv(!typesDiv)}
              />
            }
            label="Type:"
          />
          {typesDiv && (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFilterDog}
                    onChange={() => handleChangeFilterPetType("Dog")}
                  />
                }
                label="Dog"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFilterCat}
                    onChange={() => handleChangeFilterPetType("Cat")}
                  />
                }
                label="Cat"
              />
            </div>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={healthDiv}
                onChange={() => setHealthDiv(!healthDiv)}
              />
            }
            label="Health: "
          />
          {healthDiv && (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFilterVaccinated}
                    onChange={handleChangeFilterVaccinated}
                  />
                }
                label="Vaccinated"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFilterSpayed}
                    onChange={handleChangeFilterSpayed}
                  />
                }
                label="Spayed"
              />
            </div>
          )}
        </FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={sizeDiv} onChange={() => setSizeDiv(!sizeDiv)} />
          }
          label="Size:"
        />
        {sizeDiv && (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterSmall}
                  onChange={() => handleChangeFilterSize("small")}
                />
              }
              label="Small"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterMedium}
                  onChange={() => handleChangeFilterSize("medium")}
                />
              }
              label="Medium"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterLarge}
                  onChange={() => handleChangeFilterSize("large")}
                />
              }
              label="Large"
            />{" "}
          </div>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={goodWithDiv}
              onChange={() => setGoodWithDiv(!goodWithDiv)}
            />
          }
          label="Good In A Home With:"
        />
        {goodWithDiv && (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterKids}
                  onChange={() => handleGoodWith("Kids")}
                />
              }
              label="Kids"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterOtherDogs}
                  onChange={() => handleGoodWith("Other Dogs")}
                />
              }
              label="Other Dogs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterOtherCats}
                  onChange={() => handleGoodWith("Other Cats")}
                />
              }
              label="Other Cats"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilterNoPets}
                  onChange={() => handleGoodWith("No Pets")}
                />
              }
              label="No Pets"
            />{" "}
          </div>
        )}
      </div>
      <div className="filtersCategory">
        <Button
          onClick={() => setShowFavorites(!showFavorites)}
          sx={{
            color: "black",
            backgroundColor: "lavender",
            borderColor: "black",
            "&:hover": {
              color: "white",
              backgroundColor: "#6b6be1",
            },
          }}
          variant="contained"
          size="small"
        >
          {buttonText}
        </Button>
        <p>Favorites Price: ${favoritesListPrice}</p>
      </div>
    </div>
  );
};
