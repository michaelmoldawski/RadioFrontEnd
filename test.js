
    


function getAllData()
{
    let request = new XMLHttpRequest();
    const url = `http://stream26.com/api/radio`;

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = request.response;
          var responJson = JSON.parse(response);
          var datasArray = [];
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

            ListData.push(item);
          }

        }
      }

    request.open("GET", url, true);
    request.send();

}
