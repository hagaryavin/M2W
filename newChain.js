var options = document.getElementById("people");
var personOption;
var allPeople = [];
var chainRowCount = 2;
var chosenCol = "";
var chosenRow = 0;
var size = 0;
var rowCount = 2;
var firstName = "";
var fullText = "";
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = "";
var newCrewMem;
var messes = [
  { name: "", lines: [] },
    { name: "", lines: [] },
    { name: "", lines: [] }
];
var fullTexts = [[],[],[]];
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var currPerson = {};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbzV7prBl2IXFWsPrp3z2heq2FE5vQN3hVZ52vBXtDvOTQLOBIk5NWAYCCclbAwL3PtOJg/exec";
getChainData();
getCrewData();
getData();
function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          guestname: ele.name,
          chain: ele.chain,
          date: changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem'),
          order: ele.order,
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.guestname = ele.fixedname;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedrecordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
        allPeople.push(newPerson);

        rowCount++;
        size++;
      });
    });
}
function getChainData() {
  fetch(chainDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.chains.forEach((ele) => {
        newChain = {
          name: ele.name,
          altName: ele.othername,
          playlist: ele.playlist,
          description: ele.description,
          creator: ele.creator,
        participants:ele.participants,
            about:ele.about,
            row:chainRowCount,
            creatorPhone:ele.creatorphone,
            creatorEmail:ele.creatoremail,
            groupinvitelink:ele.groupinvitelink,
            credit:ele.credit
        };
        allChains.push(newChain);
        chainOption = document.createElement("option");
        chainOption.value = newChain.name;
        document.getElementById("chainsNames").append(chainOption);
          chainRowCount++;
      });
    });
}

