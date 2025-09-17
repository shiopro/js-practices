class MemoRepository {
  constructor(db) {
    this.db = db;
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  all(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async add(content) {
    await this.run("INSERT INTO memos (content) VALUES (?)", [content]);
  }

  async list() {
    return await this.all("SELECT id, content FROM memos");
  }

  async delete(id) {
    await this.run("DELETE FROM memos WHERE id = ?", [id]);
  }
}

export default MemoRepository;
