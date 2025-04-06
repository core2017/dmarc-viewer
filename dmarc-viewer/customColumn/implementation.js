console.log( "implementation.js start" );
// Before Thunderbird 115.*
ChromeUtils.defineESModuleGetters(this, {
    ThreadPaneColumns: "chrome://messenger/content/thread-pane-columns.mjs",
}); 
  
try {
    if (typeof ThreadPaneColumns === "undefined") {
      console.error("thread-pane-columns.mjs is not exists.");
      throw new Error("thread-pane-columns.mjs is not exists.");
    }
} catch (e) {
    // After Thunderbird 128.0
    ChromeUtils.defineESModuleGetters(this, {
      ThreadPaneColumns: "chrome://messenger/content/ThreadPaneColumns.mjs",
    });
}
console.log( "implementation.js: ThreadPaneColumns:", ThreadPaneColumns );

var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");

var	g_idlist	= [] ;
var customColumn = class extends ExtensionCommon.ExtensionAPI {
    getAPI(context) {
        console.log( "getAPI() called with context:", context );
        context.callOnClose(this);
        return {
            customColumn: {
                async   addColumn(id, name) {
                    console.log( "addColumn" );
                    console.log("addColumn(): ThreadPaneColumns:", ThreadPaneColumns);
                    ThreadPaneColumns.addCustomColumn( id, {
                        name: name,
                        hidden: false,
                        icon: false,
                        resizable: true,
                        sortable: true,
                        textCallback: function(value) {
                            console.log( "textCallback() called with value:", value );
                            return( "hogehoge" ) ;
                        }
                    }); 
					g_idlist.push( id ) ;
                },
				async	removeColumn( id ) {
                    console.log( "removeColumn" );
					g_idlist	= g_idlist.filter( e => e !== id ) ;
                }
            }
        }
    } ;


	close() {
		console.log( "close():" ) ;
		for( const id of g_idlist) {
			try {
				ThreadPaneColumns.removeCustomColumn( id ) ;
			} catch ( e ) {
				console.error( e ) ;
			}
		}
	}
} ;

console.log( "implementation.js: finished" );