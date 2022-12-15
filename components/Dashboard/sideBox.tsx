import { Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { RoundedButton } from "../roundedButton";

export const SideBox: React.FC = () => {
  const router = useRouter();

  return (
    <Stack px={1.5} pt={1} pb={1.5} bgcolor="#F6F6F6" borderRadius={4}>
      <Typography variant="subtitle1" fontWeight={600} height="52px" px={2} display="flex" alignItems={"center"}>
        Current subscription plan
      </Typography>
      <Typography variant="body1" fontWeight={400} height="26px" px={2} pb={7}>
        Free Plan
      </Typography>
      <Link
        component={"a"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push("/subscription");
        }}
        href="subscription"
        sx={{
          borderRadius: "100px",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#9e9c9c1f",
          },
        }}
      >
        <Stack
          direction="row"
          gap={1.5}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "primary",
            height: 52,
            px: 2,
          }}
        >
          Buy new Subscription
        </Stack>
      </Link>
    </Stack>
  );
};
