!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.openmct=o():e.openmct=o()}(this,(()=>(function(){const e=[];let o,n,t,s=!1;const c=new AbortController;self.onconnect=function(t){let a=t.ports[0];e.push(a),a.postMessage({type:"connection",connectionId:e.length}),a.onmessage=function(t){if("close"===t.data.request)return console.debug("🚪 Closing couch connection 🚪"),e.splice(t.data.connectionId-1,1),e.length<=0&&c.abort(),s=!1,o.removeEventListener("message",self.onCouchMessage),o.close(),void console.debug("🚪 Closed couch connection 🚪");if("changes"===t.data.request){if(!0===s)return;n=t.data.url,self.listenForChanges()}},a.start()},self.onerror=function(e){self.updateCouchStateIndicator(),console.error("🚨 Error on CouchDB feed 🚨",e)},self.onopen=function(){self.updateCouchStateIndicator()},self.onCouchMessage=function(o){self.updateCouchStateIndicator(),console.debug("📩 Received message from CouchDB 📩");const n=JSON.parse(o.data);e.forEach((function(e){e.postMessage({objectChanges:n})}))},self.listenForChanges=function(){t&&clearTimeout(t),t=setTimeout(self.listenForChanges,2e4),o&&o.readyState!==EventSource.CLOSED||(console.debug("⇿ Opening CouchDB change feed connection ⇿"),o=new EventSource(n),o.onerror=self.onerror,o.onopen=self.onopen,o.addEventListener("message",self.onCouchMessage),s=!0,console.debug("⇿ Opened connection ⇿"))},self.updateCouchStateIndicator=function(){const{readyState:n}=o;let t={type:"state",state:"pending"};switch(n){case EventSource.CONNECTING:t.state="pending";break;case EventSource.OPEN:t.state="open";break;case EventSource.CLOSED:t.state="close";break;default:t.state="unknown",console.error("🚨 Received unexpected readyState value from CouchDB EventSource feed: 🚨",n)}e.forEach((function(e){e.postMessage(t)}))}}(),{})));
//# sourceMappingURL=couchDBChangesFeed.js.map