var supreme = require('./index.js');
var fs = require('fs');

var Benchmark = require('benchmark');
// || require('supreme-api');

// Find Product Based on Keywords
const keywords = "Small Box";
const style = 'White';
const category = 'new';

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
	supreme.getItems('all', (product, err) => {
	    if (err) {
	        console.log(err);
	        return err;
	    }
	    

	    // if with original param then need to write a new history to file
	    if (original) {
	    	var json = JSON.stringify(product, null, 4);
				fs.writeFile("og_inventory.json", json,'utf8', function(err) {
				    if(err) {
				        return console.log(err);
				    }
				    console.log("The file was saved!");
				    return
				}); 
	    } else {
	    	product.push({
	        "title": "Supreme&#xAE;/The North Face&#xAE; Metallic Mountain Parka",
	        "style": "Silver",
	        "link": "http://www.supremenewyork.com/shop/jackets/sxjhcn3vb/dfkjdfd",
	        "description": "Breathable, waterproof metallic coated nylon ripstop with fully sealed seams and all nylon faille weave at shoulders, elbows, and cuffs. Full zip closure with snap placket and three interior zippered pockets. Zippered alpine pockets and pit zips. Logo patches on right sleeve and embroidered logo at left chest and on back shoulder. Made exclusively for Supreme.",
	        "addCartURL": null,
	        "price": 388,
	        "image": "https://assets.supremenewyork.com/149728/vi/Jk6XHIjRGvg.jpg",
	        "sizesAvailable": null,
	        "images": [
	            "https://assets.supremenewyork.com/149728/zo/Jk6XHIjRGvg.jpg",
	            "https://assets.supremenewyork.com/149729/zo/Dc6OSrcFF-o.jpg",
	            "https://assets.supremenewyork.com/149730/zo/mZoRZlsnvt8.jpg"
	        ],
	        "availability": "Sold Out"
    		}
    ,)
	    	comparisonFunc(product)
	    }

	});
}

const diffBy = (pred) => (a, b) => a.filter(x => !b.some(y => pred(x, y)))
const makeSymmDiffFunc = (pred) => (a, b) => diffBy(pred)(a, b).concat(diffBy(pred)(b, a))

const myDiff = makeSymmDiffFunc((x, y) => x.link === y.link)

// comparison function
// grabs links from og_inventory.json and compares to current list of inventory to return difference
function comparisonFunc(compare) {
	var og;
	// first reads file
	fs.readFile('og_inventory.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  og = JSON.parse(data);

		console.log(myDiff(og, compare))

	});

	// then compares links to current list obj.link <--> compare.link

}
var suite = new Benchmark.Suite;

suite.add('testbench', getCurrentAllInventory())
	.on('complete', function() {
  console.log(this)
})
	.run({ 'async': true });


// supreme.getItem('http://www.supremenewyork.com/shop/shoes/rkxgtf1n2/rgrx634kb', (item, err) => {
//      if (err) {
//          console.log(err);
//          return err;
//      }
//      //console.log(item);
//  });