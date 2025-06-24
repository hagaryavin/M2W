
var newPerson = {};
var size = 0;
var allPeople = [];
var allPeopleEng = [];
var list = document.getElementById("list");
var optionList;
var optionDiv;
var optionInput;
var optionBut;
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
var preMessDateVal=-1;
var postMessDateVal=1;
var postMessInviteDateVal=4;
var nullTask=[];
var clipsToChange=0;
var indiclipsToChange=0;
var loaderStatus = document.getElementById("loaderStatus");
const url =
    "https://script.google.com/macros/s/AKfycbyQXy8gZKTpDz9miNib4Vtx8vVz2Ank_TDXOuME6FFMoV3OjcsdIi7w1dPG-vZ5mjYVCw/exec";
const urlEng="https://script.google.com/macros/s/AKfycbwif1D1ZdoI1iYaL2Hya5Jke8UIFaoPxMo2Jkvd3cNytK35UIGbJZ0NKwhiYJQgana8-A/exec";
const taskurl =
    "https://script.google.com/macros/s/AKfycbxkrk_yRhO2mlPgHi8KuzvKY9B0UXH34bMTqw-7UAScxJp1OXaWXAZiHAq4UUMp7UmRVg/exec";
const taskurlEng=
      "https://script.google.com/macros/s/AKfycbzYtYrEAehCXxvYkU5V6KuwwWUPrwwuAPv8pG-E__kh5GMBvmVqdJKqzqbUt02sNCRt/exec";
