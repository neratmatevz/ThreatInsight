# Frontend Setup

## Getting started
- Install the required dependencies:
```
npm install
```

- Start the frontend :
```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
## Set Environment Variables

Create a `.env` file in the root directory of your frontend project and add the following key:

| Variable Name       | Description                       | Example Value                  |
|---------------------|-----------------------------------|--------------------------------|
| `REACT_APP_API_URL` | URL for the backend API endpoint  | `http://localhost:3001`     |

## Set Up Firebase

You will need to create your own Firebase account and configure it for this project. Follow these steps:

1. **Create a Firebase Account**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - If you don't have an account, create one and sign in.

2. **Create a New Firebase Project**:
    - Click on `Add Project` and follow the prompts to create a new project.
    - Once the project is created, navigate to the project settings.

3. **Generate Firebase Config File**:
    - In the Firebase Console, go to `Project Settings`.
    - Under the "Your apps" section, select the web icon to create a new web app.
    - Follow the prompts and then you will be presented with your Firebase SDK configuration.
    - Click on "Config" and copy the configuration.
    - Create a `firebase-config.json` file in the `src/Firebase` directory of your project and paste the configuration there.



