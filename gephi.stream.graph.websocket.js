/** 
Constructor 

*/
function gephiColorToStd(r,g,b) {
    var stringR = (Math.round(r*255)).toString(16);
    var stringG = (Math.round(g*255)).toString(16);
    var stringB = (Math.round(b*255)).toString(16);
    return "#".concat(stringR).concat(stringG).concat(stringB)
}
function GephiStream(urlStream) {
    /* Storing the URL, should we ws:// */
    this.urlStream = urlStream;
    /**
        Dedicated callback per action
        To redefine by the user like this :
            var myStream  = new GephiStream(url);
            myStream.node.onadd = function(aJsonObject) {}
            [...]
            
        Interface is :
            function(aJsonObject) { }
    */
    this.node = 
    {
        /* "an" action */
        onadd : function(data) {console.log('On Add Node function not binded');},
        /* "cn" action */
        onchange : function(data) {console.log('On Change Node function not binded');},
        /* "dn" action */
        ondelete : function(data) {console.log('On Delete function not binded');},
    }
    this.edge = 
    {
        /* "ae" action */
        onadd : function() {console.log('On Add Edge function not binded');},
        /* "ce" action */
        onchange : function() {console.log('On Change Edge  function not binded');},
        /* "de" action */
        ondelete : function() {console.log('On Delete Edge function not binded');},
    }
} 

/**
Connect method

*/
GephiStream.prototype.connect = function() {
    /* Needed to keep reference of the object needed in nested callbacks */
    var self = this;
    
    this.socket = new WebSocket(this.urlStream);
    this.socket.onopen = function() { console.log('Socket Open'); }
    this.socket.onclose = function() {  console.log('Socket Closed'); }
    this.socket.onerror = function() {  console.log('Socket Error'); }
    this.socket.onmessage = function(message) 
                {
                    
                    var data = JSON.parse(message.data) 
                    /* Not doing else-if, in case multiple action are degined in the message received*/
                    /* Nodes actions */
                    if(data['an']) {
                        self.node.onadd(data['an'])
                    }
                    if(data['cn']) {
                        self.node.onchange(data['cn'])
                    }
                    if(data['dn']) {
                        self.node.ondelete(data['dn'])
                    }
                    /* Edges actions */
                    if(data['ae']) {
                        self.edge.onadd(data['ae'])
                    }
                    if(data['ce']) {
                        self.edge.onchange(data['ce'])
                    }
                    if(data['de']) {
                        self.edge.ondelete(data['de'])
                    }
                }
}
/**
Closing the connection

*/
GephiStream.prototype.close = function() { this.socket.close() }

/**
Reset the connection, useful for updating the complete graph from Gephi

*/
GephiStream.prototype.reset = function() { this.close(); this.connect()}


 
