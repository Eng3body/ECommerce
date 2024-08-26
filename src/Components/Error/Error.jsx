
import errorImage from "../../assets/images/error.svg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default function Error() {



  
  return (
    <>
    <Navbar/>
      <div className="flex justify-center items-center align-middle ">
      <img src={errorImage} />
      </div>
    <Footer/>
    </>
  )
}
