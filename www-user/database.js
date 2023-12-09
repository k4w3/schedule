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

function postTMembers(name, done) {
    return new Promise((resolve, reject) => {

        let postData = "name=" + encodeURIComponent(name);
        postData += "&done=" + encodeURIComponent(done);

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

function putTMembers(name, done, id) {
    return new Promise((resolve, reject) => {

        let putData = "name=" + encodeURIComponent(name);
        putData += "&done=" + encodeURIComponent(done);

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
