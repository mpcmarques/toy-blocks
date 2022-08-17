export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  blocks: Blocks;
}

export interface Blocks extends Array<Block> {}

export interface Block {
  id: string;
  attributes: { data: string };
}
