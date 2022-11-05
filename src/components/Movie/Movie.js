import { Rate } from "antd";
import { format } from "date-fns";
import React from "react";
import "./movie.css";
export default class Movie extends React.Component {
  state = {
  text: this.kitcut(this.props.item.overview, 111)
  }
  kitcut(text, limit) {
    text = text.trim();
    if( text.length <= limit) return text;
  
    text = text.slice(0, limit);
  
    return text.trim() + "...";
  }
  render() {
    const { item } = this.props;
    const date = format(new Date(item.release_date), "MMMM d, yyyy");
    return (
      <div className="movie">
        <div className="left-side">
          <img className="movie-img" src="#" alt="#" />
        </div>
        <div className="right-side">
          <h2 className="movie-title">{item.original_title}</h2>
          <p className="movie-date">{date}</p>
          <div className="movie-genre-block">
            <div className="movie-genre">Action</div>
            <div className="movie-genre">Drama</div>
          </div>
          <p className="movie-discription">{this.state.text}</p>
          <Rate
            disabled
            allowHalf
            defaultValue={item.vote_average}
            count={10}
          />
        </div>
      </div>
    );
  }
}
