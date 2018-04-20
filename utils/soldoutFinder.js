'use strict';
let supreme = require('./ApiMethods');
let fs = require('fs');
let d = new Date().toISOString().split('T')[0];
let cacheList = [];
let cacheListLength;

let generateList = (counter) => {
  //create a file if it doesn't exist
  generateFile();

  //call supreme api to get new items
  supreme.getItems('new', (products, err) => {
    if (err) {
      return err;
    }

    //filter out sold out items
    let soldOutItems = products.filter((product) => {
      return product.availability === 'Sold Out';
    });
    let soldOutItemsLength = soldOutItems.length;

    cacheListLength = cacheList.length || 0;

    if(soldOutItemsLength > cacheListLength) {
      //check difference
      Array.prototype.diff = function (a) {
        return this.filter(function (i) {
          return a.indexOf(i) === -1;
        });
      };
      let newSoldOutItems = soldOutItems.diff(cacheList);

      //generate new time
      let newTime = getHourMinutesSeconds();

      fs.appendFileSync(`soldout_list_${d}.json`, JSON.stringify(newSoldOutItems), (err) => {
        if (err) throw err;
        console.log('data was appended to file!');
      });

      cacheList = soldOutItems;
    } else {
      console.log('no new sold out items');
    }
  });
};

let getHourMinutesSeconds = () => {
  let hms = new Date();
  let seconds = hms.getSeconds();
  let minutes = hms.getMinutes();
  let hour = hms.getHours();
  hms = hour + ':' + minutes + ':' + seconds;
  return hms
};

let generateFile = () => {
  if (!fs.existsSync(`soldout_list_${d}.json`)) {
    fs.writeFileSync(`soldout_list_${d}.json`, '', (err) => {
      if (err) throw err;
    });
    console.log('generated file');
  } else {
    console.log('file already exists');
  }
}

setInterval(function(){ generateList() }, 2000);
//TODO: appendtimestamp as part of objs
//TODO: why does second interval not work