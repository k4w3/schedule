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
            console.log(this.showModal);
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
            this.$parent.reloadMembers();
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

const ScheduleConfEditForm = {
    data () {
        return {
            showModal: false,
            id: "0",
            weekday: "",
            ord: "",
        };
    },
    methods: {
        open (item) {
            if (item) {
                this.id = item.id;
                this.weekday = item.weekday;
                this.ord = item.ord;
            } else {
                this.id = "0";
                this.weekday = "";
                this.ord = "";
            }
            this.showModal = true
            console.log(this.showModal);
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.id === "0") {
                await addTScheduleConf(this.weekday, this.ord);
            } else {
                await putTScheduleConf(this.weekday, this.ord, this.id);
            }
            this.showModal = false;
            this.$parent.reloadScheduleConf();
        },
    },
    template: `
<div class="modal-overlay" v-show="showModal">
  <div class="modal-content">
    <form>
        <div>
            曜日:
            <label><input type="radio" v-model="weekday" value="0" checked>日</label>
            <label><input type="radio" v-model="weekday" value="1">月</label>
            <label><input type="radio" v-model="weekday" value="2">火</label>
            <label><input type="radio" v-model="weekday" value="3">水</label>
            <label><input type="radio" v-model="weekday" value="4">木</label>
            <label><input type="radio" v-model="weekday" value="5">金</label>
            <label><input type="radio" v-model="weekday" value="6">土</label>
        </div>
        <div>
            第:
            <label><input type="radio" v-model="ord" value="1" checked>1</label>
            <label><input type="radio" v-model="ord" value="2">2</label>
            <label><input type="radio" v-model="ord" value="3">3</label>
            <label><input type="radio" v-model="ord" value="4">4</label>
            <label><input type="radio" v-model="ord" value="5">5</label>
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

const ManageApp = {
    data () {
        return {
            // members: [{id: 1, team: 1, name: "山田 太郎", ruby: "タロウ"}, {id: 2, team: 1, name: "佐藤 次郎", ruby: "ジロウ"}, {id: 3, team: 2, name: "鈴木 三郎", ruby: "サブロウ"}],
            members: [],
            scheduleConfs: [],
            // dutyDays: [],
            dutyDays: ["2024年5月1日", "2024年6月1日", "2024年7月1日", "2024年8月1日", "2024年9月1日", "2024年10月1日", "2024年11月1日", "2024年12月1日", "2025年1月1日", "2025年2月1日", "2025年3月1日"],
        };
    },
    mounted () {
        this.reloadMembers();
        this.reloadScheduleConf();
    },
    methods: {
        async reloadMembers () {
            this.members = JSON.parse(await selectTMembers());
        },
        async deleteMember (id) {
            let confirm = window.confirm("本当に削除してもいいですか？");
            if (confirm) {
                await deleteTMembers(id);
                this.reloadMembers();
            };
        },
        async reloadScheduleConf () {
            this.scheduleConfs = JSON.parse(await selectTScheduleConf());
        },
        async deleteScheduleConf (id) {
            let confirm = window.confirm("本当に削除してもいいですか？");
            if (confirm) {
                await deleteTScheduleConf(id);
                this.reloadScheduleConf();
            };
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
        getDutyDaysInMonth (year, month, arrScheduleConf) {
            let result = [];
            const firstDay = this.getFirstDayInMonth(year, month);
            const distances = [];
            arrScheduleConf.forEach((conf) => {
                distances.push(this.getDistanceFromFirstDayToWeekday(firstDay, conf.weekday, conf.ord));
            });
            // console.log(distances);
            distances.sort();
            // console.log(distances);
            distances.forEach((distance) => {
                let cal = this.getFirstDayInMonth(year, month);
                cal.setDate(cal.getDate() + distance);
                // console.log("getMonth:", cal.getMonth());
                // console.log("month:", month);
                // console.log("getTime:", cal.getTime());
                if (cal.getMonth() === month) {
                    result.push(cal.getTime());
                }
            });
            return result;
        },
        getFirstDayInMonth (year, month) {
            return new Date(year, month, 1);
        },
        getDistanceFromFirstDayToWeekday (firstDay, weekday, ord) {
            let weekdayOfFirstDay = firstDay.getDay();
            let distanceToWeekday;
            if (weekday >= weekdayOfFirstDay) {
                distanceToWeekday = weekday - weekdayOfFirstDay; // 初日の曜日より後の曜日の場合
            } else {
                distanceToWeekday = weekday + (7 - weekdayOfFirstDay) // 初日の曜日より前の曜日の場合
            }
            return distanceToWeekday + (7 * (ord - 1));
        },
        getDutyDays () {
            // 現在から1年分の当番の日を取得する
            let today = new Date();
            let dutyDaysForOneYear = [];

            let conf = [
                {"id":1,"weekday":5,"ord":2}, // 第2金曜日
                {"id":2,"weekday":3,"ord":1} // 第1水曜日
            ];

            for (let i = 0; i < 12; i++) {
                let dutyDaysInMonth = this.getDutyDaysInMonth(today.getFullYear(), today.getMonth(), conf);
                dutyDaysForOneYear = (dutyDaysForOneYear.concat(dutyDaysInMonth));
                // dutyDaysForOneYear.concat(dutyDaysInMonth);
                // [...dutyDaysForOneYear, ...dutyDaysInMonth];
                today.setMonth(today.getMonth() + 1);
            }

            let today2 = new Date();
            let oneYearLater = new Date(today2);
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)

            let result = [];
            dutyDaysForOneYear.forEach((dutyDay) => {
                if (today2.getTime() < dutyDay && dutyDay < oneYearLater.getTime()) {
                    result.push(dutyDay);
                }
            });

            // for (let i = 0; i < result.length; i++) {
            //     let person = this.members[i % this.members.length];
            //     console.log(result[i], person);
            // }

            // return dutyDaysForOneYear;
            return result;
        }
    },
    components: {
        MembersEditForm,
        ScheduleConfEditForm,
    },
};

window.onload = function () {
    const app = Vue.createApp(ManageApp);
    // app.mount('#app');
    const test = app.mount('#app');



    // test.getDutyDaysInMonth(2023, 11, [{"id":1,"weekday":1,"ord":1},{"id":2,"weekday":1,"ord":2},{"id":3,"weekday":1,"ord":3},{"id":4,"weekday":1,"ord":4},{"id":5,"weekday":1,"ord":5},{"id":6,"weekday":5,"ord":1},{"id":7,"weekday":5,"ord":2},{"id":8,"weekday":5,"ord":3},{"id":9,"weekday":5,"ord":4},{"id":10,"weekday":5,"ord":5},{"id":11,"weekday":3,"ord":1}]);

    // let conf = [
    //     {"id":1,"weekday":5,"ord":2}, // 第2金曜日
    //     {"id":2,"weekday":3,"ord":1} // 第1水曜日
    // ];

    // let days = test.getDutyDaysInMonth(2023, 12 - 1, conf);
    // days.forEach((day) => {
    //     console.log(new Date(day));
    // })

    // console.log(test.getDutyDaysInMonth(2023, 11, [{"id":1,"weekday":5,"ord":2},{"id":2,"weekday":3,"ord":1}]));

    // console.log(test.getDutyDays());

    let arrDutyDays = test.getDutyDays();
    arrDutyDays.sort();
    arrDutyDays.forEach((dutyDays) => {
        let cal = new Date(dutyDays);
        console.log(cal.getFullYear() + ", " + (cal.getMonth() + 1) + "月, " + cal.getDate() + "日, " + cal.getDay()); // 第2金曜日, 第1水曜日
    });
};
