import { connection } from "../Database";
import BaseModel from "./base.model";

class RatingModel extends BaseModel {
  constructor() {
    super({
      table: "ratings",
      fillable: [
        "id",
        "user_id",
        "book_id",
        "rating",
        "review",
        "created_at",
        "updated_at",
      ],
    });
  }

  async findRatingsByBookId(bookId) {
    const query = `
      SELECT *
      FROM ${this.table}
      WHERE book_id = ?
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [bookId], (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }
}

export default new RatingModel();
