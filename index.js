function getAllData()
{
    let request = new XMLHttpRequest();
    const url = `http://stream26.com/api/radio`;
    var datasArray = [];
    var Radios = document.getElementById('Radios');
    while (Radios.firstChild) {
      Radios.removeChild(Radios.firstChild);
  }
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = request.response;
          var responJson = JSON.parse(response);
          
          // La boucle suivante construit un array contenant toutes les données retournées par l'api
          for(var i=0;i<responJson.length;i++)
          {
            console.log(responJson[i]["name"]);
            var item = {
                id: responJson[i]["_id"],
                name: responJson[i]["name"],
                logId: responJson[i]["logoId"],
                streamFormat: responJson[i]["streamFormat"],
                link: responJson[i]["streamUrl"]
            }

            datasArray.push(item);
          }
          
          
          for(var i =0;i<datasArray.length;i++)
          { 
            var button = document.createElement("button");
            var br = document.createElement("BR");
            button.innerHTML = datasArray[i].name
            button.id = datasArray[i].id;

            //la variable ci-dessous est utilisée afin d'envoyer l'id du logo à la page suivante, afin d'afficher celui-ci
            button.logo = datasArray[i].logId;
            
            
            button.onclick = function(e) { // Note this is a function
              getSpecifiedData(e.target.id,e.target.logo);
              
            };
            
            Radios.appendChild(button);
            Radios.appendChild(br);
          }
          
          // var firstRequestButton = document.getElementById('firstRequest');
          // firstRequestButton.remove();

        }
      }

    request.open("GET", url, true);
    request.send();

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
