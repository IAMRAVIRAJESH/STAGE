ALTER TABLE my_list DROP CONSTRAINT my_list_content_id_fkey;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE users
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

--Users entries
INSERT INTO users (username, preferences, watch_history)
VALUES (
    'john_doe',
    '{"favoriteGenres": ["Action", "Sci-Fi"], "dislikedGenres": ["Comedy"]}',
    '[]'
);

INSERT INTO users (username, preferences, watch_history)
VALUES (
    'jane_smith',
    '{"favoriteGenres": ["Drama", "Romance"], "dislikedGenres": ["Horror"]}',
    '[{"contentId": "movie-101", "watchedOn": "2024-07-28T12:00:00Z", "rating": 4.5}, {"contentId": "series-202", "watchedOn": "2024-07-29T15:30:00Z", "rating": 3.8}]'
);

INSERT INTO users (username, preferences, watch_history)
VALUES (
    'test_user',
    '{"favoriteGenres": ["Comedy"], "dislikedGenres": ["Action", "Sci-Fi"]}',
    '[{"contentId": "episode-505", "watchedOn": "2024-08-01T20:00:00Z"}]'
);


--Movies entries
INSERT INTO movies (id, title, description, genres, release_date, director, actors)
VALUES (
  uuid_generate_v4(), 
  'Inception',
  'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  '["Sci-Fi", "Action", "Thriller"]',
  '2010-07-16',
  'Christopher Nolan',
  '["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"]'
);

INSERT INTO movies (id, title, description, genres, release_date, director, actors)
VALUES (
  uuid_generate_v4(),
  'The Shawshank Redemption',
  'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  '["Drama"]',
  '1994-09-23',
  'Frank Darabont',
  '["Tim Robbins", "Morgan Freeman", "Bob Gunton"]'
);

INSERT INTO movies (id, title, description, genres, release_date, director, actors)
VALUES (
  uuid_generate_v4(),
  'Pulp Fiction',
  'The lives of several criminals in Los Angeles intertwine.  Stories of violence and redemption.',
  '["Crime", "Drama", "Thriller"]',
  '1994-10-14',
  'Quentin Tarantino',
  '["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Harvey Keitel"]'
);

INSERT INTO movies (id, title, description, genres, release_date, director, actors)
VALUES (
  uuid_generate_v4(),
  'Spirited Away',
  'During her familys move to a new suburb, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
  '["Animation", "Adventure", "Fantasy"]',
  '2001-07-20',
  'Hayao Miyazaki',
  '["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"]'
);

INSERT INTO movies (id, title, description, genres, release_date, director, actors)
VALUES (
  uuid_generate_v4(),
  'The Dark Knight',
  'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.',
  '["Action", "Crime", "Drama"]',
  '2008-07-18',
  'Christopher Nolan',
  '["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"]'
);


--Tvshows entries
INSERT INTO tv_shows (id, title, description, genres, episodes)
VALUES (
  uuid_generate_v4(),
  'Breaking Bad',
  'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his familys future.',
  '["Crime", "Drama", "Thriller"]',
  '[
    {"episode_number": 1, "season_number": 1, "release_date": "2008-01-20", "director": "Vince Gilligan", "actors": ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]},
    {"episode_number": 2, "season_number": 1, "release_date": "2008-01-27", "director": "Adam Bernstein", "actors": ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]},
    {"episode_number": 3, "season_number": 1, "release_date": "2008-02-03", "director": "Tricia Brock", "actors": ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]}
  ]'
);

INSERT INTO tv_shows (id, title, description, genres, episodes)
VALUES (
  uuid_generate_v4(),
  'Game of Thrones',
  'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for centuries.',
  '["Action", "Adventure", "Drama"]',
  '[
    {"episode_number": 1, "season_number": 1, "release_date": "2011-04-17", "director": "Tim Van Patten", "actors": ["Sean Bean", "Peter Dinklage", "Maisie Williams"]},
    {"episode_number": 2, "season_number": 1, "release_date": "2011-04-24", "director": "Brian Kirk", "actors": ["Sean Bean", "Peter Dinklage", "Maisie Williams"]},
    {"episode_number": 1, "season_number": 2, "release_date": "2012-04-01", "director": "Alan Taylor", "actors": ["Peter Dinklage", "Lena Headey", "Emilia Clarke"]}
  ]'
);

INSERT INTO tv_shows (id, title, description, genres, episodes)
VALUES (
  uuid_generate_v4(),
  'Stranger Things',
  'In a small town, where everyone knows everyone, a young boy vanishes mysteriously. His disappearance unearths a series of supernatural events.',
  '["Drama", "Fantasy", "Horror"]',
  '[
    {"episode_number": 1, "season_number": 1, "release_date": "2016-07-15", "director": "The Duffer Brothers", "actors": ["Millie Bobby Brown", "Finn Wolfhard", "Gaten Matarazzo"]},
    {"episode_number": 2, "season_number": 1, "release_date": "2016-07-15", "director": "The Duffer Brothers", "actors": ["Millie Bobby Brown", "Finn Wolfhard", "Gaten Matarazzo"]},
    {"episode_number": 1, "season_number": 2, "release_date": "2017-10-27", "director": "The Duffer Brothers", "actors": ["Millie Bobby Brown", "Finn Wolfhard", "Gaten Matarazzo"]}
  ]'
);

--MyList entries
INSERT INTO my_list (id, user_id, content_id, content_type, created_at)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM users WHERE username = 'john_doe'), 
  (SELECT id FROM movies WHERE title = 'Inception'), 
  'movie',
  '2024-08-05'
);

INSERT INTO my_list (id, user_id, content_id, content_type, created_at)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM users WHERE username = 'john_doe'),
  (SELECT id FROM movies WHERE title = 'The Dark Knight'),
  'movie',
  '2024-08-06'
);

INSERT INTO my_list (id, user_id, content_id, content_type, created_at)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM users WHERE username = 'jane_smith'),
  (SELECT id FROM tv_shows WHERE title = 'Breaking Bad'),
  'tvshow',
  '2024-08-07'
);

INSERT INTO my_list (id, user_id, content_id, content_type, created_at)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM users WHERE username = 'jane_smith'),
  (SELECT id FROM movies WHERE title = 'Pulp Fiction'),
  'movie',
  '2024-08-08'
);

INSERT INTO my_list (id, user_id, content_id, content_type, created_at)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM users WHERE username = 'test_user'),
  (SELECT id FROM movies WHERE title = 'Spirited Away'),
  'movie',
  '2024-08-09'
);

INSERT INTO my_list (id, user_id, content_id, content_type, created_at)
VALUES (
  uuid_generate_v4(),
  (SELECT id FROM users WHERE username = 'test_user'),
  (SELECT id FROM tv_shows WHERE title = 'Stranger Things'),
  'tvshow',
  '2024-08-10'
);