import { Rate } from "antd";
import { format } from "date-fns";
import { Component } from "react";
import movieDefault from "../images/movie.jpg";
import "./movie.css";
export default class Movie extends Component {
  state = {
    text: this.kitcut(this.props.text, 111),
  };
  kitcut(text, limit) {
    text = text.trim();
    if (text.length <= limit) return text;

    text = text.slice(0, limit);

    return text.trim() + "...";
  }
  render() {
    const { date, title, voteAverage, posterPath } = this.props;
    let MovieDate =
      date !== "" ? format(new Date(date), "MMMM d, yyyy") : "There is no date";
    const urlImg =
      posterPath !== null
        ? `https://image.tmdb.org/t/p/original${posterPath}`
        : movieDefault;
    return (
      <div className="movie">
        <div className="left-side">
          <img className="movie-img" src={urlImg} alt="#" />
        </div>
        <div className="right-side">
          <h2 className="movie-title">{title}</h2>
          <p className="movie-date">{MovieDate}</p>
          <div className="movie-genre-block">
            <div className="movie-genre">Action</div>
            <div className="movie-genre">Drama</div>
          </div>
          <p className="movie-discription">{this.state.text}</p>
          <Rate disabled allowHalf defaultValue={voteAverage} count={10} />
        </div>
      </div>
    );
  }
}
