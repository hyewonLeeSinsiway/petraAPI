const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const keyModel = require('../models/keyModelSelector'); // 모델 선택기 사용

class KeyService {
  // 키 생성
  async createKey({ description, keyType }) {
    const keyMaterial = crypto.randomBytes(32); // 256비트 키
    const id = uuidv4();
    const key = await keyModel.create({
      id,
      material: keyMaterial.toString('base64'),
      type: keyType,
      description,
    });

    return this._sanitizeKey(key);
  }

  // 키 목록 조회
  async listKeys({ status, page, limit }) {
    const result = await keyModel.findAll({ status, page, limit });
    return {
      ...result,
      keys: result.keys.map(this._sanitizeKey)
    };
  }

  // 특정 키 조회
  async getKey(keyId) {
    const key = await keyModel.findById(keyId);
    if (!key) return null;
    // return this._sanitizeKey(key);
    return key; // 민감한 정보 포함
  }

  // 키 상태 업데이트
  async updateKeyStatus(keyId, status) {
    const key = await keyModel.updateStatus(keyId, status);
    return this._sanitizeKey(key);
  }

  // 키 삭제 (논리적 삭제)
  async deleteKey(keyId) {
    return await keyModel.softDelete(keyId);
  }

  // 키 순환
  async rotateKey(keyId) {
    const newKeyMaterial = crypto.randomBytes(32);
    const key = await keyModel.rotate(keyId, newKeyMaterial.toString('base64'));
    return this._sanitizeKey(key);
  }

  // 민감한 정보 제거
  _sanitizeKey(key) {
    const { material, ...sanitizedKey } = key;
    return sanitizedKey;
  }
}

module.exports = new KeyService();
