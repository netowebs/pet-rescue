import './boxWidgets.scss'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {TopBox, BottomBox} from './StyledBox';
import { ReactNode } from 'react';
import {Link} from 'react-router-dom'

type PropBox = {
    style:{
        bgColor: string;
        bgBottom: string;
    },
    top:{
        numInfo: string;
        txtInfo: string;
        bgImg: ReactNode;
    }
    bottom: {
        txt: any;
        link: string
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
                        <Link to={bottom.link} style={{textDecoration: 'none', color: 'white'}}>
                            <span>Acessar {bottom.txt}</span>
                        </Link>
                    </div>
                    <div className="iconBottomBox">
                        <ArrowForwardIcon className='icon'/>
                    </div>
                </div>
            </BottomBox>
        </div>
    )
}