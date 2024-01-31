var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
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
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
var newPerson = {};
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
          row: rowCount,
          email: ele.email,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value = newPerson.name;
        personOption.id = rowCount;
        options.append(personOption);
        rowCount++;
        size++;
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
  var messes1 = [];
  var messes2 = [];
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

        if (newMess.name.includes("הזמנה לווטסאפ חרוזים 1")) {
          messes1.push(newMess);
        }
        if (newMess.name.includes("הזמנה לווטסאפ חרוזים 2")) {
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
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("firstNameOfGuest", firstName2);
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      linesArr[i] = linesArr[i].replace(
        "fullNameOfGuest",
        document.getElementById("peopleList").value
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
function checkInputs() {
  if (checkPhone(document.getElementById("guestPhone").value)) {
    return true;
  }
  alert("ייתכן שמספר הטלפון אינו תקין!");
  return false;
}
function submit() {
  toFixGuestPhone();
  crewChosen();
  document.getElementById("afterMes").style.visibility = "hidden";
  if (checkInputs()) {
    document.getElementById("afterMes").style.visibility = "visible";
    getMessData();
  }
}
function textToCopy(id) {
  var crewMem;
  if (currCrew !== "") crewMem = currCrew + ", ";
  if (currCrew === "") crewMem = "";
  var textMes1 = fullText1; /*=
    "היי " +
    firstName +
    ", צוות *סיפור555* שמח לצרף אותך לקבוצת *החרוזים* המשתתפים בפרויקט. אלה הודעות הפתיחה של הקבוצה --->";*/
  var textMes2 = fullText2;
  /*
    "*סיפור555* שלך הוקלט ומפורסם ברשתות החברתיות, יוטיוב, פייסבוק, אינסטגרם וספוטיפיי. המיזם הוא מיזם חברתי, חדשני וטכנולוגי המבוסס על סיפורי החיים שלנו! לכל אחד/ת סיפור וכל סיפור משפיע. יצרנו קבוצה שקטה זו, של כל המשתתפים/ות, כדי לייצר תנועה של שיתוף, קידום ופרסום הפרויקט. כדי לקדם ולהפיץ את הפרויקט נפרסם בקבוצה זו כ-3 סרטים בכל שבוע בבקשה - לשתף, לתייג ובמיוחד - *להירשם* לערוץ היוטיוב (לינק מצורף). אתם/ן השותפים/ות שלנו לדרך. נמשיך להתגלגל, כולנו חרוזים בשרשרת.";
 */ var textMes3 =
    "*לינק* רישום לערוץ היוטיוב -\nלתמיכה בפרויקט החברתי\n*סיפור555*\nתכנית שידור ראיונות בשרשרת\nhttps://tinyurl.com/story555subscribe";
  var textMes5 =
    "*חדשות555* - לצפייה בהודעות הקודמות https://tinyurl.com/story555news";
  var textLastMes =
    "תודה, בהצלחה ולהתראות בסיפור הבא! " + crewMem + "צוות *סיפור555*";
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "mes3") return textMes3;
  if (id === "mes4")
    return "לינק לעץ השרשראות של *סיפור555*\nhttps://www.youtube.com/@5story55/playlists";
  if (id === "mes5") return textMes5;
  if (id === "lastMes") return textLastMes;
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
function email(id) {
  var text = textToCopy(id);
  var currEmail;
  for (var i = 0; i < allPeople.length; i++) {
    if (allPeople[i].name === document.getElementById("peopleList").value) {
      currEmail = allPeople[i].email;
    }
  }
  console.log(text);
  var link =
    "https://mail.google.com/mail/?view=cm&to=" +
    currEmail +
    "&su=" +
    encodeURIComponent("הזמנה לוואטסאפ חרוזים") +
    "&body=" +
    encodeURIComponent(text);
  window.open(link, "_blank");
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
  var textMes1 = encodeURI(fullText1);
  /*  "%D7%94%D7%99%20" +
    encodeURI(firstName) +
    ",%0A%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%20%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A6%D7%A8%D7%A3%20%D7%90%D7%95%D7%AA%D7%9A%20%D7%9C%D7%A7%D7%91%D7%95%D7%A6%D7%AA%20*%D7%94%D7%97%D7%A8%D7%95%D7%96%D7%99%D7%9D*%20%D7%94%D7%9E%D7%A9%D7%AA%D7%AA%D7%A4%D7%99%D7%9D%20%D7%91%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98.%0A%D7%90%D7%9C%D7%94%20%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA%20%D7%94%D7%A4%D7%AA%D7%99%D7%97%D7%94%20%D7%A9%D7%9C%20%D7%94%D7%A7%D7%91%D7%95%D7%A6%D7%94%20---%3E";
  */ var textMes2 = encodeURI(fullText2);
  /*
    "*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%20%D7%A9%D7%9C%D7%9A%20%D7%94%D7%95%D7%A7%D7%9C%D7%98%20%D7%95%D7%9E%D7%A4%D7%95%D7%A8%D7%A1%D7%9D%20%D7%91%D7%A8%D7%A9%D7%AA%D7%95%D7%AA%20%D7%94%D7%97%D7%91%D7%A8%D7%AA%D7%99%D7%95%D7%AA,%0A%D7%99%D7%95%D7%98%D7%99%D7%95%D7%91,%20%D7%A4%D7%99%D7%99%D7%A1%D7%91%D7%95%D7%A7,%20%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%92%D7%A8%D7%9D%20%D7%95%D7%A1%D7%A4%D7%95%D7%98%D7%99%D7%A4%D7%99%D7%99.%0A%0A%D7%94%D7%9E%D7%99%D7%96%D7%9D%20%D7%94%D7%95%D7%90%20%D7%9E%D7%99%D7%96%D7%9D%20%D7%97%D7%91%D7%A8%D7%AA%D7%99,%20%D7%97%D7%93%D7%A9%D7%A0%D7%99%20%D7%95%D7%98%D7%9B%D7%A0%D7%95%D7%9C%D7%95%D7%92%D7%99%0A%D7%94%D7%9E%D7%91%D7%95%D7%A1%D7%A1%20%D7%A2%D7%9C%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8%D7%99%20%D7%94%D7%97%D7%99%D7%99%D7%9D%20%D7%A9%D7%9C%D7%A0%D7%95!%0A%D7%9C%D7%9B%D7%9C%20%D7%90%D7%97%D7%93/%D7%AA%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%95%D7%9B%D7%9C%20%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%9E%D7%A9%D7%A4%D7%99%D7%A2.%0A%0A%D7%99%D7%A6%D7%A8%D7%A0%D7%95%20%D7%A7%D7%91%D7%95%D7%A6%D7%94%20%D7%A9%D7%A7%D7%98%D7%94%20%D7%96%D7%95,%20%D7%A9%D7%9C%20%D7%9B%D7%9C%20%D7%94%D7%9E%D7%A9%D7%AA%D7%AA%D7%A4%D7%99%D7%9D/%D7%95%D7%AA,%0A%D7%9B%D7%93%D7%99%20%D7%9C%D7%99%D7%99%D7%A6%D7%A8%20%D7%AA%D7%A0%D7%95%D7%A2%D7%94%20%D7%A9%D7%9C%20%D7%A9%D7%99%D7%AA%D7%95%D7%A3,%20%D7%A7%D7%99%D7%93%D7%95%D7%9D%20%D7%95%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%94%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98.%0A%0A%D7%9B%D7%93%D7%99%20%D7%9C%D7%A7%D7%93%D7%9D%20%D7%95%D7%9C%D7%94%D7%A4%D7%99%D7%A5%20%D7%90%D7%AA%20%D7%94%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%0A%D7%A0%D7%A4%D7%A8%D7%A1%D7%9D%20%D7%91%D7%A7%D7%91%D7%95%D7%A6%D7%94%20%D7%96%D7%95%20%D7%9B-3%20%D7%A1%D7%A8%D7%98%D7%99%D7%9D%20%D7%91%D7%9B%D7%9C%20%D7%A9%D7%91%D7%95%D7%A2%0A%D7%91%D7%91%D7%A7%D7%A9%D7%94%20-%20%D7%9C%D7%A9%D7%AA%D7%A3,%20%D7%9C%D7%AA%D7%99%D7%99%D7%92%20%D7%95%D7%91%D7%9E%D7%99%D7%95%D7%97%D7%93%20-%20*%D7%9C%D7%94%D7%99%D7%A8%D7%A9%D7%9D*%0A%D7%9C%D7%A2%D7%A8%D7%95%D7%A5%20%D7%94%D7%99%D7%95%D7%98%D7%99%D7%95%D7%91%20(%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A3).%0A%D7%90%D7%AA%D7%9D/%D7%9F%20%D7%94%D7%A9%D7%95%D7%AA%D7%A4%D7%99%D7%9D/%D7%95%D7%AA%20%D7%A9%D7%9C%D7%A0%D7%95%20%D7%9C%D7%93%D7%A8%D7%9A.%0A%0A%D7%A0%D7%9E%D7%A9%D7%99%D7%9A%20%D7%9C%D7%94%D7%AA%D7%92%D7%9C%D7%92%D7%9C,%20%D7%9B%D7%95%D7%9C%D7%A0%D7%95%20%D7%97%D7%A8%D7%95%D7%96%D7%99%D7%9D%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA.";
 */ var textMes3 =
    "*%D7%9C%D7%99%D7%A0%D7%A7*%20%D7%A8%D7%99%D7%A9%D7%95%D7%9D%20%D7%9C%D7%A2%D7%A8%D7%95%D7%A5%20%D7%94%D7%99%D7%95%D7%98%D7%99%D7%95%D7%91%20-%0A%D7%9C%D7%AA%D7%9E%D7%99%D7%9B%D7%94%20%D7%91%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%94%D7%97%D7%91%D7%A8%D7%AA%D7%99%0A*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*%0A%D7%AA%D7%9B%D7%A0%D7%99%D7%AA%20%D7%A9%D7%99%D7%93%D7%95%D7%A8%20%D7%A8%D7%90%D7%99%D7%95%D7%A0%D7%95%D7%AA%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%0Ahttps://tinyurl.com/story555subscribe";
  var textMes5 =
    "*%D7%97%D7%93%D7%A9%D7%95%D7%AA555*%20-%20%D7%9C%D7%A6%D7%A4%D7%99%D7%99%D7%94%20%D7%91%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA%20%D7%94%D7%A7%D7%95%D7%93%D7%9E%D7%95%D7%AA%20%0Ahttps://tinyurl.com/story555news";
  var textLastMes =
    "%D7%AA%D7%95%D7%93%D7%94,%20%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94%20%D7%95%D7%9C%D7%94%D7%AA%D7%A8%D7%90%D7%95%D7%AA%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90!%0A" +
    crewMem +
    "%D7%A6%D7%95%D7%95%D7%AA%20*%D7%A1%D7%99%D7%A4%D7%95%D7%A8555*";
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "mes3") return textMes3;
  if (id === "mes4")
    return encodeURI(
      "לינק לעץ השרשראות של *סיפור555*\nhttps://www.youtube.com/@5story55/playlists"
    );
  if (id === "mes5") return textMes5;
  if (id === "lastMes") return textLastMes;
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
  document.getElementById("guestPhone").value = "";
  toFixGuestPhone();
  for (var i = 0; i < allPeople.length; i++) {
    if (allPeople[i].name === document.getElementById("peopleList").value) {
      console.log("row num:" + allPeople[i].row);
      document.getElementById("guestPhone").value = fixPhoneData(
        allPeople[i].phone
      );
      firstName = fixFirstName(allPeople[i].phone);
      //document.getElementById("nameOfPerson").innerHTML = " " + firstName;
    }
  }
}
function toFixGuestPhone() {
  if (document.getElementById("fixGuestPhone").checked === true) {
    wannaFixGuestPhone = true;
  } else wannaFixGuestPhone = false;
}
