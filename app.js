var newPerson = {};
var size = 0;
var allPeople = [];
var list = document.getElementById("list");
var optionList;
var optionDiv;
var optionInput;
var day;
var month;
var recDate;
var tableRow = 2;
var newTask = {};
var allTasks = [];
var tasks4lols = [];
var tasks4person;
var tasks4personB4 = {};
var allChains = [];
var newChain = {};
const url =
    "https://script.google.com/macros/s/AKfycbyQXy8gZKTpDz9miNib4Vtx8vVz2Ank_TDXOuME6FFMoV3OjcsdIi7w1dPG-vZ5mjYVCw/exec";
const taskurl =
    "https://script.google.com/macros/s/AKfycbwiP2oOmKB3ynoXXV_ZrLv3L82-TtQE4fF92rY0i5lO1xWhgt82DlVV-YTztHzNe8sSAw/exec";
const chainDataURL =
    "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
var today = new Date();
var todaysDay = today.getDate();
var todaysMonth = today.getMonth() + 1;
var todaysCurrentDate = todaysDay + "." + todaysMonth;
console.log("today: " + today);
getData();

function getData() {
    getTasksDataFromPerson();
    getChainData();
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
                    timeformsent: new Date(ele.timeformsent),
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
                    newPerson.recordingdate = new Date(ele.recordingdate);
                if (ele.fixedrecordingdate !== "")
                    newPerson.recordingdate = new Date(ele.fixedrecordingdate);
                if (newPerson.recordingdate !== "") {
                    newPerson.premessdate = new Date(
                        preMessDate(newPerson.recordingdate)
                    );
                    newPerson.postmessdate = new Date(
                        postMessDate(newPerson.recordingdate)
                    );
                    newPerson.postmessinvitedate = new Date(
                        postMessInviteDate(newPerson.recordingdate)
                    );
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
                        if (
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

function getTasksDataFromPerson() {
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
            optionList = document.createElement("dt");
            optionList.id = "label";
            optionList.innerHTML =
                "מומלץ לבדוק גם בלוח השנה למקרה שיש הקלטה שאינה כתובה בCRM";
            list.append(optionList);
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
                allTasks[i].name + " - " + recDate + " - הזמנה להקלטה";
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
                allTasks[i].name + " - " + recDate + " - הזמנה לוואטסאפ חרוזים";
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
                allTasks[i].name + " - " + recDate + " - לינקים לתוצרים";
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
            optionList.innerHTML =
                allTasks[i].interviewername +
                " - " +
                recDate +
                " - פוסט על " +
                allTasks[i].name;
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
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
                allTasks[i].name + " - " + recDate + " - לינקים להזמנת אורח";
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
            optionList.innerHTML =
                allTasks[i].interviewername +
                " - " +
                recDate +
                " - אישור רישום של " +
                allTasks[i].name;
            optionInput.classList.add("form-check-label");
            optionDiv.append(optionList);
            list.append(optionDiv);
            list.append(document.createElement("br"));
            size++;
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
            /* if (allTasks[i].chainCreatorEmail === "") {
              optionList.innerHTML =
                "להוסיף את יוצר/ת שרשרת " +
                shortChainName(allTasks[i].chain) +
                " לאירוע ביומן של " +
                allTasks[i].name +
                " בתאריך " +
                recDate;
            }*/
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
}, 2050);

function taskAlreadyExist(task) {
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].row === task.row && allTasks[i].type === task.type)
            return true;
    }
    return false;
}

function getChainData() {
    var peopleEmails = [];
    var newPersonEmail = {};
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            json.data.forEach((ele) => {
                newPersonEmail = {
                    name: ele.name,
                    email: ele.email,
                };
                if (ele.fixedname !== "") newPersonEmail.name = ele.fixedname;
                if (ele.fixedemail !== "") newPersonEmail.email = ele.fixedemail;
                peopleEmails.push(newPersonEmail);
            });
        });
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
                    creatorEmail: "",
                };
                if (newChain.creator !== "") {
                    for (var i = 0; i < peopleEmails.length; i++) {
                        if (
                            newChain.creator === peopleEmails[i].name &&
                            peopleEmails[i].email !== ""
                        ) {
                            newChain.creatorEmail = peopleEmails[i].email;
                        }
                    }
                    allChains.push(newChain);
                }
            });
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

function getPersonFromRow(row) {
    for (var i = 0; i < allPeople.length; i++) {
        if (row === allPeople[i].row) {
            // console.log(allPeople[i].name);
            return allPeople[i];
        }
    }
    return;
}

function preMessDate(date) {
    var prev = new Date(date.getTime());
    prev.setDate(date.getDate() - 1);
    if (prev.getDay() === 6) {
        prev.setDate(date.getDate() - 2);
    }
    prev.setHours(0, 0, 0);
    return prev;
}

function postMessDate(date) {
    var next = new Date(date.getTime());
    next.setDate(date.getDate() + 1);
    if (next.getDay() === 6) {
        next.setDate(date.getDate() + 2);
    }
    next.setHours(0, 0, 0);
    return next;
}

function postMessInviteDate(date) {
    var next = new Date(date.getTime());
    next.setDate(date.getDate() + 3);
    if (next.getDay() === 6) {
        next.setDate(date.getDate() + 4);
    }
    next.setHours(0, 0, 0);
    return next;
}
