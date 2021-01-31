import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const UserProfile = () => {
  return (
    <div>
      <Card style={{ width: 300 }}>
        <Meta avatar={<Avatar src="../favicon.png" />} title="_dlwnsgml" description="이준희" />
      </Card>
    </div>
  );
};

export default UserProfile;
