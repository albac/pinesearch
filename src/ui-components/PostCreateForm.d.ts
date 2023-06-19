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
export declare type PostCreateFormInputValues = {
    s3url?: string;
    title?: string;
    summary?: string;
};
export declare type PostCreateFormValidationValues = {
    s3url?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    summary?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCreateFormOverridesProps = {
    PostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3url?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostCreateFormProps = React.PropsWithChildren<{
    overrides?: PostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onSuccess?: (fields: PostCreateFormInputValues) => void;
    onError?: (fields: PostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onValidate?: PostCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostCreateForm(props: PostCreateFormProps): React.ReactElement;
