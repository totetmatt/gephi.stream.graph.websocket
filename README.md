Gephi Stream Graph Websocket
=========
This is a simple module that makes link with a gephi instance through the Gephi Streaming Module.

Installation
=========
Just download this repo and add *gephi.stream.graph.websocket.js* as a normal javascript library

How to use it
=========
1 - Run Gephi
--
Open gephi and start a new project and put some node & edges, or open one (a dummy example can be found on the *example* directory)

Go to the Streaming module (if you don't have download it with the plug in manager of Gephi) and activate the master by right clicking on it.

2 - Code your page
--
Include the library :
```html
 <script src="path/to/gephi.stream.graph.websocket.js"></script>
```

Instance an object :
```javascript
var stream = new GephiStream("ws://127.0.0.1:8080/workspace0")
```

The GephiStream object is a wrapper around web socket that handle the gephi streaming protocol. It will handle the reception of a message from the Gephi instance and will dispatch to the correct callback.

```javascript
//Node actions
stream.node.onadd = function(data) { /* Do something */}
stream.node.onchange = function(data) {/* Do something */}
stream.node.ondelete = function(data) {/* Do something */}

//Edge actions
stream.edge.onadd = function(data) {/* Do something */}
stream.edge.onchange = function(data) {/* Do something */}
stream.edge.ondelete = function(data) {/* Do something */}

/**
data will contains will looks like:
{"<objectId>":{"label":"Streaming Node A","size":2,"otherProperty":"othervalue"}[...]}

As designed ( https://wiki.gephi.org/index.php/Graph_Streaming ) it should only contains one object id, but nothing actually prevents to have multiple object defined.
*/
```
Finnally connect to the instance 
```javascript
stream.connect()
```
If you want to disconnect 
```javascript
stream.close()
```

Comments
===
Should works on all modern Web browser. Didn't try with Node.js but should works.
