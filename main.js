/** ----かなり混沌としております---- */

/** ----D&D---- */
function dropFile() {
    $(".dropFile").modal();
};

const dropArea = document.getElementById("drop");

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});
dropArea.addEventListener("dragleave", function(e){});
dropArea.addEventListener("drop", function(e){
    e.preventDefault();

    var file = e.dataTransfer.files;
    filename = file[0]["name"]
    if (fileExt(filename) == "csv"){
        document.getElementById("csv-only").style.display = "none";
        deleteTable("preview-csv")
        getFiles(file);

    }else{
        document.getElementById("csv-only").style.display = "block";
    };
});

function deleteTable(id){
    const elem = document.getElementById(id)
    if (elem != null){
        elem.remove();
    };
};

function fileExt(filename){
    const ext = filename.split(".").pop();
    return ext
};

function getFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
    
        //テキスト形式で読み込む
        reader.readAsText(file);
    
        // テキストの読み込みが完了した際のイベントを登録
        reader.onload = (event) => {
            const text = event.target.result;
            
            const csv = text.split("\r\n").map((row) => row.split(","));

            makeTable(csv, "table", "preview-csv")
        };
    }
    
};

function submitCSV(){
    const length = Number(sessionStorage.getItem("length"));
    if (length == null || length == 0)
        return
    const tableArray = [];

    for (i=0; i<length; i++) {
        var key = "row" + i;

        item = sessionStorage.getItem(key);
        const csv = item.split("\r\n").map((row) => row.split(","));
        tableArray.push(csv[0]);
        
    };

    if (sessionStorage.getItem("length") != "0")
        document.getElementById("initMessage").style.display = "none"

    target = "main-database"
    tableId = "table-database"
    
    deleteTable(tableId);

    makeTable(tableArray, target, tableId);
};

function makeTable(data, target, tableId){
    /** ----配列⇒Table */    
    try {
    var tableText=[];
    for(i=0;i<data.length;i++) {

        var current = data[i];

        if (current.length != 4){
            throw "Returning"
        }

        tableText.push(current);
        
        var key = "row"+String(i)
        sessionStorage.setItem(key, current.join());
        };
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
        
        for(j=0; j<4; j++) {
            // 追加した行にセルを追加してテキストを書き込む
            cell=rows[i].insertCell(-1);
            cell.appendChild(document.createTextNode(tableText[i][j]));
        }
    };

    table.id = tableId;
    table.border = 1;
    document.getElementById(target).appendChild(table);
            
};

/** ----時計---- */
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

/** ----ロード時アニメーション---- */
window.addEventListener("load", function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
})

window.addEventListener("load", function() {

    submitCSV()

    const dispName = document.getElementById("name");
    var store = sessionStorage.getItem("store");
    if (store == null) {
        store = "N/A";
    }
    dispName.innerHTML = store;
})

/**---- 入力欄周り ----*/
function display_recent(){
    const recent = document.getElementById("recent-barcode");
    const value = document.getElementById("inputBarcode").value;

    const space = value.includes(" ")

    if (value == ""){
        $(".error-no-input").modal()
    }else if (space == true){
        $(".error-unex-input").modal()
    }else{
        recent.textContent = value;
    }
    document.getElementById("inputBarcode").value = "";
};
/**----そのままEnterを押すとなぜかリロードが入るのでイベントとして処理---- */
window.document.onkeydown = function(event){
    if (event.key === "Enter") {
        display_recent();
    }
};

/**---- 発団名入力欄 ----*/
function storeName() {
    $(".storeName").modal();
};

function clearStoreName() {
    target = document.getElementById("inputStoreName");
    target.value = sessionStorage.getItem("store");
};

function submitStoreName(){
    const store = document.getElementById("inputStoreName").value;

    const dispName = document.getElementById("name");
    dispName.innerHTML = store;
    sessionStorage.setItem("store", store);
}

/** ----CSVでダウンロード---- */
function downloadCSV() {
    date = new Date();
    month = date.getMonth()+1;
    day = date.getDate();
    hour = date.getHours();
    minute = date.getMinutes();
    final = month+"/"+day+"_"+hour+":"+minute;

    const data = [];
    const length = Number(sessionStorage.getItem("length"))

    for (i=0; i<length; i++) {
        var key = "row" + i;

        item = sessionStorage.getItem(key);
        const csv = item.split("\r\n").map((row) => row.split(","));
        data.push(csv[0]);
        
    };
    const data_ = data.map((row) => row.join(",")).join("\r\n");

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

/** ----リセット---- */
function reset() {
    const length = Number(sessionStorage.getItem("length"));
    for (i=0; i<length; i++) {
        const id = "row"+i;
        sessionStorage.removeItem(id);
    };
    sessionStorage.removeItem("length");

    sessionStorage.removeItem("store")

    document.getElementById("initMessage").style.display = "block"

    window.location.reload();
}