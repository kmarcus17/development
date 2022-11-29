import React from "react";

import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { favortiesListState } from "../atoms";
import "../styles/ItemCard.css";

export interface IItemCardProps {
  imgUrl: string;
  petId: string;
  petType: string;
  petName: string;
  adoptionFee: number;
  age: number;
  breed: string[];
  houseTrained: boolean;
  size: string;
  weight: number;
  characteristics: string[];
  healthVaccines: boolean;
  healthSpayedNeutered: boolean;
  goodInAHomeWith: string;
  gender: string;
}

export const ItemCard = (props: IItemCardProps): JSX.Element => {
  const {
    imgUrl,
    gender,
    petId,
    petType,
    petName,
    adoptionFee,
    age,
    breed,
    houseTrained,
    size,
    weight,
    characteristics,
    healthVaccines,
    healthSpayedNeutered,
    goodInAHomeWith,
  } = props;
  const [favoriteList, setFavoritesList] = useRecoilState(favortiesListState);

  const vaccines = healthVaccines
    ? "Vaccinations up to date"
    : "Vaccinations NOT up to date";
  const spayed = healthSpayedNeutered
    ? "spayed/neutered"
    : "Not spayed/neutered";
  const trained = houseTrained ? "House Trained" : "Not House Trained";

  const handleClick = () => {
    const favsList = [...favoriteList];
    if (isInFavorties) {
      const newList = favsList.filter((item) => item != petId);
      setFavoritesList(newList);
    } else {
      favsList.push(petId);
      setFavoritesList(favsList);
    }
  };

  let numCharacteristics = characteristics.length;
  let characteristicsList: string = trained;

  for (let i = 0; i < numCharacteristics; i++) {
    let newChar = characteristics[i];
    characteristicsList = newChar + ", " + characteristicsList;
  }

  //breed
  let numBreeds = breed.length;
  let breedList: string = "";

  for (let i = 0; i < numBreeds; i++) {
    let newString = breed[i];
    if (i == 0) {
      breedList = newString;
    } else {
      breedList = newString + " / " + breedList;
    }
  }

  let isInFavorties = favoriteList.includes(petId);
  const buttonText = isInFavorties
    ? "Remove From Favorites"
    : "Add to Favorites";

  const backgroundColor = isInFavorties ? "#6b6be1" : "lavender";
  const buttonColor = isInFavorties ? "white" : "black";

  return (
    <div className="animalCard">
      <div className="adoptionFee">
        <p>
          <b>{gender} </b>
        </p>
        <p>
          <b>{`$${adoptionFee}`}</b>
        </p>
      </div>
      <div className="animalPicture">
        <img src={imgUrl} alt="Picture of Pet" />
      </div>
      <div className="nameAndAge">
        <p>
          <b>{petName}</b>
        </p>
        <p>
          <i>
            {age} {age != 1 ? "years" : "year"}
          </i>
        </p>
      </div>
      <div className="animalDetails">
        <div className="informationPairs">
          <p>
            <b>BREED/SIZE:</b>
          </p>
          <p>
            {breedList}, {size}, {weight}lbs
          </p>
        </div>
        <div className="informationPairs">
          <p>
            <b>CHARACTERISTICS:</b>
          </p>
          <p>{characteristicsList}</p>
        </div>
        <div className="informationPairs">
          <p>
            <b>HEALTH:</b>
          </p>
          <p>
            {vaccines}, {spayed}
          </p>
        </div>
        <div className="informationPairs">
          <p>
            <b>GOOD IN A HOME WITH:</b>
          </p>
          <p>{goodInAHomeWith}</p>
        </div>
      </div>
      <div>
        <Button
          onClick={handleClick}
          sx={{
            color: buttonColor,
            backgroundColor: backgroundColor,
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
      </div>
    </div>
  );
};
