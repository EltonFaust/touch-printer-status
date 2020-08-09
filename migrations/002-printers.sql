--------------------------------------------------------------------------------
-- up
--------------------------------------------------------------------------------

CREATE TABLE printer (
    id        INTEGER PRIMARY KEY,
    identifer TEXT    NOT NULL,
    name      TEXT    NOT NULL,
    light_pin INTEGER NULL,
    light_on  BOOLEAN NOT NULL,
    created   TEXT    NOT NULL,
    updated   TEXT    NOT NULL
);


--------------------------------------------------------------------------------
-- down
--------------------------------------------------------------------------------


DROP TABLE printer;
