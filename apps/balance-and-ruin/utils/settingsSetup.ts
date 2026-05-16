import { useState, useEffect } from "react";
import { GraphicsSettingData } from "~/card-components/GraphicsSettings";
import { getLocal, setLocal } from "~/utils/localStorageUtils";

export function useBooleanState(
  key: string,
  defaultValue: boolean = false,
): [boolean, (newValue: boolean) => void] {
  // Load from localStorage on initial render
  const [state, setState] = useState<boolean>(() => {
    return getLocal<boolean>(key, defaultValue) ?? defaultValue;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    setLocal(key, state);
  }, [key, state]);

  return [state, setState];
}

function createNewGraphicsSettingsData(
  label: string,
  settingFlag: string,
): GraphicsSettingData {
  return {
    settingLabel: label,
    settingFlag: settingFlag,
  };
}

export function graphicsSettingsData(): GraphicsSettingData[] {
  return [
    createNewGraphicsSettingsData(
      "Use randomized palettes",
      "useRandomizedPalette",
    ),
    createNewGraphicsSettingsData("There is no spoon", "spoonTest"),
  ];
}
