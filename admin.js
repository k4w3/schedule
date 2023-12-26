import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { getQuery } from "https://deno.land/x/oak/helpers.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

console.log("start");


const router = new Router();

// router.get("/api/TMembers/firstMember", (context) => {
//     console.log("GET /api/TMembers/firstMember");
//     const db = new DB("schedule.db");
//     let confFirstMemberIds = db.queryEntries("SELECT id FROM TFirstMember");
//     console.log(confFirstMemberIds);

//     let res;
//     if (confFirstMemberIds.length) {
//         let confFirstMemberId = confFirstMemberIds[0].id;
//         let confFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers WHERE id=?", [confFirstMemberId]);
//         if (confFirstMembers.length) {
//             res = confFirstMembers[0];
//         } else {
//             let calcFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
//             res = calcFirstMembers[0]
//         }
//     } else {
//         let calcFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
//         res = calcFirstMembers[0]
//     }

//     db.close();
//     // console.log(res);
//     context.response.body = res;
// });

router.get("/api/TMembers/firstMember", (context) => {
    console.log("GET /api/TMembers/firstMember");
    const db = new DB("schedule.db");
    let confFirstMemberIds = db.queryEntries("SELECT id FROM TFirstMember");
    console.log(confFirstMemberIds);

    let res;
    if (confFirstMemberIds.length) {
        let confFirstMemberId = confFirstMemberIds[0].id;
        let confFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers WHERE id=?", [confFirstMemberId]);
        if (confFirstMembers.length) {
            // res = confFirstMembers[0];
            res = {
                confMemberId: confFirstMembers[0].id,
                calcMember: confFirstMembers[0]
            }
        } else {
            let calcFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
            // res = calcFirstMembers[0]
            res = {
                confMemberId: confFirstMemberIds[0].id,
                calcMember: calcFirstMembers[0]
            }
        }
    } else {
        let calcFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
        // res = calcFirstMembers[0]
        res = {
            confMemberId: 0,
            calcMember: calcFirstMembers[0]
        }
    }

    db.close();
    // console.log(res);
    context.response.body = res;
});

