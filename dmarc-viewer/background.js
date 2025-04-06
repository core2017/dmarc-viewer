browser.customColumn.addColumn( "dmarc", "DMARC" ).then(() => {
	console.log( "DMARC column added" ) ;
}).catch(( error ) => {
	console.error("Error adding DMARC column:", error ) ;
}) ;
