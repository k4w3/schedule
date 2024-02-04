CREATE TABLE IF NOT EXISTS TMembers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team INTEGER,
  name TEXT,
  ruby TEXT,
  ord INTEGER
);

CREATE TABLE IF NOT EXISTS TFirstMember (
  id INTEGER
);

CREATE TABLE IF NOT EXISTS TWeeklyScheduleConf (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trashType INTEGER,
  weekday INTEGER,
  weekord INTEGER
);

CREATE TABLE IF NOT EXISTS TDailyScheduleConf (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- date TEXT,
  date INTEGER,
  diffType INTEGER, -- 1 or 2
  trashType INTEGER -- 1 or 2 or 3
);


insert into TMembers (team, name, ruby, ord) values(1, '山田太郎','やまだたろう', 1);
insert into TMembers (team, name, ruby, ord) values(1, '佐藤次郎','さとうじろう', 2);
insert into TMembers (team, name, ruby, ord) values(2, '鈴木三郎','すずきさぶろう', 3);
insert into TMembers (team, name, ruby, ord) values(2, '高橋四郎','たかはししろう', 4);

insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 1);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 2);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 3);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 4);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 5);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 1);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 2);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 3);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 5, 4);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 4);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 5);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(3, 3, 1);

-- insert into TDailyScheduleConf (date, diffType, trashType) values('Fri Jan 26 2024 00:00:00 GMT+0900 (日本標準時)', 1, 3);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Fri Jan 26 2024 00:00:00 GMT+0900 (日本標準時)', 2, 2);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Mon Jan 15 2024 00:00:00 GMT+0900 (日本標準時)', 1, 1);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Tue Jan 16 2024 00:00:00 GMT+0900 (日本標準時)', 1, 2);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Tue Jan 16 2024 00:00:00 GMT+0900 (日本標準時)', 1, 3);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Fri Jan 19 2024 00:00:00 GMT+0900 (日本標準時)', 1, 2);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Mon Jan 22 2024 00:00:00 GMT+0900 (日本標準時)', 1, 3);
-- insert into TDailyScheduleConf (date, diffType, trashType) values('Mon Jan 29 2024 00:00:00 GMT+0900 (日本標準時)', 1, 1);
insert into TDailyScheduleConf (date, diffType, trashType) values(1706194800000, 1, 3);
insert into TDailyScheduleConf (date, diffType, trashType) values(1706194800000, 2, 2);
insert into TDailyScheduleConf (date, diffType, trashType) values(1705244400000, 1, 1);
insert into TDailyScheduleConf (date, diffType, trashType) values(1705330800000, 1, 2);
insert into TDailyScheduleConf (date, diffType, trashType) values(1705330800000, 1, 3);
insert into TDailyScheduleConf (date, diffType, trashType) values(1705590000000, 1, 2);
insert into TDailyScheduleConf (date, diffType, trashType) values(1705849200000, 1, 3);
insert into TDailyScheduleConf (date, diffType, trashType) values(1706454000000, 1, 1);

-- 1 追加差分
-- 2 打消差分

-- 0 打消時の値
-- 1 燃える
-- 2 燃えない
-- 3 その他

-- 0 日曜日
-- 1 月曜日
-- 2 火曜日
-- 3 水曜日
-- 4 木曜日
-- 5 金曜日
-- 6 土曜日