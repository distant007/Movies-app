import { Input } from "antd";
import _debounce from "lodash/debounce";
import React from "react";

import "./input.css";

export default class InputSearch extends React.Component {
  render() {
    const { searchMovies } = this.props;
    return (
      <Input
        placeholder="Type to search..."
        onChange={_debounce(searchMovies, 500, [])}
      />
    );
  }
}
