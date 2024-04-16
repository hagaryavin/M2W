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
var personalMess =document.getElementById("personalMess");
var wannaFixGuestPhone = true;
const url =
  "https://script.google.com/macros/s/AKfycbxiX5x1MR2HEabP2iuekhPxdCrtXfVEa0K3Jj7cVYBt6zJRNPUBhl6Gb_VE7vuplttDrw/exec";
var optionsCrew = document.getElementById("crew");
var crewOption;
var crewList = [];
var currCrew = {};
var newCrewMem;
var messes = [
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] }
];
var fullTexts = [[], [], [], []];
var chosenPersonRow = 0;
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getCrewData();
getData();
const date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var currentDate = day + "." + month;
console.log(currentDate);
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

      for (var i = 1; i <= 4; i++) {
          if (newMess.name.includes("חרוזים אחרונים " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 0; i <= 3; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
            
          cutMess(messes[i].lines, i + 1);
        }
      }
    });
}function cutMess(linesArr, messType) {
  var crewMem;
  if (currCrew.name !== "") crewMem = currCrew.name;
  if (currCrew.name === "") crewMem = "";
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  if(messType===1||messType===3){
  
        removeAllChildNodes(testDiv);
    }
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
      if(messType===1||messType===3){
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
     document.getElementById("sendData").innerHTML="התעדכן";
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
    const temp1 = {
      text: "",
      row: chosenPersonRow,
      col: "mess",
    };
    sendData(temp1, document.getElementById("newInfo"));
    const temp2 = {
      text: (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear(),
      row: chosenPersonRow,
      col: "nextrecdate",
    };
    sendData(temp2, document.getElementById("newInfo")); 
      document.getElementById("quickChange").innerHTML="התעדכן";
  }
}

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
    //chosenRow = 0;
    // document.getElementById("nameOfPerson").innerHTML = "";
    return true;
  }
  var num = 0;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      chosenPhone = radioButton.value;
        document.getElementById("phone").value=radioButton.value;
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

function copy(id) {
    var text = fullTexts[id - 1];
    if(personalMess.value !== ""&&id==='1'){
        text=personalMess.value;
    }
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  alert("הטקסט הועתק!");
}
function whatsAppMes(id) {
  checkOptions();
 var text = fullTexts[id - 1];
 if(personalMess.value !== ""&&id==='1'){
        text=personalMess.value;
    }
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneForWA(chosenPhone) +
    "&text=" +
    encodeURI(text);
  window.open(link, "_blank");
}
function submit() {
    document.getElementById("newInfo").value = currentDate;
     document.getElementById("phone").value="";
  toFixGuestPhone();
  crewChosen();
    document.getElementById("sendData").innerHTML="לשינוי התאריך בו נשלחה ההודעה האחרונה";
    document.getElementById("quickChange").innerHTML="ניקוי שדה ההודעה האחרונה ועדכון תאריך הקלטת החרוז הבא ";
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
