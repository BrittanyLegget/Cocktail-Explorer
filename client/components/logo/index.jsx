import React from "react";
import styled from "@emotion/styled"
import Image from "next/image";
import LogoImg from "../../public/logo.png"

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogoImage = styled.div`
    width: 55px;
    height: 55px;
    overflow: hidden;
    margin-top: -6px;

`;

const LogoTitle = styled.h2`
    margin: 0;
    font-size: ${({size}) => size ? size + "px" : "30px"};
    color: #000;
    font-weight: 900;
    margin-left: 10px;
`
export function Logo(props){
    const {logoSize, textSize} = props;
    return (
    <LogoContainer>
        <LogoImage size={logoSize}>
            <Image src={LogoImg} alt="logo image" />
        </LogoImage>
        <LogoTitle size={textSize}>Spring Street Spirits</LogoTitle>
    </LogoContainer>)

}