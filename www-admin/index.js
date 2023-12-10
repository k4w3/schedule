const EditForm = {
    data () {
        return {
            showModal: false,
            id: "0",
            team: "0",
            name: "",
            ruby: "",
        };
    },
    methods: {
        open (item) {
            if (item) {
                this.id = item.id;
                this.team = item.team;
                this.name = item.name;
                this.ruby = item.ruby;
            } else {
                this.id = "0";
                this.team = "";
                this.name = "";
                this.ruby = "";
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
                console.log("追加");
                console.log(this.team);
                console.log(this.name);
                console.log(this.ruby);
                await addTMembers(this.team, this.name, this.ruby);
            } else {
                console.log("更新");
                await putTMembers(this.team, this.name, this.ruby, this.id);
            }
            this.showModal = false;
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
            <button type="button" v-on:click="submit">送信</button>
            <button type="button" v-on:click="close">キャンセル</button>
        </div>
    </form>
  </div>
</div>
`
};

const DutyDaysList = {
    template: `
<div>
<h2>すべての当番日</h2>
<table border="1">
    <thead>
    <tr>
        <th>当番日</th>
        <th>班</th>
        <th>名前</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(dutyDay, index) in this.$parent.dutyDays">
        <td>{{dutyDay}}</td>
        <td>{{this.$parent.members[index % this.$parent.members.length].team}}</td>
        <td>{{this.$parent.members[index % this.$parent.members.length].name}}</td>
    </tr>
    </tbody>
</table>
</div>
`
};

const ManageApp = {
    data () {
        return {
            members: [{id: 1, team: 1, name: "山田 太郎", ruby: "タロウ"}, {id: 2, team: 1, name: "佐藤 次郎", ruby: "ジロウ"}, {id: 3, team: 2, name: "鈴木 三郎", ruby: "サブロウ"}],
            // members: [],
            dutyDays: ["2024年5月1日", "2024年6月1日", "2024年7月1日", "2024年8月1日", "2024年9月1日", "2024年10月1日", "2024年11月1日", "2024年12月1日", "2025年1月1日", "2025年2月1日", "2025年3月1日"],
        };
        // return {
        //     members: [],
        //     dutyDays: [],
        // };
    },
    mounted () {
        // this.membersReload();
    },
    methods: {
        async membersReload () {
            this.members = JSON.parse(await selectTMembers());
            console.log(this.members);
        },
    },
    components: {
        EditForm,
        DutyDaysList,
    },
};

window.onload = function () {
    console.log("hello");
    const app = Vue.createApp(ManageApp);
    app.mount('#app');
};
