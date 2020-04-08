# Knockout Tournament

> Or better known as..

[![demo](http://i.imgur.com/62IVqJM.gif)]()
___

<div style="text-align: center">

[![coverage](https://codecov.io/gh/victorouse/knockout-tournament/branch/master/graph/badge.svg?token=rFpBqg0eh5)](https://codecov.io/gh/victorouse/knockout-tournament)
[![build](https://travis-ci.com/victorouse/knockout-tournament.svg?token=fkyEskVKqc7ysAxNxq9P&branch=master)]()

</div>

___

## Getting Started

This project includes both a `Dockerfile` and a `Vagrantfile`, and can be run via either Docker or Vagrant, or even better Docker *in* Vagrant. Complete running instructions can be viewed [here](INSRTUCTIONS.md).

## Documentation

Files are commented with [jsdoc](usejsdoc.org) style comments and are output as markdown. The full documentation can be found [here](DOCUMENTATION.md).

## Features
- Class-based MVC pattern and dependency injection (see: [client/tournament](client/tournament))
- User receives feedback as soon as possible via an event log
  - Event-based updating of the view via listeners extended from the [View](client/base/view.js) class
- Async/await using [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
  - Promises are aggregated before being resolved for asynchronous tasks such as fetching all the first round team scores, getting match scores, etc.
  - See: [network waterfall graph](http://i.imgur.com/dkFPgUu.png)
  - See: [Google Web Fundementals: Async functions - making promises friendly](https://developers.google.com/web/fundamentals/getting-started/primers/async-functions#example_outputting_fetches_in_order)
- UI remains responsive when viewport size changes (see: [moving image](http://i.imgur.com/6iQjKGR.gifv))
- Code coverage via [istanbul](https://github.com/gotwarlost/istanbul) and [karma-coverage](https://github.com/karma-runner/karma-coverage)
  - Publishes coverage report to [codecov.io](https://codecov.io)
- [TravisCI](http://travisci.com) integration for continuous integration of builds
- Vagrant virtual machine so other developers have a consistent environment
  - NFS for general use and [rsync](https://github.com/smerrill/vagrant-gatling-rsync) for when you need to watch files for changes
- Docker for even more developer/production friendliness
- [Jsdoc](usejsdoc.org) style comments which can be exported to a markdown file with [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown)
- Pit Canva employees against each other to see who the ultimate winner is
  - If you're listed on LinkedIn, you will be here!
- Emojis 💪
  - Done with images and css `background-image: url(..)` so they render on all devices
- 🎉 CONFETTI 🎉

## Known Issues
- Karma tests pass locally (and in Vagrant running under Xvfb) but fail in Travis (see: [failing build log](https://gist.github.com/victorouse/70bf3f537aebf898517544097c47cfff)) but have passed before (see: [successful build log](https://gist.github.com/victorouse/ffe65e0e1ed80ff4fbb1f95ad0c48bbc))
- Jsdoc doesn't seem to like async/await keywords so it won't properly output files like [tournament.controller.js](client/tournament/tournament.controller.js) properly, despite trying the following [fix](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-ES2016-features)
