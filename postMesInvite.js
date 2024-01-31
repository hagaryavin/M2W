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
var currCrew = "";
var newCrewMem;
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

        if (newMess.name.includes("לינקים להזמנת אורח 1")) {
          messesInvite.push(newMess);
        }
      });
      for (var j = 0; j < messesInvite.length; j++) {
        cutMess(messesInvite[j].lines, chainType);
      }
    });
}
function cutMess(linesArr, messType, who) {
  var currText = "";
  var testDiv = document.getElementById("inviteText");
  removeAllChildNodes(testDiv);
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
      testDiv.append(testH4);
    }
    i++;
  }

  fullTextInvite = currText;
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
  var chainDesc = currChain.description;
  var textMes = fullTextInvite;
  /* if (chainType === "long") {
    textMes =
      "היי " +
      firstName +
      ", תודה שהצטרפת *לשרשרת " +
      chainName +
      "* בסיפור555. עכשיו תורך להזמין את האורח/ת הבאה. -" +
      chainDesc +
      " -לקבל אישור על בחירתך מהמראיינ/ת שלך. -לשלוח את ההזמנה וטופס הרישום לאורח/ת שלך. -לבחור את מועד ההקלטה דרך הלינק המצורף. -להיות המראיינ/ת של האורח/ת שלך בהקלטת הסיפור הבא בשרשרת. מצורפים: לינק להזמנה, לינק ללוח ההקלטות, לינק לטופס הרישום, לינק לפלייליסט של השרשרת שלך.";
  }
  if (chainType === "short") {
    textMes =
      "היי " +
      firstName +
      ", תודה שהצטרפת *לשרשרת " +
      chainName +
      "* בסיפור555. עכשיו תורך להזמין את האורח/ת הבאה. -" +
      chainDesc +
      " -לקבל אישור על בחירתך מהמראיינ/ת שלך. -לשלוח את ההזמנה וטופס הרישום לאורח/ת שלך. מצורפים: לינק להזמנה, לינק ללוח ההקלטות, לינק לטופס הרישום, לינק לפלייליסט של השרשרת שלך.";
  }*/
  var textLastMes =
    "תודה, בהצלחה ולהתראות בסיפור הבא! " + crewMem + "צוות *סיפור555*";
  var textInvite = "https://tinyurl.com/story555invite";
  var textCalender = "https://bit.ly/story555Calendar";
  var textRegister = "לינק לטופס הרישום: https://tinyurl.com/story555sign";
  var textChain =
    "לינק לפלייליסט של השרשרת\n*שרשרת " +
    chainName +
    "*:\n" +
    currChain.playlist;
  if (id === "mes") return textMes;
  if (id === "lastMes") return textLastMes;
  if (id === "invite") return textInvite;
  if (id === "calender") return textCalender;
  if (id === "register") return textRegister;
  if (id === "chain") return textChain;
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
  var chainDesc = currChain.description;
  var transChainName = encodeURI(chainName);
  var transChainDesc = encodeURI(chainDesc);
  var textMes = encodeURI(fullTextInvite);
  /*  if (chainType === "long") {
    textMes =
      "%D7%94%D7%99%20" +
      encodeURI(firstName) +
      ",%0A%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%AA%20*%D7%9C%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      "*%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8555.%0A%D7%A2%D7%9B%D7%A9%D7%99%D7%95%20%D7%AA%D7%95%D7%A8%D7%9A%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%90%D7%AA%20%D7%94%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%94%D7%91%D7%90%D7%94.%0A%0A-" +
      transChainDesc +
      "%0A-%D7%9C%D7%A7%D7%91%D7%9C%20%D7%90%D7%99%D7%A9%D7%95%D7%A8%20%D7%A2%D7%9C%20%D7%91%D7%97%D7%99%D7%A8%D7%AA%D7%9A%20%D7%9E%D7%94%D7%9E%D7%A8%D7%90%D7%99%D7%99%D7%A0/%D7%AA%20%D7%A9%D7%9C%D7%9A.%0A-%D7%9C%D7%A9%D7%9C%D7%95%D7%97%20%D7%90%D7%AA%20%D7%94%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%95%D7%98%D7%95%D7%A4%D7%A1%20%D7%94%D7%A8%D7%99%D7%A9%D7%95%D7%9D%20%D7%9C%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%A9%D7%9C%D7%9A.%0A-%D7%9C%D7%91%D7%97%D7%95%D7%A8%20%D7%90%D7%AA%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%94%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%9C%D7%99%D7%A0%D7%A7%20%D7%94%D7%9E%D7%A6%D7%95%D7%A8%D7%A3.%0A-%D7%9C%D7%94%D7%99%D7%95%D7%AA%20%D7%94%D7%9E%D7%A8%D7%90%D7%99%D7%99%D7%A0/%D7%AA%20%D7%A9%D7%9C%20%D7%94%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%A9%D7%9C%D7%9A%20%D7%91%D7%94%D7%A7%D7%9C%D7%98%D7%AA%20%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA.%0A%0A%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%99%D7%9D:%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%94%D7%96%D7%9E%D7%A0%D7%94,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%9C%D7%95%D7%97%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%95%D7%AA,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%98%D7%95%D7%A4%D7%A1%20%D7%94%D7%A8%D7%99%D7%A9%D7%95%D7%9D,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%A4%D7%9C%D7%99%D7%99%D7%9C%D7%99%D7%A1%D7%98%20%D7%A9%D7%9C%20%D7%94%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20%D7%A9%D7%9C%D7%9A.";
  }
  if (chainType === "short") {
    textMes =
      "%D7%94%D7%99%20" +
      encodeURI(firstName) +
      ",%0A%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%AA%20*%D7%9C%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
      transChainName +
      "*%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8555.%0A%D7%A2%D7%9B%D7%A9%D7%99%D7%95%20%D7%AA%D7%95%D7%A8%D7%9A%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%90%D7%AA%20%D7%94%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%94%D7%91%D7%90%D7%94.%0A%0A-" +
      transChainDesc +
      "%0A-%D7%9C%D7%A7%D7%91%D7%9C%20%D7%90%D7%99%D7%A9%D7%95%D7%A8%20%D7%A2%D7%9C%20%D7%91%D7%97%D7%99%D7%A8%D7%AA%D7%9A%20%D7%9E%D7%94%D7%9E%D7%A8%D7%90%D7%99%D7%99%D7%A0/%D7%AA%20%D7%A9%D7%9C%D7%9A.%0A-%D7%9C%D7%A9%D7%9C%D7%95%D7%97%20%D7%90%D7%AA%20%D7%94%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%95%D7%98%D7%95%D7%A4%D7%A1%20%D7%94%D7%A8%D7%99%D7%A9%D7%95%D7%9D%20%D7%9C%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%A9%D7%9C%D7%9A.%0A%0A%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%99%D7%9D:%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%94%D7%96%D7%9E%D7%A0%D7%94,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%9C%D7%95%D7%97%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%95%D7%AA,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%98%D7%95%D7%A4%D7%A1%20%D7%94%D7%A8%D7%99%D7%A9%D7%95%D7%9D,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%A4%D7%9C%D7%99%D7%99%D7%9C%D7%99%D7%A1%D7%98%20%D7%A9%D7%9C%20%D7%94%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20%D7%A9%D7%9C%D7%9A.";
  }*/
  var textLastMes =
    "%D7%AA%D7%95%D7%93%D7%94,%20%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94%20%D7%95%D7%9C%D7%94%D7%AA%D7%A8%D7%90%D7%95%D7%AA%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90!%0A" +
    crewMem +
    "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*";
  var textInvite = "https://tinyurl.com/story555invite";
  var textCalender = "https://bit.ly/story555Calendar";
  var textRegister =
    encodeURI("לינק לטופס הרישום: ") + "https://tinyurl.com/story555sign";
  var textChain =
    encodeURI(
      "לינק לפלייליסט של השרשרת\n*שרשרת " +
        document.getElementById("chainName").value +
        "*:\n"
    ) + currChain.playlist;
  if (id === "mes") return textMes;
  if (id === "lastMes") return textLastMes;
  if (id === "invite") return textInvite;
  if (id === "calender") return textCalender;
  if (id === "register") return textRegister;
  if (id === "chain") return textChain;
  return "";
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
    splittedName[0] === "Dr."
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
