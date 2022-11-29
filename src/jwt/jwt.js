import JwtService from "./jwtServices";
import jwtConfig from "./jwtConfig"
export function useJwt () {
  const jwt = new JwtService(jwtConfig)
  return {
    jwt
  }
}
