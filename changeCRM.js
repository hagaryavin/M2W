var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var rowChainCount = 2;
var size = 0;
var chosenCol = "";
var chosenRow = 0;
var chosenChainRow=0;
var url =
  "https://script.google.com/macros/s/AKfycbzXoN1d21aGDuS7dUEj9vz6v952hwbKmueQaPdJ20QbrDkH9X6485Vh2IxnYgTbVBR7kA/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbye8Aq8q9R5EHO6_S1pwc71ogwBCt2XSYe5TVBbodwwuGc2ypMLBAvKi2IH749aP-Y78g/exec";
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
          guestphone: ele.phone,
          chain: ele.chain,
          order: ele.order,
          mess: ele.datelastmess,
          email: ele.email,
          title: ele.topicofstory,
          subtitle: ele.subtitle,
          abouttheguest: ele.abouttheguest,
          interphone: ele.interviewerphone,
          interviewername: ele.interviewername,
          date: ele.recordingdate,
          hour: ele.recordinghour,
          link555: ele.linkfive,
          link55drive: ele.linkshort,
          link55yt: ele.linkshortyt,
          linkfull: ele.linkfull,
          linkspotify: ele.linkspotify,
          linksc: ele.linksc,
          linkpic: ele.linkpic,
          linkexplain: ele.linkexplain,
          linkpre: ele.preptalk,
            meta:ele.meta,
          id: ele.id,
          clip1: ele.clip1,
          clip2: ele.clip2,
        clip3: ele.clip3,
          clip4: ele.clip4,
            clip5: ele.clip5,
          clip6: ele.clip6,
          row: rowCount,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.guestphone = ele.fixedphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        if (ele.fixedsubtitle !== "") newPerson.subtitle = ele.fixedsubtitle;
        if (ele.fixedabouttheguest !== "")
          newPerson.abouttheguest = ele.fixedabouttheguest;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewername = ele.fixedinterviewername;
        if (ele.fixedinterviewerphone !== "")
          newPerson.interphone = ele.fixedinterviewerphone;
        if (ele.recordingdate !== "")
          newPerson.date = new Date(ele.recordingdate);
        if (ele.recordinghour !== "")
          newPerson.hour = new Date(ele.recordinghour);
        if (ele.fixedrecordingdate !== "")
          newPerson.date = new Date(ele.fixedrecordingdate);
        if (ele.fixedrecordinghour !== "")
          newPerson.hour = new Date(ele.fixedrecordinghour);
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
        altName:ele.othername,
        participants:ele.participants,
        chainExplain:ele.about,
        row:rowChainCount
        };
        allChains.push(newChain);
        chainOption = document.createElement("option");
        chainOption.value = "555-" + newChain.name;
        document.getElementById("chainsNames").append(chainOption);
        rowChainCount++;
      });
    });
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
function clearValues() {
  document.getElementById("link555").value = "";
  document.getElementById("linkfull").value = "";
  document.getElementById("link55drive").value = "";
  document.getElementById("link55yt").value = "";
  document.getElementById("linkspotify").value = "";
  document.getElementById("linksc").value = "";
  document.getElementById("linkexplain").value = "";
  document.getElementById("linkpre").value = "";
  document.getElementById("clip1").value = "";
  document.getElementById("clip2").value = "";
document.getElementById("meta").value = ""
  document.getElementById("name").value = "";
  document.getElementById("guestphone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("chain").value = "";
  document.getElementById("order").value = "";
  document.getElementById("mess").value = "";
  document.getElementById("title").value = "";
  document.getElementById("subtitle").value = "";
  document.getElementById("about").value = "";
  document.getElementById("intername").value = "";
  document.getElementById("interphone").value = "";
  document.getElementById("id").value = "";
  document.getElementById("date").value = "";
  document.getElementById("hour").value = "";
  document.getElementById("participants").value = "";    
    
  document.getElementById("link555Change").innerHTML="הוספת סרט555";
  document.getElementById("linkfullChange").innerHTML="הוספת הראיון המלא";
  document.getElementById("link55driveChange").innerHTML="הוספת לינק לסרט 55-דרייב";
   document.getElementById("link55ytChange").innerHTML="הוספת סרט קצר 55-יוטיוב"; 
    document.getElementById("linkspotifyChange").innerHTML="הוספת לינק לספוטיפיי";
     document.getElementById("linkscChange").innerHTML="הוספת לינק לסאונדקלאוד";
    document.getElementById("linkexplainChange").innerHTML="הוספת סרט הסבר לשרשרת";
    document.getElementById("linkpreChange").innerHTML="הוספת סרט הכנה לפתיחת שרשרת";
     document.getElementById("clip1Change").innerHTML="הוספת קליפ1";
    document.getElementById("clip2Change").innerHTML="הוספת קליפ2";
    document.getElementById("nameChange").innerHTML="תיקון שם";
     document.getElementById("guestphoneChange").innerHTML="תיקון נייד אורח";
    document.getElementById("emailChange").innerHTML="תיקון כתובת מייל";
    document.getElementById("chainChange").innerHTML="תיקון שרשרת";
    document.getElementById("orderChange").innerHTML="הוספת מספר חרוז בשרשרת";
    document.getElementById("titleChange").innerHTML="תיקון כותרת";
    document.getElementById("subtitleChange").innerHTML="תיקון מסר";
     document.getElementById("aboutChange").innerHTML="תיקון הצגה";
    document.getElementById("internameChange").innerHTML="תיקון שם מראיין";
    document.getElementById("interphoneChange").innerHTML="תיקון נייד מראיין";
    document.getElementById("idChange").innerHTML="הוספת מספר פרק פודקאסט";
    document.getElementById("dateChange").innerHTML="תיקון תאריך";
     document.getElementById("hourChange").innerHTML="תיקון שעה";
    document.getElementById("participantsChange").innerHTML="הוספת תיאור משתתפי השרשרת";
     document.getElementById("metaChange").innerHTML="תיקון סימון תכנון יומי מטא";
}
function submitData() {
  clearValues();
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      chosenRow = allPeople[i].row;
      for(var j=0;j<allChains.length;j++){
          if((allChains[j].name===fixChainFromData(allPeople[i].chain)||
             allChains[j].altName===fixChainFromData(allPeople[i].chain))&&
             allChains[j].name!==""){
              currChain=allChains[j];
             chosenChainRow=allChains[j].row;
            console.log("chain row:"+chosenChainRow);
          }
            
        }
      document.getElementById("link555B4").innerHTML = allPeople[i].link555;
      document.getElementById("linkfullB4").innerHTML = allPeople[i].linkfull;
      document.getElementById("link55driveB4").innerHTML =
        allPeople[i].link55drive;
      document.getElementById("link55ytB4").innerHTML = allPeople[i].link55yt;
      document.getElementById("linkspotifyB4").innerHTML =
        allPeople[i].linkspotify;
      document.getElementById("linkscB4").innerHTML = allPeople[i].linksc;
      document.getElementById("linkexplainB4").innerHTML =
        currChain.chainExplain;
      document.getElementById("linkpreB4").innerHTML = allPeople[i].linkpre;
      document.getElementById("nameB4").innerHTML = allPeople[i].name;
         document.getElementById("nameB4also").innerHTML = allPeople[i].name;
      document.getElementById("internameB4").innerHTML =
        allPeople[i].interviewername;
      document.getElementById("emailB4").innerHTML = allPeople[i].email;
      document.getElementById("guestPhoneB4").innerHTML =
        allPeople[i].guestphone;
      document.getElementById("chainB4").innerHTML = allPeople[i].chain;
      document.getElementById("orderB4").innerHTML = allPeople[i].order;
      document.getElementById("messB4").innerHTML = allPeople[i].mess;
      document.getElementById("titleB4").innerHTML = allPeople[i].title;
      document.getElementById("subtitleB4").innerHTML = allPeople[i].subtitle;
      document.getElementById("aboutB4").innerHTML = allPeople[i].abouttheguest;
      document.getElementById("dateB4").innerHTML = allPeople[i].date;
      document.getElementById("idB4").innerHTML = allPeople[i].id;
      document.getElementById("clip1B4").innerHTML = allPeople[i].clip1;
      document.getElementById("clip2B4").innerHTML = allPeople[i].clip2;
        document.getElementById("metaB4").innerHTML = allPeople[i].meta;
      document.getElementById("participantsB4").innerHTML=currChain.participants;
      document.getElementById("hourB4").innerHTML = allPeople[i].hour;
      document.getElementById("interPhoneB4").innerHTML =
        allPeople[i].interphone;
      if (allPeople[i].date !== "") {
        document.getElementById("dateB4").innerHTML =
          allPeople[i].date.getDate() +
          "/" +
          (allPeople[i].date.getMonth() + 1) +
          "/" +
          allPeople[i].date.getFullYear();
      }
      if (allPeople[i].hour !== "") {
        document.getElementById("hourB4").innerHTML =
          allPeople[i].hour.getHours() + ":" + allPeople[i].hour.getMinutes();
        if (allPeople[i].hour.getMinutes() < 10)
          document.getElementById("hourB4").innerHTML =
            allPeople[i].hour.getHours() +
            ":0" +
            allPeople[i].hour.getMinutes();
      }
        
      console.log("row:" + chosenRow);
    }
  }
}
function sendData(obj, ele,whichSheet) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
    var urlUsed=url;
    if(whichSheet==="crm"){
        urlUsed=url;
    }
    if(whichSheet==="chains"){
        urlUsed=chainDataURL;
    }
  fetch(urlUsed, {
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
function change(id){
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
    console.log("col: "+chosenCol);
    if (chosenRow === 0) {
        alert("נא לבחור מישהו מהטבלה כדי לשנות");
    }
    const temp = {
        text: document.getElementById(id).value,
        row: chosenRow,
        col: chosenCol,
    };
    if (chosenRow > 0) {
        sendData(temp, dataElement,"crm");
        dataElement.innerHTML="התעדכן";
    }
}
function changeChainInfo(id){
    var dataElement=document.getElementById(id+"Change");
    chosenCol=id;
    console.log("col: "+chosenCol);
    if (chosenRow === 0) {
        alert("נא לבחור מישהו מהטבלה כדי לשנות");
    }
    const temp = {
        text: document.getElementById(id).value,
        row: chosenChainRow,
        col: chosenCol,
    };
    if (chosenRow > 0) {
        sendData(temp, dataElement,"chains");
        dataElement.innerHTML="התעדכן";
    }
}
function changeChainExplain(){
    console.log("col: linkexplain");
    console.log("col: about");
    if (chosenRow === 0) {
        alert("נא לבחור מישהו מהטבלה כדי לשנות");
    }
    const obj1 = {
        text: document.getElementById("linkexplain").value,
        row: chosenRow,
        col: "linkexplain",
    };
     const obj2 = {
        text: document.getElementById("linkexplain").value,
        row: chosenChainRow,
        col: "about",
    };
    if (chosenRow > 0) {
      console.log(obj1);
     console.log(obj2);
      let formData1 = new FormData();
      formData1.append("data", JSON.stringify(obj1));
      let formData2 = new FormData();
      formData2.append("data", JSON.stringify(obj2));
      fetch(url, {
        method: "POST",
        body: formData1,
      })
        .then((rep) => {
          console.log(obj1);
          return rep.json();
        })
        .then((json) => {
          console.log(obj1);
          console.log(json);
        });

        fetch(chainDataURL, {
        method: "POST",
        body: formData2,
      })
        .then((rep) => {
          console.log(obj2);
          return rep.json();
        })
        .then((json) => {
          console.log(obj2);
          console.log(json);
        });
        document.getElementById("linkexplainChange").innerHTML="התעדכן";
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


