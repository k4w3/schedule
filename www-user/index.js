const MembersTable = {
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

const ScheduleApp = {
    data () {
        return {
            myName: "山田 太郎",
            nextDutyDay: "2024年4月1日",
            members: [{id: 1, team: 1, name: "山田 太郎", ruby: "タロウ"}, {id: 2, team: 1, name: "佐藤 次郎", ruby: "ジロウ"}, {id: 3, team: 2, name: "鈴木 三郎", ruby: "サブロウ"}],
            dutyDays: ["2024年5月1日", "2024年6月1日", "2024年7月1日", "2024年8月1日", "2024年9月1日", "2024年10月1日", "2024年11月1日", "2024年12月1日", "2025年1月1日", "2025年2月1日", "2025年3月1日"],
        };
        // return {
        //     myName: "",
        //     nextDutyDay: "",
        //     members: [],
        //     dutyDays: [],
        // };
    },
    mounted () {

    },
    methods: {
        drawMember () {
            selectTList();
        }
        // async show () {
        //     this.name = await 
        // }

    },
    components: {
        MembersTable,
    },
};

window.onload = function () {
    console.log("hello");
    const app = Vue.createApp(ScheduleApp);
    app.mount('#app');
};
