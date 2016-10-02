# life-helper
[![npm version](https://badge.fury.io/js/life-helper.svg)](https://badge.fury.io/js/life-helper)

### What is this
* This is module, which contains logHelper for js applications.

### What the idea
Idea to having proper logging for JS applications. And have possibilities to turn it on/off.<br />
Next major version will have option to load logs to `PIWIK` or `SPLUNK` server.

### Features
 * Simple usage example
   * `LogHelper.log('MyApplication :: START');`
   * `LogHelper.log('MyClass.myMethod :: START', options);`
 * Example with levels
   * `LogHelper.trace('Test for trace message');`
   * `LogHelper.info('Test for info message');`
   * `LogHelper.warn('Test for warning message');`
   * `LogHelper.error('Test for error message');`
   * `LogHelper.crit('Test for critical message');`
 * Example with tags
   * `LogHelper.traceTag('XTAG1', 'Test for trace message');`
   * `LogHelper.infoTag('XTAG1', 'Test for info message');`
   * `LogHelper.warnTag('XTAG1', 'Test for warning message');`
   * `LogHelper.errorTag('XTAG1', 'Test for error message');`
   * `LogHelper.critTag('XTAG1', 'Test for critical message');`

### How to run
 * Install via npm **`npm install --save-dev life-helper`** or just download from GitHub<br />
 * Install all required dependencies via **`npm install`**<br />
 * Run simple nodejs webserver via **`node server.js`**<br />
 * Open an examples:<br />
   * AMD => **`http://localhost:8091/examples/amd/index.html?LIFE_MODE=DEBUG`**<br /> 
   * IIFE => **`http://localhost:8091/examples/iife/index.html?LIFE_MODE=DEBUG`**<br />
   * CommonJS => in CLI, under **`/examples/commonJS`** run command **`node index.js`** <br />

Run all examples with query `?LIFE_MODE=DEBUG` or `?LIFE_MODE=FULL_DEBUG`
