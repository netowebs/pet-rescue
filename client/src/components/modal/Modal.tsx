import './modal.scss'
import {ModalBg} from './StyledModal'

type Props = {
    children: JSX.Element;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    bgColor: string
}

export const Modal = ({ children, closeModal, bgColor }: Props) => {

    return (
        <ModalBg 
            bgColorModal={bgColor} 
            className='container--modal'
        >
            <div className="containt--modal">
                <div className="btnClose--modal">
                    <input 
                        className='btnClose' 
                        type="button" 
                        value="X" 
                        onClick={() => closeModal(false)} 
                        style={
                            {
                                width: '20px',
                                height: '20px',
                                background: 'none',
                                border: 'none',
                                color:'red',
                                fontWeight: 'bold'
                            }
                        }
                    />
                </div>
                {children}
            </div> 
        </ModalBg>
    )
}