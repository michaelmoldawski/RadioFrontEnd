var radioId = localStorage.getItem("radioId");
var itemId = localStorage.getItem("itemId");
var logoId = localStorage.getItem("logoID");
var itemElement = document.getElementById('item');

initiateResultPage(itemId,logoId);
function initiateResultPage(itemId,logoId)
{
        var logoContainer = document.getElementById("logoContainer");
        var logo = document.createElement("img");
        logo.src ="http://stream26.com/api/storage/"+logoId;
        logoContainer.appendChild(logo);

        let request = new XMLHttpRequest();
        const url = "http://stream26.com/api/radio/"+radioId+"/item/"+itemId;
        request.open("GET", url, true);
        request.send();
        
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var response = request.response;
                var responJson = JSON.parse(response);

           
                var item = {
                    id: responJson["_id"],
                    contentType: responJson["contentType"],
                    content: responJson["content"],
                    radioId: responJson["radioId"],
                    metaData: responJson["metaData"],
                    airTime: responJson["airTime"],
                    langage : responJson["langage"],
                }
            
            
            if(item.contentType == "program")
            {
                setTitleElement(item.content["name"]);
            }
            if(item.contentType=="text")
            {
                setTitleElement(item.content["text"]);
            }
        }
    }
    
}

function setTitleElement(title)
{
    var itemTitle = document.createElement("h1");
    itemTitle.innerHTML = title;
    var br = document.createElement("BR");
    
    itemElement.appendChild(itemTitle);
    itemElement.appendChild(br);
}