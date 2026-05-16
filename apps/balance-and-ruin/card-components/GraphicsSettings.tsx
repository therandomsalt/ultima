import { Card } from "@ff6wc/ui";
import React, { useState } from "react";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { SettingSwitch } from "~/components/SettingSwitch/SettingSwitch";
import { useBooleanState } from "~/utils/settingsSetup";

export type GraphicsSettingsProps = {
  graphicsSettingsData: Array<GraphicsSettingData>;
};

export type GraphicsSettingData = {
  settingLabel: string;
  settingFlag: string;
};

export const GraphicsSettings = ({
  graphicsSettingsData,
}: GraphicsSettingsProps) => {
  const settingSwitches: React.ReactNode[] = [];

  graphicsSettingsData.map((item) =>
    settingSwitches.push(
      <SettingSwitches
        key={item.settingFlag}
        label={item.settingLabel}
        flagName={item.settingFlag}
      />,
    ),
  );

  return (
    <Card title={"Graphics settings"}>
      <span className="inline-flex gap-2 flex-wrap">
        <PageColumn>{settingSwitches}</PageColumn>
      </span>
    </Card>
  );
};

function SettingSwitches({
  label,
  flagName,
}: {
  label: string;
  flagName: string;
}) {
  // const [isEnabled, setIsEnabled] = useBooleanState(flagName, false);

  // return (
  //   <SettingSwitch
  //     isChecked={isEnabled}
  //     onClick={setIsEnabled(!isEnabled)}
  //     label={label}
  //   />
  // );
  return (
    <SettingSwitch isChecked={true} onClick={console.log()} label={label} />
  );
}
