var options = document.getElementById("optionsNominees");
var personOption;
var newPerson = {};
var optionDiv;
var optionInput;
var optionLabel;
var allPeople = [];
var size = 0;
var tableRow = 2;
var chosenRow = '0';
var chosenPerson={};
var allChains = [];
var newChain = {};
const date = changeTimeZone(new Date(), 'Asia/Jerusalem');
var day = date.getDate();
var month = date.getMonth() + 1;
var currentDate = day + "." + month;
console.log(currentDate);
var messes = [
  { name: "", lines: [] }
];
var fullTexts = [[]];
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbye8Aq8q9R5EHO6_S1pwc71ogwBCt2XSYe5TVBbodwwuGc2ypMLBAvKi2IH749aP-Y78g/exec";
const url =
  "https://script.google.com/macros/s/AKfycbxnsjzfmV9XVUZnm_NEf6VG6vxJaT39LWue0eCy6xFzUD53wBXIi_eRYdyxkoE0BU1qMQ/exec";
getData();
getMessData();
function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
        formsent:ele.formsent,
            name:ele.name,	
            chain:ele.chain,	
            phone:ele.phone,
            email:ele.email,
            invitername:ele.invitername,	
            inviterphone:ele.inviterphone,
            title:ele.title,
            plot:ele.plot,
            datelastmess:ele.datelastmess,
            notnominee:ele.notnominee,
            row: tableRow,
        };
        tableRow++;
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        if (ele.fixedinvitername !== "") newPerson.invitername = ele.fixedinvitername;
        if (ele.fixedinviterphone !== "") newPerson.inviterphone = ele.fixedinviterphone;
        if (ele.fixedtitle !== "") newPerson.title = ele.fixedtitle;
        if (ele.fixedplot !== "") newPerson.plot = ele.fixedplot;  
          if (ele.fixeddatelastmess !== "") newPerson.datelastmess = ele.fixeddatelastmess;
          allPeople.push(newPerson);
          console.log(allPeople[size]);
          if(newPerson.notnominee===""){
              optionDiv = document.createElement("div");
              optionDiv.classList.add("form-check");
              optionLabel = document.createElement("label");
              optionLabel.classList.add("form-check-label");
              optionLabel.id = "lab";
              optionLabel.for = newPerson.name;
                optionLabel.innerHTML =
                  newPerson.chain +
                  " - " +
                  newPerson.name +
                  " - " +
                  newPerson.datelastmess;
              optionDiv.append(optionLabel);

              //input > div
              optionInput = document.createElement("input");
              optionInput.classList.add("form-check-input");
              optionInput.type = "radio";
              optionInput.name = "person";
              optionInput.id = newPerson.name;
              optionInput.value = newPerson.row;
              optionDiv.append(optionInput);
              options.append(optionDiv);
          }
          size++;        
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

       for (var i = 1; i <= 1; i++) {
          if (newMess.name.includes("מועמדות " + i)) {
            messes[i - 1] = newMess;
          }
        }
      });
      for (var i = 0; i <= 0; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
            
          cutMess(messes[i].lines, i + 1);
        }
      }
    });
}
function cutMess(linesArr, messType) {
  var currText = "";
//  var testDiv = document.getElementById("text" + messType);
  //removeAllChildNodes(testDiv);
  var i = 0;
  while (linesArr[i] !== "end") {
    
    if (linesArr[i].includes("date")) {
      linesArr[i] = linesArr[i].replace("date", currentDate);
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
     // testDiv.append(testH4);
    }
    document.getElementById("datelastmess").value =currText;
    document.getElementById("datelastmessNew").value =currText;
    i++;
  }
 fullTexts[messType - 1] = currText;
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
function add() { 
    const dataObj = { name: document.getElementById("nameNew").value, 
                     chain: document.getElementById("chainNew").value, 
                     phone: document.getElementById("phoneNew").value, 
                     email: document.getElementById("emailNew").value, 
                     invitername: document.getElementById("inviternameNew").value, 
                     inviterphone: document.getElementById("inviterphoneNew").value, 
                     title: document.getElementById("titleNew").value, 
                     plot: document.getElementById("plotNew").value, 
                     datelastmess: document.getElementById("datelastmessNew").value
                    }; 
    var dataElement=document.getElementById("add");
    sendData(dataObj,dataElement); 
    alert("המועמד נוסף לרשימה, נא לרענן את הדף לצפייה ברשימה המעודכנת");
}
function submit(){
    clearValues();
    const radioButtons = document.querySelectorAll('input[name="person"]');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            chosenRow = radioButton.value;
            document.getElementById("nomineesMes").style.visibility = "visible";
        }
    }
    if(chosenRow!=='0'){
        for(var i=0;i<allPeople.length;i++){
            if(allPeople[i].row==chosenRow){
             document.getElementById("nameB4").innerHTML = allPeople[i].name;
             document.getElementById("nameB4also").innerHTML = allPeople[i].name; document.getElementById("chainB4").innerHTML = allPeople[i].chain;
                document.getElementById("phoneB4").innerHTML = allPeople[i].phone;
                document.getElementById("emailB4").innerHTML = allPeople[i].email;
                document.getElementById("inviternameB4").innerHTML = allPeople[i].invitername;
                document.getElementById("inviterphoneB4").innerHTML = allPeople[i].inviterphone;
                document.getElementById("titleB4").innerHTML = allPeople[i].title;
                document.getElementById("plotB4").innerHTML = allPeople[i].plot;
                document.getElementById("datelastmessB4").innerHTML = allPeople[i].datelastmess;
               
                
            }
        }
    }
    else{
        alert("נא לבחור חרוז");
    }
     
}
function newNomineeDisplaySwitch(){
     const nomineesNew = document.getElementById('nomineesNew');
    if(nomineesNew.style.display =='none'){
        nomineesNew.style.display ='block';
        document.getElementById("newNomineeDisplay").innerHTML="להסתרת טופס מועמד חדש";
    }
    else{
        nomineesNew.style.display ='none';
        document.getElementById("newNomineeDisplay").innerHTML="להצגת טופס מועמד חדש";
    }
}
function change(id){
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
    console.log("col: "+chosenCol);
    if (chosenRow === 0) {
        alert("נא לבחור מישהו מהטבלה כדי לשנות");
    }
    var textValue="v";
    if(id!=="notnominee"){
        textValue=document.getElementById(id).value;
    }
    const temp = {
        text: textValue,
        row: chosenRow,
        col: chosenCol,
    };
    if (chosenRow > 0) {
        sendData(temp, dataElement);
        dataElement.innerHTML="התעדכן";
    }
}

