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

// ロード時アニメーション
window.addEventListener("load", function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
})
