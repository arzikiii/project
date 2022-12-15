import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { capitalizeFirstLetter } from "../../utils/helper";

const sublist = [
  { subName: "free", price: 0 },
  { subName: "personal", price: 30000 },
  { subName: "pro", price: 50000 },
];

export const SubsListView: React.FC = () => {
  const loading = false;
  return (
    <Stack gap={2}>
      {loading ? (
        <Stack width="100%" height={150} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        sublist.map(({ subName, price }, index) => {
          return (
            <Stack direction="column" key={index} sx={{ p: "0px 48px 0px 48px" }}>
              <GroupView name={subName} price={price} />
              {sublist.length - 1 !== index && <Divider />}
            </Stack>
          );
        })
      )}
    </Stack>
  );
};

const GroupView: React.FC<{ name: string; price: number }> = ({ name, price }) => {
  return (
    <Stack mb={3} gap={2}>
      <Typography variant="h6" fontWeight={500} color="#2623df">
        {capitalizeFirstLetter(name)} Plan
      </Typography>
      <Typography variant="caption" color="#000" fontWeight={100}>
        This is supposedly a description but i do not know what to write so i will just type some random things
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
        {/* <Typography variant="body2" sx={{ p: "6px 12px" }}>
          Login to Buy
        </Typography> */}
        <RoundedButton onClick={() => console.log("click")} sx={{ fontSize: "10px" }}>
          {" "}
          Buy Plan{" "}
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
