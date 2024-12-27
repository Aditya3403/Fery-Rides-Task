#Rides List Application

The Rides List Application is a React-based web application that allows users to register, view a list of available rides, and explore detailed ride information. It provides a clean, user-friendly interface with aesthetic design elements to enhance user engagement.

#Features

(1) User Registration

1. Users can register with a username and password.

2. A successful registration redirects users to the rides list page.

(2) Rides List

1. Displays all available rides in a visually appealing layout.

2. Each ride includes details such as:

  - Ride ID

  - Distance

  - Fare

  Users can click on a ride to view additional details.

(3) Styling

1. Aesthetic styling for registration forms and rides list.

2. Responsive design to ensure compatibility across devices.

#Setup Instructions

(1) Prerequisites

1. Node.js (v14 or later)

2. npm (v6 or later) or yarn

(2) Installation

1. Clone the repository:

  git clone <repository-url>
  cd project

2. Install dependencies:

  npm install

(3) Running the Application

1. Start the development server:

  npm start

2. Open your browser and navigate to:

  http://localhost:3000

#API Endpoints

1. Registration Endpoint

  - URL: http://localhost:3000/register

  - Method: POST

  - Request Body:
    
    {
      "username": "<username>",
      "password": "<password>"
    }

#Response:

{
  "message": "Registration successful"
}

2. Rides Endpoint

 - URL: http://localhost:3000/rides

 - Method: GET

 - Response:

    [
      {
        "id": 1,
        "distance": "10 km",
        "fare": "100"
      },
      {
        "id": 2,
        "distance": "15 km",
        "fare": "350"
      }
    ]

#Custom Styling

(1) Registration Form

1. Located in RegistrationForm.css

2. Clean and minimalistic design.

3. Responsive for mobile and desktop devices.

(2) Rides List

1. Located in RidesList.css

2. Box-styled layout for each ride.

3. Enhanced with hover effects and spacing.