router.put("/api/TMembers/firstMember", async (context) => {
    console.log("put /api/TMembers/firstMember");
    const postParams = await context.request.body({type:"form"}).value;
    console.log(postParams);

    const db = new DB("schedule.db");
    db.query("DELETE FROM TFirstMember");
    db.query("INSERT INTO TFirstMember (id) VALUES(?)",[postParams.get("id")]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TMembers/firstMember", async (context) => {
    console.log("delete /api/TMembers/firstMember");

    const db = new DB("schedule.db");
    db.query("DELETE FROM TFirstMember");
    db.close();
    context.response.body = "OK";
});

router.get("/api/TMembers", (context) => {
    console.log("GET /api/TMembers");
    const db = new DB("schedule.db");
    // let res = db.query("SELECT * FROM TMembers");
    let res = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord");

    db.close();
    context.response.body = res;
});

router.get("/api/TMembers/:id", (context) => {
    console.log("GET /api/TMembers:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers WHERE id=?", [queryParams.id]);
    db.close();
    if (res.length > 0) {
        context.response.body = res[0];
    } else {
        context.response.headers.set("content-type", "application/json; charset=UTF-8");
        context.response.body = "null";
    }
});

router.post("/api/TMembers", async (context) => {
    console.log("POST /api/TMembers");
    const params = await context.request.body({type:"form"}).value;

    const db = new DB("schedule.db");
    db.query("INSERT INTO TMembers (team, name, ruby, ord) VALUES (?,?,?,?)",
    [params.get("team"), params.get("name"), params.get("ruby"), params.get("ord")]);
    db.close();
    context.response.body = "OK";
});

router.put("/api/TMembers/:id", async (context) => {
    console.log("put /api/TMembers");
    const queryParams = getQuery(context, { mergeParams: true });
    const postParams = await context.request.body({type:"form"}).value;
    console.log(queryParams);
    console.log(postParams);

    const db = new DB("schedule.db");
    db.query("UPDATE TMembers SET team=?, name=?, ruby=?, ord=? WHERE id=?",
    [postParams.get("team"), postParams.get("name"), postParams.get("ruby"), postParams.get("ord"), queryParams.id]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TMembers/:id", async (context) => {
    console.log("delete /api/TMembers");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    db.query("DELETE FROM TMembers WHERE id=?",
    [queryParams.id]);
    db.close();
    context.response.body = "OK";
});



router.get("/api/TScheduleConf", (context) => {
    console.log("GET /api/TScheduleConf");
    const db = new DB("schedule.db");
    // let res = db.query("SELECT * FROM TScheduleConf");
    let res = db.queryEntries("SELECT id, trashType, weekday, weekord FROM TScheduleConf ORDER BY id");

    db.close();
    context.response.body = res;
});

router.get("/api/TScheduleConf/:id", (context) => {
    console.log("GET /api/TScheduleConf:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id, trashType, weekday, weekord FROM TScheduleConf WHERE id=?", [queryParams.id]);
    db.close();
    if (res.length > 0) {
        context.response.body = res[0];
    } else {
        context.response.headers.set("content-type", "application/json; charset=UTF-8");
        context.response.body = "null";
    }
});

router.post("/api/TScheduleConf", async (context) => {
    console.log("POST /api/TScheduleConf");
    const params = await context.request.body({type:"form"}).value;

    const db = new DB("schedule.db");
    db.query("INSERT INTO TScheduleConf (trashType, weekday, weekord) VALUES (?,?,?)",
    [params.get("type"), params.get("weekday"), params.get("weekord")]);
    db.close();
    context.response.body = "OK";
});

router.put("/api/TScheduleConf/:id", async (context) => {
    console.log("put /api/TScheduleConf");
    const queryParams = getQuery(context, { mergeParams: true });
    const postParams = await context.request.body({type:"form"}).value;
    console.log(queryParams);
    console.log(postParams);

    const db = new DB("schedule.db");
    db.query("UPDATE TScheduleConf SET trashType=?, weekday=?, weekord=? WHERE id=?",
    [postParams.get("trashType"), postParams.get("weekday"), postParams.get("weekord"), queryParams.id]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TScheduleConf/:id", async (context) => {
    console.log("delete /api/TScheduleConf");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    db.query("DELETE FROM TScheduleConf WHERE id=?",
    [queryParams.id]);
    db.close();
    context.response.body = "OK";
});



router.get("/api/TDateConf", (context) => {
    console.log("GET /api/TScheduleConf");
    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id, date, diffType, trashType FROM TDateConf ORDER BY id");

    db.close();
    context.response.body = res;
});

router.get("/api/TDateConf/:id", (context) => {
    console.log("GET /api/TDateConf:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id, date, diffType, trashType FROM TDateConf WHERE id=?", [queryParams.id]);
    db.close();
    if (res.length > 0) {
        context.response.body = res[0];
    } else {
        context.response.headers.set("content-type", "application/json; charset=UTF-8");
        context.response.body = "null";
    }
});

router.post("/api/TDateConf", async (context) => {
    console.log("POST /api/TDateConf");
    const params = await context.request.body({type:"form"}).value;

    const db = new DB("schedule.db");
    db.query("INSERT INTO TDateConf (date, diffType, trashType) VALUES (?,?,?)",
    [params.get("date"), params.get("diffType"), params.get("trashType")]);
    db.close();
    context.response.body = "OK";
});

router.put("/api/TDateConf/:id", async (context) => {
    console.log("put /api/TDateConf");
    const queryParams = getQuery(context, { mergeParams: true });
    const postParams = await context.request.body({type:"form"}).value;
    console.log(queryParams);
    console.log(postParams);

    const db = new DB("schedule.db");
    db.query("UPDATE TDateConf SET date=?, diffType=?, trashType=? WHERE id=?",
    [postParams.get("date"), postParams.get("diffType"), postParams.get("trashType"), queryParams.id]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TDateConf/:id", async (context) => {
    console.log("delete /api/TDateConf");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    db.query("DELETE FROM TDateConf WHERE id=?",
    [queryParams.id]);
    db.close();
    context.response.body = "OK";
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
    try {
        await context.send({
            root: `${Deno.cwd()}/www-admin`,
            index: "index.html",
        });
    } catch {
        await next();
    }
});

await app.listen({port: 8090})