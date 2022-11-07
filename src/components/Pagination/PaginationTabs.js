import { Pagination } from "antd";
import { Component } from "react";
import FetchApi from "../FetchApi";
export default class PaginationTabs extends Component {
  state = {
    totalMovies: null,
  };
  componentDidMount() {
    this.getTotalMovies();
  }
  componentDidUpdate(prevProps) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.getTotalMovies();
    }
  }
  fetchApi = new FetchApi();
  getTotalMovies() {
    this.fetchApi
      .getTotalMovies(this.props.currpage, this.props.searchValue)
      .then((totalMovies) => this.setState({ totalMovies: totalMovies }));
  }
  render() {
    const { totalMovies } = this.state;
    const { currpage, onChangePage } = this.props;
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
