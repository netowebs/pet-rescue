import './modal.scss'
import {ModalBg} from './StyledModal'

type Props = {
    children: JSX.Element
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
    style:{
        bgColor: string
    }
}

export const Modal = ({ children, closeModal, style }: Props) => {

    return (
        <ModalBg 
            bgColor={style.bgColor} 
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