## Link to Deployed Website

If you used the stencil code, this is https://<your GitHub username>.github.io/<name of your repository>

## Goal and Value of the Application

The goal of this application is to encourage people to adopt pets by streamlining the process of finding the right fit. Information about each pet is present on the ItemCard, specifying their age, breed/size, characteristics, health status, and what type of home the pet would do well in. Users can add pets to a favorite list, which aggregates the adoption fees for the favorited animals.

The value of the application is connecting people with animals who need homes instead of buying a dog through a breeder. By offering many cateogries to filter by and sort from, as well as sort descending or ascending, people have a better chance at finding the right pet for them. This makes the process overall more efficient, as well as hopefully preventing 'search burnout' that some adopters have when faced with so many factors when rescuing a pet. Some people buy from breeeders/puppy mills because it is easier and there is less to consider. This app aims to make rescuing a pet easy by customizing the type of pet a person is looking for.

## Usability Principles Considered

## Organization of Components

Each pet is contained within an ItemCard, which contains all the information about the pet and formats the card, as well as handling adding/removing the card from the favorites list.

All ItemCards are contained within the ItemList. The ItemList handles filtering and sorting and rendering which cards are shown.

## How Data is Passed Down Through Components

App.tsx contains the Filters component and the ItemList component. The ItemList is composed of ItemCards.

The ItemCard contains 14 props with all the information about the pet. The prop values are used for filtering. ItemList intializes ItemCards by passing in the information about the pet.

The filters are contained within the Filters components, which handles the selection of filters and sorting and sets the respective state variables, which is used for filtering/sorting within ItemList.
