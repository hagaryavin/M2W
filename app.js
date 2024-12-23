var url =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
var crewList = [];
var currCrewName = "{}";
var newCrewMem;
getCrewData();
function getCrewData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.crew.forEach((ele) => {
        newCrewMem = {
          name: ele.name,
            nameEn:ele.nameenglish,
          password: ele.password,
        };
        crewList.push(newCrewMem);
        
      });
    });
    
}
function submit(){
        
    currCrew=crewChosen();
    console.log("tries: "+currCrew.name)
    if(currCrew.password===document.getElementById("password").value)
            window.open("home.html","_self")
    else
        alert("סיסמא שגויה!");
}
function crewChosen() {
  if (document.getElementById("name").value !== "") {
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("name").value === crewList[j].name||document.getElementById("name").value === crewList[j].nameEn) {
        return crewList[j];
      }
    }
  } 

    alert("נא לבחור חברת צוות מוכרת!");
    return {};
}
