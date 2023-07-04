# Mailtrap Node.js client

## Installation

Use yarn or npm to install the package:

```sh
yarn add railsware-nodejs-testtask

# or, if you are using NPM:
npm install railsware-nodejs-testtask
```

## Basic Usage

```javascript
const { MailTrapClient } = require("railsware-nodejs-testtask");

const client = new MailTrapClient({
  user: "ef*********0a1", //EDIT WITH YOUR CREDENTIALS
  pass: "b*********10de", //EDIT WITH YOUR CREDENTIALS
});

await client.send({
  from: "from@barfoo.com",
  to: ["foo@bar.com"],
  subject: "Hello World (Cool Subject)",
  text: "Hello World! (Cool Text)",
  html: "<html><head></head><body><h1 style='font-family:Arial;color:red;'>Hello World(Cool HTML Body!)</h1></body></html>",
});
```

Refer to the [`all.test.ts`](all.test.ts) file for the source code of these examples.
