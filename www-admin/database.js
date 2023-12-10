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

function addTMembers(team, name, ruby) {
    return new Promise((resolve, reject) => {

        let postData = "team=" + encodeURIComponent(team);
        postData += "&name=" + encodeURIComponent(name);
        postData += "&ruby=" + encodeURIComponent(ruby);

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

function putTMembers(team, name, ruby, id) {
    return new Promise((resolve, reject) => {

        let putData = "team=" + encodeURIComponent(team);
        putData += "&name=" + encodeURIComponent(name);
        putData += "&ruby=" + encodeURIComponent(ruby);

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
