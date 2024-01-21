/**
 * ある期間内のある月の当番表を計算する（カレンダー用）
 * @param {*} daysInMonth - ある月の日にちのリスト
 * @param {*} arrDuties - ある期間の当番表
 * @return ある期間内のある月の当番表のリスト
 */
function calcCalendarDays (daysInMonth, arrDuties) {
    let result = [];
    for (let i = 0; i < daysInMonth.length; i++) {
        let day = daysInMonth[i];
        const duties = arrDuties.filter((duty) => duty.date === day);
        let obj = {
            date: day,
            duties: duties,
        };
        result.push(obj);
    }
    return result;
}

/**
 * ある期間の当番表を計算する
 * @param {*} dutyDays - ある期間の当番日
 * @param {*} sortedMembers - 並び替え済みのメンバーのリスト
 * @return ある期間の当番表のリスト
 */
function calcDuties (dutyDays, sortedMembers) {
    let result = [];
    for (let i = 0; i < dutyDays.length; i++) {
        let dutyDay = dutyDays[i];
        let member = sortedMembers[i % sortedMembers.length];

        let obj = {
            date: dutyDay.date,
            dateString: dutyDay.dateString,
            trashType: dutyDay.trashTypeString,
            team: member.team,
            name: member.name,
            ruby: member.ruby
        };
        result.push(obj);
    }
    return result;
}

/**
 * メンバーを先頭メンバーから順番に並び替える
 * @param {*} members - メンバーのリスト
 * @param {*} firstMember - 先頭メンバー
 * @return 先頭メンバーから順番に並び替えたメンバーのリスト
 */
function calcSortedMembers (members, firstMember) {
    let fMember = firstMember.calcMember;

    let index;
    for (let i = 0; i < members.length; i++) {
        if (members[i].id === fMember.id) {
            index = i;
        }
    }
    // console.log(index);

    return members.slice(index).concat(members.slice(0, index));
}

// /**
//  * ある期間の当番日を計算する
//  * @param {*} arrScheduleConf - ある期間のスケジュール設定のリスト 
//  * @return ある期間の当番日のリスト
//  */
// function calcDutyDays (arrScheduleConf) {
//     return arrScheduleConf.filter((conf) => conf.length > 0);
// }

/**
 * ある期間の当番日を計算する（打消差分を考慮する、指定した形のオブジェクトの配列にして返す）
 * @param {*} arrScheduleConf - ある期間のスケジュール設定のリスト 
 * @return ある期間の当番日のリスト
 */
function calcDutyDays (arrScheduleConf) {
    // arrScheduleConf {date: 1704034800000, type: 1, trashType: 1}
    // result          {date: 1704034800000, dateString: 2024年1月1日, type: 1, trashType: 1, trashTypeString: 燃えるゴミ, }

    let result = [];
    let dutyDays = arrScheduleConf.filter((conf) => conf.length > 0);
    dutyDays.forEach((dutyDay) => {
        dutyDay.forEach((item) => {
            // console.log("item:", item);
            // 打消されていない曜日ごとの当番日 と 追加された日毎の当番日
            if (item.diffType === undefined || item.diffType === 1) {
                let dutyDay = new Date(item.date);
                let year = dutyDay.getFullYear();
                let month = dutyDay.getMonth() + 1;
                let date = dutyDay.getDate();
                let weekday = getWeekdayString(dutyDay.getDay());
                let dutyDayString = year + "年" + month + "月" + date + "日" + "(" + weekday + ")";
                let trashTypeString = getTrashTypeString(item.trashType);
                result.push({date: item.date, dateString: dutyDayString, type: item.type, trashType: item.trashType, trashTypeString: trashTypeString})
            }
        });
    });
    return result;
}

/**
 * ある期間のスケジュール設定を計算する
 * @param days 日にちのリスト
 * @return ある期間のスケジュール設定（ある日の日付、曜日ごとの設定、曜日ごとの設定(打消)、日毎の設定）のリスト
 */
function calcScheduleConfs (arrWeeklyScheduleConf, arrDailyScheduleConf, days) {
    let result = [];
    for (let i = 0; i < days.length; i++) {
        result.push(calcScheduleConfsForDay(arrWeeklyScheduleConf, arrDailyScheduleConf, days[i]));
    }
    return result;
}

/**
 * ある日のスケジュール設定を計算する　
 * @param arrWeeklyScheduleConf 曜日毎のスケジュール設定
 * @param arrDailyScheduleConf 日毎のスケジュール設定
 * @param date ある日にち
 * @return ある日のスケジュール設定（ある日の日付、曜日ごとの設定、曜日ごとの設定(打消)、日毎の設定）
 */
