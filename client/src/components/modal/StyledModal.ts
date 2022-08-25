import styled from "styled-components";

type TypeModalBg ={
    bgColor: string
}

export const ModalBg = styled.div<TypeModalBg>`
    background-color:${props => props.bgColor};
`