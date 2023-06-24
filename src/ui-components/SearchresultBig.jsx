/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";
import Tag from "./Tag";
export default function SearchresultBig(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="21px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "SearchresultBig")}
      {...rest}
    >
      <Image
        width="190px"
        height="190px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        borderRadius="12px"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "cover-7771553068405186 1")}
      ></Image>
      <Flex
        gap="17px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "PostContent")}
      >
        <Text
          fontFamily="Poppins"
          fontSize="16px"
          fontWeight="400"
          color="rgba(77,72,71,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="194px"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Published May 29, 2023"
          {...getOverrideProps(overrides, "Published May 29, 2023")}
        ></Text>
        <Text
          fontFamily="Poppins"
          fontSize="22px"
          fontWeight="700"
          color="rgba(0,15,8,1)"
          lineHeight="27.5px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="587px"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="The Effects of Urbanization on Wildlife Diversity"
          {...getOverrideProps(
            overrides,
            "The Effects of Urbanization on Wildlife Diversity"
          )}
        ></Text>
        <Text
          fontFamily="PT Serif"
          fontSize="16px"
          fontWeight="400"
          color="rgba(0,15,8,1)"
          lineHeight="24.003637313842773px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="581px"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="This research aims to understand how urban development and associated factors such as habitat fragmentation, pollution, and human-wildlife interactions influence the abundance..."
          {...getOverrideProps(
            overrides,
            "This research aims to understand how urban development and associated factors such as habitat fragmentation, pollution, and human-wildlife interactions influence the abundance..."
          )}
        ></Text>
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Tags")}
        >
          <Tag
            display="flex"
            gap="10px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            position="relative"
            borderRadius="100px"
            padding="8px 14px 8px 14px"
            backgroundColor="rgba(242,245,244,1)"
            {...getOverrideProps(overrides, "Tag76578")}
          ></Tag>
          <Tag
            display="flex"
            gap="10px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            position="relative"
            borderRadius="100px"
            padding="8px 14px 8px 14px"
            backgroundColor="rgba(242,245,244,1)"
            {...getOverrideProps(overrides, "Tag76570")}
          ></Tag>
        </Flex>
      </Flex>
    </Flex>
  );
}
