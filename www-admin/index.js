const MembersEditForm = {
    data () {
        return {
            showModal: false,
            id: "0",
            team: "0",
            name: "",
            ruby: "",
            ord: "",
        };
    },
    methods: {
        open (item) {
            if (item) {
                this.id = item.id;
                this.team = item.team;
                this.name = item.name;
                this.ruby = item.ruby;
                this.ord = item.ord;
            } else {
                this.id = "0";
                this.team = "";
                this.name = "";
                this.ruby = "";
                this.ord = "";
            }
            this.showModal = true
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.id === "0") {
                await addTMembers(this.team, this.name, this.ruby, this.ord);
            } else {
                await putTMembers(this.team, this.name, this.ruby, this.ord, this.id);
            }
            this.showModal = false;
            this.$parent.update();
        },
    },
    template: `
<div class="modal-overlay" v-show="showModal">
  <div class="modal-content">
    <form>
        <div>
            班:
            <input type="text" v-model="team">
        </div>
        <div>
            名前:
            <input type="text" v-model="name">
        </div>
        <div>
            フリガナ:
            <input type="text" v-model="ruby">
        </div>
        <div>
            順番:
            <input type="text" v-model="ord">
        </div>
        <div>
            <button type="button" v-on:click="submit">送信</button>
            <button type="button" v-on:click="close">キャンセル</button>
        </div>
    </form>
  </div>
</div>
`
};

const WeeklyScheduleConfEditForm = {
    data () {
        return {
            showModal: false,
            id: "0",
            trashType: "",
            weekday: "",
            weekord: "",
        };
    },
    methods: {
        open (item) {
            if (item) {
                this.id = item.id;
                this.trashType = item.trashType;
                this.weekday = item.weekday;
                this.weekord = item.weekord;
            } else {
                this.id = "0";
                this.trashType = "1";
                this.weekday = "0";
                this.weekord = "1";
            }
            this.showModal = true;
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.id === "0") {
                await addTWeeklyScheduleConf(this.trashType, this.weekday, this.weekord);
            } else {
                await putTWeeklyScheduleConf(this.trashType, this.weekday, this.weekord, this.id);
            }
            this.showModal = false;
            this.$parent.update();
        },
    },
    template: `
<div class="modal-overlay" v-show="showModal">
  <div class="modal-content">
    <form>
        <div>
            ゴミの種類:
            <label><input type="radio" v-model="trashType" value="1">燃えるゴミ</label>
            <label><input type="radio" v-model="trashType" value="2">燃えないゴミ</label>
            <label><input type="radio" v-model="trashType" value="3">その他</label>
        </div>
        <div>
            曜日:
            <label><input type="radio" v-model="weekday" value="0">日</label>
            <label><input type="radio" v-model="weekday" value="1">月</label>
            <label><input type="radio" v-model="weekday" value="2">火</label>
            <label><input type="radio" v-model="weekday" value="3">水</label>
            <label><input type="radio" v-model="weekday" value="4">木</label>
            <label><input type="radio" v-model="weekday" value="5">金</label>
            <label><input type="radio" v-model="weekday" value="6">土</label>
        </div>
        <div>
            第:
            <label><input type="radio" v-model="weekord" value="1">1</label>
            <label><input type="radio" v-model="weekord" value="2">2</label>
            <label><input type="radio" v-model="weekord" value="3">3</label>
            <label><input type="radio" v-model="weekord" value="4">4</label>
            <label><input type="radio" v-model="weekord" value="5">5</label>
        </div>
        <div>
            <button type="button" v-on:click="submit">送信</button>
            <button type="button" v-on:click="close">キャンセル</button>
        </div>
    </form>
  </div>
</div>
`
};

const FirstMemberEditForm = {
    data () {
        return {
            showModal: false,
            id: "0",
        };
    },
    methods: {
        open (itemX) {
            let item = itemX.calcMember;
            if (item) {
                this.id = itemX.confMemberId;
            }
            this.showModal = true;
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.id !== "0") {
                await putTFirstMember(this.id);
            } else {
                await deleteTFirstMember();
            }
            this.showModal = false;
            this.$parent.update();
        },
    },
    template: `
<div class="modal-overlay" v-show="showModal">
  <div class="modal-content">
    <form>
        <select v-model="id">
            <option value="0">なし</option>
            <option v-for="member in this.$parent.members" :value="member.id">
                {{member.name}}
            </option>
        </select>
        <div>
            <button type="button" v-on:click="submit">送信</button>
            <button type="button" v-on:click="close">キャンセル</button>
        </div>
    </form>
  </div>
</div>
`
}

