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

function addTMembers(team, name, ruby, ord) {
    return new Promise((resolve, reject) => {

        let postData = "team=" + encodeURIComponent(team);
        postData += "&name=" + encodeURIComponent(name);
        postData += "&ruby=" + encodeURIComponent(ruby);
        postData += "&ord=" + encodeURIComponent(ord);

        let req = new XMLHttpRequest();
        req.open("POST", "/api/TMembers");
        req.onload = (event) => {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req.responseText);
                }
            }
        };

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(postData);
    });
};

function putTMembers(team, name, ruby, ord, id) {
    return new Promise((resolve, reject) => {

        let putData = "team=" + encodeURIComponent(team);
        putData += "&name=" + encodeURIComponent(name);
        putData += "&ruby=" + encodeURIComponent(ruby);
        putData += "&ord=" + encodeURIComponent(ord);

        let req = new XMLHttpRequest();
        req.open("PUT", "/api/TMembers/" + id);
        req.onload = (event) => {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req.responseText);
                }
            }
        };

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(putData);
    });
};

function deleteTMembers(id) {
    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/TMembers/" + id);
        req.onload = (event) => {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req.responseText);
                }
            }
        };

        req.send();
    });
};



function selectTScheduleConf() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TScheduleConf");
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function getTScheduleConf(id) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TScheduleConf/" + id);
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function addTScheduleConf(week, ord) {
    return new Promise((resolve, reject) => {

        let postData = "week=" + encodeURIComponent(week);
        postData += "&ord=" + encodeURIComponent(ord);

        let req = new XMLHttpRequest();
        req.open("POST", "/api/TScheduleConf");
        req.onload = (event) => {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req.responseText);
                }
            }
        };

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(postData);
    });
};

function putTScheduleConf(week, ord, id) {
    return new Promise((resolve, reject) => {

        let putData = "week=" + encodeURIComponent(week);
        putData += "&ord=" + encodeURIComponent(ord);

        let req = new XMLHttpRequest();
        req.open("PUT", "/api/TScheduleConf/" + id);
        req.onload = (event) => {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req.responseText);
                }
            }
        };

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(putData);
    });
};

function deleteTScheduleConf(id) {
    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/TScheduleConf/" + id);
        req.onload = (event) => {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(req.responseText);
                }
            }
        };

        req.send();
    });
};
