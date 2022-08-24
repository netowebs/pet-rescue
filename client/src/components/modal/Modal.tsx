import './modal.scss'

type Props = {
    children: JSX.Element
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ children, closeModal }: Props) => {
    return (
        <div className='container--modal'>
            <div className="containt--modal">
                <div className="btnClose--modal">
                    <input className='btnClose' type="button" value="Close" onClick={() => closeModal(false)} />
                </div>
                {children}
            </div>
        </div>
    )
}