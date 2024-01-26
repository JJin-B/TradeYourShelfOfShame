# Trade Your Shelf of Shame

## Purpose
This project aims to create a dedicated platform for board gamers looking to trade their less-played board games, often referred to as the "Shelf-of-Shame." While there are various platforms for trading used items, there's a noticeable gap when it comes to board games.

### Key Features:
1. Game Database Integration:
Users can easily add their games for buying, selling, or trading by selecting titles from the comprehensive Board Game Geek's board game list.

2. Trade Listings:
In addition to traditional buying and selling, users can list games they're willing to trade. This unique feature encourages a dynamic exchange of board games within the community.

3. Interest Notifications:
Users can create a list of games they are interested in. Whenever another user publishes a relevant listing, the interested user receives notifications, facilitating potential trades.

By providing a platform specifically tailored for board gamers, this project aims to foster a vibrant community centered around the shared passion for board games. Through efficient game matching and personalized notifications, users can easily connect with others who share their gaming preferences and expand their collections.


## Installation
1. Clone this repository `git clone https://github.com/JJin-B/TradeYourShelfOfShame.git`
2. Navigate to the project directory `cd TradeYourShelfOfShame`
3. Install dependencies `npm install`

## Backend Dependency
This project assumes running the backend using another repository: [TradeYourShelfOfShame-Backend](https://github.com/JJin-B/TTYS-Backend). Follow the instructions in the backend repository to set up and run the server.


## Run
1. Ensure you have completed the installation steps outlined in the "Installation" section.
2. Open `src/Wrapper/AuthContext.tsx`
3. Update `isLocal` variable to `true` if you running on local server. `const isLocal = true`
4. Update `apidAddress` variable with the address of your backend server. 
5. Run TypeScript compiler: `tsc` (to convert Typescript to JavaScript)
6. Start the app `npm run dev`
7. Open your browser and go to `http://localhost:PORTNUMBER` to access the website. Make sure to replace the port number placeholder with the actual port number used for the development server. 



