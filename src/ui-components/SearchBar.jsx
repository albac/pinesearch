/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function SearchBar(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="840px"
      height="80px"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      position="relative"
      border="1px SOLID rgba(77,72,71,1)"
      borderRadius="100px"
      padding="9px 7px 9px 31px"
      backgroundColor="rgba(249,252,250,1)"
      {...getOverrideProps(overrides, "SearchBar")}
      {...rest}
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
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Search a topic"
        {...getOverrideProps(overrides, "Search a topic")}
      ></Text>
      <View
        width="64px"
        height="64px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        borderRadius="100px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(139,170,173,1)"
        {...getOverrideProps(overrides, "SearchButton")}
      >
        <View
          width="30px"
          height="30px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          position="absolute"
          top="17px"
          left="17px"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "ph:magnifying-glass-bold")}
        >
          <Icon
            width="25.34px"
            height="25.34px"
            viewBox={{
              minX: 0,
              minY: 0,
              width: 25.342071533203125,
              height: 25.34326171875,
            }}
            paths={[
              {
                d: "M24.9248 22.935L19.3596 17.3674C21.0282 15.1929 21.8073 12.4652 21.5387 9.73748C21.2701 7.00976 19.974 4.48634 17.9133 2.6791C15.8526 0.871857 13.1816 -0.0838733 10.4422 0.00578223C7.70276 0.0954377 5.09999 1.22377 3.16188 3.16188C1.22377 5.09999 0.0954377 7.70276 0.00578223 10.4422C-0.0838733 13.1816 0.871857 15.8526 2.6791 17.9133C4.48634 19.974 7.00976 21.2701 9.73748 21.5387C12.4652 21.8073 15.1929 21.0282 17.3674 19.3596L22.9373 24.9307C23.0681 25.0615 23.2234 25.1652 23.3943 25.236C23.5652 25.3068 23.7484 25.3433 23.9334 25.3433C24.1184 25.3433 24.3016 25.3068 24.4725 25.236C24.6434 25.1652 24.7987 25.0615 24.9295 24.9307C25.0603 24.7999 25.1641 24.6446 25.2349 24.4737C25.3057 24.3027 25.3421 24.1196 25.3421 23.9346C25.3421 23.7496 25.3057 23.5664 25.2349 23.3955C25.1641 23.2246 25.0603 23.0693 24.9295 22.9385L24.9248 22.935ZM2.83614 10.8049C2.83614 9.22882 3.3035 7.68815 4.17912 6.37769C5.05474 5.06724 6.29929 4.04586 7.75538 3.44273C9.21148 2.83959 10.8137 2.68178 12.3595 2.98926C13.9053 3.29674 15.3252 4.05569 16.4396 5.17014C17.5541 6.28458 18.313 7.70448 18.6205 9.25027C18.928 10.7961 18.7702 12.3983 18.1671 13.8544C17.5639 15.3105 16.5425 16.555 15.2321 17.4307C13.9216 18.3063 12.381 18.7736 10.8049 18.7736C8.69212 18.7715 6.66649 17.9312 5.17253 16.4372C3.67857 14.9433 2.83831 12.9177 2.83614 10.8049Z",
                fill: "rgba(255,255,255,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="7.73%"
            bottom="7.79%"
            left="7.73%"
            right="7.79%"
            {...getOverrideProps(overrides, "Vector")}
          ></Icon>
        </View>
      </View>
    </Flex>
  );
}
