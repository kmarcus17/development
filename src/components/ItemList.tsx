import React, { useEffect, useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  favoritesListPriceState,
  favortiesListState,
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
  sortDescendingState,
  sortTypeState,
} from "../atoms";
import "../styles/ItemList.css";
import { ItemCard } from "./ItemCard";

/**
 * Handles displaying a list of item cards. Handles filtering and sorting and
 * changing what to display
 * @returns a list of items to display on the screen
 */
export const ItemList = (): JSX.Element => {
  // urls for the images
  const url =
    "data:image/jpeg;base64,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";
  const url2 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8H6sCvISOv5Z0eVtmlD04mjzKvlOOM3O0Q&usqp=CAU";
  const url3 =
    "https://www.pitbullinfo.org/uploads/7/8/9/7/7897520/pitbull-dog-3_4.jpg";
  const url4 =
    "https://nationaltoday.com/wp-content/uploads/2020/08/international-cat-day-640x514.jpg";
  const url5 =
    "https://static01.nyt.com/images/2022/05/10/science/28DOGS-BEHAVIOR1/28DOGS-BEHAVIOR1-mediumSquareAt3X-v2.jpg";
  const url6 =
    "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuos";
  const url7 =
    "https://www.8newsnow.com/wp-content/uploads/sites/59/2022/08/husky_eyes.jpg?w=1988&h=1440&crop=1";
  const url8 =
    "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220818142713-dogs-tears-emotions-wellness-stock.jpg";
  const url9 =
    "https://i.guim.co.uk/img/media/b3f9db5d504c00304c37724927b6e407da17c36b/0_197_5850_3511/master/5850.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=87966753ed0906994f60f72735295414";
  const url10 =
    "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg";
  const url11 =
    "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg";
  const url12 =
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/large-cat-breed-1553197454.jpg";
  const url13 =
    "https://i.etsystatic.com/14366733/r/il/f057fe/3144133722/il_fullxfull.3144133722_snz0.jpg";
  const url14 =
    "https://media.glamour.com/photos/56959a2293ef4b09520d6393/master/w_1600%2Cc_limit/home-2015-10-8-cute-shelter-dogs-delaware-1023-courtesy-petfinder-main.jpg";
  const url15 =
    "https://i0.wp.com/foreverfortunatefelines.org/wp-content/uploads/2018/05/fullsizeoutput_2415-e1526303291798.jpeg?fit=1660%2C1861&ssl=1";
  const url16 =
    "http://www.aspca.org/sites/default/files/adoptable-dogs-your-local-shelter.jpg";

  // unique identifiers for the favorites list
  const guid = "a42b4961-1344-4b6e-b167-e2494017637f";
  const guid2 = "9905a094-fcde-45f7-91ba-06200e7baca6";
  const guid3 = "38e7ca13-d2d1-4ff3-9da9-f9708a794776";
  const guid4 = "593d4b26-92d6-439f-9476-b08479bdea08";
  const guid5 = "10995236-ecc0-4909-be03-fa52f273a0e8";
  const guid6 = "3a516676-3fa2-4d68-b9a7-669b88a4d3f5";
  const guid7 = "64498d85-982d-432a-902d-4777e3bbe9c8";
  const guid8 = "748a4e20-2002-4f8f-b270-b6d3ef42aabc";
  const guid9 = "d9535fbd-fcd8-4592-a395-703c5158b665";
  const guid10 = "a5a746cb-6728-44b3-8e1f-be6f6ff74047";
  const guid11 = "553fb07d-b934-4ec8-9377-8c56bcf6e116";
  const guid12 = "1a153d8a-9be2-404a-87b1-2a8cce97de59";
  const guid13 = "01c07cfd-1137-45f5-84e9-672f9fa034da";
  const guid14 = "dff32aa8-4901-4d10-a850-726841e37d4c";
  const guid15 = "c6723631-e640-42af-9b1f-c388d9011e22";
  const guid16 = "b3bbe7ce-41df-4012-b5ce-494c145912a3";

  // list of items and their respective information, passed in via props
  const initalItemsList = [
    <ItemCard
      imgUrl={url}
      petId={guid}
      petType="Dog"
      gender="Female"
      petName="Dancer"
      size="Medium"
      weight={30}
      adoptionFee={60}
      breed={["Pitbull"]}
      characteristics={["Loving", "Funny"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Other Dogs"}
      age={4}
    ></ItemCard>,
    <ItemCard
      imgUrl={url2}
      petId={guid2}
      petType="Dog"
      gender="Female"
      petName="Pearl"
      size="Medium"
      weight={25}
      adoptionFee={150}
      breed={["Black Lab", "Cattle Dog"]}
      characteristics={["Loving", "Shy", "Anxious"]}
      healthSpayedNeutered={true}
      healthVaccines={false}
      houseTrained={false}
      goodInAHomeWith={"Kids"}
      age={1}
    ></ItemCard>,
    <ItemCard
      imgUrl={url3}
      petId={guid3}
      petType="Dog"
      gender="Male"
      petName="Taco"
      size="Medium"
      weight={30}
      adoptionFee={65}
      breed={["Pitbull", "Boxer"]}
      characteristics={["Friendly", "Happy", "Energetic"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Other Dogs"}
      age={2}
    ></ItemCard>,
    <ItemCard
      imgUrl={url4}
      petId={guid4}
      petType="Cat"
      gender="Female"
      petName="Mittens"
      size="Small"
      weight={5}
      adoptionFee={235}
      breed={["American Shorthair"]}
      characteristics={["Shy", "Curious", "Cuddly"]}
      healthSpayedNeutered={true}
      healthVaccines={false}
      houseTrained={true}
      goodInAHomeWith={"Other Cats"}
      age={0.5}
    ></ItemCard>,
    <ItemCard
      imgUrl={url5}
      petId={guid5}
      petType="Dog"
      gender="Male"
      petName="T-Bone"
      size="Large"
      weight={70}
      adoptionFee={50}
      breed={["Golden Retriever"]}
      characteristics={["Loving", "Snuggly", "Low-Energy"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Kids"}
      age={9}
    ></ItemCard>,
    <ItemCard
      imgUrl={url12}
      petId={guid12}
      petType="Cat"
      gender="Female"
      petName="Salem"
      size="Small"
      weight={12}
      adoptionFee={100}
      breed={["Russian Blue"]}
      characteristics={["Independent", "Fickle"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"No Pets"}
      age={5}
    ></ItemCard>,
    <ItemCard
      imgUrl={url6}
      petId={guid6}
      petType="Dog"
      gender="Male"
      petName="Cowboy"
      size="Medium"
      weight={35}
      adoptionFee={95}
      breed={["American Pitbull Terrier"]}
      characteristics={["Loving", "Funny"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={false}
      goodInAHomeWith={"Other Dogs"}
      age={4}
    ></ItemCard>,
    <ItemCard
      imgUrl={url11}
      petId={guid11}
      petType="Cat"
      gender="Female"
      petName="Socks"
      size="Small"
      weight={13}
      adoptionFee={75}
      breed={["Bombay"]}
      characteristics={["Curious", "Outgoing", "Quiet"]}
      healthSpayedNeutered={false}
      healthVaccines={false}
      houseTrained={true}
      goodInAHomeWith={"Other Cats"}
      age={1}
    ></ItemCard>,
    <ItemCard
      imgUrl={url7}
      petId={guid7}
      petType="Dog"
      gender="Male"
      petName="Frank"
      size="Large"
      weight={80}
      adoptionFee={175}
      breed={["Husky"]}
      characteristics={["Loud", "Diva", "Affectionate"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Other Dogs"}
      age={7}
    ></ItemCard>,
    <ItemCard
      imgUrl={url8}
      petId={guid8}
      petType="Dog"
      gender="Male"
      petName="Waffle"
      size="Medium"
      weight={20}
      adoptionFee={25}
      breed={["Corgy"]}
      characteristics={["Loving", "Funny"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Other Dogs"}
      age={10}
    ></ItemCard>,
    <ItemCard
      imgUrl={url9}
      petId={guid9}
      petType="Dog"
      gender="Female"
      petName="Loki"
      size="Large"
      weight={60}
      adoptionFee={100}
      breed={["Border Collie"]}
      characteristics={["Energetic", "Outgoing"]}
      healthSpayedNeutered={false}
      healthVaccines={false}
      houseTrained={true}
      goodInAHomeWith={"No Pets"}
      age={6}
    ></ItemCard>,
    <ItemCard
      imgUrl={url10}
      petId={guid10}
      petType="Cat"
      gender="Female"
      petName="Fern"
      size="Small"
      weight={14}
      adoptionFee={85}
      breed={["Maine Coon"]}
      characteristics={["Loving", "Independent", "Playful"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"No Kids"}
      age={8}
    ></ItemCard>,
    <ItemCard
      imgUrl={url13}
      petId={guid13}
      petType="Cat"
      gender="Male"
      petName="Felix"
      size="Small"
      weight={17}
      adoptionFee={175}
      breed={["Tabby"]}
      characteristics={["Curious", "Quiet", "Affectionate"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Other Cats"}
      age={7}
    ></ItemCard>,
    <ItemCard
      imgUrl={url14}
      petId={guid14}
      petType="Dog"
      gender="Male"
      petName="Gus"
      size="Large"
      weight={50}
      adoptionFee={95}
      breed={["Black Mouth Cur"]}
      characteristics={["Happy", "Funny", "Energetic"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Kids"}
      age={3}
    ></ItemCard>,
    <ItemCard
      imgUrl={url16}
      petId={guid16}
      petType="Dog"
      gender="Male"
      petName="Moose"
      size="Medium"
      weight={30}
      adoptionFee={85}
      breed={["Pitbull"]}
      characteristics={["Loving", "Playful"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Kids"}
      age={4}
    ></ItemCard>,
    <ItemCard
      imgUrl={url15}
      petId={guid15}
      petType="Cat"
      gender="Female"
      petName="Betty"
      size="Medium"
      weight={30}
      adoptionFee={75}
      breed={["Ragdoll"]}
      characteristics={["Loving", "Funny"]}
      healthSpayedNeutered={true}
      healthVaccines={true}
      houseTrained={true}
      goodInAHomeWith={"Other Dogs"}
      age={6}
    ></ItemCard>,
  ];

  // state variables
  const [listOfItemCards, setListOfItemCards] = useState(initalItemsList);
  const [listOfFilteredItems, setListOfFilteredItems] =
    useState<JSX.Element[]>(initalItemsList);

  const filterVaccinated = useRecoilValue(filterVaccinatedState);
  const filterSpayed = useRecoilValue(filterSpayedState);
  const sortDescending = useRecoilValue(sortDescendingState);
  const sortType = useRecoilValue(sortTypeState);
  const filterGoodWith = useRecoilValue(filterGoodWithState);
  const resetList = useRecoilValue(resetListState);

  const showFavorites = useRecoilValue(showFavoritesState);
  const favoriteList = useRecoilValue(favortiesListState);
  const setFavoritesPrice = useSetRecoilState(favoritesListPriceState);

  const filterSmall = useRecoilValue(filterSmallState);
  const filterMedium = useRecoilValue(filterMediumState);
  const filterLarge = useRecoilValue(filterLargeState);

  const filterGenders = useRecoilValue(filterGenderState);
  const filterPetType = useRecoilValue(filterPetTypeState);

  const [noItemsMessage, setNoItemsMessage] = useState("");
  const [noFilterResultsMessage, setNoFilterResultsMessage] = useState("");

  // handles clear filters button
  useEffect(() => {
    setListOfItemCards([...initalItemsList]);
    setListOfFilteredItems([...initalItemsList]);
  }, [resetList]);

  // on first render, set to inital items list
  useEffect(() => {
    setListOfItemCards([...initalItemsList]);
    setNoFilterResultsMessage("");
    setNoItemsMessage("");
  }, []);

  // if no results are found, display message for filtering
  useEffect(() => {
    if (listOfItemCards.length === 0 && !showFavorites) {
      setNoFilterResultsMessage(
        "No Results with that Filter combination, try adjusting your filter parameters!"
      );
    } else {
      setNoFilterResultsMessage("");
    }
  }, [listOfItemCards]);

  // shows favorites when selected
  useEffect(() => {
    if (showFavorites) {
      setNoFilterResultsMessage("");
      const newList = initalItemsList.filter((item) =>
        favoriteList.includes(item.props.petId)
      );
      setListOfItemCards([...newList]);
      setNoItemsMessage(
        newList.length == 0
          ? "Favorites List is empty, add a pet to your list to see it here!"
          : ""
      );
    }
    if (!showFavorites) {
      setNoItemsMessage("");
      setListOfItemCards([...listOfFilteredItems]);
    }
  }, [showFavorites]);

  // if an item is removed from the list while viewing favorites, display
  useEffect(() => {
    if (showFavorites) {
      const newList = initalItemsList.filter((item) =>
        favoriteList.includes(item.props.petId)
      );
      setListOfItemCards([...newList]);
      setNoItemsMessage(
        newList.length == 0
          ? "Favorites List is empty, add a pet to your list to see it here!"
          : ""
      );
    }
  }, [favoriteList]);

  // calculates the sum price of the favorites list
  useEffect(() => {
    const favoritesList = initalItemsList.filter((item) =>
      favoriteList.includes(item.props.petId)
    );
    let sum = 0;
    favoritesList.forEach((cardItem) => {
      sum += cardItem.props.adoptionFee;
    });
    setFavoritesPrice(sum);
  }, [favoriteList]);

  // handles sorting
  useEffect(() => {
    if (sortType !== "") {
      const priceBoolean = sortType === "price";
      const ageBoolean = sortType === "age";
      sorting(priceBoolean, ageBoolean);
    } else {
      setListOfItemCards([...listOfFilteredItems]);
      return;
    }
  }, [sortType]);

  // handles when descending sort is selected
  useEffect(() => {
    if (sortType !== "") {
      const priceBoolean = sortType === "price";
      const ageBoolean = sortType === "age";
      if (sortDescending) {
        sorting(priceBoolean, ageBoolean, true);
      } else {
        sorting(priceBoolean, ageBoolean, false);
      }
    }
  }, [sortDescending]);

  // handles filtering when one of the categories is selected
  useEffect(() => {
    handleFiltering();
  }, [
    filterGenders,
    filterPetType,
    filterVaccinated,
    filterSpayed,
    filterGoodWith,
    filterSmall,
    filterMedium,
    filterLarge,
  ]);

  /**
   * Handles sorting the item list
   * @param price : true if sorting by price
   * @param age : true if sorting by age
   * @param descending: true if sorting in a descending order
   * @param filteredList : optional list to pass in
   */
  const sorting = (
    price?: boolean,
    age?: boolean,
    descending?: boolean,
    filteredList?: JSX.Element[]
  ) => {
    let listToSort = [...initalItemsList];
    // check if the items are also being filtered
    if (filteredList) {
      listToSort = [...filteredList];
    } else if (
      filterGenders !== "" ||
      filterPetType !== "" ||
      filterGoodWith !== "" ||
      filterVaccinated ||
      filterSpayed ||
      filterSmall ||
      filterMedium ||
      filterLarge
    ) {
      listToSort = [...listOfFilteredItems];
    }
    let sortedList: JSX.Element[] = [];
    // sort by price or age
    if (price) {
      if (descending || sortDescending) {
        sortedList = listToSort.sort(
          (a, b) => b.props.adoptionFee - a.props.adoptionFee
        );
      } else {
        sortedList = listToSort.sort(
          (a, b) => a.props.adoptionFee - b.props.adoptionFee
        );
      }
    } else if (age) {
      if (descending || sortDescending) {
        sortedList = listToSort.sort((a, b) => b.props.age - a.props.age);
      } else {
        sortedList = listToSort.sort((a, b) => a.props.age - b.props.age);
      }
    }
    setListOfItemCards([...sortedList]);
  };

  /**
   * Handles filtering. Combines all the filters, and if there is a sort type selected
   * sorts the end filtering results
   */
  const handleFiltering = () => {
    let newList: JSX.Element[] = [...initalItemsList];

    if (filterGenders !== "") {
      newList = [...newList].filter(
        (item) => item.props.gender === filterGenders
      );
    }

    if (filterPetType !== "") {
      newList = [...newList].filter(
        (item) => item.props.petType === filterPetType
      );
    }

    if (filterVaccinated) {
      newList = [...newList].filter(
        (item) => item.props.healthVaccines === true
      );
    }

    if (filterSpayed) {
      newList = [...newList].filter(
        (item) => item.props.healthSpayedNeutered === true
      );
    }

    if (filterGoodWith !== "") {
      newList = [...newList].filter(
        (item) => item.props.goodInAHomeWith === filterGoodWith
      );
    }

    // checks all combinations of size
    if (filterSmall && filterMedium && filterLarge) {
      // not filtering here if all sizes are selected
    } else if (filterSmall && filterMedium) {
      newList = [...newList].filter(
        (item) => item.props.size === "Small" || item.props.size === "Medium"
      );
    } else if (filterSmall && filterLarge) {
      newList = [...newList].filter(
        (item) => item.props.size === "Small" || item.props.size === "Large"
      );
    } else if (filterLarge && filterMedium) {
      newList = [...newList].filter(
        (item) => item.props.size === "Large" || item.props.size === "Medium"
      );
    } else if (filterSmall) {
      newList = [...newList].filter((item) => item.props.size === "Small");
    } else if (filterMedium) {
      newList = [...newList].filter((item) => item.props.size === "Medium");
    } else if (filterLarge) {
      newList = [...newList].filter((item) => item.props.size === "Large");
    }

    setListOfFilteredItems([...newList]);

    // if a sorting type is selected, sort
    if (sortType !== "") {
      const priceBoolean = sortType === "price";
      const ageBoolean = sortType === "age";
      sorting(priceBoolean, ageBoolean, sortDescending, newList);
    } else {
      setListOfItemCards([...newList]);
    }
  };

  return (
    <div className="itemList">
      {listOfItemCards}
      {noItemsMessage.length !== 0 && (
        <div className="emptyList">
          <p>
            <i>{noItemsMessage}</i>
          </p>
        </div>
      )}
      {noFilterResultsMessage.length !== 0 && (
        <div className="emptyList">
          <p>
            <i>{noFilterResultsMessage}</i>
          </p>
        </div>
      )}
    </div>
  );
};
