import React, { useState, useEffect } from "react";
import { makePostRequest, makeGetRequest } from "../util/utils";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MenuItem, TextField } from "@mui/material";
import swal from "sweetalert";

const Validation_Schema = Yup.object().shape({
  amt: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  exdate: Yup.string().required("Required"),

  cardno: Yup.string()
    .required("Required")
    .max(16, "Card no must be greater than or equal to 16 digits")
    .min(16, "Card no must be contain 16 digits"),

  cvv: Yup.string()
    .required("Required")
    .max(3, "CVV no must be greater than or equal to 3 digits")
    .min(3, "CVV no must be contain 3 digits"),
});

export default function AddMoney() {
  const history = useHistory();
  const { mid } = useParams();
  const [otp, setotp] = useState();
  const [eotp, seteotp] = useState();
  const [amt, setamt] = useState();

  async function generateotp() {
    setotp(Math.floor(1000 + Math.random() * 9000));
    // setTimeout(() => SendMailOtp(),5000);
  }
  function call() {
    SendMailOtp();
  }
  async function checkotp() {
    if (otp == eotp) {
      let bodyFormData = new FormData();

      bodyFormData.append("amt", parseInt(amt));
      bodyFormData.append("uamt", parseInt(amt) + parseInt(mid));
      bodyFormData.append("user_id", localStorage.getItem("user_id"));
      bodyFormData.append("uid", localStorage.getItem("user_id"));
      makePostRequest("/add/money", bodyFormData)
        .then((response) => {
          if (response.data.status === "1") {
            makePostRequest("/transaction", bodyFormData)
              .then((response) => {
                if (response.data.status === "1") {
                  localStorage.setItem(
                    //change
                    "balance",
                    parseInt(amt) + parseInt(mid)
                  );
                  toast.success("Trasaction Successfully completed", {
                    position: "top-center",
                    autoClose: 3000,
                    onClose: () => history.push("/user/wallet"),
                  });
                } else {
                  toast("Error warning");
                }
              })
              .catch((err) => {
                toast("There was an error!! warning");
              });
          } else {
            toast("Error warning");
          }
        })
        .catch((err) => {
          toast("There was an error!! warning");
        });
    } else {
      toast("Please Enter Correct OTP... try again");
    }
  }

  async function SendMailOtp() {
    let bodyFormData = new FormData();
    bodyFormData.append("email", localStorage.getItem("uemail"));
    // bodyFormData.append("email","sohamgite14@gmail.com");
    bodyFormData.append("otp", otp);
    makePostRequest("/otp/mail/booking", bodyFormData)
      .then((response) => {
        if (response.data.status === "1") {
          swal("Success", "OTP is send to your Email", "success");
        } else {
          swal("Error", response.data.message, "warning");
        }
      })
      .catch((err) => {
        swal("There was an error!", "more error details", "warning");
      });
  }

  var UserInitials = {
    amt: "",
    name: "",
    cardno: "",
    cvv: "",
    exdate: "",
  };

  return (
    <div>
      <h3>Add Money to your Wallet</h3>

      <div class="credit-card-info--form">
        <Formik
          initialValues={UserInitials}
          validationSchema={Validation_Schema}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Form>
              <div class="input_container">
                <label class="input_label">Enter Amount</label>
                <input
                  class="input_field"
                  value={values.amt}
                  onChange={handleChange("amt")}
                  onBlur={() => setFieldTouched("amt")}
                  onChangeCapture={(e) => setamt(e.target.value)}
                  placeholder="Enter Amount"
                />
                {errors.amt && touched.amt ? (
                  <div className="errmsg">{errors.amt}</div>
                ) : null}
              </div>
              <div class="input_container">
                <label for="password_field" class="input_label">
                  Card holder full name
                </label>
                <input
                  class="input_field"
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name ? (
                  <div className="errmsg">{errors.name}</div>
                ) : null}
              </div>
              <div class="input_container">
                <label for="password_field" class="input_label">
                  Card Number
                </label>
                <input
                  class="input_field"
                  value={values.cardno}
                  onChange={handleChange("cardno")}
                  onBlur={() => setFieldTouched("cardno")}
                  placeholder="0000 0000 0000 0000"
                />
                {errors.cardno && touched.cardno ? (
                  <div className="errmsg">{errors.cardno}</div>
                ) : null}
              </div>
              <div class="input_container">
                <label for="password_field" class="input_label">
                  Expiry Date / CVV
                </label>
                <div class="split">
                  <input
                    class="input_field"
                    value={values.exdate}
                    onChange={handleChange("exdate")}
                    onBlur={() => setFieldTouched("exdate")}
                    placeholder="01/23"
                  />
                  {errors.exdate && touched.exdate ? (
                    <div className="errmsg">{errors.exdate}</div>
                  ) : null}

                  <input
                    class="input_field"
                    value={values.cvv}
                    onChange={handleChange("cvv")}
                    onBlur={() => setFieldTouched("cvv")}
                    placeholder="CVV"
                  />
                  {errors.cvv && touched.cvv ? (
                    <div className="errmsg">{errors.cvv}</div>
                  ) : null}
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {otp > 0 ? (
          <>
            <div class="input_container">
              <label for="password_field" class="input_label">
                Please Enter Correct OTP
              </label>
              <div class="split">
                <input
                  class="input_field"
                  type="text"
                  value={eotp}
                  onChange={(e) => seteotp(e.target.value)}
                  placeholder="Please Enter Correct OTP"
                />
                <button class="btn" onClick={call}>
                  Generate OTP
                </button>
              </div>
              <button className="btn btn-primary" onClick={checkotp}>
                Verify
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {otp > 0 ? (
        <></>
      ) : (
        <button class="btn btn-primary" onClick={generateotp}>
          Checkout
        </button>
      )}
      <ToastContainer />
    </div>
  );
}
