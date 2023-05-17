import { Avatar, Box, Button, Fade, Modal } from "@mui/material";
import logo from "../../assets/imgs/logo.png";
import DialogLogout from "../../components/dialogLogout/DialogLogout";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "7%",
    right: "2%",
    bgcolor: "background.paper",
    pt: 2,
    px: 4,
    pb: 3,
    minWidth: "322px",
    border: " 1px solid #dfe3e6",
    borderRadius: "8px",
  };

  return (
    <div className="px-[30px] fixed top-0 h-[60px] w-full bg-white flex justify-between items-center shadow-sm z-50">
      <div className="flex gap-4 items-center">
        <div className="w-[36px] h-[36px] ">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
        <h1 className="text-24 text-textPrimary font-medium">
          HR Management System
        </h1>
      </div>
      <div>
        <div onClick={handleOpen} className="cursor-pointer">
          <Avatar sx={{ width: 35, height: 35, fontSize: 14 }}> T</Avatar>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Fade in={open}>
            <Box sx={{ ...style }}>
              <div className="flex items-center gap-[10px] mb-10">
                <Avatar sx={{ width: 30, height: 30, fontSize: 14 }}> T</Avatar>
                <h4 className="text-20 font-medium">Nguyen Chi Trung</h4>
              </div>

              <DialogLogout />
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
