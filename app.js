var newPerson = {};
var size = 0;
var allPeople = [];
var allPeopleEng = [];
var list = document.getElementById("list");
var optionList;
var optionDiv;
var optionInput;
var day;
var month;
var recDate;
var tableRow = 2;
var tableRowEng = 2;
var newTask = {};
var allTasks = [];
var allTasksEng = [];
var tasks4lols = [];
var tasks4lolsEng = [];
var tasks4person;
var tasks4personEng;
var tasks4personB4 = {};
var tasks4personB4Eng = {};
var allChains = [];
var newChain = {};
const url =
    "https://script.google.com/macros/s/AKfycbyQXy8gZKTpDz9miNib4Vtx8vVz2Ank_TDXOuME6FFMoV3OjcsdIi7w1dPG-vZ5mjYVCw/exec";
const urlEng="https://script.google.com/macros/s/AKfycbwif1D1ZdoI1iYaL2Hya5Jke8UIFaoPxMo2Jkvd3cNytK35UIGbJZ0NKwhiYJQgana8-A/exec";
const taskurl =
    "https://script.google.com/macros/s/AKfycbwiP2oOmKB3ynoXXV_ZrLv3L82-TtQE4fF92rY0i5lO1xWhgt82DlVV-YTztHzNe8sSAw/exec";
const taskurlEng="https://script.google.com/macros/s/AKfycbwQfNNC-5P1c1x-JcKJ0jii3si9P1pItDynzlA9St6-ISH54aAL1DPhbZnvCT7aNwUE/exec";
const chainDataURL =
    "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";

function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
var today = changeTimeZone(new Date(), 'Asia/Jerusalem');
console.log("today: " + today);
var todaysDay = today.getDate();
var todaysMonth = today.getMonth() + 1;
var todaysCurrentDate = todaysDay + "." + todaysMonth;
function start(){

      getChainData();
       
    setTimeout(() => {
      getData();
      getDataEng();
    }, 4000);   
     setTimeout(() => {
          optionList = document.createElement("dt");
            optionList.id = "label";
            optionList.innerHTML =
                "מומלץ לבדוק גם בלוח השנה למקרה שיש הקלטה שאינה כתובה בCRM";
            list.append(optionList);
    }, 5000);  
}



