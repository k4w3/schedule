import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { getQuery } from "https://deno.land/x/oak/helpers.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

console.log("start");


const router = new Router();
const dbName = "schedule.db";

router.get("/api/TMembers/firstMember", (context) => {
    console.log("GET /api/TMembers/firstMember");
    const db = new DB(dbName);
    let confFirstMember = db.queryEntries("SELECT id, originDay FROM TFirstMember");
    let confFirstMemberIds = confFirstMember[0].id
    let confFirstMemberOriginDay = confFirstMember[0].originDay
    // console.log(confFirstMemberIds, confFirstMemberOriginDay);

    let res;
    // TFirstMemberテーブルにデータがある場合
    if (confFirstMember.length) {
        let confFirstMemberId = confFirstMemberIds;
        let confFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers WHERE id=?", [confFirstMemberId]);
        // TMembersテーブルに存在するID
        if (confFirstMembers.length) {
            res = {
                confMemberId: confFirstMembers[0].id,
                calcMember: confFirstMembers[0],
                originDay: confFirstMemberOriginDay
            }
        // TMembersテーブルに存在しないID
        } else {
            let calcFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
            res = {
                confMemberId: confFirstMemberIds,
                calcMember: calcFirstMembers[0],
                originDay: confFirstMemberOriginDay
            }
        }
    // TFirstMemberテーブルにデータがない場合
    } else {
        let calcFirstMembers = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
        res = {
            confMemberId: 0,
            calcMember: calcFirstMembers[0],
            originDay: confFirstMemberOriginDay
        }
    }

    db.close();
    context.response.body = res;
});

