// かなり混沌としております
// ---- Clock ----
/**
 * Calculates given number as two digits.
 * @param {number} num hours/minuts/seconds
 * @returns Returns as two digits
 */
function twoDigit(num) {
    let ten;
    if( num < 10 )
      ten = "0" + num;
    else
      ten = num;
    return ten;
};

/**
 * Gets current time and display in the interface.
 */
function showClock() {
    let nowTime = new Date();
    let nowHour = twoDigit( nowTime.getHours() );
    let nowMin  = twoDigit( nowTime.getMinutes() );
    let nowSec  = twoDigit( nowTime.getSeconds() );
    let msg = nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("clock").innerHTML = msg;
}
setInterval('showClock()',1000);

// ---- Animation when loading page ----
window.addEventListener("load", function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
})

//---- Input interface ----
/**
 * Gets list of the codes, browse it, and displays any messages depend on if the code is correct.
 */
function display_recent(){
    const recent = document.getElementById("recent-barcode");
    const value = String(document.getElementById("inputBarcode").value);
    const codes = strToArray(sessionStorage.getItem("codes"))[0];

    /**
     * Checks if the input code is correct.
     * @returns {boolean} "INCORRECT" or not
     */
    const ifIncludes = function(){
        try {
            const ifincludes = codes.includes(value)
            return !ifincludes
        } catch(e) {
            return true
        }
    }

    // Branching
    if (value == ""){
        // If the input element is empty
        // Open "No Input" modal
        $(".error-no-input").modal()

    } else if (ifIncludes()){
        // If the code is incorrect
        // Open "Unexpected Input" modal
        $(".error-unex-input").modal()

    } else {
        // If the code is correct
        // Gets the location of the code in the "codes" array
        recent.textContent = value;
        const index = codes.indexOf(value);

        // Gets an array in the "database" for the code
        const database = strToArray(sessionStorage.getItem("database"));
        const selectRow = database[index];

        // Updates "database"
        selectRow[3] = Number(selectRow[3])+1;
        sessionStorage.setItem("database", arrayToStr(database));

        // Updates table displayed based on the updated "database"
        submitCSV(false);
    };
    document.getElementById("inputBarcode").value = "";
};

// ---- Sets Username ----
/**
 * Opens "Set Store Name" modal
 */
function storeName() {
    $(".storeName").modal();

    // Sets initial value of the input as "store"
    const target = document.getElementById("inputStoreName");
    target.value = sessionStorage.getItem("store");
};

/**
 * Sets "store" as typed value
 */
function submitStoreName(){
    // Saves store name as sessionstorage
    const store = document.getElementById("inputStoreName").value;
    sessionStorage.setItem("store", store);

    // Update text displayed
    const dispName = document.getElementById("name");
    dispName.innerHTML = store;
}

// ---- Misc functions ----
/**
 * Resets all of the data
 */
function reset() {
    sessionStorage.clear();
    window.location.reload();
};

/**
 * Blocks reloading/closing tab by user.
 * @param {*} event idk :(
 */
window.onbeforeunload = function(event) {
    //e.returnValue = "";
};

/**
 * Blocks reloading when typing Enter
 * @param {*} event idk *(
 */
window.document.onkeydown = function(event){
    if (event.key === "Enter") {
        display_recent();
    }
};

/**
 * Transforms string as array
 * @param {string} origin needs "\r\n" splitter
 * @returns {string[][]} array-transformed original data
 */
function strToArray(origin) {
    try{
        const after = origin.split("\r\n").map((elem) => elem.split(","));
        return after
    } catch(e) {
        return []
    }
};

/**
 * Transforms array as string
 * @param {string[][]} origin has to be dual-array
 * @returns {string} string-transformed original data
 */
function arrayToStr(origin) {
    try {
        const after = origin.map((elem) => elem.join(",")).join("\r\n");
        return after;
    } catch(e) {
        const after = origin.join(",");
        return after;
    }
};

function changeLayout() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const mainTable = document.getElementById("main-table-area");
    const credit = document.getElementsByClassName("credit")[0];

    // main-table
    if (width < 800 || (width < 1340 && height < 800) || height < 470) {
        mainTable.classList.add("hidden");
    } else {
        mainTable.classList.remove("hidden");
    };

    // Credit
    if (width < 1120) {
        credit.classList.add("hidden");
    } else {
        credit.classList.remove("hidden")
    }
};

// Executes changeLayout when loading page
window.addEventListener("load", function(){
    changeLayout();
});

// Executes changeLayout when user changed window size
window.addEventListener("resize", function() {
    changeLayout();
});

/**
 * Determines from the domain whether to show "notice" modal or not
 */
function hostName() {
    const hostname = location.hostname;

    // If the page is running on Vercel
    if ( hostname.match("vercel.app"))
        $("#notice").modal();
};

// Executes hostName when loading page
window.addEventListener("load", function(){
    hostName();
});
