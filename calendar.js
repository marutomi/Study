
/* 単純なHTML構造だけを読み込だけで構わないので、document.readyを使います */
/* var $window = $(window); */
var $document = $(document);
var $year = $('#js-year');
var $month = $('#js-month');
var $tbody = $('#cb');

var today = new Date();
var currentYear = today.getFullYear(),
    currentMonth = today.getMonth();

  /* これは動かなかった
$window.addEventListener('DOMContentLoaded', function() {
  calendarHeading(currentYear, currentMonth);
  calendarBody(currentYear, currentMonth, today);
  alert('foo');
});
*/
$(document).ready(function(){
  calendarHeading(currentYear, currentMonth);
  /* htmlの書き換えが、readyメソッド内でないとうまく動かなった */
  /* calendarBody(currentYear, currentMonth, today); */
  /* 戻り値追加 */
  var ret = calendarBody(currentYear, currentMonth, today);
  $('#cb').html(ret);
});

/*
$window.on('load',function(){
  calendarHeading(currentYear, currentMonth);
  calendarBody(currentYear, currentMonth, today);
});
*/

function calendarBody(year, month, today){
  var todayYMFlag = today.getFullYear() === year && today.getMonth() === month ? true : false; // 本日の年と月が表示されるカレンダーと同じか判定
  var startDate = new Date(year, month, 1); // その月の最初の日の情報
  var endDate  = new Date(year, month + 1 , 0); // その月の最後の日の情報
  var startDay = startDate.getDay();// その月の最初の日の曜日を取得
  var endDay = endDate.getDate();// その月の最後の日の曜日を取得
  var textSkip = true; // 日にちを埋める用のフラグ
  var textDate = 1; // 日付(これがカウントアップされます)
  var tableBody =''; // テーブルのHTMLを格納する変数
  
  for (var row = 0; row < 6; row++){
    var tr = '<tr>';
    
    for (var col = 0; col < 7; col++) {
      if (row === 0 && startDay === col){
        textSkip = false;
      }
      if (textDate > endDay) {
        textSkip = true;
      }
      var addClass = todayYMFlag && textDate === today.getDate() ? 'is-today' : '';
      var textTd = textSkip ? ' ' : textDate++;
      var td = '<td class="'+addClass+'">'+textTd+'</td>';
      tr += td;
    }
    tr += '</tr>';
    tableBody += tr;
  }
  /* 動かない*/
  /* $tbody.html(tableBody); */
  return tableBody;
}

function calendarHeading(year, month){
  $year.text(year);
  $month.text(month + 1);
}