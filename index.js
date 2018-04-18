'use strict';

// [START language_quickstart]
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze
const text = '夏波議員在午餐會時說到他有個夢想，他的夢想就是美國參眾兩院一起邀請蔡總統去國會演講，過去可能有一些限制，但這個法案的推動可以讓我們知道這些美國友人對臺灣的支持非常堅定，從兩年前的夏天到現在，你會發現他們一直持續在做這樣的事。我覺得新政府對這個事情可以更積極一些，而且不只是在公務方面，其實我和吳釗燮部長一起去美國訪問過一、兩次，有些私人行程，不論是到D.C . 或智庫，甚至是FAPA的邀請，我想這些在未來都可能會成行。'
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects sentiment of entities in the document
client
  .analyzeEntities({document: document})
  .then(results => {
    let entities = results[0].entities;

    console.log('Entities:');
    // entities = entities.sort((a,b)=> (a.salience>b.salience)?1:-1)
    entities.forEach(entity => {
      console.log(entity.name);
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      if (entity.metadata && entity.metadata.wikipedia_url) {
        console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      }
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });