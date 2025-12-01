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
const url =
  "https://script.google.com/macros/s/AKfycbwWILJP6cHmRK5ITFE82-QwV7ysCqBnj4b60yn5Uu5L55et2XdDIa7TJGVa-lIreLEp8w/exec";
getData();
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

setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
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