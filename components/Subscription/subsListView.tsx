import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { capitalizeFirstLetter } from "../../utils/helper";
import { getToken } from "../../repositories/hooks/useToken";
import { useAvailablePlans } from "../../repositories/hooks/useAvailablePlans";

const sublist = [
  { subName: "free", price: 0 },
  { subName: "personal", price: 30000 },
  { subName: "pro", price: 50000 },
];

export const SubsListView: React.FC = () => {
  const { plans, loading } = useAvailablePlans();

  return (
    <Stack gap={2}>
      {loading ? (
        <Stack width="100%" height={150} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        plans?.map(({ name, pricing }, index) => {
          return (
            <Stack direction="column" key={index} sx={{ p: "0px 48px 0px 48px" }}>
              <GroupView name={name} price={pricing} />
              {sublist.length - 1 !== index && <Divider />}
            </Stack>
          );
        })
      )}
    </Stack>
  );
};

const GroupView: React.FC<{ name: string; price: number }> = ({ name, price }) => {
  const userToken = getToken();
  return (
    <Stack mb={3} gap={2}>
      <Typography variant="h6" fontWeight={500} color="#2623df">
        {capitalizeFirstLetter(name)} Plan
      </Typography>
      <Typography variant="caption" color="#000" fontWeight={100}>
        deskripsi subscription plan
      </Typography>

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
        columnGap={1}
        rowGap={1.5}
      >
        <Chip
          label={`Rp. ${price}`}
          color="primary"
          variant="outlined"
          sx={{
            background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #1D64E5",
            border: "none",
            color: "#0C285C",
            fontWeight: 500,
            fontSize: "10px",
            width: "80px",
          }}
        />
        {userToken !== null ? (
          <RoundedButton onClick={() => console.log("click")} sx={{ fontSize: "10px" }}>
            Buy Plan
          </RoundedButton>
        ) : (
          <Typography variant="body2" sx={{ p: "6px 12px" }}>
            Login to Buy
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
