// Define the structure of the target data
interface DomNode {
  pk: string;
  user: {
    is_verified: boolean;
    id: string;
    pk: string;
    username: string;
    is_unpublished: boolean | null;
    profile_pic_url: string;
    fbid_v2: string;
  };
  is_covered: boolean;
  child_comment_count: number;
  restricted_status: boolean | null;
  parent_comment_id: string | null;
  has_translation: boolean;
  has_liked_comment: boolean;
  text: string;
  giphy_media_info: null;
  created_at: number;
  comment_like_count: number;
  __typename: string;
}

interface DomEdge {
  node: DomNode;
  cursor: string;
}

interface DomMedia {
  xdt_api__v1__media__media_id__comments__connection: {
    edges: DomEdge[];
    page_info: {
      end_cursor: string | null;
      has_next_page: boolean;
      start_cursor: string | null;
      has_previous_page: boolean;
    };
  };
}

export { DomMedia, DomNode, DomEdge };