const DailyScheduleConfEditForm = {
    data () {
        return {
            showModal: false,
            date: "",
            diffType: "",
            trashType: "",
            weeklyTrashTypeConfs: [],
            dailyTrashTypeConfs: [],
        };
    },
    methods: {
        update () {
            this.getWeeklyScheduleConfs();
            this.getDailyScheduleConfs();
        },
        getWeeklyScheduleConfs () {
            let date = this.date;
            let dutyDays = this.$parent.dutyDays;
            let result = [];
            for (let i = 0; i < dutyDays.length; i++) {
                let dutyDay = dutyDays[i];
                if (dutyDay.date.getTime() === date.getTime()) {
                    result.push(dutyDay.trashType);
                }
            }
            this.weeklyTrashTypeConfs = result;
        },
        getDailyScheduleConfs () {
            let date = this.date;
            let dailyScheduleConfs = this.$parent.dailyScheduleConfs;
            let result = [];
            for (let i = 0; i < dailyScheduleConfs.length; i++) {
                let conf = dailyScheduleConfs[i];
                if (Date.parse(conf.date) === date.getTime()) {
                    let obj = {
                        id: conf.id,
                        trashType: this.$parent.getTrashTypeString(conf.trashType)
                    }
                    result.push(obj);
                }
            }
            this.dailyTrashTypeConfs = result;
        },
        async denyScheduleConf (date) {
            await addTDailyScheduleConf(date, 2, 0);
        },
        async addDailyScheduleConf (date, trashType) {
            await addTDailyScheduleConf(date, 1, trashType);
        },
        async deleteDailyScheduleConf (id) {
            await deleteTDailyScheduleConf(id);
            this.$parent.update();
            this.update();
            // this.showModal = false;
            // this.showModal = true;
        },
        open (day) {
            this.date = day.date;
            this.getWeeklyScheduleConfs();
            this.getDailyScheduleConfs();
            this.showModal = true;
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            await addTDailyScheduleConf(this.date, this.diffType, this.trashType);
            this.showModal = false;
            this.$parent.update();
        },
    },
    template: `
<div class="modal-overlay" v-show="showModal">
  <div class="modal-content">
    <button type="button">追加</button>
    <table border="1">
        <thead>
        <tr>
            <th>設定の種類</th>
            <th>ゴミの種類</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in weeklyTrashTypeConfs">
            <td>曜</td>
            <td>{{ item }}</td>
            <td><button type="button" v-on:click="denyScheduleConf(date)">打消</button></td>
        </tr>
        <tr v-for="item in dailyTrashTypeConfs">
            <td>日</td>
            <td>{{ item.trashType }}</td>
            <td><button type="button" v-on:click="deleteDailyScheduleConf(item.id)">削除</button></td>
        </tr>
        </tbody>
    </table>
    <div style="text-align: center;">
        <button type="button" v-on:click="close">キャンセル</button>
    </div>
  </div>
</div>
`
//     template: `
// <div class="modal-overlay" v-show="showModal">
//   <div class="modal-content">
//     <form>
//         <div>
//             ゴミの種類:
//             <label><input type="radio" v-model="trashType" value="1">燃えるゴミ</label>
//             <label><input type="radio" v-model="trashType" value="2">燃えないゴミ</label>
//             <label><input type="radio" v-model="trashType" value="3">その他</label>
//         </div>
//         <div>
//             <button type="button" v-on:click="submit">追加</button>
//             <button type="button" v-on:click="close">キャンセル</button>
//         </div>
//     </form>
//   </div>
// </div>
// `
};

