SELECT * FROM books_read ORDER BY id;

ALTER TABLE books_read
ALTER COLUMN date_read TYPE varchar(10);

UPDATE books_read
SET book_title = 'Science of Self Realization'
WHERE id = 1;