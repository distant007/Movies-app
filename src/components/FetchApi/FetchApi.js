export default class FetchApi {
  url =
    "https://api.themoviedb.org/3/search/movie?api_key=12c052732f00500a4355cf2bf4538874&query=return";

  async getApi(url) {
    const res = await fetch(url);
    return await res.json();
  }
  async getInfoMovie(currpage) {
    const res = await this.getApi(
      `https://api.themoviedb.org/3/search/movie?api_key=12c052732f00500a4355cf2bf4538874&language=en-US&query=return&page=${currpage}&include_adult=false`
    );
    console.log(res);
    return res.results;
  }
}
