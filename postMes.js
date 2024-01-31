var options = document.getElementById("people");
var personOption;
var allPeople = [];
var size = 0;
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
var newPerson = {};
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
          chain: ele.chain
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value = newPerson.name;
        options.append(personOption);
        size++;
      });
    });
}
function reset() {
  document.location.reload();
}
function checkPhone(phone) {
  if (phone.length === 10 && phone[0] === "0" && phone[1] === "5") return true;
  return false;
}
function checkInputs() {
  if (
    checkPhone(document.getElementById("guestPhone").value) &&
    document.getElementById("chainsNames").value !== ""
  ) {
    return true;
  }
  return false;
}
function submitData() {
  console.log("hi");
}
function chainDescriptions(name) {
  if (name === "מדע ותודעה") {
    return "לבחור מדענים וחוקרי תודעה.";
  }
  if (name === "מתנדבים") {
    return "לבחור מאלה העוסקים ומקדמים התנדבות בקהילה.";
  }
  if (name === "ריפוי") {
    return "לבחור מאלה העוסקים בריפוי כדרך חיים.";
  }
  if (name === "ספורט") {
    return "לבחור אלה הבוחרים בספורט כדרך חיים.";
  }
  if (name === "נשים") {
    return "לבחור נשים בלבד.";
  }
  if (name === "ים") {
    return "לבחור מאלה הבוחרים בים כדרך חיים.";
  }
  if (name === "חכמת הדרך") {
    return "לבחור מאלה הבוחרים בדרך. מה שקורה בדרך, זו הדרך.";
  }
  if (name === "אקלים" || name === "האקלים") {
    return "לבחור מאלה העוסקים בנושא האקלים על כל רבדיו.";
  }
  if (name === "סרטים") {
    return "לבחור מאלה העוסקים במקצועות אמנות הסרט.";
  }
  if (name === "תיאטרון") {
    return "לבחור אנשים העוסקים בתיאטרון על כל מקצועותיו.";
  }
  if (name === "תקשורת") {
    return "לבחור מאלה העוסקים בתקשורת, מה יש לך להגיד?";
  }
  if (name === "קיימות") {
    return "לבחור מאלה העוסקים בקיימות מכל כיוון.";
  }
  if (name === "רעננה.1962" || name === "1962.רעננה") {
    return "לבחור ממחזור 1962 מרעננה.";
  }
  if (name === "קפיטליזם.קשוב" || name === "קפיטליזם קשוב")
    return "לבחור מהעוסקים והיוצרים של עתיד הקפיטליזם.";

  return "לבחור אנשים שישמחו לספר את סיפורם.";
}
function fixChain() {
  document.getElementById("nameOfChain2").innerHTML = document.getElementById(
    "chainName"
  ).value;
  document.getElementById("descOfChain").innerHTML = chainDescriptions(
    document.getElementById("chainName").value
  );
}
function submit() {
  document.getElementById("postMes").style.visibility = "hidden";
  if (checkInputs()) {
    fixChain();
    document.getElementById("postMes").style.visibility = "visible";
  }
}
function textToCopy(id) {
  var chainName = document.getElementById("chainName").value;
  var chainDesc = chainDescriptions(document.getElementById("chainName").value);
  var textMes1 =
    "*בוקר אור*, היה מקסים להכיר אותך. מצורפות ההודעות להמשך השרשרת. יום טוב.";
  var textMes2 =
    "תודה שהצטרפת *לשרשרת " +
    chainName +
    "* בסיפור555. עכשיו תורך להזמין את האורח/ת הבאה. -" +
    chainDesc +
    " -לקבל אישור על בחירתך מהמראיינ/ת שלך. -לשלוח את ההזמנה וטופס הרישום לאורח/ת שלך. -לבחור את מועד ההקלטה דרך הלינק המצורף. -להיות המראיינ/ת של האורח/ת שלך בהקלטת הסיפור הבא בשרשרת. הסיפור שלך מתפרסם בלינקים המצורפים ביוטיוב ובפודקאסט. הנך מוזמנ/ת לפרסם את ההקלטות במדיות החברתיות שלך ולספר על הפרויקט. *להתראות בסיפור הבא!* הודעות מצורפות: לינק לסיפור שלך ביוטיוב, פרומו 55 שניות לפרסום ברשתות שלך, לינק להזמנה, לינק ללוח ההקלטות, לינק לטופס הרישום. (הלינק לראיון המלא נמצא בפריים הסיום של הסרט 5:55 שלך)";
  var textInvite = "https://tinyurl.com/story555invite";
  var textCalender = "https://bit.ly/story555Calendar";
  var textRegister = "https://tinyurl.com/story555sign";
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "invite") return textInvite;
  if (id === "calender") return textCalender;
  if (id === "register") return textRegister;
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
function phoneForWA(phone) {
  return "972" + phone.slice(1);
}
function mesForWA(id) {
  var chainName = document.getElementById("chainName").value;
  var chainDesc = chainDescriptions(document.getElementById("chainName").value);
  var transChainName = encodeURI(chainName);
  var transChainDesc = encodeURI(chainDesc);
  var textMes1 =
    "*%D7%91%D7%95%D7%A7%D7%A8%20%D7%90%D7%95%D7%A8*,%20%D7%94%D7%99%D7%94%20%D7%9E%D7%A7%D7%A1%D7%99%D7%9D%20%D7%9C%D7%94%D7%9B%D7%99%D7%A8%20%D7%90%D7%95%D7%AA%D7%9A.%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%95%D7%AA%20%D7%94%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA%20%D7%9C%D7%94%D7%9E%D7%A9%D7%9A%20%D7%94%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA.%20%D7%99%D7%95%D7%9D%20%D7%98%D7%95%D7%91.";
  var textMes2 =
    "%D7%AA%D7%95%D7%93%D7%94%20%D7%A9%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%AA%20*%D7%9C%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA%20" +
    transChainName +
    "*%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8555.%0A%D7%A2%D7%9B%D7%A9%D7%99%D7%95%20%D7%AA%D7%95%D7%A8%D7%9A%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%90%D7%AA%20%D7%94%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%94%D7%91%D7%90%D7%94.%0A%0A-" +
    transChainDesc +
    "%0A-%D7%9C%D7%A9%D7%9C%D7%95%D7%97%20%D7%90%D7%AA%20%D7%94%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%95%D7%98%D7%95%D7%A4%D7%A1%20%D7%94%D7%A8%D7%99%D7%A9%D7%95%D7%9D%20%D7%9C%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%A9%D7%9C%D7%9A.%0A-%D7%9C%D7%91%D7%97%D7%95%D7%A8%20%D7%90%D7%AA%20%D7%9E%D7%95%D7%A2%D7%93%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%94%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%9C%D7%99%D7%A0%D7%A7%20%D7%94%D7%9E%D7%A6%D7%95%D7%A8%D7%A3.%0A-%D7%9C%D7%94%D7%99%D7%95%D7%AA%20%D7%94%D7%9E%D7%A8%D7%90%D7%99%D7%99%D7%A0/%D7%AA%20%D7%A9%D7%9C%20%D7%94%D7%90%D7%95%D7%A8%D7%97/%D7%AA%20%D7%A9%D7%9C%D7%9A%20%D7%91%D7%94%D7%A7%D7%9C%D7%98%D7%AA%20%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90%20%D7%91%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA.%0A%0A*%D7%94%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%A9%D7%9C%D7%9A%20%D7%9E%D7%AA%D7%A4%D7%A8%D7%A1%D7%9D*%20%D7%91%D7%9C%D7%99%D7%A0%D7%A7%D7%99%D7%9D%20%D7%94%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%99%D7%9D%20%D7%91%D7%99%D7%95%D7%98%D7%99%D7%95%D7%91%20%D7%95%D7%91%D7%A4%D7%95%D7%93%D7%A7%D7%90%D7%A1%D7%98.%0A%D7%94%D7%A0%D7%9A%20%D7%9E%D7%95%D7%96%D7%9E%D7%A0/%D7%AA%20%D7%9C%D7%A4%D7%A8%D7%A1%D7%9D%20%D7%90%D7%AA%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%95%D7%AA%20%D7%91%D7%9E%D7%93%D7%99%D7%95%D7%AA%20%D7%94%D7%97%D7%91%D7%A8%D7%AA%D7%99%D7%95%D7%AA%20%D7%A9%D7%9C%D7%9A%20%D7%95%D7%9C%D7%A1%D7%A4%D7%A8%20%D7%A2%D7%9C%20%D7%94%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98.%0A%0A*%D7%9C%D7%94%D7%AA%D7%A8%D7%90%D7%95%D7%AA%20%D7%91%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%94%D7%91%D7%90!*%0A%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA%20%D7%9E%D7%A6%D7%95%D7%A8%D7%A4%D7%95%D7%AA:%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%A1%D7%99%D7%A4%D7%95%D7%A8%20%D7%A9%D7%9C%D7%9A%20%D7%91%D7%99%D7%95%D7%98%D7%99%D7%95%D7%91,%20%D7%A4%D7%A8%D7%95%D7%9E%D7%95%2055%20%D7%A9%D7%A0%D7%99%D7%95%D7%AA%20%D7%9C%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%91%D7%A8%D7%A9%D7%AA%D7%95%D7%AA%20%D7%A9%D7%9C%D7%9A,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%94%D7%96%D7%9E%D7%A0%D7%94,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%9C%D7%95%D7%97%20%D7%94%D7%94%D7%A7%D7%9C%D7%98%D7%95%D7%AA,%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%98%D7%95%D7%A4%D7%A1%20%D7%94%D7%A8%D7%99%D7%A9%D7%95%D7%9D.%0A(%D7%94%D7%9C%D7%99%D7%A0%D7%A7%20%D7%9C%D7%A8%D7%90%D7%99%D7%95%D7%9F%20%D7%94%D7%9E%D7%9C%D7%90%20%D7%A0%D7%9E%D7%A6%D7%90%20%D7%91%D7%A4%D7%A8%D7%99%D7%99%D7%9D%20%D7%94%D7%A1%D7%99%D7%95%D7%9D%20%D7%A9%D7%9C%20%D7%94%D7%A1%D7%A8%D7%98%205:55%20%D7%A9%D7%9C%D7%9A)";
  var textInvite = "https://tinyurl.com/story555invite";
  var textCalender = "https://bit.ly/story555Calendar";
  var textRegister = "https://tinyurl.com/story555sign";
  var textLink555;
  if (document.getElementById("link555").value !== "")
    textLink555 = document.getElementById("link555").value;
  var textShort55;
  if (document.getElementById("short55").value !== "")
    textShort55 = document.getElementById("short55").value;
  if (id === "mes1") return textMes1;
  if (id === "mes2") return textMes2;
  if (id === "link555" && document.getElementById("link555").value !== "")
    return textLink555;
  if (id === "short55" && document.getElementById("short55").value !== "")
    return textShort55;
  if (id === "invite") return textInvite;
  if (id === "calender") return textCalender;
  if (id === "register") return textRegister;
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