const chainDataURL =
    "https://script.google.com/macros/s/AKfycbzh6afzt8FHJ8DC7eACCbofDucc-K5gupE09xeMpkbnveNbrWJZAkdqiShaYrb-AyiTlg/exec";

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
       getTimingData();
       setTimeout(() => {
             getChainData();

    }, 300); 
    setTimeout(() => {
      getData();
      getDataEng();
    }, 6000);   
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
        json.data.forEach((ele, index) => { 
            const newPerson = {
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
                    linkfull: ele.linkfull,
                    id:ele.id
                };
                
                tableRow++;
            
                
                setTimeout(() => {
                    if (newPerson.id) {
                        loaderStatus.innerHTML = "בודקת חרוז " + newPerson.id + "...";
                        console.log("בודקת חרוז " + newPerson.id);
                    }
                    if (index === json.data.length - 2) { 
                        setTimeout(() => {
                            loaderStatus.style.display = "none";
                            const loader = document.getElementById("loader");
                            loader.style.display = "none";
                        }, 20);
                    }
                }, Math.max(0, index*20-6000));  
            
                if (ele.fixedname !== "") newPerson.name = ele.fixedname;
                if (ele.fixedinterviewername !== "")
                    newPerson.interviewername = ele.fixedinterviewername;
                if (newPerson.chain === "") {
                    if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
                    if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
                    if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
                }
                if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
                if (ele.recordingdate !== "")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
                if (ele.fixedrecordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
                if(ele.recordingdate === ""&&ele.fixedrecordingdate === ""&&ele.submittedvid!==""){
                    newPerson.recordingdate=addDate(newPerson);
                 } 
                if(ele.name==="הגר יבין"){
                    clipsToChange=ele.fixedphone;
                    document.getElementById("clipsB4").innerHTML=clipsToChange+" קליפים חדשים להפוך לשורטים";
                    indiclipsToChange=ele.fixedinterviewerphone;
                    document.getElementById("indiclipsB4").innerHTML=indiclipsToChange+" קליפים עצמאיים להפוך לשורטים";
                }
                if (newPerson.recordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך") {
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
                                newPerson.premessdate.getYear() === today.getYear())) 
                        ){
                         if(getTasksDataFromPersonCont(newPerson.row, "premess") === "not yet"&&!nullTask.includes("premess")) {
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
                         if(getTasksDataFromPersonCont(newPerson.row, "premessemail") === "not yet"&&!nullTask.includes("premessemail")) {
                            //////1 condition
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "premessemail",
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
                        newPerson.timeformsent < today ||
                        (newPerson.timeformsent.getDate() === today.getDate() &&
                            newPerson.timeformsent.getMonth() === today.getMonth() &&
                            newPerson.timeformsent.getYear() === today.getYear())
                    ) {
                        //////6,7 condition
                        if (
                            getTasksDataFromPersonCont(newPerson.row, "confirm") === "not yet"&&!nullTask.includes("confirm")
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
                            cleanName(newPerson.name) !== cleanName(newPerson.chainCreator) &&
                            getTasksDataFromPersonCont(newPerson.row, "addcreator") ===
                            "not yet"&&!nullTask.includes("addcreator")
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
                        "not yet"&&!nullTask.includes("rightaftermess")
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
                            "not yet"&&!nullTask.includes("postmess")
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
                            some1tosend(newPerson.name,newPerson.interviewername,getCreatorFromChain(newPerson.chain))&&
                            getTasksDataFromPersonCont(newPerson.row, "socialpost") ===
                            "not yet"&&!nullTask.includes("socialpost")
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
                        newPerson.linkfull !== "" &&getTasksDataFromPersonCont(newPerson.row, "postmessinvite") ===
                        "not yet"&&!nullTask.includes("postmessinvite")
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
                    linkfull: ele.linkfull,
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
                if (ele.fixedrecordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך")
                    newPerson.recordingdate = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
                if(ele.recordingdate === ""&&ele.fixedrecordingdate === ""&&ele.submittedvid!==""){
                    newPerson.recordingdate=addDateEng(newPerson);
                 } 
                if (newPerson.recordingdate !== ""&&ele.fixedrecordingdate!=="ללא תאריך") {
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
                    if 
                        (newPerson.premessdate < today ||
                            (newPerson.premessdate.getDate() === today.getDate() &&
                                newPerson.premessdate.getMonth() === today.getMonth() &&
                                newPerson.premessdate.getYear() === today.getYear())){
                            if(getTasksDataFromPersonContEng(newPerson.row, "premess") === "not yet"&&!nullTask.includes("premess")) {
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
                     if(getTasksDataFromPersonContEng(newPerson.row, "premessemail") === "not yet"&&!nullTask.includes("premessemail")) {
                            //////1 condition
                            newTask = {
                                name: newPerson.name,
                                interviewername: newPerson.interviewername,
                                recordingdate: newPerson.recordingdate,
                                chain: newPerson.chain,
                                chainCreator: newPerson.chainCreator,
                                chainCreatorEmail: newPerson.chainCreatorEmail,
                                type: "premessemail",
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
                        newPerson.timeformsent < today ||
                        (newPerson.timeformsent.getDate() === today.getDate() &&
                            newPerson.timeformsent.getMonth() === today.getMonth() &&
                            newPerson.timeformsent.getYear() === today.getYear())
                    ) {
                        //////6,7 condition
                        if (
                            getTasksDataFromPersonContEng(newPerson.row, "confirm") === "not yet"&&!nullTask.includes("confirm")
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
                            cleanName(newPerson.name) !== cleanName(newPerson.chainCreator) &&
                            getTasksDataFromPersonContEng(newPerson.row, "addcreator") ===
                            "not yet"&&newPerson.qa===false&&!nullTask.includes("addcreator")
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
                        "not yet"&&newPerson.qa===false&&!nullTask.includes("rightaftermess")
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
                            "not yet"&&newPerson.qa===false&&!nullTask.includes("postmess")
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
                            some1tosend(newPerson.name,newPerson.interviewername,getCreatorFromChain(newPerson.chain)) &&
                            getTasksDataFromPersonContEng(newPerson.row, "socialpost") ===
                            "not yet"&&!nullTask.includes("socialpost")
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
                        newPerson.linkfull !== "" &&getTasksDataFromPersonContEng(newPerson.row, "postmessinvite") ===
                        "not yet"&&newPerson.qa===false&&!nullTask.includes("postmessinvite")
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
                    premessemailstatus: ele.premessemail13,
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
                    premessemailstatus: ele.premessemail13,
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
            if (type === "premessemail") {
                result = tasks4lols[i].premessemailstatus;
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
            if (type === "premessemail") {
                result = tasks4lolsEng[i].premessemailstatus;
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
                    premessemailstatus: ele.premessemail13
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
                if (tasks4person.premessemailstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "premessemail",
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
                    addcreatorstatus: ele.addcreator7,
                    premessemailstatus: ele.premessemail13,

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
                if (tasks4personEng.premessemailstatus === "active") {
                    newTask = {
                        name: currPerson.name,
                        interviewername: currPerson.interviewername,
                        recordingdate: currPerson.recordingdate,
                        chain: currPerson.chain,
                        chainCreator: currPerson.chainCreator,
                        chainCreatorEmail: currPerson.chainCreatorEmail,
                        type: "premessemail",
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
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - הזמנה להקלטה - ";
            optionInput.classList.add("form-check-label");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./preMes.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);            
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
           if (allTasks[i].type === "premessemail") {
            /////1
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
            optionInput = document.createElement("input");
            optionInput.id = allTasks[i].row + "Checkpremessemail";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                check(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "premessemail" + allTasks[i].row;
            optionList.innerHTML =
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - הזמנה להקלטה במייל - ";
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./preMes.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "rightaftermess") {
            ///////2
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - וואטסאפ חרוזים - ";
            optionInput.classList.add("form-check-label");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./rightAfterMes.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "postmess") {
            //////3
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - לינקים לתוצרים - ";
            optionInput.classList.add("form-check-input");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./postMes.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "socialpost") {
            ////////5
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./socialPost.html?'+params;
            });
            if(allTasks[i].interviewername!=="יעל מילוא"&&
               allTasks[i].interviewername!==""&&
               allTasks[i].interviewername!==allTasks[i].name&&
               (allTasks[i].chainCreator===""||
                cleanName(allTasks[i].interviewername)===cleanName(allTasks[i].chainCreator)||
               cleanName(allTasks[i].chainCreator)===cleanName(allTasks[i].name))
              )
               {
                   
                optionList.innerHTML =allTasks[i].name+" - " +recDate +" - "+shortChainName(allTasks[i].chain)+" - פוסט ל"+allTasks[i].interviewername+" - ";
                 list.append(optionDiv);
                list.append(document.createElement("br"));
                    optionDiv.append(optionList);
                    optionDiv.append(optionBut);

            size++;
            }
            else if(
                allTasks[i].chainCreator!==""&&
                cleanName(allTasks[i].chainCreator)!==cleanName(allTasks[i].name)&&
                (allTasks[i].interviewername==="יעל מילוא"||
                 allTasks[i].interviewername===""||
                 cleanName(allTasks[i].interviewername)===cleanName(allTasks[i].chainCreator)||
                 allTasks[i].interviewername===allTasks[i].name
                )
              ){
                optionList.innerHTML =allTasks[i].name+" - " +recDate +" - "+shortChainName(allTasks[i].chain)+" - פוסט ל"+allTasks[i].chainCreator+" - ";
                 list.append(optionDiv);
                list.append(document.createElement("br"));
                   optionDiv.append(optionList);
                    optionDiv.append(optionBut);

            size++;
            }
            
            else if(allTasks[i].interviewername!=="יעל מילוא"&&
                allTasks[i].interviewername!==""&&
               cleanName(allTasks[i].interviewername)!==cleanName(allTasks[i].chainCreator)&&
               allTasks[i].chainCreator!== ""&&
               cleanName(allTasks[i].chainCreator)!==cleanName(allTasks[i].name)&&
               allTasks[i].interviewername!==allTasks[i].name
              ){
                optionList.innerHTML =allTasks[i].name+" - " +recDate +" - "+shortChainName(allTasks[i].chain)+" - פוסט ל"+allTasks[i].interviewername+" ול"+allTasks[i].chainCreator+" - ";
                 list.append(optionDiv);
                list.append(document.createElement("br"));
                  optionDiv.append(optionList);
                optionDiv.append(optionBut);

            size++;
            }
            optionInput.classList.add("form-check-label");
           
            
        }
        if (allTasks[i].type === "postmessinvite") {
            //////4
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasks[i].name + " - " + recDate +" - "+shortChainName(allTasks[i].chain)+ " - לינקים לאורח - ";
            optionInput.classList.add("form-check-label");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params='name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./postMesInvite.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);            
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasks[i].type === "confirm") {
            ////////6
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasks[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasks[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./preMes.html?'+params;
            });
            if(
                allTasks[i].chainCreator!==""&&
                (allTasks[i].interviewername==="יעל מילוא"||
                 allTasks[i].interviewername===""||
                 cleanName(allTasks[i].interviewername)===cleanName(allTasks[i].chainCreator)||
                 allTasks[i].interviewername===allTasks[i].name
                )
              ){
                
                optionList.innerHTML =
                    allTasks[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasks[i].chain)+
                    " - אישור רישום ל" +allTasks[i].chainCreator+" - "
                    ;
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            else if(allTasks[i].interviewername!=="יעל מילוא"&&
               allTasks[i].interviewername!==""&&
               allTasks[i].interviewername!==allTasks[i].name&&
               (allTasks[i].chainCreator===""||
                cleanName(allTasks[i].interviewername)===cleanName(allTasks[i].chainCreator)||
               cleanName(allTasks[i].chainCreator)===cleanName(allTasks[i].name))
              )
               {
                optionList.innerHTML =
                    allTasks[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasks[i].chain)+
                    " - אישור רישום ל" +allTasks[i].interviewername+" - "
                    ;
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            else if(allTasks[i].interviewername!=="יעל מילוא"&&
                allTasks[i].interviewername!==""&&
               cleanName(allTasks[i].interviewername)!==cleanName(allTasks[i].chainCreator)&&
               allTasks[i].chainCreator!== ""&&
               cleanName(allTasks[i].chainCreator)!==cleanName(allTasks[i].name)&&
               allTasks[i].interviewername!==allTasks[i].name
              ){
                optionList.innerHTML =
                    allTasks[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasks[i].chain)+
                    " - אישור רישום ל" +allTasks[i].interviewername+" ול"+allTasks[i].chainCreator+" - ";
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            else if(
                 (allTasks[i].interviewername===""&&
               allTasks[i].chainCreator=== "")||
                (allTasks[i].interviewername==="יעל מילוא"&&
               allTasks[i].chainCreator=== "")
              ){
                optionList.innerHTML =
                    allTasks[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasks[i].chain)+
                    " - אישור רישום ל" +allTasks[i].name+" - ";
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
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
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - הזמנה להקלטה - ";
            optionInput.classList.add("form-check-label");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasksEng[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasksEng[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./preMesEng.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "premessemail") {
            /////13
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
            optionInput = document.createElement("input");
            optionInput.id = allTasksEng[i].row + "Checkpremessemail";
            optionInput.type = "checkbox";
            optionInput.classList.add("form-check-input");
            optionInput.addEventListener("click", function () {
                checkEng(this);
            });
            optionDiv.append(optionInput);
            optionList = document.createElement("label");
            optionList.id = "premessemail" + allTasksEng[i].row;
            optionList.innerHTML =
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - הזמנה להקלטה במייל - ";
            optionInput.classList.add("form-check-label");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasksEng[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasksEng[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./preMesEng.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
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
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - לינקים לתוצרים - ";
            optionInput.classList.add("form-check-input");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasksEng[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasksEng[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./postMesEng.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "socialpost") {
            ////////5
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasksEng[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasksEng[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./socialPostEng.html?'+params;
            });
            if(allTasksEng[i].interviewername!=="יעל מילוא"&&
               allTasksEng[i].interviewername!==""&&
               allTasksEng[i].interviewername!==allTasksEng[i].name&&
               (allTasksEng[i].chainCreator===""||
                cleanName(allTasksEng[i].interviewername)===cleanName(allTasksEng[i].chainCreator)||
               cleanName(allTasksEng[i].chainCreator)===cleanName(allTasksEng[i].name))
              )
               {
                optionList.innerHTML =allTasksEng[i].name+" - " +recDate +" - "+shortChainName(allTasksEng[i].chain)+" - פוסט ל"+allTasksEng[i].interviewername+" - ";
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);
                optionDiv.append(optionBut);

            size++;
            }
            else if(
                allTasksEng[i].chainCreator!==""&&
                cleanName(allTasksEng[i].chainCreator)!==cleanName(allTasksEng[i].name)&&
                (allTasksEng[i].interviewername==="יעל מילוא"||
                 allTasksEng[i].interviewername===""||
                 cleanName(allTasksEng[i].interviewername)===cleanName(allTasksEng[i].chainCreator)||
                 allTasksEng[i].interviewername===allTasksEng[i].name
                )
              ){
                optionList.innerHTML =allTasksEng[i].name+" - " +recDate +" - "+shortChainName(allTasksEng[i].chain)+" - פוסט ל"+allTasksEng[i].chainCreator+" - ";
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);
                optionDiv.append(optionBut);

            size++;
            }
            else if(allTasksEng[i].interviewername!=="יעל מילוא"&&
                allTasksEng[i].interviewername!==""&&
               cleanName(allTasksEng[i].interviewername)!==cleanName(allTasksEng[i].chainCreator)&&
               allTasksEng[i].chainCreator!== ""&&
               cleanName(allTasksEng[i].chainCreator)!==cleanName(allTasksEng[i].name)&&
               allTasksEng[i].interviewername!==allTasksEng[i].name
              ){
                optionList.innerHTML =allTasksEng[i].name+" - " +recDate +" - "+shortChainName(allTasksEng[i].chain)+" - פוסט ל"+allTasksEng[i].interviewername+" ול"+allTasksEng[i].chainCreator+" - ";
                 list.append(optionDiv);
            list.append(document.createElement("br"));
                    optionDiv.append(optionList);
                    optionDiv.append(optionBut);

            size++;
            }
            optionInput.classList.add("form-check-label");
           
            
        }
        if (allTasksEng[i].type === "postmessinvite") {
            //////4
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
                allTasksEng[i].name + " - " + recDate +" - "+shortChainName(allTasksEng[i].chain)+ " - לינקים לאורח - ";
            optionInput.classList.add("form-check-label");
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasksEng[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasksEng[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./postMesInviteEng.html?'+params;
            });
            optionDiv.append(optionList);
            optionDiv.append(optionBut);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
        }
        if (allTasksEng[i].type === "confirm") {
            ////////6
            optionDiv = document.createElement("div");
            optionDiv.classList.add("d-inline-flex", "flex-row", "gap-3", "align-items-center");
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
            optionBut=document.createElement("button");
            optionBut.innerHTML="ביצוע";
            optionBut.classList.add("btn", "btn-light");
            const params= 'name='+encodeURIComponent(allTasksEng[i].name)+'&chain='+encodeURIComponent(shortChainName(allTasksEng[i].chain));
             optionBut.addEventListener("click", function () {
                window.location.href='./preMesEng.html?'+params;
            });
            if(
                allTasksEng[i].chainCreator!==""&&
                (allTasksEng[i].interviewername==="יעל מילוא"||
                 allTasksEng[i].interviewername===""||
                 cleanName(allTasksEng[i].interviewername)===cleanName(allTasksEng[i].chainCreator)||
                 allTasksEng[i].interviewername===allTasksEng[i].name
                )
              ){
                optionList.innerHTML =
                    allTasksEng[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasksEng[i].chain)+
                    " - אישור רישום ל" +allTasksEng[i].chainCreator+" - "
                    ;
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            else if(allTasksEng[i].interviewername!=="יעל מילוא"&&
               allTasksEng[i].interviewername!==""&&
               allTasksEng[i].interviewername!==allTasksEng[i].name&&
               (allTasksEng[i].chainCreator===""||
                cleanName(allTasksEng[i].interviewername)===cleanName(allTasksEng[i].chainCreator)||
               cleanName(allTasksEng[i].chainCreator)===cleanName(allTasksEng[i].name))
              )
               {
                optionList.innerHTML =
                    allTasksEng[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasksEng[i].chain)+
                    " - אישור רישום ל" +allTasksEng[i].interviewername+" - "
                    ;
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
            }
            else if(allTasksEng[i].interviewername!=="יעל מילוא"&&
                allTasksEng[i].interviewername!==""&&
               cleanName(allTasksEng[i].interviewername)!==cleanName(allTasksEng[i].chainCreator)&&
               allTasksEng[i].chainCreator!== ""&&
               cleanName(allTasksEng[i].chainCreator)!==cleanName(allTasksEng[i].name)&&
               allTasksEng[i].interviewername!==allTasksEng[i].name
              ){
                optionList.innerHTML =
                    allTasksEng[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasksEng[i].chain)+
                    " - אישור רישום ל" +allTasksEng[i].interviewername
                    +" ול"+allTasksEng[i].chainCreator+" - ";
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
                list.append(optionDiv);
                list.append(document.createElement("br"));
                size++;
                
            }
            else if(
                (allTasksEng[i].interviewername===""&&
               allTasksEng[i].chainCreator=== "")||
                (allTasksEng[i].interviewername==="יעל מילוא"&&
               allTasksEng[i].chainCreator=== "")
              ){
                optionList.innerHTML =
                    allTasksEng[i].name
                     +
                    " - " +
                    recDate +" - "+shortChainName(allTasksEng[i].chain)+
                    " - אישור רישום ל" +allTasksEng[i].name+" - ";
                optionDiv.append(optionList);
                optionDiv.append(optionBut);
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
loaderStatus.innerHTML = "מתחילה בדיקת נתונים...";

setTimeout(() => {
    
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
        
            json.data.chains.forEach((ele, index) => {
                const newChain = {
                    name: ele.name,
                    altName: ele.othername,
                    creator: ele.creator,
                    creatorEmail:ele.creatoremail
                };
                
                setTimeout(() => {
                    if (newChain.name) {
                        loaderStatus.innerHTML = "בודקת שרשרת " + newChain.name + "...";
                        console.log("בודקת שרשרת " + newChain.name);
                    }
                    if (index === json.data.length - 2) { 
                        setTimeout(() => {
                            loaderStatus.style.display = "none";
                            const loader = document.getElementById("loader");
                            loader.style.display = "none";
                        }, 20);
                    }
                }, Math.max(0, index*55))  
                
                if (newChain.creator !== "") {
                    allChains.push(newChain);
                }
                
            });
            console.log(allChains);
        });
}

function getTimingData() {

    fetch(chainDataURL)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.taskTiming.forEach((ele) => {
                                        loaderStatus.innerHTML = "בודקת תזמוני משימות...";

                /*var timing = {
                   
                    taskName:ele.taskname,
                    daysFromRecordingDate:ele.daysfromrecordingdate,
                    daysFromSignDate:ele.daysfromsigndate,
                    daysToDeleteTask:ele.daystodeletetask
                    			
                };*/
               if(ele.taskname==="premess"&&ele.daysfromrecordingdate!==""){
                        preMessDateVal=ele.daysfromrecordingdate;
                    
                    console.log("changed preMessDateVal - "+preMessDateVal);
                }
                if(ele.taskname==="postmess"&&ele.daysfromrecordingdate!==""){
                    postMessDateVal=ele.daysfromrecordingdate;
                                        console.log("changed postMessDateVal - "+postMessDateVal);

                }
                if(ele.taskname==="postmessinvite"&&ele.daysfromrecordingdate){
                    postMessInviteDateVal=ele.daysfromrecordingdate;
                                        console.log("changed postMessInviteDateVal - "+postMessInviteDateVal);

                }
                //console.log(timing);
                if(ele.daysfromrecordingdate===""&&ele.daysfromsigndate===""&&ele.daystodeletetask===""){
                   nullTask.push(ele.taskname)
               } 
                
            });
            console.log("null Tasks: "+nullTask);

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
function changeClips(id) {
     var chosenCol=id;
    
    if(id==="guestphone"){
        var textEntered=document.getElementById("clips").value;
        console.log("clipsB4: "+clipsToChange);
        var dataElement=document.getElementById("clipsChange");
        var ogSum=clipsToChange;
    }
    if(id==="interphone"){
        var textEntered=document.getElementById("indiclips").value;
        console.log("indiclipsB4: "+clipsToChange);
        var dataElement=document.getElementById("indiclipsChange");
        var ogSum=indiclipsToChange;
    }
      console.log("col: " + chosenCol);
    if(textEntered===""){
        textEntered=0;
    }
          var temp = {
            text: parseInt(parseInt(textEntered)+parseInt(ogSum)),
            row: 97,
            col: chosenCol,
          };
        sendData2(temp,dataElement);
        dataElement.innerHTML="כמות הקליפים התעדכנה";
    
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
function sendData2(obj, ele) {
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
function some1tosend(gst,intr,crtr){
    gst=cleanName(gst);
    intr=cleanName(intr);
    crtr=cleanName(crtr);
    if((crtr===""&&intr==="")||(crtr===gst&&intr===gst)||(crtr===""&&intr===gst)||(intr===""&&crtr===gst)||(intr==="יעל מילוא"&&crtr===gst)||(intr==="יעל מילוא"&&crtr==="")){
       return false;}
    return true;
}
function getCreatorFromChain(chn) {
    for (var i = 0; i < allChains.length; i++) {
        if (
            allChains[i].name === shortChainName(chn) ||
            allChains[i].altname === shortChainName(chn)
        ) {
            return allChains[i].creator;
       }
    }
    return "";
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
function toSendAMes(guestName,interName,creatorName){
    if(interName===""&&creatorName==="")
        return false;
    if(interName===""&&guestName===creatorName)
        return false;
    if(creatorName===""&&guestName===interName)
        return false;
    return true;
}
function addDate(person){
    var newDate=(person.timeformsent.getMonth()+1)+"/"+person.timeformsent.getDate()+"/"+person.timeformsent.getFullYear();
    console.log(newDate);
     const obj = {
        text: newDate,
        row: person.row,
        col: 'date'
    };
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
    return changeTimeZone(new Date(newDate), 'Asia/Jerusalem');
}
function addDateEng(person){
    var newDate=(person.timeformsent.getMonth()+1)+"/"+person.timeformsent.getDate()+"/"+person.timeformsent.getFullYear();
     console.log(newDate);
    const obj = {
        text: newDate,
        row: person.row,
        col: 'date'
    };
    console.log(obj);
    let formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    console.log(obj);
    fetch(urlEng, {
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
    return changeTimeZone(new Date(newDate), 'Asia/Jerusalem');
}
function cleanName(name){
    var possibleStarts=[
        "דר. ",
        'ד"ר ',
        "דוקטור ",
        "פרופסור ",
        "פרופ' ",
        "Dr. ",
        "הרב ",
        "ד״ר ",
        'עו"ד ',
        'עו״ד '
    ];
    for (var i = 0; i < possibleStarts.length; i++) {
        if(name.startsWith(possibleStarts[i])){
            name=name.replace(possibleStarts[i], "");
            return name;
        }
    }
    return name;
}
function preMessDate(date) {
    var prev = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    prev.setDate(date.getDate() +parseInt(preMessDateVal));
    if (prev.getDay() === 6) {
        prev.setDate(prev.getDate() - 1);
    }
    prev.setHours(0, 0, 0);
    return prev;
}

function postMessDate(date) {
    var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    next.setDate(date.getDate() +parseInt(postMessDateVal));
    if (next.getDay() === 6) {
        next.setDate(next.getDate() + 1);
    }
    next.setHours(0, 0, 0);
    return next;
}

function postMessInviteDate(date) {
    var next = changeTimeZone(new Date(date.getTime()), 'Asia/Jerusalem');
    next.setDate(date.getDate() +parseInt(postMessInviteDateVal));
    if (next.getDay() === 6) {
        next.setDate(next.getDate() + 1);
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
        document.getElementById("toNewChain").innerHTML="פתיחת שרשרת/קהילה";
        document.getElementById("toNewChain").onclick=function() { window.location.href='./newChain.html';};
       document.getElementById("toStuckMes").innerHTML="חרוזים אחרונים";
        document.getElementById("toStuckMes").onclick=function() { window.location.href='./stuckMes.html';};
        document.getElementById("toChangeCRM").innerHTML="עדכון תוצרים ותיקונים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRM.html';};
         document.getElementById("toDisplay").innerHTML="הכרטיס";
        document.getElementById("toDisplay").onclick=function() { window.location.href='./display.html';};
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
        document.getElementById("toDisplay").innerHTML="Eng הכרטיס";
        document.getElementById("toDisplay").onclick=function() { window.location.href='';};
        document.getElementById("toChangeCRM").innerHTML="Eng עדכון ותיקון תוצרים";
        document.getElementById("toChangeCRM").onclick=function() { window.location.href='./changeCRMEng.html';};
    }
}
