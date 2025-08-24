import { HelperText, Switch } from "@ff6wc/ui";
import { useMemo, useState } from "react";
import {
  selectFlagValue,
  setFlag,
  useFlagValueSelector,
} from "~/state/flagSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { selectDefaultValue, selectDescription } from "~/state/schemaSlice";

export type SettingSwitchProps = {
  helperText?: React.ReactNode;
  flag: string;
  /** Invert logic so when true, set to false, and vice versa. If value undefined, default to true. */
  invert?: boolean;
  label: React.ReactNode;
};

export const SettingSwitch = ({
  helperText: hardDescription,
  flag,
  invert = false,
  label,
}: SettingSwitchProps) => {
  function writeSetting(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function readSetting(key: string): string {
    return String(localStorage.getItem(key));
  }

  const defaultValue = readSetting(flag);
  const schemaDescription = useSelector(selectDescription(flag));

  const value = readSetting(flag) ?? defaultValue ?? false;

  const checked = invert ? Boolean(!value) : Boolean(value);

  function onChange(value: boolean) {
    console.log(value);
    writeSetting(flag, value.toString());
  }

  return (
    <div className="flex flex-col gap-1">
      <div
        className={"flex items-center gap-4 flex-shrink cursor-pointer w-fit"}
        onClick={() => onChange(!checked)}
      >
        <Switch checked={checked} onChange={(val) => onChange(val)} />

        <InputLabel
          className={"cursor-pointer"}
          htmlFor={flag}
          onClick={() => onChange(!checked)}
        >
          {label}
        </InputLabel>
      </div>
      <HelperText>{hardDescription ?? schemaDescription}</HelperText>
    </div>
  );
};
