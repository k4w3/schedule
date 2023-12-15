CREATE TABLE IF NOT EXISTS TMembers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team INTEGER,
  name TEXT,
  ruby TEXT,
  ord INTEGER
);

CREATE TABLE IF NOT EXISTS TScheduleConf (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  weekday INTEGER,
  ord INTEGER
);


insert into TMembers (team, name, ruby, ord) values(1, '山田太郎','ヤマダタロウ', 1);
insert into TMembers (team, name, ruby, ord) values(1, '佐藤次郎','サトウジロウ', 2);
insert into TMembers (team, name, ruby, ord) values(2, '鈴木三郎','スズキサブロウ', 3);
insert into TMembers (team, name, ruby, ord) values(2, '高橋四郎','タカハシシロウ', 4);

insert into TScheduleConf (weekday, ord) values(1, 1);
insert into TScheduleConf (weekday, ord) values(1, 2);
insert into TScheduleConf (weekday, ord) values(1, 3);
insert into TScheduleConf (weekday, ord) values(1, 4);
insert into TScheduleConf (weekday, ord) values(1, 5);
insert into TScheduleConf (weekday, ord) values(5, 1);
insert into TScheduleConf (weekday, ord) values(5, 2);
insert into TScheduleConf (weekday, ord) values(5, 3);
insert into TScheduleConf (weekday, ord) values(5, 4);
insert into TScheduleConf (weekday, ord) values(5, 5);
insert into TScheduleConf (weekday, ord) values(3, 1);

-- 0 日曜日
-- 1 月曜日
-- 2 火曜日
-- 3 水曜日
-- 4 木曜日
-- 5 金曜日
-- 6 土曜日