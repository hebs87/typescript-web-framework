# TypeScript Web Framework

This is a web framework written in TypeScript. It uses `JSON Server` for backend data
storage.

## Install `parcel-bundler`

You will need to install `parcel-bundler` to run the project by running the following
command in the terminal:

`npm install -g parcel-bundler`

## Install and Configure `JSON Server`

To install and configure the `JSON Server`, complete the following steps:

1. Install JSON Server globally by running the `npm install -g json-server` in the terminal
2. Create a `db.json` file in the project's root directory with the following code
```
{
  "users": []
}
```
3. Add the following scripts in the `package.json` file
```
  "scripts": {
    "start:db": "json-server -w db.json",
    "start:parcel": "parcel index.html"
  }
```

## Run the Project and Database

After completing the above steps, run the following commands in separate terminal windows:

1. `npm run start:db`
2. `npm run start:parcel`
