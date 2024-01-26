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








## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
