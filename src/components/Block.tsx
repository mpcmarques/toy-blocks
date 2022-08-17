import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Block as BlockType } from "../types/Node";
import colors from "../constants/colors";

const Block: React.FC<{ block: BlockType }> = ({ block }) => {
  return (
    <Box bgcolor={colors.boxBgColor} p="8px" mb="4px" borderRadius="4px">
      <Typography fontWeight={700} fontSize="10px" color={colors.boxTitleColor}>
        {("00" + block.id).substr(-3)}
      </Typography>
      <Typography fontSize="14px" fontWeight={400} color={colors.boxTextColor}>
        {block.attributes.data}
      </Typography>
    </Box>
  );
};

export default Block;
