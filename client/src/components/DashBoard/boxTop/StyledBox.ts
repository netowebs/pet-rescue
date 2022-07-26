import { ReactNode } from 'react';
import styled from 'styled-components';

type BoxProp = {
    bgColor: string
}

export const TopBox = styled.div<BoxProp>`
    background-color: ${props => props.bgColor};
        .boxTop{
            width: 100%;
            height: 100%;
            display: flex;

            .boxLeft{
                padding: 10px;
                flex: 3;

                .value{
                    color: white;
                    font-size: 30px;
                    font-weight: 500;
                }

                span{
                    color: white;
                    font-size: 12px;
                }
            }

            .boxRight{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                flex: 1;

                span{
                    color: rgba(255,255,255, 0.4);
                }
            }



        }
`

export const BottomBox = styled.div<BoxProp>`
    background-color: ${props => props.bgColor};

    .boxBottom{
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .txtBottomBox{
            flex: 3;
            align-items: center;
            justify-content: center;
            text-align: right;
            font-size: 13px;
            color: white;
        }

        .iconBottomBox{
            display: flex;
            flex: 1;
        }

        .icon{
            background-color: white;
            border-radius: 50%;
            margin-left: 10px;
            font-size: 13px;                        
        }
    }
`