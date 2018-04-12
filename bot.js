// /// 
// ///
// To use:
// 1. Call getCurrentSlimInventory(comparisonFunc) 


var supreme = require('./utils/ApiMethods.js');
var fs = require('fs');
var Benchmark = require('benchmark');

// writes to a file
function writeFile(filename, data) {
	fs.writeFile(filename, data,'utf8', function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	    return
	}); 	
};

// saves all inventory (not slimmemd down json)
// then writes to og_inventory.json
function getCurrentAllInventory() {
	supreme.getItems('all', (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
  	var json = JSON.stringify(product, null, 4);
  	writeFile("og_inventory.json", json)
	})
};

// get current Slim inventory 
function getCurrentSlimInventory(callback) {
	supreme.getSlimItems('all', (slim_product, err) => {
		if (err) {
			console.log(err);
			return err;
		}
// <----------------------/////////////////////////////////////------------------------------->

		// for testing if function returns difference
// 		slim_product.push(    {
//     "title": "Supreme&#xAE;/The North Face&#xAE; Metallic Mountain Parka",
//     "link": "http://www.supremenewyork.com/shop/jackets/sxjhcn3vb/fhi8y7d",
//     "addCartURL": "http://www.supremenewyork.comundefined",
//     "sizesAvailable": null
// },
// {
//     "title": "Nylon Turnout Jacket",
//     "link": "http://www.supremenewyork.com/shop/jackets/arvf7nh8s/jbo7wp",
//     "addCartURL": "http://www.supremenewyork.comundefined",
//     "sizesAvailable": null
// },)
// <----------------------/////////////////////////////////////------------------------------->

// runs comparisonFunc with slim inventory list
		if (callback) {
			callback(slim_product)
		} else {
			writeFile("og_slim_inventory.json",slim_product)
		}
		
	})
}
// <----------------------/////////////////////////////////////------------------------------->

// compares by .link and returns new inventory
const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))

const myDiff = makeSymmDiffFunc((x, y) => x.link === y.link)

// <----------------------/////////////////////////////////////------------------------------->

// comparison function
// grabs links from og_inventory.json and compares to current list of inventory to return difference
function comparisonFunc(compare, callback) {
	var og;
	// first reads file
	fs.readFile('og_slim_inventory.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  og = JSON.parse(data);
	  // returns whats new
	  console.log('DIFFERENCE:')
		console.log(myDiff(og, compare))
		// callback(myDiff(og, compare))

	});

	// then compares links to current list obj.link <--> compare.link

}
// <----------------------/////////////////////////////////////------------------------------->

// Every second, gets slimmed down inventory list and compares
// returns difference between both arrays
setInterval(function() {getCurrentSlimInventory(comparisonFunc)}, 1000)

// <----------------------/////////////////////////////////////------------------------------->




// <----------------------/////////////////////////////////////------------------------------->
// poor attempt at testing (haha)
// var suite = new Benchmark.Suite;

// suite.add('testbench', getCurrentAllInventory())
// 	.on('complete', function() {
//   console.log(this)
// })
// 	.run({ 'async': true });
// <----------------------/////////////////////////////////////------------------------------->


// <----------------------/////////////////////////////////////------------------------------->

// supreme.getItem('http://www.supremenewyork.com/shop/shoes/rkxgtf1n2/rgrx634kb', (item, err) => {
//      if (err) {
//          console.log(err);
//          return err;
//      }
//      //console.log(item);
//  });


// supreme.seek(category, keywords, style, (product, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(product);
// });
// <----------------------/////////////////////////////////////------------------------------->
