import Context from "./Context";
import MetaData from "./MetaData";

interface Note {
  id: string;
  context: Context;
  text: string;
  team_id?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  meta?: MetaData;
}

export default Note;
