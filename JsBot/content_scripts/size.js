//we are in the item we are looking for
chrome.storage.sync.get(['working_codes', 'sizes'], function(res){
  const size_options = $('select option');
  const no_options = $('select option').length == 0
  const addToCart = $("#add-remove-buttons :input");
  let notFound = false;

  if (no_options){
    if (addToCart && addToCart[0]) {
      addToCart[0].click();
    } else {
      notFound = true;
    }
  }

  else {
    let size_choice = ''
    let select_idx = 0
    let found_size = false

    res.sizes.forEach( (size) => {
      for (let i = 0; i < size_options.length; i++){
        let select_text = $(size_options[i]).text()
        if (!found_size && size.toLowerCase() === select_text.toLowerCase()){
          select_idx = i
          size_choice = size
          found_size = true
        }
      }
    });

    if(found_size){
      let select = document.getElementsByTagName('select')[0]
      select.selectedIndex = select_idx
      if (addToCart && addToCart[0]) {
        addToCart[0].click();
      } else {
        notFound = true;
      }
    } else {
      notFound = true;
    }
  }

  var goToNextItem = () => {
    var img_codes = res.working_codes;
    img_codes.pop();

    chrome.storage.sync.set({
      working_codes: img_codes
    }, function(){

      var type = ''
      if(img_codes.length == 0) type = 'done'
      else type = 'keep_going'

      setTimeout(() => {
        chrome.runtime.sendMessage({type: type});
      }, 200);
    });
  }

  var add = false;
  $('#cctrl').bind("DOMNodeInserted", (e) => {
    if(add) return
    add = true;
    goToNextItem();
  });

  if (notFound) goToNextItem();
});
