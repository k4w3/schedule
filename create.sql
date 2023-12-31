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
  date TEXT,
  diffType INTEGER, -- 1 or 2
  trashType INTEGER -- 1 or 2 or 3
);


insert into TMembers (team, name, ruby, ord) values(1, '山田太郎','ヤマダタロウ', 1);
insert into TMembers (team, name, ruby, ord) values(1, '佐藤次郎','サトウジロウ', 2);
insert into TMembers (team, name, ruby, ord) values(2, '鈴木三郎','スズキサブロウ', 3);
insert into TMembers (team, name, ruby, ord) values(2, '高橋四郎','タカハシシロウ', 4);

insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 1);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 2);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 3);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 4);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(1, 1, 5);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 1);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 2);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 3);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 4);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(2, 5, 5);
insert into TWeeklyScheduleConf (trashType, weekday, weekord) values(3, 3, 1);

insert into TDailyScheduleConf (date, diffType, trashType) values('2024/1/1', 1, 3);

-- 1 追加差分
-- 2 打消差分

-- 1 燃える
-- 2 燃えない
-- 3 空き缶、瓶、ペットボトル

-- 0 日曜日
-- 1 月曜日
-- 2 火曜日
-- 3 水曜日
-- 4 木曜日
-- 5 金曜日
-- 6 土曜日