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



router.get("/api/TDailyScheduleConf", (context) => {
    console.log("GET /api/TWeeklyScheduleConf");
    const db = new DB(dbName);
    let res = db.queryEntries("SELECT id, date, diffType, trashType FROM TDailyScheduleConf ORDER BY id");

    db.close();
    context.response.body = res;
});

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



const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
    try {
        await context.send({
            root: `${Deno.cwd()}/www-user`,
            index: "index.html",
        });
    } catch {
        await next();
    }
});

await app.listen({port: 8080})