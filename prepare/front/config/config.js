/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */

// AWS 탄력적 IP
export const backUrl =
  process.env.NODE_ENV === 'production' ? 'https://api.junheedot.com' : 'http://localhost:3065';

// S3 용 이미지 주소
// backUrl 대신 v를 사용함
