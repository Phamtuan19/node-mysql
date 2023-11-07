import { connection } from "../Database";
import { responseError, responseSuccess } from "../helpers/response";

class BaseModel {
  constructor(props) {
    this.table = props.table;
    this.fillable = props.fillable;
    this.placeholders = this.fillable.map(() => "?").join(", ");
  }

  // Get All
  async read(res) {
    connection.query(`SELECT * from ${this.table}`, (error, results) => {
      if (error) {
        return responseError(res, error);
      }

      const data = {
        message: "Lấy dữ liệu thành công",
        data: results,
      };

      return responseSuccess(res, data);
    });
  }

  // Create
  async create(res, data) {
    const fields = this.fillable.join(", ");
    const placeholders = this.fillable.map(() => "?").join(", ");
    const values = this.fillable.map((field) => data[field]);

    const query = `INSERT INTO ${this.table} (${fields}) VALUES (${placeholders})`;

    connection.query(query, values, (error, results) => {
      if (error) {
        return responseError(res, error);
      }

      const resdata = {
        message: "Tạo mới thành công.",
      };

      return responseSuccess(res, resdata);
    });
  }

  // find One by cloumn name
  async findOne(res, column_name, column_value) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${this.table} WHERE ${column_name} = ?`;

      connection.query(query, [column_value], (error, results) => {
        if (error) {
          return reject(error);
        }

        if (results.length === 0) {
          return responseError(res, { message: "Không tìm thấy dữ liệu." });
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  // update
  async update(column_name, column_value, data) {
    return new Promise((resolve, reject) => {
      const updates = this.fillable
        .filter((field) => field !== "id")
        .map((field) => `${field} = ?`)
        .join(", ");
      const values = this.fillable
        .filter((field) => field !== "id")
        .map((field) => data[field]);

      const query = `UPDATE ${this.table} SET ${updates} WHERE ${column_name} = ?`;

      connection.query(query, [...values, column_value], (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve({ message: "Cập nhật thành công.", data: results[0] });
      });
    });
  }

  // Delete
  async delete(res, id) {
    const query = `DELETE FROM ${this.table} WHERE id = ?`;

    connection.query(query, [id], (error, results) => {
      if (error) {
        return responseError(res, error);
      }

      const data = {
        message: "Xóa thành công.",
      };

      return responseSuccess(res, data);
    });
  }
}

export default BaseModel;
