# Fortuna LMS API SDK

 [![Build Status](https://travis-ci.org/KnowledgeAnywhere/FortunaSDK.svg?branch=master)](https://travis-ci.org/KnowledgeAnywhere/FortunaSDK)

SDK for Interacting with the Fortuna LMS API.   *This SDK is still in development and not ready for general use.*

contact support@knowledgeanywhere.com if you would like more information.

[Documentation](https://knowledgeanywhere.githubpages.com/FortunaSDK)

## Installation and Getting Started

- You will need Audience and Secret keys for authorization.   These can be obtained by going to into the admin panel for your lMS and navigating to Site > External API keys.
- run the cmd `npm i fortunasdk` to get the package.
- The SDK expects the constants `AUDIENCE` and `SECRET` to be present as process variables.

## Issues

- Bugs related to the SDK should be filed under this Github Repository.  Be sure to include your Node version and any relevant error information.
- Issues with the Fortuna API itself should be emailed to support@knowledgeanywhere.com

## Contributing

- Clone repo onto your machine
- Create a .env file with `AUDIENCE`, `SECRET` & `ENVIRONMENT` keys.   Fill in `AUDIENCE` and `SECRET` from the values that are attained in the Fortuna admin.  Set environment to `stage`.
- Run `npm install`
- To run tests run `npm tests`

To update documentation, run `npm run-script generate-docs`

### Pull Requests will not be considered until public availability

### ![http://www.knowledgeanywhere.com](data:image/png;base64,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)