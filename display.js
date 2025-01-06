var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var currPerson = {};
var copyBtns=document.getElementsByClassName("copycat");
var size = 0;
var ChosenCol=0;
const date = changeTimeZone(new Date(), 'Asia/Jerusalem');
var day = date.getDate();
var month = date.getMonth() + 1;
document.getElementById("clip1date").value= day + "." + month;
document.getElementById("clip2date").value= day + "." + month;
document.getElementById("clip3date").value= day + "." + month;
document.getElementById("clip4date").value= day + "." + month;
document.getElementById("clip5date").value= day + "." + month;
document.getElementById("clip6date").value= day + "." + month;
const url =
  "https://script.google.com/macros/s/AKfycbyt__ZpRfNw8yd8Iwy10ZeVvM9QJ3dDEXbraolOWkmYLZqfD5cPa2P_YP16DUh3eVBQDQ/exec";
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
          chain: ele.chain,
          link555: ele.linkfive,
          link55yt: ele.linkshortyt,
          linkfull: ele.linkfull,
          email: ele.email,
          order: ele.order,
          feedback:ele.feedback,
          clip1: ele.clip1,
          clip2: ele.clip2,
            clip3: ele.clip3,
          clip4: ele.clip4,
            clip5: ele.clip5,
          clip6: ele.clip6,
            clip1date:ele.clip1date,
            clip2date:ele.clip2date,
            clip3date:ele.clip3date,
            clip4date:ele.clip4date,
            clip5date:ele.clip5date,
            clip6date:ele.clip6date,
            outofmeta:ele.outofmeta
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;

        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        if (ele.clip1date !== "")
          newPerson.clip1date = changeTimeZone(new Date(ele.clip1date), 'Asia/Jerusalem');
        if (ele.clip2date !== "")
          newPerson.clip2date = changeTimeZone(new Date(ele.clip2date), 'Asia/Jerusalem');
        if (ele.clip3date !== "")
          newPerson.clip3date = changeTimeZone(new Date(ele.clip3date), 'Asia/Jerusalem');
        if (ele.clip4date !== "")
          newPerson.clip4date = changeTimeZone(new Date(ele.clip4date), 'Asia/Jerusalem');
        if (ele.clip5date !== "")
          newPerson.clip5date = changeTimeZone(new Date(ele.clip5date), 'Asia/Jerusalem');
        if (ele.clip6date !== "")
          newPerson.clip6date = changeTimeZone(new Date(ele.clip6date), 'Asia/Jerusalem');
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
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
function submitData() {
  document.getElementById("displaying").style.visibility = "hidden";
    for(var j=0;j<copyBtns.length;j++){
        copyBtns[j].innerHTML="להעתיק";
        }
    document.getElementById("clip1dateChange").innerHTML="לעדכן תאריך שליחה";
    document.getElementById("clip2dateChange").innerHTML="לעדכן תאריך שליחה";
    document.getElementById("clip3dateChange").innerHTML="לעדכן תאריך שליחה";
    document.getElementById("clip4dateChange").innerHTML="לעדכן תאריך שליחה";
    document.getElementById("clip5dateChange").innerHTML="לעדכן תאריך שליחה";
    document.getElementById("clip6dateChange").innerHTML="לעדכן תאריך שליחה";
    document.getElementById("outofmetaChange").innerHTML="להוציא מההגרלה של מטא";
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      document.getElementById("displaying").style.visibility = "visible";
      console.log("row num:" + allPeople[i].row);
      currPerson = allPeople[i];
      document.getElementById("nameDisplay").innerHTML =
        allPeople[i].name;
      document.getElementById("chainDisplay").innerHTML =
          fixChainFromData(allPeople[i].chain);
      document.getElementById("phoneDisplay").innerHTML =
         allPeople[i].phone;
      document.getElementById("emailDisplay").innerHTML =
         allPeople[i].email;
      document.getElementById("orderDisplay").innerHTML =
         allPeople[i].order;
      document.getElementById("feedbackDisplay").innerHTML =
         allPeople[i].feedback;
      document.getElementById("clip1Display").innerHTML =
         allPeople[i].clip1;
      document.getElementById("clip2Display").innerHTML =
         allPeople[i].clip2;
    document.getElementById("clip3Display").innerHTML =
         allPeople[i].clip3;
      document.getElementById("clip4Display").innerHTML =
         allPeople[i].clip4;
        document.getElementById("clip5Display").innerHTML =
         allPeople[i].clip5;
      document.getElementById("clip6Display").innerHTML =
         allPeople[i].clip6;
      document.getElementById("555Display").innerHTML =
        allPeople[i].link555;
      document.getElementById("55Display").innerHTML =
        allPeople[i].link55yt;
      document.getElementById("fullDisplay").innerHTML =
         allPeople[i].linkfull;
        
        if (allPeople[i].clip1date !== "") {
            document.getElementById("clip1dateB4").innerHTML=
              allPeople[i].clip1date.getDate() +
              "/" +
              (allPeople[i].clip1date.getMonth() + 1) +
              "/" +
              allPeople[i].clip1date.getFullYear();
       }
         if (allPeople[i].clip2date !== "") {
            document.getElementById("clip2dateB4").innerHTML=
              allPeople[i].clip2date.getDate() +
              "/" +
              (allPeople[i].clip2date.getMonth() + 1) +
              "/" +
              allPeople[i].clip2date.getFullYear();
       }
       if (allPeople[i].clip3date !== "") {
            document.getElementById("clip3dateB4").innerHTML=
              allPeople[i].clip3date.getDate() +
              "/" +
              (allPeople[i].clip3date.getMonth() + 1) +
              "/" +
              allPeople[i].clip3date.getFullYear();
       }
         if (allPeople[i].clip4date !== "") {
            document.getElementById("clip4dateB4").innerHTML=
              allPeople[i].clip4date.getDate() +
              "/" +
              (allPeople[i].clip4date.getMonth() + 1) +
              "/" +
              allPeople[i].clip4date.getFullYear();
       }
        if (allPeople[i].clip5date !== "") {
            document.getElementById("clip5dateB4").innerHTML=
              allPeople[i].clip5date.getDate() +
              "/" +
              (allPeople[i].clip5date.getMonth() + 1) +
              "/" +
              allPeople[i].clip5date.getFullYear();
       }
         if (allPeople[i].clip6date !== "") {
            document.getElementById("clip6dateB4").innerHTML=
              allPeople[i].clip6date.getDate() +
              "/" +
              (allPeople[i].clip6date.getMonth() + 1) +
              "/" +
              allPeople[i].clip6date.getFullYear();
       }
        
        
        if(allPeople[i].clip1date==="")
            {
               document.getElementById("clip1dateB4").innerHTML="אין תאריך משלוח"; 
            }
        if(allPeople[i].clip2date==="")
            {
               document.getElementById("clip2dateB4").innerHTML="אין תאריך משלוח"; 
            }
         if(allPeople[i].clip3date==="")
            {
               document.getElementById("clip3dateB4").innerHTML="אין תאריך משלוח"; 
            }
        if(allPeople[i].clip4date==="")
            {
               document.getElementById("clip4dateB4").innerHTML="אין תאריך משלוח"; 
            }
         if(allPeople[i].clip5date==="")
            {
               document.getElementById("clip5dateB4").innerHTML="אין תאריך משלוח"; 
            }
        if(allPeople[i].clip6date==="")
            {
               document.getElementById("clip6dateB4").innerHTML="אין תאריך משלוח"; 
            }
      chosenRow=allPeople[i].row;   
    }
  }
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
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
function reset() {
  document.location.reload();
}
function copy(id) {
  var text = "";
  if (id === "name") {
    text = currPerson.name;
  }
  if (id === "chain") {
    text =  fixChainFromData(currPerson.chain);
  }
  if (id === "order") {
    text = currPerson.order;
  }
  if (id === "phone") {
    text = currPerson.phone;
  }
  if (id === "email") {
    text = currPerson.email;
  }
  if (id === "link555") {
    text = currPerson.link555;
  }
  if (id === "link55yt") {
    text = currPerson.link55yt;
  }
  if (id === "linkfull") {
    text = currPerson.linkfull;
  }
  if (id === "feedback") {
    text = currPerson.feedback;
  }
  if (id === "clip1") {
    text = currPerson.clip1;
  }
  if (id === "clip2") {
    text = currPerson.clip2;
  }
     if (id === "clip3") {
    text = currPerson.clip3;
  }
  if (id === "clip4") {
    text = currPerson.clip4;
  }
     if (id === "clip5") {
    text = currPerson.clip5;
  }
  if (id === "clip6") {
    text = currPerson.clip6;
  }
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
function change(id) {
    var textEntered=document.getElementById(id).value;
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
      console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: textEntered,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, dataElement);
      dataElement.innerHTML="תאריך השליחה עודכן";
  }
}
function changeOutofmeta(id) {
    var textEntered="v";
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
      console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: textEntered,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, dataElement);
      dataElement.innerHTML="החרוז הוצא מההגרלה";
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
    });
  
}
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
