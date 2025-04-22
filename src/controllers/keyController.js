const crypto = require('crypto');
const keyService = require('../services/keyService');

// 키 생성
exports.createKey = async (req, res) => {
  try {
    const { description, keyType = 'AES-256' } = req.body;
    const key = await keyService.createKey({ description, keyType });
    res.status(201).json({
      status: 'success',
      data: {
        keyId: key.id,
        createdAt: key.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 키 목록 조회
exports.listKeys = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const keys = await keyService.listKeys({ status, page, limit });
    res.json({
      status: 'success',
      data: keys
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 특정 키 조회
exports.getKey = async (req, res) => {
  try {
    console.log('요청 받은 ID:', req.params.keyId); // 요청 ID 확인
    const { keyId: id } = req.params;
    const key = await keyService.getKey(id);
    if (!key) {
      console.log('키를 찾을 수 없음:', id);
      return res.status(404).json({
        status: 'error',
        message: 'Key not found'
      });
    }
    res.json({
      status: 'success',
      data: key
    });
  } catch (error) {
    console.error('오류 발생:', error); // 오류 로그 출력
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// 키 상태 업데이트
exports.updateKeyStatus = async (req, res) => {
  try {
    const { keyId } = req.params;
    const { status } = req.body;
    
    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status value'
      });
    }

    const updatedKey = await keyService.updateKeyStatus(keyId, status);
    res.json({
      status: 'success',
      data: updatedKey
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 키 삭제
exports.deleteKey = async (req, res) => {
  try {
    const { keyId } = req.params;
    await keyService.deleteKey(keyId);
    res.json({
      status: 'success',
      message: 'Key deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 키 순환
exports.rotateKey = async (req, res) => {
  try {
    const { keyId } = req.params;
    const rotatedKey = await keyService.rotateKey(keyId);
    res.json({
      status: 'success',
      data: {
        keyId: rotatedKey.id,
        rotatedAt: rotatedKey.updatedAt
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
