/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchBarOverridesProps = {
    SearchBar?: PrimitiveOverrideProps<FlexProps>;
    "Search a topic"?: PrimitiveOverrideProps<TextProps>;
    SearchButton?: PrimitiveOverrideProps<ViewProps>;
    "ph:magnifying-glass-bold"?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type SearchBarProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SearchBarOverridesProps | undefined | null;
}>;
export default function SearchBar(props: SearchBarProps): React.ReactElement;
