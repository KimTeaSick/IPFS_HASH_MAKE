import './App.css'
import { useCallback, useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import Web3 from 'web3/dist/web3.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Page/Main';
import MyPage from './Page/MyPage';
import Layout from './Components/Layout';

const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');

  //web3 제작함수
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum);  // 새로운 web3 객체생성
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  //지갑 연결 함수
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <button
          className="metaConnect"
          onClick={() => {
            connectWallet();
          }}
        >
          MetaMask 지갑 연결
        </button>
      </div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>

  );
}

export default App