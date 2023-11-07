import { connection } from "../Database";
import BaseModel from "./base.model";

class BookModel extends BaseModel {
  constructor() {
    super({
      table: "books",
      fillable: [
        "id",
        "isbn",
        "title",
        "author",
        "public_year",
        "description",
        "thumbnail",
        "number_page",
        "publishing_company",
        "language",
      ],
    });
  }

  /**
   *
   * @param {*} isbn
   * @param {*} title
   * @param {*} author
   * @returns
   */
  async searchBooks(searchTerm) {
    const query = `
      SELECT *
      FROM ${this.table}
      WHERE isbn LIKE ? OR title LIKE ? OR author LIKE ?
    `;

    const searchValue = `%${searchTerm}%`;

    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [searchValue, searchValue, searchValue],
        (error, results) => {
          if (error) {
            return reject(error);
          }

          resolve(results);
        }
      );
    });
  }
}

export default new BookModel();
