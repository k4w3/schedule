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
            week: "",
            ord: "",
        };
    },
    methods: {
        open (item) {
            if (item) {
                this.id = item.id;
                this.week = item.week;
                this.ord = item.ord;
            } else {
                this.id = "0";
                this.week = "";
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
                await addTScheduleConf(this.week, this.ord);
            } else {
                await putTScheduleConf(this.week, this.ord, this.id);
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
            <label><input type="radio" v-model="week" value="0" checked>日</label>
            <label><input type="radio" v-model="week" value="1">月</label>
            <label><input type="radio" v-model="week" value="2">火</label>
            <label><input type="radio" v-model="week" value="3">水</label>
            <label><input type="radio" v-model="week" value="4">木</label>
            <label><input type="radio" v-model="week" value="5">金</label>
            <label><input type="radio" v-model="week" value="6">土</label>
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
        getWeekString (week) {
            switch (week) {
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
        ScheduleConfEditForm,
    },
};

window.onload = function () {
    console.log("hello");
    const app = Vue.createApp(ManageApp);
    app.mount('#app');
};
