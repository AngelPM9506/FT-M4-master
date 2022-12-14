/*
 Recomendado de usar antes que nada 
 .header on
 .mode column
 .timer 0
 */
/*Birthyear*/
SELECT *
FROM movies
WHERE year = 1995;
/*1982*/
SELECT COUNT(*)
FROM movies
WHERE year = 1982;
/*Stacktors*/
SELECT *
FROM actors
WHERE last_name LIKE 'stack';
/*Fame Name Game*/
SELECT last_name,
    COUNT(*) AS nveces
FROM actors
GROUP BY last_name
HAVING COUNT(*) > 1
ORDER BY nveces DESC
LIMIT 10;
/*************/
SELECT first_name,
    COUNT(*) AS nveces
FROM actors
GROUP BY first_name
HAVING COUNT(*) > 1
ORDER BY nveces DESC
LIMIT 10;
/*Prolific*/
SELECT first_name,
    last_name,
    role,
    COUNT(*) AS nveces
FROM roles
    INNER JOIN actors ON actors.id = roles.actor_id
GROUP BY actor_id
HAVING COUNT(*) > 1
ORDER BY nveces DESC
LIMIT 100;
/*Bottom of the Barrel*/
SELECT genre,
    COUNT(*) AS nveces
FROM movies_genres
GROUP BY genre
HAVING COUNT(*) > 1
ORDER BY nveces ASC;
/*Braveheart*/
SELECT first_name,
    last_name,
    role
FROM roles
    INNER JOIN actors ON actors.id = roles.actor_id
    INNER JOIN movies ON movies.id = roles.movie_id
WHERE name = "Braveheart"
    AND year = 1995;
/*Leap Noir*/
SELECT d.first_name,
    m.name,
    m.year
FROM directors AS d
    JOIN movies_directors AS md ON d.id = md.director_id
    JOIN movies AS m ON md.movie_id = m.id
    JOIN movies_genres AS mg ON m.id = mg.movie_id
WHERE mg.genre = 'Film-Noir'
    AND m.year % 4 = 0
ORDER BY m.name DESC;
/*Bacon*/
SELECT (a.first_name || " " || a.last_name) as fullName
FROM actors as a
    JOIN roles as r ON a.id = r.actor_id
    JOIN movies as m ON r.movie_id = m.id
    JOIN movies_genres as mg ON m.id = mg.movie_id
WHERE mg.genre = 'Drama'
    AND m.id IN(
        SELECT r.movie_id
        FROM roles as r
            JOIN actors as a ON r.actor_id = a.id
        WHERE a.first_name = 'Kevin'
            AND a.last_name = 'Bacon'
    )
    AND (a.first_name || " " || a.last_name) != 'Kevin Bacon';
/*Inmortal Actors*/
SELECT *
FROM actors AS a
WHERE a.id IN(
        SELECT r.actor_id
        FROM roles as r
            JOIN movies as m ON r.movie_id = m.id
        WHERE m.year < 1900
    )
    AND a.id IN(
        SELECT r.actor_id
        FROM roles as r
            JOIN movies as m ON r.movie_id = m.id
        WHERE m.year > 2000
    )
ORDER BY a.first_name DESC;
/*Busy Filming*/
SELECT a.first_name,
    a.last_name,
    m.name,
    COUNT(DISTINCT r.role) as nveces
FROM actors as a
    JOIN roles as r ON a.id = r.actor_id
    JOIN movies as m ON r.movie_id = m.id
WHERE m.year > 1990
GROUP BY a.id,
    m.id
HAVING nveces > 5;
/*???*/
SELECT m.year,
    COUNT(*) as nwoman
FROM movies as m
WHERE m.id NOT IN(
        SELECT r.movie_id
        FROM roles AS r
            JOIN actors AS a ON r.actor_id = a.id
        WHERE a.gender = 'M'
    )
GROUP BY m.year
ORDER BY m.year DESC;