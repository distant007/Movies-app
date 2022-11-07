import { Component } from "react";

import MoviesList from "../MoviesList";
import Input from "../Input";
import TabsItems from "../Tabs";
import PaginationTabs from "../Pagination";
import "./app.css";
import "antd/dist/antd.css";
export default class App extends Component {
  state = {
    currpage: 1,
    searchValue: "return",
  };
  onChangePage = (page) => {
    this.setState({ currpage: page });
  };
  searchMovies = (value) => {
    if (value.target.value) {
      this.setState({ searchValue: value.target.value });
    } else {
      this.setState({ searchValue: "return" });
    }
  };
  render() {
    const { currpage, searchValue } = this.state;
    return (
      <section className="main">
        <TabsItems />
        <Input searchMovies={this.searchMovies} />
        <MoviesList currpage={currpage} searchValue={searchValue} />
        <PaginationTabs
          currpage={currpage}
          onChangePage={this.onChangePage}
          searchValue={searchValue}
        />
      </section>
    );
  }
}
