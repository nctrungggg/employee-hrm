import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { ROUTES } from "../../configs/routes";
import { logout } from "../../modules/auth/redux/authSlice";

export interface IDialogLogoutProps {
  title: string;
}

export default function DialogLogout() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await authApi.logout();
    dispatch(logout());

    navigate(`${ROUTES.auth}/${ROUTES.signIn}`);

    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        className="w-full !bg-bgrBlue !capitalize !h-12 !font-normal !rounded-md"
        variant="contained"
        onClick={handleClickOpen}
      >
        Sign Out
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you wish to sign out?
        </DialogTitle>

        <DialogActions>
          <Button size="large" variant="outlined" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="contained"
            size="large"
            className="!bg-bgrBlue"
            onClick={handleLogout}
          >
            Yes
          </Button>
        </DialogActions>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute top-6 right-6 cursor-pointer"
          onClick={handleClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Dialog>
    </div>
  );
}
