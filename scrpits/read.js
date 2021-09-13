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