function calcScheduleConfsForDay (arrWeeklyScheduleConf, arrDailyScheduleConf, date) {
    // scheduleConfs: [
    //     {date: 1706194800000, type: 1, trashType: 1,},
    //     {date: 1706194800000, type: 1, trashType: 2, diffType: 2, dailyScheduleId: 1},
    //     {date: 1706194800000, type: 2, trashType: 3, diffType: 1, dailyScheduleId: 2},
    // ],

    let result = [];

    for (let i = 0; i < arrWeeklyScheduleConf.length; i++) {
        let wConf = arrWeeklyScheduleConf[i];
        let weekInfo = calcWeekInfo(date);
        if (wConf.weekday === weekInfo.weekday && wConf.weekord === weekInfo.weekord) {
            let type = 1;
            let trashType = wConf.trashType;
            let uchikeshis = arrDailyScheduleConf.filter((dConf) => {
                return dConf.date === date && dConf.diffType === 2 && dConf.trashType === trashType;
            });
            if (uchikeshis.length > 0) {
                let diffType = 2;
                let dailyScheduleId = uchikeshis[0].id;
                result.push({date: date, type: type, trashType: trashType, diffType: diffType, dailyScheduleId: dailyScheduleId});
            } else {
                result.push({date: date, type: type, trashType: trashType});
            }
        }
    }
    for (let i = 0; i < arrDailyScheduleConf.length; i++) {
        let conf = arrDailyScheduleConf[i];
        if (conf.date === date && conf.diffType === 1) {
            let type = 2;
            let trashType = conf.trashType;
            let diffType = 1;
            let dailyScheduleId = conf.id;
            result.push({date: date, type: type, trashType: trashType, diffType: diffType, dailyScheduleId: dailyScheduleId});
        }
    }

    return result;
}

/**
 * ある日が第何何曜日かを計算する
 * @param date - ある日にち
 * @return 第何何曜日
 */
function calcWeekInfo (date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate(); // 20
    let weekday = d.getDay(); // 6  
    let weekord = 0;

    for (let i = 1; i <= day; i++) {
        let cursorDate = new Date(year, month, i);
        if (cursorDate.getDay() === weekday) {
            weekord += 1;
        }
    }
    return {weekday: weekday, weekord: weekord};
}

/**
 * 今日からn年分の日にちのリストを計算する
 * @param {*} n - n年分
 * @return 今日からn年分の日にちのリスト
 */
function calcDaysInNYear (n) {
    let result = [];
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    for (let i = 0; i < n; i++) {
        // result.push(calcDaysInYear(year, month));
        result = result.concat(calcDaysInYear(year, month));
        year += 1;
    }
    return result;
}

/**
 * ある月から1年分の日にちのリストを計算する
 * @param {*} year 
 * @param {*} startMonth 
 * @return ある月から1年分の日にちのリスト
 */
function calcDaysInYear (year, startMonth) {
    let result = [];
    let y = year;
    let m = startMonth;
    for (let i = 0; i < 12; i++) {
        // result.push(calcDaysInMonth(y, m + i));
        result = result.concat(calcDaysInMonth(y, m + i));
        if (m === 12) {
            y += 1;
            m = 0;
        }
    }
    return result;
}

/**
 * ある月の日にちのリストを計算する
 * @param {*} year 
 * @param {*} month 
 * @return ある月の日にちのリスト
 */
function calcDaysInMonth (year, month) {
    let result = [];
    let lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
        let day = new Date(year, month, i);
        // ミリ秒で返す
        result.push(day.getTime());
    }
    return result;
}

/**
 * ゴミ種別を文字列にして返す
 * @param {*} trashType - ゴミ種別
 * @return ゴミ種別の文字列
 */
function getTrashTypeString (trashType) {
    switch (trashType) {
        case 1:
            return "燃えるゴミ";
        case 2:
            return "燃えないゴミ";
        case 3:
            return "その他";
        default:
            return "不明";
    }
}

/**
 * 曜日を文字列にして返す
 * @param {*} weekday - 曜日
 * @return 曜日の文字列
 */
function getWeekdayString (weekday) {
    switch (weekday) {
        case 0:
            return "日";
        case 1:
            return "月";
        case 2:
            return "火";
        case 3:
            return "水";
        case 4:
            return "木";
        case 5:
            return "金";
        case 6:
            return "土";
        default:
            return "不明";
    }
}


window.onload = async function () {
    let arrWeeklyScheduleConf = JSON.parse(await selectTWeeklyScheduleConf());
    let arrDailyScheduleConf = JSON.parse(await selectTDailyScheduleConf());
    let members = JSON.parse(await selectTMembers());
    let firstMember = JSON.parse(await getTFirstMember());

    // console.log("weekInfo:", calcWeekInfo(date));

    let date = new Date(2024, 1 - 1, 26).getTime();
    let scheduleConfsForDay = calcScheduleConfsForDay (arrWeeklyScheduleConf, arrDailyScheduleConf, date);
    console.log("scheduleConfsForDay:", scheduleConfsForDay);

    // let days = calcDaysInMonth(2024, 1 - 1);
    // let days = calcDaysInYear(2024, 2 - 1)
    let days = calcDaysInNYear(2);
    console.log("days:", days);

    let scheduleConfs = calcScheduleConfs(arrWeeklyScheduleConf, arrDailyScheduleConf, days);
    console.log("scheduleConfs:", scheduleConfs);

    let dutyDays = calcDutyDays(scheduleConfs);
    console.log("dutyDays:", dutyDays);

    let sortedMembers = calcSortedMembers(members, firstMember);
    let duties = calcDuties(dutyDays, sortedMembers);
    console.log("duties:", duties);

    let daysInMonth = calcDaysInMonth(2024, 1 - 1);
    let calendarDays = calcCalendarDays(daysInMonth, duties);
    console.log(calendarDays);
};



