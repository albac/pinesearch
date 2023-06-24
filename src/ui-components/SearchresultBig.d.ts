/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
import { TagProps } from "./Tag";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchresultBigOverridesProps = {
    SearchresultBig?: PrimitiveOverrideProps<FlexProps>;
    "cover-7771553068405186 1"?: PrimitiveOverrideProps<ImageProps>;
    PostContent?: PrimitiveOverrideProps<FlexProps>;
    "Published May 29, 2023"?: PrimitiveOverrideProps<TextProps>;
    "The Effects of Urbanization on Wildlife Diversity"?: PrimitiveOverrideProps<TextProps>;
    "This research aims to understand how urban development and associated factors such as habitat fragmentation, pollution, and human-wildlife interactions influence the abundance..."?: PrimitiveOverrideProps<TextProps>;
    Tags?: PrimitiveOverrideProps<FlexProps>;
    Tag76578?: TagProps;
    Tag76570?: TagProps;
} & EscapeHatchProps;
export declare type SearchresultBigProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SearchresultBigOverridesProps | undefined | null;
}>;
export default function SearchresultBig(props: SearchresultBigProps): React.ReactElement;
