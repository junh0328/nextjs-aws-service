import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import styled from 'styled-components';

// const ButtonRed = styled(Button)`
//   background-color: salmon;
//   color: white;
//   border: none;

//   &:hover {
//     border: 1px solid salmon;
//     color: salmon;
//   }
// `;

const PostForm = () => {
  const imageInput = useRef();
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onsubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);

  const [text, setText] = useState('');
  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20' }} encType="multipart/form-data" onFinish={onsubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={V} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
