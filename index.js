var util = require('util');
var http = require('http');
var fs = require('fs');
var renotifyConfig = undefined;

var ReNotifyReporter = function(helper, logger, config) {
  var config = fs.readFileSync(process.env.HOME + "/.renotify.cfg.json", "utf8")
  renotifyConfig = JSON.parse(config);

  var log = logger.create('reporter.renotify');
  log.info("ReNotify reporter started at http://%s with clientId: %s", renotifyConfig.host, renotifyConfig.key);

  this.adapters = [];

  this.onBrowserComplete = function(browser) {
    report(browser.lastResult, browser);
  };

  this.onRunComplete = function(browsers, results) {
    if (browsers.length <= 1 || results.disconnected) { return; }

    report(results);
  };

  function sendReport(message, title) {
    var messageToPost = JSON.stringify({
      'title': title,
      'message': message
    });

    var options = {
      host: renotifyConfig.host,
      port: renotifyConfig.port,
      path: renotifyConfig.path + "?clientId=" + renotifyConfig.key,
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': messageToPost.length
      }
    };

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('Response: ', chunk);
      });
    });

    req.write(messageToPost);
      req.on('error', function(err) {
        log.error('error: ' + err.message);
      });

    req.end();
  }

  function report(results, browser) {
    var title, message;
    var time = helper.formatTimeInterval(results.totalTime);

    if (results.disconnected || results.error) {
      title = util.format('ERROR - %s', browser.name);
      message = 'Test error';
    }
    else if (results.failed) {
      title = util.format('FAILED - %s', browser.name);
      message = util.format('%d/%d tests failed in %s.', results.failed, results.total, time);
    } else {
      title = util.format('PASSED - %s', browser.name);
      message = util.format('%d tests passed in %s.', results.success, time);
    }

    sendReport(title, message);
  }
};

ReNotifyReporter.$inject = ['helper', 'logger', 'config'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:renotify': ['type', ReNotifyReporter]
};
