/** ----かなり混沌としております---- */

/** ----D&D---- */
function dropFile() {
    $(".dropFile").modal();
};

/** ドロップエリア */
const dropArea = document.getElementById("drop");

/** ドロップした時だけ処理を実行する */
dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});
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
            
            const csv = strToArray(text);

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
        const csv = strToArray(item);
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
        var tableText = [];
        var codes = [];

        for(i=0;i<data.length;i++) {

            var current = data[i];

            if (i>0)
                codes.push(data[i][1]);

            if (current.length != 4){
                throw "Returning"
            };

            tableText.push(current);
            
            var key = "row"+String(i)
            sessionStorage.setItem(key, current.join());
        };

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
        const selectRow = strToArray(sessionStorage.getItem("row"+(index+1)))[0];

        selectRow[3] = Number(selectRow[3])+1;
        sessionStorage.setItem("row"+(index+1), arrayToStr(selectRow));

        submitCSV();
    };
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

/** ----リセット---- */
function reset() {
    sessionStorage.clear();
    /** 演出上リロード */
    window.location.reload();
};

/** ----文字列⇒配列---- */
function strToArray (origin) {
    try{
        const after = origin.split("\r\n").map((elem) => elem.split(","));
        return after
    } catch(e) {
        return []
    }
};

/** ----配列⇒文字列---- */
function arrayToStr (origin) {
    try {
        const after = origin.map((elem) => elem.join(",")).join("\r\n");
        return after;
    } catch(e) {
        const after = origin.join(",");
        return after;
    }
};