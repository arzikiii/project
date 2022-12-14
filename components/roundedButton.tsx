import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import React from "react";

interface Props extends LoadingButtonProps {
  component?: string;
}

export const Button: React.FC<Props> = ({ sx, ...props }) => <LoadingButton disableElevation sx={{ textTransform: "initial", flexShrink: 0, ...sx }} {...props} />;

export const RoundedButton: React.FC<Props> = ({ sx, ...props }) => (
  <LoadingButton
    disableElevation
    sx={{
      textTransform: "initial",
      borderRadius: "25px",
      flexShrink: 0,
      px: 2,
      ...sx,
    }}
    {...props}
  />
);
