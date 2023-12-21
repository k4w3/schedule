import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { getQuery } from "https://deno.land/x/oak/helpers.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

console.log("start");


const router = new Router();

router.get("/api/TMembers/firstMember", (context) => {
    console.log("GET /api/TMembers/firstMember");
    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id FROM TFirstMember");
    let members = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord");

    if (res.length) {
        let firstMember = res[0].id;
        for (let i = 0; i < members.length; i++) {
            // console.log("firstMember:", firstMember);
            // console.log("members[i].id:", members[i].id);
            if (firstMember === members[i].id) {
                res = members[i].id;
                break;
            } else {
                let member = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
                res = member[0].id
            }
        }
    } else {
        let member = db.queryEntries("SELECT id, team, name, ruby, ord FROM TMembers ORDER BY ord LIMIT 1");
        res = member[0].id
    }

    db.close();
    // console.log(res);
    context.response.body = res;
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
    let res = db.queryEntries("SELECT id, type, weekday, weekord FROM TScheduleConf ORDER BY id");

    db.close();
    context.response.body = res;
});

router.get("/api/TScheduleConf/:id", (context) => {
    console.log("GET /api/TScheduleConf:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id, type, weekday, weekord FROM TScheduleConf WHERE id=?", [queryParams.id]);
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
    db.query("INSERT INTO TScheduleConf (type, weekday, weekord) VALUES (?,?,?)",
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
    db.query("UPDATE TScheduleConf SET type=?, weekday=?, weekord=? WHERE id=?",
    [postParams.get("type"), postParams.get("weekday"), postParams.get("weekord"), queryParams.id]);
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