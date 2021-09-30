/**
 * 自定义icon
 */
import Icon from '@ant-design/icons';
import React from 'react'
import {ReactComponent as Recent} from "../../assets/images/recent.svg";
import {ReactComponent as Contact} from "../../assets/images/contact.svg";
import {ReactComponent as informationSvg} from "../../assets/images/information.svg";
import {ReactComponent as SearchSvg} from "../../assets/images/search.svg";
import {ReactComponent as faceSvg} from "../../assets/images/face.svg";
import {ReactComponent as messageSvg} from "../../assets/images/message.svg";
import {ReactComponent as uploadSvg} from "../../assets/images/upload.svg";
import {ReactComponent as avatarSvg} from "../../assets/images/avatar.svg";
import {ReactComponent as manSvg} from "../../assets/images/man.svg";
import {ReactComponent as womenSvg} from "../../assets/images/women.svg";
import {ReactComponent as sendCardSvg} from "../../assets/images/sendCard.svg";

const SearchIcon = props => <Icon component={SearchSvg} {...props} />;
const InformationIcon = props => <Icon component={informationSvg} {...props} />;
const FaceIcon = props => <Icon component={faceSvg} {...props} />;
const MessageIcon = props => <Icon component={messageSvg} {...props} />;
const UploadIcon = props => <Icon component={uploadSvg} {...props} />;
const AvatarIcon = props => <Icon component={avatarSvg} {...props} />;
const ManIcon = props => <Icon component={manSvg} {...props} />;
const WomenIcon = props => <Icon component={womenSvg} {...props} />;
const SendCardIcon = props => <Icon component={sendCardSvg} {...props} />;

export {
    SearchIcon,
    InformationIcon,
    Contact,
    Recent,
    FaceIcon,
    MessageIcon,
    UploadIcon,
    AvatarIcon,
    ManIcon,
    WomenIcon,
    SendCardIcon
}