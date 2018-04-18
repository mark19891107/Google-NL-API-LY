fs = require('fs');

let parsedContent = require("./parsedtext.json");

let speakers = new Set(parsedContent.map(content => content.speaker));

let references = ""

speakers.forEach(speaker => {
    references = references + '<TLCPerson href="/ontology/person/::/' + speaker + '" id="' + speaker + '" showAs="' + speaker + '"/>'
})


meta = '<meta><references>' + references + '</references></meta>'

debateSection = '<heading>立委質詢</heading>';

parsedContent.forEach(content => {
    debateSection +=
        '<speech by="#' + content.speaker + '">' +
        '<p>' + content.speech + '</p>' +
        '</speech>';
})

debateBody = '<debateBody><debateSection>' + debateSection + '</debateSection></debateBody>'

an = '<akomaNtoso><debate>' + meta + debateBody + '</debate></akomaNtoso>';

fs.writeFileSync('parsedtext.an.xml', an);