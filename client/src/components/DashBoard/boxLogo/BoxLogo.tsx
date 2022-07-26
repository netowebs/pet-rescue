import './boxLogo.scss';
import logo from '../../../images/logo.png'

export const BoxLogo = () => {
    return(
        <div className='box-logo'>
            <div className="img-logo">
                <img src={logo} alt="" />
            </div>
            <div className="txt-logo">
              <div className="txtPet">
                <span className='pet'>Pet</span>
                <span className='rescue'>Rescue</span>
              </div>
            </div>
        </div>
    )
}