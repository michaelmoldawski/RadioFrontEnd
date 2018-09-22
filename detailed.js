var radioId = localStorage.getItem("radioID");
var logoId = localStorage.getItem("logoID");
var datasArray = [];


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
            console.log(responJson[i]["name"]);
            var item = {
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

            datasArray.push(item);
          }

          displayData(datasArray)

        }
    }
}

function displayData(datas)
{
    var RadioProgram = document.getElementById('RadioProgram');
          for(var i =0;i<datasArray.length;i++)
          {
            // var itemDiv = document.createElement("div");
            var itemTitle = document.createElement("h1")
            var itemType = document.createElement("div")
            itemType.innerHTML = datasArray[i].contentType
            itemTitle.innerHTML = datasArray[i].name;
            itemTitle.appendChild(itemType);

            var br = document.createElement("BR");
            
            itemTitle.onclick = function(e) { // Note this is a function
                getSpecifiedData(e.target.id,e.target.logo);
                
              };

              RadioProgram.appendChild(itemTitle);
              RadioProgram.appendChild(br);
          }
}

function getSpecifiedData(id,logoId)
{

  var elems = document.querySelectorAll('.toRemove');

  // on envoi le radioId afin de collecter tous les programmes à afficher
    localStorage.setItem("radioID",id);

  // on envoi le logoId afin d'afficher le logo de la radio
    localStorage.setItem("logoID",logoId);

    console.log(id);
    var url = "detailed.html";
    window.open(url);
}