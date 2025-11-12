
import Banner from "../components/Banner";
import CommunityHighlights from "../components/CommunityHighlights";
import Navbar from "../components/Navbar";
import TopArtists from "../components/TopArtists";
import PageMotion from "../components/PageMotion";
import FeaturedArtworks from "../components/FeaturedArtworks";

const Home = () => {
  return (
    <PageMotion className="">
      <Banner />
      <FeaturedArtworks></FeaturedArtworks>
      <TopArtists />
      <CommunityHighlights />

      {/* <div className="text-center text-xl font-bold mt-10">Latest ArtWork</div> */}

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {/* {data.map((model) => (
          <ArtCardCard key={model._id} model={model} />
        ))} */}
      </div>
    </PageMotion>
  );
};

export default Home;
