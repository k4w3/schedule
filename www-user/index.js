const UserApp = {
    data () {
        let currentDate = new Date();
        return {
            days: 0,
            nYear: 1,
            scheduleConfs: [],
            weeklyScheduleConfs: [],
            dailyScheduleConfs: [],
            dutyDays: [],
            members: [],
            firstMember: null,
            sortedMembers: [],
            duties: [],
            findName: "",
            dutiesList: [],
            calendarDays: [],

            currentMonth: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            weekDayLabel: ["日", "月", "火", "水", "木", "金", "土"],
        };
    },
    async mounted () {
        this.days = calcDaysInNYear(this.nYear);
        await this.loadWeeklyScheduleConf();
        await this.loadDailyScheduleConf();
        this.scheduleConfs = calcScheduleConfs(this.weeklyScheduleConfs, this.dailyScheduleConfs, this.days);
        this.dutyDays = calcDutyDays(this.scheduleConfs);
        await this.loadMembers();
        await this.loadFirstMember();
        this.sortedMembers = calcSortedMembers(this.members, this.firstMember);
        this.duties = calcDuties(this.dutyDays, this.sortedMembers);
        this.calcDutiesList(this.duties, this.findName);
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
            let nYear = 1;
            this.days = calcDaysInNYear(nYear);
            await this.loadWeeklyScheduleConf();
            await this.loadDailyScheduleConf();
            this.scheduleConfs = calcScheduleConfs(this.weeklyScheduleConfs, this.dailyScheduleConfs, this.days);
            this.dutyDays = calcDutyDays(this.scheduleConfs);
            await this.loadMembers();
            await this.loadFirstMember();
            this.sortedMembers = calcSortedMembers(this.members, this.firstMember);
            this.duties = calcDuties(this.dutyDays, this.sortedMembers);
            this.calcDutiesList(this.duties, this.findName);
            this.calendarDays = calcCalendarDays(this.daysInMonth, this.duties);
        },
        async loadMembers () {
            this.members = JSON.parse(await selectTMembers());
        },
        async loadWeeklyScheduleConf () {
            this.weeklyScheduleConfs = JSON.parse(await selectTWeeklyScheduleConf());
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
        find (event) {
            event.preventDefault();
            this.calcDutiesList(this.duties, this.findName);
        },
        calcDutiesList (duties, findName) {
            if (findName === undefined) {
                this.dutiesList = duties;
            } else {
                this.dutiesList = duties.filter((member) => {
                    return member.name.includes(findName) || member.ruby.includes(findName);
                });
            }
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
};

window.onload = function () {
    const app = Vue.createApp(UserApp);
    app.mount('#app');
};
