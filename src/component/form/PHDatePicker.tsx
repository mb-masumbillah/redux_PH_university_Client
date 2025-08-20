import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  const { control } = useFormContext(); // ✅ Get control from form context

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              value={field.value ? dayjs(field.value) : null} // ✅ Convert to dayjs
              onChange={(date) => field.onChange(date?.toISOString())} // ✅ Save as ISO string
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
