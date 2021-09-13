/** ----D&D---- */
const dropArea = document.getElementById("drop");

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
    
            const csv = text.split("\r\n").map((row) => row.split(","));
            
            makeTable(csv, "table")
        };
    }
    
};

function makeTable(data, divname){
    /** ----配列⇒Table */    
    var tableText=[];

    for(i=0;i<data.length;i++) {
        tableText.push(data[i]);
    };

    var rows=[];
    var table = document.createElement(divname);

    for(i=0; i<tableText.length; i++) {
        // 行の追加
        rows.push(table.insertRow(-1));
        for(j=0; j<4; j++) {
            // 追加した行にセルを追加してテキストを書き込む
            cell=rows[i].insertCell(-1);
            cell.appendChild(document.createTextNode(tableText[i][j]));
        }
    }
    table.id = "preview-csv";
    table.border = 1;
    document.getElementById(divname).appendChild(table);
};

function dropFile() {
    $(".dropFile").modal();
};

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
        display_recent()
    }
};

/**---- 発団名入力欄 ----*/
function storeName() {
    $(".storeName").modal();
};

function clearStoreName() {
    document.getElementById("inputStoreName").value = "";
};

/** ----ロード時アニメーション---- */
window.onload = function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
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

/** ----リロード禁止!---- 
$(window).on('beforeunload', function(e) {
    return 'Save Before Close';
});
*/
