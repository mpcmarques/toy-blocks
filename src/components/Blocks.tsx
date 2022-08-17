import { Box } from "@mui/system";
import React from "react";
import { Blocks as BlocksType } from "../types/Node";
import Block from "./Block";
import { styled } from "@mui/material/styles";

const CustomBox = styled(Box)({
  ".MuiBox-root:last-child": {
    marginBottom: 0,
  },
});

const Blocks: React.FC<{ blocks: BlocksType }> = ({ blocks }) => {
  return (
    <CustomBox>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </CustomBox>
  );
};

export default Blocks;
