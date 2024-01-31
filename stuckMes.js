var options = document.getElementById("options");
var peopleOptions = document.getElementById("people0");
var personOption;
var newPerson = {};
var optionDiv;
var optionInput;
var optionLabel;
var chosenPhone;
var allPeople = [];
var fullAllPeople = [];
var size = 0;
var fullSize = 0;
var tableRow = 2;
var chosenRow = 0;
var firstName = "";
var fullTextInvite = "";
var personalMess = document.getElementById("personalMess");
var wannaFixGuestPhone = true;
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = "";
var newCrewMem;
var chosenPersonRow = 0;
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
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
          date: ele.datelastmess,
          phone: ele.phone,
          chain: ele.chain,
          recordingdate: ele.recordingdate,
          row: tableRow,
        };
        tableRow++;
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.recordingdate !== "")
          newPerson.recordingdate = new Date(ele.recordingdate);
        if (ele.fixedrecordingdate !== "")
          newPerson.recordingdate = new Date(ele.fixedrecordingdate); //new Date(ele.fixedrecordingdate);
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (newPerson.date !== "") {
          allPeople.push(newPerson);
          console.log(allPeople[size]);
          optionDiv = document.createElement("div");
          optionDiv.classList.add("form-check");

          //label > div
          optionLabel = document.createElement("label");
          optionLabel.classList.add("form-check-label");
          optionLabel.id = "lab";
          optionLabel.for = newPerson.name;
          if (newPerson.recordingdate !== "") {
            optionLabel.innerHTML =
              fixChainFromData(newPerson.chain) +
              " - " +
              newPerson.recordingdate.getDate() +
              "." +
              (newPerson.recordingdate.getMonth() + 1) +
              " - " +
              newPerson.name +
              " - " +
              newPerson.date;
          }
          if (newPerson.recordingdate === "") {
            optionLabel.innerHTML =
              fixChainFromData(newPerson.chain) +
              " - " +
              newPerson.name +
              " - " +
              newPerson.date;
          }
          optionDiv.append(optionLabel);

          //input > div
          optionInput = document.createElement("input");
          optionInput.classList.add("form-check-input");
          optionInput.type = "radio";
          optionInput.name = "person";
          optionInput.id = newPerson.name;
          optionInput.value = newPerson.phone;
          optionDiv.append(optionInput);
          options.append(optionDiv);
          size++;
        }
        fullAllPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        if (newPerson.name !== "" || newPerson.chain !== "") {
          peopleOptions.append(personOption);
        }
        fullSize++;
      });
    });
}
function getCrewData() {
  fetch(crewDataURL)
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
  fetch(crewDataURL)
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

        if (newMess.name.includes("חרוזים אחרונים 1")) {
          messesInvite.push(newMess);
        }
      });
      for (var j = 0; j < messesInvite.length; j++) {
        cutMess(messesInvite[j].lines);
      }
    });
}
function cutMess(linesArr) {
  var currText = "";
  var testDiv = document.getElementById("inviteText");

  removeAllChildNodes(testDiv);
  var i = 0;
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("firstNameOfGuest", firstName);
    }
    if (linesArr[i].includes("crewName")) {
      linesArr[i] = linesArr[i].replace("crewName", currCrew);
    }

    var testH4 = document.createElement("h4");

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
function submitData() {}

function fixDate(str) {
  const fullDate = str.split("T");
  const splitDate = fullDate[0].split("-");
  var month = splitDate[1];
  var day = splitDate[2];
  return day + "." + month;
}
function changeLastMess() {
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("newInfo").value,
    row: chosenRow,
    col: "mess",
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("newInfo"));
  }
}
function quickChange() {
  for (var i = 0; i < fullAllPeople.length; i++) {
    var nameAndChain = document
      .getElementById("peopleList0")
      .value.split(" + ");

    if (
      fullAllPeople[i].name === nameAndChain[0] &&
      fixChainFromData(fullAllPeople[i].chain) === nameAndChain[1]
    ) {
      console.log(nameAndChain);
      chosenPersonRow = fullAllPeople[i].row;
    }
  }
  if (chosenPersonRow === 0) {
    alert("נא לבחור חרוז");
  }

  if (chosenPersonRow > 0) {
    const temp = {
      text: "",
      row: chosenPersonRow,
      col: "mess",
    };
    sendData(temp, document.getElementById("newInfo"));
  }
}
const date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var currentDate = day + "." + month;
document.getElementById("newInfo").value = currentDate;
console.log(currentDate);
function sendData(obj, ele) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(url, {
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
      ele.innerHTML = json.val;
    });

  alert("בוצע שינוי! ניתן לרענן ולראות את השינוי");
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
  const loader0 = document.getElementById("loader0");
  loader0.style.display = "none";
}, 2050);

function reset() {
  document.location.reload();
}
function checkPhone(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.length === 10 && phone[0] === "0" && phone[1] === "5")
      return true;
    return false;
  }
  if (phone.length < 2) return false;
  return true;
}

