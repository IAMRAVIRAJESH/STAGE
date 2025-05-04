import { BaseAttributes } from './BaseAttributes';

interface MovieAttributes extends BaseAttributes {
  release_date: Date;
  director: string;
  actors: string[];
}

export { MovieAttributes };
