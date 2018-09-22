function getAllData()
{
    let request = new XMLHttpRequest();
    const url = `http://stream26.com/api/radio`;

    request.open("GET", url, true);
    request.send();

    var datasArray = [];

    //on supprime tout les élements créé lors d'une précédente requete, afin de "rafraichire" le résultat
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

            appendDataElementToDom(item);
          }
        }
      }
}

function appendDataElementToDom(data)
{
  var button = document.createElement("button");
            var br = document.createElement("BR");
            button.innerHTML = data.name
            button.id = data.id;

            //la variable ci-dessous est utilisée afin d'envoyer l'id du logo à la page suivante, afin d'afficher celui-ci
            button.logo = data.logId;
            
            button.onclick = function(e) { 
              getSpecifiedData(e.target.id,e.target.logo);
              
            };
            
            Radios.appendChild(button);
            Radios.appendChild(br);
}

function getSpecifiedData(id,logoId)
{

  // on envoi le radioId afin de collecter tous les programmes à afficher
    localStorage.setItem("radioID",id);

  // on envoi le logoId afin d'afficher le logo de la radio
    localStorage.setItem("logoID",logoId);

    var url = "radioItems.html";
    window.open(url);
}