const ManageApp = {
    data () {
        let currentDate = new Date();
        return {
            weeklyScheduleConfs: [],
            dailyScheduleConfs: [],
            dutyDays: [],
            members: [],
            firstMember: null,
            sortedMembers: [],
            duties: [],
            calendarDays: [],

            currentMonth: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            weekDayLabel: ["日", "月", "火", "水", "木", "金", "土"],
        };
    },
    async mounted () {
        await this.loadWeeklyScheduleConf();
        await this.loadDailyScheduleConf();
        this.calcDutyDays();
        await this.loadMembers();
        await this.loadFirstMember();
        this.calcSortedMembers();
        this.calcDuties();
        this.calcCalendarDays();
    },
    computed: {
        daysInMonth() {
            let result = [];
            const year = this.currentMonth.getFullYear();
            const month = this.currentMonth.getMonth();
            const lastDay = new Date(year, month + 1, 0).getDate();
            for (let i = 1; i <= lastDay; i++) {
                result.push(new Date(year, month, i));
            };
            return result;
        },
        monthLabel () {
            return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
        },
        daysInPrevMonth () {
            let result = [];
            let firstDayOfCurrentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
            let weekdayOfFirstDay = firstDayOfCurrentMonth.getDay();
            let prevDay = firstDayOfCurrentMonth;
            for (let i = weekdayOfFirstDay; i > 0; i--) {
                prevDay = new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() ,firstDayOfCurrentMonth.getDate() - i);
                result.push(prevDay);
            };
            return result;
        },
        daysInNextMonth () {
            let result = [];
            let lastDayOfCurrentMonth  = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
            let weekdayOfLastDay = lastDayOfCurrentMonth.getDay();
            let nextDay = lastDayOfCurrentMonth;
            for (let i = 1; i < (7 - weekdayOfLastDay); i++) {
                nextDay = new Date(lastDayOfCurrentMonth.getFullYear(), lastDayOfCurrentMonth.getMonth(), lastDayOfCurrentMonth.getDate() + i);
                result.push(nextDay);
            };
            return result;
        },
    },
    methods: {
        async update () {
            await this.loadWeeklyScheduleConf();
            await this.loadDailyScheduleConf();
            this.calcDutyDays();
            await this.loadMembers();
            await this.loadFirstMember();
            this.calcSortedMembers();
            this.calcDuties();
            this.calcCalendarDays();
        },
        async loadMembers () {
            this.members = JSON.parse(await selectTMembers());
        },
        async deleteMember (id) {
            let confirm = window.confirm("本当に削除してもいいですか？");
            if (confirm) {
                await deleteTMembers(id);
                if (this.firstMember.confMemberId === id) await deleteTFirstMember(id);
                this.update();
            };
        },
        async loadWeeklyScheduleConf () {
            this.weeklyScheduleConfs = JSON.parse(await selectTWeeklyScheduleConf());
        },
        async deleteWeeklyScheduleConf (id) {
            let confirm = window.confirm("本当に削除してもいいですか？");
            if (confirm) {
                await deleteTWeeklyScheduleConf(id);
                this.update();
            };
        },
        async loadDailyScheduleConf () {
            this.dailyScheduleConfs = JSON.parse(await selectTDailyScheduleConf());
        },
        async deleteDailyScheduleConf (id) {
            let confirm = window.confirm("本当に削除してもいいですか？");
            if (confirm) {
                await deleteTDailyScheduleConf(id);
                this.update();
            };
        },
        getTrashTypeString (trashType) {
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
        },
        getWeekdayString (weekday) {
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
        },
        async loadFirstMember () {
            this.firstMember = JSON.parse(await getTFirstMember());
        },
        calcCalendarDays () {
            let calendarDays = [];
            let daysInMonth = this.daysInMonth;
            for (let i = 0; i < daysInMonth.length; i++) {
                let day = daysInMonth[i];
                const duties = this.duties.filter((duty) => duty.date.getTime() === day.getTime());
                let obj = {
                    date: day,
                    duties: duties,
                };

                calendarDays.push(obj);
            }
            this.calendarDays = calendarDays;
        },
        calcDuties () {
            let duties = [];
            for (let i = 0; i < this.dutyDays.length; i++) {
                let dutyDay = this.dutyDays[i];
                let member = this.sortedMembers[i % this.sortedMembers.length];

                let obj = {
                    date: dutyDay.date,
                    dateString: dutyDay.dateString,
                    trashType: dutyDay.trashType,
                    team: member.team,
                    name: member.name,
                    ruby: member.ruby};

                duties.push(obj);
            };
            this.duties = duties;
        },
        calcSortedMembers () {
            // const index = members.findIndex((member) => {
            //     return (member.id === Number(firstMember.id));
            // });
            let members = this.members;
            let firstMember = this.firstMember.calcMember;

            let index;
            for (let i = 0; i < members.length; i++) {
                if (members[i].id === firstMember.id) {
                    index = i;
                }
            }
            // console.log(index);

            let result = members.slice(index).concat(members.slice(0, index));
            this.sortedMembers = result;
        },
        // 現在から1年分の当番の日を計算する
        calcDutyDays () {
            let arrWeeklyScheduleConf = this.weeklyScheduleConfs;
            let today = new Date();
            let dutyDaysForOneYear = [];

            for (let i = 0; i < 13; i++) {
                let dutyDaysInMonth = this.getDaysInMonth(today.getFullYear(), today.getMonth(), arrWeeklyScheduleConf);
                dutyDaysForOneYear = (dutyDaysForOneYear.concat(dutyDaysInMonth));
                today.setMonth(today.getMonth() + 1);
            }

            // 既に過ぎてしまった当番の日を除外する
            let tmp = new Date();
            let today2 = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate()); // 00:00:00 で比較して今日が当番日の場合も含める
            let oneYearLater = new Date(today2);
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)

            let result = [];
            dutyDaysForOneYear.forEach((oDutyDay) => {
                let dutyDay = oDutyDay.time;
                if (today2.getTime() <= dutyDay && dutyDay <= oneYearLater.getTime()) {
                    result.push(oDutyDay);
                }
            });

            // 表示形式を加工してdutyDaysに代入する
            // result.sort();
            result.sort((a, b) => {
                if (a.time < b.time) {
                    return -1;
                }
                if (a.time > b.time) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
            let dutyDays = [];
            result.forEach((oItem) => {
                let trashTypeString = this.getTrashTypeString(oItem.trashType);
                let item = oItem.time;
                let dutyDay = new Date(item);
                let year = dutyDay.getFullYear();
                let month = dutyDay.getMonth() + 1;
                let date = dutyDay.getDate();
                let weekday = this.getWeekdayString(dutyDay.getDay());
                let dutyDayString = year + "年" + month + "月" + date + "日" + "(" + weekday + ")";
                dutyDays.push({date: dutyDay, dateString: dutyDayString, trashType: trashTypeString});
            })
            this.dutyDays = dutyDays;
        },
        // ある月の指定した曜日の日にちのリストを返す
        getDaysInMonth (year, month, arrWeeklyScheduleConf) {
            let result = [];
            const firstDay = new Date(year, month, 1)
            const distances = [];
            arrWeeklyScheduleConf.forEach((conf) => {
                let distance = this.getDistanceFromFirstDayToWeekday(firstDay, conf.weekday, conf.weekord);
                distances.push({distance: distance, trashType: conf.trashType});
            });
            distances.sort();
            distances.forEach((oDistance) => {
                let distance = oDistance.distance;
                let trashType = oDistance.trashType;
                let firstDay2 = new Date(year, month, 1)
                firstDay2.setDate(firstDay2.getDate() + distance);
                if (firstDay2.getMonth() === month) {
                    result.push({time: firstDay2.getTime(), trashType: trashType});
                }
            });
            return result;
        },
        // ある月の初日から指定した曜日までの距離を返す
        getDistanceFromFirstDayToWeekday (firstDayInMonth, weekday, weekord) {
            let weekdayOfFirstDay = firstDayInMonth.getDay();
            let distanceToWeekday;
            if (weekday >= weekdayOfFirstDay) {
                distanceToWeekday = weekday - weekdayOfFirstDay; // 初日の曜日より後の曜日の場合
            } else {
                distanceToWeekday = weekday + (7 - weekdayOfFirstDay) // 初日の曜日より前の曜日の場合
            }
            return distanceToWeekday + (7 * (weekord - 1));
        },
        prevMonth() {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
            this.calcCalendarDays();
        },
        nextMonth() {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
            this.calcCalendarDays();
        },
    },
    components: {
        MembersEditForm,
        WeeklyScheduleConfEditForm,
        DailyScheduleConfEditForm,
        FirstMemberEditForm,
    },
};

window.onload = function () {
    const app = Vue.createApp(ManageApp);
    app.mount('#app');
};
