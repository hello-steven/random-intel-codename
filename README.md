# Random Intel Codenames

[![CircleCI](https://circleci.com/gh/whiteboxpub/random-intel-codename.svg?style=svg)](https://circleci.com/gh/whiteboxpub/random-intel-codename)

Simple app for getting random Intel codename

## Public URL
Hosted on Heroku Free Tier
### https://random-intel-codename.herokuapp.com/


> ![Preview Gif](https://raw.githubusercontent.com/whiteboxpub/random-intel-codename/master/readme_assets/random-intel-codename.gif)

## Inspiration
+ Mattias P Johansson's side project naming method. Featured in this [FunFunFunction Video](https://www.youtube.com/watch?v=NRrgtUJnkIo&feature=youtu.be&t=4m40s)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

+ node >= v6.9
+ npm >= v3.5

### Installing

To get Random Intel Codename server running on your local machine do the following steps.

1. ```git clone https://github.com/whiteboxpub/random-intel-codename.git```
1. ```cd random-intel-codename```
1. ```./install.sh```
1. ```npm run start```  ||  ```npm run start-watch```

nodemon should now be active running the server on port 3000. You can access the frontend via **http://localhost:3000** . For just getting names you can request **http://localhost:3000/name** . Changes in the code will auto reload thanks to nodemon.  

## Running the tests

Yay TDD! We are currently using dependency injection with along side libraries: mocha, chai, sinon, and supertest to facilitate testing. Also have CircleCI hooked up to make sure all test are passing before merging pull request.  

### Run test locally

Run tests once: ``` npm run test ```

*mocha included as dependancy so you don't have to have mocha installed globally 

Continuously run tests on file save: ```npm run test-watch``` 

*currently can't run tests while running the server because both use port 3000

### And coding style tests

We use [ESLint](https://eslint.org/) to avoid divergent coding styles. The process goes:

```npm run lint```  --> fix style errors --> repeat 

## Deployment

### Heroku deployment
1. Follow install instructions to get things up and running locally first.
1. Make sure you have heroku account and [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
1. Init heroku with ```heroku create```
1. Push code to heroku ```./deploy.sh```
1. Create a single dyno ```heroku ps:scale web=1```
1. Open Project with ```heroku open```. 
1. Boom the app is live on the web!
1. Add `/name` to the URL to just return a random codename. 

## Built With
* [Express.js](https://expressjs.com/) - The Nodejs server  framework used
* [axios](https://github.com/axios/axios) - The request library used
* [Babel](https://babeljs.io/) - The ES6 compiler used
* [NPM](https://www.npmjs.com/) - The dependency manager used


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases page](https://github.com/whiteboxpub/random-intel-codename/releases). 

## Authors
+ **Steven Price** - *Inital work* - [stevenjacobprice.com](https://www.stevenjacobprice.com/), [GitHub](https://github.com/whiteboxpub)
+ **Travis Shears** - *Initial work* - [travisshears.com](https://travisshears.com/),
[GitHub](https://github.com/BTBTravis/)

See also the list of [contributors](https://github.com/whiteboxpub/random-intel-codename/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://raw.githubusercontent.com/whiteboxpub/random-intel-codename/master/LICENSE.md) file for details

## Acknowledgments

* All data is scraped from [this](https://en.wikipedia.org/wiki/List_of_Intel_codenames) wikipedia page. These names are probally under Intel copywrite. 
