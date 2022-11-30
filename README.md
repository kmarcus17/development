## Link to Deployed Website

https://limitless-ridge-25630.herokuapp.com/

## Goal and Value of the Application

The goal of this application is to encourage people to adopt pets by streamlining the process of finding the right fit. Information about each pet is present on the ItemCard, specifying their age, breed/size, characteristics, health status, and what type of home the pet would do well in. Users can add pets to a favorite list, which aggregates the adoption fees for the pets on the list.

The value of the application is connecting people with animals who need homes instead of buying a dog through a breeder. By offering many categories to filter by and sort from, as well as sort in descending or ascending order, people have a better chance at finding the right pet for them. This makes the process overall more efficient, as well as hopefully preventing 'search burnout' that some adopters have when faced with so many factors when rescuing a pet. Some people buy from breeders/puppy mills because it is easier and there is less to consider. This app aims to make rescuing a pet easy by customizing the type of pet a person is looking for.

## Usability Principles Considered

One usability principle used was customizability. Filters a1nd sorting can be combined, in any order. For the size category, multiple options can be selected in case size is not a defining factor and they are open to multiple sizes. Another is consistency, all buttons have the same hover style and each card has the same layout. Another is feedback: a message appears when a combination of filters leads to no matching results suggesting they change their filter parameters, and when no items are in the favorites list, a message appears instructing them to add items to the favorites list to see it there. Additionally, efficiency was considered. There are buttons to clear the filters selected and sorting that is selected so that they can restart their search quicker. Lastly, design and layout were considered. Color is used to signify which items are in the favorites list. The color of the text on the button also changes for higher contrast. The primary color is subtle and doesn’t distract the user, but is used throughout the components so that the page is cohesive. The layout is responsive, and the items are set up in a grid, so the number of columns adjusts as the size of the screen is adjusted. The font-size also adjusts depending on the view width. The control panel has a min width so that it is always usable. Additionally, the user can scroll through the list of items independently of the control bar so that it is always visible.

## Organization of Components

Each pet is contained within an ItemCard, which contains all the information about the pet and formats the card, as well as handling adding/removing the card from the favorites list.

All ItemCards are contained within the ItemList. The ItemList handles filtering and sorting and rendering which cards are shown.

## How Data is Passed Down Through Components

App.tsx contains the Filters component and the ItemList component. The ItemList is composed of ItemCards.

The ItemCard contains 14 props with all the information about the pet. The prop values are used for filtering. ItemList initializes ItemCards by passing in the information about the pet via props.

The filters are contained within the Filters components, which handles the selection of filters and sorting and sets the respective state variables, which is used for filtering/sorting within ItemList.

Recoil, a state management library, was used so that I could observe all state changes throughout the components. I wanted to do this for readability of code and to keep some components separate. For example, in the Filtering file, it changes the recoil state variables, which are also used in ItemList to filter/sort the items.

UseState is still used regularly for many parts, for example to handle the checking of the boxes and updating the ItemsList for rendering when filtering.

All the states that use recoil can be found in Atom.tsx and use UseRecoilState, useRecoilValue, or UseRecoilSetState.
