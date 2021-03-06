const express = require('express');
const {readFileSync} = require('fs');
const handlebars = require('handlebars');

const app = express();
// Serve the files in /assets at the URI /assets.
app.use('/assets', express.static('assets'));
app.use('/lang-app', express.static('lang-app/out'));
app.use('/estudio', express.static('site/estudio'));
app.use('/escola', express.static('site/escola'));

// The HTML content is produced by rendering a handlebars template.
// The template values are stored in global state for reuse.
const data = {
  service: process.env.K_SERVICE || '???',
  revision: process.env.K_REVISION || '???',
};
let template;

app.get('/', async (req, res) => {
  // The handlebars template is stored in global state so this will only once.
  if (!template) {
    // Load Handlebars template from filesystem and compile for use.
    try {
      template = handlebars.compile(readFileSync('index.html.hbs', 'utf8'));
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  }

  // Apply the template to the parameters to generate an HTML string.
  try {
    const output = template(data);
    res.status(200).send(output);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/estudio', async (req, res) => {
    try {
        readFileSync('index.html', 'utf8');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/escola', async (req, res) => {
    try {
        readFileSync('index.html', 'utf8');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api', async (req, res) => {
    res.status(200).send('API funcionando corretamente!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The lang-app container started successfully and is listening for HTTP requests on ${PORT}`
  );
});
