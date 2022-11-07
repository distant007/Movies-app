import { Pagination } from "antd";
import { Component } from "react";
import FetchApi from "../FetchApi";
export default class PaginationTabs extends Component {
  state = {
    totalMovies: null,
  };
  onChange = (page) => {
    console.log(page);
  };
  componentDidMount() {
    this.getTotalMovies();
  }
  fetchApi = new FetchApi();
  getTotalMovies() {
    this.fetchApi
      .getTotalMovies(this.props.currpage)
      .then((totalMovies) => this.setState({ totalMovies }));
  }
  render() {
    const { totalMovies } = this.state;
    const { currpage, onChangePage } = this.props;
    return (
      <Pagination
        current={currpage}
        onChange={onChangePage}
        defaultPageSize={20}
        total={totalMovies}
        showSizeChanger={false}
      />
    );
  }
}
