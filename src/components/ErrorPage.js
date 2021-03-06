
import Title from "./Title";
import image from '../img/hexagonbg.jpg'
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ErrorPage () {

    return (
        <div id="bg" style={{ backgroundImage: `url(${image})` }}>
        <div className="error-Page" >
            
      <Title >Oops!</Title>
            <h5>404 - PAGE NOT FOUND</h5> 
            <h6>We are sorry, but the page you requestet was not found. </h6> <br />
            <Link 
        component="button"
        variant="body2"
        to='/dashboard'><ArrowBackIcon /> Back
        </Link>
      
        </div>
        </div>
    )
}

export default ErrorPage;