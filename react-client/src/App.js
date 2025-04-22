import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [keys, setKeys] = useState([]); // 전체 키 데이터
  const [search, setSearch] = useState(''); // 검색어

  // API에서 키 목록 가져오기
  useEffect(() => {
    async function fetchKeys() {
      try {
        const response = await fetch('/api/v1/keys'); // 프록시 설정 덕분에 /api/v1/keys로 요청 가능
        if (!response.ok) {
          throw new Error('Failed to fetch keys');
        }
        const data = await response.json();
        setKeys(data.data.keys);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchKeys();
  }, []);

  // 검색어에 따라 필터링된 키 목록 반환
  const filteredKeys = keys.filter(
    (key) =>
      key.type.toLowerCase().includes(search.toLowerCase()) ||
      key.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className="App-container">
        {/* 네비게이션 메뉴 */}
        <nav className="App-nav">
          <h2>Menu</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#keys">Keys</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        {/* 메인 콘텐츠 */}
        <main className="App-main">
          <header className="App-header">
            <h1>Key List</h1>
            <input
              type="text"
              placeholder="Search by type or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeys.map((key) => (
                  <tr key={key.id}>
                    <td>{key.id}</td>
                    <td>{key.type}</td>
                    <td>{key.description}</td>
                    <td>{key.status}</td>
                    <td>{new Date(key.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </header>
        </main>
      </div>
    </div>
  );
}

export default App;
