<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>M2W - חרוזים אחרונים</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
      crossorigin="anonymous"
    />
    <link href="./style.css" rel="stylesheet" />
    <link rel="icon" href="https://www.svgrepo.com/show/106976/whatsapp.svg" />
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <link
      href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <script>
      var collapseElementList = [].slice.call(
        document.querySelectorAll(".collapse")
      );
      var collapseList = collapseElementList.map(function (collapseEl) {
        return new bootstrap.Collapse(collapseEl);
      });

      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    </script>
    <div class="container mb-5">
      <div class="form-control input-group-text" role="group">
        
        <h3 class="mb-0"><u>גישה מהירה:</u></h3>
        <br>
      
        <div id="loader0" class="loader"></div>
        <input
          type="text"
          id="peopleList0"
          list="people0"
          autocomplete="off"
          class="form-control"
        />
        <datalist id="people0"> </datalist>
        <br>
        <button
          onclick="quickChange1()"
          class="btn form-control btn-outline-secondary"
          id="quickChange1"
        >
        ניקוי שדה ההודעה האחרונה 
        </button>
          <button
          onclick="quickChange2()"
          class="btn form-control btn-outline-secondary"
          id="quickChange2"
        >
        עדכון תאריך הקלטת החרוז הבא 
        </button>
        <br>
         
    </div>
              <div class="form-control input-group-text" role="group">
                   <button
          onclick="submit('quick')"
          class="btn form-control btn-outline-secondary"
          id="quickSubmit"
        >
        תצוגת פרטי החרוז 
        </button>
        </div>
    </div>
    <div class="border-0">
      <br>
      <h3 class="mb-0"><u>חרוזים אחרונים</u></h3>
    </div>
    <div class="container">
      
      <div class="input-group mb-3">
        <span class="input-group-text">חברת צוות:</span>
        <input
          type="text"
          id="crewList"
          list="crew"
          autocomplete="off"
          class="form-control"
        />
        <datalist id="crew"> </datalist>
      </div>
    </div>
    <div class="container">
      <div class="form-control input-group-text mb-3" role="group">
        <button
          onclick="reset()"
          class="btn form-control btn-outline-secondary"
          id="reset"
        >
          נקה שדות
        </button>
      </div>
      <span
        class="position-relative start-50 input-group-text mb-3"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="05_ _ _ _ _ _ _ _"
        >בחרי למי לשלוח הודעה:</span
      >

      <div class="form-control mb-3" role="group" id="options">
        <div id="loader" class="loader"></div>
      </div>
         <div class="form-control input-group-text mb-3" role="group">
        <button
          onclick="submit('main')"
          class="btn form-control btn-outline-secondary"
          id="submit"
        >
          תצוגת פרטי החרוז מהרשימה
        </button>
      </div>
      
     
    </div>
    <div class="container blog-post-meta py-3" id="stuckMes">
      <div class="col-auto">
        <h3 class="mb-0"><u>חרוזים אחרונים</u></h3>
        <h6 class="mb-1 text-muted">למי שמעל שבועיים לא יצר קשר</h6>
          <div class="input-group mb-3">
              <span
            class="input-group-text"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="05_ _ _ _ _ _ _ _"
            >טלפון החרוז</span
          >
        <input
          type="tel"
          id="phone"
          class="form-control"
          placeholder="טלפון החרוז"
          autocomplete="off"
        />
        <input
          class="form-check-input"
          type="checkbox"
          id="fixGuestPhone"
          checked
        />
        <label class="form-check-label" for="flexCheckChecked">
          מספר ישראלי
        </label>
      </div>
        <div class="input-group mb-3">
          <span
            class="input-group-text"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="05_ _ _ _ _ _ _ _"
            >טלפון יוצר השרשרת</span
          >
          <input
            type="tel"
            id="creatorPhone"
            class="form-control"
            placeholder="יוצר השרשרת"
            autocomplete="off"
          />
          <input
            class="form-check-input"
            type="checkbox"
            id="fixCreatorPhone"
            checked
          />
          <label class="form-check-label" for="flexCheckChecked">
            מספר ישראלי
          </label>
        </div>
               <div class="row align-items-center">
    <div class="col">
           <div id="text1"></div>
                  </div>
                  <div class="col">
          <div id="text3"></div>
                  </div>
                </div>
        
      </div>
        <div class="row align-items-center">
    <div class="col">
           <textarea
        class="form-control mb-2"
        placeholder="או תקלידי הודעה כאן"
        id="personalMessGuest"
      ></textarea>
                  </div>
                  <div class="col">
           <textarea
        class="form-control mb-2"
        placeholder="או תקלידי הודעה כאן"
        id="personalMessInter"
      ></textarea>
                  </div>
                </div>
      
      <div class="form-control input-group-text col-auto mb-2" role="group">
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="sendMes1"
          onclick="whatsAppMes('1_guest')"
        >
         שליחת הודעה ראשונה לאורח
        </button>
        <button
              type="button"
              class="btn form-control btn-outline-secondary"
              id="sendMes1"
              onclick="whatsAppMes('3_creator')"
            >
              שליחת הודעה ליוצר השרשרת
        </button>
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="copyMes1"
          onclick="copy('1')"
        >
          העתקת הודעה ראשונה
        </button>
      </div>
      <div class="form-control input-group-text col-auto mb-2" role="group">
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="sendCalenderLink"
          onclick="whatsAppMes('5_guest')"
        >
          שליחת לינק ללוח ההקלטות
        </button>
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="copyCalenderLink"
          onclick="copy('5')"
        >
          העתקת לינק ללוח ההקלטות
        </button>
      </div>

      <div class="col-auto">
      <div id="text6"></div>
      <div class="form-control input-group-text col-auto mb-2" role="group">
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="sendMes6"
          onclick="whatsAppMes('6_guest')"
        >
          שליחת הודעה שנייה
        </button>
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="copyMes6"
          onclick="copy('6')"
        >
          העתקת הודעה שנייה
        </button>
      </div>
      <div class="form-control input-group-text col-auto mb-2" role="group">
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="sendInviteLink"
          onclick="whatsAppMes('7_guest')"
        >
       שליחת לינק להזמנה
        </button>
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="copyInviteLink"
          onclick="copy('7')"
        >
          העתקת לינק להזמנה
        </button>
      </div>

      <div
        id="change"
        class="form-control input-group-text col-auto"
        role="group"
      >
        <input
          type="text"
          id="newInfo"
          class="form-control"
          autocomplete="off"
        />
        <button
          type="button"
          class="btn form-control btn-outline-secondary"
          id="sendData"
          onclick="changeLastMess()"
        >
          לשינוי התאריך בו נשלחה ההודעה האחרונה
        </button>
      </div>
    </div>
  
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossorigin="anonymous"
    ></script>
    <script src="stuckMes.js"></script>
  </body>
</html>
