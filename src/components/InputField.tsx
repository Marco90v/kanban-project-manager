import { ProjectFormValues, TaskFormValues } from "@/types";
import { Field, Fieldset, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: keyof ProjectFormValues | keyof TaskFormValues;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function InputField({name, label, placeholder="", type="text", required}:InputFieldProps) {
  const { register, formState: { errors } } = useFormContext<ProjectFormValues & TaskFormValues>();
  return(
    <Fieldset.Content>
      <Field.Root invalid={!!errors[name]} required={required}>
        <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          focusRingColor={"#30BFCD"}
        />
        <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
      </Field.Root>
    </Fieldset.Content>
  )
}

export default InputField;