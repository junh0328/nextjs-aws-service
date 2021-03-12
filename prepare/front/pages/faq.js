/* eslint-disable arrow-body-style */
import React from 'react';
import { Card } from 'antd';
import AppLayout from '../components/AppLayout';

const faq = () => {
  return (
    <>
      <AppLayout>
        <Card
          title="👉🏼 &nbsp;자주 묻는 질문 "
          bordered={false}
          style={{ width: '100%', marginBottom: 10 }}
        >
          사용자 입장에서 생기는 의문점을 적어둔 FAQ 게시판입니다.
          <br />
        </Card>
        <Card
          title="👉🏼 &nbsp;왜 글은 5개까지 밖에 못 쓰나요?"
          bordered={false}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <p>Answer : </p>
          <p>
            junheedot.com은 AWS에서 제공하는 무료로 허용되는 프리티어의 서버를 기반으로
            만들어졌습니다. 그에 따라 트래픽을 제한하기 위해 최대 5개의 게시글을 제한해 두었습니다.
          </p>
        </Card>
        <Card
          title="👉🏼 &nbsp;추가하고 싶은 기능이 있어요!"
          bordered={false}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <p>Answer : </p>
          <p>
            CONTACT ME를 통해 저의 깃헙으로 들어오실 수 있습니다. 이메일, issue처리, pr 등을 통해
            연락을 주시면 공부하여 적용해보도록 하겠습니다!
          </p>
        </Card>
        <Card
          title="👉🏼 &nbsp;사진이 왜 안올라가죠?"
          bordered={false}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <p>Answer : </p>
          <p>
            아마존의 S3 서버에 해당 확장자 파일을 보내는 과정에서 오류로 인해, .png 파일을 제외한
            나머지 확장자 파일이 불완전한 처리 과정을 겪고 있습니다. 무척이나 해결하고 싶은
            오류이지만, backend와의 작업을 거쳐야 하기 때문에 새로고침 후에 다시 한 번 이용해보시면
            감사하겠습니다 ㅜㅜ
          </p>
        </Card>
        <Card
          title="👉🏼 &nbsp;알람이 시도 때도 없이 떠요"
          bordered={false}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <p>Answer : </p>
          <p>
            알람은 제가 상태 관리를 통해 보내게 되는데, 기술적인 한계로 이전 상태의 적용이 갑자기
            풀리거나, 적용이 되지 않는 오류가 있습니다. 지속적으로 관심을 가져 고칠 수 있도록
            하겠습니다.
          </p>
        </Card>
      </AppLayout>
    </>
  );
};

export default faq;