function clearValues() {
    document.getElementById("name").value = "";
             document.getElementById("chain").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("email").value= "";
                document.getElementById("invitername").value = "";
                document.getElementById("inviterphone").value = "";
                document.getElementById("title").value = "";
                document.getElementById("plot").value = "";
                document.getElementById("datelastmess").value= ""; 
    document.getElementById("nameChange").innerHTML = "תיקון שם";
    document.getElementById("chainChange").innerHTML = "תיקון שרשרת";
                document.getElementById("phoneChange").innerHTML = "תיקון טלפון";
                document.getElementById("emailChange").innerHTML= "תיקון כתובת מייל";
                document.getElementById("inviternameChange").innerHTML = "תיקון שם מזמין";
                document.getElementById("inviterphoneChange").innerHTML = "תיקון טלפון מזמין";
                document.getElementById("titleChange").innerHTML = "תיקון כותרת";
                document.getElementById("plotChange").innerHTML = "תיקון תוכן";
                document.getElementById("datelastmessChange").innerHTML= "תיקון הודעה";
                document.getElementById("notnomineeChange").innerHTML= "להוציא את החרוז מרשימת המועמדים";
    
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
    });
}
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
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
        document.getElementById("toNewChain").innerHTML="עדכון שרשרת/קהילה";
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
        document.getElementById("toNewChain").innerHTML="Eng עדכון שרשרת";
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