
import express, { Request, Response } from 'express';
import mysql, { Connection } from 'mysql';

const app = express();
const port = 5000;

// Создаем подключение к базе данных MySQL
const dbConfig = {
  host: '10.3.0.21',
  user: 'i21s045',
  password: 'WZDAnsMr',
  database: 'i21s045'
};

const connection: Connection = mysql.createConnection(dbConfig);

// Подключаемся к базе данных MySQL
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.message);
    return;
  }
  console.log('Подключение к базе данных успешно');
});

app.use(express.json())

// Get all teachers
app.get('/teachers', (req: Request, res: Response) => {
  connection.query('SELECT * FROM teachers', (err, rows) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(rows);
  });
});

// Get all students
app.get('/students', (req: Request, res: Response) => {
  connection.query('SELECT * FROM students', (err, rows) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(rows);
  });
});

// Get all languages
app.get('/languages', (req: Request, res: Response) => {
  connection.query('SELECT * FROM languages', (err, rows) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(rows);
  });
});

// Get all subjects
app.get('/subjects', (req: Request, res: Response) => {
  connection.query(`
  SELECT ts.teachers_subjects_id, l.language_name, t.teacher_firtname, ts.subject_limit
  FROM teachers_subjects ts
  JOIN languages l ON ts.language_id = l.language_id
  JOIN teachers t ON ts.teacher_id = t.teacher_id;
  `, (err, rows) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(rows);
  });
});


app.post('/student', (req: Request, res: Response) => {
  const name: string = req.body.name;
  if (!name) {
    res.status(400).send('Не указано имя студента');
    return;
  }

  connection.query(`INSERT INTO students (student_firtname) VALUES ('${name}');`, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Новый студент добавлен, ID:', result.insertId);
    res.status(201).send('Студент успешно добавлен');
  });
});

app.post('/addRecordToJournal', (req: Request, res: Response) => {
  const { studentId, teachersSubjectsId } = req.body;

  // Проверка наличия обязательных параметров
  if (!studentId || !teachersSubjectsId) {
    return res.status(400).json({ error: 'Необходимы studentId и teachersSubjectsId' });
  }

  // Запрос SQL для добавления записи в таблицу journal
  const sql = `INSERT INTO journal (student_id, teachers_subjects_id) VALUES (?, ?)`;
  const values = [studentId, teachersSubjectsId];

  // Выполнение запроса к базе данных
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ', err);
      return res.status(500).json({ error: 'Ошибка выполнения запроса к базе данных' });
    }
    console.log('Запись успешно добавлена в журнал');
    return res.status(200).json({ message: 'Запись успешно добавлена в журнал' });
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
