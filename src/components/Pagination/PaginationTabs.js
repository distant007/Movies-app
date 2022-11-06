import { Pagination } from "antd";
import { Component } from "react";
export default class PaginationTabs extends Component {
  onChange = (page) => {
    console.log(page);
  };
  render() {
    const { currpage, onChangePage } = this.props;
    return <Pagination current={currpage} onChange={onChangePage} total={50} />;
  }
}
