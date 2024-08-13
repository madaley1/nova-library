import { FieldType } from '@/utils/libraries/templates';
import { DateField } from './DateField.component';
import { MultiSelectField } from './MultiSelectField.component';
import { NumberField } from './NumberField.component';
import { SelectField } from './SelectField.component';
import { StringField } from './StringField.component';

type routerProps = {
  fieldTitle: string;
  type: FieldType;
  required: boolean;
};

export type FieldProps = {
  fieldTitle: string;
  required: boolean;
};

export const ItemFieldRouter = (props: routerProps) => {
  switch (props.type) {
    case 'string':
      return <StringField fieldTitle={props.fieldTitle} required={props.required} />;
    case 'number':
      return <NumberField fieldTitle={props.fieldTitle} required={props.required} />;
    case 'date':
      return <DateField fieldTitle={props.fieldTitle} required={props.required} />;
    case 'select':
      return <SelectField fieldTitle={props.fieldTitle} required={props.required} />;
    case 'multiSelect':
      return <MultiSelectField fieldTitle={props.fieldTitle} required={props.required} />;
    default:
      return <StringField fieldTitle={props.fieldTitle} required={props.required} />;
  }
};
