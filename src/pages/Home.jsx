import ArtCard from "../components/ArtCard";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
         <Navbar></Navbar>
      <Banner></Banner>

      <div className="text-center text-xl font-bold mt-10">Latest ArtWork</div>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {/* {data.map((model) => (
          <ArtCardCard key={model._id} model={model} />
        ))} */}
      </div>
    </div>
  );
};

export default Home;
