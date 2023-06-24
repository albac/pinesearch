/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function NavbarResults(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="row"
      width="1440px"
      height="80px"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      position="relative"
      border="2px SOLID rgba(239,239,239,1)"
      padding="8px 58px 8px 58px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "NavbarResults")}
      {...rest}
    >
      <Flex
        gap="23px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 24")}
      >
        <Flex
          gap="2px"
          direction="row"
          width="unset"
          height="60px"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Logo")}
        >
          <Icon
            width="18px"
            height="18px"
            viewBox={{ minX: 0, minY: 0, width: 18, height: 18 }}
            paths={[
              {
                d: "M8.12249 1.60573C8.50171 0.911796 9.49829 0.911796 9.87751 1.60573L10.9602 3.58693C11.1657 3.96292 11.5879 4.16622 12.0099 4.09244L14.234 3.70368C15.0129 3.56751 15.6343 4.34666 15.3282 5.07581L14.4543 7.15757C14.2884 7.55264 14.3927 8.00946 14.7135 8.29344L16.4041 9.78987C16.9963 10.314 16.7745 11.2856 16.0136 11.5009L13.8412 12.1156C13.4289 12.2323 13.1367 12.5986 13.1147 13.0265L12.9989 15.2813C12.9583 16.071 12.0604 16.5034 11.4176 16.0427L9.58254 14.7275C9.23429 14.4779 8.76571 14.4779 8.41746 14.7275L6.58236 16.0427C5.9396 16.5034 5.04172 16.071 5.00113 15.2813L4.88526 13.0265C4.86327 12.5986 4.57112 12.2323 4.15884 12.1156L1.98638 11.5009C1.22546 11.2856 1.0037 10.314 1.59585 9.78987L3.28646 8.29344C3.6073 8.00946 3.71156 7.55264 3.54571 7.15757L2.6718 5.07581C2.36571 4.34666 2.98706 3.56751 3.76604 3.70368L5.99007 4.09244C6.41214 4.16622 6.83431 3.96292 7.03978 3.58693L8.12249 1.60573Z",
                fill: "rgba(77,72,71,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            {...getOverrideProps(overrides, "Star 1")}
          ></Icon>
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="600"
            color="rgba(0,15,8,1)"
            textTransform="capitalize"
            lineHeight="24.204544067382812px"
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
            children="PineSearch"
            {...getOverrideProps(overrides, "PineSearch")}
          ></Text>
        </Flex>
        <View
          width="300px"
          height="50px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          border="1px SOLID rgba(77,72,71,1)"
          borderRadius="100px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(249,252,250,1)"
          {...getOverrideProps(overrides, "Frame 25")}
        >
          <View
            width="24px"
            height="24px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            overflow="hidden"
            position="absolute"
            top="13px"
            left="18px"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "ph:magnifying-glass-bold")}
          >
            <Icon
              width="20.27px"
              height="20.27px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 20.273677825927734,
                height: 20.27459716796875,
              }}
              paths={[
                {
                  d: "M19.9399 18.348L15.4877 13.8939C16.8226 12.1544 17.4458 9.97216 17.2309 7.78998C17.0161 5.60781 15.9792 3.58907 14.3306 2.14328C12.6821 0.697486 10.5453 -0.0670986 8.35376 0.00462578C6.16221 0.0763502 4.07999 0.979012 2.5295 2.5295C0.979013 4.07999 0.0763502 6.16221 0.00462578 8.35376C-0.0670986 10.5453 0.697486 12.6821 2.14328 14.3306C3.58907 15.9792 5.60781 17.0161 7.78998 17.2309C9.97216 17.4458 12.1544 16.8226 13.8939 15.4877L18.3499 19.9445C18.4545 20.0492 18.5787 20.1322 18.7155 20.1888C18.8522 20.2455 18.9987 20.2746 19.1467 20.2746C19.2947 20.2746 19.4413 20.2455 19.578 20.1888C19.7147 20.1322 19.839 20.0492 19.9436 19.9445C20.0482 19.8399 20.1313 19.7157 20.1879 19.5789C20.2445 19.4422 20.2737 19.2957 20.2737 19.1477C20.2737 18.9997 20.2445 18.8531 20.1879 18.7164C20.1313 18.5797 20.0482 18.4554 19.9436 18.3508L19.9399 18.348ZM2.26891 8.64391C2.26891 7.38306 2.6428 6.15052 3.3433 5.10215C4.04379 4.05379 5.03943 3.23669 6.20431 2.75418C7.36919 2.27167 8.65099 2.14543 9.88762 2.39141C11.1242 2.63739 12.2602 3.24455 13.1517 4.13611C14.0433 5.02767 14.6504 6.16358 14.8964 7.40021C15.1424 8.63684 15.0162 9.91864 14.5336 11.0835C14.0511 12.2484 13.234 13.244 12.1857 13.9445C11.1373 14.645 9.90477 15.0189 8.64392 15.0189C6.95369 15.0172 5.3332 14.345 4.13803 13.1498C2.94286 11.9546 2.27065 10.3341 2.26891 8.64391Z",
                  fill: "rgba(139,170,173,1)",
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
            position="absolute"
            top="13px"
            left="51px"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Search a topic"
            {...getOverrideProps(overrides, "Search a topic")}
          ></Text>
        </View>
      </Flex>
      <Flex
        gap="20px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Links")}
      >
        <Text
          fontFamily="Poppins"
          fontSize="16px"
          fontWeight="400"
          color="rgba(0,15,8,1)"
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
          children="How does it work?"
          {...getOverrideProps(overrides, "How does it work?")}
        ></Text>
        <Text
          fontFamily="Poppins"
          fontSize="16px"
          fontWeight="400"
          color="rgba(0,15,8,1)"
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
          children="Log In"
          {...getOverrideProps(overrides, "Log In")}
        ></Text>
        <Flex
          gap="10px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          borderRadius="100px"
          padding="12px 18px 12px 18px"
          backgroundColor="rgba(28,55,56,1)"
          {...getOverrideProps(overrides, "Button")}
        >
          <Text
            fontFamily="Poppins"
            fontSize="16px"
            fontWeight="500"
            color="rgba(255,255,255,1)"
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
            children="Sign Up"
            {...getOverrideProps(overrides, "Sign Up")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
