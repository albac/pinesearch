/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavbarResultsOverridesProps = {
    NavbarResults?: PrimitiveOverrideProps<FlexProps>;
    "Frame 24"?: PrimitiveOverrideProps<FlexProps>;
    Logo?: PrimitiveOverrideProps<FlexProps>;
    "Star 1"?: PrimitiveOverrideProps<IconProps>;
    PineSearch?: PrimitiveOverrideProps<TextProps>;
    "Frame 25"?: PrimitiveOverrideProps<ViewProps>;
    "ph:magnifying-glass-bold"?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    "Search a topic"?: PrimitiveOverrideProps<TextProps>;
    Links?: PrimitiveOverrideProps<FlexProps>;
    "How does it work?"?: PrimitiveOverrideProps<TextProps>;
    "Log In"?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<FlexProps>;
    "Sign Up"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NavbarResultsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NavbarResultsOverridesProps | undefined | null;
}>;
export default function NavbarResults(props: NavbarResultsProps): React.ReactElement;
