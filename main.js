/** ----かなり混沌としております---- */

/** ----D&D---- */
function dropFile() {
    $(".dropFile").modal();
};



function deleteTable(id){
    const elem = document.getElementById(id)
    if (elem != null){
        elem.remove();
    };
};

function getFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
    
        //テキスト形式で読み込む
        reader.readAsText(file);
    
        // テキストの読み込みが完了した際のイベントを登録
        reader.onload = (event) => {
            const text = event.target.result;
            
            const csv = strToArray(text);

            makeTable(csv, "table", "preview-csv", true)
        };
    }
    
};

function submitCSV(load){
    const length = Number(sessionStorage.getItem("length"));
    if (length == null || length == 0)
        return
    const tableArray = [];

    for (i=0; i<length; i++) {
        var key = "row" + i;

        item = sessionStorage.getItem(key);
        const csv = strToArray(item);
        tableArray.push(csv[0]);
        
    };

    if (sessionStorage.getItem("length") != "0")
        document.getElementById("initMessage").style.display = "none"

    target = "main-database"
    tableId = "table-database"
    
    deleteTable(tableId);

    makeTable(tableArray, target, tableId, load);
};

function makeTable(data, target, tableId, load){
    // ----配列⇒Table
    try {
        var tableText = [];
        var codes = [];
        var total = 0;

        for(i=0;i<data.length;i++) {

            var current = data[i];

            if ((current.length != 4 && load) || (current.length != 5 && !load))
                throw "Returning";

            if (i>0) {
                codes.push(data[i][1]);
                const sales = Number(data[i][2])*Number(data[i][3]);
                current[4] = sales;
                total += sales;
            } else {
                current[4] = "SALES";
            };


            tableText.push(current);
            
            var key = "row"+String(i)
            sessionStorage.setItem(key, current.join());
        };

        const elem = document.getElementById("total");
        elem.innerHTML = "¥"+total

        sessionStorage.setItem("codes", codes.join());

    } catch (e) {
        document.getElementById("4-only").style.display = "block"
        return
    }
    
    document.getElementById("4-only").style.display = "none"

    sessionStorage.setItem("length", String(data.length))

    var rows=[];
    var table = document.createElement("table");

    for(i=0; i<tableText.length; i++) {
        // 行の追加
        rows.push(table.insertRow(-1));
        
        for(j=0; j<5; j++) {
            // 追加した行にセルを追加してテキストを書き込む
            cell=rows[i].insertCell(-1);
            cell.appendChild(document.createTextNode(tableText[i][j]));
        }
    };

    table.id = tableId;
    table.border = 1;
    document.getElementById(target).appendChild(table);
            
};

// ----時計----
function twoDigit(num) {
    let ret;
    if( num < 10 ) 
      ret = "0" + num; 
    else 
      ret = num; 
    return ret;
}
function showClock() {
    let nowTime = new Date();
    let nowHour = twoDigit( nowTime.getHours() );
    let nowMin  = twoDigit( nowTime.getMinutes() );
    let nowSec  = twoDigit( nowTime.getSeconds() );
    let msg = nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("clock").innerHTML = msg;
}
setInterval('showClock()',1000);

/** ----databaseテーブルの表示切替---- */
function showBool() {
    var boole = document.getElementById("chk").checked;
    var showTable = document.getElementById("database");

    if (boole == true){
        showTable.style.visibility = "visible"
    }else{
        showTable.style.visibility = "hidden"
    }
};
setInterval("showBool()", 500);

// ----ロード時アニメーション----
window.addEventListener("load", function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
})

window.addEventListener("load", function() {

    submitCSV(false)

    const dispName = document.getElementById("name");
    var store = sessionStorage.getItem("store");
    if (store == null) {
        store = "N/A";
    }
    dispName.innerHTML = store;

    const dispTotal = document.getElementById("total");
    if (dispTotal.innerHTML == "¥")
        dispTotal.innerHTML = "¥0";
})

//---- 入力欄周り ----
function display_recent(){
    /*
    読み込んだバーコードを売り上げデータに反映させる
    */
    const recent = document.getElementById("recent-barcode");
    const value = String(document.getElementById("inputBarcode").value);
    const codes = strToArray(sessionStorage.getItem("codes"))[0];
    const space = value.includes(" ");
    const ifIncludes = function(){
        try {
            const ifincludes = codes.includes(value)
            return !ifincludes
        } catch(e) {
            return true
        }
    }

    if (value == ""){
        $(".error-no-input").modal()
    }else if (space == true || ifIncludes()){
        $(".error-unex-input").modal()
    }else{
        recent.textContent = value;
        const index = codes.indexOf(value);

        const database = strToArray(sessionStorage.getItem("database"));
        const selectRow = database[index];

        selectRow[3] = Number(selectRow[3])+1;
        sessionStorage.setItem("database", arrayToStr(database));

        submitCSVMain(false);
    };
    document.getElementById("inputBarcode").value = "";
};
//----そのままEnterを押すとなぜかリロードが入るのでイベントとして処理----
window.document.onkeydown = function(event){
    if (event.key === "Enter") {
        display_recent();
    }
};

//---- 発団名入力欄 ----
function storeName() {
    $(".storeName").modal();
};

function cancelStoreName() {
    target = document.getElementById("inputStoreName");
    target.value = sessionStorage.getItem("store");
};

function submitStoreName(){
    const store = document.getElementById("inputStoreName").value;

    const dispName = document.getElementById("name");
    dispName.innerHTML = store;
    sessionStorage.setItem("store", store);
}

// ----CSVでダウンロード----
function downloadCSV() {
    date = new Date();
    month = String(date.getMonth()+1).padStart(2,"0");
    day = String(date.getDate()).padStart(2, "0");
    hour = String(date.getHours()).padStart(2, "0");
    minute = String(date.getMinutes()).padStart(2, "0");
    final = month+""+day+"_"+hour+""+minute;

    const data = [];
    const length = Number(sessionStorage.getItem("length"))

    for (i=0; i<length; i++) {
        var key = "row" + i;

        item = sessionStorage.getItem(key);
        const csv = strToArray(item);
        data.push(csv[0]);
        
    };
    const data_ = arrayToStr(data);

    const store = sessionStorage.getItem("store");
    store == null ? store_ = "default" : store_ = store
    const filename = store_+"["+final+"].csv";

    const blob = new Blob([data_], {type: "text/csv"});

    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = filename;
    download.click();
    (window.URL || window.webkitURL).revokeObjectURL(url);
};

// ----リセット----
function reset() {
    sessionStorage.clear();
    window.location.reload();
};

// ----文字列⇒配列----
function strToArray (origin) {
    /*
    文字列を配列に変換する
    引数: 文字列
    戻り値: 配列
    */
    try{
        const after = origin.split("\r\n").map((elem) => elem.split(","));
        return after
    } catch(e) {
        // onloadで呼び出すsubmitCSVにエラーを吐かせない
        return []
    }
};

// ----配列⇒文字列----
function arrayToStr (origin) {
    try {
        const after = origin.map((elem) => elem.join(",")).join("\r\n");
        return after;
    } catch(e) {
        const after = origin.join(",");
        return after;
    }
};

// ----設定----
function setting() {
    $(".setting").modal();
};