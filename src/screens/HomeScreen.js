import React from "react";
import Banner from "../Banner";
import "../screens/HomeScreen.css";
import Nav from "../Nav";
import requests from "../Request";
import Row from "../Row";
function HomeScreen() {
  return (
    <div className="HomeScreen">
      {/* NavBar  */}
      <Nav />
      {/* Banner  */}
      <Banner />
      {/* Row */}
      <Row
        title="NETFLIX ORIGINSLS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Horor Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanticMovies}
      />
      <Row
        title="Documentations"
        fetchUrl={requests.fetchDocumentation}
      />
    </div>
  );
}
export default HomeScreen;
