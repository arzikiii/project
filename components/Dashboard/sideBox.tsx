import { Link, Stack, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../../repositories/hooks/useUser";
import { capitalizeFirstLetter } from "../../utils/helper";

export const SideBox: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Stack px={1.5} pt={1} pb={1.5} bgcolor="#F6F6F6" borderRadius={4}>
      <Typography variant="subtitle1" fontWeight={600} height="52px" px={2} display="flex" alignItems={"center"}>
        Current subscription plan
      </Typography>
      {user?.activeSubscription.plan === undefined ? (
        <Typography variant="body1" fontWeight={400} height="26px" px={2} pb={7}>
          No active plans
        </Typography>
      ) : (
        <Typography variant="body1" fontWeight={400} height="26px" px={2} pb={user?.activeSubscription.plan !== "free" ? 0 : 7}>
          {`${user?.activeSubscription.plan} Plan`}
        </Typography>
      )}
      {user?.activeSubscription.plan !== "free" && user?.activeSubscription.plan !== undefined ? (
        <Typography variant="body1" fontWeight={400} height="26px" px={2} pb={7}>
          {`Valid until: ${user?.activeSubscription.endDate}`}
        </Typography>
      ) : null}

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
