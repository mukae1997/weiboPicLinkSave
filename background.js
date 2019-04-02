  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "piclink":
                imgurl = message.piclink;

			    chrome.downloads.download({url:imgurl},function(downloadId){
			        console.log("download begin, the downId is:" + downloadId);
			    });
			    sendResponse();
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);