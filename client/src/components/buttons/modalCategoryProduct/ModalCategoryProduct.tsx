import { useState } from "react";
import { Modal } from "../../modal/Modal";
import './modalcategoryproduct.scss'

type Prop = {
    Comp: React.ReactNode
}

export const ModalCategoryProduct = ({Comp}: Prop) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className='fieldBoxButtons'>
            {/* <legend>Botões Cadastro de Apartamentos e Seções</legend> */}
            <button
                className="btnNew"
                onClick={() => setShowModal(true)}
            >
                +
            </button>
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

