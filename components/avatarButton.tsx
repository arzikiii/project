import React from "react";
import { Avatar, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useUser } from "../repositories/hooks/useUser";
import { RoundedButton } from "./roundedButton";
import { capitalizeFirstLetter, getInitials } from "../utils/helper";
import { logOut } from "../repositories/users";
import { useRouter } from "next/router";

export interface AvatarButtonProps {
  variant: "avatar" | "name" | "greetings";
  anchorHorizontal?: "left" | "right";
}

export const AvatarButton: React.FC<AvatarButtonProps> = ({ variant = "name", anchorHorizontal }) => {
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleAccountMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <RoundedButton
        color="inherit"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        variant="text"
        onClick={handleAccountMenuClick}
        startIcon={variant !== "avatar" && <Avatar sx={{ backgroundColor: "primary.main" }}>{getInitials(user?.username ?? "Admin")}</Avatar>}
        endIcon={variant !== "avatar" && <i className={`bx bx-chevron-${isMenuOpen ? "up" : "down"}`} />}
        sx={{
          p: variant === "avatar" ? 0.5 : "6px 8px",
          width: variant === "avatar" ? "48px" : "inherit",
          minWidth: variant === "avatar" ? "48px" : "inherit",
          maxWidth: variant === "avatar" ? "48px" : "inherit",
        }}
      >
        {variant !== "avatar" ? (
          <Typography variant="subtitle1">
            {variant === "greetings" ? "Halo, " : ""}
            {user ? capitalizeFirstLetter(user.username) : ""}
          </Typography>
        ) : (
          <Avatar sx={{ backgroundColor: "primary.main" }}>{getInitials(user?.username ?? "Admin")}</Avatar>
        )}
      </RoundedButton>
      <Menu
        id="basic-menu"
        transformOrigin={{
          horizontal: anchorHorizontal ?? "left",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: anchorHorizontal ?? "left",
          vertical: "bottom",
        }}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleAccountMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <AccountMenu handleClose={handleAccountMenuClose} />
      </Menu>
    </>
  );
};

export interface AccountMenuProps {
  handleClose: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ handleClose }) => {
  const { user } = useUser();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logOut();
      return true;
    } catch (e) {
      alert(JSON.stringify(e, null, 2));
      return false;
    } finally {
      handleClose();
    }
  };

  return (
    <>
      {user && (
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <ListItemIcon>
              <Avatar
                sx={{
                  height: "48px",
                  width: "48px",
                  backgroundColor: "primary.main",
                }}
              >
                {getInitials(user.username)}
              </Avatar>
            </ListItemIcon>
            <Stack>
              <Typography variant="subtitle1" fontWeight={600}>
                {user.username}
              </Typography>
              <Typography variant="caption" color="neutral.disabled">
                {user.email}
              </Typography>
            </Stack>
          </Stack>
        </MenuItem>
      )}
      <MenuItem
        sx={{ color: "error.main", "& i": { color: "error.main" } }}
        onClick={async () => {
          const logout = await handleLogout();
          if (logout) {
            localStorage.removeItem("user");
            router.push("/");
          }
        }}
      >
        <ListItemIcon>
          <i className="bx bx-log-out bx-md" />
        </ListItemIcon>
        Keluar
      </MenuItem>
    </>
  );
};
