var lastScrollAnchor = 0;
var lastAddIndex = 0;
document.addEventListener('DOMContentLoaded', function()
{
	console.log('我被执行了！');
	setTimeout('mainFunc()',2000); 


});


$(document).ready(function(){
  	$(window).scroll(function(event){
	  	// console.log(event);
		var scrollTop = $(window).scrollTop();
		var weiboReloadOffset = 2000;
		// console.log(scrollTop); // 显示滚过的距离
		var thisAnchorPoint = Math.floor(scrollTop / weiboReloadOffset);
		if (thisAnchorPoint > lastScrollAnchor) {
			// 说明滑过了7000像素，触发一次加载
			console.log("重新分析了页面。");
			mainFunc();

		}
		lastScrollAnchor = thisAnchorPoint;
	});

 	// radio button : switch code
	// 动态添加的元素需要用 on 注册，且$()内的元素不能是动态创建的。
	$(document).on('change', '.wplarea :radio', function() {
			// console.log("checked .")
	        if (this.value == 'raw') {
	            // console.log('raw');

	            $(this).parent().find(".myp").each(function() {

	            	var imgsrc = $(this).attr('src');
	            	$(this).html(imgsrc);
	            });
	        }
	        else if (this.value == 'Markdown') {
	            // console.log('markdown');

	            $(this).parent().find(".myp").each(function() {

	            	var imgsrc = $(this).attr('src');
	            	$(this).html("![]("+imgsrc+")");
	            });
	             
	        }

	        else if (this.value == '下载') {
	            // console.log('markdown');

	            $(this).parent().find(".myp").each(function() {

	            	var imgsrc = $(this).attr('src');
	            	// $(this).html("![]("+old+")");

	            	var imgurl = imgsrc;
				    chrome.extension.sendMessage({
				    	type:'piclink',
				    	piclink: imgsrc
						}, function(response) {
					    //code to initialize my extension
					});
	            });
	             
	        }
	}); 
});

function AddNewRadio(name, type, parent) {

	var newradio = document.createElement('input');
	newradio.setAttribute("name", type);
	newradio.setAttribute("type", "radio");
	newradio.setAttribute("value", name);

	var newlabel = document.createElement('label');
	newlabel.innerHTML = name;
	newlabel.setAttribute("style", "padding:5px;")

	parent.appendChild(newradio);
	parent.appendChild(newlabel);
 
}
function showPic() {
	// TODO:
}
function mainFunc() {
	var functionDiv = "<div class=\"wplarea\" style=\"padding: 20px;\"> WPL功能区 </div>";
 	// $(".WB_detail").append(); 



	// createPicTip(); // 左上角创建一个 fixed 的区域用于鼠标移到连接上时展示图片

	var nodes = document.getElementsByClassName('WB_detail');
	console.log("共有",nodes.length,"条微博");
	
	var debugmax = 10000;
	var debugcnt = 0;

 
	var ni = 0;
	for (ni in nodes) {

		if (isNaN(parseInt(ni))) continue;
		if (parseInt(ni) < lastAddIndex) continue;
		var e = nodes[ni];
		// console.log(e);
		var linknodes = e.getElementsByClassName("WB_pic");
		// console.log("第", ni,"条微博","图片量", linknodes.length);
			// console.log(linknodes)
		var wpldiv = null;	
		if (linknodes.length > 0) {
			// add function div to WB_pic div
			wpldiv = document.createElement('div');
			wpldiv.innerHTML = "WPL功能区";
			wpldiv.setAttribute("style", "padding: 20px;");
			wpldiv.setAttribute("class", "wplarea");

			// add radio buttons 
 			
			AddNewRadio("raw", "codetype", wpldiv);

			AddNewRadio("Markdown", "codetype", wpldiv);
			AddNewRadio("下载", "codetype", wpldiv);

			e.appendChild(wpldiv);

		}	

 
		for (lni in linknodes) {
			if (isNaN(parseInt(lni))) continue;
			var ln = linknodes[lni];

			var imgtag = ln.getElementsByTagName("img");
			var imgsrc = imgtag[0].getAttribute("src");

			var rawthumbLink = "http:" + imgsrc;
			
			var largetImgLink = rawthumbLink.replace("thumb150", "large");	

			var pelement = document.createElement("p");
			pelement.innerHTML = largetImgLink;
 			
 			var tempId = ni.toString() + "-" + lni.toString();

			pelement.setAttribute("class", "myp");
			pelement.setAttribute("src", largetImgLink);
			pelement.setAttribute("id", tempId);
			// pelement.setAttribute("id", tempId);
			// pelement.setAttribute("onmouseout","document.getElementById(\""+tempId+"\").style.display='none'")
			// pelement.setAttribute("onmouseover","showPic")
			wpldiv.appendChild(pelement);

			// console.log(largetImgLink);
			// down(imgsrc, ni.toString() + "-" + lni.toString());





			debugcnt++;
			if (debugcnt > debugmax) return ;
		}

		if (debugcnt > debugmax) return ;
	}
	lastAddIndex = nodes.length;

	
}
function down(src, name) {  
        // // 生成一个a元素
        // var a = document.createElement('a')
        // // 将a的download属性设置为我们想要下载的图片名称
        // a.download = name
        // // 将生成的URL设置为a.href属性
        // a.src = src
        // // 触发a的单击事件
        // a.click();

        // window.open(src)
}