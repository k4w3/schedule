const EditForm = {
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

const ManageApp = {
    data () {
        return {
            // members: [{id: 1, team: 1, name: "山田 太郎", ruby: "タロウ"}, {id: 2, team: 1, name: "佐藤 次郎", ruby: "ジロウ"}, {id: 3, team: 2, name: "鈴木 三郎", ruby: "サブロウ"}],
            members: [],
            // dutyDays: [],
            dutyDays: ["2024年5月1日", "2024年6月1日", "2024年7月1日", "2024年8月1日", "2024年9月1日", "2024年10月1日", "2024年11月1日", "2024年12月1日", "2025年1月1日", "2025年2月1日", "2025年3月1日"],
        };
    },
    mounted () {
        this.reloadMembers();
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
        }
    },
    components: {
        EditForm,
    },
};

window.onload = function () {
    console.log("hello");
    const app = Vue.createApp(ManageApp);
    app.mount('#app');
};
