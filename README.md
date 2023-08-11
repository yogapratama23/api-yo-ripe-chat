## Running the app
```bash
# install all dependencies
$ npm install

# copy .env.example file to .env
$ cp .env.example .env

# fill .env file with your local configuration
# .env file example

APP_PORT=3030
MONGO_URI=mongodb://localhost:27017/simple_chat

# run the app
  # using nest cli
  $ nest start || $ nest start --watch

  # using npm
  $ npm run start || npm run start:dev
```