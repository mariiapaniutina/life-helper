# life-helper
This is module, which contains logHelper for js applications.

###What the idea
Idea to having proper logging for JS applications. And have possibilities to turn it on/off.<br />
Next major version will have option to load logs to PIWIK or SPLUNK server.

###How to run
To see, how it works:<br />
 * Install via npm `npm install --save-dev life-helper` or just download from GitHub<br />
 * Install all required dependencies via `npm install`<br />
 * Run simple nodejs webserver via `node server.js`<br />
 * Open an example:<br />
   * For `require.js` -> `http:localhost:8091/index_require.html?LIFE_MODE=DEBUG` or `http:localhost:8091/index_require.html?LIFE_MODE=FULL_DEBUG`<br />
   * Like reqular library -> `http:localhost:8091/index.html?LIFE_MODE=DEBUG` or `http:localhost:8091/index.html?LIFE_MODE=FULL_DEBUG`<br />

### AMD example (using `require.js`)
```
index_require.html
```

### jQuery way example (using global `LIFE` variable)
```
index.html
```

Run all examples with query `?LIFE_MODE=DEBUG` or `?LIFE_MODE=FULL_DEBUG`

P.S
Tested only in Chrome and FF.