function getData(x) {
     newPerson = {};
    newTask={};
    getTasksDataFromPerson();
    document.getElementById("today").innerHTML =
        "היום " + todaysCurrentDate + " לשלוח הודעות ל:";
    fetch(url)
        .then((res) => {
           
            return res.json();
            
        })
        .then((json) => {
            json.data.forEach((ele) => {
                newPerson = {
                    name: ele.name,
                    interviewername: ele.interviewername,
                    chain: ele.chain,
                    chainCreator: "",
                    chainCreatorEmail: "",
                    recordingdate: "",
                    premessdate: "",
                    postmessdate: "",
                    postmessinvitedate: "",
                    timeformsent: changeTimeZone(new Date(ele.timeformsent), 'Asia/Jerusalem'),
                    row: tableRow,
                };
                tableRow++;

                if (ele.fixedname !== "") newPerson.name = ele.fixedname;
                if (ele.fixedinterviewername !== "")
                    newPerson.interviewername = ele.fixedinterviewername;
                if (newPerson.chain === "") {
                    if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
                    if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
                }
                if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
                if (ele.recordingdate !== "")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
                if (ele.fixedrecordingdate !== "")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
                if (newPerson.recordingdate !== "") {
                    newPerson.premessdate = changeTimeZone(new Date(preMessDate(newPerson.recordingdate)), 'Asia/Jerusalem');
                    newPerson.postmessdate = changeTimeZone(new Date(postMessDate(newPerson.recordingdate)), 'Asia/Jerusalem');
                    newPerson.postmessinvitedate = changeTimeZone(new Date(postMessInviteDate(newPerson.recordingdate)), 'Asia/Jerusalem');
                    for (var i = 0; i < allChains.length; i++) {
                        if (
                            allChains[i].name === shortChainName(newPerson.chain) ||
                            allChains[i].altname === shortChainName(newPerson.chain)
                        ) {
                            if (allChains[i].creatorEmail !== "") {
                                newPerson.chainCreator = allChains[i].creator;
                                newPerson.chainCreatorEmail = allChains[i].creatorEmail;
                            }
                        }
                    }
                    day = newPerson.recordingdate.getDate();
                    month = newPerson.recordingdate.getMonth() + 1;
                    recDate = day + "." + month;
                    if (
                        (newPerson.premessdate < today ||
                            (newPerson.premessdate.getDate() === today.getDate() &&
                                newPerson.premessdate.getMonth() === today.getMonth() &&
                                newPerson.premessdate.getYear() === today.getYear())) &&
                        getTasksDataFromPersonCont(newPerson.row, "premess") === "not yet"
                    ) {
                        //////1 condition
                        newTask = {
                            name: newPerson.name,
                            interviewername: newPerson.interviewername,
                            recordingdate: newPerson.recordingdate,
                            chain: newPerson.chain,
                            chainCreator: newPerson.chainCreator,
                            chainCreatorEmail: newPerson.chainCreatorEmail,
                            type: "premess",
                            row: newPerson.row,
                        };
                        if (!taskAlreadyExist(newTask)) {
                            console.log("new task!");
                            console.log(newTask);
                            allTasks.push(newTask);
                            changeStatus(
                                newPerson.row,
                                newTask.type,

                                "add"
                            );
                        }
                    }

                    if (
                        newPerson.timeformsent < today ||
                        (newPerson.timeformsent.getDate() === today.getDate() &&
                            newPerson.timeformsent.getMonth() === today.getMonth() &&
                            newPerson.timeformsent.getYear() === today.getYear())
                    ) {
                        //////6,7 condition
                        if (newPerson.interviewername !== "יעל מילוא" &&
                            getTasksDataFromPersonCont(newPerson.row, "confirm") === "not yet"
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "confirm",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExist(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasks.push(newTask);
                                changeStatus(newPerson.row, newTask.type, "add");
                            }
                        }
                        if (
                            newPerson.chainCreatorEmail !== "" &&
                            newPerson.name !== newPerson.chainCreator &&
                            newPerson.interviewername!==newPerson.chainCreator&&
                            getTasksDataFromPersonCont(newPerson.row, "addcreator") ===
                            "not yet"
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "addcreator",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExist(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasks.push(newTask);
                                changeStatus(newPerson.row, newTask.type, "add");
                            }
                        }
                    }

                    if (
                        (newPerson.recordingdate < today ||
                            (newPerson.recordingdate.getDate() === today.getDate() &&
                                newPerson.recordingdate.getMonth() === today.getMonth() &&
                                newPerson.recordingdate.getYear() === today.getYear())) &&
                        getTasksDataFromPersonCont(newPerson.row, "rightaftermess") ===
                        "not yet"
                    ) {
                        //////2 condition
                        newTask = {
                            name: newPerson.name,
                            interviewername: newPerson.interviewername,
                            recordingdate: newPerson.recordingdate,
                            chain: newPerson.chain,
                            chainCreator: newPerson.chainCreator,
                            chainCreatorEmail: newPerson.chainCreatorEmail,
                            type: "rightaftermess",
                            row: newPerson.row,
                        };
                        if (!taskAlreadyExist(newTask)) {
                            console.log("new task!");
                            console.log(newTask);
                            allTasks.push(newTask);

                            changeStatus(
                                newPerson.row,
                                newTask.type,

                                "add"
                            );
                        }
                    }

                    if (
                        newPerson.postmessdate < today ||
                        (newPerson.postmessdate.getDate() === today.getDate() &&
                            newPerson.postmessdate.getMonth() === today.getMonth() &&
                            newPerson.postmessdate.getYear() === today.getYear())
                    ) {
                        //////////////3,5 condition
                        if (
                            getTasksDataFromPersonCont(newPerson.row, "postmess") ===
                            "not yet"
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "postmess",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExist(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasks.push(newTask);

                                changeStatus(
                                    newPerson.row,
                                    newTask.type,

                                    "add"
                                );
                            }
                        }
                        if (
                            newPerson.interviewername !== "יעל מילוא" &&
                            getTasksDataFromPersonCont(newPerson.row, "socialpost") ===
                            "not yet"
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "socialpost",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExist(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasks.push(newTask);

                                changeStatus(
                                    newPerson.row,
                                    newTask.type,

                                    "add"
                                );
                            }
                        }
                    }

                    if (
                        (newPerson.postmessinvitedate < today ||
                            (newPerson.postmessinvitedate.getDate() === today.getDate() &&
                                newPerson.postmessinvitedate.getMonth() === today.getMonth() &&
                                newPerson.postmessinvitedate.getYear() === today.getYear())) &&
                        getTasksDataFromPersonCont(newPerson.row, "postmessinvite") ===
                        "not yet"
                    ) {
                        /////////////////4 condition
                        newTask = {
                            name: newPerson.name,
                            interviewername: newPerson.interviewername,
                            recordingdate: newPerson.recordingdate,
                            chain: newPerson.chain,
                            chainCreator: newPerson.chainCreator,
                            chainCreatorEmail: newPerson.chainCreatorEmail,
                            type: "postmessinvite",
                            row: newPerson.row,
                        };
                        if (!taskAlreadyExist(newTask)) {
                            console.log("new task!");
                            console.log(newTask);
                            allTasks.push(newTask);

                            changeStatus(
                                newPerson.row,
                                newTask.type,

                                "add"
                            );
                        }
                    }

                    console.log(newPerson);
                    allPeople.push(newPerson);
                }
            });

            taskData();
        });
}
function getDataEng(x) {
     newPerson = {};
    newTask={};
    getTasksDataFromPersonEng();
    document.getElementById("today").innerHTML =
        "היום " + todaysCurrentDate + " לשלוח הודעות ל:";
    fetch(urlEng)
        .then((res) => {
           
            return res.json();
            
        })
        .then((json) => {
            json.data.forEach((ele) => {
                newPerson = {
                    name: ele.name,
                    interviewername: ele.interviewername,
                    chain: ele.chain,
                    chainCreator: "",
                    chainCreatorEmail: "",
                    recordingdate: "",
                    premessdate: "",
                    postmessdate: "",
                    postmessinvitedate: "",
                    timeformsent: changeTimeZone(new Date(ele.timeformsent), 'Asia/Jerusalem'),
                    row: tableRowEng,
                    qa:false
                };
                tableRowEng++;

                if (ele.fixedname !== "") newPerson.name = ele.fixedname;
                if (ele.fixedinterviewername !== "")
                    newPerson.interviewername = ele.fixedinterviewername;
                if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
                if(newPerson.chain.includes("Q&A"))
                    newPerson.qa=true;
                if (ele.recordingdate !== "")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
                if (ele.fixedrecordingdate !== "")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
                if (newPerson.recordingdate !== "") {
                    newPerson.premessdate = changeTimeZone(new Date(preMessDate(newPerson.recordingdate)), 'Asia/Jerusalem');
                    newPerson.postmessdate = changeTimeZone(new Date(postMessDate(newPerson.recordingdate)), 'Asia/Jerusalem');
                    newPerson.postmessinvitedate = changeTimeZone(new Date(postMessInviteDate(newPerson.recordingdate)), 'Asia/Jerusalem');
                    for (var i = 0; i < allChains.length; i++) {
                        if (
                            allChains[i].name === shortChainName(newPerson.chain) ||
                            allChains[i].altname === shortChainName(newPerson.chain)
                        ) {
                            if (allChains[i].creatorEmail !== "") {
                                newPerson.chainCreator = allChains[i].creator;
                                newPerson.chainCreatorEmail = allChains[i].creatorEmail;
                            }
                        }
                    }
                    day = newPerson.recordingdate.getDate();
                    month = newPerson.recordingdate.getMonth() + 1;
                    recDate = day + "." + month;
                    if (
                        (newPerson.premessdate < today ||
                            (newPerson.premessdate.getDate() === today.getDate() &&
                                newPerson.premessdate.getMonth() === today.getMonth() &&
                                newPerson.premessdate.getYear() === today.getYear())) &&
                        getTasksDataFromPersonContEng(newPerson.row, "premess") === "not yet"
                    ) {
                        //////1 condition
                        newTask = {
                            name: newPerson.name,
                            interviewername: newPerson.interviewername,
                            recordingdate: newPerson.recordingdate,
                            chain: newPerson.chain,
                            chainCreator: newPerson.chainCreator,
                            chainCreatorEmail: newPerson.chainCreatorEmail,
                            type: "premess",
                            row: newPerson.row,
                        };
                        if (!taskAlreadyExistEng(newTask)) {
                            console.log("new task!");
                            console.log(newTask);
                            allTasksEng.push(newTask);
                            changeStatusEng(
                                newPerson.row,
                                newTask.type,

                                "add"
                            );
                        }
                    }

                    if (
                        newPerson.timeformsent < today ||
                        (newPerson.timeformsent.getDate() === today.getDate() &&
                            newPerson.timeformsent.getMonth() === today.getMonth() &&
                            newPerson.timeformsent.getYear() === today.getYear())
                    ) {
                        //////6,7 condition
                        if (newPerson.interviewername !== "יעל מילוא" &&
                            getTasksDataFromPersonContEng(newPerson.row, "confirm") === "not yet"
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "confirm",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExistEng(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasksEng.push(newTask);
                                changeStatusEng(newPerson.row, newTask.type, "add");
                            }
                        }
                        if (
                            newPerson.chainCreatorEmail !== "" &&
                            newPerson.name !== newPerson.chainCreator &&
                            newPerson.interviewername!==newPerson.chainCreator&&
                            getTasksDataFromPersonContEng(newPerson.row, "addcreator") ===
                            "not yet"&&newPerson.qa===false
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "addcreator",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExistEng(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasksEng.push(newTask);
                                changeStatusEng(newPerson.row, newTask.type, "add");
                            }
                        }
                    }

                    if (
                        (newPerson.recordingdate < today ||
                            (newPerson.recordingdate.getDate() === today.getDate() &&
                                newPerson.recordingdate.getMonth() === today.getMonth() &&
                                newPerson.recordingdate.getYear() === today.getYear())) &&
                        getTasksDataFromPersonContEng(newPerson.row, "rightaftermess") ===
                        "not yet"&&newPerson.qa===false
                    ) {
                        //////2 condition
                        newTask = {
                            name: newPerson.name,
                            interviewername: newPerson.interviewername,
                            recordingdate: newPerson.recordingdate,
                            chain: newPerson.chain,
                            chainCreator: newPerson.chainCreator,
                            chainCreatorEmail: newPerson.chainCreatorEmail,
                            type: "rightaftermess",
                            row: newPerson.row,
                        };
                        if (!taskAlreadyExistEng(newTask)) {
                            console.log("new task!");
                            console.log(newTask);
                            allTasksEng.push(newTask);

                            changeStatusEng(
                                newPerson.row,
                                newTask.type,

                                "add"
                            );
                        }
                    }

                    if (
                        newPerson.postmessdate < today ||
                        (newPerson.postmessdate.getDate() === today.getDate() &&
                            newPerson.postmessdate.getMonth() === today.getMonth() &&
                            newPerson.postmessdate.getYear() === today.getYear())
                    ) {
                        //////////////3,5 condition
                        if (
                            getTasksDataFromPersonContEng(newPerson.row, "postmess") ===
                            "not yet"&&newPerson.qa===false
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "postmess",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExistEng(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasksEng.push(newTask);

                                changeStatusEng(
                                    newPerson.row,
                                    newTask.type,

                                    "add"
                                );
                            }
                        }
                        if (
                            newPerson.interviewername !== "יעל מילוא" &&
                            getTasksDataFromPersonContEng(newPerson.row, "socialpost") ===
                            "not yet"
                        ) {
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "socialpost",
                                row: newPerson.row,
                            };
                            if (!taskAlreadyExistEng(newTask)) {
                                console.log("new task!");
                                console.log(newTask);
                                allTasksEng.push(newTask);

                                changeStatusEng(
                                    newPerson.row,
                                    newTask.type,

                                    "add"
                                );
                            }
                        }
                    }

                    if (
                        (newPerson.postmessinvitedate < today ||
                            (newPerson.postmessinvitedate.getDate() === today.getDate() &&
                                newPerson.postmessinvitedate.getMonth() === today.getMonth() &&
                                newPerson.postmessinvitedate.getYear() === today.getYear())) &&
                        getTasksDataFromPersonContEng(newPerson.row, "postmessinvite") ===
                        "not yet"&&newPerson.qa===false
                    ) {
                        /////////////////4 condition
                        newTask = {
                            name: newPerson.name,
                            interviewername: newPerson.interviewername,
                            recordingdate: newPerson.recordingdate,
                            chain: newPerson.chain,
                            chainCreator: newPerson.chainCreator,
                            chainCreatorEmail: newPerson.chainCreatorEmail,
                            type: "postmessinvite",
                            row: newPerson.row,
                        };
                        if (!taskAlreadyExistEng(newTask)) {
                            console.log("new task!");
                            console.log(newTask);
                            allTasksEng.push(newTask);

                            changeStatusEng(
                                newPerson.row,
                                newTask.type,
                                "add"
                            );
                        }
                    }

                    console.log(newPerson);
                    allPeopleEng.push(newPerson);
                }
            });
            taskDataEng();
        });
}
function getTasksDataFromPerson() {
    tasks4personB4 = {};
    fetch(taskurl)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.forEach((ele) => {
                tasks4personB4 = {
                    row: ele.row,
                    premessstatus: ele.premess1,
                    rightaftermessstatus: ele.rightaftermess2,
                    postmessstatus: ele.postmess3,
                    postmessinvitestatus: ele.postmessinvite4,
                    socialpoststatus: ele.socialpost5,
                    confirmstatus: ele.confirm6,
                    addcreatorstatus: ele.addcreator7,
                };
                tasks4lols.push(tasks4personB4);
            });
        });
}
function getTasksDataFromPersonEng() {
    tasks4personB4Eng = {};
    fetch(taskurlEng)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.forEach((ele) => {
                tasks4personB4Eng = {
                    row: ele.row,
                    premessstatus: ele.premess1,
                    rightaftermessstatus: ele.rightaftermess2,
                    postmessstatus: ele.postmess3,
                    postmessinvitestatus: ele.postmessinvite4,
                    socialpoststatus: ele.socialpost5,
                    confirmstatus: ele.confirm6,
                    addcreatorstatus: ele.addcreator7,
                };
                tasks4lolsEng.push(tasks4personB4Eng);
            });
        });
}

