import React from "react";
import { toast, Slide } from "react-toastify";

const ToastrComponent = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  let icon;
  switch (type) {
    case "success":
      icon = "ri-checkbox-circle-fill";
      break;
    case "error":
      icon = "ri-alert-fill";
      break;
    case "info":
      icon = "ri-information-fill";
      break;
    default:
      icon = "ri-information-fill";
      break;
  }

  return (
    <div className="flex flex-row items-start justify-start">
      <i className={icon}></i>
      <p className="mx-4 font-medium leading-5 text-white">{message}</p>
    </div>
  );
};

const isError = (e: any) => e && e.stack && e.message;

const Toastr = {
  success: (message: string) => {
    toast.success(<ToastrComponent type="success" message={message} />, {
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: Slide,
    });
  },
  error: (error: any) => {
    const errorMessage = isError(error) ? error.message : error;
    toast.error(<ToastrComponent type="error" message={errorMessage} />, {
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: Slide,
    });
  },
};

export default Toastr;
