import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { makePostRequest } from "../util/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //enables developers to add toast notifications to their applications and also can set notifications and warnings.
import { useHistory } from "react-router-dom";

import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function Addlocation() {
  const history = useHistory();
  const [open1, setOpen1] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.value);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  function addlocation() {
    let bodyFormData = new FormData();
    bodyFormData.append("location", selectedFile);
    bodyFormData.append("id", localStorage.getItem("user_id"));
    makePostRequest("/update/location", bodyFormData)
      .then((response) => {
        if (response.data.status === "1") {
          toast.success("Welcome to EcoWheels Location Added...", {
            position: "top-center",
            autoClose: 3000,
            onClose: () => history.push("/station/dashboard"),
          });
        } else {
          toast(response.data.message + " warning");
        }
      })
      .catch((err) => {
        toast("There was an error!");
      });
  }
  let l = 1;
  useEffect(() => {
    if (l === 1) {
      handleClickOpen1();
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Dialog
        maxWidth="md"
        fullWidth
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <center>
          <DialogTitle id="customized-dialog-title" onClose={handleClose1}>
            <IconButton
              aria-label="close"
              onClick={handleClose1}
              className="modalClose"
            >
              <AddLocationIcon />
            </IconButton>
            <h3>Hey Please Add Your Location </h3>
            {/* <a href={localStorage.getItem("location")} target="_blank">Direction</a> */}
          </DialogTitle>
          <DialogContent>
            <div>
              <input
                className="myInput"
                placeholder="Copy Your Google Map Location And Paste Here (: "
                value={selectedFile}
                onChange={changeHandler}
              />
            </div>
            <div>
              <br />
              <button className="button" onClick={() => addlocation()}>
                <span class="button__text">Add Location</span>
                <span class="button__icon">
                  <AddLocationIcon />
                </span>
              </button>
            </div>
          </DialogContent>
        </center>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}
