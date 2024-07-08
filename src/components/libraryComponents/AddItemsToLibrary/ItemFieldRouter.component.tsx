import { FieldType } from '@/utils/libraries/templates';
import { DateField } from './DateField.component';
import { MultiSelectField } from './MultiSelectField.component';
import { NumberField } from './NumberField.component';
import { SelectField } from './SelectField.component';
import { StringField } from './StringField.component';

type routerProps = {
  type: FieldType;
};

export const ItemFieldRouter = (props: routerProps) => {
  switch (props.type) {
    case 'string':
      return <StringField />;
    case 'number':
      return <NumberField />;
    case 'date':
      return <DateField />;
    case 'select':
      return <SelectField />;
    case 'multiSelect':
      return <MultiSelectField />;
    default:
      return <StringField />;
  }
};
