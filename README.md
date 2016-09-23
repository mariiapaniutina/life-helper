# life-helper
Utility Helpers

###What the idea
Idea to having proper logging for JS applications. And have possibilities to turn it on/off.
Next major version will have option to load logs to PIWIK or SPLUNK server.

###How to run
This is module, which contains logHelper for js applications.
To see, how it works -
1. Install via npm `npm install --save-dev life-helper`
2. Install all required dependencies via `npm install`
3. Run simple nodejs webserver via `node server.js`
4. Open an example for `require.js` in your browser => `http:localhost:8091/index_require.html?LIFE_MODE=DEBUG`

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
