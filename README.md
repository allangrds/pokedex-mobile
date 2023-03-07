# Pokedex Mobile

## Table of content

- [Requeriments](#requeriments)
- [Installation](#installation)
- [How to execute](#how-to-execute)
- [Technologies](#technologies)
- [Tech decisions](#tech-decisions)

## Requeriments

- Volta 1.1.0 or Node 16.18.1
- iOs Simulator or Android Simulator

## Installation

- Execute `npm install`

## How to execute

- Execute `npx expo start` and choose your favorite device

## Technologies

- React 18.2.0
- React Native 0.71.3
- Expo 48.0.5
- Typescript 4.9.4

## Tech decisions

- I used Expo instead of pure React Native to make development easier. This is a very small application, and it needs to have speed to be able to do it;
- I split the service layer to try to make things as decoupled as possible. Normally I would have a service that would import the axios or a fetch api and make a request. My idea was that the service layer has no implementation details, just a known interface and uses its methods. In addition, the requester(axios, fetch) itself would not have prior knowledge of the service url, receiving it as a parameter. To work around this, I ended up creating a context to receive the api url, and this api url, via context, would be imported into the hook and then passed to the request service;
