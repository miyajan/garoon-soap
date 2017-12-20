# garoon-soap

Garoon SOAP API client library for JavaScript applications (both on web browser and Node.js).

[![npm version](https://img.shields.io/npm/v/garoon-soap.svg)](https://www.npmjs.com/package/garoon-soap)
[![npm downloads](https://img.shields.io/npm/dm/garoon-soap.svg)](https://www.npmjs.com/package/garoon-soap)
![License](https://img.shields.io/npm/l/garoon-soap.svg)

## Overview

garoon-soap is an isomorphic JavaScript library utilizing Garoon SOAP API. It works both in the browser and Node.js.

With this library, you can use Garoon SOAP API without considering XML which is too hard for developers to handle.

[Supported APIs](https://developer.cybozu.io/hc/ja/categories/200157760-Garoon-API)

## Setup

### Node.js

Install ```garoon-soap``` via npm.

```
npm install garoon-soap
```

Require ```garoon-soap``` in your Node.js code.

```
const GaroonSoap = require('garoon-soap');
const garoon = new GaroonSoap('https://example.cybozu.com/g/', 'username', 'password');

// example
const start = new Date();
const end = new Date();
end.setDate(start.getDate() + 1);
garoon.schedule.getEvents(start, end).then(events => {
    console.log(events);
});
```

### Web Browser

Download ```garoon-soap.min.js``` from [Releases](https://github.com/miyajan/garoon-soap/releases).

Load it by ```<script src="/path/to/garoon-soap.min.js"></script>```.

Then, you can use ```GaroonSoap``` class in your JavaScript.

```
// You can use session authorization if you have already logged-in to Garoon.
const garoon = new GaroonSoap('https://example.cybozu.com/g/');

// example
const start = new Date();
const end = new Date();
end.setDate(start.getDate() + 1);
garoon.schedule.getEvents(start, end).then(events => {
    console.log(events);
});
```

## License

MIT

## Author

[miyajan](https://github.com/miyajan): Jumpei Miyata miyajan777@gmail.com
