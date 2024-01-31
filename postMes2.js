var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var fullName = "";
var firstName = "";
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = "";
var newCrewMem;
var fullText1 = "";
var fullText2 = "";
var wannaFixGuestPhone = true;
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
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
          name: ele.name,
          phone: ele.phone,
          chain: ele.chain,
          linkfive: ele.linkfive,
          linkshort: ele.linkshort,
          linkshortyt: ele.linkshortyt,
          linkfull: ele.linkfull,
          linkspotify: ele.linkspotify,
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
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

        if (newMess.name.includes("לינקים לתוצרים 1")) {
          messes1.push(newMess);
        }
        if (newMess.name.includes("לינקים לתוצרים 2")) {
          messes2.push(newMess);
        }
      });
      for (var j = 0; j < messes1.length; j++) {
        cutMess(messes1[j].lines, "one");
      }
      for (var k = 0; k < messes2.length; k++) {
        cutMess(messes2[k].lines, "two");
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
  removeAllChildNodes(testDiv);
  var i = 0;
  var firstName2 = firstName;
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace(
        "nameOfChain",
        document.getElementById("chainName").value
      );
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
  //document.getElementById("nameOfChain2").innerHTML = document.getElementById(  "chainName"  ).value;
}
function submit() {
  toFixGuestPhone();
  crewChosen();
  document.getElementById("postMes").style.visibility = "hidden";
  if (checkInputs()) {
    fixChain();
    document.getElementById("postMes").style.visibility = "visible";
    getMessData();
  }
}
function crewChosen() {
  if (document.getElementById("crewList").value !== "") {
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("crewList").value === crewList[j].name) {
        currCrew = crewList[j].name;
      }
    }
    document.getElementById("crewMem").innerHTML = currCrew + ", ";
  } else {
    currCrew = "";
    document.getElementById("crewMem").innerHTML = "";
  }
}
function textToCopy(id) {
  var crewMem;
  if (currCrew !== "") crewMem = currCrew + ", ";
  if (currCrew === "") crewMem = "";
  var chainName = document.getElementById("chainName").value;
  var textMes1 = fullText1;
  /*=
    "היי " +
    firstName +
    ", היה מקסים להכיר אותך. מצורפות ההודעות להמשך השרשרת. יום טוב.";
 */ var textMes2 = fullText2;
  /* "תודה שהצטרפת *לשרשרת " +
    chainName +
    "* בסיפור555. הסיפור שלך מתפרסם בלינקים המצורפים ביוטיוב ובפודקאסט. הנך מוזמנ/ת לפרסם את ההקלטות במדיות החברתיות שלך ולספר על הפרויקט. מצורפים לינקים לפרסום ברשתות שלך. ";
 */ var textLastMes =
    "תודה, בהצלחה ולהתראות בסיפור הבא! " + crewMem + "צוות *סיפור555*";
  var textTagUs = "לתיוג הפרויקט בפייסבוק *@סיפור555*";
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "lastMes") return textLastMes;
  if (id === "tagUsMes") return textTagUs;
  if (id === "link555")
    return (
      "סיפור555 של " +
      fullName +
      " ביוטיוב: \n" +
      document.getElementById("link555").value
    );
  if (id === "short55")
    return (
      "לינק לפרומו 55 שניות להורדה לפרסום ברשתות: \n" +
      document.getElementById("short55").value
    );

  if (id === "short55yt")
    return (
      "לינק לפרומו 55 שניות ביוטיוב: \n" +
      document.getElementById("short55yt").value
    );
  if (id === "full555")
    return (
      "הראיון המלא של " +
      fullName +
      " ביוטיוב: \n" +
      document.getElementById("full555").value
    );
  if (id === "spotify")
    return (
      "לינק לפודקאסט של " +
      fullName +
      " בספוטיפיי: \n" +
      document.getElementById("spotify").value
    );
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
function phoneForWA(phone) {
  if (wannaFixGuestPhone === true) {
    return "972" + phone.slice(1);
  }
  return phone;
}
function mesForWA(id) {
  var crewMem;
  if (currCrew !== "") crewMem = encodeURI(currCrew) + ", ";
  if (currCrew === "") crewMem = "";
  var chainName = document.getElementById("chainName").value;
  var transChainName = encodeURI(chainName);
  var textMes1 = encodeURI(fullText1);
  /*
    "%D7%94%D7%99%D7%99%20" +
    encodeURI(firstName) +
    ",%20%D7%94%D7%99%D7%94%20%D7%9E%D7%A7%D7%A1%D7%99%D7%9D%20%D7%9C%D7%94%D7%9B%D7%99%D7%A8%20%D7%90%D7%95%D7%AA%D7%9A.%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%95%D7%AA%20%D7%94%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA%20%D7%9C%D7%94%D7%9E%D7%A9%D7%9A%20%D7%94%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA.%20%D7%99%D7%95%D7%9D%20%D7%98%D7%95%D7%91.";
 */ var textMes2 = encodeURI(fullText2);
  /*
    "%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%AA%20*%D7%9C%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
    transChainName +
    "*%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8555.%0A%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%A9%D7%9C%D7%9A%20%D7%9E%D7%AA%D7%A4%D7%A8%D7%A1%D7%9D%20%D7%91%D7%9C%D7%99%D7%A0%D7%A7%D7%99%D7%9D%20%D7%94%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%99%D7%9D%20%D7%91%D7%99%D7%95%D7%98%D7%99%D7%95%D7%91%20%D7%95%D7%91%D7%A4%D7%95%D7%93%D7%A7%D7%90%D7%A1%D7%98.%0A%0A%D7%94%D7%A0%D7%9A%20%D7%9E%D7%95%D7%96%D7%9E%D7%A0/%D7%AA%20%D7%9C%D7%A4%D7%A8%D7%A1%D7%9D%20%D7%90%D7%AA%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%95%D7%AA%0A%D7%91%D7%9E%D7%93%D7%99%D7%95%D7%AA%20%D7%94%D7%97%D7%91%D7%A8%D7%AA%D7%99%D7%95%D7%AA%20%D7%A9%D7%9C%D7%9A%20%D7%95%D7%9C%D7%A1%D7%A4%D7%A8%20%D7%A2%D7%9C%20%D7%94%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98.%0A%0A%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%99%D7%9D%20%D7%9C%D7%99%D7%A0%D7%A7%D7%99%D7%9D%20%D7%9C%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%91%D7%A8%D7%A9%D7%AA%D7%95%D7%AA%20%D7%A9%D7%9C%D7%9A.";
 */ var textLastMes =
    "%D7%AA%D7%95%D7%93%D7%94,%20%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94%20%D7%95%D7%9C%D7%94%D7%AA%D7%A8%D7%90%D7%95%D7%AA%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90!%0A" +
    crewMem +
    "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*";
  var textLink555;
  if (document.getElementById("link555").value !== "")
    textLink555 =
      encodeURI("סיפור555 של " + fullName + " ביוטיוב: \n") +
      document.getElementById("link555").value;
  var textShort55;
  if (document.getElementById("short55").value !== "")
    textShort55 =
      encodeURI("לינק לפרומו 55 שניות להורדה לפרסום ברשתות: \n") +
      document.getElementById("short55").value;
  var textShort55yt;
  if (document.getElementById("short55yt").value !== "")
    textShort55yt =
      encodeURI("לינק לפרומו 55 שניות ביוטיוב: \n") +
      document.getElementById("short55yt").value;
  var textFull555;
  if (document.getElementById("full555").value !== "")
    textFull555 =
      encodeURI("הראיון המלא של " + fullName + " ביוטיוב: \n") +
      document.getElementById("full555").value;
  var textSpotify;
  if (document.getElementById("spotify").value !== "")
    textSpotify =
      encodeURI("לינק לפודקאסט של " + fullName + " בספוטיפיי: \n") +
      document.getElementById("spotify").value;
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "lastMes") return textLastMes;
  if (id === "tagUsMes") return encodeURI("לתיוג הפרויקט בפייסבוק *@סיפור555*");
  if (id === "link555" && document.getElementById("link555").value !== "")
    return textLink555;
  if (id === "short55" && document.getElementById("short55").value !== "")
    return textShort55;
  if (id === "short55yt" && document.getElementById("short55yt").value !== "")
    return textShort55yt;
  if (id === "full555" && document.getElementById("full555").value !== "")
    return textFull555;
  if (id === "spotify" && document.getElementById("spotify").value !== "")
    return textSpotify;
  return "";
}
function whatsAppMes(id) {
  var phone = document.getElementById("guestPhone").value;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone) +
    "&text=" +
    mesForWA(id);
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
function fixFirstName(phoneNum) {
  var fullName = "";
  for (var i = 0; i < size; i++) {
    if (allPeople[i].phone === phoneNum) fullName = allPeople[i].name;
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
function submitData() {
  toFixGuestPhone();
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      console.log("row num:" + allPeople[i].row);
      document.getElementById("chainName").value = fixChainFromData(
        allPeople[i].chain
      );
      fullName = allPeople[i].name;
      document.getElementById("guestPhone").value = fixPhoneData(
        allPeople[i].phone
      );
      firstName = fixFirstName(allPeople[i].phone);
      // document.getElementById("nameOfPerson").innerHTML = " " + firstName;
      document.getElementById("link555").value = allPeople[i].linkfive;
      document.getElementById("short55").value = allPeople[i].linkshort;
      document.getElementById("short55yt").value = allPeople[i].linkshortyt;
      document.getElementById("full555").value = allPeople[i].linkfull;
      document.getElementById("spotify").value = allPeople[i].linkspotify;
    }
  }
}
function toFixGuestPhone() {
  if (document.getElementById("fixGuestPhone").checked === true) {
    wannaFixGuestPhone = true;
  } else wannaFixGuestPhone = false;
}
