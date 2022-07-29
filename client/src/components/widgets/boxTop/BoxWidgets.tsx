import './boxWidgets.scss'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {TopBox, BottomBox} from './StyledBox';
import { ReactNode } from 'react';

type PropBox = {
    style:{
        bgColor: string;
        bgBottom: string;
    },
    top:{
        numInfo: number;
        txtInfo: string;
        bgImg: ReactNode;
    }
    bottom: {
        txtLink: string;
    }
}

export const BoxWidgets = ({style, top, bottom}: PropBox) => {
    return(
        <div className="box-widgets" >
            <TopBox
                bgColor={style.bgColor}
            >
                    <div className="boxTop">
                        <div className="boxLeft">
                            <div className="value">{top.numInfo}</div>
                            <span>{top.txtInfo}</span>
                        </div>
                        <div className="boxRight">
                           <span>{top.bgImg}</span>
                        </div>
                    </div>
            </TopBox>
            <BottomBox
                bgColor={style.bgBottom}
            >
                <div className="boxBottom">
                    <div className="txtBottomBox">
                        <span>Acessar {bottom.txtLink}</span>
                    </div>
                    <div className="iconBottomBox">
                        <ArrowForwardIcon className='icon'/>
                    </div>
                </div>
            </BottomBox>
        </div>
    )
}