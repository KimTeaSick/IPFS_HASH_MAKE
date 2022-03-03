import React, { useCallback, useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0')

const Main = ({ account }) => {
  const [fileUrl, updateFileUrl] = useState(``);
  const [name, setName] = useState('');
  const nameHandler = useCallback((e) => {
    setName(e.target.value)
  }, [name]);
  const [describe, setDescribe] = useState('');
  const describeHandler = useCallback((e) => {
    setDescribe(e.target.value)
  }, [name]);
  const [type, setType] = useState('');
  const typeHandler = useCallback((e) => {
    setType(e.target.value)
  }, [name]);
  const [value, setValue] = useState('');
  const valueHandler = useCallback((e) => {
    setValue(e.target.value)
  }, [name]);
  //IPFS 변환 함수
  const onChange = useCallback(async (e) => {
    const file = e.target.files[0]
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }, [fileUrl]);


  const sendJsonContent = async () => {

    const obj = { name: `${name}`, image: `${fileUrl}`, describe: `${describe}`, attribute: [{ trait_type: `${type}`, value: `${value}` }] }
    const jjson = JSON.stringify(obj);
    const file = new File([jjson], 'text.json');

    try {

      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url);

    } catch (error) {

      console.log('Error uploading file: ', error);

    }
  }
  return (
    <div>
      <div className="App">
        <h1>IPFS Exchange</h1>
        <input
          type="file"
          onChange={onChange}
          style={{ border: 'solid 1px #eee', borderRadius: '5px', width: '300px', height: 'auto', textAlign: 'center' }}
        />
        <br />
        {
          fileUrl && (
            <img src={fileUrl} alt='이미지가 아닙니다.' style={{ width: '720px', height: 'auto', margin: '2%' }} />
          )
        }
        <h1>IPFS 해쉬</h1>
        <p>{fileUrl}</p>

        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '1200px', margin: 'auto' }}>
          <input type="text" value={name} placeholder="name" onChange={nameHandler} />
          <input type="text" value={describe} placeholder="describe" onChange={describeHandler} />
          <input type="text" value={type} placeholder="type" onChange={typeHandler} />
          <input type="text" value={value} placeholder="value" onChange={valueHandler} />
          <button onClick={sendJsonContent}> json 만들기 </button>
        </div>
        <button>Mint!</button>
      </div>
    </div>
  )
}

export default Main;