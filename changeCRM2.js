var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var size = 0;
var chosenCol = "";
var chosenRow = 0;
var url =
  "https://script.google.com/macros/s/AKfycbzgSi44PK_EEUpjWn9dzVs_aWQcr0CRoUdQPKSEOk1M39EalLpSal6lHQeEP0PE0uc_uA/exec";
var newPerson = {};
var chainOption;
var allChains = [];
var newChain = {};
var currChain = {};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
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
          id: ele.id,
          clip1: ele.clip1,
          clip2: ele.clip2,
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
        };
        allChains.push(newChain);
        chainOption = document.createElement("option");
        chainOption.value = "555-" + newChain.name;
        document.getElementById("chainsNames").append(chainOption);
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
  document.getElementById("name").value = "";
  document.getElementById("guestPhone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("chainName").value = "";
  document.getElementById("order").value = "";
  document.getElementById("mess").value = "";
  document.getElementById("title").value = "";
  document.getElementById("subtitle").value = "";
  document.getElementById("about").value = "";
  document.getElementById("intername").value = "";
  document.getElementById("interPhone").value = "";
  document.getElementById("id").value = "";
  document.getElementById("date").value = "";
  document.getElementById("hour").value = "";
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
      document.getElementById("link555B4").innerHTML = allPeople[i].link555;
      document.getElementById("linkfullB4").innerHTML = allPeople[i].linkfull;
      document.getElementById("link55driveB4").innerHTML =
        allPeople[i].link55drive;
      document.getElementById("link55ytB4").innerHTML = allPeople[i].link55yt;
      document.getElementById("linkspotifyB4").innerHTML =
        allPeople[i].linkspotify;
      document.getElementById("linkscB4").innerHTML = allPeople[i].linksc;
      //document.getElementById("linkpicB4").innerHTML = allPeople[i].linkpic;
      document.getElementById("linkexplainB4").innerHTML =
        allPeople[i].linkexplain;
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

function changeLink555() {
  chosenCol = "link555";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("link555").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("link555"));
  }
}
function link555Change() {
  changeLink555();
}
function changeLinkfull() {
  chosenCol = "linkfull";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("linkfull").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("linkfull"));
  }
}
function linkfullChange() {
  changeLinkfull();
}
function changeLink55drive() {
  chosenCol = "link55drive";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("link55drive").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("link55drive"));
  }
}
function link55driveChange() {
  changeLink55drive();
}
function changeLink55yt() {
  chosenCol = "link55yt";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("link55yt").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("link55yt"));
  }
}
function link55ytChange() {
  changeLink55yt();
}
function changeLinkspotify() {
  chosenCol = "linkspotify";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("linkspotify").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("linkspotify"));
  }
}
function linkspotifyChange() {
  changeLinkspotify();
}
function changeLinksc() {
  chosenCol = "linksc";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("linksc").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("linksc"));
  }
}
function linkscChange() {
  changeLinksc();
}
/*function changeLinkpic() {
  chosenCol = "linkpic";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("linkpic").value,
    row: chosenRow,
    col: chosenCol
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("linkpic"));
  }
}
function linkpicChange() {
  submitData();
  changeLinkpic();
}*/
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
function changeLinkexplain() {
  chosenCol = "linkexplain";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("linkexplain").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("linkexplain"));
  }
}
function linkexplainChange() {
  changeLinkexplain();
}
function changeLinkpre() {
  chosenCol = "linkpre";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("linkpre").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("linkpre"));
  }
}
function linkpreChange() {
  changeLinkpre();
}
function changeClip1() {
  chosenCol = "clip1";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("clip1").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("clip1"));
  }
}
function clip1Change() {
  changeClip1();
}
function changeClip2() {
  chosenCol = "clip2";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("clip2").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("clip2"));
  }
}
function clip2Change() {
  changeClip2();
}
function changeName() {
  chosenCol = "name";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("name").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("name"));
  }
}
function nameChange() {
  changeName();
}
function changeGuestPhone() {
  chosenCol = "guestphone";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("guestPhone").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("guestPhone"));
  }
}
function guestPhoneChange() {
  changeGuestPhone();
}
function changeEmail() {
  chosenCol = "email";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("email").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("email"));
  }
}
function emailChange() {
  changeEmail();
}
function changeChain() {
  chosenCol = "chain";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("chainName").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("chainName"));
  }
}
function chainChange() {
  changeChain();
}
function changeOrder() {
  chosenCol = "order";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("order").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("order"));
  }
}
function orderChange() {
  changeOrder();
}
function changeMess() {
  chosenCol = "mess";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("mess").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("mess"));
  }
}
function messChange() {
  changeMess();
}
function changeTitle() {
  chosenCol = "title";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("title").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("title"));
  }
}
function titleChange() {
  changeTitle();
}
function changeSubtitle() {
  chosenCol = "subtitle";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("subtitle").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("subtitle"));
  }
}
function subtitleChange() {
  changeSubtitle();
}
function changeAbout() {
  chosenCol = "about";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("about").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("about"));
  }
}
function aboutChange() {
  changeAbout();
}

function changeInterName() {
  chosenCol = "intername";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("intername").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("intername"));
  }
}
function internameChange() {
  changeInterName();
}

function changeInterPhone() {
  chosenCol = "interphone";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("interPhone").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("interPhone"));
  }
}
function interPhoneChange() {
  changeInterPhone();
}

function changeId() {
  chosenCol = "id";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("id").value,
    row: chosenRow,
    col: chosenCol,
  };
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("id"));
  }
}
function idChange() {
  changeId();
}
function changeDate() {
  chosenCol = "date";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("date").value,
    row: chosenRow,
    col: chosenCol,
  };
  console.log(document.getElementById("date").value);
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("date"));
  }
}
function dateChange() {
  changeDate();
}
function changeHour() {
  chosenCol = "hour";
  console.log("col: " + chosenCol);
  if (chosenRow === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  const temp = {
    text: document.getElementById("hour").value,
    row: chosenRow,
    col: chosenCol,
  };
  console.log(document.getElementById("hour").value);
  if (chosenRow > 0) {
    sendData(temp, document.getElementById("hour"));
  }
}
function hourChange() {
  changeHour();
}
