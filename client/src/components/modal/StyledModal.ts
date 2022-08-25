import styled from "styled-components";

type TypeModalBg ={
    bgColorModal: string
}

export const ModalBg = styled.div<TypeModalBg>`
    background-color: ${props => props.bgColorModal};
`