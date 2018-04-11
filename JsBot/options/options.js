function save_options() {
  var img_codes = document.getElementById('img_codes').value.split(',');
  var sizes = document.getElementById('size').value.split(',');
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var address = document.getElementById('address').value;
  var address2 = document.getElementById('address-2').value;
  var zip = document.getElementById('zip').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var country = document.getElementById('country').value;
  var card_type = document.getElementById('card-type').value;
  var card_number = document.getElementById('card-num').value;
  var exp_mon = document.getElementById('exp-mon').value;
  var exp_yr = document.getElementById('exp-yr').value;
  var cvv = document.getElementById('cvv').value;
  var checkout_delay = document.getElementById('checkout_delay').value;

  var buy_auto = document.getElementById('auto').checked;

  chrome.storage.sync.set({
    img_codes: img_codes,
    working_codes: img_codes,
    sizes: sizes,
    name: name,
    email: email,
    phone: phone,
    address: address,
    address2: address2,
    zip: zip,
    city: city,
    state: state,
    country: country,
    card_type: card_type,
    card_number: card_number,
    exp_mon: exp_mon,
    exp_yr: exp_yr,
    cvv: cvv,
    buy_auto: buy_auto,
    checkout_delay: checkout_delay,
    running: false

  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function init() {
  chrome.storage.sync.get({
    img_codes: '',
    sizes: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    card_type: '',
    card_number: '',
    exp_mon: '',
    exp_yr: '',
    cvv: '',
    checkout_delay: '0',
    buy_auto: false,
    running: false

  }, function(items) {
    document.getElementById('img_codes').value = items.img_codes;
    document.getElementById('size').value = items.sizes;
    document.getElementById('name').value = items.name;
    document.getElementById('email').value = items.email;
    document.getElementById('phone').value = items.phone;
    document.getElementById('address').value = items.address;
    document.getElementById('address-2').value = items.address2;
    document.getElementById('zip').value = items.zip;
    document.getElementById('city').value = items.city;
    document.getElementById('state').value = items.state;
    document.getElementById('country').value = items.country;
    document.getElementById('card-type').value = items.card_type;
    document.getElementById('card-num').value = items.card_number;
    document.getElementById('exp-mon').value = items.exp_mon;
    document.getElementById('exp-yr').value = items.exp_yr;
    document.getElementById('cvv').value = items.cvv;
    document.getElementById('auto').checked = items.buy_auto;
    document.getElementById('checkout_delay').value = items.checkout_delay;

    //load json with items

    var request = new XMLHttpRequest()
    request.open('GET', 'https://4e6qoos5w0.execute-api.us-east-1.amazonaws.com/test?_=' + new Date().getTime(), true)

    request.onload = function(){
      if (request.status >= 200 && request.status < 400){
        var json = JSON.parse(request.responseText).Items

        newest = new Date(0)
        new_str = ''
        for (let item of json){
          d = new Date(item.updateTime.slice(0, 8));
          if (d > newest) {
            newest = d
            new_str = item.updateTime;
          }
        }

        $('#lu').text(new_str)
        display_items(json)

        //update added items

        code_arr = items.img_codes
        for(code in code_arr){
          code = code_arr[code]
          elt = document.getElementById(code)

          elt.classList.remove('btn-dark')
          elt.classList.add('btn-success')
          elt.innerHTML = 'added'
        }
      }
    }
    request.send()


  });

}

function display_items(items){
  item_list = document.getElementById('item-list')

  for(i in items){
    i = items[i]
    item = document.createElement('li')
    item.classList.add('list-group-item')
    btn = '<button id="'+i.itemCode+'" type="button" class="btn btn-sm btn-dark float-sm-right">add</button>'
    item.innerHTML = i.title + '\t' + i.color + '\t' + btn

    item_list.appendChild(item)

    btn = document.getElementById(i.itemCode)
    btn.onclick = function(e) {
      itemCode = e.target.id

      //togggle btn and update item list
      toggleBtn(itemCode)
      console.log('sending analytic info')
      postData('https://yie3r47kbf.execute-api.us-east-1.amazonaws.com/test', {itemCode: itemCode})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error))
    }
  }
}


function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

function toggleBtn(id){
  elt = document.getElementById(id)
  //we just added this, change to blue
  if(hasClass(id, 'btn-dark')){
    elt.classList.remove('btn-dark')
    elt.classList.add('btn-success')
    elt.innerHTML = 'added'

    codes = document.getElementById('img_codes')
    if(codes.value.length == 0) newCodes = id
    else newCodes = codes.value + ',' + id

    codes.value = newCodes

  }
  else{
    elt.classList.remove('btn-success')
    elt.classList.add('btn-dark')
    elt.innerHTML = 'add'

    codes = document.getElementById('img_codes')
    current_items = codes.value.split(',')
    new_items = ''
    for(item in current_items){
      item = current_items[item]
      if(item != id){
        new_items += item + ','
      }
    }

    codes.value = new_items.substring(0, new_items.length - 1) //chop off last ,


  }
}

function hasClass(id, className){
  elt = document.getElementById(id)
  list = elt.classList.value.split(' ')
  return list.indexOf(className) > -1
}

document.addEventListener('DOMContentLoaded', init);
document.getElementById('save').addEventListener('click', save_options);

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-114925064-1']);
_gaq.push(['_trackPageview']);


$(function(){

  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

  jQuery.expr[':'].icontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
  };

  $('#item-search').bind("propertychange input", function(e){
    item = e.target.value
    $('#item-list > li:not(:icontains('+item+'))').hide();
    $('#item-list > li:icontains('+item+')').show();
  })

})
