// あまりにも長くなりすぎるので分解しました

// CSV読み込み画面を表示
function dropFile() {
    $(".dropFile").modal();
};

function makeMainTable(data, target, tableID, load) {
    const element = document.getElementById(target);

    // Table作成
    const table = document.createElement("table");
    table.className = tableID;
    element.appendChild(table);

    // ヘッダー作成
    const theader = table.createTHead();

    // th用配列
    const header = ["TAG", "CODE", "PRICE", "UNITS", "SALES"];

    // tr作成
    const trHeader = theader.insertRow();

    // th作成
    for (i=0; i<header.length; i++) {
        const theader = document.createElement("th");

        theader.className = "column"+(i+1);
        theader.innerHTML = header[i];

        trHeader.appendChild(theader);
    };

    // ------配列の処理------
    const codes = [];
    let total = 0;

    try{
        // databaseがない時にもTableを表示
        if (typeof data === "undefined" || data[0] == "") {
            data = [];

        } else {
            for (i=0; i<data.length; i++) {
                let elem = data[i];
                
                // elemがCSV読み込み時は4列以外なら、それ以外は5列以外ならブロック
                if ((elem.length != 4 && load) || (elem.length != 5 && !load))
                    throw "Returning";

                // codesにコード一覧を登録
                codes.push(elem[1]);

                // 合計金額を追加
                const sales = Number(elem[2])*Number(elem[3]);
                elem[4] = sales;
                total += sales;

            };
        };

        document.getElementById("4-only").style.display = "none";

    } catch (e) {
        document.getElementById("4-only").style.display = "block";
        return;
    };

    // dataをsessionStorageに保存
    sessionStorage.setItem("database", arrayToStr(data));
    sessionStorage.setItem("codes", codes);

    // input下部の総計に反映
    document.getElementById("total").innerHTML = "¥" + total
    
    // 各列をフォーマット
    for (i=0; i<data.length; i++) {
        let elem = data[i];

        elem[1] = "#" + elem[1];
        elem[2] = "¥" + elem[2];
        elem[4] = "¥" + elem[4];
    }


    // Table用にdataに最下段を追加
    data.push(["TOTAL", "", "", "", "¥" + total]);

    // tbody作成
    const tbody = table.createTBody();

    // tbodyの中身を作成
    for (i=0; i<data.length; i++) {
        // tr作成
        const row = tbody.insertRow(-1);

        // td作成
        for (j=0; j<data[i].length; j++) {
            const tdoc = document.createElement("td");

            tdoc.className = "column" + (j + 1);
            tdoc.innerHTML = data[i][j];

            row.appendChild(tdoc)
        };
    };
    
};

function submitCSVMain(load){
    // ------売上表示のTableを作成する------
    const array = strToArray(sessionStorage.getItem("database"));

    target = "main-table-area";
    tableID = "main-table";
    
    deleteTables(tableID);

    makeMainTable(array, target, tableID, load);
}

function deleteTables(id){
    // ------既にTableがある場合は量産されないように一旦削除する------
    const elem = document.getElementsByClassName(id)[0]
    if (elem != null){
        elem.remove();
    };
};

// リロード時にTableを再生成
window.addEventListener("load", function() {
    submitCSVMain(false);

    // 発団名を自動読み込み
    const dispName = document.getElementById("name");
    let store = sessionStorage.getItem("store");
    if (store == null) {
        store = "N/A";
    };

    dispName.innerHTML = store;
});

// ------ドロップエリア------
const dropArea = document.getElementById("drop");

// ドロップした時だけ処理を実行する
dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop", function(e){
    e.preventDefault();

    // ファイルを取得
    const file = e.dataTransfer.files;
    const filename = function() {
        const ext = file[0]["name"].split(".").pop();
        return ext;
    };

    // CSVファイルの場合表を更新
    if (filename() == "csv"){

        document.getElementById("csv-only").style.display = "none";

        deleteTables("preview-table");
        getFile(file);

    }else{
        document.getElementById("csv-only").style.display = "block";
    };
});

// ドロップしたファイルから配列を取得
function getFile(files) {
    for (const file of files) {
        const reader = new FileReader();

        //テキスト形式で読み込む
        reader.readAsText(file);

        // テキストの読み込みが完了した際のイベントを登録
        reader.onload = (event) => {
            const text = event.target.result;
            
            const csv = strToArray(text);
            const trash = csv.shift();

            makeMainTable(csv, "preview-table-area", "preview-table", true);
        };
    };
    
};

// ----CSVでダウンロード----
function dlCSV() {
    date = new Date();
    month = String(date.getMonth()+1).padStart(2,"0");
    day = String(date.getDate()).padStart(2, "0");
    hour = String(date.getHours()).padStart(2, "0");
    minute = String(date.getMinutes()).padStart(2, "0");
    final = month+""+day+"_"+hour+""+minute;

    // 売り上げを削除
    const pre_data = strToArray(sessionStorage.getItem("database"));
    for (i=0; i<pre_data.length; i++) {
        pre_data[i].pop();
    };

    if (pre_data[0].length == 0)
        return

    pre_data.unshift(["TAG", "CODE", "PRICE", "UNITS"]);
    const data = arrayToStr(pre_data);

    const store = sessionStorage.getItem("store");
    store == null ? store_ = "default" : store_ = store
    const filename = store_+"["+final+"].csv";

    const blob = new Blob([data], {type: "text/csv"});

    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = filename;
    download.click();
    (window.URL || window.webkitURL).revokeObjectURL(url);
};