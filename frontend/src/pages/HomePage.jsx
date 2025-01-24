 
import Footer from '../components/Home/Footer';
import HeroSection from '../components/Home/HeroSection';
import Navbar from '../components/Home/Navbar';
export default function HomePage ()  {
    return (
       <div className='max-h-screen md:overflow-clip'>
       <Navbar/>
       <HeroSection/>
       <Footer/>
       </div>
    );
}

