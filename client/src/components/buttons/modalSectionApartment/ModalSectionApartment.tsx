import { useState } from "react";
import { Modal } from "../../modal/Modal";
import './modalsectionapartment.scss'

type Prop = {
    Comp: React.ReactNode
}

export const ModalSectionApartment = ({Comp}: Prop) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className='fieldBoxButtons'>
            {/* <legend>Botões Cadastro de Apartamentos e Seções</legend> */}
            <input
                className='btnNew'
                type="button"
                value="Cadastros de Hospedagem"
                onClick={() => setShowModal(true)}
            />
            {
                showModal === true ? <Modal
                    showModal={setShowModal}
                    bgColor={'rgba(0, 0, 0, 0.8)'}
                >
                    <div className='listModal'>
                        {Comp}
                    </div>
                </Modal > : null
            }
        </div>
    )
}

