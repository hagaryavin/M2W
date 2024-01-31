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
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = {};
var newCrewMem;
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
        }
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
      });
    });
}
function getMessData() {
  var newMess;
  var messes1 = [];
  var messes2 = [];
  var messes3 = [];
  var messes4 = [];
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

        if (newMess.name.includes("פוסט 1")) {
          messes1.push(newMess);
        }
        if (newMess.name.includes("פוסט 2")) {
          messes2.push(newMess);
        }
        if (newMess.name.includes("הודעה משתנה 1")) {
          messes3.push(newMess);
        }
        if (newMess.name.includes("הודעה משתנה 2")) {
          messes4.push(newMess);
        }
      });
      for (var j = 0; j < messes1.length; j++) {
        cutMess(messes1[j].lines, "one");
      }
      for (var k = 0; k < messes2.length; k++) {
        cutMess(messes2[k].lines, "two");
      }
      for (var l = 0; l < messes3.length; l++) {
        cutMess(messes3[l].lines, "three");
      }
      for (var m = 0; m < messes4.length; m++) {
        cutMess(messes4[m].lines, "four");
      }
    });
}
function cutMess(linesArr, messType) {
  var currText = "";
  var testDiv;
  if (messType === "one") {
    testDiv = document.getElementById("text1");
  }
  if (messType === "two") {
    testDiv = document.getElementById("text2");
  }
  if (messType === "three") {
    testDiv = document.getElementById("text3");
  }
  if (messType === "four") {
    testDiv = document.getElementById("text4");
  }
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
    if (linesArr[i].includes("fullNameOfGuest")) {
      var nameAndChain = document
        .getElementById("peopleList")
        .value.split(" + ");
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", nameAndChain[0]);
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
  if (messType === "one") {
    fullText1 = currText;
  }
  if (messType === "two") {
    fullText2 = currText;
  }
  if (messType === "three") {
    fullText3 = currText;
  }
  if (messType === "four") {
    fullText4 = currText;
  }
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
    checkPhoneInter(document.getElementById("interviewerPhone").value) &&
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
  document.getElementById("nameOfChain").innerHTML =
    document.getElementById("chainName").value;
}
function submit() {
  toFixGuestPhone();
  toFixInterPhone();
  crewChosen();
  document.getElementById("post").style.visibility = "hidden";
  if (checkInputs()) {
    fixChain();
    document.getElementById("post").style.visibility = "visible";
    getMessData();
  }
}
function crewChosen() {
  document.getElementById("sendToCrew").disabled = true;
  if (document.getElementById("crewList").value !== "") {
    document.getElementById("sendToCrew").disabled = false;
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("crewList").value === crewList[j].name) {
        currCrew = crewList[j];
      }
    }
    document.getElementById("crewMem").innerHTML = currCrew.name + ", ";
  } else {
    currCrew.name = "";
    currCrew.phone = "";
    document.getElementById("crewMem").innerHTML = "";
  }
}
function textToCopy(id) {
  var crewMem;
  if (currCrew.name !== "") crewMem = currCrew.name + ", ";
  if (currCrew.name === "") crewMem = "";
  var chainName = document.getElementById("chainName").value;
  var textMes1 = fullText1;
  /*   "היי " +
    guestFirstName +
    ", מצורף פוסט עם הלינקים שלך לסרט הקצר555 ולראיון המלא, לפרסום במעגלי הווטסאפ שלך וברשתות החברתיות. הפרסום שלך מפרסם גם את חבריך! בהצלחה!";
 */ var textMes2 = fullText2;
  /*  "היי " +
    interFirstName +
    ", תודה על שיתוף הפעולה *בסיפור555*. מצורף הפוסט של " +
    guestFirstName +
    ". לשתף, לתייג ולהפיץ, זה שם המשחק!";*/
  var textMes3 = fullText3;
  var textMes4 = fullText4;
  var textMesPost;
  if (chainType === "long") {
    textMesPost =
      " הסיפור של *" +
      fullName +
      "* " +
      title +
      " *שרשרת " +
      chainName +
      "* לסרט *סיפור5:55* דק' " +
      linkFive +
      " צפייה מהנה! לראיון המלא 30 דק' " +
      linkFull;
  }
  if (chainType === "short") {
    textMesPost =
      "הסיפור של *" +
      fullName +
      "* " +
      title +
      " *שרשרת " +
      chainName +
      "* לסרט *סיפור5:55* דק' " +
      linkFive +
      " צפייה מהנה!";
  }
  var textLastMes =
    "תודה, בהצלחה ולהתראות בסיפור הבא! " + crewMem + "צוות *סיפור555*";

  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "mes3") return textMes3;
  if (id === "mes4") return textMes4;
  if (id === "post") return textMesPost;
  if (id === "last") return textLastMes;
  if (id === "tagUs") return "לתיוג הפרויקט בפייסבוק *@סיפור555*";
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
  var crewMem;
  if (currCrew.name !== "") crewMem = encodeURI(currCrew.name) + ", ";
  if (currCrew.name === "") crewMem = "";
  var chainName = document.getElementById("chainName").value;
  var transChainName = encodeURI(chainName);
  var textMes1 = encodeURI(fullText1);
  /*
    "%D7%94%D7%99%D7%99%20" +
    encodeURI(guestFirstName) +
    ",%0A%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%A4%D7%95%D7%A1%D7%98%20%D7%A2%D7%9D%20%D7%94%D7%9C%D7%99%D7%A0%D7%A7%D7%99%D7%9D%20%D7%A9%D7%9C%D7%9A%20%D7%9C%D7%A1%D7%A8%D7%98%20%D7%94%D7%A7%D7%A6%D7%A8555%20%D7%95%D7%9C%D7%A8%D7%90%D7%99%D7%95%D7%9F%20%D7%94%D7%9E%D7%9C%D7%90,%20%D7%9C%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%91%D7%9E%D7%A2%D7%92%D7%9C%D7%99%20%D7%94%D7%95%D7%95%D7%98%D7%A1%D7%90%D7%A4%20%D7%A9%D7%9C%D7%9A%20%D7%95%D7%91%D7%A8%D7%A9%D7%AA%D7%95%D7%AA%20%D7%94%D7%97%D7%91%D7%A8%D7%AA%D7%99%D7%95%D7%AA.%20%D7%94%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%A9%D7%9C%D7%9A%20%D7%9E%D7%A4%D7%A8%D7%A1%D7%9D%20%D7%92%D7%9D%20%D7%90%D7%AA%20%D7%97%D7%91%D7%A8%D7%99%D7%9A!%0A%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94!";
 */ var textMes2 = encodeURI(fullText2); /*
    "%D7%94%D7%99%D7%99%20" +
    encodeURI(interFirstName) +
    ",%0A%D7%AA%D7%95%D7%93%D7%94%20%D7%A2%D7%9C%20%D7%A9%D7%99%D7%AA%D7%95%D7%A3%20%D7%94%D7%A4%D7%A2%D7%95%D7%9C%D7%94%20*%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*.%0A%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%94%D7%A4%D7%95%D7%A1%D7%98%20%D7%A9%D7%9C%20" +
    encodeURI(guestFirstName) +
    ".%0A%D7%9C%D7%A9%D7%AA%D7%A3,%20%D7%9C%D7%AA%D7%99%D7%99%D7%92%20%D7%95%D7%9C%D7%94%D7%A4%D7%99%D7%A5,%20%D7%96%D7%94%20%D7%A9%D7%9D%20%D7%94%D7%9E%D7%A9%D7%97%D7%A7!";
  */
  var textMes3 = encodeURI(fullText3);
  var textMes4 = encodeURI(fullText4);
  var textMesPost;
  if (chainType === "long") {
    textMesPost =
      "%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%A9%D7%9C%20*" +
      encodeURI(fullName) +
      "*%0A" +
      encodeURI(title) +
      "%0A*%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      "*%0A%0A%D7%9C%D7%A1%D7%A8%D7%98%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A85:55*%20%D7%93%D7%A7'%0A" +
      encodeURI(linkFive) +
      "%0A%D7%A6%D7%A4%D7%99%D7%99%D7%94%20%D7%9E%D7%94%D7%A0%D7%94!%0A%0A%D7%9C%D7%A8%D7%90%D7%99%D7%95%D7%9F%20%D7%94%D7%9E%D7%9C%D7%90%2030%20%D7%93%D7%A7'%0A" +
      encodeURI(linkFull);
  }
  if (chainType === "short") {
    textMesPost =
      "%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%A9%D7%9C%20*" +
      encodeURI(fullName) +
      "*%0A" +
      encodeURI(title) +
      "%0A*%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      "*%0A%0A%D7%9C%D7%A1%D7%A8%D7%98%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A85:55*%20%D7%93%D7%A7'%0A" +
      encodeURI(linkFive) +
      "%0A%D7%A6%D7%A4%D7%99%D7%99%D7%94%20%D7%9E%D7%94%D7%A0%D7%94!";
  }
  var textLastMes =
    "%D7%AA%D7%95%D7%93%D7%94,%20%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94%20%D7%95%D7%9C%D7%94%D7%AA%D7%A8%D7%90%D7%95%D7%AA%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90!%0A" +
    crewMem +
    "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*";
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "mes3") return textMes3;
  if (id === "mes4") return textMes4;
  if (id === "postInter" || id === "postGuest" || id === "postCrew")
    return textMesPost;
  if (id === "lastInter" || id === "lastGuest") return textLastMes;
  if (id === "TagUsInter" || id === "TagUsGuest")
    return encodeURI("לתיוג הפרויקט בפייסבוק *@סיפור555*");
  return "";
}
function whatsAppMes(id) {
  var phone = document.getElementById("guestPhone").value;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWAGuest(phone) +
    "&text=" +
    mesForWA(id);
  if (
    id === "mes2" ||
    id === "postInter" ||
    id === "lastInter" ||
    id === "TagUsInter"
  ) {
    phone = document.getElementById("interviewerPhone").value;
    var link =
      "https://api.whatsapp.com/send?phone=" +
      phoneForWAInter(phone) +
      "&text=" +
      mesForWA(id);
  }
  if (id === "postCrew") {
    phone = currCrew.phone;
    var link =
      "https://api.whatsapp.com/send?phone=" +
      phoneForWAInter(phone) +
      "&text=" +
      mesForWA(id);
  }
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
      allPeople[i].guestphone === phoneNum &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    )
      fullName = allPeople[i].interviewername;
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

function submitData() {
  toFixGuestPhone();
  toFixInterPhone();
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
      document.getElementById("interviewerPhone").value = fixPhoneDataInter(
        allPeople[i].interviewerphone
      );
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
      document.getElementById("nameOfChain").innerHTML = fixChainFromData(
        allPeople[i].chain
      );
      console.log(fullName);
      console.log(guestFirstName);
      console.log(interFirstName);
      // document.getElementById("nameOfPerson").innerHTML = " " + guestFirstName;
      //document.getElementById("nameOfPerson4").innerHTML = guestFirstName;
      //document.getElementById("nameOfPerson3").innerHTML = " " + interFirstName;
      document.getElementById("nameOfPerson2").innerHTML = fullName;
      document.getElementById("link555").innerHTML = linkFive;
      document.getElementById("linkFull").innerHTML = linkFull;
      document.getElementById("title").innerHTML = title;

      if (chainType === "long")
        document.getElementById("longPost").style.visibility = "visible";
      if (chainType === "short")
        document.getElementById("longPost").style.visibility = "hidden";
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
