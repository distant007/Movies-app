import { Pagination } from "antd";
import React from "react";
export default class PaginationTabs extends React.Component {
  onChange = (page) => {
    console.log(page);
  };
  render() {
    const { currpage, onChangePage } = this.props;
    return <Pagination current={currpage} onChange={onChangePage} total={50} />;
  }
}
