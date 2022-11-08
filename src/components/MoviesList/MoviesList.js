import { Component } from "react";

import Movie from "../Movie";
import Loading from "../Loading";
import FetchApi from "../FetchApi";
import ErrorIndicator from "../ErrorIndicator";
import PaginationTabs from "../Pagination";
import "./moviesList.css";
export default class MovieList extends Component {
  fetchApi = new FetchApi();
  state = {
    movieData: null,
    loading: true,
    error: false,
    currpage: 1,
    totalMovies: null,
  };
  componentDidMount() {
    this.getTodoData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currpage !== prevState.currpage) {
      this.getTodoData();
    }
    if (this.props.searchValue !== prevProps.searchValue) {
      this.getTodoData();
    }
  }
  setTodoData(data, total) {
    this.setState({
      movieData: data,
      loading: false,
      error: false,
      totalMovies: total,
    });
  }
  loadingCurrPage() {
    this.setState({ loading: true });
  }
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };
  getTodoData() {
    const { searchValue } = this.props;
    const { currpage } = this.state;
    if (!currpage) {
      return;
    }
    this.loadingCurrPage();
    this.fetchApi
      .getInfoMovie(currpage, searchValue)
      .then((data) => this.setTodoData(data.results, data.total_results))
      .catch(this.onError);
  }
  onChangePage = (page) => {
    this.setState({ currpage: page });
  };
  render() {
    const { movieData, loading, error, currpage, totalMovies } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Loading /> : null;
    const view = !(loading || error) ? <View movieData={movieData} /> : null;
    const pagination = !(loading || error) ? (
      <Pagination
        currpage={currpage}
        onChangePage={this.onChangePage}
        totalMovies={totalMovies}
      />
    ) : null;
    return (
      <div className="main-content">
        {errorMessage}
        {spinner}
        {view}
        {pagination}
      </div>
    );
  }
}
const View = ({ movieData }) => {
  const view = movieData.map((item) => (
    <li key={item.id} id={item.id}>
      <Movie
        date={item.release_date}
        title={item.original_title}
        voteAverage={item.vote_average}
        text={item.overview}
        posterPath={item.poster_path}
      />
    </li>
  ));
  return <ul className="movies-list">{view}</ul>;
};
const Pagination = ({ currpage, onChangePage, totalMovies }) => {
  return (
    <PaginationTabs
      currpage={currpage}
      onChangePage={onChangePage}
      totalMovies={totalMovies}
    />
  );
};
