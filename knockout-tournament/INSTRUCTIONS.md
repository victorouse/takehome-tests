## Instructions

Developing on your local machine simply involves running:

```
npm install
```

And invoking one of the following npm commands:

```
# starts express server on port 8765
npm start

# runs integration tests using mocha
#   ./test/integration/**/*_test.js
npm run test:integration

# runs and watches unit tests using karma
#   '../../client/**/*.js'
#   '../../test/karma/**/*_test.js'
npm run test:karma

# runs unit tests and produces a coverage report
npm run cover:client

# runs integration tests and produces a coverage report
npm run cover:client

# runs integration and unit tests then publishes the result to codecov
npm run cover:publish

# runs integration and unit tests (once)
npm test
```

## Docker

Included in the repository is a `Dockerfile` which you can use to build and run the application. In order to do so, first build the docker image:

```
docker build -t <your-name>/<your-image-name> .
```

And then run:

```
docker run -it <your-name>/<your-image-name>
```

Which will run install the dependencies and run `npm start` for you. The Dockerfile exposes port `8765` so you should be able to access the application via `localhost:8765` like you do normally.


## Vagrant

Included in the repository is a `Vagrantfile` which provisions a machine and installs the dependencies required to run the application.

And now you can simply run:

```
vagrant up
```

Then ssh into the machine:

```
vagrant ssh
```

After which you can procede to install the npm dependencies and begin development.

### Watch Functionality

By default this box uses NFS to sync the host and guest machine. However, most applications which have 'watch' functionality (i.e. Karma) cannot detect changes made on the host and trigger the watch command on the guest.

If you wish to enable this functionality, install the [vagrant-gatling-rsync](https://github.com/smerrill/vagrant-gatling-rsync) plugin to sync files written on the host machine to the guest machine.

Install the plugin via:

```
vagrant plugin install vagrant-gatling-rsync
```

And comment out the `sync_nfs(...)` line in the `Vagrantfile`, then uncomment the lines underneath it:

```
# Sync app from host
# Use NFS for general purpose
sync_nfs(config, "./", "/home/vagrant/challenge")

# Use rsync if in need of watch functionality
# config.vm.synced_folder "./", "/home/vagrant/challenge",
#   type: "rsync",
#   rsync__args: ["--verbose", "--archive", "-z"]
```

Running `vagrant up` will start vagrant-gatling-rsync automatically and watch for changes.

#### Syncing Back Guest -> Host

Vagrant-gatling-rsync does not support bi-directional syncing, so if you create changes or add files or folders directly on the guest machine, they will not be reflected on the host. You can use [vagrant-rsync-back](https://github.com/smerrill/vagrant-rsync-back) to manually pull these changes back to the host. Useful when you want to push commits for example.

Install it via:

```
vagrant plugin install vagrant-rsync-back
```

And on the host machine run:

```
vagrant rsync-back
```

### Ports

The server port `8765` is port-forwarded to port `8765` on the host machine, as well as the karma port `9876` and chrome remote debugging port `5858` / `9222`.

So to access the application on your host machine simply go to `localhost:8765` / `127.0.0.1:8765`, or optionally you can create an alias for this in `/etc/hosts`:

```
127.0.0.1   localhost
127.0.0.1   canva.dev
```
