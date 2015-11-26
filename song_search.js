"use strict";

document.observe("dom:loaded", function() 
{
    $("b_xml").observe("click", function()
	{
    	//construct a Prototype Ajax.request object
		var number = $("top").options[$("top").selectedIndex].value;

		new Ajax.Request("songs_xml.php",
		{
			method: "get",
			parameters: {top: number},
			onSuccess: showSongs_XML,
			onFailure: ajaxFailed,
			onException : ajaxFailed
		});
		
		
		
    });
    $("b_json").observe("click", function()
	{
        //construct a Prototype Ajax.request object
		var number = $("top").options[$("top").selectedIndex].value;

		new Ajax.Request("songs_json.php",
		{
			method: "get",
			parameters: {top: number},
			onSuccess: showSongs_JSON,
			onFailure: ajaxFailed,
			onException : ajaxFailed
		});
    });
});

function showSongs_XML(ajax) 
{
	//alert(ajax.responseText);
	$("songs").update();
	$("songs").innerHTML;
	
	var songs = ajax.responseXML.getElementsByTagName("song");
	
	for(var i = 0; i<songs.length; i++)
	{
		var song = songs[i];
		var title = song.getElementsByTagName("title")[0].firstChild.nodeValue;
		var artist = song.getElementsByTagName("artist")[0].firstChild.nodeValue;
		var genre = song.getElementsByTagName("genre")[0].firstChild.nodeValue;
		var time = song.getElementsByTagName("time")[0].firstChild.nodeValue;
		
		var li = document.createElement("li");
        li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
        $("songs").appendChild(li);
	}
}

function showSongs_JSON(ajax) 
{
	//alert(ajax.responseText);
	$("songs").update();
	$("songs").innerHTML;
	
	var data = JSON.parse(ajax.responseText);
	
	for(var i = 0; i<data.songs.length; i++)
	{
		var title = data.songs[i].title;
		var artist = data.songs[i].artist;
		var genre = data.songs[i].genre;
		var time = data.songs[i].time;
		
		var li = document.createElement("li");
        li.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
        $("songs").appendChild(li);
	}
}

function ajaxFailed(ajax, exception) 
{
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) 
	{
		errorMessage += "Exception: " + exception.message;
	} else 
	{
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
