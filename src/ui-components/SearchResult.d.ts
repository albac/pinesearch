/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchResultOverridesProps = {
    SearchResult?: PrimitiveOverrideProps<FlexProps>;
    Image?: PrimitiveOverrideProps<ImageProps>;
    "Text Group"?: PrimitiveOverrideProps<FlexProps>;
    "Exploring the Role of Gut Microbiota in Human Metabolism and Disease"?: PrimitiveOverrideProps<TextProps>;
    "Explores the ecological consequences of microplastic pollution on aquatic ecosystems. This research investigates how microplastics, tiny plastic..."?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type SearchResultProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SearchResultOverridesProps | undefined | null;
}>;
export default function SearchResult(props: SearchResultProps): React.ReactElement;
