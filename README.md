# karma-ReNotify-reporter

> Reporter using the ReNotify.us API to send notifications to connected users.

Based on [karma-osx-reporter](https://github.com/petrbela/karma-osx-reporter).

## Requirements

1. karma >= 0.9
2. A ReNotify.us API key

## Installation

1. Install the karma-renotify-reporter plugin.

  a. Globally. System-wide with `karma` available on command line.

    ```sh
    npm install -g karma-renotify-reporter
    ```

  b. Locally to your project (preferred). Simply run:

    ```sh
    npm install karma-renotify-reporter --save-dev
    ```

    or add the dependencies to `package.json` manually and run `npm install`:

    ```js
    "devDependencies": {
      "karma": ">=0.9",
      "karma-renotify-reporter": "*"
    }
    ```
2. Install a valid config at ~/.renofity.cfg.json
```BASH
cp node_modules/karma-renotify-reporter/renotify.cfg.json.example ~/.renotify.cfg.json
```

3. Add it as a reporter in the karma config file

  ```js
  reporters: ['progress', 'renotify']
  ```

  or pass through the command line

  ```sh
  $ karma start --reporters=progress,renotify karma.conf.js
  ```

## Configuration

You will need a valid ReNotify.us API key to use the public server. Please contact me for more information.

Edit the ~/.renotify.cfg.json with your API key.

```js
{
  "host": "renotify.us",
  "port": 80,
  "path": "/api/v1/messages",
  "key": "58D79D10-53E5-4A4B-A7AC-3C437B2E4AAC"
}
```

## License

MIT License

[PetrBela's karma-osx-reporter]: https://github.com/petrbela/karma-osx-reporter
[homepage]: http://renotify.us
