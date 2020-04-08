# Campaign Wars
> A project done for [Campaign Monitor](https://www.campaignmonitor.com) using the [Star Wars API](http://swapi.co) and React/Redux to search, view, upvote/downvote, and comment on Star Wars characters.

[![Demo](http://i.imgur.com/no1GgIx.gif)]()


# Features

* State management with [redux]() and [react-redux]()
* Routing with latest [react-router v4](https://github.com/ReactTraining/react-router/tree/master/packages/react-router)
* Async / side-effects handling with [redux-saga](https://github.com/redux-saga/redux-saga)
* Component styling with [styled-components](https://github.com/styled-components/styled-components)
* [Bootstrap v4 components](https://v4-alpha.getbootstrap.com) with [reactstrap](https://github.com/reactstrap/reactstrap)
* [Hot module reloading](http://chrisshepherd.me/posts/adding-hot-module-reloading-to-create-react-app)
* All the goodies from [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
* Deployment to Github pages


# Getting Started

This project was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app), following (most) of the recommended conventions listed in their [documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Install the dependencies using npm / yarn:

```
npm install
```

Then to run the application in development mode with hot reloading:

```
npm start
```

To compile and build the application for production:

```
npm run build
```

To deploy to github pages:

```
npm run deploy
```

To run tests with an interactive watch mode:

```
npm test
```

# TODO

- [ ] Homeworld should be displayed on the main page
  - Still considering options for firing many concurrent requests ([gist](https://gist.github.com/victorouse/c8a27f102d645fe4640e5b9f63386da9))
- [ ] Characters on main page should be ordered by popularity
- [ ] Persist state in localStorage so it survives a refresh (see: [link](https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage))
- [ ] Load next paginated set of characters on button press / on scroll
- [ ] Attempt to search / retrieve character from Star Wars API [search endpoint](http://swapi.co/documentation#search) when not found in current state
- [ ] Normamlize and use [reselect](https://github.com/reactjs/reselect) to deal with some ugly nesting of state with [normalizr](https://github.com/paularmstrong/normalizr)
- [ ] Use [redux-form](https://github.com/erikras/redux-form) instead of current gross implementation
- [ ] Refactor `/components` directory to be split by domain
  - i.e. `/components/common/*`, `/components/search/*`, `/components/detail/*`
- [ ] Refactor certain presentational components which are deeply nested to [connected containers](http://redux.js.org/docs/faq/ReactRedux.html#react-multiple-components), props-all-the-way-down gets ugly
- [ ] Tests..
  - [ ] Side-effects / sagas with [jest](https://github.com/facebook/jest)
  - [ ] Components with [enzyme](https://github.com/airbnb/enzyme)


# Issues

* Load home planet from state if present, currently makes request regardless
* Comment text remains after submitting comment
