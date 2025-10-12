var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var fullName = "";
var guestFirstName = "";
var interFirstName = "";
var linkFive = "";
var link55yt = "";
var linkFull = "";
var title = "";
var chainType = "long";
var fullText1 = "";
var fullText2 = "";
var fullText3 = "";
var fullText4 = "";
var wannaFixGuestPhone = true;
var wannaFixInterPhone = true;
var wannaFixCreatorPhone = true;
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
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
    { name: "", lines: [] },
    { name: "", lines: [] }
];
var fullTexts = [[], [], [], [],[],[],[],[],[]];
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
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
          guestname: ele.name,
          interviewername: ele.interviewername,
          guestphone: ele.phone,
          interviewerphone: ele.interviewerphone,
          title: ele.topicofstory,
          chain: ele.chain,
          linkfive: ele.linkfive,
          linkfull: ele.linkfull,
          linkshortyt: ele.linkshortyt,
          chaintype: "long",
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.guestname = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.guestphone = ele.fixedphone;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewername = ele.fixedinterviewername;
        if (ele.fixedinterviewerphone !== "")
          newPerson.interviewerphone = ele.fixedinterviewerphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
            newPerson.chaintype = "short";
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.guestname + " + " + fixChainFromData(newPerson.chain);
         const params = new URLSearchParams(window.location.search);
            const nameP = params.get('name');
            const chainP = params.get('chain');
            if (nameP && chainP&& nameP===newPerson.guestname&&chainP===fixChainFromData(newPerson.chain)) {
                document.getElementById("peopleList").value =newPerson.guestname + " + " + fixChainFromData(newPerson.chain);
      }
        personOption.id = rowCount;
        if (ele.fixedrecordingdate!=="ללא תאריך"&&(newPerson.guestname !== "" || newPerson.chain !== "")) {
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
          creator:ele.creator,
          creatorPhone:ele.creatorphone
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

       for (var i = 1; i <= 9; i++) {
          if (newMess.name.includes("פוסט " + i)) {
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
    if(messType!==5){
  removeAllChildNodes(testDiv);
        }
  var i = 0;
  while (linesArr[i] !== "end") {
    
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace(
        "nameOfChain",
        document.getElementById("chainName").value
      );
    }
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("firstNameOfGuest", guestFirstName);
    }
    if (linesArr[i].includes("firstNameOfInterviewer")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfInterviewer",
        interFirstName
      );
    }
     if (linesArr[i].includes("firstNameOfCreator")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfCreator",
        fixCreatorFirstName()
      );
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      var nameAndChain = document
        .getElementById("peopleList")
        .value.split(" + ");
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", nameAndChain[0]);
    }
    if (linesArr[i].includes("crewName")) {
      linesArr[i] = linesArr[i].replace("crewName", crewMem);
    }
    if (linesArr[i].includes("title")) {
      linesArr[i] = linesArr[i].replace("title", title);
    }
    if (linesArr[i].includes("link555")) {
      linesArr[i] = linesArr[i].replace("link555", linkFive);
    }
    if (linesArr[i].includes("link55youtube")) {
      linesArr[i] = linesArr[i].replace("link55youtube", link55yt);
    }
    if (linesArr[i].includes("fullLink")) {
      linesArr[i] = linesArr[i].replace("fullLink", linkFull);
    }
    if (linesArr[i].includes("לראיון המלא")) {
        if(linkFull===""){
      linesArr[i] = linesArr[i].replace("לראיון המלא", "");
        }
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
    if(messType!==5){
            testDiv.append(testH4);
        }
    }
