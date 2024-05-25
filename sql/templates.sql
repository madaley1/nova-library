CREATE TABLE
    template_store (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title varchar(25),
        fields varchar(15000)
    );

INSERT INTO
    template_store (title, fields)
VALUES
    (
        'books',
        '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","isbn":"string"}'
    );

INSERT INTO
    template_store (title, fields)
VALUES
    (
        'movies',
        '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","rating":"string"}'
    );

INSERT INTO
    template_store (title, fields)
VALUES
    (
        'tv shows',
        '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","rating":"string"}'
    );

INSERT INTO
    template_store (title, fields)
VALUES
    (
        'video games',
        '{"id":"number","title":"string","release_date":"date","genre":"multiSelect","rating":"string"}'
    );

INSERT INTO
    template_store (title, fields)
VALUES
    (
        'custom',
        '{"id":"number","title":"string","release_date":"date","genre":"multiSelect"}'
    );