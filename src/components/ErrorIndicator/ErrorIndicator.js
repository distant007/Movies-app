import { Alert } from "antd";
import React from "react";
const ErrorIndicator = () => (
  <>
    <Alert message="Error" type="error" showIcon />
    <Alert
      message="Error"
      description="Something goes wrong, don't worry. Turn on your VPN and reload this page"
      type="error"
      showIcon
    />
  </>
);
export default ErrorIndicator;
