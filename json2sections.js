const fs = require('fs');

let parsedContent = require("./data/parsedtext.json");

let filename = "";
let filelist = {};

parsedContent.forEach(content=>{
    if((' '+content.speaker).search(/[^主任]委員.*/g) >-1 && content.speaker!=filename)
    {
        filename = content.speaker;
        filelist[filename] = [];
    }
    filelist[filename].push(content);
});

Object.keys(filelist).forEach(filename=>{
    fs.writeFileSync('./data/sections/'+filename+'.json',JSON.stringify(filelist[filename],null,4));
})