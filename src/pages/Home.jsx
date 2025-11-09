
import ArtCard from "../components/ArtCard";
import Banner from "../components/Banner";
const Home = () => {
    
    return (
        <div>
            <Banner/>

            <div className="text-center text-xl font-bold mt-10">Latest Model</div>

             <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
         {data.map(model => <ArtCardCard key={model._id} model={model}/>)}
      </div>
            
        </div>
    );
};

export default Home;