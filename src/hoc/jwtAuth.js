import jwtDecode from 'jwt-decode';

const jwtAuth = ({}) => {

    // 토큰 유효성 검사
    function isAuth(token) {
        if (!token) {
          return false;
        }
        const decoded = jwtDecode(token);
        if (decoded.exp > new Date().getTime() / 1000) {
         return true;
        } else {
         return false;
        }
    }
    
    // 토큰에서 유저 id 가져오기
    function getId(token) {
        const decoded = jwtDecode(token)
        return decoded.jti;
    }
}

export default jwtAuth;