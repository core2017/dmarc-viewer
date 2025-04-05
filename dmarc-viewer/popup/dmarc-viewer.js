function gotBrowserInfo( info ) {
	document.getElementById( "dmarc-viewer" ).innerText = info.version;
	console.log( info ) ;
}

let gettingInfo = browser.runtime.getBrowserInfo() ;
gettingInfo.then( gotBrowserInfo ) ;