function getCrewData() {
  fetch(chainDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.crew.forEach((ele) => {
        newCrewMem = {
          name: ele.name,
          phone: ele.phone,
        };
        crewList.push(newCrewMem);
        crewOption = document.createElement("option");
        crewOption.value = newCrewMem.name;
        optionsCrew.append(crewOption);
        if(newCrewMem.name==="יעל"){
            document.getElementById("crewList").value = "יעל"; 
        }  
      });
    });
}
function getMessData() {
 var newMess;
  fetch(chainDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.messages.forEach((ele) => {
        newMess = {
          name: ele.name,
          lines: [
            ele.line1,
            ele.line2,
            ele.line3,
            ele.line4,
            ele.line5,
            ele.line6,
            ele.line7,
            ele.line8,
            ele.line9,
            ele.line10,
            ele.line11,
            ele.line12,
            ele.line13,
            ele.line14,
            ele.line15,
            ele.line16,
            ele.line17,
            ele.line18,
            ele.line19,
            ele.line20,
            ele.line21,
            ele.line22,
            ele.line23,
            ele.line24,
            ele.line25,
            ele.line26,
            ele.line27,
            ele.line28,
            ele.line29,
            ele.line30
          ],
        };

       for (var i = 1; i <=3 ; i++) {
          if (newMess.name.includes("שרשרת.קהילה חדשה " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 0; i <=2; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
            
          cutMess(messes[i].lines, i + 1);
        }
      }
    });
}
function cutMess(linesArr, messType) {
  var crewMem;
  if (currCrew.name !== "") crewMem = currCrew.name;
  if (currCrew.name === "") crewMem = "";
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
  var i = 0;
  var firstName2 = firstName;
  while (linesArr[i] !== "end") {
    if (currChain.creator === "") {
      if (linesArr[i].includes("במניפה של *creatorName*")) {
        i++;
      }
    }
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace(
        "nameOfChain",
        document.getElementById("chainName").value
      );
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      linesArr[i] = linesArr[i].replace(
        "fullNameOfGuest",
        currPerson.guestname
      );
    }
    if (linesArr[i].includes("chainParticipants")) {
      linesArr[i] = linesArr[i].replace(
        "chainParticipants",
        currChain.participants
      );
    }
     if (linesArr[i].includes("chainAbout")) {
      linesArr[i] = linesArr[i].replace(
        "chainAbout",
        currChain.about
      );
    }
    if (currChain.creator !== "") {
      if (linesArr[i].includes("creatorName")) {
        linesArr[i] = linesArr[i].replace("creatorName", currChain.creator);
      }
    }

    if (linesArr[i].includes("groupInviteLink")) {
      linesArr[i] = linesArr[i].replace(
        "groupInviteLink",
        currChain.groupinvitelink
      );
    }
      if (linesArr[i].includes("credit")) {
      linesArr[i] = linesArr[i].replace(
        "credit",
        currChain.credit
      );
    }
    if (linesArr[i].includes("chainDescription")) {
      linesArr[i] = linesArr[i].replace(
        "chainDescription",
        currChain.description
      );
    }
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] !== "end") {
        currText += linesArr[i] + "\n";
      }
      if (linesArr[i + 1] === "end") {
        currText += linesArr[i];
      }
    }
    if (linesArr[i] === "") {
      currText += "\n";
    }
    var duplicateLine = linesArr[i];
    while (duplicateLine.includes("*")) {
      if (duplicateLine.includes("*")) {
        duplicateLine = duplicateLine.replace("*", "<strong>");
      }
      if (duplicateLine.includes("*")) {
        duplicateLine = duplicateLine.replace("*", "</strong>");
      }
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = duplicateLine;
      testDiv.append(testH4);
    }
    i++;
  }
  fullTexts[messType - 1] = currText;
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function reset() {
  document.location.reload();
}
function checkInputs() {
  if (document.getElementById("chainName").value) {
    currPerson = findFirstInChain();
    console.log(currPerson);
      document.getElementById("toPost").addEventListener("click", function () {
                window.location.href='./socialPost.html?name='+encodeURIComponent(currPerson.guestname)+'&chain='+encodeURIComponent(currChain.name);           
            });
    if (currPerson.guestname === "...") {
            document.getElementById("toPost").addEventListener("click", function () {
                window.location.href='./socialPost.html';           
            });   
    }
    return true;
  }
  alert("נא לבחור שרשרת!");
  return false;
}
function fixChainFromData(chain) {
  var splittedChain; //
  if (chain.includes(" (") || chain.includes("-")) {
    splittedChain = chain.split(" (");
    var moresplitted;
    if (splittedChain[0].includes("-")) {
      moresplitted = splittedChain[0].split("-");
      return moresplitted[1].trim();
    }
    return splittedChain[0].trim();
  }
  return chain;
}
function findFirstInChain() {
  var peopleInChain = [];
  for (var j = 0; j < allPeople.length; j++) {
    if (fixChainFromData(allPeople[j].chain) !== "") {
      if (
        fixChainFromData(allPeople[j].chain) === currChain.name ||
        fixChainFromData(allPeople[j].chain) === currChain.altName
      ) {
        if (allPeople[j].order === 1) {
          return allPeople[j];
        } else peopleInChain.push(allPeople[j]);
      }
    }
  }

  if (peopleInChain.length > 0) {
    peopleInChain.sort(function (a, b) {
      var key1 = a.date;
      var key2 = b.date;
      if (key1 < key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
    console.log(peopleInChain);
    return peopleInChain[0];
  } else return { guestname: "...", chain: currChain.name, row: -1 };
}
function submit() {
  crewChosen();
  fixChain();
  console.log(currChain);
  console.log(currCrew);
    document.getElementById("participantsChange").innerHTML="הוספת תיאור משתתפים" ;
   document.getElementById("aboutChange").innerHTML="הוספת לינק לסרט הסבר שרשרת";
    document.getElementById("creatorChange").innerHTML="הוספת יוצר השרשרת";
    document.getElementById("creatorphoneChange").innerHTML="הוספת טלפון יוצר השרשרת";
    document.getElementById("creatoremailChange").innerHTML="הוספת מייל יוצר השרשרת";
    document.getElementById("groupinvitelinkChange").innerHTML="הוספת קישור לקבוצת וואטסאפ";
    document.getElementById("creditChange").innerHTML="הוספת קרדיט";
     document.getElementById("about").value="";
     document.getElementById("participants").value="";
  document.getElementById("newChain").style.visibility = "hidden";
  if (checkInputs()) {
    document.getElementById("newChain").style.visibility = "visible";
    getMessData();
    document.getElementById("toPost").innerHTML =
      "לשליחת הפוסט של " + currPerson.guestname;
  }
}
function fixChain() {
  for (var j = 0; j < allChains.length; j++) {
    if (
      document.getElementById("chainName").value === allChains[j].name ||
      document.getElementById("chainName").value === allChains[j].altName
    ) {
      if (document.getElementById("chainName").value !== "") {
        currChain = allChains[j];
        document.getElementById("participantsB4").innerHTML = allChains[j].participants;
      document.getElementById("aboutB4").innerHTML = allChains[j].about;
          document.getElementById("creatorB4").innerHTML = allChains[j].creator;
           document.getElementById("creatorphoneB4").innerHTML = allChains[j].creatorPhone;
           document.getElementById("creatoremailB4").innerHTML = allChains[j].creatorEmail;
           document.getElementById("groupinvitelinkB4").innerHTML = allChains[j].groupinvitelink;
          document.getElementById("creditB4").innerHTML = allChains[j].credit;
        chosenRow=allChains[j].row;
        console.log("row: "+chosenRow);
      }
    }
  }
}
function crewChosen() {
    if (document.getElementById("crewList").value !== "") {
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("crewList").value === crewList[j].name) {
        currCrew = crewList[j];
      }
    }
  } else {
    currCrew.name = "";
    currCrew.phone = "";
  }
}

function copy(id) {
  var text = fullTexts[id - 1];
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  alert("הטקסט הועתק!");
}
function phoneForWA(phone) {
  return "972" + phone.slice(1);
}

function whatsAppMes(id) {
  var phone=currCrew.phone;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone) +
    "&text=" +
    encodeURIComponent(fullTexts[id - 1]);
  window.open(link, "_blank");
}
function submitData() {}
function change(id) {
    var textEntered=document.getElementById(id).value;
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: textEntered,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, dataElement);
    dataElement.innerHTML="התעדכן";
  }
}
function sendData(obj, ele) {
    
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(chainDataURL, {
    method: "POST",
    body: formData,
  })
    .then((rep) => {
      console.log(obj);
      return rep.json();
    })
    .then((json) => {
      console.log(obj);
      console.log(json);
    });
  
}
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
function switchLang(){
    if (document.getElementById("switch").checked === true){
       document.getElementById("switchLabel").innerHTML="עברית";
        document.getElementById("toPreMes").innerHTML="אישור והזמנה להקלטה";
        document.getElementById("toPreMes").onclick=function() { window.location.href='./preMes.html';};
        document.getElementById("toRightAfterMes").innerHTML="הזמנה לוואטסאפ חרוזים";
        document.getElementById("toRightAfterMes").onclick=function() { window.location.href='./rightAfterMes.html';};
        document.getElementById("toPostMes").innerHTML="לינקים לתוצרים";
        document.getElementById("toPostMes").onclick=function() { window.location.href='./postMes.html';};
         document.getElementById("toPostMesInvite").innerHTML="לינקים להזמנת אורח";
        document.getElementById("toPostMesInvite").onclick=function() { window.location.href='./postMesInvite.html';};
        document.getElementById("toSocialPost").innerHTML="פוסט (לוח פרסום)";
        document.getElementById("toSocialPost").onclick=function() { window.location.href='./socialPost.html';};
        document.getElementById("toNewChain").innerHTML="פתיחת שרשרת/קהילה";
        document.getElementById("toNewChain").onclick=function() { window.location.href='./newChain.html';};
       document.getElementById("toStuckMes").innerHTML="חרוזים אחרונים";
        document.getElementById("toStuckMes").onclick=function() { window.location.href='./stuckMes.html';};
        document.getElementById("toChangeCRM").innerHTML="עדכון תוצרים ותיקונים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRM.html';};
         document.getElementById("toDisplay").innerHTML="הכרטיס";
        document.getElementById("toDisplay").onclick=function() { window.location.href='./display.html';};
        document.getElementById("toNominees").innerHTML="מועמדות";
        document.getElementById("toNominees").onclick=function() { window.location.href='./nominees.html';};
    }
    else{
       document.getElementById("switchLabel").innerHTML="English";
        document.getElementById("toPreMes").innerHTML="Eng אישור והזמנה להקלטה";
        document.getElementById("toPreMes").onclick=function()  { window.location.href='./preMesEng.html';};
        document.getElementById("toRightAfterMes").innerHTML="Eng הזמנה לוואטסאפ";
        document.getElementById("toRightAfterMes").onclick=function() { window.location.href='';};
        document.getElementById("toPostMes").innerHTML="Eng תוצרים";
        document.getElementById("toPostMes").onclick=function() { window.location.href='./postMesEng.html';};
         document.getElementById("toPostMesInvite").innerHTML="Eng הזמנת אורח";
        document.getElementById("toPostMesInvite").onclick=function() { window.location.href='./postMesInviteEng.html';};
        document.getElementById("toSocialPost").innerHTML="Eng פוסט";
        document.getElementById("toSocialPost").onclick=function() { window.location.href='./socialPostEng.html';};
        document.getElementById("toNewChain").innerHTML="Eng פתיחת שרשרת";
        document.getElementById("toNewChain").onclick=function() { window.location.href='';};
       document.getElementById("toStuckMes").innerHTML="Eng חרוזים אחרונים";
        document.getElementById("toStuckMes").onclick=function() { window.location.href='';};
        document.getElementById("toDisplay").innerHTML="Eng הכרטיס";
        document.getElementById("toDisplay").onclick=function() { window.location.href='';};
        document.getElementById("toNominees").innerHTML="Eng מועמדות";
        document.getElementById("toNominees").onclick=function() { window.location.href='';};
        document.getElementById("toChangeCRM").innerHTML="Eng עדכון ותיקון תוצרים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRMEng.html';};
    }
}