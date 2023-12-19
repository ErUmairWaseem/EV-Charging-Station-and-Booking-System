import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid, Button, TextField, MenuItem, Divider } from "@mui/material";
import { makePostRequest, makeGetRequest } from "../util/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Dashboard from "./dashboard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import swal from "sweetalert";

const location_city = [
  { lid: 1, city: "Mumbai", sid: "Maharastra" },
  { lid: 2, city: "Pune", sid: "Maharastra" },
  { lid: 3, city: "Nashik", sid: "Maharastra" },
  { lid: 4, city: "Nagpur", sid: "Maharastra" },
  { lid: 5, city: "Surat", sid: "Gujrat" },
  { lid: 6, city: "Ahemedabad", sid: "Gujrat" },
];

const location_state = [
  { sid: 1, state: "Maharastra" },
  { sid: 2, state: "Gujrat" },
];

export default function EvCharge() {
  const history = useHistory();
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [eid, seteid] = useState();
  const [evname, setevname] = useState();
  const [amt, setamt] = useState();
  const [date, setdate] = useState();
  const [time, settime] = useState();
  const current = new Date();
  const ndate = `${current.getFullYear()}-0${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const handlechangestate = (e) => {
    setstate(e.target.value);
  };

  const handlechangecity = (e) => {
    setcity(e.target.value);
  };
  const handlechangetime = (e) => {
    settime(e.target.value);
  };
  const handleClickOpen = (e2, e1) => {
    setOpen(true);
    seteid(e2);
    setevname(e1);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function ViewStations() {
    let bodyFormData = new FormData();
    makeGetRequest("/view/evstation", bodyFormData)
      .then((response) => {
        if (response.data.status === "1") {
          setdata(response.data.data);
        } else {
          setdata([]);
        }
      })
      .catch((err) => {
        toast("There was an error!");
      });
  }

  function FilterStations() {
    let bodyFormData = new FormData();
    makeGetRequest(`/view/evstations?state=${state}&city=${city}`, bodyFormData)
      .then((response) => {
        if (response.data.status === "1") {
          setdata(response.data.data);
        } else {
          setdata([]);
        }
      })
      .catch((err) => {
        toast("There was an error!");
      });
  }

  async function BookSlot() {
    let bodyFormData = new FormData();
    if (localStorage.getItem("balance") > 200) {
      let uamt = parseInt(localStorage.getItem("balance")) - 200;
      bodyFormData.append("uid", localStorage.getItem("user_id"));
      bodyFormData.append("evid", eid);
      bodyFormData.append("uamt1", uamt);
      bodyFormData.append("amt1", 200);
      bodyFormData.append("date", date);
      bodyFormData.append("slot", time);
      bodyFormData.append("evname", evname);
      bodyFormData.append("status", "Pending");

      makePostRequest("/booking/station", bodyFormData)
        .then((response) => {
          if (response.data.status === "1") {
            localStorage.setItem("balance", uamt);
            makePostRequest("/transaction1", bodyFormData).then((response) => {
              if (response.data.status === "1") {
                toast.success("Booked Successfully", {
                  position: "top-center",
                  autoClose: 3000,
                  onClose: () => handleClose(),
                });
              } else {
                toast("Error warning");
              }
            });
          } else {
            toast("Error warning");
          }
        })
        .catch((err) => {
          toast("There was an error!! warning");
        });
    } else {
      toast("Please Recharge your Wallet");
    }
  }

  useEffect(() => {
    if (state.length > 0) {
      FilterStations();
    } else {
      ViewStations();
    }
    // ViewStations()
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Dashboard />
      <div className="dashboarddata">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              value={state}
              onChange={handlechangestate}
              select
              placeholder="Select State"
              label="Select State"
            >
              {location_state.length > 0 ? (
                location_state.map((c) => (
                  <MenuItem value={c.state}>{c.state}</MenuItem>
                ))
              ) : (
                <p className="text-center">No data found</p>
              )}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={city}
              onChange={handlechangecity}
              select
              placeholder="Select State"
              label="Select City"
            >
              {location_city.length > 0 ? (
                location_city.map((c) =>
                  c.sid == state ? (
                    <MenuItem value={c.city}>{c.city}</MenuItem>
                  ) : (
                    <p className="text-center"></p>
                  )
                )
              ) : (
                <p className="text-center">No data found</p>
              )}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <button className="buttonser" onClick={FilterStations}>
              Search Stations
            </button>
          </Grid>
        </Grid>
        <Divider /> <br />
        <Grid container spacing={3}>
          {data.length > 0 ? (
            data.map((c) => (
              <Grid item xs={6}>
                <div className="cardb">
                  <div className="pimage">
                    <img
                      className="pimage1"
                      src={process.env.PUBLIC_URL + `/assets/cars.jpg`}
                      alt="img"
                    />
                  </div>
                  <div className="data1">
                    <span>
                      {" "}
                      <b>Station Name:</b>
                      <span className="textcol">{c.cs_name}</span>
                    </span>
                    <span>
                      <b>Status:</b>{" "}
                      <span className="textcol">
                        {c.is_active == true ? <>Active</> : <>In-Active</>}
                      </span>
                    </span>
                    <span>
                      <b>Capacity:</b>{" "}
                      <span className="textcol">{c.capacity}</span>
                    </span>
                    <span>
                      {" "}
                      <b>Location:</b>
                      <span className="textcol">
                        {c.cs_area + " " + c.cs_city + " " + c.cs_state}
                      </span>
                    </span>
                  </div>
                  {c.is_active == true ? (
                    <>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        onClick={() => handleClickOpen(c.cs_id, c.cs_name)}
                      >
                        Add to Calender
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn" disabled>
                        Currently Out Of Service
                      </button>
                    </>
                  )}

                  <a className="buttond" href={c.location} target="_blank">
                    <span>Direction</span>
                  </a>
                </div>
              </Grid>
            ))
          ) : (
            <center>
              <h2 className="text-center">No Station is Available Near You</h2>
            </center>
          )}
        </Grid>
      </div>
      <ToastContainer />

      <Dialog
        maxWidth="xl"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <h3>Book Your Slot Now</h3>
        </DialogTitle>

        <DialogContent>
          <div>
            <h5>Please fill up below details </h5>
            <div className="row m-0 bg-light">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    value={"User ID: " + localStorage.getItem("user_id")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    value={"EV Station Name: " + evname}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    inputProps={{ min: ndate }}
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={time}
                    onChange={handlechangetime}
                    select
                    placeholder="Select Slot"
                    label="Select Slot"
                  >
                    <MenuItem value="7 Am to 8 Am">7 Am to 8 Am</MenuItem>
                    <MenuItem value="8 Am to 9 Am">8 Am to 9 Am</MenuItem>
                    <MenuItem value="9 Am to 10 Am">9 Am to 10 Am</MenuItem>
                    <MenuItem value="10 Am to 11 Am">10 Am to 11 Am</MenuItem>
                    <MenuItem value="11 Am to 12 Pm">11 Am to 12 Pm</MenuItem>
                    <MenuItem value="12 Pm to 1 Pm">12 Pm to 1 Pm</MenuItem>
                    <MenuItem value="1 Pm to 2 Pm">1 Pm to 2 Pm</MenuItem>
                    <MenuItem value="2 Pm to 3 Pm">2 Pm to 3 Pm</MenuItem>
                    <MenuItem value="3 Pm to 4 Pm">3 Pm to 4 Pm</MenuItem>
                    <MenuItem value="4 Pm to 5 Pm">4 Pm to 5 Pm</MenuItem>
                    <MenuItem value="5 Pm to 6 Pm">5 Pm to 6 Pm</MenuItem>
                    <MenuItem value="6 Pm to 7 Pm">6 Pm to 7 Pm</MenuItem>
                    <MenuItem value="7 Pm to 8 Pm">7 Pm to 8 Pm</MenuItem>
                    <MenuItem value="8 Pm to 9 Pm">8 Pm to 9 Pm</MenuItem>
                    <MenuItem value="9 Pm to 10 Pm">9 Pm to 10 Pm</MenuItem>
                    <MenuItem value="10 Pm to 11 Pm">10 Pm to 11 Pm</MenuItem>
                    <MenuItem value="12 Am to 1 Am">12 Am to 1 Am</MenuItem>
                    <MenuItem value="2 Am to 2 Am">2 Am to 2 Am</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <span>
                    Note: Your account will be charged 200 rupees for the
                    booking.{" "}
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <button className="buttond" onClick={BookSlot}>
                    Book Now
                  </button>
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
