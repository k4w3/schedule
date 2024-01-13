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

function putTFirstMember(id) {
    return new Promise((resolve, reject) => {
        console.log("put");

        let putData = "id=" + encodeURIComponent(id);

        let req = new XMLHttpRequest();
        req.open("PUT", "/api/TMembers/firstMember");
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

function deleteTFirstMember() {
    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/TMembers/firstMember");
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

function addTWeeklyScheduleConf(trashType, weekday, weekord) {
    return new Promise((resolve, reject) => {

        let postData = "trashType=" + encodeURIComponent(trashType);
        postData += "&weekday=" + encodeURIComponent(weekday);
        postData += "&weekord=" + encodeURIComponent(weekord);

        let req = new XMLHttpRequest();
        req.open("POST", "/api/TWeeklyScheduleConf");
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
        console.log(postData);
        req.send(postData);
    });
};

function putTWeeklyScheduleConf(trashType, weekday, weekord, id) {
    return new Promise((resolve, reject) => {

        let putData = "trashType=" + encodeURIComponent(trashType);
        putData += "&weekday=" + encodeURIComponent(weekday);
        putData += "&weekord=" + encodeURIComponent(weekord);

        let req = new XMLHttpRequest();
        req.open("PUT", "/api/TWeeklyScheduleConf/" + id);
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

function deleteTWeeklyScheduleConf(id) {
    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/TWeeklyScheduleConf/" + id);
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

// function getTDailyScheduleConf(id) {
//     return new Promise((resolve, reject) => {
//         let req = new XMLHttpRequest();
//         req.open("GET", "/api/TDailyScheduleConf/" + id);
//         req.onload = (event) => {
//             resolve(req.responseText);
//         };
//         req.send();
//     });
// };
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

function addTDailyScheduleConf(date, diffType, trashType) {
    return new Promise((resolve, reject) => {

        let postData = "date=" + encodeURIComponent(date);
        postData += "&diffType=" + encodeURIComponent(diffType);
        postData += "&trashType=" + encodeURIComponent(trashType);

        let req = new XMLHttpRequest();
        req.open("POST", "/api/TDailyScheduleConf");
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

function putTDailyScheduleConf(date, diffType, trashType, id) {
    return new Promise((resolve, reject) => {

        let putData = "date=" + encodeURIComponent(date);
        putData += "&diffType=" + encodeURIComponent(diffType);
        putData += "&trashType=" + encodeURIComponent(trashType);

        let req = new XMLHttpRequest();
        req.open("PUT", "/api/TDailyScheduleConf/" + id);
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

function deleteTDailyScheduleConf(id) {
    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/TDailyScheduleConf/" + id);
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
