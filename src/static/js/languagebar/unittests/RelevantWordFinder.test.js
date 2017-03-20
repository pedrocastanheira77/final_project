var assert = require('chai').assert;
var Language = require('../LanguagesBar.js');
var haveLanguage = require('../RelevantWordFinder.js').haveLanguage;
var haveVersion = require('../RelevantWordFinder.js').haveVersion;
var haveTopic = require('../RelevantWordFinder.js').haveTopic;


describe('ReleventWordFinder', function(){
  var lang = new Language();
  describe('#haveLanguage', function(){
    it('checks if language is in our library', function(){
      var string = "jaVASCRIPT";
      assert.equal(haveLanguage(string, lang), true);
    })
    it('check is not case sensitive', function(){
      var string = "jaVASCRIPT";
      assert.equal(haveLanguage(string, lang), true);
    })
    it('pluralize and unpluralize', function(){
      var string = "jaVASCRIPTs";
      assert.equal(haveLanguage(string, lang), true);
    })
  })

  describe('#haveVersion', function(){
    it('checks if version is in our library', function(){
      var version = "ecmascript5.1";
      assert.equal(haveVersion(version, lang.javascript), true);
    })
  })

  describe('#haveTopic', function(){
    it('checks if topic is in our library', function(){
      var topic = "atomics";
      assert.equal(haveTopic(topic, lang.javascript), true);
    })
    it('pluralize and unpluralize', function(){
      var topic = "atomic";
      assert.equal(haveTopic(topic, lang.javascript), true);
    })
  })
});
