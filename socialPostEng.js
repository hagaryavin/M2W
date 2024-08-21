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
   "https://script.google.com/macros/s/AKfycbwif1D1ZdoI1iYaL2Hya5Jke8UIFaoPxMo2Jkvd3cNytK35UIGbJZ0NKwhiYJQgana8-A/exec";
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
    { name: "", lines: [] }
];
var fullTexts = [[], [], [], [],[],[],[],[]];
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var chainDataURL  =
  "https://script.google.com/macros/s/AKfycbyEekfuBfk9W8aWqk9_uOa-Imynp5d3kKHjAebD6WuL-e7d2xN8RdBRsPefUJWcflgMsQ/exec";
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
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.guestname + " + " + fixChainFromData(newPerson.chain);
        personOption.id = rowCount;
        if (newPerson.guestname !== "" || newPerson.chain !== "") {
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
          nameEnglish:ele.nameenglish
        };
        crewList.push(newCrewMem);
        crewOption = document.createElement("option");
        crewOption.value = newCrewMem.nameEnglish;
        optionsCrew.append(crewOption);
        if(newCrewMem.nameEnglish==="Yael"){
            document.getElementById("crewList").value = "Yael"; 
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
      json.data.messagesEng.forEach((ele) => {
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

       for (var i = 1; i <= 8; i++) {
          if (newMess.name.includes("פוסט " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 0; i <= 7; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
            
          cutMess(messes[i].lines, i + 1);
        }
      }
    });
}
function cutMess(linesArr, messType) {
  var crewMem;
  if (currCrew.nameEnglish !== "") crewMem = currCrew.nameEnglish;
  if (currCrew.nameEnglish === "") crewMem = "";
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
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
    if (linesArr[i].includes("crewNameEng")) {
      linesArr[i] = linesArr[i].replace("crewNameEng", crewMem);
    }
    if (linesArr[i].includes("title")) {
      linesArr[i] = linesArr[i].replace("title", title);
    }
    if (linesArr[i].includes("link555")) {
      linesArr[i] = linesArr[i].replace("link555", linkFive);
    }
    if (linesArr[i].includes("linkyoutube55")) {
      linesArr[i] = linesArr[i].replace("linkyoutube55", link55yt);
    }
    if (linesArr[i].includes("fullLink")) {
      linesArr[i] = linesArr[i].replace("fullLink", linkFull);
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
if (
      chainType === "short" &&messType===3&&
      linesArr[i]==="Enjoy viewing!"
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
      if (document.getElementById("crewList").value === crewList[j].nameEnglish) {
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
    encodeURI(fullTexts[whichMes - 1]);
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
     splittedName[0] === "ד״ר" 
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
     splittedName[0] === "ד״ר" 
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
     splittedName[0] === "ד״ר" 
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