// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

var generator = function(file, callback) {

  console.log(file);
  var columns = [];

  var searchForKeys = function(child){
    for(let key in child) {
      if(child[key].constructor === Object || Array.isArray(child[key])) {
        if(_.isEmpty(child[key])) {
          continue;
        }
        searchForKeys(child[key]);
      }
      else {
        columns.push(key);
      }
    }
};

  searchForKeys(file);

  columns = _.uniq(columns);

  var output = [];
  var searchForRecords = function(child) {
    var line = [];
    for(let key in child) {
      if(child[key].constructor === Object || Array.isArray(child[key])) {
        if(_.isEmpty(child[key])){
          continue;
        }
        searchForRecords(child[key]);
      }
      else{
        for(let i = 0; i < columns.length; i++){
          if(key === columns[i]) {
            line.push(child[key]);
            break;
          } else if (i === columns.length-1) {
            line.push("");
          }
        }
      }
    }
    output.push(line);
  }

  searchForRecords(file);

  var outputString = columns.join(',') + '\n';
  output.forEach((line) => {
    if(line.length > 0){
      line.join(',');
      outputString += line + '\n';
    }
  });
  //console.log(outputString);
  let filePath = path.resolve(__dirname, '..','public','csv_report.csv');
  fs.writeFile(filePath, outputString, (err)=>{
    if(err){
      console.log('err: ', err);
    }else{
      callback();
    }
  });

};



module.exports = generator;


  // if (this.value === target) {
  //   return true;
  // }
  // if (this.children.length > 0) {
  //   result = _.some(this.children, function(node) {
  //     if (node.value === target) {
  //       return true;
  //     } else {
  //       return _.some(node.children, function(nod) {
  //         if (nod.value === target) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //     }
  //   });
  // }



// firstName,lastName,county,city,role,sales
// Joshie,Wyattson,San Mateo,San Mateo,Broker,1000000
// Beth Jr.,Johnson,San Mateo,Pacifica,Manager,2900000
// Smitty,Won,San Mateo,Redwood City,Sales Person,4800000
// Allen,Price,San Mateo,Burlingame,Sales Person,2500000
// Beth,Johnson,San Francisco,San Francisco,Broker/Sales Person,7500000

// {
//   "firstName": "Joshie",
//   "lastName": "Wyattson",
//   "county": "San Mateo",
//   "city": "San Mateo",
//   "role": "Broker",
//   "sales": 1000000,
//   "children": [
//   {
//     "firstName": "Beth Jr.",
//     "lastName": "Johnson",
//     "county": "San Mateo",
//     "city": "Pacifica",
//     "role": "Manager",
//     "sales": 2900000,
//     "children": [
//       {
//         "firstName": "Smitty",
//         "lastName": "Won",
//         "county": "San Mateo",
//         "city": "Redwood City",
//         "role": "Sales Person",
//         "sales": 4800000,
//         "children": []
//       },
//       {
//         "firstName": "Allen",
//         "lastName": "Price",
//         "county": "San Mateo",
//         "city": "Burlingame",
//         "role": "Sales Person",
//         "sales": 2500000,
//         "children": []
//       }
//     ]
//   },
//   {
//     "firstName": "Beth",
//     "lastName": "Johnson",
//     "county": "San Francisco",
//     "city": "San Francisco",
//     "role": "Broker/Sales Person",
//     "sales": 7500000,
//     "children": []
//   }
// ]
// };