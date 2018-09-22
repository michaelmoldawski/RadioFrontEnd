var radioId = localStorage.getItem("radioID");
var logoId = localStorage.getItem("logoID");
var RadioProgram = document.getElementById('RadioProgram');

initiateResultPage(radioId,logoId);
function initiateResultPage(id,logoId)
{
    var logoContainer = document.getElementById("logoContainer");
    var logo = document.createElement("img");
    logo.src ="http://stream26.com/api/storage/"+logoId;
    logoContainer.appendChild(logo);

    let request = new XMLHttpRequest();
    const url = "http://stream26.com/api/radio/"+radioId+"/item";
    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = request.response;
          var responJson = JSON.parse(response);

          for(var i=0;i<responJson.length;i++)
          {
            var item = {
                id: responJson[i]["_id"],
                contentType: responJson[i]["contentType"],
                content: responJson[i]["content"],
                radioId: responJson[i]["radioId"],
                metaData: responJson[i]["metaData"],
                airTime: responJson[i]["airTime"],
                langage : responJson[i]["langage"],
            }
            
            if(item.contentType == "program")
            {
                item.name = item.content["name"]
            }
            if(item.contentType == "text")
            {
                item.name = item.content["text"]
            }

            displayData(item);
          }
        }
    }
}

function displayData(data)
{
            var itemTitle = document.createElement("h1")
            itemTitle.innerHTML = data.name;

            var itemType = document.createElement("div")
            itemType.innerHTML = data.contentType;
            itemTitle.logo = logoId;
            itemTitle.radioId= data.radioId;
            itemTitle.appendChild(itemType);

            var br = document.createElement("BR");
            
            itemTitle.id = data.id;
            itemTitle.onclick = function(e) { // Note this is a function
                getSpecifiedData(e.target.radioId,e.target.id,e.target.logo);
                
              };

              RadioProgram.appendChild(itemTitle);
              RadioProgram.appendChild(br);
}

function getSpecifiedData(radioId,id,logoId)
{
  // on envoi le radioId afin de collecter tous les programmes à afficher
  localStorage.setItem("radioId",radioId);  
  localStorage.setItem("itemId",id);

  // on envoi le logoId afin d'afficher le logo de la radio
    localStorage.setItem("logoID",logoId);

    var url = "specifiedItem.html";
    window.open(url);
}