if (
      chainType === "short" &&messType===3&&
      linesArr[i]==="צפייה מהנה!"
    ){
         //if (linesArr[i+2] !== "end")  
            i+=2;
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
function checkPhoneGuest(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.length === 10 && phone[0] === "0" && phone[1] === "5")
      return true;
    return false;
  } else return true;
}
function checkPhoneInter(phone) {
  if (wannaFixInterPhone === true) {
    if (phone.length === 10 && phone[0] === "0" && phone[1] === "5")
      return true;
    return false;
  } else return true;
}
function checkPhoneCreator(phone) {
  if (wannaFixCreatorPhone === true) {
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
function checkInputs() {
  if (
    checkPhoneGuest(document.getElementById("guestPhone").value) &&
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
    if(currChain.creatorPhone!=="")    
         document.getElementById("creatorPhone").value = fixPhoneDataCreator(currChain.creatorPhone);

                      
        
}
function submit() {
  toFixGuestPhone();
  toFixInterPhone();
  toFixCreatorPhone();
  crewChosen();
  document.getElementById("post").style.visibility = "hidden";
  if (checkInputs()) {
    fixChain();
    document.getElementById("post").style.visibility = "visible";
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


function phoneForWA(phone, toWho) {
  if (toWho === "guest") {
    if (wannaFixGuestPhone === true) {
      return "972" + phone.slice(1);
    }
      return phone;
  }
    if(toWho==="inter"){
       if (wannaFixInterPhone === true) {
            return "972" + phone.slice(1);
        } 
        return phone;
    }
    if(toWho==="creator"){
       if (wannaFixCreatorPhone === true) {
            return "972" + phone.slice(1);
        } 
        return phone;
    }
  return "972" + phone.slice(1);
}
function whatsAppMes(id) {
 const splittedId = id.split("_");
  var whichMes = splittedId[0];
  var toWho = splittedId[1];
  var phone;
  if (toWho === "guest") phone = document.getElementById("guestPhone").value;
  if (toWho === "inter") phone = document.getElementById("interviewerPhone").value;
    if (toWho === "creator") phone = document.getElementById("creatorPhone").value;
if (toWho === "crew") phone = currCrew.phone;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone, toWho) +
    "&text=" +
    encodeURIComponent(fullTexts[whichMes - 1]);
  window.open(link, "_blank");
}
function sendBothMes() {
  whatsAppMes("postInter");
  whatsAppMes("postGuest");
}
function sendBothLast() {
  whatsAppMes("lastInter");
  whatsAppMes("lastGuest");
}
function sendBothTag() {
  whatsAppMes("TagUsInter");
  whatsAppMes("TagUsGuest");
}
function fixPhoneDataGuest(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.includes("+972 ")) {
      phone = phone.replace("+972 ", "0");
    }
    if (phone.startsWith("972 ")) {
      phone = phone.replace("972 ", "0");
    }
    while (phone.includes(" ")) {
      phone = phone.replace(" ", "");
    }
    if (phone.includes("+")) {
      phone = phone.replace("+", "");
    }
    if (!phone.startsWith("0")) {
      phone = "0" + phone;
    }
    while (phone.includes("-")) {
      phone = phone.replace("-", "");
    }
  }
  return phone;
}
function fixPhoneDataInter(phone) {
  if (wannaFixInterPhone === true) {
    if (phone.includes("+972 ")) {
      phone = phone.replace("+972 ", "0");
    }
    if (phone.startsWith("972 ")) {
      phone = phone.replace("972 ", "0");
    }
    while (phone.includes(" ")) {
      phone = phone.replace(" ", "");
    }
    if (phone.includes("+")) {
      phone = phone.replace("+", "");
    }
    if (!phone.startsWith("0")) {
      phone = "0" + phone;
    }
    while (phone.includes("-")) {
      phone = phone.replace("-", "");
    }
  }
  return phone;
}
function fixPhoneDataCreator(phone) {
  if (wannaFixCreatorPhone === true) {
    if (phone.includes("+972 ")) {
      phone = phone.replace("+972 ", "0");
    }
    if (phone.startsWith("972 ")) {
      phone = phone.replace("972 ", "0");
    }
    while (phone.includes(" ")) {
      phone = phone.replace(" ", "");
    }
    if (phone.includes("+")) {
      phone = phone.replace("+", "");
    }
    if (!phone.startsWith("0")) {
      phone = "0" + phone;
    }
    while (phone.includes("-")) {
      phone = phone.replace("-", "");
    }
  }
  return phone;
}
function fixFirstName(phoneNum) {
  var fullName = "";
  for (var i = 0; i < size; i++) {
    if (allPeople[i].guestphone === phoneNum) fullName = allPeople[i].guestname;
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
function fixCreatorFirstName() {
   if(currChain.creator!==""){
    const splittedName = currChain.creator.split(" ");
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
    return "";
}
function fixInterviewerFirstName(phoneNum) {
  var fullName = "";
  for (var i = 0; i < size; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].guestphone === phoneNum &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    )
      fullName = allPeople[i].interviewername;
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

function submitData() {
  toFixGuestPhone();
  toFixInterPhone();
  toFixCreatorPhone();
  for (var i = 0; i < allPeople.length; i++) {
    /* if (
      allPeople[i].guestname === document.getElementById("peopleList").value
    ) {*/
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].guestname === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      console.log("row num:" + allPeople[i].row);
      document.getElementById("chainName").value = fixChainFromData(
        allPeople[i].chain
      );
      fullName = allPeople[i].guestname;
      document.getElementById("guestPhone").value = fixPhoneDataGuest(
        allPeople[i].guestphone
      );
    if(allPeople[i].interviewerphone!==""){
      document.getElementById("interviewerPhone").value = fixPhoneDataInter(
        allPeople[i].interviewerphone
      );
    }
        document.getElementById("full555").value = allPeople[i].linkfull;
        fixChain();
      linkFive = allPeople[i].linkfive;
      linkFull = allPeople[i].linkfull;
      link55yt = allPeople[i].linkshortyt;
      if (linkFull === "" || linkFull === "שרשרת קצרה")
        allPeople[i].chaintype = "short";
      if (linkFull !== "" && linkFull !== "שרשרת קצרה")
        allPeople[i].chaintype = "long";
      chainType = allPeople[i].chaintype;
      title = allPeople[i].title;
      guestFirstName = fixFirstName(allPeople[i].guestphone);
      interFirstName = fixInterviewerFirstName(allPeople[i].guestphone);
     
      
  }
}
}
function toFixGuestPhone() {
  if (document.getElementById("fixGuestPhone").checked === true) {
    wannaFixGuestPhone = true;
  } else wannaFixGuestPhone = false;
}
function toFixInterPhone() {
  if (document.getElementById("fixInterPhone").checked === true) {
    wannaFixInterPhone = true;
  } else wannaFixInterPhone = false;
}
function toFixCreatorPhone() {
  if (document.getElementById("fixCreatorPhone").checked === true) {
    wannaFixCreatorPhone = true;
  } else wannaFixCreatorPhone = false;
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