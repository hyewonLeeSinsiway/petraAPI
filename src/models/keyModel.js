const db = require('../config/database');

class KeyModel {
  async create({ id, material, type, description }) {
    const [result] = await db.execute(
      'INSERT INTO `keys` (id, material, type, description) VALUES (?, ?, ?, ?)',
      [id, material, type, description]
    );
    return this.findById(id);
  }

  async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM pct_encrypt_key WHERE key_id = ?',
      [id]
    );
    return rows[0];
  }

  async findAll({ status, page, limit }) {
    let query = 'SELECT * FROM `keys` WHERE deleted_at IS NULL';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    // 전체 레코드 수 조회
    const [countResult] = await db.execute(
      query.replace('*', 'COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;

    // 페이지네이션 적용
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const offset = (page - 1) * limit;
    params.push(limit, offset);

    const [rows] = await db.execute(query, params);
    
    return {
      keys: rows,
      total,
      page,
      limit
    };
  }

  async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE `keys` SET status = ? WHERE id = ? AND deleted_at IS NULL',
      [status, id]
    );
    
    if (result.affectedRows === 0) {
      throw new Error('Key not found');
    }
    
    return this.findById(id);
  }

  async softDelete(id) {
    const [result] = await db.execute(
      'UPDATE `keys` SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    
    if (result.affectedRows === 0) {
      throw new Error('Key not found');
    }
    
    return true;
  }

  async rotate(id, newMaterial) {
    const [result] = await db.execute(
      'UPDATE `keys` SET material = ?, version = version + 1 WHERE id = ? AND deleted_at IS NULL',
      [newMaterial, id]
    );
    
    if (result.affectedRows === 0) {
      throw new Error('Key not found');
    }
    
    return this.findById(id);
  }
}

module.exports = new KeyModel();
