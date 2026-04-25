var url =
  "https://script.google.com/macros/s/AKfycbyEekfuBfk9W8aWqk9_uOa-Imynp5d3kKHjAebD6WuL-e7d2xN8RdBRsPefUJWcflgMsQ/exec";
var crewList = [];
var currCrewName = "{}";
var newCrewMem;
getCrewData();
document.getElementById("submit").style.visibility="hidden";

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
        if(newCrewMem.name==="יעל"){
            document.getElementById("name").value = "יעל"; 
            document.getElementById("submit").style.visibility="visible";

        }
      });
    });
    
}
function submit(){
    currCrew=crewChosen();
    console.log("tries: "+currCrew.name)
    if(currCrew.password===document.getElementById("password").value){
        window.location.href='./home.html?mode='+document.getElementById("mode").value;   
    }
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