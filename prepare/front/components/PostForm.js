/* eslint-disable comma-dangle */
import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';
// import { backUrl } from '../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { imagePaths, addPostDone, AddedPosts } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  useEffect(() => {
    if (AddedPosts === false) {
      alert(
        '서비스 안정화를 위해 게시글은 최대 10개 까지만 작성하실 수 있습니다.\n기존 게시글을 삭제 후에 이용해주세요'
      );
    }
  }, [AddedPosts]);

  const onsubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);
  // 여기서 addPost는 sagas/post에서 만들어 놓은 함수이기 때문에 파라미터만 넣어주면 된다. (따로 지정 x)

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    // console.log(e.target.files);
    const imageFormData = new FormData(); // multipart 형식으로 보내야 multer에서 처리할 수 있음
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); // apend의 키('image'), 값(f)는 backend의 multer에서 준 키 값과 맞춰 줘야 한다.
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <Form style={{ margin: '10px 0 20' }} encType="multipart/form-data" onFinish={onsubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <div style={{ marginTop: '10px', marginBottom: '30px' }}>
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">
            짹짹
          </Button>
        </div>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v.replace(/\/thumb\//, '/original/')} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
