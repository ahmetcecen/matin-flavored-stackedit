define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
	"fileSystem",
	"settings",
    "text!html/matinToolboxSettingsBlock.html",
], function($, _, utils, Extension, document, fileSystem, settings, localStorage, matinToolboxSettingsBlockHTML) {

    var MATINtools = new Extension("MATINtools", "MATIN Toolbox Extension", true);
    MATINtools.settingsBlock = matinToolboxSettingsBlockHTML;
    MATINtools.defaultConfig = {
    };
	
	var eventMgr;
	MATINtools.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	//Insert at Caret is not working at the moment fort some reason.
/*     function insertAtCaret(text) {
		var range = document.selection.createRange();
        var txtarea = document.getElementById('wmd-input');
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
            "ff" : (document.selection ? "ie" : false ) );
        if (br == "ie") { 
            txtarea.focus();      
			range = document.selection.createRange();
            range.moveStart ('character', -txtarea.value.length);
            strPos = range.text.length;
        }
        else if (br == "ff") { 
		strPos = txtarea.selectionStart;
		}

        var front = (txtarea.value).substring(0,strPos);  
        var back = (txtarea.value).substring(strPos,txtarea.value.length); 
        txtarea.value=front+text+back;
        strPos = strPos + text.length;
        if (br == "ie") { 
            txtarea.focus();
			range = document.selection.createRange();
            range.moveStart ('character', -txtarea.value.length);
            range.moveStart ('character', strPos);
            range.moveEnd ('character', 0);
            range.select();
        }
        else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
    } */

     /**
      * Wrap selection with text
      * http://stackoverflow.com/a/1712588/1287812
      */
    function wrapText(openTag, closeTag) {
         var textArea = $('#wmd-input');
         var len = textArea.val().length;
         var start = textArea[0].selectionStart;
         var end = textArea[0].selectionEnd;
         var selectedText = textArea.val().substring(start, end);
         var replacement = openTag + selectedText + closeTag;
         textArea.select().val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
    }

     /**
      * Generates string dd/mm/yyyy with current date
      */
    function getToday() {
         var today = new Date();
         var dd = today.getDate();
             dd = (dd<10) ? '0' + dd : dd;
         var mm = today.getMonth() + 1; // January is 0
             mm = (mm<10) ? '0' + mm : mm;
         var yyyy = today.getFullYear();
		 
         var hh = today.getHours();
             hh = (hh<10) ? '0' + hh : hh;		 
         var min = today.getMinutes();
             min = (min<10) ? '0' + min : min;					 
			 
         return yyyy+'-'+mm+'-'+dd+' '+hh+':'+min;
    } 

    MATINtools.onReady = function() {
        if( location.pathname === '/viewer' ) {
			return;
		}

        var ddwn = '<ul class="nav left-buttons">' +
				 '<span>MATIN Toolbox:&nbsp;&nbsp;</span>' +
                 '<li class="wmd-button-group4 btn-group">' +
                 '  <select id="my-snippets" class="form-control">' +
                 '    <option value="default">Layouts</option>' +
                 '    <option value="Post">Post</option>' +
                 '    <option value="Slide">Slide</option>' +
                 '</select></li>' +
				 '<li class="wmd-button-group4 btn-group">' +
                 '  <select id="my-snippets2" class="form-control">' +
                 '    <option value="default">Utilities</option>' +
                 '    <option value="today">Today&#39;s Date</option>' +	 
                 '    <option value="hc">Highlighted Code</option>' +
                 '    <option value="center">Center</option>' +
                 '    <option value="red">Red</option>' +
                 '    <option value="blue">Blue</option>' +
                 '    <option value="green">Green</option>' +
                 '    <option value="blank"></option>' + 
                 '    <option value="hs">Horizontal Slide</option>' + 
                 '    <option value="vs">Vertical Slide</option>' +	 
                 '</select></li></ul>';

        var snipps = {
			
            'Post':  '---\nlayout:     	post\ntitle:      	Post Headline\ndate:       	2015-01-01 12:00\nauthor:     	Materials Innovation\ntags:         result\n---\n',
			'Slide': '---\nlayout:     	slide\ntitle:     	Presentation Headline\ndate:      	2015-06-23 03:00\nauthor:     	Materials Innovation\n\ntheme:		night # default/beige/blood/moon/night/serif/simple/sky/solarized\ntrans:		default # default/cube/page/concave/zoom/linear/fade/none\n\nhorizontal:	</section></section><section markdown="1" data-background="http://ahmetcecen.github.io/project-pages/img/slidebackground.png"><section markdown="1">\nvertical:		</section><section markdown="1">\n---\n<section markdown="1" data-background="http://ahmetcecen.github.io/project-pages/img/slidebackground.png"><section markdown="1">\n## {{ page.title }}\n\n<hr>\n\n#### {{ page.author }}\n\n#### {{ page.date | | date: "%I %M %p ,%a, %b %d %Y"}}\n\n{{ page.horizontal }}\n<!-- Start Writing Below in Markdown -->\n\n\n\n\n\n\n\n\n\n\n\n<!-- End Here -->\n{{ page.horizontal }}\n\n#[Print]({{ site.url }}{{ site.baseurl }}{{ page.url }}/?print-pdf#)\n\n#[Back]({{ site.url }}{{ site.baseurl }})\n\n</section></section>\n',
			
			'hc': { start: '{% highlight python %}\n', end: '\n{% endhighlight %}'},
			
            'center': { start: '<p align="center">', end: '</p>'},
			'red': { start: '<span style="color:red">', end: '</span>'},
			'blue': { start: '<span style="color:blue">', end: '</span>'},
			'green': { start: '<span style="color:green">', end: '</span>'},
						
			'hs': '{{ page.horizontal }}',
			'vs': '{{ page.vertical }}',
        };
		
		
		
        $().dropdown = $(ddwn).appendTo($('.navbar-inner'));
		
		
		
        $('#my-snippets')
            .on('change',function(){
                if( 'default' !== $(this).val() ) {
                    var val = $(this).val();

                    // Today has a custom action
                    if( 'today' === val ) {
                        val = getToday();
					}
                    else {
                        val = snipps[val];
					}
                    // If the selection has start/end, do wrap; otherwise, insert at caret
                    if( val.start ) {
                        wrapText(val.start, val.end);
					}
                    else {
                        wrapText( val, '' );
					}
                    // Reset dropdown to default position
                    $(this).val('default');
                }
            });
            //.css('height','35px')
            //.parent().css('top','2px');
			
        $('#my-snippets2')
            .on('change',function(){
                if( 'default' !== $(this).val() ) {
                    var val = $(this).val();

                    // Today has a custom action
                    if( 'today' === val ) {
                        val = getToday();
					}
                    else {
                        val = snipps[val];
					}

                    // If the selection has start/end, do wrap; otherwise, insert at caret
                    if( val.start ) {
                        wrapText(val.start, val.end);
					}
                    else {
                        wrapText( val, '' );
					}

                    // Reset dropdown to default position
                    $(this).val('default');
                }
            });
            //.css('height','35px')
            //.parent().css('top','2px');
		

	};		

    return MATINtools;

});