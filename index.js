
    
var datasArray = [];

function getAllData()
{
    let request = new XMLHttpRequest();
    const url = `http://stream26.com/api/radio`;

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = request.response;
          var responJson = JSON.parse(response);
          
          var test = responJson[0];
          var test2 = test["_id"];
          for(var i=0;i<responJson.length;i++)
          {
            console.log(responJson[i]["name"]);
            var item = {
                id: responJson[i]["_id"],
                name: responJson[i]["name"],
                streamFormat: responJson[i]["streamFormat"],
                link: responJson[i]["streamUrl"]
            }

            datasArray.push(item);
          }
          var output = document.getElementById('output');
          for(var i =0;i<datasArray.length;i++)
          {
            // output.innerHTML += "<br> <div id='"+datasArray[i].id+"onclick='getSpecifedData()' class= generalData>"+datasArray[i].name  +"</div>"
            var button = document.createElement("BUTTON");
            var br = document.createElement("BR");
            button.innerHTML = datasArray[i].name
            button.id = datasArray[i].id;
            button.className = "toRemove"
            
            button.onclick = function(e) { // Note this is a function
              getSpecifiedData(e.target.id);
              
            };
            // element.addEventListener("click", getSpecifiedData(), false);
            document.body.appendChild(button);
            document.body.appendChild(br);
          }
          var firstRequestButton = document.getElementById('firstRequest');
          firstRequestButton.remove();

        }
      }

    request.open("GET", url, true);
    request.send();

}

function getSpecifiedData(id)
{
  // $('.toRemove').remove();
  var elems = document.querySelectorAll('.toRemove');
  Array.prototype.forEach.call( elems, function( node ) {
    node.parentNode.removeChild( node );
});

localStorage.setItem("valueToPAss",id);
              // elems.remove();
  console.log(id);
}
