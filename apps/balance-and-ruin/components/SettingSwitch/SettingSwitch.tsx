import { HelperText, Switch } from "@ff6wc/ui";
import { InputLabel } from "~/components/InputLabel/InputLabel";

export type SettingSwitchProps = {
  helperText?: React.ReactNode;
  label: string;
  isChecked: boolean;
  onClick: () => void;
};

export const SettingSwitch = ({
  helperText: hardDescription,
  label,
  isChecked,
  onClick,
}: SettingSwitchProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={"flex items-center gap-4 flex-shrink cursor-pointer w-fit"}
        onClick={onClick}
      >
        <Switch checked={isChecked} />

        <InputLabel className={"cursor-pointer"} htmlFor={label}>
          {label}
        </InputLabel>
      </div>
      <HelperText>{hardDescription}</HelperText>
    </div>
  );
};
