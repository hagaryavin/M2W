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
  { name: "", lines: [] }
];
var fullTexts = [[]];
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var currPerson = {};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbwmG6Vk--ZXihjCryWWRfN-HC5UNNRvypCCOtiHwi6Yi_KPKE3G8aslkzKJ3zY6dJYgew/exec";
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
          date: new Date(ele.recordingdate),
          order: ele.order,
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.guestname = ele.fixedname;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedrecordingdate !== "")
          newPerson.date = new Date(ele.fixedrecordingdate);
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
            row:chainRowCount
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
          ],
        };

       for (var i = 1; i <2 ; i++) {
          if (newMess.name.includes("שרשרת חדשה " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 0; i < 1; i++) {
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
    if (currPerson.guestname === "...") {
      //alert("אין משתתפים בשרשרת!");
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
    encodeURI(fullTexts[id - 1]);
  window.open(link, "_blank");
}
function submitData() {}
function change(id) {
    var textEntered="";
    var dataElement;
    if(id==="participants"){
        chosenCol = "participants";
        textEntered=document.getElementById("participants").value;
        dataElement=document.getElementById("participantsChange");
    }
   if(id==="about"){
        chosenCol = "about";
        textEntered=document.getElementById("about").value;
        dataElement=document.getElementById("aboutChange");
   }
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
