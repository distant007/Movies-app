export default class FetchApi {
  _apiBase = "https://api.themoviedb.org/3";
  _apiKey = "api_key=12c052732f00500a4355cf2bf4538874";

  async getApi(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("OOOPs");
    }
    return await res.json();
  }
  async getInfoMovie(currpage) {
    const res = await this.getApi(
      `${this._apiBase}/search/movie?${this._apiKey}&language=en-US&query=return&page=${currpage}&include_adult=false`
    );
    console.log(res);
    return res.results;
  }
}
