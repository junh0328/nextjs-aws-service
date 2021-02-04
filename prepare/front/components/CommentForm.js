import { Button, Form, Input } from 'antd';
import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const onsubmitComment = useCallback(() => {
    alert(post.id + commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  });

  const [commentText, onChangecommentText] = useInput('');

  return (
    <Form onFinish={onsubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={3} value={commentText} onChange={onChangecommentText} />
        <Button style={{ position: 'absolute', bottom: -40, right: 0, zIndex: 1 }} type="primary" htmlType="submit">
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
