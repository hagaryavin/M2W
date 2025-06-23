var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var firstName = "";
var firstNameInterviewer = "";
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
var wannaFixGuestPhone = true;
var wannaFixInterPhone = true;
var wannaFixCreatorPhone = true;
const url =
  "https://script.google.com/macros/s/AKfycbwif1D1ZdoI1iYaL2Hya5Jke8UIFaoPxMo2Jkvd3cNytK35UIGbJZ0NKwhiYJQgana8-A/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var currPerson = {};
var currChainCreator = {};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbyEekfuBfk9W8aWqk9_uOa-Imynp5d3kKHjAebD6WuL-e7d2xN8RdBRsPefUJWcflgMsQ/exec";
getCrewData();
getChainData();
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
          interviewername: ele.interviewername,
          guestphone: String(ele.phone),
          chain: ele.chain,
            email:ele.email,
            title: ele.topicofstory,
          interviewerphone: String(ele.interviewerphone),
          date: changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem'),
          hour: changeTimeZone(new Date(ele.recordinghour), 'Asia/Jerusalem'),
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.guestphone = ele.fixedphone;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewername = ele.fixedinterviewername;
        if (ele.fixedinterviewerphone !== "")
          newPerson.interviewerphone = ele.fixedinterviewerphone;
        if (ele.fixedrecordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך")
          newPerson.date = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
        if (ele.fixedrecordinghour !== "")
          newPerson.hour = changeTimeZone(new Date(ele.fixedrecordinghour), 'Asia/Jerusalem');
        newPerson.hour.setFullYear(
          newPerson.date.getFullYear(),
          newPerson.date.getMonth(),
          newPerson.date.getDate()
        );
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        const params = new URLSearchParams(window.location.search);
            const nameP = params.get('name');
            const chainP = params.get('chain');
            if (nameP&&chainP&&nameP===newPerson.name&&chainP===fixChainFromData(newPerson.chain)) {
                document.getElementById("peopleList").value =newPerson.name + " + " + fixChainFromData(newPerson.chain);
            }
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
          creatorPhone:ele.creatorphone
        };
        allChains.push(newChain);
        chainOption = document.createElement("option");
        chainOption.value = newChain.name;
        document.getElementById("chainsNames").append(chainOption);
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
            ele.line20
          ],
        };
          
       for (var i = 1; i <= 8; i++) {
          if (newMess.name.includes("הזמנה להקלטה " + i)) {
            messes[i - 1] = newMess;
              console.log(newMess);
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
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
function changeNameS(who) {
  var firstName2 = fixFirstName(currPerson.guestphone);
  var firstNameInterviewer2 = fixInterviewerFirstName(currPerson.guestphone);
  var firstNameSwitch = "";
  if (who === "both") {
    if (firstName2 === "" && firstNameInterviewer2 !== "") {
      firstNameSwitch = " " + firstNameInterviewer2;
    }
    if (firstName2 !== "" && firstNameInterviewer2 === "") {
      firstNameSwitch = " " + firstName2;
    }
    if (firstName2 !== "" && firstNameInterviewer2 !== "") {
      firstNameSwitch = " " + firstName2 + "/" + firstNameInterviewer2;
    }
  }
  if (who === "guest") {
    firstNameSwitch = firstName2;
  }
  if (who === "interviewer") {
    firstNameSwitch = firstNameInterviewer2;
  }
  return firstNameSwitch;
}
function cutMess(linesArr, messType) {
 var crewMem;
  if (currCrew.nameEnglish !== "") crewMem = currCrew.nameEnglish;
  if (currCrew.nameEnglish === "") crewMem = "";
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
  var i = 0;
  var firstName2 = fixFirstName(currPerson.guestphone);
  var firstNameInterviewer2 = fixInterviewerFirstName(currPerson.guestphone);
  var nameOfChainSwitch = document.getElementById("chainName").value;
  var dateAndHourValue = document.getElementById("dateAndHour").value;
  const arrayOfTime = dateAndHourValue.split("T");
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("firstNames")) {
      linesArr[i] = linesArr[i].replace("firstNames", changeNameS(who));
    }
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace("nameOfChain", nameOfChainSwitch);
    }
    if (linesArr[i].includes("hour")) {
      linesArr[i] = linesArr[i].replace("hour", arrayOfTime[1]);
    }
    if (linesArr[i].includes("date")) {
      linesArr[i] = linesArr[i].replace("date", fixDate(arrayOfTime[0]));
    }
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("firstNameOfGuest", firstName2);
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      var nameAndChain = document
        .getElementById("peopleList")
        .value.split(" + ");
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", nameAndChain[0]);
    }
    if (linesArr[i].includes("firstNameOfInterviewer")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfInterviewer",
        firstNameInterviewer2
      );
    }
    if (linesArr[i].includes("firstNameOfCreator")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfCreator",
        fixCreatorFirstName()
      );
    }
    if (linesArr[i].includes("crewNameEng")) {
      linesArr[i] = linesArr[i].replace("crewNameEng", crewMem);
    }
    if (linesArr[i].includes("title")) {
      linesArr[i] = linesArr[i].replace("title", currPerson.title);
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
//style="visibility:hidden"
//dataAsOptionsOutorder();
function dataAsOptionsOutorder() {
  var i = size - 1;
  console.log(allPeople[0]);
  console.log(allPeople[size - 1]);
  while (i >= 0) {
    console.log(allPeople[i]);
    personOption = document.createElement("option");
    personOption.value = allPeople[i].name;
    personOption.id = allPeople[i].row;
    //rowCount++;
    options.append(personOption);
    i--;
  }
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);

function reset() {
  document.location.reload();
}
function crewChosen() {
  if (document.getElementById("crewList").value !== "") {
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("crewList").value === crewList[j].nameEnglish) {
        currCrew = crewList[j];
      }
    }
  } else {
    currCrew.nameEnglish = "";
    currCrew.phone = "";
  }

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
function checkInputs() {
  if (
    checkPhoneGuest(document.getElementById("guestPhone").value) &&
    document.getElementById("chainsNames").value !== "" &&
    document.getElementById("dateAndHour").value !== ""
  ) {
    return true;
  }
  alert("ייתכן שמספר הטלפון או התאריך או השעה לא תקינים!");
  return false;
}
function fixDate(str) {
  const myArray = str.split("-");
  var year = myArray[0];
  var month = myArray[1];
  var day = myArray[2];
  return day + "." + month + "." + year;
}
function fixDateAndHour() {
  var dateAndHourValue = document.getElementById("dateAndHour").value;
  const myArray = dateAndHourValue.split("T");
  /*document.getElementById("dateOfRecording").innerHTML = fixDate(myArray[0]);
  document.getElementById("hourOfRecording").innerHTML = myArray[1];*/
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
        findChainCreator();
      }
    }
  }
   if(currChain.creatorPhone!=="")    
         document.getElementById("creatorPhone").value = fixPhoneDataCreator(currChain.creatorPhone);

      
}
function findChainCreator() {
  for (var i = 0; i < allPeople.length; i++) {
    if (allPeople[i].name === currChain.creator) {
      currChainCreator = {
        name: allPeople[i].name,
        phone: allPeople[i].guestphone,
      };
    }
  }
  console.log(currChainCreator);
}
function fixFirstName(phoneNum) {
  var fullName = "";
  for (var i = 0; i < size; i++) {
    if (allPeople[i].guestphone === phoneNum) fullName = allPeople[i].name;
  }
  const splittedName = fullName.split(" ");
  if (
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דר." ||
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
    splittedName[0] === "Doctor"||
    splittedName[0] === "Professor" ||
    splittedName[0] === "הרב" ||
    splittedName[0] === "ד״ר" ||
     splittedName[0] === 'עו"ד'||
      splittedName[0] === 'עו״ד'
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function submit() {
  toFixGuestPhone();
  toFixInterPhone();
  toFixCreatorPhone();
  console.log("entered the submit in pre");
  crewChosen();
  document.getElementById("preMes").style.visibility = "hidden";
  if (checkInputs()) {
    fixDateAndHour();
    fixChain();
    document.getElementById("preMes").style.visibility = "visible";
    getMessData();
  }
  console.log("left submit in pre");
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
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone, toWho) +
    "&text=" +
    encodeURIComponent(fullTexts[whichMes - 1]);
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
function email(id){
  /*var link =
    "https://mail.google.com/mail/?view=cm&to=" +
    currPerson.email +
    "&su=" +
    encodeURIComponent("Invitation to Your Story555 Recording") +
    "&body=" +
    encodeURIComponent(fullTexts[id - 1]);*/
    var link=
        "https://mail.google.com/mail/u/555mystory555@gmail.com/?extsrc=mailto&url=mailto%3A"+
        currPerson.email.replace("@","%40")+
        "%3Fsubject%3D"+
        encodeURIComponent("Invitation to Your Story555 Recording in "+document.getElementById("chainName").value+" Chain")+
        "%26body%3D"+
        encodeURIComponent(fullTexts[id - 1]);
        
  window.open(link, "_blank");
}
function sendBothPreMes() {
  whatsAppMes("preMesInter");
  whatsAppMes("preMesGuest");
}
function sendBothZoom() {
  whatsAppMes("zoomInter");
  whatsAppMes("zoomGuest");
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
    splittedName[0] === "Doctor"||
    splittedName[0] === "Professor" ||
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
function getRowFromName(name) {
  var rowNum = 0;
  for (var i = 0; i < allPeople.length; i++) {
    if (allPeople[i].name === name) {
      rowNum = allPeople[i].row;
    }
  }
  return rowNum;
}
function submitData() {
  document.getElementById("interviewerPhone").value = "";
  document.getElementById("guestPhone").value = "";
    document.getElementById("creatorPhone").value = "";
  document.getElementById("chainName").value = "";
  document.getElementById("dateAndHour").value = "";
  toFixGuestPhone();
  toFixInterPhone();
   toFixCreatorPhone();
    
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      currPerson = allPeople[i];
      console.log(
        "row num:" +
          allPeople[i].row +
          " id:" +
          document.getElementById("peopleList").id
      );
      document.getElementById("chainName").value = fixChainFromData(
        allPeople[i].chain
      );

      document.getElementById("guestPhone").value = fixPhoneDataGuest(
        allPeople[i].guestphone
      );
            if(allPeople[i].interviewerphone!==""){
      document.getElementById("interviewerPhone").value = fixPhoneDataInter(
        allPeople[i].interviewerphone
      );
            }
     fixChain();

      var fixedMonth = allPeople[i].date.getMonth() + 1;
      var recordingDate =
        allPeople[i].date.getFullYear() +
        "-" +
        fixedMonth +
        "-" +
        allPeople[i].date.getDate();
      if (fixedMonth < 10) {
        recordingDate =
          allPeople[i].date.getFullYear() +
          "-0" +
          fixedMonth +
          "-" +
          allPeople[i].date.getDate();
      }
      if (allPeople[i].date.getDate() < 10) {
        recordingDate =
          allPeople[i].date.getFullYear() +
          "-" +
          fixedMonth +
          "-0" +
          allPeople[i].date.getDate();
      }
      if (allPeople[i].date.getDate() < 10 && fixedMonth < 10) {
        recordingDate =
          allPeople[i].date.getFullYear() +
          "-0" +
          fixedMonth +
          "-0" +
          allPeople[i].date.getDate();
      }
      var recordingHour =
        allPeople[i].hour.getHours() + ":" + allPeople[i].hour.getMinutes();
      if (allPeople[i].hour.getHours() < 10) {
        recordingHour =
          "0" +
          allPeople[i].hour.getHours() +
          ":" +
          allPeople[i].hour.getMinutes() +
          ":00";
      }
      if (allPeople[i].hour.getMinutes() < 10) {
        recordingHour =
          allPeople[i].hour.getHours() +
          ":0" +
          allPeople[i].hour.getMinutes() +
          ":00";
      }
      if (
        allPeople[i].hour.getMinutes() < 10 &&
        allPeople[i].hour.getHours() < 10
      ) {
        recordingHour =
          "0" +
          allPeople[i].hour.getHours() +
          ":0" +
          allPeople[i].hour.getMinutes() +
          ":00";
      }

      document.getElementById("dateAndHour").value =
        recordingDate + "T" + recordingHour;
      firstName = fixFirstName(allPeople[i].guestphone);
      firstNameInterviewer = fixInterviewerFirstName(allPeople[i].guestphone);
      /*  if (firstName === "" && firstNameInterviewer !== "") {
        document.getElementById("nameOfPeople").innerHTML =
          " " + firstNameInterviewer;
      }
      if (firstName !== "" && firstNameInterviewer === "") {
        document.getElementById("nameOfPeople").innerHTML = " " + firstName;
      }
      if (firstName !== "" && firstNameInterviewer !== "") {
        document.getElementById("nameOfPeople").innerHTML =
          " " + firstName + "/" + firstNameInterviewer;
      }
      document.getElementById("nameOfPerson").innerHTML = " " + firstName;
      document.getElementById("nameOfPerson2").innerHTML = "ל" + firstName;*/
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

