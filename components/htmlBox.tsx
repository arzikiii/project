import { Typography, TypographyVariant, SxProps } from "@mui/material";
import React from "react";

interface Props {
  htmlContent: string;
  sx?: SxProps;
  variant?: TypographyVariant;
}

export const HtmlBox: React.FC<Props> = ({ htmlContent, variant, sx }) => {
  return <Typography component="div" variant={variant} dangerouslySetInnerHTML={{ __html: htmlContent }} sx={sx} />;
};
