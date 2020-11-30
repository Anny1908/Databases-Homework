# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

drop table if exists mentors;

CREATE TABLE mentors (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR (30)NOT NULL,
  city_years       INT,
  tech_skills      VARCHAR (30),
  address          VARCHAR (30)
);

INSERT INTO mentors (name, city_years, tech_skills, address) VALUES ('John Smith', 10,'javascript', '11 New Road, Glasgow');
INSERT INTO mentors (name, city_years, tech_skills, address) VALUES ('Sue Jones', 5, 'python', '120 Old Street, Glasgow');
INSERT INTO mentors (name, city_years, tech_skills, address) VALUES ('Alice Evans', 8, 'php', '3 High Road, Glasgow');
INSERT INTO mentors (name, city_years, tech_skills, address) VALUES ('Steven King', 10, 'postgresql', '19 Bed Street, Glasgow');
INSERT INTO mentors (name, city_years, tech_skills, address) VALUES ('Becky Brown', 1, 'postgresql', '12, rue des Bouchers, Glasgow');

CREATE TABLE students (
  id        		SERIAL PRIMARY KEY,
  name      		VARCHAR(30) NOT NULL,
  address   		VARCHAR(30),
  graduated_cyf     Boolean not NULL
);


INSERT INTO students (name, address, graduated_cyf) VALUES ('Alfonso', 'Castillejos 382', TRUE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Pedro', 'New Road 13', FALSE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Arthur', 'Good Road 12', FALSE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Sara', 'Parallel 12', TRUE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Zaquiel', 'Oxford Road 1', TRUE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Isaac', 'Rutherford Street', FALSE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Claudia', 'Calle Valecia', FALSE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Marta', 'Calle Madrid 13', TRUE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Juan', 'New York Street', TRUE);
INSERT INTO students (name, address, graduated_cyf) VALUES ('Alberto', 'Calle del Rey', FALSE);

select * from students where graduated_cyf = false;

CREATE TABLE classes (
  id        		SERIAL PRIMARY KEY,
  leading_mentor    INT references mentors (id),
  topic   		    VARCHAR(30),
  date 			    DATE NOT NULL,
  location          VARCHAR(30)
);

INSERT INTO Classes (leading_mentor, topic, date, location) VALUES ('1', 'Javascript', '2020-10-01', 'Barcelona');
INSERT INTO Classes (leading_mentor, topic, date, location) VALUES ('2', 'PHP', '2020-11-22', 'Badalona');
INSERT INTO Classes (leading_mentor, topic, date, location) VALUES ('3', 'SQL', '2020-08-19', 'Terrassa');
INSERT INTO Classes (leading_mentor, topic, date, location) VALUES ('4', 'PASCAL', '2020-06-18', 'Sant Boi');


CREATE TABLE stud_classes (
  id        		SERIAL PRIMARY KEY,
  student   		INT references students (id),
  topic				INT references classes (id)
);

INSERT INTO stud_classes (student, topic) VALUES ('1', '1');
INSERT INTO stud_classes (student, topic) VALUES ('2', '1');
INSERT INTO stud_classes (student, topic) VALUES ('3', '2');
INSERT INTO stud_classes (student, topic) VALUES ('4', '2');
INSERT INTO stud_classes (student, topic) VALUES ('5', '3');
INSERT INTO stud_classes (student, topic) VALUES ('6', '3');
INSERT INTO stud_classes (student, topic) VALUES ('7', '4');
INSERT INTO stud_classes (student, topic) VALUES ('8', '4');

select * from mentors where city_years > 5;

select * from mentors where tech_skills = 'javascript';

select * from students where graduated_cyf = true;

select * from classes where date < '2020-11-01';

select * from stud_classes where topic = '1';

```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
