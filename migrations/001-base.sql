--------------------------------------------------------------------------------
-- up
--------------------------------------------------------------------------------

CREATE TABLE note (
    id      INTEGER PRIMARY KEY,
    title   TEXT    NOT NULL,
    path    TEXT    NOT NULL,
    created TEXT    NOT NULL,
    updated TEXT    NOT NULL
);


--------------------------------------------------------------------------------
-- down
--------------------------------------------------------------------------------


DROP TABLE note;