function JQuery() {
  this.name = "JQuery",
  this.baseUrl = "http://api.jquery.com/",
  this.offDocs = "API JQuery",
  this.versions = [ "V1",
                    "V2"
                  ],
this.topics = [ "add()",
                "addBack()",
                "addClass()",
                "after()",
                "ajaxComplete()",
                "ajaxError()",
                "ajaxSend()",
                "ajaxStart()",
                "ajaxStop()",
                "ajaxSuccess()",
                "andSelf()",
                "animate()",
                "append()",
                "appendTo()",
                "attr()",
                "before()",
                "bind()",
                "blur()",
                "callbacks.add()",
                "callbacks.disable()",
                "callbacks.disabled()",
                "callbacks.empty()",
                "callbacks.fire()",
                "callbacks.fired()",
                "callbacks.fireWith()",
                "callbacks.has()",
                "callbacks.lock()",
                "callbacks.locked()",
                "callbacks.remove()",
                "change()",
                "children()",
                "clearQueue()",
                "click()",
                "clone()",
                "closest()",
                "contents()",
                "context",
                "contextmenu()",
                "css()",
                "data()",
                "dblclick()",
                "deferred.always()",
                "deferred.catch()",
                "deferred.done()",
                "deferred.fail()",
                "deferred.isRejected()",
                "deferred.isResolved()",
                "deferred.notify()",
                "deferred.notifyWith()",
                "deferred.pipe()",
                "deferred.progress()",
                "deferred.promise()",
                "deferred.reject()",
                "deferred.rejectWith()",
                "deferred.resolve()",
                "deferred.resolveWith()",
                "deferred.state()",
                "deferred.then()",
                "delay()",
                "delegate()",
                "dequeue()",
                "detach()",
                "die()",
                "each()",
                "empty()"
              ]
}

JQuery.prototype.generateOfficialDocsURL = function (version, topic) {
  topic = topic.replace("()","")
  return this.baseUrl + topic;
};


JQuery.prototype.nameOfDoc = function () {
  return this.offDocs;
};

module.exports = JQuery;
