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
            
            makeTable(csv, "table")
        };
    }
    
};

/** ----リロード禁止!---- 
$(window).on('beforeunload', function(e) {
    return 'Save Before Close';
});
*/

/** ----配列⇒Table */
function makeTable(data, divname){
    
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
