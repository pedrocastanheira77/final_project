// CLinetID: 9212

// This Id identifies your application to the Stack Exchange API. Your application client id is not secret, and may be safely embeded in distributed binaries.
// Pass this as client_id in our OAuth 2.0 flow.
// Client Secret (reset) 5L0wOVu9zwm89gEspmcNAw((
// Pass this as client_secret in our OAuth 2.0 flow if your app uses the explicit path.
// This must be kept secret. Do not embed it in client side code or binaries you intend to distribute. If you need client side authentication, use the implicit OAuth 2.0 flow.
// Key Gvi3HHcYwsdm2K69OzxUnQ((

var stackitem = require('./StackOverflowOutputItem.js');
var request = require('request-promise');

function StackOverflowBar(){

}

StackOverflowBar.prototype.decideStringForAPI = function (theDocument) {
  var searched = theDocument.getElementById("lst-ib").value;
  var stringForAPI = searched.replace(/(?:\d*\.)?\d+/g, '');
  return stringForAPI;
}

StackOverflowBar.prototype.getStackAPI = function (string, number) {
  return new Promise(function(resolve, reject) {
    var reqUri = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q="+string+"&site=stackoverflow&key=Gvi3HHcYwsdm2K69OzxUnQ((";
    request({
      uri: reqUri,
      json: true,
      gzip: true
    }).then(function(response) {
        var array = [];
        for (var i = 0; i < number; i++) {
          if (response.items[i]) {
            var item = [response.items[i].title, response.items[i].link, response.items[i].view_count, response.items[i].answer_count, response.items[i].score];
            array.push(new stackitem(item[0], item[1], item[2], item[3], item[4]));
          };
        }
      resolve(array);
    });
  });
}


StackOverflowBar.prototype.stackAPIresult = function (theDocument) {
  var exampleSOresult = theDocument.createElement("p");
  exampleSOresult.id = "exampleSOresult";
  // 'HERE!' IS WHERE GETSTACKAPI(STRING, NUMBER) SHOULD BE USED
  exampleSOresult.innerHTML = this.decideStringForAPI(theDocument)
  return exampleSOresult;
}


StackOverflowBar.prototype.createStackOverflowDiv = function (theDocument) {
  var stackOverflowDiv = theDocument.createElement('div');
  stackOverflowDiv.id = "stackOverflow";
  stackOverflowDiv.appendChild(this.stackAPIresult(theDocument));
  return stackOverflowDiv
};

//TEST FROM HERE

StackOverflowBar.prototype.getRequestedNumberOfLinks = function(theChrome) {
  theChrome.storage.local.get(function(result){
    savedNumberOfLinks = result.stackOverflowResults;
  });
}

StackOverflowBar.prototype.stackOverflowDiv = function(currentDiv, requestedNumberOfLinks) {
  var stackOverflowDiv = this.createStackOverflowDiv(document);
  currentDiv.parentNode.insertBefore(stackOverflowDiv, currentDiv);
  this.createStackOverflowTitle(stackOverflowDiv);
  if (!requestedNumberOfLinks) {
      requestedNumberOfLinks = 5;
    }
  this.insertStackOverflowAPI(requestedNumberOfLinks, stackOverflowDiv);
}

StackOverflowBar.prototype.createStackOverflowTitle= function(stackOverflowDiv) {
  var stackOverflowTitle = document.createElement("h2");
  stackOverflowTitle.className = "stackoverflow_title";
  stackOverflowTitle.insertAdjacentHTML('afterbegin', "STACK OVERFLOW");
  stackOverflowDiv.insertAdjacentElement('afterbegin', stackOverflowTitle);
  return stackOverflowTitle;
}

StackOverflowBar.prototype.createStackOverflowDiv = function(theDocument) {
  var stackOverflowDiv = theDocument.createElement("div");
  stackOverflowDiv.id = "stackoverflowbar";
  stackOverflowDiv.className = "devlinq_div stackoverflow_div";
  return stackOverflowDiv;
}

StackOverflowBar.prototype.insertStackOverflowAPI = function(requestedNumberOfLinks, stackOverflowDiv){
  var stackoverflowsearch = this.decideStringForAPI(document);
  this.getStackAPI(stackoverflowsearch, requestedNumberOfLinks).then(function(items){
    var numberOfLinks = Math.min(requestedNumberOfLinks, items.length);
    var googleResultUrls = document.getElementsByClassName("_Rm");
    for(var i = 0; i < numberOfLinks; i++){
      stackOverflowDiv.insertAdjacentHTML('beforeend',
        '<div class="so_item"><a href='+items[i].getUrl()+'><p class="linq linq_so">'+items[i].getTitle()+'</p><p class="so_info">View Count: '+items[i].getViewCount()+'; Answer Count: '+items[i].getAnswerCount()+'; Score: '+items[i].getScore()+'</p></a></div>');
      for(var x = 0; x < googleResultUrls.length; x++){
        if (items[i].getUrl().includes(googleResultUrls[x].innerHTML)){
          var box = googleResultUrls[x].parentNode.parentNode.parentNode.parentNode;
          if (box) {box.parentNode.removeChild(box);}
        }
      }
    }
  });
}


module.exports = StackOverflowBar;
