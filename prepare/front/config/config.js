/* eslint-disable operator-linebreak */

// AWS 탄력적 IP
export const backUrl =
  process.env.NODE_ENV === 'production' ? 'http://api.junheedot.com' : 'http://localhost:3065';

// 개발 모드 시, backend local의 IP
export const backUrlLocal = 'http://localhost:80';

// S3 용 이미지 주소
// backUrl 대신 v를 사용함