function checkOptions() {
  const radioButtons = document.querySelectorAll('input[name="person"]');
  var phone = document.getElementById("phone").value;
  if (checkPhone(phone)) {
    chosenPhone = phone;
    firstName = "";
    chosenRow = 0;
    // document.getElementById("nameOfPerson").innerHTML = "";
    return true;
  }
  var num = 0;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      chosenPhone = radioButton.value;
      chosenRow = allPeople[num].row;
      firstName = fixFirstName(radioButton.value);
      //document.getElementById("nameOfPerson").innerHTML = " " + firstName;

      return true;
    }
    num++;
  }
  alert("ייתכן שמספר הטלפון אינו תקין!");
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
function phoneForWA(phone) {
  if (wannaFixGuestPhone === true) {
    if (phone.includes("-")) {
      phone = phone.replace("-", "");
    }
    if (phone.includes(" ")) {
      phone = phone.replace(" ", "");
    }
    return "972" + phone.slice(1);
  }
  return phone;
}
function textToCopy(id) {
  var crewMem;
  if (currCrew !== "") crewMem = currCrew + ", ";
  if (currCrew === "") crewMem = "";
  var textStuck1 = fullTextInvite; /*
    "היי " +
    firstName +
    ", נשמח מאד לעזור לך לקדם את הסיפור הבא *בשרשרת שלך*. ולתאם הקלטה לשבוע הקרוב. מצורף לוח ההקלטות לבחירת המועד המתאים. " +
    crewMem +
    "צוות *סיפור555*";*/
  if (personalMess.value !== "") {
    textStuck1 = personalMess.value;
  }
  var textStuck2 =
    "מומלץ לשלוח את ההזמנה עם תיאור הפרויקט לאורח/ת הבא/ה שלך. (מצורף לינק להזמנה)";
  var textInvite = "https://tinyurl.com/story555invite";
  var textCalender = "https://bit.ly/story555Calendar";
  if (id === "textStuck1") return textStuck1;
  if (id === "textStuck2") return textStuck2;
  if (id === "invite") return textInvite;
  if (id === "calender") return textCalender;
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
function mesForWA(id) {
  var crewMem;
  if (currCrew !== "") crewMem = encodeURI(currCrew) + ", ";
  if (currCrew === "") crewMem = "";
  var textStuck1 = encodeURI(fullTextInvite); /*
    "%D7%94%D7%99%D7%99%20" +
    encodeURI(firstName) +
    ",%20%D7%A0%D7%A9%D7%9E%D7%97%20%D7%9E%D7%90%D7%93%20%D7%9C%D7%A2%D7%96%D7%95%D7%A8%20%D7%9C%D7%9A%20%D7%9C%D7%A7%D7%93%D7%9D%0A%D7%90%D7%AA%20%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90%20*%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20%D7%A9%D7%9C%D7%9A*.%0A%D7%95%D7%9C%D7%AA%D7%90%D7%9D%20%D7%94%D7%A7%D7%9C%D7%98%D7%94%20%D7%9C%D7%A9%D7%91%D7%95%D7%A2%20%D7%94%D7%A7%D7%A8%D7%95%D7%91.%0A%0A%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%9C%D7%95%D7%97%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%95%D7%AA%20%D7%9C%D7%91%D7%97%D7%99%D7%A8%D7%AA%20%D7%94%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%9E%D7%AA%D7%90%D7%99%D7%9D.%0A" +
    crewMem +
    "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*";*/
  if (personalMess.value !== "") {
    textStuck1 = encodeURI(personalMess.value);
  }
  var textStuck2 =
    "%D7%9E%D7%95%D7%9E%D7%9C%D7%A5%20%D7%9C%D7%A9%D7%9C%D7%95%D7%97%20%D7%90%D7%AA%20%D7%94%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%A2%D7%9D%20%D7%AA%D7%99%D7%90%D7%95%D7%A8%20%D7%94%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%0A%D7%9C%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%94%D7%91%D7%90/%D7%94%20%D7%A9%D7%9C%D7%9A.%20(%D7%9E%D7%A6%D7%95%D7%A8%D7%A3%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%94%D7%96%D7%9E%D7%A0%D7%94)";

  var textInvite = "https://tinyurl.com/story555invite";
  var textCalender = "https://bit.ly/story555Calendar";
  if (id === "textStuck1") return textStuck1;
  if (id === "textStuck2") return textStuck2;
  if (id === "invite") return textInvite;
  if (id === "calender") return textCalender;
  return "";
}
function whatsAppMes(id) {
  checkOptions();
  var phone = chosenPhone;
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(phone) +
    "&text=" +
    mesForWA(id);
  window.open(link, "_blank");
}
function submit() {
  toFixGuestPhone();
  crewChosen();
  document.getElementById("stuckMes").style.visibility = "hidden";
  if (checkOptions()) {
    console.log("phone corect");
    document.getElementById("stuckMes").style.visibility = "visible";
    getMessData();
  } else console.log("phone incorect");
}
function crewChosen() {
  if (document.getElementById("crewList").value !== "") {
    for (var j = 0; j < crewList.length; j++) {
      if (document.getElementById("crewList").value === crewList[j].name) {
        currCrew = crewList[j].name;
      }
    }
    // document.getElementById("crewMem").innerHTML = currCrew + ", ";
  } else {
    currCrew = "";
    //  document.getElementById("crewMem").innerHTML = "";
  }
}
function toFixGuestPhone() {
  if (document.getElementById("fixGuestPhone").checked === true) {
    wannaFixGuestPhone = true;
  } else wannaFixGuestPhone = false;
}
