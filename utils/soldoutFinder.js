'use strict';
let supreme = require('./ApiMethods');
let fs = require('fs');
let d = new Date().toISOString().split('T')[0];
let cacheList = [];
let cacheListLength;

let generateList = (getSoldOut, getRestock) => {
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

    let availableItems = products.filter((product) => {
      return product.availability !== 'Sold Out';
    });

    let soldOutItemsLength = soldOutItems.length;

    cacheListLength = cacheList.length || 0;

    if(soldOutItemsLength !== cacheListLength) {
      //check difference
      Array.prototype.diff = function (a) {
        return this.filter(function (i) {
          return a.indexOf(i) === -1;
        });
      };
      let newSoldOutItems = soldOutItems.diff(cacheList);
      let restockItems = cacheList.diff(availableItems);

      //generate new time
      let newTime = getHourMinutesSeconds();
      let outputFileArray = [];

      newSoldOutItems.forEach(function(item) {
          let slashFilter = item.image.substr(item.image.lastIndexOf('/') + 1).replace('_', ' ').replace('-', ' ');
          outputFileArray.push({
            color: item.style,
            title: item.title,
            timeStamp: newTime,
            productId: slashFilter
          })
      });

      if(getSoldOut) {
        fs.appendFileSync(`soldout_list_${d}.json`, JSON.stringify(outputFileArray), (err) => {
          if (err) throw err;
        });
      }

      if(getRestock) {
        if(restockItems && restockItems.length) {
          fs.appendFileSync(`newAvailableList${d}.json`, JSON.stringify(restockItems), (err) => {
            if (err) throw err;
          });
        }
      }

      cacheList = soldOutItems;
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
  }
};

let runInterval = (intervalLength, getSoldOut, getRestock) => {
  setInterval(function(){ generateList(getSoldOut, getRestock) }, (10000 || intervalLength));
};
