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
        for (i=0; i<data.length; i++) {
            let elem = data[i];
            
            // elemがCSV読み込み時は4列以外なら、それ以外は5列以外ならブロック
            if ((elem.length != 4 && load) || (elem.length != 5 && !load))
                throw "Returning";

            // codesにコード一覧を登録
            codes.push(elem[1]);

            // 各列をフォーマット
            const sales = Number(elem[2])*Number(elem[3]);
            total += sales;

            elem[1] = "#" + elem[1];
            elem[2] = "¥" + elem[2];
            elem[4] = "¥" + sales;

        };
        
        data.push(["TOTAL", "", "", "", "¥" + total])
        console.log(data)

    } catch (e) {
        console.log(e);
        return;
    };

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
        }
    }

    
};

function submitCSVMain(load){
    // ------売上表示のTableを作成する------

    const array = [["Juice", "76671487", "100", "437"], ["Game", "20380298", "100", "359"], ["Goods(200)", "65814888", "200", "226"]];

    target = "main-table-area"
    tableID = "main-table"
    
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
    submitCSVMain(true)
})