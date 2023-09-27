/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostLikesCreateFormInputValues = {
    s3url?: string;
    users_likes?: string[];
};
export declare type PostLikesCreateFormValidationValues = {
    s3url?: ValidationFunction<string>;
    users_likes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostLikesCreateFormOverridesProps = {
    PostLikesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3url?: PrimitiveOverrideProps<TextFieldProps>;
    users_likes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostLikesCreateFormProps = React.PropsWithChildren<{
    overrides?: PostLikesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostLikesCreateFormInputValues) => PostLikesCreateFormInputValues;
    onSuccess?: (fields: PostLikesCreateFormInputValues) => void;
    onError?: (fields: PostLikesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostLikesCreateFormInputValues) => PostLikesCreateFormInputValues;
    onValidate?: PostLikesCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostLikesCreateForm(props: PostLikesCreateFormProps): React.ReactElement;
