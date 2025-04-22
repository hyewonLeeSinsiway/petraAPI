const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

// 키 생성
router.post('/', keyController.createKey);

// 키 목록 조회
router.get('/', keyController.listKeys);

// 특정 키 조회
router.get('/:keyId', keyController.getKey);

// 키 활성화/비활성화
router.patch('/:keyId/status', keyController.updateKeyStatus);

// 키 삭제 (논리적 삭제)
router.delete('/:keyId', keyController.deleteKey);

// 키 순환 (rotation)
router.post('/:keyId/rotate', keyController.rotateKey);

module.exports = router;
