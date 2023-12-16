# 曜日
0 日曜日
1 月曜日
2 火曜日
3 水曜日
4 木曜日
5 金曜日
6 土曜日

# 月
0 1月
1 2月
2 3月
3 4月
4 5月
5 6月
6 7月
7 8月
8 9月
9 10月
10 11月
11 12月

# 日付の取得
// 今の日時の取得
let today = new Date();

// 年月日を指定して取得
let today = new Date(2024, 0, 11); //2024/1/11 木曜日

// 年の取得
let currentYear = today.getFullYear();

// 月の取得
let currentMonth = today.getMonth();

// 日の取得
let currentDate = today.getDate();

// 曜日の取得
let currentWeekday = today.getDay();

// エポック秒の取得
let currenTime = today.getTime();

// 指定した月の初日の取得
let firstDay = new Date(currentYear, currentMonth, 1);

// 年の加算
today.setFullYear(today.getFullYear() + 1); // + 1年

// 月の加算
today.setMonth(today.getMonth() + 1); // + 1ヶ月

// 日の加算
today.setDate(today.getDate() + 1); // + 1日