//From ajax tutorial by thenewboston (YouTube)

var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject()
{	var xmlHttp;

	if(window.XMLHttpRequest)		//for common browsers
	{	xmlHttp = new XMLHttpRequest();
	}
	else		//for weird browsers
	{	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttp;		//returns object back to global variable
}

function process()
{	if(xmlHttp)
	{	try			//configure connection to server
		{	xmlHttp.open("GET", "https://api.github.com/gists/public", true);
			xmlHttp.onreadystatechange= verifyServer;
			xmlHttp.send(null);	//function that connects with server
		}
		catch(e)	//if cannot connect to server
		{	alert(e.toString() );
		}
	}
}

function verifyServer()
{	searchify = document.getElementById('searchify');
	if(xmlHttp.readyState==1)	//established connection with server
	{	searchify.innerHTML += "State 1: server established <br/>";
	}
	else if(xmlHttp.readyState==2)	
	{	searchify.innerHTML += "State 2: server request received <br/>";
	}
	else if(xmlHttp.readyState==3)	
	{	searchify.innerHTML += "State 3: server processing the request <br/>";
	}
	else if(xmlHttp.readyState==4)
	{	if(xmlHttp.status==200)		//everything worked
		{	try
			{	text = xmlHttp.responseText;
				searchify.innerHTML += "State 4: request is ready, response is ready <br/>";
				//Converts the info from JSON into an object
				var changeJSON = JSON.parse(xmlHttp.responseText);
				changeInfo(changeJSON);
				}
			catch(e){
				alert(xmlHttp.statusText);
			}
		}
		else
			alert(xmlHttp.statusText);
	}
}

function changeInfo(changeJSON)	//function to change JSON data to obj
{	var mainData = []; 

	for(var i in changeJSON)	//check for empty description
	{	if(changeJSON[i].description !== "")
		{	description = changeJSON[i].description;
		}
		
		else
		{	description = "No description provided...";
		}
		
		url = changeJSON[i].html_url;	//url is set and language is defaulted
		lang = "Not defined";
		
		for(var j in changeJSON[i].files)		//selecting language
		{	if(typeof changeJSON[i].files[j] !== null)
			{	lang = changeJSON[i].files[j];
			}		
		}	
		mainData.push({description: description, url: url, language: lang});

	}
	
printSearch(mainData);
	
}

//Displaying search results with help from Solomon Huynh

function printSearch(mainData)		//prints search from github
{	var searchResults = document.getElementById("searchResults");
	for(var i in mainData)
	{	var item = document.createElement( "dl" );
		item.setAttribute("id", i);
		var url = document.createElement( "dt" );
		var button = document.createElement( "dd" );

		var hyperlink = document.createElement( "a" );		//link to original gist
		hyperlink.setAttribute("href", mainData[i].url);
		hyperlink.innerHTML = mainData[i].description;

		var addButton = document.createElement( "button" );
		var buttonText = document.createTextNode( "+Favorites" );
		addButton.appendChild( buttonText );
		addButton.setAttribute( "name", mainData[i].url );
		addButton.addEventListener( "click", addFavorites(mainData[i]));
		button.appendChild( addButton );

		button.appendChild( addButton );	//joins together list
		url.appendChild( hyperlink );
		url.appendChild( button );
		item.appendChild( url );

		searchResults.appendChild(item);
	}
}

//Adding an item to favorites
function addFavorites(data)
{	localStorage.setItem("favorite", JSON.stringify(data));
}
