router.put("/api/TMembers/firstMember", async (context) => {
    console.log("put /api/TMembers/firstMember");
    const postParams = await context.request.body({type:"form"}).value;
    console.log(postParams);

    const db = new DB(dbName);
    db.query("DELETE FROM TFirstMember");
    db.query("INSERT INTO TFirstMember (id, originDay) VALUES(?,?)",[postParams.get("id"), postParams.get("originDay")]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TMembers/firstMember", async (context) => {
    console.log("delete /api/TMembers/firstMember");

    const db = new DB(dbName);
    db.query("DELETE FROM TFirstMember");
    db.close();
    context.response.body = "OK";
});

router.get("/api/TMembers", (context) => {
    console.log("GET /api/TMembers");
    const db = new DB(dbName);
    // let res = db.query("SELECT * FROM TMembers");
    let res = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord");

    db.close();
    context.response.body = res;
});

router.get("/api/TMembers/:id", (context) => {
    console.log("GET /api/TMembers:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB(dbName);
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

    const db = new DB(dbName);
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

    const db = new DB(dbName);
    db.query("UPDATE TMembers SET team=?, name=?, ruby=?, ord=? WHERE id=?",
    [postParams.get("team"), postParams.get("name"), postParams.get("ruby"), postParams.get("ord"), queryParams.id]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TMembers/:id", async (context) => {
    console.log("delete /api/TMembers");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB(dbName);
    db.query("DELETE FROM TMembers WHERE id=?",
    [queryParams.id]);
    db.close();
    context.response.body = "OK";
});



router.get("/api/TWeeklyScheduleConf", (context) => {
    console.log("GET /api/TWeeklyScheduleConf");
    const db = new DB(dbName);
    // let res = db.query("SELECT * FROM TWeeklyScheduleConf");
    let res = db.queryEntries("SELECT id, trashType, weekday, weekord FROM TWeeklyScheduleConf ORDER BY id");

    db.close();
    context.response.body = res;
});

router.get("/api/TWeeklyScheduleConf/:id", (context) => {
    console.log("GET /api/TWeeklyScheduleConf:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB(dbName);
    let res = db.queryEntries("SELECT id, trashType, weekday, weekord FROM TWeeklyScheduleConf WHERE id=?", [queryParams.id]);
    db.close();
    if (res.length > 0) {
        context.response.body = res[0];
    } else {
        context.response.headers.set("content-type", "application/json; charset=UTF-8");
        context.response.body = "null";
    }
});

router.post("/api/TWeeklyScheduleConf", async (context) => {
    console.log("POST /api/TWeeklyScheduleConf");
    const params = await context.request.body({type:"form"}).value;

    const db = new DB(dbName);
    db.query("INSERT INTO TWeeklyScheduleConf (trashType, weekday, weekord) VALUES (?,?,?)",
    [params.get("trashType"), params.get("weekday"), params.get("weekord")]);
    db.close();
    context.response.body = "OK";
});

router.put("/api/TWeeklyScheduleConf/:id", async (context) => {
    console.log("put /api/TWeeklyScheduleConf");
    const queryParams = getQuery(context, { mergeParams: true });
    const postParams = await context.request.body({type:"form"}).value;
    console.log(queryParams);
    console.log(postParams);

    const db = new DB(dbName);
    db.query("UPDATE TWeeklyScheduleConf SET trashType=?, weekday=?, weekord=? WHERE id=?",
    [postParams.get("trashType"), postParams.get("weekday"), postParams.get("weekord"), queryParams.id]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TWeeklyScheduleConf/:id", async (context) => {
    console.log("delete /api/TWeeklyScheduleConf");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB(dbName);
    db.query("DELETE FROM TWeeklyScheduleConf WHERE id=?",
    [queryParams.id]);
    db.close();
    context.response.body = "OK";
});



router.get("/api/TDailyScheduleConf", (context) => {
    console.log("GET /api/TWeeklyScheduleConf");
    const db = new DB(dbName);
    let res = db.queryEntries("SELECT id, date, diffType, trashType FROM TDailyScheduleConf ORDER BY id");

    db.close();
    context.response.body = res;
});

// router.get("/api/TDailyScheduleConf/:id", (context) => {
//     console.log("GET /api/TDailyScheduleConf:id");
//     const queryParams = getQuery(context, { mergeParams: true });
//     console.log(queryParams);

//     const db = new DB(dbName);
//     let res = db.queryEntries("SELECT id, date, diffType, trashType FROM TDailyScheduleConf WHERE id=?", [queryParams.id]);
//     db.close();
//     if (res.length > 0) {
//         context.response.body = res[0];
//     } else {
//         context.response.headers.set("content-type", "application/json; charset=UTF-8");
//         context.response.body = "null";
//     }
// });

router.get("/api/TDailyScheduleConf/date", (context) => {
    console.log("GET /api/TDailyScheduleConf/date");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB(dbName);
    let res = db.queryEntries("SELECT id, date, diffType, trashType FROM TDailyScheduleConf WHERE date = ?", [queryParams.date]);

    db.close();
    context.response.body = res;
    // console.log(res);
});

router.post("/kameyama/test", async (context) => {
    // console.log("POST /api/TDailyScheduleConf");
    // const params = await context.request.body({type:"form"}).value;
    const params = await context.request.body({type:"text"}).value;
    console.log(params);

    // const db = new DB(dbName);
    // db.query("INSERT INTO TDailyScheduleConf (date, diffType, trashType) VALUES (?,?,?)",
    // [params.get("date"), params.get("diffType"), params.get("trashType")]);
    // db.close();
    // context.response.body = "OK";
    context.response.body = '<html><body><div style="color:red;">foo</div></body></html>';
});

router.get("/kameyama/test", async (context) => {
    const queryParams = getQuery(context, { mergeParams: true });
    // const params = await context.request.body({type:"form"}).value;
    // const params = await context.request.body({type:"text"}).value;
    console.log(queryParams);

    // context.response.body = "OK";
    context.response.body = '<html><body><div style="color:red;">foo</div></body></html>';
});

router.post("/api/TDailyScheduleConf", async (context) => {
    console.log("POST /api/TDailyScheduleConf");
    const params = await context.request.body({type:"form"}).value;

    const db = new DB(dbName);
    db.query("INSERT INTO TDailyScheduleConf (date, diffType, trashType) VALUES (?,?,?)",
    [params.get("date"), params.get("diffType"), params.get("trashType")]);
    db.close();
    context.response.body = "OK";
});

router.put("/api/TDailyScheduleConf/:id", async (context) => {
    console.log("put /api/TDailyScheduleConf");
    const queryParams = getQuery(context, { mergeParams: true });
    const postParams = await context.request.body({type:"form"}).value;
    console.log(queryParams);
    console.log(postParams);

    const db = new DB(dbName);
    db.query("UPDATE TDailyScheduleConf SET date=?, diffType=?, trashType=? WHERE id=?",
    [postParams.get("date"), postParams.get("diffType"), postParams.get("trashType"), queryParams.id]);
    db.close();
    context.response.body = "OK";
});

router.delete("/api/TDailyScheduleConf/:id", async (context) => {
    console.log("delete /api/TDailyScheduleConf");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB(dbName);
    db.query("DELETE FROM TDailyScheduleConf WHERE id=?",
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