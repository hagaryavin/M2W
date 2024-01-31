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
var currCrew = "";
var newCrewMem;
var fullTextConfirm = "";
var fullTextInvite = "";
var wannaFixGuestPhone = true;
var wannaFixInterPhone = true;
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var currPerson = {};
var currChainCreator = {};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
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
          interviewerphone: String(ele.interviewerphone),
          date: new Date(ele.recordingdate),
          hour: new Date(ele.recordinghour),
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.guestphone = ele.fixedphone;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewername = ele.fixedinterviewername;
        if (ele.fixedinterviewerphone !== "")
          newPerson.interviewerphone = ele.fixedinterviewerphone;
        if (ele.fixedrecordingdate !== "")
          newPerson.date = new Date(ele.fixedrecordingdate);
        if (ele.fixedrecordinghour !== "")
          newPerson.hour = new Date(ele.fixedrecordinghour);
        newPerson.hour.setFullYear(
          newPerson.date.getFullYear(),
          newPerson.date.getMonth(),
          newPerson.date.getDate()
        );
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        personOption.id = rowCount;
        if (newPerson.name !== "" || newPerson.chain !== "") {
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
        };
        crewList.push(newCrewMem);
        crewOption = document.createElement("option");
        crewOption.value = newCrewMem.name;
        optionsCrew.append(crewOption);
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
  var messesConfirm = [];
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

        if (newMess.name.includes("אישור רישום להקלטה")) {
          messesConfirm.push(newMess);
        }
        if (newMess.name.includes("הזמנה להקלטה 1")) {
          messesInvite.push(newMess);
        }
      });
      for (var j = 0; j < messesConfirm.length; j++) {
        cutMess(messesConfirm[j].lines, "confirm", "both");
      }
      for (var k = 0; k < messesInvite.length; k++) {
        cutMess(messesInvite[k].lines, "invite", "both");
      }
    });
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
function cutMess(linesArr, messType, who) {
  var currText = "";
  var testDiv;
  if (messType === "confirm") {
    testDiv = document.getElementById("confirmText");
  }
  if (messType === "invite") {
    testDiv = document.getElementById("inviteText");
  }
  removeAllChildNodes(testDiv);
  var crewMem;
  if (currCrew !== "") crewMem = currCrew + ", ";
  if (currCrew === "") crewMem = "";
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
    if (linesArr[i].includes("crewName")) {
      linesArr[i] = linesArr[i].replace("crewName", crewMem);
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
  if (messType === "confirm") {
    fullTextConfirm = currText;
  }
  if (messType === "invite") {
    fullTextInvite = currText;
  }
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
      if (document.getElementById("crewList").value === crewList[j].name) {
        currCrew = crewList[j].name;
      }
    }
  } else {
    currCrew = "";
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
function checkInputs() {
  if (
    checkPhoneGuest(document.getElementById("guestPhone").value) &&
    document.getElementById("chainsNames").value !== "" &&
    document.getElementById("dateAndHour").value !== "" &&
    checkPhoneInter(document.getElementById("interviewerPhone").value)
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
  /* document.getElementById("nameOfChain").innerHTML = document.getElementById(
    "chainName"
  ).value;*/
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
    splittedName[0] === "דר" ||
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דר." ||
    splittedName[0] === "דוקטור" ||
    splittedName[0] === "פרופסור" ||
    splittedName[0] === "פרופ'" ||
    splittedName[0] === "Dr."
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
    splittedName[0] === "דר" ||
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דוקטור" ||
    splittedName[0] === "פרופסור" ||
    splittedName[0] === "פרופ'" ||
    splittedName[0] === "Dr."
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function submit() {
  toFixGuestPhone();
  toFixInterPhone();
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
function textToCopy(id) {
  var chainName = document.getElementById("chainName").value;
  var dateAndHourValue = document.getElementById("dateAndHour").value;
  var myArray = dateAndHourValue.split("T");
  var date = fixDate(myArray[0]);
  var hour = myArray[1];
  var textPreMes = fullTextInvite;
  /* "היי, *תודה* שבחרת להתארח בזום *סיפור555* בשרשרת " +
    chainName +
    ". נפגש בתאריך " +
    date +
    " בשעה " +
    hour +
    " בהקלטת סיפור555 של " +
    firstName +
    ". לינק לזום מצורף בהודעה הבאה. הזום יפתח 10 דק' לפני מועד השידור. הודעה זו תשלח ל" +
    firstName +
    " במייל, חצי שעה לפני מועד ההקלטה. בבקשה לאשר קבלת הודעה זו. *בהצלחה!*";*/
  var textZoom = "https://tinyurl.com/story555zoom";
  var textConfirm = fullTextConfirm;
  if (id === "confirmText") return textConfirm;
  if (id === "preMes") return textPreMes;
  if (id === "zoom") return textZoom;
  return "";
}
function copy(id) {
  var text = textToCopy(id);
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  alert("הטקסט הועתק!");
}
function phoneForWAGuest(phone) {
  if (wannaFixGuestPhone === true) {
    return "972" + phone.slice(1);
  }
  return phone;
}
function phoneForWAInter(phone) {
  if (wannaFixInterPhone === true) {
    return "972" + phone.slice(1);
  }
  return phone;
}
function mesForWA(id) {
  var chainName = document.getElementById("chainName").value;
  var dateAndHourValue = document.getElementById("dateAndHour").value;
  var myArray = dateAndHourValue.split("T");
  var date = fixDate(myArray[0]);
  var hour = myArray[1];
  var transChainName = encodeURI(chainName);
  var transName = encodeURI(firstName);
  var transInterName = encodeURI(firstNameInterviewer);
  var transCreatorName = encodeURI(fixFirstName(currChainCreator.phone));
  var textConfirm = encodeURI(fullTextConfirm);
  var textPreMes = "";
  var crewMem;
  if (currCrew !== "") crewMem = encodeURI(currCrew) + ", ";
  if (currCrew === "") crewMem = ""; //
  // encodeURI(fullTextInvite);
  if (id === "preMesGuest") {
    //if (textPreMes.includes(fullTextInvite.replace(changeNameS("both"))))
    textPreMes =
      "%D7%94%D7%99%20" +
      transName +
      ",%0A" +
      "%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%91%D7%97%D7%A8%D7%AA%20%D7%9C%D7%94%D7%AA%D7%90%D7%A8%D7%97%20%D7%91%D7%96%D7%95%D7%9D%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      ".%0A%0A%D7%A0%D7%A4%D7%92%D7%A9%20%D7%91%D7%AA%D7%90%D7%A8%D7%99%D7%9A%20" +
      date +
      "%20%D7%91%D7%A9%D7%A2%D7%94%20" +
      hour +
      "%20(ISR)%0A%D7%91%D7%94%D7%A7%D7%9C%D7%98%D7%AA%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8555%20%D7%A9%D7%9C%D7%9A.%0A%0A%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%96%D7%95%D7%9D%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%91%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%94%D7%91%D7%90%D7%94.%0A%D7%94%D7%96%D7%95%D7%9D%20%D7%99%D7%A4%D7%AA%D7%97%2010%20%D7%93%D7%A7'%20%D7%9C%D7%A4%D7%A0%D7%99%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%A9%D7%99%D7%93%D7%95%D7%A8.%0A%0A%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%96%D7%95%20%D7%AA%D7%A9%D7%9C%D7%97%20%D7%91%D7%9E%D7%99%D7%99%D7%9C,%20%D7%97%D7%A6%D7%99%20%D7%A9%D7%A2%D7%94%20%D7%9C%D7%A4%D7%A0%D7%99%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%94.%0A%D7%91%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%90%D7%A9%D7%A8%20%D7%A7%D7%91%D7%9C%D7%AA%20%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%96%D7%95.%0A" +
      crewMem +
      "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A*%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94!*";

    /*encodeURI(
        fullTextInvite.replace(
          "הי " + changeNameS("both"),
          changeNameS("guest")
        )
      );
    if (textPreMes.includes(fullTextInvite.replace(changeNameS("interviewer"))))
      textPreMes = encodeURI(
        fullTextInvite.replace(changeNameS("interviewer"), changeNameS("guest"))
      );*/
    //=
  }
  if (id === "preMesInter") {
    /* if (textPreMes.includes(fullTextInvite.replace(changeNameS("both"))))
      textPreMes = encodeURI(
        fullTextInvite.replace(changeNameS("both"), changeNameS("interviewer"))
      );
    if (textPreMes.includes(fullTextInvite.replace(changeNameS("guest"))))
      textPreMes = encodeURI(
        fullTextInvite.replace(changeNameS("guest"), changeNameS("interviewer"))
      );*/
    textPreMes =
      "%D7%94%D7%99%20" +
      transInterName +
      ",%0A" +
      "%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%91%D7%97%D7%A8%D7%AA%20%D7%9C%D7%94%D7%AA%D7%90%D7%A8%D7%97%20%D7%91%D7%96%D7%95%D7%9D%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      ".%0A%0A%D7%A0%D7%A4%D7%92%D7%A9%20%D7%91%D7%AA%D7%90%D7%A8%D7%99%D7%9A%20" +
      date +
      "%20%D7%91%D7%A9%D7%A2%D7%94%20" +
      hour +
      "%20(ISR).%0A%D7%91%D7%94%D7%A7%D7%9C%D7%98%D7%AA%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8555%20%D7%A9%D7%9C%20" +
      transName +
      ".%0A%0A%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%96%D7%95%D7%9D%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%91%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%94%D7%91%D7%90%D7%94.%0A%D7%94%D7%96%D7%95%D7%9D%20%D7%99%D7%A4%D7%AA%D7%97%2010%20%D7%93%D7%A7'%20%D7%9C%D7%A4%D7%A0%D7%99%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%A9%D7%99%D7%93%D7%95%D7%A8.%0A%0A%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%96%D7%95%20%D7%AA%D7%A9%D7%9C%D7%97%20%D7%9C" +
      transName +
      "%20%D7%91%D7%9E%D7%99%D7%99%D7%9C%20%D7%97%D7%A6%D7%99%20%D7%A9%D7%A2%D7%94%20%D7%9C%D7%A4%D7%A0%D7%99%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%94.%0A%D7%91%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%90%D7%A9%D7%A8%20%D7%A7%D7%91%D7%9C%D7%AA%20%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%96%D7%95.%0A" +
      crewMem +
      "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A*%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94!*";
  }
  if (id === "preMesCreator") {
    textPreMes =
      "%D7%94%D7%99%20" +
      transCreatorName +
      ",%0A" +
      "%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%91%D7%97%D7%A8%D7%AA%20%D7%9C%D7%94%D7%AA%D7%90%D7%A8%D7%97%20%D7%91%D7%96%D7%95%D7%9D%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      ".%0A%0A%D7%A0%D7%A4%D7%92%D7%A9%20%D7%91%D7%AA%D7%90%D7%A8%D7%99%D7%9A%20" +
      date +
      "%20%D7%91%D7%A9%D7%A2%D7%94%20" +
      hour +
      ".%0A%D7%91%D7%94%D7%A7%D7%9C%D7%98%D7%AA%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8555%20%D7%A9%D7%9C%20" +
      transName +
      ".%0A%0A%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%96%D7%95%D7%9D%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%91%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%94%D7%91%D7%90%D7%94.%0A%D7%94%D7%96%D7%95%D7%9D%20%D7%99%D7%A4%D7%AA%D7%97%2010%20%D7%93%D7%A7'%20%D7%9C%D7%A4%D7%A0%D7%99%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%A9%D7%99%D7%93%D7%95%D7%A8.%0A%0A%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%96%D7%95%20%D7%AA%D7%A9%D7%9C%D7%97%20%D7%9C" +
      transName +
      "%20%D7%91%D7%9E%D7%99%D7%99%D7%9C%20%D7%97%D7%A6%D7%99%20%D7%A9%D7%A2%D7%94%20%D7%9C%D7%A4%D7%A0%D7%99%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%94.%0A%D7%91%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%90%D7%A9%D7%A8%20%D7%A7%D7%91%D7%9C%D7%AA%20%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%96%D7%95.%0A" +
      crewMem +
      "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A*%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94!*";
  }
  var textZoom = "https://tinyurl.com/story555zoom";
  if (id === "confirmText") return textConfirm;
  if (id === "preMesInter" || id === "preMesGuest" || id === "preMesCreator")
    return textPreMes;
  if (id === "zoomInter" || id === "zoomGuest" || id === "zoomCreator")
    return textZoom;
  return "";
}
function whatsAppMes(id) {
  var phone = document.getElementById("guestPhone").value;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWAGuest(phone) +
    "&text=" +
    mesForWA(id);
  if (id === "preMesInter" || id === "zoomInter" || id === "confirmText") {
    phone = document.getElementById("interviewerPhone").value;
    var link =
      "https://api.whatsapp.com/send?phone=" +
      phoneForWAInter(phone) +
      "&text=" +
      mesForWA(id);
  }
  if (id === "preMesCreator" || id === "zoomCreator") {
  }
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
  document.getElementById("chainName").value = "";
  document.getElementById("dateAndHour").value = "";
  toFixGuestPhone();
  toFixInterPhone();
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
      document.getElementById("interviewerPhone").value = fixPhoneDataInter(
        allPeople[i].interviewerphone
      );
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