function getTasksDataFromPersonCont(row, type) {
    var result = "def result";
    for (var i = 0; i < tasks4lols.length; i++) {
        if (row === tasks4lols[i].row) {
            if (type === "premess") {
                result = tasks4lols[i].premessstatus;
            }
            if (type === "rightaftermess") {
                result = tasks4lols[i].rightaftermessstatus;
            }
            if (type === "postmess") {
                result = tasks4lols[i].postmessstatus;
            }
            if (type === "postmessinvite") {
                result = tasks4lols[i].postmessinvitestatus;
            }
            if (type === "socialpost") {
                result = tasks4lols[i].socialpoststatus;
            }
            if (type === "confirm") {
                result = tasks4lols[i].confirmstatus;
            }
            if (type === "addcreator") {
                result = tasks4lols[i].addcreatorstatus;
            }
        }
    }
    return result;
}
function getTasksDataFromPersonContEng(row, type) {
    var result = "def result";
    for (var i = 0; i < tasks4lolsEng.length; i++) {
        if (row === tasks4lolsEng[i].row) {
            if (type === "premess") {
                result = tasks4lolsEng[i].premessstatus;
            }
            if (type === "rightaftermess") {
                result = tasks4lolsEng[i].rightaftermessstatus;
            }
            if (type === "postmess") {
                result = tasks4lolsEng[i].postmessstatus;
            }
            if (type === "postmessinvite") {
                result = tasks4lolsEng[i].postmessinvitestatus;
            }
            if (type === "socialpost") {
                result = tasks4lolsEng[i].socialpoststatus;
            }
            if (type === "confirm") {
                result = tasks4lolsEng[i].confirmstatus;
            }
            if (type === "addcreator") {
                result = tasks4lolsEng[i].addcreatorstatus;
            }
        }
    }
    return result;
}

