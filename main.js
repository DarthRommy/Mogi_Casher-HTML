/** ----かなり混沌としております---- */

// タスクキルを阻止
window.onbeforeunload = function(e) {
    e.returnValue = "";
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

// ----ロード時アニメーション----
window.addEventListener("load", function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
})

//---- 入力欄周り ----
function display_recent(){
    const recent = document.getElementById("recent-barcode");
    const value = String(document.getElementById("inputBarcode").value);
    const codes = strToArray(sessionStorage.getItem("codes"))[0];

    // 存在するコードならfalse、存在しないならtrue
    const ifIncludes = function(){
        try {
            const ifincludes = codes.includes(value)
            return !ifincludes
        } catch(e) {
            return true
        }
    }

    // 空欄をブロック
    if (value == ""){
        $(".error-no-input").modal()
    
    // 存在しないコードをブロック
    }else if (ifIncludes()){
        $(".error-unex-input").modal()

    // 存在する場合
    }else{
        // コードの位置を取得
        recent.textContent = value;
        const index = codes.indexOf(value);

        // 位置からdatabase内の配列を取得
        const database = strToArray(sessionStorage.getItem("database"));
        const selectRow = database[index];

        // databaseを更新
        selectRow[3] = Number(selectRow[3])+1;
        sessionStorage.setItem("database", arrayToStr(database));

        // databaseからTable作成
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

// ----発団名を登録----
function storeName() {
    $(".storeName").modal();

    // 登録済みの発団名を打ち込んだ状態で起動
    const target = document.getElementById("inputStoreName");
    target.value = sessionStorage.getItem("store");
};

function submitStoreName(){
    // storeに発団名を登録
    const store = document.getElementById("inputStoreName").value;
    sessionStorage.setItem("store", store);

    // 発団名表示エリアを更新
    const dispName = document.getElementById("name");
    dispName.innerHTML = store;
}

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

// 画面のサイズに合わせてレイアウトを変更
function changeLayout() {
    // ウィンドウの幅と高さを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    const mainTable = document.getElementById("main-table-area");
    const credit = document.getElementsByClassName("credit")[0];

    // main-tableの表示/非表示
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

// 読み込み時に実行
window.addEventListener("load", function(){
    changeLayout();
});

// サイズ変更時に実行
window.addEventListener("resize", function() {
    changeLayout();
});

// vercel上ではプレビュー通知
function hostName() {
    const hostname = location.hostname;

    if ( hostname.match("vercel.app"))
        $("#notice").modal();
};

window.addEventListener("load", function(){
    hostName();
});
