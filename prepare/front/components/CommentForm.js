/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangecommentText, setCommentText] = useInput('');
  // custom hooks에서 setValue를 지정하여 setCommentText를 사용할 수 있도록 변경

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onsubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },

      // 여기서 보내는 postId와 userId는 그냥 데이터에 포함된 속성명일뿐 시퀄라이즈 모델의 PostId/ UserId와는 다르다
      // 이 dispatch문을 sagas/user의 login(), logout()처럼 동적 액션 크리에이터 함수로 만들지, 타입과 변수를 사용해서 request할 지는 설계자의 선택이다.
    });
    setCommentText('');
  }, [commentText, id]);

  return (
    <Form onFinish={onsubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={3} value={commentText} onChange={onChangecommentText} />
        <Button
          style={{ position: 'absolute', bottom: -40, right: 0, zIndex: 1 }}
          type="primary"
          htmlType="submit"
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default CommentForm;
