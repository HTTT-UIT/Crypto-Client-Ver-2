import JwtService from "./jwtServices";
import jwtConfig from "./jwtConfig"
export const useJwt =  () => {
  const jwt = new JwtService(jwtConfig)
  return {
    jwt
  }
}
