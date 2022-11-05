export default class FetchApi {
  url =
    "https://api.themoviedb.org/3/search/movie?api_key=12c052732f00500a4355cf2bf4538874&query=return";

  async componentDidMount() {
    const res = await fetch(this.url);
    return await res.json();
  }
  async getInfoMovie() {
    const res = await this.componentDidMount();
    return res.results;
  }
}
