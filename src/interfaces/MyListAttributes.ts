import { ContentType } from '../constants/Constants';

interface MyListAttributes {
  id: string;
  user_id: string;
  content_id: string;
  content_type: ContentType;
  created_at: Date;
}

export { MyListAttributes };
