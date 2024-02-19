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
            ふりがな:
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
            originDay: "",
        };
    },
    methods: {
        open (itemX) {
            let item = itemX.calcMember;
            if (item) {
                this.id = itemX.confMemberId;
                this.originDay = new Date(itemX.originDay).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
            }
            this.showModal = true;
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
        async submit (event) {
            event.preventDefault();
            if (this.originDay !== "") {
                await putTFirstMember(this.id, new Date(this.originDay).getTime());
            } else {
                window.alert("基準日を設定してください");
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
            先頭メンバー:
            <select v-model="id">
                <option v-for="member in this.$parent.members" v-bind:value="member.id">
                    {{member.name}}
                </option>
            </select>
        </div>
        <div>
            基準日:
            <input type="date" v-model="originDay">
        </div>
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
            // scheduleConfs: [
            //     {date: 1706194800000, type: 1, trashType: 1,},
            //     {date: 1706194800000, type: 1, trashType: 2, diffType: 2, dailyScheduleId: 1},
            //     {date: 1706194800000, type: 2, trashType: 3, diffType: 1, dailyScheduleId: 2},
            // ],
            scheduleConfs: [],
            date: "",
            addTrashType: "1",
        };
    },
    methods: {
        async update () {
            await this.$parent.loadWeeklyScheduleConf();
            await this.$parent.loadDailyScheduleConf();
            this.scheduleConfs = calcScheduleConfsForDay(this.$parent.weeklyScheduleConfs, this.$parent.dailyScheduleConfs, this.date);
        },
        async denyWeeklyScheduleConf (date, trashType) {
            let confirm = window.confirm("設定を打ち消しますか？");
            if (confirm) {
                await addTDailyScheduleConf(date, 2, trashType);
                this.update();
                this.$parent.update();
            };
        },
        async addDailyScheduleConf (date, trashType) {
            await addTDailyScheduleConf(date, 1, trashType);
            this.update();
            this.$parent.update();
        },
        async deleteDailyScheduleConf (id, diffType) {
            let confirm = "";
            if (diffType === 1) {
                confirm = window.confirm("設定を削除しますか？");
            } else if (diffType === 2){
                confirm = window.confirm("設定の打ち消しを解除しますか？");
            };
            if (confirm) {
                await deleteTDailyScheduleConf(id);
                await this.$parent.update();
                this.update();
                this.$parent.update();
            };
        },
        async open (day) {
            this.date = day.date.getTime();
            await this.$parent.loadWeeklyScheduleConf();
            await this.$parent.loadDailyScheduleConf();
            this.scheduleConfs = calcScheduleConfsForDay(this.$parent.weeklyScheduleConfs, this.$parent.dailyScheduleConfs, this.date);
            this.showModal = true;
            // console.log(this.scheduleConfs);
        },
        close (event) {
            event.preventDefault();
            this.showModal = false;
        },
    },
    template: `
<div class="modal-overlay" v-show="showModal">
  <div class="modal-content">
    <div>
        <h3 style="border-bottom: 1px solid">追加</h3>
        <select v-model="addTrashType">
            <option value="1">燃えるゴミ</option>
            <option value="2">燃えないゴミ</option>
            <option value="3">その他</option>
        </select>
    <button type="button" v-on:click="addDailyScheduleConf(date, addTrashType)">追加</button>
    </div>

    <div>
    <h3 style="border-bottom: 1px solid">編集</h3>
    <table border="1">
        <thead>
        <tr>
            <th>設定の種類</th>
            <th>ゴミの種類</th>
            <th>状態</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in scheduleConfs">
        <tr>
            <td v-if="item.type === 1">曜</td>
            <td v-if="item.type === 2">日</td>
            <td>{{ $parent.getTrashTypeString(item.trashType) }}</td>
            <td v-if="!item.diffType || item.diffType === 1">ON</td>
            <td v-if="item.diffType === 2">OFF</td>
            <td v-if="!item.diffType"><button type="button" v-on:click="denyWeeklyScheduleConf(date, item.trashType)">打消</button></td>
            <td v-if="item.diffType === 2"><button type="button" v-on:click="deleteDailyScheduleConf(item.dailyScheduleId, item.diffType)">打消解除</button></td>
            <td v-if="item.diffType === 1"><button type="button" v-on:click="deleteDailyScheduleConf(item.dailyScheduleId, item.diffType)">削除</button></td>
        </tr>
        </template>
        </tbody>
    </table>
    </div>

    <div>
    <h3 style="border-bottom: 1px solid">結果</h3>
    <template v-for="item in scheduleConfs">
    <div v-if="item.diffType !== 2">
        <ul>
            <li>{{ $parent.getTrashTypeString(item.trashType) }}</li>
        </ul>
    </div>
    </template>
    </div>

    <div style="text-align: center;">
        <button type="button" v-on:click="close">キャンセル</button>
    </div>
  </div>
</div>
`
};

const ManageApp = {
    data () {
        let currentDate = new Date();
        return {
            days: 0,
            nYear: 2,
            scheduleConfs: [],
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
        await this.loadFirstMember();
        this.days = calcDaysInNYear(this.firstMember.originDay, this.nYear);
        await this.loadWeeklyScheduleConf();
        await this.loadDailyScheduleConf();
        this.scheduleConfs = calcScheduleConfs(this.weeklyScheduleConfs, this.dailyScheduleConfs, this.days);
        this.dutyDays = calcDutyDays(this.scheduleConfs);
        await this.loadMembers();
        this.sortedMembers = calcSortedMembers(this.members, this.firstMember);
        this.duties = calcDuties(this.dutyDays, this.sortedMembers);
        this.calendarDays = calcCalendarDays(this.daysInMonth, this.duties);
    },
    computed: {
        daysInMonth() {
            let result = [];
            const year = this.currentMonth.getFullYear();
            const month = this.currentMonth.getMonth();
            const lastDay = new Date(year, month + 1, 0).getDate();
            for (let i = 1; i <= lastDay; i++) {
                result.push(new Date(year, month, i).getTime());
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
            await this.loadFirstMember();
            this.days = calcDaysInNYear(this.firstMember.originDay, this.nYear);
            await this.loadWeeklyScheduleConf();
            await this.loadDailyScheduleConf();
            this.scheduleConfs = calcScheduleConfs(this.weeklyScheduleConfs, this.dailyScheduleConfs, this.days);
            this.dutyDays = calcDutyDays(this.scheduleConfs);
            await this.loadMembers();
            this.sortedMembers = calcSortedMembers(this.members, this.firstMember);
            this.duties = calcDuties(this.dutyDays, this.sortedMembers);
            this.calendarDays = calcCalendarDays(this.daysInMonth, this.duties);
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
        async loadFirstMember () {
            this.firstMember = JSON.parse(await getTFirstMember());
        },
        prevMonth() {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
            this.calendarDays = calcCalendarDays(this.daysInMonth, this.duties);
        },
        nextMonth() {
            this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
            this.calendarDays = calcCalendarDays(this.daysInMonth, this.duties);
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
        /**
        * 曜日を文字列にして返す
        * @param {*} weekday - 曜日
        * @return 曜日の文字列
        */
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
