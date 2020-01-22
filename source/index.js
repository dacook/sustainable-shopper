const fs = require('fs');

let rawdata = fs.readFileSync('data/councils.json');
let councils = JSON.parse(rawdata);


// Search Pizza Boxes in Moreland
let found = councils['Moreland City Council']['Co-mingled recycling'].indexOf('Pizza Boxes (clean)');
console.log(found);

