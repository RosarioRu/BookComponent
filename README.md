# _Curators for Little Readers_

#### By _**Rosario Ruvalcaba**_

#### _A React web app for caregivers of young children track and review children's books._

## Technologies Used
* _React_
* _Firebase/Firestore_
* _JavaScript_
* _Node.js_
* _HTML_
* _JSX_
* _CSS_
* _Bootstrap_
* _Webpack_
* _Jest_

## Description

_WIP Application for parents and other caregivers to review and 'add' children's books to their list. The reviews added alter their own book collection as well as the 'reviews' collection so other users can see all reviews on a particual book. When a user adds a book, the program checks that it doens't already exist in the main book collection. If it does, the book gets added to the user's collection but not (as a duplicate) to the main book collection._

_The app features Firebase user authentication using email addresses and passwords. The user's email address is checked to ensure there are no duplicate email addresses entered. The email address used for an authenticated user also becomes the name of their own book collection._

_Site is rerendered using React, of course, so when updates occur, the user sees the changes in on their browser. Local state for what is displayed/showed is used, but book and user information is stored in firestore._

_Senstive information is stored in an .env file. Testing of the reducer logic was done using Jest._

## App Component Diagram

![Alt text](./img/plan.png) "Component Diagram")



## Setup/Installation Requirements

* _Clone repository from Github and save a copy on own computer_

* _Create the Firebase Project using your google account at https://firebase.google.com/ and after giving it a name, navigate to the project's homepage._

* _Set up Firestore: once in the Firebase Project Homepage, click 'build' on the left menu and select Firestore Database. Select 'Start in Test Mode' and leave default form values and click 'Enable' to start db creation._

* _Add webapp to Firebase: Return to the homepage of the Firebase project and click the </> icon from underneath the message 'Get started by adding Firebase to your app'. Register the web app by giving it a nickname._

* _Navitage to root directory of project on your computer_

* _Ensure you first commit and push the .gitignore file that lists .env as a file to ignore. Now We can add Firebase to the React app!_

* _In your terminal, add firebase to the React project using the command: npm install firebase@9 _*

* _Create .env file with the following: 

REACT_APP_FIREBASE_API_KEY = "YOUR-UNIQUE-CREDENTIALS"
REACT_APP_FIREBASE_AUTH_DOMAIN = "YOUR-PROJECT-NAME.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID = "YOUR-PROJECT-FIREBASE-PROJECT-ID"
REACT_APP_FIREBASE_STORAGE_BUCKET = "YOUR-PROJECT-NAME.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "YOUR-PROJECT-SENDER-ID"
REACT_APP_FIREBASE_APP_ID = "YOUR-PROJECT-APP-ID" _

* _Replace generic placeholder values above with the ones found in your Firebase project settings. Select Project settings in your project in Firebase, and scroll down until you find 'SDK setup and configuration.' This section will have yoru actual values for the firebaseConfig which you'll need to put into our .env file._

*_Create firebase.js file in src directory and add the following code (source: Epicodus)_
![Alt text](./img/configuration.png?raw=true "configuration")


* _In the terminal, enter: $ npm install. This will install the dependencies required for this project. It will also create the nodes_modules directory which will contain the actual packages and dependencies, as well as a list of these downloads in the package-lock.json file._

* _Next enter the command $ npm run build to bundle all the code and create a build directory_

* _You may also enter the command $ npm run start, which will open a webpack dev server and create and build the build directory at the same time. To exit this command in the terminal press Ctrl+C._

* _The live-server shoud now be ready to view and interact with in order to dynamically render the site as new user input is entered._

## Known Bugs

* _Application styling is in progress but currently very incomplete._

* _Some links (such as when a user tries to return to book list after reviewing a book) are not yet working._

* _If the home page is refreshed, the user's book collection does not load as the authenticated user's information is still loading._

## License

MIT License

Copyright (c) _December_2022_ _Rosario Ruvalcaba Harwood_