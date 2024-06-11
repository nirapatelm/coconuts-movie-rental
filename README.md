# Coconuts Movie Rental
Nira Patel and Varsha Narayan
CS 340 - Final Project

## Overview
This project is designed to create a robust database and user interface for managing a movie rental business. The system efficiently handles inventory, sales, and customer information. The business carries thousands of titles available for rent, with a projected 10,000 rental transactions per year. This system ensures the smooth operation of rental activities, tracks customers and rental history, manages inventory, and provides insights for better business decisions.

## Installation
### Prerequisites
Node.js v14.17.0 or later

npm v6.14.13 or later

### Steps
#### Clone the repository:

`git clone https://github.com/nirapatelm/coconuts-movie-rental.git`

#### Install dependencies:

`npm install`
### Usage
#### Running the Project
To start the development server, run:

`npm start` in `coconuts-movie-rental`

`node server.js` in `coconuts-movie-rental/backend`

This will run the app in development mode. Open http://localhost:3000 to view it in the browser.

#### Building for Production
To create a production build, run:

`npm run build`

This will create an optimized build of the application in the build folder.

#### Deploying
Before deploying, ensure you have configured gh-pages:

`npm run deploy`

### Dependencies

This project is built using the following key dependencies:

- React for building user interfaces (`react`, `react-dom`).
- Material-UI for component design (`@mui/material`, `@mui/icons-material`, `@mui/lab`).
- Emotion for CSS-in-JS styling (`@emotion/react`, `@emotion/styled`).
- React Hook Form for form handling (`react-hook-form`).
- Axios for making HTTP requests (`axios`).
- Express for backend server (`express`, `cors`).
- MySQL for database interactions (`mysql`, `mysql2`).
- React Router for client-side routing (`react-router-dom`).


## Citations
**Material-UI (June 2024) Material-UI (v^5.0.0) [Library]. Retrieved from [https://mui.com/].**

- The **DataGrid** offers a robust grid system for managing large datasets with advanced functionalities like sorting and filtering. **Button** enables interactive elements with customizable styles and actions. **Container** and **Grid** assist in creating consistent and responsive layouts, while **Box** offers flexible layout options. **MenuItem** serves as options within dropdowns, and **FormControl** manages layout and state for form inputs. **InputLabel** improves form accessibility, and **Select** allows for dropdown selections with various styles and control modes. Used in the following sections:

    - `return ()` of /components/Customers.js
    - `return ()` of /components/Genre.js
    - `return ()` of /components/MappingPage.js
    - `return ()` of /components/MoviePeople.js
    - `return ()` of /components/Movies.js
    - `return ()` of /components/People.js
    - `return ()` of /components/Rentals.js


**Axios (June 2024) Axios (v^1.7.2) [Library]. Retrieved from https://axios-http.com/.**

- **axios** is imported as a default module from the axios library. An Axios instance named **httpClient** is created with a base URL pointing to a specific API endpoint. This instance is used throughout the application to make HTTP requests to the specified base URL. By configuring axios with a base URL, it simplifies making requests to the API by providing a consistent base for relative URLs. Used in the following sections:
    - /utils/axiosInterceptor
    - `httpClient` instance from /utils/AxiosInterceptor is used multiple times in:
        - /components/Customers.js
        - /components/Genre.js
        - /components/MappingPage.js
        - /components/MoviePeople.js
        - /components/Movies.js
        - /components/People.js
        - /components/Rentals.js
