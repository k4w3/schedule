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
            console.log(this.showModal);
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.id === "0") {
                await addTScheduleConf(this.trashType, this.weekday, this.weekord);
            } else {
                await putTScheduleConf(this.trashType, this.weekday, this.weekord, this.id);
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
            // name: "選択してください",
        };
    },
    methods: {
        open (itemX) {
            let item = itemX.calcMember;
            if (item) {
                this.id = itemX.confMemberId;
                // this.name = item.name;
            }
            this.showModal = true;
            console.log(this.showModal);
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.id !== "0") {
                console.log("0じゃない");
                await putTFirstMember(this.id);
            } else {
                console.log("0です");
                await deleteTFirstMember();
            }
            this.showModal = false;
            await this.$parent.reloadFirstMember();
            this.$parent.sortMembers(this.$parent.members, this.$parent.firstMember.calcMember);
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

const ManageApp = {
    data () {
        return {
            members: [],
            firstMember: null,
            sortedMembers: [],
            scheduleConfs: [],
            dutyDays: [],
            // members: [
            //     {id: 1, team: 1, name: "山田 太郎", ruby: "タロウ"},
            //     {id: 2, team: 1, name: "佐藤 次郎", ruby: "ジロウ"},
            // ],
            // scheduleConfs: [
            //     {"id":1,"weekday":5,"weekord":2}, // 第2金曜日
            //     {"id":2,"weekday":3,"weekord":1} // 第1水曜日
            // ],
            // dutyDays: [
            //     "2024年5月1日",
            //     "2024年6月1日",
            // ],
        };
    },
    async mounted () {
        this.reloadMembers();
        await this.reloadScheduleConf();
        this.reloadDutyDays(this.scheduleConfs);
        await this.reloadFirstMember();
        this.sortMembers(this.members, this.firstMember.calcMember);
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
        async reloadFirstMember () {
            this.firstMember = JSON.parse(await getTFirstMember());
        },
        async sortMembers (members, firstMember) {
            // const index = members.findIndex((member) => {
            //     return (member.id === Number(firstMember.id));
            // });

            let index;
            for (let i = 0; i < members.length; i++) {
                if (members[i].id === firstMember.id) {
                    index = i;
                }
            }
            // console.log(index);

            let result = members.slice(index).concat(members.slice(0, index));
            // return result;
            this.sortedMembers = result;
        },
        // 現在から1年分の当番の日を計算する
        reloadDutyDays (arrScheduleConf) {
            let today = new Date();
            let dutyDaysForOneYear = [];

            for (let i = 0; i < 13; i++) {
                let dutyDaysInMonth = this.getDaysInMonth(today.getFullYear(), today.getMonth(), arrScheduleConf);
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
            result.sort();
            result.forEach((oItem) => {
                let trashTypeString = this.getTrashTypeString(oItem.trashType);
                let item = oItem.time;
                let dutyDay = new Date(item);
                let year = dutyDay.getFullYear();
                let month = dutyDay.getMonth() + 1;
                let date = dutyDay.getDate();
                let weekday = this.getWeekdayString(dutyDay.getDay());
                let dutyDayString = year + "年" + month + "月" + date + "日" + "(" + weekday + ")";
                this.dutyDays.push({date: dutyDayString, trashType: trashTypeString});
            })
        },
        // ある月の指定した曜日の日にちのリストを返す
        getDaysInMonth (year, month, arrScheduleConf) {
            let result = [];
            const firstDay = new Date(year, month, 1)
            const distances = [];
            arrScheduleConf.forEach((conf) => {
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
    },
    components: {
        MembersEditForm,
        ScheduleConfEditForm,
        FirstMemberEditForm,
    },
};

window.onload = function () {
    const app = Vue.createApp(ManageApp);
    app.mount('#app');
    // const test = app.mount('#app');

    // let conf = [
    //     {"id":1,"weekday":5,"weekord":2}, // 第2金曜日
    //     {"id":2,"weekday":3,"weekord":1} // 第1水曜日
    // ];

    // let days = test.getDaysInMonth(2023, 12 - 1, conf);
    // days.forEach((day) => {
    //     console.log(new Date(day));
    // })
};
