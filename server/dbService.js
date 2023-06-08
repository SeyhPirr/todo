const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.NAME);
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  async deleteTodo(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM todos WHERE id = ?";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM todos;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async insertTodo(todo) {
    try {
      const insertTodo = await new Promise((resolve, reject) => {
        const query = "INSERT INTO todos (task) VALUES (?);";

        connection.query(query, [todo], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
        return {
          todo: todo,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
  async getTodoByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "select * from todos where task like (?)";

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
