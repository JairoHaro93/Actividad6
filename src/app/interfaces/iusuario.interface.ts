import { IResult } from './iresult.interface';

export interface IUsuario {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IResult[];
}
