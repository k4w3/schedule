function getTFirstMember() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TMembers/firstMember");
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};



function selectTMembers() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TMembers");
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function getTMembers(id) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TMembers/" + id);
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function selectTWeeklyScheduleConf() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TWeeklyScheduleConf");
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function getTWeeklyScheduleConf(id) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TWeeklyScheduleConf/" + id);
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};



function selectTDailyScheduleConf() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TDailyScheduleConf");
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function getTDailyScheduleConf(date) {
    return new Promise((resolve, reject) => {

        let params = "date=" + encodeURIComponent(date);
        // console.log(params);

        let req = new XMLHttpRequest();
        req.open("GET", "/api/TDailyScheduleConf/date?" + params);
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
        // console.log(req);
    });
};
