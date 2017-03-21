var expect = require('chai').expect;
var Ruby = require('../lib/RubyInBar.js');
var language;

describe('Ruby', function(){
  beforeEach(function(){
    language = new Ruby;
  });

  it("#generateOfficialDocsURL", function(){
    var version = "2.1.3";
    var topic = "Array";
    var resultURL = language.generateOfficialDocsURL(version, topic);
    var expectedURL = "https://ruby-doc.org/core-2.1.3/Array.html";
    expect(resultURL).to.equal(expectedURL);
  });

  it("#nameOfDoc", function(){
    var offDocs = language.nameOfDoc();
    expect(offDocs).to.equal("Ruby-doc");
  });
});
