/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostCommentsCreateFormInputValues = {
    s3url?: string;
    users_comments?: string[];
};
export declare type PostCommentsCreateFormValidationValues = {
    s3url?: ValidationFunction<string>;
    users_comments?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCommentsCreateFormOverridesProps = {
    PostCommentsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3url?: PrimitiveOverrideProps<TextFieldProps>;
    users_comments?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PostCommentsCreateFormProps = React.PropsWithChildren<{
    overrides?: PostCommentsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostCommentsCreateFormInputValues) => PostCommentsCreateFormInputValues;
    onSuccess?: (fields: PostCommentsCreateFormInputValues) => void;
    onError?: (fields: PostCommentsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCommentsCreateFormInputValues) => PostCommentsCreateFormInputValues;
    onValidate?: PostCommentsCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostCommentsCreateForm(props: PostCommentsCreateFormProps): React.ReactElement;
