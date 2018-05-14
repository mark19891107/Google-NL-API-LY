fs = require('fs');

let nameList = require('./settings/speakerList.json');
let paperList = require('./settings/paperList.json');
let parsedContent = [];

fs.readFile('./data/transcript.txt', 'utf8', function (err, data) {

    var data = data.replace(/\n/g, "").replace(/\r/g, "");
    nameList.map(name => {
        var reg = new RegExp(name + "：", "g");
        data = data.replace(reg, "@@@" + name + "：");
    })

    paperList.map(name => {
        var reg = new RegExp(name + "：", "g");
        data = data.replace(reg, "@@@" + name + "：");
    })

    data.split("@@@").map(content => {
        if(content!=""){
            parsedContent.push({ "speaker": content.split('：')[0], "speech": content.split('：').slice(1).join('：') })
        }
        
    })

    fs.writeFileSync('parsedtext.json', JSON.stringify(parsedContent, null, 4));

});