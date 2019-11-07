// import { Codes } from '../../../constants/http'
// import { loginService } from './__services__/login'
// import { serializeResponse } from '../__helpers__/serializeResponse'
// import { AuthenticatedUser } from '../__models__/AuthenticatedUser'
import {config} from '../../config';

console.log(config.burstNodeHost);

export const post = async (req, res) => {
  res.end('ok')
};