function taskData() {
    fetch(taskurl)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.forEach((ele) => {
            
                tasks4person = {
                    row: ele.row,
                    premessstatus: ele.premess1,
                    rightaftermessstatus: ele.rightaftermess2,
                    postmessstatus: ele.postmess3,
                    postmessinvitestatus: ele.postmessinvite4,
                    socialpoststatus: ele.socialpost5,
                    confirmstatus: ele.confirm6,
                    addcreatorstatus: ele.addcreator7,
                };
                var currPerson = getPersonFromRow(tasks4person.row);
                if (tasks4person.premessstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "premess",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
                if (tasks4person.rightaftermessstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "rightaftermess",
                        row: currPerson.row,
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
                if (tasks4person.postmessstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "postmess",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
                if (tasks4person.postmessinvitestatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "postmessinvite",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
                if (tasks4person.socialpoststatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "socialpost",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
                if (tasks4person.confirmstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "confirm",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
                if (tasks4person.addcreatorstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "addcreator",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExist(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasks.push(newTask);
                    }
                }
            });
               
            if (allTasks.length > 0) {
                createTasks();
            }
            console.log(size);
           
        });
}
function taskDataEng() {
    fetch(taskurlEng)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.forEach((ele) => {
                tasks4personEng = {
                    row: ele.row,
                    premessstatus: ele.premess1,
                    rightaftermessstatus: ele.rightaftermess2,
                    postmessstatus: ele.postmess3,
                    postmessinvitestatus: ele.postmessinvite4,
                    socialpoststatus: ele.socialpost5,
                    confirmstatus: ele.confirm6,
                    addcreatorstatus: ele.addcreator7
                };
                var currPerson = getPersonFromRowEng(tasks4personEng.row);
                if (tasks4personEng.premessstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "premess",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
                if (tasks4personEng.rightaftermessstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "rightaftermess",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
                if (tasks4personEng.postmessstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "postmess",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
                if (tasks4personEng.postmessinvitestatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "postmessinvite",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
                if (tasks4personEng.socialpoststatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "socialpost",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
                if (tasks4personEng.confirmstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "confirm",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
                if (tasks4personEng.addcreatorstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "addcreator",
                        row: currPerson.row,
                    };
                    if (!taskAlreadyExistEng(newTask)) {
                        console.log("new task!");
                        console.log(newTask);
                        allTasksEng.push(newTask);
                    }
                }
            });
            if (allTasksEng.length > 0) {
                createTasksEng();
            }
            console.log(size);
            
        });
}
function shortChainName(chain) {
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

function createTasks() {
    for (var i = 0; i < allTasks.length; i++) {
        var tasksPerson = getPersonFromRow(allTasks[i].row);
        day = tasksPerson.recordingdate.getDate();
        month = tasksPerson.recordingdate.getMonth() + 1;
        recDate = day + "." + month;
        if (allTasks[i].type === "premess") {
            /////1
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkpremess";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "premess" + allTasks[i].row;
            optionList.innerHTML =
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - הזמנה להקלטה";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "rightaftermess") {
            ///////2
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkrightaftermess";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "rightaftermess" + allTasks[i].row;
            optionList.innerHTML =
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - וואטסאפ חרוזים";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "postmess") {
            //////3
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkpostmess";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "postmess" + allTasks[i].row;
            optionInput.classList.add("form-check-label");
            optionList.innerHTML =
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - לינקים לתוצרים";
            optionInput.classList.add("form-check-input");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "socialpost") {
            ////////5
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checksocialpost";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "socialpost" + allTasks[i].row;
            if(!((allTasks[i].chainCreatorEmail !== ""&&allTasks[i].chainCreator!==allTasks[i].name&&allTasks[i].chainCreator!==allTasks[i].interviewername))
               &&allTasks[i].interviewername!==""){
                optionList.innerHTML =allTasks[i].name+" - " +recDate +" - "+shortChainName(allTasks[i].chain)+" - פוסט ל"+allTasks[i].interviewername;
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);

            size++;
            }
            if(allTasks[i].chainCreatorEmail !== ""&&allTasks[i].chainCreator!==allTasks[i].name&&allTasks[i].chainCreator!==allTasks[i].interviewername){
                optionList.innerHTML =allTasks[i].name+" - " +recDate +" - "+shortChainName(allTasks[i].chain)+" - פוסט ל"+allTasks[i].interviewername+" ול"+allTasks[i].chainCreator;
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);

            size++;
            }
            if(allTasks[i].interviewername===""&&allTasks[i].chainCreatorEmail !== ""&&allTasks[i].chainCreator!==allTasks[i].name){
                optionList.innerHTML =allTasks[i].name+" - " +recDate +" - "+shortChainName(allTasks[i].chain)+" - פוסט ל"+allTasks[i].chainCreator;
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);

            size++;
            }
            optionInput.classList.add("form-check-label");
           
            
        }
        if (allTasks[i].type === "postmessinvite") {
            //////4
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkpostmessinvite";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "postmessinvite" + allTasks[i].row;
            optionList.innerHTML =
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - לינקים לאורח";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "confirm") {
            ////////6
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkconfirm";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "confirm" + allTasks[i].row;
            if(allTasks[i].interviewername===""&&allTasks[i].chainCreatorEmail !== ""&&allTasks[i].chainCreator!==allTasks[i].name){
                optionList.innerHTML =
                    allTasks[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasks[i].chain)+
                    " - אישור רישום ל" +allTasks[i].chainCreator
                    ;
                optionDiv.append(optionList);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            if(allTasks[i].interviewername!==""){
                optionList.innerHTML =
                    allTasks[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasks[i].chain)+
                    " - אישור רישום ל" +allTasks[i].interviewername
                    ;
                optionDiv.append(optionList);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            optionInput.classList.add("form-check-label");
        }
        if (
            allTasks[i].type === "addcreator" &&
            allTasks[i].chainCreatorEmail !== ""
        ) {
            ////////6
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkaddcreator";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "addcreator" + allTasks[i].row;
            optionList.innerHTML =
                "להוסיף את " +
                allTasks[i].chainCreator +
                " " +
                allTasks[i].chainCreatorEmail +
                " לפגישה בשרשרת " +
                shortChainName(allTasks[i].chain) +
                " בתאריך " +
                recDate;

            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
    }
}
function createTasksEng() {
    for (var i = 0; i < allTasksEng.length; i++) {
        var tasksPerson = getPersonFromRowEng(allTasksEng[i].row);
        day = tasksPerson.recordingdate.getDate();
        month = tasksPerson.recordingdate.getMonth() + 1;
        recDate = day + "." + month;
        if (allTasksEng[i].type === "premess") {
            /////1
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkpremess";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "premess" + allTasksEng[i].row;
            optionList.innerHTML =
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - הזמנה להקלטה";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "rightaftermess") {
            ///////2
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkrightaftermess";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "rightaftermess" + allTasksEng[i].row;
            optionList.innerHTML =
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - וואטסאפ חרוזים";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "postmess") {
            //////3
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkpostmess";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "postmess" + allTasksEng[i].row;
            optionInput.classList.add("form-check-label");
            optionList.innerHTML =
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - לינקים לתוצרים";
            optionInput.classList.add("form-check-input");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "socialpost") {
            ////////5
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checksocialpost";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "socialpost" + allTasksEng[i].row;
            if(!((allTasksEng[i].chainCreatorEmail !== ""&&allTasksEng[i].chainCreator!==allTasksEng[i].name&&allTasksEng[i].chainCreator!==allTasksEng[i].interviewername))
               &&allTasksEng[i].interviewername!==""){
                optionList.innerHTML =allTasksEng[i].name+" - " +recDate +" - "+shortChainName(allTasksEng[i].chain)+" - פוסט ל"+allTasksEng[i].interviewername;
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);

            size++;
            }
            if(allTasksEng[i].chainCreatorEmail !== ""&&allTasksEng[i].chainCreator!==allTasksEng[i].name&&allTasksEng[i].chainCreator!==allTasksEng[i].interviewername){
                optionList.innerHTML =allTasksEng[i].name+" - " +recDate +" - "+shortChainName(allTasksEng[i].chain)+" - פוסט ל"+allTasksEng[i].interviewername+" ול"+allTasksEng[i].chainCreator;
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);

            size++;
            }
            if(allTasksEng[i].interviewername===""&&allTasksEng[i].chainCreatorEmail !== ""&&allTasksEng[i].chainCreator!==allTasksEng[i].name){
                optionList.innerHTML =allTasksEng[i].name+" - " +recDate +" - "+shortChainName(allTasksEng[i].chain)+" - פוסט ל"+allTasksEng[i].chainCreator;
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);

            size++;
            }
            optionInput.classList.add("form-check-label");
           
            
        }
        if (allTasksEng[i].type === "postmessinvite") {
            //////4
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkpostmessinvite";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "postmessinvite" + allTasksEng[i].row;
            optionList.innerHTML =
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - לינקים לאורח";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "confirm") {
            ////////6
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkconfirm";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "confirm" + allTasksEng[i].row;
            if(allTasksEng[i].interviewername===""&&allTasksEng[i].chainCreatorEmail !== ""&&allTasksEng[i].chainCreator!==allTasksEng[i].name){
                optionList.innerHTML =
                    allTasksEng[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasksEng[i].chain)+
                    " - אישור רישום ל" +allTasksEng[i].chainCreator
                    ;
                optionDiv.append(optionList);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            if(allTasksEng[i].interviewername!==""){
                optionList.innerHTML =
                    allTasksEng[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasksEng[i].chain)+
                    " - אישור רישום ל" +allTasksEng[i].interviewername
                    ;
                optionDiv.append(optionList);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            
            optionInput.classList.add("form-check-label");

        }
        if (
            allTasksEng[i].type === "addcreator" &&
            allTasksEng[i].chainCreatorEmail !== ""
        ) {
            ////////6
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex");
            optionDiv.classList.add("flex-row");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkaddcreator";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "addcreator" + allTasksEng[i].row;
            optionList.innerHTML =
                "להוסיף את " +
                allTasksEng[i].chainCreator +
                " " +
                allTasksEng[i].chainCreatorEmail +
                " לפגישה בשרשרת " +
                shortChainName(allTasksEng[i].chain) +
                " בתאריך " +
                recDate;
        
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
    }
}
setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
}, 5000);

function taskAlreadyExist(task) {
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].row === task.row && allTasks[i].type === task.type)
            return true;
    }
    return false;
}
function taskAlreadyExistEng(task) {
    for (var i = 0; i < allTasksEng.length; i++) {
        if (allTasksEng[i].row === task.row && allTasksEng[i].type === task.type)
            return true;
    }
    return false;
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
                    creator: ele.creator,
                    creatorEmail:ele.creatoremail
                };
                if (newChain.creator !== "") {
                    allChains.push(newChain);
                }
                
            });
            console.log(allChains);
        });
}

