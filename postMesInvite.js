var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var firstName = "";
var chainType = "long";
var fullTextInvite = "";
var wannaFixGuestPhone = true;
//document.getElementById("longInvite").style.visibility = "hidden";
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = {};
var newCrewMem;
var messes = [
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
    { name: "", lines: [] },
    { name: "", lines: [] }  ,
     { name: "", lines: [] } 
];
var fullTexts = [[], [], [], [], [], [],[],[],[]];
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
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
          name: ele.name,
          phone: ele.phone,
          chain: ele.chain,
          interviewername: ele.interviewername,
          linkfive: ele.linkfive,
          linkshort: ele.linkshort,
          linkfull: ele.linkfull,
          linkspotify: ele.linkspotify,
          chaintype: "long",
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewername = ele.fixedinterviewername;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
            newPerson.chaintype = "short";
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        personOption.id = rowCount;
        if (ele.fixedrecordingdate!=="ללא תאריך"&&(newPerson.name !== "" || newPerson.chain !== "")) {
            console.log(allPeople[size]);
            options.append(personOption);
        }
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
        participants:ele.participants,
            about:ele.about
        };
        allChains.push(newChain);
        chainOption = document.createElement("option");
        chainOption.value = newChain.name;
        document.getElementById("chainsNames").append(chainOption);
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
  var messesInvite = [];
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

      for (var i = 1; i <= 9; i++) {
          if (newMess.name.includes("לינקים להזמנת אורח " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 0; i <= 8; i++) {
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
    if(messType===1||messType===4||messType===8||messType===9){
  
        removeAllChildNodes(testDiv);
    }
    //if(messType!==1||messType!==6){
      //  testDiv=document.createElement("div");
    //}
  
  var i = 0;
  //var firstName2 = fixFirstName(document.getElementById("guestPhone").value);
  var firstNameInterviewer2 = fixInterviewerFirstName(
    document.getElementById("guestPhone").value
  );
  var fullNameInterviewer2 = fixInterviewerFullName(
    document.getElementById("guestPhone").value
  );

  var nameOfChainSwitch = document.getElementById("chainName").value;

  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace("nameOfChain", nameOfChainSwitch);
    }

    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("firstNameOfGuest", firstName);
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      var nameAndChain = document
        .getElementById("peopleList")
        .value.split(" + ");

      linesArr[i] = linesArr[i].replace("fullNameOfGuest", nameAndChain[0]);
    }
    if (linesArr[i].includes("crewName")) {
      linesArr[i] = linesArr[i].replace("crewName", currCrew.name);
    }
    if (linesArr[i].includes("firstNameOfInterviewer")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfInterviewer",
        firstNameInterviewer2
      );
    }
    if (linesArr[i].includes("fullNameOfInterviewer")) {
      linesArr[i] = linesArr[i].replace(
        "fullNameOfInterviewer",
        fixInterviewerFullName(document.getElementById("guestPhone").value)
      );
    }
    if (linesArr[i].includes("chainDescription")) {
      linesArr[i] = linesArr[i].replace(
        "chainDescription",
        currChain.description
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
    if (linesArr[i].includes("chainPlaylist")) {
      linesArr[i] = linesArr[i].replace("chainPlaylist", currChain.playlist);
    }
    if (
      chainType === "short" &&
      linesArr[i].includes("-לבחור את מועד ההקלטה דרך הלינק המצורף")
    )
      i++;

    var testH4 = document.createElement("h4");
    /*if (
      chainType === "short" &&
      linesArr[i + 1] === "-לבחור את מועד ההקלטה דרך הלינק המצורף"
    ) {
      testH4.classList.add("mb-3");
    }*/
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

    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = duplicateLine;
        if(messType===1||messType===4||messType===8||messType===9){
      testDiv.append(testH4);
        }
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
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);

function reset() {
  document.location.reload();
}
function checkPhone(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.length === 10 && phone[0] === "0" && phone[1] === "5")
      return true;
    return false;
  } else return true;
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
function fixInterviewerFirstName(phoneNum) {
  var fullName = "";
  for (var i = 0; i < size; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      fullName = allPeople[i].interviewername;
    }
  }
  const splittedName = fullName.split(" ");
  if (
    splittedName[0] === "דר." ||
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דוקטור" ||
    splittedName[0] === "פרופסור" ||
    splittedName[0] === "פרופ'" ||
    splittedName[0] === "Dr."||
     splittedName[0] === "הרב" ||
     splittedName[0] === "ד״ר" ||
     splittedName[0] === 'עו"ד'||
      splittedName[0] === 'עו״ד'
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function checkInputs() {
  if (
    checkPhone(document.getElementById("guestPhone").value) &&
    document.getElementById("chainsNames").value !== ""
  ) {
    return true;
  }
  alert("ייתכן שמספר הטלפון אינו תקין!");
  return false;
}

function fixChain() {
  if (document.getElementById("chainName").value !== "") {
    for (var j = 0; j < allChains.length; j++) {
      if (
        document.getElementById("chainName").value === allChains[j].name ||
        document.getElementById("chainName").value === allChains[j].altName
      ) {
        currChain = allChains[j];
        console.log(currChain);
      }
    }
  }
  //document.getElementById("nameOfChain2").innerHTML = document.getElementById( "chainName" ).value;
  // document.getElementById("descOfChain").innerHTML = currChain.description;
}
function submit() {
  toFixGuestPhone();
  crewChosen();
  // document.getElementById("longInvite").style.visibility = "hidden";
  document.getElementById("postMes").style.visibility = "hidden";
  if (checkInputs()) {
    fixChain();
    document.getElementById("postMes").style.visibility = "visible";
    /* if (chainType === "long")
      document.getElementById("longInvite").style.visibility = "visible";
    if (chainType === "short")
      document.getElementById("longInvite").style.visibility = "hidden";*/
    getMessData();
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
  if (wannaFixGuestPhone === true) {
    return "972" + phone.slice(1);
  }
  return phone;
}

function fixFirstName(phoneNum) {
  var fullName = "";

  for (var i = 0; i < size; i++) {
    if (allPeople[i].phone === phoneNum) {
      fullName = allPeople[i].name;
    }
  }
  const splittedName = fullName.split(" ");

  if (
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דוקטור" ||
    splittedName[0] === "פרופסור" ||
    splittedName[0] === "פרופ'" ||
    splittedName[0] === "Dr."||
     splittedName[0] === "הרב" ||
     splittedName[0] === "ד״ר" ||
     splittedName[0] === 'עו"ד'||
      splittedName[0] === 'עו״ד'
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function fixInterviewerFullName(phoneNum) {
  var fullName = "";
  for (var i = 0; i < size; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      fullName = allPeople[i].interviewername;
    }
  }
  return fullName;
}
function whatsAppMes(id) {
  var phone = document.getElementById("guestPhone").value;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone) +
    "&text=" +
    encodeURIComponent(fullTexts[id - 1]);
  window.open(link, "_blank");
}
function fixPhoneData(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.includes("-")) {
      console.log("in");
      phone = phone.replace("-", "");
    }
    if (phone.includes(" ")) {
      phone = phone.replace(" ", "");
    }
  }
  return phone;
}
function submitData() {
  toFixGuestPhone();
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      console.log(allPeople[i]);
      console.log("row num:" + allPeople[i].row);
      document.getElementById("chainName").value = fixChainFromData(
        allPeople[i].chain
      );
      firstName = fixFirstName(allPeople[i].phone);
      //document.getElementById("nameOfPerson").innerHTML = " " + firstName;
      document.getElementById("guestPhone").value = fixPhoneData(
        allPeople[i].phone
      );
      /* if (
        allPeople[i].linkfull === "" ||
        allPeople[i].linkfull === "שרשרת קצרה"
      )
        allPeople[i].chaintype = "short";*/
      chainType = allPeople[i].chaintype;
    }
  }
}
function toFixGuestPhone() {
  if (document.getElementById("fixGuestPhone").checked === true) {
    wannaFixGuestPhone = true;
  } else wannaFixGuestPhone = false;
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
        document.getElementById("toNewChain").innerHTML="פתיחת שרשרת/קהילה חדשה";
        document.getElementById("toNewChain").onclick=function() { window.location.href='./newChain.html';};
       document.getElementById("toStuckMes").innerHTML="חרוזים אחרונים";
        document.getElementById("toStuckMes").onclick=function() { window.location.href='./stuckMes.html';};
        document.getElementById("toChangeCRM").innerHTML="עדכון תוצרים ותיקונים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRM.html';};
         document.getElementById("toDisplay").innerHTML="הכרטיס";
        document.getElementById("toDisplay").onclick=function() { window.location.href='./display.html';};
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
        document.getElementById("toChangeCRM").innerHTML="Eng עדכון ותיקון תוצרים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRMEng.html';};
    }
}
