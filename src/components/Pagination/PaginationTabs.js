import { Pagination } from "antd";
import { Component } from "react";
export default class PaginationTabs extends Component {
  render() {
    const { currpage, onChangePage, totalMovies } = this.props;
    const togglePagination = totalMovies ? false : true;
    return (
      <Pagination
        current={currpage}
        onChange={onChangePage}
        defaultPageSize={20}
        total={totalMovies}
        disabled={togglePagination}
        showSizeChanger={false}
      />
    );
  }
}