function check(ele) {
    var splitId = ele.id.split("Check");
    var type = splitId[1];
    var row = splitId[0];
    console.log(ele.id);
    if (document.getElementById(row + "Check" + type).checked) {
        changeStatus(row, type, "remove");
        document.getElementById(type + "" + row).style.textDecoration =
            "line-through";
        console.log("type:" + type + " row:" + row + " checked");
    } else {
        changeStatus(row, type, "add");
        document.getElementById(type + "" + row).style.textDecoration = "none";
        console.log("type:" + type + " row:" + row + " unchecked");
    }
}
function checkEng(ele) {
    var splitId = ele.id.split("Check");
    var type = splitId[1];
    var row = splitId[0];
    console.log(ele.id);
    if (document.getElementById(row + "Check" + type).checked) {
        changeStatusEng(row, type, "remove");
        document.getElementById(type + "" + row).style.textDecoration =
            "line-through";
        console.log("type:" + type + " row:" + row + " checked");
    } else {
        changeStatusEng(row, type, "add");
        document.getElementById(type + "" + row).style.textDecoration = "none";
        console.log("type:" + type + " row:" + row + " unchecked");
    }
}
function changeStatus(row, type, action) {
    var updatedStatus;
    if (row === 0) {
        alert("נא לבחור מישהו מהטבלה כדי לשנות");
    }
    if (action === "add") {
        updatedStatus = "active";
    }
    if (action === "remove") {
        updatedStatus = "completed";
    }
    send2sendData(row, type, updatedStatus);
    return updatedStatus;
}
function changeStatusEng(row, type, action) {
    var updatedStatus;
    if (row === 0) {
        alert("נא לבחור מישהו מהטבלה כדי לשנות");
    }
    if (action === "add") {
        updatedStatus = "active";
    }
    if (action === "remove") {
        updatedStatus = "completed";
    }
    send2sendDataEng(row, type, updatedStatus);
    return updatedStatus;
}
function send2sendData(row, type, updatedStatus) {
    const temp = {
        text: updatedStatus,
        row: row,
        col: type,
    };
    if (row > 0) {
        sendData(temp);
    }
}
function send2sendDataEng(row, type, updatedStatus) {
    const temp = {
        text: updatedStatus,
        row: row,
        col: type,
    };
    if (row > 0) {
        sendDataEng(temp);
    }
}
function sendData(obj) {
    console.log(obj);
    let formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    console.log(obj);
    fetch(taskurl, {
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
function sendDataEng(obj) {
    console.log(obj);
    let formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    console.log(obj);
    fetch(taskurlEng, {
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
function getPersonFromRow(row) {
    for (var i = 0; i < allPeople.length; i++) {
        if (row === allPeople[i].row) {
            return allPeople[i];
        }
    }
    return;
}
function getPersonFromRowEng(row) {
    for (var i = 0; i < allPeopleEng.length; i++) {
        if (row === allPeopleEng[i].row) {
            return allPeopleEng[i];
        }
    }
    return;
}

function preMessDate(date) {
    var prev = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    prev.setDate(date.getDate() - 1);
    if (prev.getDay() === 6) {
        prev.setDate(date.getDate() - 2);
    }
    prev.setHours(0, 0, 0);
    return prev;
}

function postMessDate(date) {
    var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    next.setDate(date.getDate() + 1);
    if (next.getDay() === 6) {
        next.setDate(date.getDate() + 2);
    }
    next.setHours(0, 0, 0);
    return next;
}

function postMessInviteDate(date) {
    var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    next.setDate(date.getDate() + 4);
    if (next.getDay() === 6) {
        next.setDate(date.getDate() + 5);
    }
    next.setHours(0, 0, 0);
    return next;
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
        document.getElementById("toNewChain").innerHTML="פתיחת שרשרת חדשה";
        document.getElementById("toNewChain").onclick=function() { window.location.href='./newChain.html';};
       document.getElementById("toStuckMes").innerHTML="חרוזים אחרונים";
        document.getElementById("toStuckMes").onclick=function() { window.location.href='./stuckMes.html';};
        document.getElementById("toChangeCRM").innerHTML="עדכון תוצרים ותיקונים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRM.html';};
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
        document.getElementById("toNewChain").innerHTML="Eng פתיחת שרשרת";
        document.getElementById("toNewChain").onclick=function() { window.location.href='';};
       document.getElementById("toStuckMes").innerHTML="Eng חרוזים אחרונים";
        document.getElementById("toStuckMes").onclick=function() { window.location.href='';};
        document.getElementById("toChangeCRM").innerHTML="Eng עדכון ותיקון תוצרים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRMEng.html';};
    }
}
