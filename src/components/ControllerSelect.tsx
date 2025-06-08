import { TaskFormValues } from "@/types";
import { Field, Fieldset, ListCollection, Portal, Select } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: 'status' | 'priority';
  label: string;
  selects: ListCollection<{
    value: string;
    label: string;
  } >
  ref: React.RefObject<HTMLDivElement | null>;
  placeholder?: string;
}

function ControllerSelect({name, label, selects, ref, placeholder=""}:Props) {
  const { control, formState: { errors } } = useFormContext<TaskFormValues>();
  return (
    <Fieldset.Content>
      <Field.Root invalid={!!errors[name]} required>
        <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={selects}
            >
              <Select.HiddenSelect />
              {/* <Select.Label>Select task status</Select.Label> */}
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal container={ref}>
                <Select.Positioner>
                  <Select.Content>
                    {selects.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          )}
        />      
        <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
      </Field.Root>
    </Fieldset.Content>
  );
}

export default ControllerSelect;