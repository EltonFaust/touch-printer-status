--------------------------------------------------------------------------------
-- up
--------------------------------------------------------------------------------

CREATE TABLE printer (
    id           INTEGER PRIMARY KEY,
    name         TEXT    NOT NULL,
    service_port INTEGER NOT NULL,
    light_pin    INTEGER NULL,
    light_on     BOOLEAN NOT NULL,
    created      TEXT    NOT NULL,
    updated      TEXT    NOT NULL
);


--------------------------------------------------------------------------------
-- down
--------------------------------------------------------------------------------


DROP TABLE printer;
