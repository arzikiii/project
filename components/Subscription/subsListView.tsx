import { Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { capitalizeFirstLetter } from "../../utils/helper";
import { getToken } from "../../repositories/hooks/useToken";
import { useAvailablePlans } from "../../repositories/hooks/useAvailablePlans";
import { useUser } from "../../repositories/hooks/useUser";
import { makeOrder } from "../../repositories/subscription";
import { useRouter } from "next/router";

export const SubsListView: React.FC = () => {
  const { plans, loading } = useAvailablePlans();
  const { loading: userLoading } = useUser();

  return (
    <Stack gap={2}>
      {loading || userLoading ? (
        <Stack width="100%" height={150} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        plans?.map(({ name, pricing, id }, index) => {
          return (
            <Stack direction="column" key={index} sx={{ p: "0px 48px 0px 48px" }}>
              <GroupView name={name} price={pricing} id={id} />
              {plans.length - 1 !== index && <Divider />}
            </Stack>
          );
        })
      )}
    </Stack>
  );
};

const GroupView: React.FC<{ name: string; price: number; id: number }> = ({ name, price, id }) => {
  const userToken = getToken();
  const { user, mutate } = useUser();
  const [open, setOpen] = React.useState(false);
  const [loadingOrder, setLoadingOrder] = React.useState(false);
  const router = useRouter();

  const currentPlan = user!.activeSubscription.plan;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = async () => {
    setLoadingOrder(true);
    try {
      const data = await makeOrder({ planId: id });
      mutate();
      router.push("/dashboard");
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoadingOrder(false);
    }
  };
  return (
    <Stack mb={3} gap={2}>
      <Typography variant="h6" fontWeight={500} color="#2623df">
        {`${capitalizeFirstLetter(name)} Plan`}
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
          <RoundedButton onClick={handleClickOpen} sx={{ fontSize: "10px" }}>
            Beli
          </RoundedButton>
        ) : (
          <Typography variant="body2" sx={{ p: "6px 12px" }}>
            Login to Buy
          </Typography>
        )}
      </Stack>
      <OrderDialog open={open} onClose={handleClose} onClickOrder={handleOrder} name={name} price={price} loading={loadingOrder} activePlan={currentPlan} />
    </Stack>
  );
};

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onClickOrder: () => Promise<void>;
  name: string;
  price: Number;
  loading: boolean;
  activePlan: string;
}

const OrderDialog: React.FC<DialogProps> = ({ open, onClose, onClickOrder, name, price, loading, activePlan }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="order-dialog-title" aria-describedby="order-dialog-description" fullWidth>
      <DialogTitle id="order-dialog-title">{`Beli plan ${capitalizeFirstLetter(name)}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="order-dialog-description">{`Anda akan membeli plan ${capitalizeFirstLetter(name)}`}</DialogContentText>
        <Typography>{`total pembayaran Rp. ${price}`}</Typography>
        <Typography mt={2}>{`Plan anda saat ini: ${capitalizeFirstLetter(activePlan)}`}</Typography>
      </DialogContent>
      <DialogActions>
        <RoundedButton onClick={onClose}>Batal</RoundedButton>
        <RoundedButton onClick={onClickOrder} variant="contained" loading={loading}>
          Beli Plan
        </RoundedButton>
      </DialogActions>
    </Dialog>
  );
};
