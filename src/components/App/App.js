import React from "react";

import MoviesList from "../MoviesList";
import Input from "../Input";
import TabsItems from "../Tabs";
import PaginationTabs from "../Pagination";
import "./app.css";
import "antd/dist/antd.css";
export default class App extends React.Component {
  state = {
    currpage: 1,
  };
  onChangePage = (page) => {
    this.setState({ currpage: page });
  };
  render() {
    const { currpage } = this.state;
    return (
      <section className="main">
        <TabsItems />
        <Input />
        <MoviesList currpage={currpage} />
        <PaginationTabs currpage={currpage} onChangePage={this.onChangePage} />
      </section>
    );
  }
}
