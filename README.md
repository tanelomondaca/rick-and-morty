# RickAndMorty

This project is an Angular application that displays character data from the [Rick and Morty API](https://rickandmortyapi.com/). It includes features like filtering by name, species, status, and gender, displaying total counts by species, and pagination.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Features

- 🔍 Filter characters by name, species, status, and gender.
- 📋 Paginated list of characters.
- ⭐ Mark and unmark characters as favorites.
- 📊 Summary of total characters by species.
- 📍 Display location and origin information.
- 🗓 Show character creation date in a readable format.

## Development server

To start a local development server, run:

```bash
ng serve
```
Navigate to http://localhost:4200/ in your browser. The app will automatically reload if you change any of the source files.

## Standalone Components
This application uses Angular standalone components. Make sure to check how modules and dependencies are imported directly into components using the imports array in the @Component decorator.

## Internationalization
The application supports the Spanish locale (es-ES) for date formatting. If you encounter errors related to missing locale data, make sure to import the locale in your main.ts file:

```bash
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
```
