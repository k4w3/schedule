import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { getQuery } from "https://deno.land/x/oak/helpers.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

console.log("start");


const router = new Router();

router.get("/api/TMembers", (context) => {
    console.log("GET /api/TMembers");
    const db = new DB("schedule.db");
    // let res = db.query("SELECT * FROM TMembers");
    let res = db.queryEntries("SELECT id, team, name, ruby FROM TMembers");

    db.close();
    context.response.body = res;
});

router.get("/api/TMembers/:id", (context) => {
    console.log("GET /api/TMembers:id");
    const queryParams = getQuery(context, { mergeParams: true });
    console.log(queryParams);

    const db = new DB("schedule.db");
    let res = db.queryEntries("SELECT id, team, name, ruby FROM TMembers WHERE id=?", [queryParams.id]);
    db.close();
    context.response.body = res;
});

router.post("/api/TMembers", async (context) => {
    console.log("POST /api/TMembers");
    const params = await context.request.body({type:"form"}).value;

    const db = new DB("schedule.db");
    db.query("INSERT INTO TMembers (team, name, ruby) VALUES (?,?,?)",
    [params.get("team"), params.get("name"), params.get("ruby")]);
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
    db.query("UPDATE TMembers SET team=? name=?, ruby=? WHERE id=?",
    [postParams.get("team"), postParams.get("name"), postParams.get("ruby"), queryParams.id]);
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