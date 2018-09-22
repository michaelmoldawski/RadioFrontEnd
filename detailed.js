var radioId = localStorage.getItem("radioID");
var logoId = localStorage.getItem("logoID");
var datasArray = [];


initiateResultPage(radioId,logoId);
function initiateResultPage(id,logoId)
{
    let request = new XMLHttpRequest();
    const url = "http://stream26.com/api/radio/"+radioId+"/shows";
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
                id: responJson[i]["_id"],
                name: responJson[i]["name"],
                radioId: responJson[i]["radioId"],
                goupId: responJson[i]["groupId"],
                data : responJson[i]["data"],
                active: responJson[i]["active"],
            }

            datasArray.push(item);
          }

          var RadioProgram = document.getElementById('RadioProgram');
          for(var i =0;i<datasArray.length;i++)
          {
            var button = document.createElement("button");
            var br = document.createElement("BR");
            button.innerHTML = datasArray[i].name

            button.onclick = function(e) { // Note this is a function
                getSpecifiedData(e.target.id,e.target.logo);
                
              };

              RadioProgram.appendChild(button);
              RadioProgram.appendChild(br);
          }

        }
    }

    var logoContainer = document.getElementById("logoContainer");
    var logo = document.createElement("img");
    logo.src ="http://stream26.com/api/storage/"+logoId;

      
  logoContainer.appendChild(logo);
}