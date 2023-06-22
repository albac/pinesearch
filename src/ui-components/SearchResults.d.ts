/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SearchResultProps } from "./SearchResult";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { UserChatProps } from "./UserChat";
import { AIChatProps } from "./AIChat";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchResultsOverridesProps = {
    SearchResults?: PrimitiveOverrideProps<ViewProps>;
    SearchResult76399?: SearchResultProps;
    Search?: PrimitiveOverrideProps<ViewProps>;
    "Ask a question about Science, Law, or Education..."?: PrimitiveOverrideProps<TextProps>;
    "ph:magnifying-glass-bold"?: PrimitiveOverrideProps<ViewProps>;
    Vector73363?: PrimitiveOverrideProps<IconProps>;
    "ph:arrow-circle-right-fill"?: PrimitiveOverrideProps<ViewProps>;
    Vector73365?: PrimitiveOverrideProps<IconProps>;
    "Frame 2"?: PrimitiveOverrideProps<FlexProps>;
    "See all"?: PrimitiveOverrideProps<TextProps>;
    "Frame 23"?: PrimitiveOverrideProps<ViewProps>;
    UserChat?: UserChatProps;
    AIChat?: AIChatProps;
    SearchResult73379?: SearchResultProps;
    "YOUR QUESTION IS ANSWERED IN THESE POSTS"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type SearchResultsProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: SearchResultsOverridesProps | undefined | null;
}>;
export default function SearchResults(props: SearchResultsProps): React.ReactElement;
