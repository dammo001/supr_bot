// To use:



var supreme = require('./utils/ApiMethods.js');
var fs = require('fs');

var Benchmark = require('benchmark');

// Find Product Based on Keywords
// const keywords = "Small Box";
// const style = 'White';
// const category = 'new';

// supreme.seek(category, keywords, style, (product, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(product);
// });

// grab and write to file for original invetnory
// get current ALL inventory
function getCurrentAllInventory(original) {
	if (original) {
		supreme.getItems('all', (product, err) => {
	    if (err) {
	        console.log(err);
	        return err;
	    }

	  	// if with original param then need to write a new history to file

	  	var json = JSON.stringify(product, null, 4);
			fs.writeFile("og_slim_inventory.json", json,'utf8', function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("The file was saved!");
			    return
			}); 
  	})
  } else {
  		supreme.getSlimItems('all', (slim_product, err) => {
  			if (err) {
  				console.log(err);
  				return err;
  			}
  			slim_product.push(    {
        "title": "Supreme&#xAE;/The North Face&#xAE; Metallic Mountain Parka",
        "link": "http://www.supremenewyork.com/shop/jackets/sxjhcn3vb/fhi8y7d",
        "addCartURL": "http://www.supremenewyork.comundefined",
        "sizesAvailable": null
    },
    {
        "title": "Nylon Turnout Jacket",
        "link": "http://www.supremenewyork.com/shop/jackets/arvf7nh8s/jbo7wp",
        "addCartURL": "http://www.supremenewyork.comundefined",
        "sizesAvailable": null
    },)
	    	setInterval(function() {comparisonFunc(slim_product)}, 1000)
  		})
	 	}
}

const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))

const myDiff = makeSymmDiffFunc((x, y) => x.link === y.link)

// comparison function
// grabs links from og_inventory.json and compares to current list of inventory to return difference
function comparisonFunc(compare, callback) {
	var og;
	// first reads file
	fs.readFile('og_inventory.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  og = JSON.parse(data);
	  // returns whats new
	  console.log('DIFFERENCE:')
		console.log(myDiff(og, compare))
		// callback(myDiff(og, compare))

	});

	// then compares links to current list obj.link <--> compare.link

}

getCurrentAllInventory()
// poor attempt at testing (haha)
// var suite = new Benchmark.Suite;

// suite.add('testbench', getCurrentAllInventory())
// 	.on('complete', function() {
//   console.log(this)
// })
// 	.run({ 'async': true });


// supreme.getItem('http://www.supremenewyork.com/shop/shoes/rkxgtf1n2/rgrx634kb', (item, err) => {
//      if (err) {
//          console.log(err);
//          return err;
//      }
//      //console.log(item);
//  });

// saving callback(path, id)
// longpolling()
// every n seconds, ask a question
// keep track of when the question is answered correctly