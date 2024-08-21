# Pokedex Web App

![Pokedex App](https://ser-dialest.github.io/GifTastic/assets/images/PokemonLogo.png)

## Overview

The **Pokedex Web App** is an interactive application built using HTML, CSS, and JavaScript, which utilizes the [PokeAPI](https://pokeapi.co/) to fetch and display detailed information about Pokémon. The app allows users to search for Pokémon by name or ID, view their stats, abilities, type, and evolution chain, and even listen to their cries.

## Features

- **Search Pokémon**: Users can search for any Pokémon by entering its name or ID.
- **Navigation**: Navigate between Pokémon using the arrow buttons or keyboard shortcuts.
- **Detailed Information**: Displays comprehensive details about the Pokémon, including its type, abilities, height, weight, and base experience.
- **Evolution Chain**: Visualize the Pokémon's evolution chain.
- **Sprites**: View different sprites of the Pokémon, including shiny and gender-specific forms.
- **Audio**: Play the latest and legacy cries of the Pokémon.

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling and layout, including responsive design for various devices.
- **JavaScript**: Core logic, DOM manipulation, and API interactions.
- **PokeAPI**: External API used to retrieve Pokémon data.

## Getting Started

### Prerequisites

Ensure you have a modern web browser installed. The app is purely front-end and does not require a backend or database.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pokedex-app.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd pokedex-app
    ```
3. **Open `index.html` in your browser to run the app:**
    ```bash
    open index.html
    ```

## Usage

- **Search Pokémon**: Type a Pokémon's name or ID into the search bar and press Enter or click the "SEARCH" button.
- **Navigation**: Use the left and right arrow buttons on the app interface or press the left/right arrow keys on your keyboard to browse through Pokémon.
- **Play Cries**: Click on the "Latest sound" or "Legacy sound" buttons to listen to the Pokémon's cries.
- **View Evolution**: The evolution chain of the Pokémon is displayed, showing its progression.

## Code Overview

### Key Functions

- `playCriesLatestFunction()`: Plays the latest cry of the current Pokémon.
- `playCriesLegacyFunction()`: Plays the legacy cry of the current Pokémon.
- `getPokemon()`: Fetches and renders the Pokémon data based on user input.
- `getPokemonSpecies()`: Retrieves species-related data like habitat and gender rate.
- `getPokemonEvolutionChain()`: Fetches and displays the Pokémon's evolution chain.
- `renderPokemon()`: Updates the UI with the fetched Pokémon's information.
- `nextPokemon()`: Navigates to and displays the next Pokémon.
- `previousPokemon()`: Navigates to and displays the previous Pokémon.

## Responsive Design

The app is designed to be fully responsive, ensuring a consistent experience across devices, including desktops, tablets, and smartphones.

## Challenges and Solutions

- **API Error Handling**: Managed errors with fetch requests and provided user feedback for invalid inputs.
- **Responsive Layout**: Used flexible CSS techniques to ensure the app works well on various screen sizes.
- **Dynamic Content**: Integrated the PokeAPI to dynamically update the UI based on user interactions.

## Future Improvements

- **Advanced Search Filters**: Allow users to filter Pokémon by type, ability, or region.
- **Favorites Feature**: Enable users to save their favorite Pokémon for quick access.
- **Additional Data Points**: Display more detailed information, such as base stats or breeding information.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the existing style and conventions.


## Contact

For any inquiries or feedback, please reach out via [LinkedIn](https://www.linkedin.com/in/yourprofile/) or [GitHub](https://github.com/your-username).
