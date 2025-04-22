// 초기 더미 데이터
const keys = [
  { id: '1', type: 'test123', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', type: 'AES_128', description: '****', status: 'inactive', createdAt: new Date(), updatedAt: new Date() },
  { id: '3', type: 'AES_256', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '4', type: 'AES_256', description: '****', status: 'inactive', createdAt: new Date(), updatedAt: new Date() },
  { id: '5', type: 'ARIA_128', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '6', type: 'ARIA_128', description: '****', status: 'inactive', createdAt: new Date(), updatedAt: new Date() },
  { id: '7', type: 'ARIA_256', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '8', type: 'ARIA_256', description: '****', status: 'inactive', createdAt: new Date(), updatedAt: new Date() },
  { id: '9', type: 'SEED_128', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '10', type: 'SEED_128', description: '****', status: 'inactive', createdAt: new Date(), updatedAt: new Date() },
  { id: '11', type: 'SEED_256', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '12', type: 'SEED_256', description: '****', status: 'inactive', createdAt: new Date(), updatedAt: new Date() },
  { id: '13', type: 'SHA_256', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '14', type: 'SHA_512', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  { id: '15', type: 'RSA_OAEP_2048bit_SHA-224', description: '****', status: 'active', createdAt: new Date(), updatedAt: new Date() },
];

module.exports = {
  // 키 생성
  async create(data) {
    const newKey = { ...data, createdAt: new Date(), updatedAt: new Date() };
    keys.push(newKey);
    return newKey;
  },

  // 키 목록 조회
  async findAll({ status, page = 1, limit = 10 }) {
    const filteredKeys = status
      ? keys.filter((key) => key.status === status)
      : keys;

    const startIndex = (page - 1) * limit;
    const paginatedKeys = filteredKeys.slice(startIndex, startIndex + limit);

    return {
      keys: paginatedKeys,
      total: filteredKeys.length,
      page,
      limit,
    };
  },

  // 특정 키 조회
  async findById(keyId) {
    return keys.find((key) => key.id === keyId) || null;
  },

  // 키 상태 업데이트
  async updateStatus(keyId, status) {
    const key = keys.find((key) => key.id === keyId);
    if (!key) return null;

    key.status = status;
    key.updatedAt = new Date();
    return key;
  },

  // 키 삭제 (논리적 삭제)
  async softDelete(keyId) {
    const keyIndex = keys.findIndex((key) => key.id === keyId);
    if (keyIndex === -1) return null;

    const deletedKey = keys[keyIndex];
    keys.splice(keyIndex, 1); // 배열에서 삭제
    return { ...deletedKey, deleted: true };
  },

  // 키 순환
  async rotate(keyId, newMaterial) {
    const key = keys.find((key) => key.id === keyId);
    if (!key) return null;

    key.material = newMaterial;
    key.updatedAt = new Date();
    return key;
  },
};