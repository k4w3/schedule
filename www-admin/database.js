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

function addTScheduleConf(trashType, weekday, weekord) {
    return new Promise((resolve, reject) => {

        let postData = "trashType=" + encodeURIComponent(trashType);
        postData += "&weekday=" + encodeURIComponent(weekday);
        postData += "&weekord=" + encodeURIComponent(weekord);

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

function putTScheduleConf(trashType, weekday, weekord, id) {
    return new Promise((resolve, reject) => {

        let putData = "trashType=" + encodeURIComponent(trashType);
        putData += "&weekday=" + encodeURIComponent(weekday);
        putData += "&weekord=" + encodeURIComponent(weekord);

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



function selectTDateConf() {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TDateConf");
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function getTDateConf(id) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", "/api/TDateConf/" + id);
        req.onload = (event) => {
            resolve(req.responseText);
        };
        req.send();
    });
};

function addTDateConf(date, diffType, trashType) {
    return new Promise((resolve, reject) => {

        let postData = "type=" + encodeURIComponent(type);
        postData += "&diffType=" + encodeURIComponent(diffType);
        postData += "&trashType=" + encodeURIComponent(trashType);

        let req = new XMLHttpRequest();
        req.open("POST", "/api/TDateConf");
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

function putTDateConf(date, diffType, trashType, id) {
    return new Promise((resolve, reject) => {

        let putData = "type=" + encodeURIComponent(type);
        putData += "&diffType=" + encodeURIComponent(diffType);
        putData += "&trashType=" + encodeURIComponent(trashType);

        let req = new XMLHttpRequest();
        req.open("PUT", "/api/TDateConf/" + id);
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

function deleteTDateConf(id) {
    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open("DELETE", "/api/TDateConf/" + id);
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
